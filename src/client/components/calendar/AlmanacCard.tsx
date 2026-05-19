"use client";

import { useSetAtom } from "jotai";
import { selectedItemAtom } from "@/client/atoms/appAtoms";
import { PRODUCE_EMOJI, isFirstMonth, getSeasonRange, getCardClasses } from "@/client/utils/season";
import { AlmanacCategory, type AlmanacItem } from "@/server/lib/almanac";

export function AlmanacCard({ item, month, delay }: { item: AlmanacItem; month: number; delay: number }) {
  const setSelectedItem = useSetAtom(selectedItemAtom);
  const isFish = item.category === AlmanacCategory.Fish;
  const isPeak = item.peakMonths.includes(month);
  const isPicking =
    item.pickingSeason != null &&
    month >= item.pickingSeason.start &&
    month <= item.pickingSeason.end;
  const isNew = isFirstMonth(item.months, month);
  const emoji = isFish ? "🐟" : (PRODUCE_EMOJI[item.id] ?? "🌿");

  return (
    <div
      className={getCardClasses(item.category, isNew)}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => setSelectedItem(item)}
    >
      <div className="flex items-center gap-1.5 min-w-0 mb-1.5">
        <span className="text-lg leading-none shrink-0">{emoji}</span>
        <h3 className="font-semibold text-mist text-sm leading-tight truncate">{item.name}</h3>
      </div>

      <div className="flex flex-wrap items-center gap-1 mb-2">
        <span className={`text-[11px] font-semibold tracking-wide mr-0.5 ${isFish ? "text-ocean" : "text-amber"}`}>
          {getSeasonRange(item.months)}
        </span>
        {isNew && (
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
            style={{ background: "rgba(190,140,20,0.12)", color: "#7a4e00", border: "1px solid rgba(190,140,20,0.35)" }}
          >
            NEW
          </span>
        )}
        {isPeak && (
          isFish ? (
            <span
              className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
              style={{ background: "rgba(24,88,152,0.14)", color: "#0a4070" }}
            >
              Peak
            </span>
          ) : (
            <span className="rounded-full bg-amber/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber">
              Peak
            </span>
          )
        )}
        {isPicking && (
          <span className="rounded-full bg-blossom/20 px-1.5 py-0.5 text-[10px] font-semibold text-blossom">
            U-Pick
          </span>
        )}
      </div>

      <p className="text-xs leading-relaxed text-mist/60 line-clamp-2">{item.description}</p>
    </div>
  );
}
