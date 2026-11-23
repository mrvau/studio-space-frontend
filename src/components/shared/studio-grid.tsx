"use client";

import { IStudio } from "@/types";
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

const StudioGrid = ({
	studios,
	manage = false,
	emptyDescription = "Add your first creative space and it will appear here for you to manage.",
	showEmptyAction = true,
}: {
	studios: IStudio[];
	manage?: boolean;
	emptyDescription?: string;
	showEmptyAction?: boolean;
}) =>
	studios.length ? (
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
				<EmptyDescription>{emptyDescription}</EmptyDescription>
			</EmptyHeader>
			{showEmptyAction && (
				<EmptyContent>
					<Button nativeButton={false} render={<Link href="/add-studio" />}>
						Add your first studio
					</Button>
				</EmptyContent>
			)}
		</Empty>
	);

export default StudioGrid;
