import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import RenderSkeleton from "@/components/shared/render-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CardGrid from "@/components/shared/card-grid";

const MyListingsPage = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) redirect("/login");

	const { user } = session;
	const query = `?ownerEmail=${user.email}`;

	return (
		<section className="container w-full py-10 sm:py-14">
			<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
						Host dashboard
					</p>
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My studio listings</h1>
					<p className="mt-2 text-muted-foreground">Manage the creative spaces you host.</p>
				</div>
				<Button nativeButton={false} render={<Link href="/add-studio" />}>
					Add a studio
				</Button>
			</div>
			<Suspense fallback={<RenderSkeleton />}>
				<CardGrid manage query={query} />
			</Suspense>
		</section>
	);
};

export default MyListingsPage;
