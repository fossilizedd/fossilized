import { atom } from "jotai";
import type { ProduceItem } from "@/server/lib/produce";
import type { FishItem } from "@/server/lib/fish";

export type ModalItem =
  | { type: "produce"; item: ProduceItem }
  | { type: "fish"; item: FishItem };

export const selectedMonthAtom = atom(new Date().getMonth() + 1);
export const selectedItemAtom = atom<ModalItem | null>(null);
export const hiddenIdsAtom = atom<string[]>([]);
