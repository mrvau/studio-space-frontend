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
		<section className="flex flex-col items-center justify-center w-full h-[70vh] sm:h-[45vh] lg:h-[70vh]">
			<div className="absolute top-0 w-full h-full -z-30">
				<Carousel
					plugins={[Autoplay({ delay: 4000 })]}
					opts={{ loop: true }}
					className="w-full h-full">
					<CarouselContent className="h-[75vh] sm:h-[50vh] lg:h-[75vh]">
						{STUDIOS.map((studio) => (
							<CarouselItem key={studio.id} className="h-full">
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
			</div>
			<div className="relative -top-20 flex flex-col items-center justify-center gap-6 text-center px-4">
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
				<Button>
					<Link href="/studios">Explore Studios</Link>
				</Button>
			</div>
		</section>
	);
};

export default HeroSection;
