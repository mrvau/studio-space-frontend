import Link from "next/link";
import { ArrowUpRight, Camera, Clapperboard, Mic2, Music2, Palette } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const categories = [
	{
		name: "Photo Studios",
		description: "Spaces for portraits, campaigns, and creative shoots.",
		icon: Camera,
		accent: "bg-violet-500/10 text-violet-600 group-hover:bg-violet-500 group-hover:text-white",
	},
	{
		name: "Sound Stages",
		description: "Production-ready stages for film and video crews.",
		icon: Clapperboard,
		accent: "bg-rose-500/10 text-rose-600 group-hover:bg-rose-500 group-hover:text-white",
	},
	{
		name: "Podcast Rooms",
		description: "Record your next episode in a studio built for sound.",
		icon: Mic2,
		accent: "bg-sky-500/10 text-sky-600 group-hover:bg-sky-500 group-hover:text-white",
	},
	{
		name: "Music Suites",
		description: "Find a room to rehearse, produce, or record.",
		icon: Music2,
		accent: "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
	},
	{
		name: "Art Workshops",
		description: "Hands-on spaces for making, teaching, and sharing.",
		icon: Palette,
		accent: "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white",
	},
];

const BrowseByCategories = () => (
	<section className="container py-6">
		<div className="mb-8 flex flex-col items-center gap-2 text-center">
			<p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
				Find your space
			</p>
			<h2 className="text-3xl font-semibold tracking-tight">Browse by Studio Category</h2>
			<p className="max-w-xl text-muted-foreground">
				From a quiet recording room to a full production stage, find the right space for your craft.
			</p>
		</div>
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
			{categories.map(({ name, description, icon: Icon, accent }) => (
				<Link
					key={name}
					href="/studios"
					className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
					<Card className="h-full gap-0 border-transparent bg-muted/40 py-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-border group-hover:bg-card group-hover:shadow-md">
						<CardContent className="flex h-full min-h-52 flex-col p-5">
							<div
								className={`mb-5 flex size-12 items-center justify-center rounded-xl transition-colors ${accent}`}>
								<Icon className="size-6" aria-hidden="true" />
							</div>
							<div className="mt-auto flex items-start justify-between gap-3">
								<div>
									<h3 className="font-semibold">{name}</h3>
									<p className="mt-1 text-sm leading-relaxed text-muted-foreground">
										{description}
									</p>
								</div>
								<ArrowUpRight
									className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
									aria-hidden="true"
								/>
							</div>
						</CardContent>
					</Card>
				</Link>
			))}
		</div>
	</section>
);

export default BrowseByCategories;
