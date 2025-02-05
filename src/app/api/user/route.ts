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
    let res = await prisma.user.findMany({
      where: {
        role: "TEAM",
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

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { data: [], message: "Method Not Allowed" },
      { status: 405 },
    );
  }
  try {
    let data: any = await request.json();

    let res = await prisma.user.findUnique({
      where: {
        email: data.email,
        password: data.password,
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
