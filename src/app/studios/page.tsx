"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RenderSkeleton from "@/components/shared/render-skeleton";
import StudioGrid from "@/components/shared/studio-grid";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { APIPromise, IStudio, StudioCategory } from "@/types";

const studioCategories: StudioCategory[] = [
	"Photo Studio",
	"Film Stage",
	"Podcast Lounge",
	"Music Suite",
	"Workshop",
];

const getAllStudios = async (category: string, signal: AbortSignal): APIPromise<IStudio[]> => {
	const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
	const query = category === "all" ? "" : `?${new URLSearchParams({ category })}`;
	const response = await fetch(`${API_URL}/studio${query}`, { signal });

	if (!response.ok) throw new Error("Failed to fetch studios");

	return response.json();
};

const StudiosContent = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const categoryParam = searchParams.get("category");
	const selectedCategory = studioCategories.includes(categoryParam as StudioCategory)
		? categoryParam!
		: "all";
	const [studios, setStudios] = useState<IStudio[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [retryCount, setRetryCount] = useState(0);

	useEffect(() => {
		const controller = new AbortController();

		const fetchAllStudios = async () => {
			setIsLoading(true);
			setError(false);

			try {
				const { data } = await getAllStudios(selectedCategory, controller.signal);
				if (controller.signal.aborted) return;
				setStudios(data);
			} catch (error) {
				if (controller.signal.aborted) return;
				console.error(error);
				setError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAllStudios();

		return () => controller.abort();
	}, [selectedCategory, retryCount]);

	const handleCategoryChange = (value: string | null) => {
		const params = new URLSearchParams(searchParams.toString());
		if (!value || value === "all") params.delete("category");
		else params.set("category", value);

		const query = params.toString();
		router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
	};

	return (
		<section className="container w-full py-10 sm:py-14">
			<div className="mb-8">
				<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
					Find your space
				</p>
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore studios</h1>
				<p className="mt-2 max-w-2xl text-muted-foreground">
					Browse creative workspaces for your next shoot, recording session, or big idea.
				</p>
			</div>

			<div className="mb-8 max-w-sm">
				<label htmlFor="studio-category" className="mb-2 block text-sm font-medium">
					Filter by category
				</label>
				<Select value={selectedCategory} onValueChange={handleCategoryChange}>
					<SelectTrigger id="studio-category" className="w-full">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="all">All categories</SelectItem>
							{studioCategories.map((category) => (
								<SelectItem key={category} value={category}>
									{category}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			{isLoading ? (
				<RenderSkeleton />
			) : error ? (
				<div role="alert" className="rounded-lg border border-destructive/30 p-6 text-center">
					<p className="mb-4 text-sm text-muted-foreground">
						We couldn’t load studios. Please try again.
					</p>
					<Button onClick={() => setRetryCount((count) => count + 1)}>Retry</Button>
				</div>
			) : (
				<StudioGrid
					studios={studios}
					emptyDescription={
						selectedCategory === "all"
							? "No studios are available right now. Please check back soon."
							: "Try another category to find available studios."
					}
					showEmptyAction={false}
				/>
			)}
		</section>
	);
};

const StudiosPage = () => (
	<Suspense fallback={<RenderSkeleton />}>
		<StudiosContent />
	</Suspense>
);

export default StudiosPage;
