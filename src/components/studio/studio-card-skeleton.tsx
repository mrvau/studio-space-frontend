import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const StudioCardSkeleton = () => {
	return (
		<Card className="gap-0 overflow-hidden py-0">
			<div className="relative aspect-4/3">
				<Skeleton className="absolute inset-0 size-full rounded-none" />
				<Skeleton className="absolute left-3 top-3 h-6 w-28 rounded-full" />
				<Skeleton className="absolute right-3 top-3 h-6 w-14 rounded-full" />
			</div>
			<CardHeader className="gap-2 pt-4">
				<div className="flex items-center justify-between gap-3">
					<Skeleton className="h-5 w-2/3" />
					<Skeleton className="h-5 w-20 shrink-0" />
				</div>
			</CardHeader>
			<CardContent className="pb-4">
				<Skeleton className="h-4 w-1/2" />
			</CardContent>
			<CardFooter className="border-t px-4 py-3">
				<Skeleton className="h-8 w-full rounded-lg" />
			</CardFooter>
		</Card>
	);
};

export default StudioCardSkeleton;
