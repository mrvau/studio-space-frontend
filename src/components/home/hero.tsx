"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const STUDIOS = [
	{
		id: "photo",
		src: "/photo-studio.jpg",
		alt: "Photo Studio",
	},
	{
		id: "music",
		src: "/music-studio.jpg",
		alt: "Music Studio",
	},
	{
		id: "podcast",
		src: "/podcast-studio.jpg",
		alt: "Podcast Studio",
	},
];

const HeroSection = () => {
	return (
		<section className="relative flex flex-col items-center justify-center w-full h-120">
			<Carousel
				plugins={[Autoplay({ delay: 4000 })]}
				opts={{ loop: true }}
				className="absolute top-0 -z-30 w-full">
				<CarouselContent className="w-full h-120 ml-0">
					{STUDIOS.map((studio) => (
						<CarouselItem key={studio.id} className="h-full pl-0">
							<div className="relative h-full w-full">
								<Image
									src={studio.src}
									alt={studio.alt}
									className="object-cover brightness-20"
									fill
									preload={true}
									sizes="100vw"
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<div className="flex flex-col items-center justify-center gap-6 text-center px-4 mt-14">
				<div className="flex flex-col items-center gap-2">
					<h1 className="text-3xl sm:text-4xl leading-8 md:leading-10 lg:leading-14 font-bold text-primary-foreground">
						Find Your Space.
						<br />
						Create Something <span className="text-primary">Extraordinary.</span>
					</h1>
					<p className="max-w-2xl text-xs sm:text-base text-primary-foreground/80">
						Discover and book inspiring creative spaces built for your next big idea. From
						photography studios and film stages to podcast lounges and music suites, find the
						perfect space, check real-time availability, and book effortlessly.
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<Button nativeButton={false} size="lg" render={<Link href="/studios" />}>
						Explore Studios
					</Button>
					<Button
						variant="outline"
						className="backdrop-blur-sm border-2 border-primary/50!"
						nativeButton={false}
						size="lg"
						render={<Link href="/studios" />}>
						Host Your Space
					</Button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
