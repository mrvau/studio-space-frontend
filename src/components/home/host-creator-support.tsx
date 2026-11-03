import { BadgeCheck, Headset, ShieldCheck, Wrench } from "lucide-react";

const assurances = [
	{
		title: "Liability Protection",
		description:
			"Protection for eligible bookings helps give creators and hosts added peace of mind.",
		icon: ShieldCheck,
	},
	{
		title: "Verified Profiles",
		description: "Identity checks help creators feel confident about who they are booking with.",
		icon: BadgeCheck,
	},
	{
		title: "Equipment Safety",
		description: "Clear equipment details and safety guidance help every session start smoothly.",
		icon: Wrench,
	},
	{
		title: "24/7 Host Support",
		description: "Help is available around the clock when hosts or creators need assistance.",
		icon: Headset,
	},
];

const HostCreatorSupport = () => (
	<section id="about-us" className="py-16">
		<div className="container">
			<div className="mb-10 text-center">
				<p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
					Host guarantee & creator support
				</p>
				<h2 className="mt-2 text-3xl font-semibold tracking-tight">Create with confidence</h2>
				<p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
					From your first booking to the final take, we work to make every studio session feel
					supported.
				</p>
			</div>

			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{assurances.map(({ title, description, icon: Icon }) => (
					<li
						key={title}
						className="rounded-2xl border bg-card p-6 transition-colors hover:bg-muted/40">
						<div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
							<Icon className="size-6" aria-hidden="true" />
						</div>
						<h3 className="font-semibold">{title}</h3>
						<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
					</li>
				))}
			</ul>
		</div>
	</section>
);

export default HostCreatorSupport;
