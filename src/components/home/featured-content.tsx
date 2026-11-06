"use client";

import { use } from "react";
import { IStudio } from "@/types";
import StudioCard from "../studio/studio-card";

interface FeaturedContentProps {
	promise: Promise<{
		success: boolean;
		message: string;
		data: IStudio[];
	}>;
}

const FeaturedContent = ({ promise }: FeaturedContentProps) => {
	const { data } = use(promise);
	const topStudios = [...data]
		.sort((a, b) => b.averageRating - a.averageRating || b.reviewCount - a.reviewCount)
		.slice(0, 6);

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{topStudios.map((studio) => (
				<StudioCard key={studio._id} studio={studio} />
			))}
		</div>
	);
};

export default FeaturedContent;
