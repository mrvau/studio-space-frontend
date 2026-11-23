import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const page = request.url.split("/").slice(3).join("/");

	if (!session) {
		return NextResponse.redirect(new URL(`/login?redirectFrom=${page}`, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/add-studio", "/my-listings", "/my-bookings", "/studios/edit/:id"],
};
