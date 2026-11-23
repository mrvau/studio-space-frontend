import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function StudioIllustration() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 560 360"
			fill="none"
			className="h-auto w-full max-w-xl"
			role="img">
			<rect x="24" y="20" width="512" height="320" rx="32" className="fill-muted" />
			<circle cx="430" cy="91" r="40" className="fill-accent" />
			<path
				d="M24 259h512v49a32 32 0 0 1-32 32H56a32 32 0 0 1-32-32v-49Z"
				className="fill-secondary"
			/>
			<path d="M24 259h512" className="stroke-border" strokeWidth="3" />

			{/* Hanging studio light */}
			<path d="M279 20v37" className="stroke-muted-foreground" strokeWidth="3" />
			<path
				d="m250 57-23 43h104l-23-43h-58Z"
				className="fill-card stroke-border"
				strokeWidth="3"
				strokeLinejoin="round"
			/>
			<path d="M241 100h76" className="stroke-primary" strokeWidth="5" strokeLinecap="round" />
			<path
				d="m249 107-28 90m88-90 28 90"
				className="stroke-primary/20"
				strokeWidth="3"
				strokeDasharray="6 8"
			/>

			{/* Backdrop and stand */}
			<path
				d="M93 258V152a10 10 0 0 1 10-10h111a10 10 0 0 1 10 10v106"
				className="fill-card stroke-border"
				strokeWidth="3"
			/>
			<path d="M104 258v-96a9 9 0 0 1 9-9h91a9 9 0 0 1 9 9v96" className="fill-accent/60" />
			<path
				d="M92 259h144m-122 0-12 31m112-31 12 31"
				className="stroke-muted-foreground"
				strokeWidth="3"
				strokeLinecap="round"
			/>

			{/* Camera on a tripod */}
			<path
				d="m356 214 1-19a12 12 0 0 1 12-11h72a12 12 0 0 1 12 12v34h-97v-16Z"
				className="fill-primary stroke-primary"
				strokeWidth="3"
				strokeLinejoin="round"
			/>
			<path
				d="M453 207h24a10 10 0 0 1 10 10v13h-34v-23Z"
				className="fill-primary/75 stroke-primary"
				strokeWidth="3"
			/>
			<circle
				cx="402"
				cy="213"
				r="17"
				className="fill-background stroke-primary-foreground"
				strokeWidth="4"
			/>
			<circle
				cx="402"
				cy="213"
				r="8"
				className="fill-primary/30 stroke-primary-foreground"
				strokeWidth="2"
			/>
			<path
				d="M410 250v20m-1 0-37 39m38-39 38 39m-38-39v48"
				className="stroke-foreground/70"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M346 250h120" className="stroke-border" strokeWidth="5" strokeLinecap="round" />

			{/* Clapperboard and creative spark */}
			<path
				d="m118 220 47-9 9 45-47 9-9-45Z"
				className="fill-card stroke-primary"
				strokeWidth="3"
				strokeLinejoin="round"
			/>
			<path
				d="m116 216 46-9 5 17-46 9-5-17Z"
				className="fill-primary/20 stroke-primary"
				strokeWidth="3"
				strokeLinejoin="round"
			/>
			<path d="m126 211 8 13m8-16 8 13m8-16 8 13" className="stroke-primary" strokeWidth="3" />
			<path d="m475 116 5 13 13 5-13 5-5 13-5-13-13-5 13-5 5-13Z" className="fill-primary" />
			<circle cx="100" cy="93" r="6" className="fill-primary/50" />
		</svg>
	);
}

export default function NotFound() {
	return (
		<section className="container flex min-h-[65vh] flex-col items-center justify-center px-4 py-14 text-center sm:py-20">
			<StudioIllustration />
			<div className="mt-8 flex flex-col items-center">
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Error 404</p>
				<h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					This creative space is off the map
				</h1>
				<p className="mt-3 max-w-lg text-muted-foreground">
					We couldn’t find the page you were looking for. Let’s get you back to a place where ideas
					can come to life.
				</p>
				<Button size="lg" className="mt-7" nativeButton={false} render={<Link href="/" />}>
					<ArrowLeft aria-hidden="true" />
					Return to Home
				</Button>
			</div>
		</section>
	);
}
