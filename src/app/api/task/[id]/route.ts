import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { data: [], message: "Method Not Allowed" },
      { status: 405 },
    );
  }
  try {
    let id: any = request.url.split("/").pop();
    let res = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ data: res, message: "" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { data: [], message: error.message },
      { status: 500 },
    );
  }
}
