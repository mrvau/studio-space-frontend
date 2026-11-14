import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, MapPin, Star, Users, Wallet } from "lucide-react";
import type { IStudio } from "@/types";
import StudioBooking from "@/components/studio/studio-booking";
import StudioGallery from "@/components/studio/studio-gallery";

async function getStudio(id: string): Promise<IStudio | null> {
	try {
		const response = await fetch(`${process.env.API_BASE_URL}/studio/${id}`);
		if (response.status === 404) return null;
		if (!response.ok) throw new Error("Unable to load studio");
		const result = await response.json();
		return result.data ?? result;
	} catch {
		return null;
	}
}

export default async function StudioDetailsPage({ params }: PageProps<"/studios/[id]">) {
	const { id } = await params;
	const studio = await getStudio(id);

	if (!studio) notFound();

	return (
		<section className="container w-full py-8 sm:py-12">
			<div className="mx-auto max-w-6xl">
				<Link
					href="/studios"
					className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
					<ArrowLeft className="size-4" /> Back to studios
				</Link>
				<div className="mb-6 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
							{studio.category}
						</p>
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{studio.title}</h1>
						<p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
							<MapPin className="size-4" />
							{studio.address}
						</p>
					</div>
					<div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
						<Star className="size-4 fill-amber-400 text-amber-400" />
						<strong>{Number(studio.averageRating ?? 0).toFixed(1)}</strong>
						<span className="text-muted-foreground">({studio.reviewCount ?? 0} reviews)</span>
					</div>
				</div>

				<StudioGallery
					images={[studio.imageURL, ...(studio.gallery ?? [])].filter(Boolean)}
					title={studio.title}
				/>

				<div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
					<div className="space-y-10">
						<section>
							<h2 className="text-2xl font-semibold">About this workspace</h2>
							<p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">
								{studio.overview || "No workspace description is available yet."}
							</p>
						</section>
						<section>
							<h2 className="text-2xl font-semibold">Workspace specifications</h2>
							<div className="mt-4 grid gap-3 sm:grid-cols-2">
								<Specification
									icon={<Users />}
									label="Maximum capacity"
									value={`${studio.maxCapacity} people`}
								/>
								<Specification
									icon={<Wallet />}
									label="Security deposit"
									value={`$${studio.securityDeposit}`}
								/>
								<Specification
									icon={<BadgeCheck />}
									label="Availability"
									value={studio.availabilityStatus}
								/>
								<Specification
									icon={<Star />}
									label="Hourly rate"
									value={`$${studio.hourlyRate} / hour`}
								/>
							</div>
						</section>
						<section>
							<h2 className="text-2xl font-semibold">Amenities</h2>
							{studio.amenities?.length ? (
								<ul className="mt-4 grid gap-3 sm:grid-cols-2">
									{studio.amenities.map((amenity, index) => (
										<li
											key={`${amenity}-${index}`}
											className="flex items-center gap-3 text-muted-foreground">
											<BadgeCheck className="size-4 text-primary" />
											{amenity}
										</li>
									))}
								</ul>
							) : (
								<p className="mt-3 text-muted-foreground">No amenities have been listed.</p>
							)}
						</section>
						<section className="border-t pt-7">
							<h2 className="text-2xl font-semibold">Meet your host</h2>
							<div className="mt-4 flex items-center gap-4">
								<div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
									{studio.ownerName?.trim().charAt(0).toUpperCase() || "H"}
								</div>
								<div>
									<p className="font-semibold">{studio.ownerName || "Studio host"}</p>
									<p className="text-sm text-muted-foreground">{studio.ownerEmail}</p>
								</div>
							</div>
						</section>
						<section className="border-t pt-7">
							<h2 className="text-2xl font-semibold">Reviews</h2>
							<div className="mt-4 flex items-center gap-2 text-muted-foreground">
								<Star className="size-5 fill-amber-400 text-amber-400" />
								<strong className="text-foreground">
									{Number(studio.averageRating ?? 0).toFixed(1)} out of 5
								</strong>
								<span>· {studio.reviewCount ?? 0} reviews</span>
							</div>
							<p className="mt-2 text-sm text-muted-foreground">
								Individual reviews are not available yet.
							</p>
						</section>
					</div>
					<aside className="h-fit rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-6">
						<p className="text-2xl font-bold">
							${studio.hourlyRate}
							<span className="text-base font-normal text-muted-foreground"> / hour</span>
						</p>
						<p className="mt-1 text-sm text-muted-foreground">
							${studio.securityDeposit} security deposit
						</p>
						<StudioBooking studio={studio} />
					</aside>
				</div>
			</div>
		</section>
	);
}

function Specification({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-center gap-3 rounded-xl border p-4">
			<span className="text-primary">{icon}</span>
			<div>
				<p className="text-sm text-muted-foreground">{label}</p>
				<p className="font-medium">{value}</p>
			</div>
		</div>
	);
}
