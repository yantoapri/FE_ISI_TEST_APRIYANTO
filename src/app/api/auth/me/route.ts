import { getErrorResponse } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let result = NextResponse.next().cookies.get("tes");
  return NextResponse.json({
    status: "success",
    data: { data: result, tes: "cek" },
  });
}
