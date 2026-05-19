"use client";

import { useRouter } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";
import { selectedItemAtom, hiddenIdsAtom } from "@/client/atoms/appAtoms";
import { ItemModal } from "./calendar/ItemModal";
import { PRODUCE_EMOJI, getSeasonRange } from "@/client/utils/season";
import { AlmanacCategory, type AlmanacItem } from "@/server/lib/almanac";
import { selectedMonthAtom } from "@/client/atoms/appAtoms";

function FeedCard({ item, tags }: { item: AlmanacItem; tags: string[] }) {
  const setSelected = useSetAtom(selectedItemAtom);
  const [hiddenIds] = useAtom(hiddenIdsAtom);
  if (hiddenIds.includes(item.id)) return null;

  const isFish = item.category === AlmanacCategory.Fish;
  const emoji = isFish ? "🐟" : (PRODUCE_EMOJI[item.id] ?? "🌿");

  return (
    <div
      className="flex gap-4 py-4 border-b cursor-pointer group transition-all hover:bg-white/40 hover:rounded-lg hover:px-3 hover:-mx-3"
      style={{ borderColor: "rgba(42,80,130,0.2)" }}
      onClick={() => setSelected(item)}
    >
      <span className="text-2xl leading-none mt-0.5 shrink-0">{emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="text-sm font-semibold text-mist group-hover:text-amber transition-colors">
            {item.name}
          </h3>
          {tags.map((tag) => (
            <span key={tag} className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
              tag === "Peak"
                ? isFish
                  ? "text-ocean"
                  : "bg-amber/20 text-amber"
                : tag === "U-Pick"
                ? "bg-blossom/20 text-blossom"
                : tag === "New"
                ? "text-particle border border-particle/30"
                : "text-mist/40 border border-mist/15"
              }`}
              style={tag === "Peak" && isFish ? { background: "rgba(24,88,152,0.12)" } : undefined}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-amber/80 tracking-wide mb-1.5">{getSeasonRange(item.months)}</p>
        <p className="text-xs text-mist/50 leading-relaxed line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
}

function FeedSection({ title, items, tagFn }: {
  title: string;
  items: AlmanacItem[];
  tagFn: (item: AlmanacItem) => string[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="mb-8">
      <p className="text-[10px] uppercase tracking-[0.25em] text-mist/45 mb-2">{title}</p>
      {items.map((item) => (
        <FeedCard key={item.id} item={item} tags={tagFn(item)} />
      ))}
    </section>
  );
}

export function FeedView({ items, currentMonth }: { items: AlmanacItem[]; currentMonth: number }) {
  const router = useRouter();
  const [hiddenIds] = useAtom(hiddenIdsAtom);
  const [, setSelectedMonth] = useAtom(selectedMonthAtom);

  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

  const inSeason = items.filter(
    (i) => i.months.includes(currentMonth) && !hiddenIds.includes(i.id)
  );
  const peak = inSeason.filter((i) => i.peakMonths.includes(currentMonth));
  const other = inSeason.filter((i) => !i.peakMonths.includes(currentMonth));
  const comingSoon = items.filter(
    (i) => i.months[0] === nextMonth && !hiddenIds.includes(i.id)
  );

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-8">
        <FeedSection
          title="Peak now"
          items={peak}
          tagFn={(item) => {
            const tags: string[] = ["Peak"];
            if (item.pickingSeason?.start === currentMonth) tags.push("U-Pick");
            return tags;
          }}
        />
        <FeedSection
          title="In season"
          items={other}
          tagFn={(item) => {
            const tags: string[] = [];
            if (item.months[0] === currentMonth) tags.push("New");
            if (item.pickingSeason?.start === currentMonth) tags.push("U-Pick");
            return tags;
          }}
        />
        <FeedSection
          title="Coming next month"
          items={comingSoon}
          tagFn={() => ["Soon"]}
        />
        {inSeason.length === 0 && comingSoon.length === 0 && (
          <p className="py-12 text-center text-sm opacity-30">Nothing in season this month.</p>
        )}
        <div className="mt-4 text-center">
          <button
            onClick={() => { setSelectedMonth(currentMonth); router.push("/calendar"); }}
            className="text-xs text-mist/25 hover:text-mist/50 transition-colors tracking-wide"
          >
            View full calendar →
          </button>
        </div>
      </div>
      <ItemModal />
    </>
  );
}
