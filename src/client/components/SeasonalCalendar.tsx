"use client";

import { useAtom } from "jotai";
import { selectedMonthAtom, hiddenIdsAtom } from "@/client/atoms/appAtoms";
import { sortItems } from "@/client/utils/season";
import { MonthPicker } from "./calendar/MonthPicker";
import { ProduceCard } from "./calendar/ProduceCard";
import { FishCard } from "./calendar/FishCard";
import { ItemModal } from "./calendar/ItemModal";
import type { ProduceItem } from "@/server/lib/produce";
import type { FishItem } from "@/server/lib/fish";

interface Props {
  produce: ProduceItem[];
  fish: FishItem[];
}

export function SeasonalCalendar({ produce, fish }: Props) {
  const [selectedMonth] = useAtom(selectedMonthAtom);
  const [hiddenIds, setHiddenIds] = useAtom(hiddenIdsAtom);

  const visibleProduce = sortItems(
    produce.filter((p) => p.months.includes(selectedMonth) && !hiddenIds.includes(p.id)),
    selectedMonth
  );
  const visibleFish = sortItems(
    fish.filter((f) => f.months.includes(selectedMonth) && !hiddenIds.includes(f.id)),
    selectedMonth
  );

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <MonthPicker />

        {hiddenIds.length > 0 && (
          <button
            onClick={() => setHiddenIds([])}
            className="mb-5 text-xs text-mist/30 hover:text-mist/60 transition-colors"
          >
            {hiddenIds.length} hidden · Show all
          </button>
        )}

        {visibleProduce.length > 0 && (
          <>
            <p className="mb-3 text-xs uppercase tracking-widest opacity-30">Produce</p>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-8">
              {visibleProduce.map((item, idx) => (
                <ProduceCard key={item.id} item={item} month={selectedMonth} delay={idx * 35} />
              ))}
            </div>
          </>
        )}

        {visibleFish.length > 0 && (
          <>
            <p className="mb-3 text-xs uppercase tracking-widest opacity-30">Fish</p>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {visibleFish.map((item, idx) => (
                <FishCard
                  key={item.id}
                  item={item}
                  month={selectedMonth}
                  delay={(visibleProduce.length + idx) * 35}
                />
              ))}
            </div>
          </>
        )}

        {visibleProduce.length === 0 && visibleFish.length === 0 && (
          <p className="py-12 text-center text-sm opacity-30">Nothing in season this month.</p>
        )}
      </div>

      <ItemModal />
    </>
  );
}
