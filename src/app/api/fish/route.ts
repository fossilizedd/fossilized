import { type NextRequest, NextResponse } from "next/server";
import { getAllFish, getFishByMonth } from "@/server/lib/fish";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const month = searchParams.get("month");

  if (month) {
    const monthNum = parseInt(month, 10);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return NextResponse.json({ error: "month must be 1–12" }, { status: 400 });
    }
    return NextResponse.json(getFishByMonth(monthNum));
  }

  return NextResponse.json(getAllFish());
}
