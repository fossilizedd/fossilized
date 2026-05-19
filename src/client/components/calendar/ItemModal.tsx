"use client";

import { useAtom, useSetAtom } from "jotai";
import { selectedItemAtom, hiddenIdsAtom, selectedMonthAtom } from "@/client/atoms/appAtoms";
import { PRODUCE_EMOJI, getSeasonRange, isFirstMonth } from "@/client/utils/season";

export function ItemModal() {
  const [selected, setSelected] = useAtom(selectedItemAtom);
  const [, setHiddenIds] = useAtom(hiddenIdsAtom);
  const [selectedMonth] = useAtom(selectedMonthAtom);

  if (!selected) return null;

  const { id, name, months, peakMonths, description } = selected.item;
  const isNew = isFirstMonth(months, selectedMonth);
  const isPeak = peakMonths.includes(selectedMonth);
  const seasonRange = getSeasonRange(months);
  const emoji = selected.type === "produce" ? (PRODUCE_EMOJI[id] ?? "🌿") : "🐟";

  function close() {
    setSelected(null);
  }

  function hide() {
    setHiddenIds((prev) => [...prev, id]);
    setSelected(null);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,22,40,0.88)", backdropFilter: "blur(8px)" }}
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-xl border p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: "var(--color-sky-deep)",
          borderColor: "rgba(42,80,130,0.7)",
          boxShadow: "0 8px 60px rgba(0,0,0,0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute right-4 top-4 w-7 h-7 flex items-center justify-center text-mist/40 hover:text-mist/80 transition-colors text-xl leading-none rounded-full hover:bg-sky-mid/30"
          aria-label="Close"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3 pr-8">
          <span className="text-2xl">{emoji}</span>
          <h2 className="text-lg font-semibold text-mist leading-tight">{name}</h2>
        </div>

        {/* Season + badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className="text-[12px] font-semibold text-amber/80 tracking-wide">
            {seasonRange}
          </span>
          {isNew && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{
                background: "rgba(245,228,160,0.18)",
                color: "#f5e4a0",
                border: "1px solid rgba(245,228,160,0.35)",
              }}
            >
              NEW
            </span>
          )}
          {isPeak && selected.type === "produce" && (
            <span className="rounded-full bg-amber/20 px-2 py-0.5 text-[10px] font-semibold text-amber">
              Peak
            </span>
          )}
          {isPeak && selected.type === "fish" && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ background: "rgba(42,107,153,0.3)", color: "#7ac8e8" }}
            >
              Peak
            </span>
          )}
          {selected.type === "produce" &&
            selected.item.pickingSeason != null &&
            selectedMonth >= selected.item.pickingSeason.start &&
            selectedMonth <= selected.item.pickingSeason.end && (
              <span className="rounded-full bg-blossom/20 px-2 py-0.5 text-[10px] font-semibold text-blossom">
                U-Pick
              </span>
            )}
          {selected.type === "fish" && selected.item.iceFishing && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ background: "rgba(180,220,240,0.12)", color: "#aaddee" }}
            >
              ❄ Ice Fishing
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-mist/70 mb-4">{description}</p>

        {/* Produce details */}
        {selected.type === "produce" && (
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-wider opacity-40 mb-1">Timing</p>
            <p className="text-xs opacity-70 leading-relaxed">{selected.item.timing}</p>
          </div>
        )}

        {/* Fish details */}
        {selected.type === "fish" && (
          <div className="space-y-3 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-40 mb-1">Flavor</p>
              <p className="text-xs opacity-70">{selected.item.flavor}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-40 mb-1">Preparation</p>
              <ul className="space-y-0.5">
                {selected.item.cookingMethods.map((m) => (
                  <li key={m} className="text-xs opacity-60">
                    · {m}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-40 mb-1">Habitat</p>
              <p className="text-xs opacity-40 leading-relaxed">{selected.item.habitat}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-sky-mid/40">
          <button
            onClick={hide}
            className="flex-1 py-2 rounded-lg text-xs font-medium text-mist/35 hover:text-mist/60 hover:bg-[rgba(26,58,92,0.3)] transition-all"
          >
            Hide from almanac
          </button>
          <button
            onClick={close}
            className="flex-1 py-2 rounded-lg text-xs font-medium bg-[rgba(26,58,92,0.4)] text-mist/70 hover:bg-[rgba(26,58,92,0.6)] hover:text-mist transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
