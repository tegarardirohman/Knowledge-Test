import { NextResponse } from "next/server";

export function middleware(request) {

    const { pathname } = request.nextUrl;

    // route and authentication
    if (pathname === '')

    return NextResponse.next();
}