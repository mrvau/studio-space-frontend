"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudioGallery({ images, title }: { images: string[]; title: string }) {
	const [active, setActive] = useState(0);
	if (!images.length)
		return (
			<div className="flex aspect-16/7 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
				<Images className="mr-2 size-5" />
				No photos available
			</div>
		);
	const move = (offset: number) =>
		setActive((current) => (current + offset + images.length) % images.length);
	return (
		<div className="relative overflow-hidden rounded-2xl bg-muted">
			<div className="relative aspect-16/7 min-h-64 w-full">
				<Image
					src={images[active]}
					alt={`${title} photo ${active + 1}`}
					fill
					priority
					unoptimized
					sizes="(max-width: 768px) 100vw, 1152px"
					className="object-cover"
				/>
			</div>
			{images.length > 1 && (
				<>
					<Button
						type="button"
						variant="secondary"
						size="icon"
						aria-label="Previous photo"
						onClick={() => move(-1)}
						className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full">
						<ChevronLeft />
					</Button>
					<Button
						type="button"
						variant="secondary"
						size="icon"
						aria-label="Next photo"
						onClick={() => move(1)}
						className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full">
						<ChevronRight />
					</Button>
					<div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
						{active + 1} / {images.length}
					</div>
				</>
			)}
		</div>
	);
}
