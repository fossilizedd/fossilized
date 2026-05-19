import { AlmanacHeader } from "@/client/components/AlmanacHeader";
import { FeedView } from "@/client/components/FeedView";
import { getAllItems } from "@/server/lib/almanac";

export default function Home() {
  const currentMonth = new Date().getMonth() + 1;
  return (
    <>
      <AlmanacHeader />
      <FeedView items={getAllItems()} currentMonth={currentMonth} />
    </>
  );
}
