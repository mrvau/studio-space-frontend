"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RenderSkeleton from "@/components/shared/render-skeleton";
import StudioGrid from "@/components/shared/studio-grid";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { APIPromise, IStudio } from "@/types";
import { toast } from "@/components/ui/toast";
import { CATEGORIES } from "@/constants";

const getAllStudios = async (category: string): APIPromise<IStudio[]> => {
	const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
	const query = category !== "All Studios" ? `?${new URLSearchParams({ category })}` : "";

	const response = await fetch(`${API_URL}/studios${query}`);

	if (!response.ok) throw new Error("Failed to fetch studios");

	return response.json();
};

const StudiosContent = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const selectedCategory = searchParams.get("category") || "All Studios";

	const [studios, setStudios] = useState<IStudio[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAllStudios = async () => {
			setIsLoading(true);

			try {
				const { data } = await getAllStudios(selectedCategory);
				setStudios(data);
			} catch (error) {
				console.error(error);
				toast.add({
					type: "error",
					title: "Failed to fetch studios",
					description: "Try again later.",
				});
			} finally {
				setIsLoading(false);
			}
		};

		fetchAllStudios();
	}, [selectedCategory]);

	const handleCategoryChange = (value: string | null) => {
		const params = new URLSearchParams(searchParams.toString());
		if (!value || value === "All Studios") params.delete("category");
		else params.set("category", value);

		const query = params.toString();
		router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
	};

	return (
		<>
			<div className="flex flex-col sm:flex-row items-start sm:items-end justify-start sm:justify-between">
				<div className="mb-4 sm:mb-8">
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
						<SelectTrigger id="studio-category" className="w-fit cursor-pointer">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="All Studios" className="cursor-pointer">
									All Studios
								</SelectItem>
								{CATEGORIES.map(({ label, value }) => (
									<SelectItem key={label} value={value} className="cursor-pointer">
										{label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			{isLoading ? (
				<RenderSkeleton />
			) : (
				<StudioGrid
					studios={studios}
					emptyDescription={
						selectedCategory === "All Studios"
							? "No studios are available right now. Please check back soon."
							: "Try another category to find available studios."
					}
					showEmptyAction={false}
				/>
			)}
		</>
	);
};

const StudiosPage = () => (
	<Suspense fallback={<RenderSkeleton />}>
		<StudiosContent />
	</Suspense>
);

export default StudiosPage;
