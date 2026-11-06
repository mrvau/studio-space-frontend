import { CircleStar } from "lucide-react";
import FeaturedContent from "./featured-content";
import { Suspense } from "react";
import FeaturedContentSkeleton from "./featured-content-skeleton";

const getFeaturedStudios = async () => {
	const res = await fetch("http://localhost:8000/api/v1/studio");
	return res.json();
};

const FeaturedSection = () => {
	const promise = getFeaturedStudios();

	return (
		<section className="container py-6">
			<div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">
				<CircleStar size={32} />
				<h2 className="text-3xl font-semibold tracking-tight">Featured Studios</h2>
				<p className="text-muted-foreground">
					Explore some of the most loved creative spaces, selected for your next great idea.
				</p>
			</div>
			<Suspense fallback={<FeaturedContentSkeleton />}>
				<FeaturedContent promise={promise} />
			</Suspense>
		</section>
	);
};

export default FeaturedSection;
