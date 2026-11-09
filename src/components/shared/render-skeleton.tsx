import StudioCardSkeleton from "../studio/studio-card-skeleton";

const RenderSkeleton = () => (
	<div
		className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
		aria-label="Loading featured studios"
		aria-busy="true">
		{Array.from({ length: 6 }, (_, index) => (
			<StudioCardSkeleton key={index} />
		))}
	</div>
);

export default RenderSkeleton;
