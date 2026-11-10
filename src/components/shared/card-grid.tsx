import { IStudio, SuccessPromise } from "@/types";
import StudioCard from "../studio/studio-card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../ui/empty";
import { Building2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const getStudios = async (query: string | null): SuccessPromise<IStudio[]> => {
	const studioApiUrl = `${process.env.API_BASE_URL}/studio`;

	console.log(studioApiUrl, query);

	const response = await fetch(query ? `${studioApiUrl}${query}` : studioApiUrl);
	return response.json();
};

const CardGrid = async ({
	manage = false,
	query = null,
}: {
	manage?: boolean;
	query?: string | null;
}) => {
	const { data: studios } = await getStudios(query);

	console.log(studios);

	return (
		<>
			{studios.length ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{studios.map((studio) => (
						<StudioCard key={studio._id} manage={manage} studio={studio} />
					))}
				</div>
			) : (
				<Empty className="border border-dashed">
					<EmptyHeader>
						<EmptyMedia>
							<Building2 />
						</EmptyMedia>
						<EmptyTitle>No studios listed yet</EmptyTitle>
						<EmptyDescription>
							Add your first creative space and it will appear here for you to manage.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button nativeButton={false} render={<Link href={"/add-studio"} />}>
							Add your first studio
						</Button>
					</EmptyContent>
				</Empty>
			)}
		</>
	);
};

export default CardGrid;
