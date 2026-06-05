"use client";

import { useAtom } from "jotai";
import { selectedItemAtom, hiddenIdsAtom, selectedMonthAtom } from "@/client/atoms/appAtoms";
import { PRODUCE_EMOJI, getSeasonRange, isFirstMonth } from "@/client/utils/season";
import { AlmanacCategory } from "@/server/lib/almanac";

export function ItemModal() {
  const [selected, setSelected] = useAtom(selectedItemAtom);
  const [, setHiddenIds] = useAtom(hiddenIdsAtom);
  const [selectedMonth] = useAtom(selectedMonthAtom);

  if (!selected) return null;

  const { id, name, months, peakMonths, description } = selected;
  const isFish = selected.category === AlmanacCategory.Fish;
  const isNew = isFirstMonth(months, selectedMonth);
  const isPeak = peakMonths.includes(selectedMonth);
  const isPicking =
    selected.pickingSeason != null &&
    selectedMonth >= selected.pickingSeason.start &&
    selectedMonth <= selected.pickingSeason.end;
  const emoji = isFish ? "🐟" : (PRODUCE_EMOJI[id] ?? "🌿");

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
      style={{ background: "rgba(100,140,175,0.55)", backdropFilter: "blur(8px)" }}
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-xl border p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: "#f0f6fc",
          borderColor: "rgba(42,80,130,0.3)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 w-7 h-7 flex items-center justify-center text-mist/40 hover:text-mist/80 transition-colors text-xl leading-none rounded-full hover:bg-[rgba(42,80,130,0.1)]"
          aria-label="Close"
        >
          ×
        </button>

        <div className="flex items-center gap-2.5 mb-3 pr-8">
          <span className="text-2xl">{emoji}</span>
          <h2 className="text-lg font-semibold text-mist leading-tight">{name}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className="text-[12px] font-semibold text-amber/80 tracking-wide">
            {getSeasonRange(months)}
          </span>
          {isNew && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{
                background: "rgba(190,140,20,0.12)",
                color: "#7a4e00",
                border: "1px solid rgba(190,140,20,0.35)",
              }}
            >
              NEW
            </span>
          )}
          {isPeak && (
            isFish ? (
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: "rgba(24,88,152,0.14)", color: "#0a4070" }}>Peak</span>
            ) : (
              <span className="rounded-full bg-amber/20 px-2 py-0.5 text-[10px] font-semibold text-amber">Peak</span>
            )
          )}
          {isPicking && (
            <span className="rounded-full bg-blossom/20 px-2 py-0.5 text-[10px] font-semibold text-blossom">
              U-Pick
            </span>
          )}
        </div>

        {description && (
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-wider opacity-40 mb-1">About</p>
            <p className="text-sm leading-relaxed text-mist/70">{description}</p>
          </div>
        )}

        <div className="flex gap-2 pt-3 border-t border-sky-mid/40">
          <button
            onClick={hide}
            className="flex-1 py-2 rounded-lg text-xs font-medium text-mist/35 hover:text-mist/60 hover:bg-[rgba(42,80,130,0.1)] transition-colors duration-150"
          >
            Hide from almanac
          </button>
          <button
            onClick={close}
            className="flex-1 py-2 rounded-lg text-xs font-medium bg-[rgba(42,80,130,0.12)] text-mist/70 hover:bg-[rgba(42,80,130,0.22)] hover:text-mist transition-colors duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
