import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import StudioCardSkeleton from "@/components/studio/studio-card-skeleton";

function PageHeadingSkeleton({ withAction = false }: { withAction?: boolean }) {
	return (
		<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
			<div className="space-y-2">
				<Skeleton className="h-4 w-28" />
				<Skeleton className="h-9 w-64 max-w-full" />
				<Skeleton className="h-5 w-80 max-w-full" />
			</div>
			{withAction && <Skeleton className="h-10 w-32" />}
		</div>
	);
}

export function MyBookingsPageSkeleton() {
	return (
		<section className="container w-full py-10 sm:py-14" aria-label="Loading bookings" aria-busy="true">
			<PageHeadingSkeleton withAction />
			<div className="grid gap-4 lg:grid-cols-2">
				{Array.from({ length: 4 }, (_, index) => (
					<Card key={index} className="gap-0 py-0">
						<CardHeader className="gap-4 border-b py-5">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0 flex-1 space-y-2">
									<Skeleton className="h-3 w-32" />
									<CardTitle><Skeleton className="h-6 w-52 max-w-full" /></CardTitle>
								</div>
								<Skeleton className="h-6 w-24 rounded-full" />
							</div>
						</CardHeader>
						<CardContent className="space-y-4 py-5">
							<div className="grid gap-4 sm:grid-cols-2">
								{Array.from({ length: 4 }, (_, detailIndex) => (
									<div className="flex items-center gap-2.5" key={detailIndex}>
										<Skeleton className="size-4 shrink-0 rounded-full" />
										<Skeleton className="h-4 w-32 max-w-full" />
									</div>
								))}
							</div>
							<Skeleton className="h-4 w-48 max-w-full" />
						</CardContent>
						<CardFooter className="flex justify-between gap-3 border-t px-5 py-4">
							<Skeleton className="h-9 w-28" />
							<Skeleton className="h-9 w-32" />
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	);
}

export function StudioDetailsPageSkeleton() {
	return (
		<section className="container w-full py-8 sm:py-12" aria-label="Loading studio details" aria-busy="true">
			<div className="mx-auto max-w-6xl">
				<Skeleton className="mb-6 h-5 w-36" />
				<div className="mb-6 flex flex-wrap items-end justify-between gap-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-28" />
						<Skeleton className="h-10 w-80 max-w-full" />
						<Skeleton className="h-5 w-64 max-w-full" />
					</div>
					<Skeleton className="h-10 w-36 rounded-full" />
				</div>
				<div className="grid gap-3 sm:grid-cols-3">
					<Skeleton className="aspect-4/3 rounded-2xl sm:col-span-2 sm:row-span-2" />
					<Skeleton className="hidden aspect-4/3 rounded-2xl sm:block" />
					<Skeleton className="hidden aspect-4/3 rounded-2xl sm:block" />
				</div>
				<div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
					<div className="space-y-10">
						{Array.from({ length: 4 }, (_, index) => (
							<div className="space-y-4" key={index}>
								<Skeleton className="h-8 w-64 max-w-full" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-11/12" />
									<Skeleton className="h-4 w-3/4" />
								</div>
							</div>
						))}
					</div>
					<aside className="h-fit space-y-5 rounded-2xl border p-6">
						<Skeleton className="h-8 w-36" />
						<Skeleton className="h-4 w-44" />
						<Skeleton className="h-11 w-full" />
					</aside>
				</div>
			</div>
		</section>
	);
}

export function StudioFormPageSkeleton() {
	return (
		<section className="container w-full py-10 sm:py-14" aria-label="Loading studio form" aria-busy="true">
			<div className="mx-auto max-w-4xl">
				<Skeleton className="mb-7 h-5 w-40" />
				<div className="mb-8 space-y-3">
					<Skeleton className="size-12 rounded-2xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-28" />
						<Skeleton className="h-9 w-72 max-w-full" />
						<Skeleton className="h-5 w-96 max-w-full" />
					</div>
				</div>
				<div className="space-y-6">
					{Array.from({ length: 3 }, (_, sectionIndex) => (
						<Card key={sectionIndex}>
							<CardHeader className="flex gap-2">
								<Skeleton className="size-10 rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-5 w-40" />
									<Skeleton className="h-4 w-72 max-w-full" />
								</div>
							</CardHeader>
							<CardContent className="space-y-5">
								{Array.from({ length: sectionIndex === 0 ? 4 : 3 }, (_, fieldIndex) => (
									<div className="space-y-2" key={fieldIndex}>
										<Skeleton className="h-4 w-28" />
										<Skeleton className={fieldIndex === 2 ? "h-24 w-full" : "h-10 w-full"} />
									</div>
								))}
							</CardContent>
						</Card>
					))}
					<div className="flex justify-end gap-3">
						<Skeleton className="h-11 w-28" />
						<Skeleton className="h-11 w-36" />
					</div>
				</div>
			</div>
		</section>
	);
}

export function MyListingsPageSkeleton() {
	return (
		<section className="container w-full py-10 sm:py-14" aria-label="Loading your studio listings" aria-busy="true">
			<PageHeadingSkeleton withAction />
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }, (_, index) => <StudioCardSkeleton key={index} />)}
			</div>
		</section>
	);
}
