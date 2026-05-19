import { atom } from "jotai";
import type { AlmanacItem } from "@/server/lib/almanac";

export const selectedMonthAtom = atom(new Date().getMonth() + 1);
export const selectedItemAtom = atom<AlmanacItem | null>(null);
export const hiddenIdsAtom = atom<string[]>([]);
