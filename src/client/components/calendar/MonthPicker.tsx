"use client";

import { useAtom } from "jotai";
import { selectedMonthAtom } from "@/client/atoms/appAtoms";
import { MONTHS } from "@/client/utils/season";

const BTN_BASE =
  "py-[0.35rem] px-[0.7rem] rounded-full text-[0.78rem] font-medium tracking-[0.04em] transition-all border whitespace-nowrap cursor-pointer";
const BTN_DEFAULT =
  "text-mist/60 bg-transparent border-[rgba(26,58,92,0.6)] hover:text-mist hover:border-[rgba(42,106,153,0.8)] hover:bg-[rgba(26,58,92,0.3)]";
const BTN_CURRENT = "text-amber/90 border-amber/40 bg-transparent";
const BTN_SELECTED =
  "bg-amber text-sky-deep border-amber font-semibold shadow-[0_0_16px_rgba(232,164,74,0.4)]";

export function MonthPicker() {
  const [selectedMonth, setSelectedMonth] = useAtom(selectedMonthAtom);
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max mx-auto w-fit">
        {MONTHS.map((label, i) => {
          const m = i + 1;
          const isSelected = m === selectedMonth;
          const isCurrent = m === currentMonth && !isSelected;
          return (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={[
                BTN_BASE,
                isSelected ? BTN_SELECTED : isCurrent ? BTN_CURRENT : BTN_DEFAULT,
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
