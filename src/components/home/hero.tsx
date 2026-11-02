"use client";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
	return (
		<section className="flex flex-col items-center justify-center w-full h-full py-10">
			<div className="absolute top-0 left-0 -z-20 w-full h-3/4 bg-black/80" />
			<Carousel
				plugins={[Autoplay({ delay: 4000 })]}
				opts={{ loop: true }}
				className="absolute top-0 left-0 w-full h-3/4 -z-30 [&>div]:h-full">
				<CarouselContent style={{ height: "100%" }}>
					<CarouselItem className="relative w-full h-full">
						<Image
							src={"/photo-studio.jpg"}
							alt="Photo Studio"
							className="object-cover"
							fill
							sizes="100vw"
						/>
					</CarouselItem>
					<CarouselItem className="relative w-full h-full">
						<Image
							src={"/music-studio.jpg"}
							alt="Music Studio"
							className="object-cover"
							fill
							sizes="100vw"
						/>
					</CarouselItem>
					<CarouselItem className="relative w-full h-full">
						<Image
							src={"/podcast-studio.jpg"}
							alt="Podcast Studio"
							className="object-cover"
							fill
							sizes="100vw"
						/>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
			<div className="flex flex-col items-center justify-center gap-4 text-center">
				<h1 className="text-4xl font-bold text-primary-foreground">
					Find Your Space.
					<br />
					Create Something <span className="text-primary">Extraordinary.</span>
				</h1>
				<p className="max-w-2xl text-primary-foreground/80">
					Discover and book inspiring creative spaces built for your next big idea. From photography
					studios and film stages to podcast lounges and music suites, find the perfect space, check
					real-time availability, and book effortlessly.
				</p>
				<Button>
					<Link href="/">Explore Studios</Link>
				</Button>
			</div>
		</section>
	);
};

export default HeroSection;
