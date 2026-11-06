"use client";

import { useState } from "react";
import type { IStudio } from "@/types";
import StudioCard from "@/components/studio/studio-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2 } from "lucide-react";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../ui/empty";

export default function MyListingsContent({ listings }: { listings: IStudio[] }) {
	const [myListings, setMyListings] = useState(listings);

	return (
		<main className="container w-full py-10 sm:py-14">
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
			{myListings.length ? (
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{myListings.map((studio) => (
						<StudioCard
							key={studio._id}
							studio={studio}
							manage
							onDeleted={(id) =>
								setMyListings((current) => current.filter((item) => item._id !== id))
							}
						/>
					))}
				</div>
			) : (
				<Empty className="border border-dashed">
					<EmptyHeader>
						<EmptyMedia>
							<Building2 />
						</EmptyMedia>
						<EmptyTitle>No studios listed yet</EmptyTitle>
						<EmptyDescription>
							Add your first creative space and it will appear here for you to manage.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button nativeButton={false} render={<Link href={"/add-studio"} />}>
							Add your first studio
						</Button>
					</EmptyContent>
				</Empty>
			)}
		</main>
	);
}
