import { CircleStar } from "lucide-react";
import { Suspense } from "react";
import RenderSkeleton from "../shared/render-skeleton";
import CardGrid from "../shared/card-grid";
import { IStudio, APIPromise } from "@/types";

const getFeaturedStudios = async (): APIPromise<IStudio[]> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/studio/featured`);
	return response.json();
};

const FeaturedSection = () => {
	const featuredStudios = getFeaturedStudios();
	return (
		<section className="container py-6">
			<div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">
				<CircleStar size={32} />
				<h2 className="text-3xl font-semibold tracking-tight">Featured Studios</h2>
				<p className="text-muted-foreground">
					Explore some of the most loved creative spaces, selected for your next great idea.
				</p>
			</div>
			<Suspense fallback={<RenderSkeleton />}>
				<CardGrid studioPromise={featuredStudios} />
			</Suspense>
		</section>
	);
};

export default FeaturedSection;
