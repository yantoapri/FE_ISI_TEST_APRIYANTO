import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ZodError } from "zod";
import { TaskSchema, TaskInput } from "@/lib/validation/task.schema";
import { getErrorResponse } from "@/lib/helper";

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { data: [], message: "Method Not Allowed" },
      { status: 405 },
    );
  }
  try {
    let newTask = await prisma.task.findMany({
      where: {
        status: "NotStarted",
      },
    });

    let onProgress = await prisma.task.findMany({
      where: {
        status: "OnProgress",
      },
    });

    let done = await prisma.task.findMany({
      where: {
        status: "Done",
      },
    });

    let reject = await prisma.task.findMany({
      where: {
        status: "Reject",
      },
    });
    let res = {
      newTask: newTask,
      onProgress: onProgress,
      done: done,
      reject: reject,
    };
    return NextResponse.json({ data: res, message: "" }, { status: 200 });
  } catch (error: any) {
    return getErrorResponse(500, error.message);
  }
}

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { data: [], message: "Method Not Allowed" },
      { status: 405 },
    );
  }
  try {
    let body = (await request.json()) as TaskInput;
    let data: any = TaskSchema.parse(body);

    let res = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        asignt: data.asignt,
        authorId: data.authorId ? data.authorId : 1,
      },
    });
    return NextResponse.json({ data: res, message: "" }, { status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }
    return getErrorResponse(500, error.message);
  }
}

export async function PUT(request: NextRequest) {
  if (request.method !== "PUT") {
    return NextResponse.json(
      { data: [], message: "Method Not Allowed" },
      { status: 405 },
    );
  }
  try {
    let body = (await request.json()) as TaskInput;
    let data: any = TaskSchema.parse(body);

    let res = await prisma.task.update({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        asignt: data.asignt,
      },
      where: {
        id: data.id,
      },
    });
    return NextResponse.json({ data: res, message: "" }, { status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }
    return getErrorResponse(500, error.message);
  }
}
