"use client";

import { useSetAtom } from "jotai";
import { selectedItemAtom } from "@/client/atoms/appAtoms";
import { PRODUCE_EMOJI, isFirstMonth, getSeasonRange, getCardClasses } from "@/client/utils/season";
import type { ProduceItem } from "@/server/lib/produce";

export function ProduceCard({
  item,
  month,
  delay,
}: {
  item: ProduceItem;
  month: number;
  delay: number;
}) {
  const setSelectedItem = useSetAtom(selectedItemAtom);
  const isPeak = item.peakMonths.includes(month);
  const isPicking =
    item.pickingSeason != null &&
    month >= item.pickingSeason.start &&
    month <= item.pickingSeason.end;
  const isNew = isFirstMonth(item.months, month);

  return (
    <div
      className={getCardClasses(item.category, isNew)}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => setSelectedItem({ type: "produce", item })}
    >
      <div className="flex items-center gap-1.5 min-w-0 mb-1.5">
        <span className="text-lg leading-none shrink-0">{PRODUCE_EMOJI[item.id] ?? "🌿"}</span>
        <h3 className="font-semibold text-mist leading-tight text-sm truncate">{item.name}</h3>
      </div>

      <div className="flex flex-wrap items-center gap-1 mb-2">
        <span className="text-[11px] font-semibold text-amber/80 tracking-wide mr-0.5">
          {getSeasonRange(item.months)}
        </span>
        {isNew && (
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
            style={{
              background: "rgba(245,228,160,0.18)",
              color: "#f5e4a0",
              border: "1px solid rgba(245,228,160,0.35)",
            }}
          >
            NEW
          </span>
        )}
        {isPeak && (
          <span className="rounded-full bg-amber/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber">
            Peak
          </span>
        )}
        {isPicking && (
          <span className="rounded-full bg-blossom/20 px-1.5 py-0.5 text-[10px] font-semibold text-blossom">
            U-Pick
          </span>
        )}
      </div>

      <p className="text-xs leading-relaxed opacity-60 line-clamp-2">{item.description}</p>
    </div>
  );
}
