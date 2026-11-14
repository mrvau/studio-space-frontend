"use client";

import Image from "next/image";
import { Images } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function StudioGallery({ images, title }: { images: string[]; title: string }) {
	if (!images.length) {
		return (
			<div className="flex aspect-16/7 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
				<Images className="mr-2 size-5" />
				No photos available
			</div>
		);
	}

	return (
		<Carousel opts={{ loop: true }} className="overflow-hidden rounded-2xl bg-muted">
			<CarouselContent className="ml-0">
				{images.map((image, index) => (
					<CarouselItem key={`${image}-${index}`} className="pl-0">
						<div className="relative aspect-16/7 min-h-64 w-full">
							<Image
								src={image}
								alt={`${title} photo ${index + 1}`}
								fill
								priority={index === 0}
								unoptimized
								sizes="(max-width: 768px) 100vw, 1152px"
								className="object-cover"
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			{images.length > 1 && (
				<>
					<CarouselPrevious
						aria-label="Previous photo"
						variant="secondary"
						className="left-3 z-10 border-0 bg-background/90"
					/>
					<CarouselNext
						aria-label="Next photo"
						variant="secondary"
						className="right-3 z-10 border-0 bg-background/90"
					/>
				</>
			)}
		</Carousel>
	);
}
