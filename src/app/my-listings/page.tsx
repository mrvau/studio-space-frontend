import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyListingsContent from "@/components/studio/my-listings-content";
import type { IStudio } from "@/types";

async function getMyListings(ownerEmail: string): Promise<IStudio[]> {
	try {
		const response = await fetch(`http://localhost:8000/api/v1/studio?ownerEmail=${encodeURIComponent(ownerEmail)}`, { cache: "no-store" });
		if (!response.ok) return [];
		const result = await response.json();
		const studios: IStudio[] = result.data ?? result;
		return Array.isArray(studios) ? studios.filter((studio) => studio.ownerEmail === ownerEmail) : [];
	} catch {
		return [];
	}
}

export default async function MyListingsPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) redirect("/login");
	const listings = await getMyListings(session.user.email);
	return <MyListingsContent listings={listings} />;
}
