
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { access_token, refresh_token } = await req.json();

    if (!access_token || !refresh_token) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 }
        );
    }

    const response = NextResponse.json({ message: "Cookie set successfully" });

    // Thiết lập cookie với `access_token`
    response.cookies.set({
        name: "accessToken",
        value: access_token,
        path: "/",
        httpOnly: true,
        sameSite: "strict"
    });

    // Thiết lập cookie với `refresh_token` và thời gian tồn tại là 1 tuần (604800 giây)
    response.cookies.set({
        name: "refreshToken",
        value: refresh_token,
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 604800
    });

    return response;
}