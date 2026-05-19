import { AlmanacHeader } from "@/client/components/AlmanacHeader";
import { SeasonalCalendar } from "@/client/components/SeasonalCalendar";
import { getAllItems } from "@/server/lib/almanac";

export default function CalendarPage() {
  return (
    <>
      <AlmanacHeader />
      <SeasonalCalendar items={getAllItems()} />
    </>
  );
}
