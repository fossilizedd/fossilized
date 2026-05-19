"use client";

import { useSetAtom } from "jotai";
import { selectedItemAtom } from "@/client/atoms/appAtoms";
import { isFirstMonth, getSeasonRange, getCardClasses } from "@/client/utils/season";
import type { FishItem } from "@/server/lib/fish";

export function FishCard({
  item,
  month,
  delay,
}: {
  item: FishItem;
  month: number;
  delay: number;
}) {
  const setSelectedItem = useSetAtom(selectedItemAtom);
  const isPeak = item.peakMonths.includes(month);
  const isNew = isFirstMonth(item.months, month);

  return (
    <div
      className={getCardClasses("fish", isNew)}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => setSelectedItem({ type: "fish", item })}
    >
      <div className="flex items-center gap-1.5 min-w-0 mb-1.5">
        <span className="text-lg leading-none shrink-0">🐟</span>
        <h3 className="font-semibold text-mist text-sm leading-tight truncate">{item.name}</h3>
      </div>

      <div className="flex flex-wrap items-center gap-1 mb-2">
        <span className="text-[11px] font-semibold text-[#7ac8e8]/80 tracking-wide mr-0.5">
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
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
            style={{ background: "rgba(42,107,153,0.3)", color: "#7ac8e8" }}
          >
            Peak
          </span>
        )}
        {item.iceFishing && (
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
            style={{ background: "rgba(180,220,240,0.12)", color: "#aaddee" }}
          >
            ❄ Ice
          </span>
        )}
      </div>

      <p className="text-xs leading-relaxed opacity-60 line-clamp-2">{item.description}</p>
    </div>
  );
}
