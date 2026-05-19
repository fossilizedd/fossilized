import { type NextRequest, NextResponse } from "next/server";
import { getAllProduce, getProduceByMonth } from "@/server/lib/produce";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const month = searchParams.get("month");

  if (month) {
    const monthNum = parseInt(month, 10);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return NextResponse.json({ error: "month must be 1–12" }, { status: 400 });
    }
    return NextResponse.json(getProduceByMonth(monthNum));
  }

  return NextResponse.json(getAllProduce());
}
