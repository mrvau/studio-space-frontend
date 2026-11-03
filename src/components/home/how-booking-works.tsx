import { CalendarCheck2, Clock3, Search, Sparkles } from "lucide-react";

const steps = [
	{
		title: "Discover Spaces",
		description: "Explore inspiring studios and find the right setting for your idea.",
		icon: Search,
	},
	{
		title: "Select Shoot Hours",
		description: "Choose a date and the hours that work for your production.",
		icon: Clock3,
	},
	{
		title: "Book Instantly",
		description: "Confirm your booking and get ready for a smooth studio session.",
		icon: CalendarCheck2,
	},
	{
		title: "Create & Produce",
		description: "Arrive, make something brilliant, and bring your vision to life.",
		icon: Sparkles,
	},
];

const HowBookingWorks = () => (
	<section id="how-it-works" className="bg-muted/40 py-16">
		<div className="container">
			<div className="mb-12 flex flex-col items-center gap-2 text-center">
				<p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
					Simple from start to finish
				</p>
				<h2 className="text-3xl font-semibold tracking-tight">How Booking Works</h2>
				<p className="max-w-xl text-muted-foreground">
					Four easy steps take you from finding a space to bringing your next project to life.
				</p>
			</div>

			<ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
				{steps.map(({ title, description, icon: Icon }, index) => (
					<li key={title} className="relative flex flex-col items-center text-center">
						{index < steps.length - 1 && (
							<div
								className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-5rem)] bg-border lg:block"
								aria-hidden="true"
							/>
						)}
						<div className="relative mb-5 flex size-16 items-center justify-center rounded-2xl border bg-background text-primary shadow-sm">
							<Icon className="size-7" aria-hidden="true" />
							<span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
								{index + 1}
							</span>
						</div>
						<h3 className="text-lg font-semibold">{title}</h3>
						<p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
							{description}
						</p>
					</li>
				))}
			</ol>
		</div>
	</section>
);

export default HowBookingWorks;
