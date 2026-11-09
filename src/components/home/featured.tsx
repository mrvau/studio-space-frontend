import { CircleStar } from "lucide-react";
import { Suspense } from "react";
import RenderSkeleton from "../shared/render-skeleton";
import CardGrid from "../shared/card-grid";

const FeaturedSection = () => {
	const query = "limit=6";
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
				<CardGrid query={query} />
			</Suspense>
		</section>
	);
};

export default FeaturedSection;
