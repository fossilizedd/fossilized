import { type NextRequest, NextResponse } from "next/server";
import {
  getAllItems,
  getItemsByMonth,
  getItemsByCategory,
  getItemsByMonthAndCategory,
  AlmanacCategory,
  Month,
} from "@/server/lib/almanac";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const monthParam = searchParams.get("month");
  const categoryParam = searchParams.get("category");

  const month = monthParam ? parseInt(monthParam, 10) : null;
  const category = categoryParam as AlmanacCategory | null;

  if (monthParam && (isNaN(month!) || month! < 1 || month! > 12)) {
    return NextResponse.json({ error: "month must be 1–12" }, { status: 400 });
  }

  if (categoryParam && !Object.values(AlmanacCategory).includes(category!)) {
    return NextResponse.json(
      { error: `category must be one of: ${Object.values(AlmanacCategory).join(", ")}` },
      { status: 400 }
    );
  }

  if (month && category) {
    return NextResponse.json(getItemsByMonthAndCategory(month as Month, category));
  }
  if (month) {
    return NextResponse.json(getItemsByMonth(month as Month));
  }
  if (category) {
    return NextResponse.json(getItemsByCategory(category));
  }
  return NextResponse.json(getAllItems());
}
