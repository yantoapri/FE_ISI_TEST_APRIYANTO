import { getEnvVariable, getErrorResponse } from "../../../../lib/helper";
import prisma from "@/lib/prisma";
import { signJWT } from "@/lib/token";
import {
  LoginUserInput,
  LoginUserSchema,
} from "../../../../lib/validation/user.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);

    const user: any = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await compare(data.password, user.password))) {
      return getErrorResponse(401, "Invalid email or password");
    }

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    const token = await signJWT(
      { sub: user.id },
      { exp: `${JWT_EXPIRES_IN}m` },
    );

    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
    const cookieOptions = {
      name: "token",
      value: btoa(
        JSON.stringify({
          user: { id: user.id, name: user.name, role: user.role },
          token: token,
        }),
      ),
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };
    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        data: {
          user: { id: user.id, name: user.name, role: user.role },
          token: token,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );

    await Promise.all([response.cookies.set(cookieOptions)]);

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return getErrorResponse(500, error.message);
  }
}
