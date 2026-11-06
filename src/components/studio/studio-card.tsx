import { IStudio } from "@/types";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const StudioCard = ({ studio }: { studio: IStudio }) => {
	return (
		<Card className="group gap-0 py-0 transition-shadow hover:shadow-lg">
			<div className="relative aspect-4/3 overflow-hidden">
				<Image
					src={studio.imageURL}
					alt={studio.title}
					fill
					unoptimized
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
					{studio.category}
				</span>
				<span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur">
					<Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
					{studio.averageRating.toFixed(1)}
				</span>
			</div>
			<CardHeader className="gap-2 pt-4">
				<div className="flex items-start justify-between gap-3">
					<CardTitle className="line-clamp-1 text-base font-semibold">{studio.title}</CardTitle>
					<p className="shrink-0 text-sm font-semibold">
						${studio.hourlyRate} <span className="font-normal text-muted-foreground">/ hr</span>
					</p>
				</div>
			</CardHeader>
			<CardContent className="pb-4 text-sm text-muted-foreground">{studio.address}</CardContent>
			<CardFooter className="border-t px-4 py-3">
				<Link href={`/studios/${studio._id}`} className={buttonVariants({ className: "w-full" })}>
					View Details
				</Link>
			</CardFooter>
		</Card>
	);
};

export default StudioCard;
