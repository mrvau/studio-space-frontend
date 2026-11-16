import { Suspense } from "react";
import CardGrid from "@/components/shared/card-grid";
import RenderSkeleton from "@/components/shared/render-skeleton";
import { IStudio, APIPromise } from "@/types";

const getAllStudios = async (): APIPromise<IStudio[]> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/studio`);
	return response.json();
};

const StudiosPage = async () => {
	const allStudios = getAllStudios();
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
			<Suspense fallback={<RenderSkeleton />}>
				<CardGrid studioPromise={allStudios} />
			</Suspense>
		</section>
	);
};

export default StudiosPage;
