import { AlmanacHeader } from "@/client/components/AlmanacHeader";
import { SeasonalCalendar } from "@/client/components/SeasonalCalendar";
import { getAllProduce } from "@/server/lib/produce";
import { getAllFish } from "@/server/lib/fish";

export default function Home() {
  const produce = getAllProduce();
  const fish = getAllFish();

  return (
    <>
      <AlmanacHeader />
      <SeasonalCalendar produce={produce} fish={fish} />
    </>
  );
}
