"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import type { IStudio, StudioCategory } from "@/types";
import { ArrowLeft, BadgeCheck, Building2, ImagePlus, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, type SubmitEvent } from "react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/router";

const categories: StudioCategory[] = [
	"Photo Studio",
	"Film Stage",
	"Podcast Lounge",
	"Music Suite",
	"Workshop",
];

const amenities = [
	"Natural light",
	"Soundproofing",
	"Lighting equipment",
	"Cyclorama wall",
	"Green screen",
	"Recording equipment",
	"Wi-Fi",
	"Air conditioning",
	"Free parking",
	"Kitchenette",
	"Makeup area",
	"Props and furniture",
];

export default function AddStudioPage() {
	const { data, isPending } = authClient.useSession();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [category, setCategory] = useState<StudioCategory | "">("");
	const router = useRouter();

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isSubmitting) return;
		if (!data?.user) {
			toast.add({
				type: "error",
				title: "Sign in required",
				description: "Please sign in before adding a studio.",
			});
			return;
		}
		setIsSubmitting(true);

		const formData = new FormData(e.currentTarget);
		const gallery = String(formData.get("gallery") ?? "")
			.split(/\r?\n/)
			.map((url) => url.trim())
			.filter(Boolean);
		const studio: Omit<IStudio, "_id"> = {
			title: String(formData.get("title") ?? "").trim(),
			category: category as StudioCategory,
			hourlyRate: Number(formData.get("hourlyRate")),
			securityDeposit: Number(formData.get("securityDeposit")),
			maxCapacity: Number(formData.get("maxCapacity")),
			address: String(formData.get("address") ?? "").trim(),
			imageURL: String(formData.get("imageURL") ?? "").trim(),
			gallery,
			amenities: formData.getAll("amenities").map(String),
			overview: String(formData.get("overview") ?? "").trim(),
			ownerId: data.user.id,
			ownerName: data.user.name,
			ownerEmail: data.user.email,
			availabilityStatus: "Available",
			averageRating: +(Math.random() * (5 - 0) + 5).toFixed(1),
			reviewCount: Math.floor(Math.random() * 50),
		};

		try {
			const res = await fetch("http://localhost:8000/api/v1/studio", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(studio),
			});

			if (!res.ok) {
				toast.add({
					type: "error",
					title: "Failed to add new studio",
					description: "Please try again.",
				});
				return;
			}

			toast.add({
				type: "success",
				title: "Successfully added new studio.",
				description: "Visit My Listings to view newly added studio.",
			});
			router.replace("/my-listings");
		} catch (error) {
			toast.add({
				type: "error",
				title: "Something went wrong!",
				description: "Please try again.",
			});
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="container w-full py-10 sm:py-14">
			<div className="mx-auto max-w-4xl">
				<Link
					href="/"
					className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
					<ArrowLeft className="size-4" />
					Back to home
				</Link>

				<div className="mb-8 space-y-3">
					<div className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
						<Building2 className="size-6" />
					</div>
					<div>
						<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
							For studio hosts
						</p>
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Add a new studio</h1>
						<p className="mt-2 max-w-2xl text-muted-foreground">
							Share your creative space with the people looking for their next great place to make.
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
						<div className="mb-6 flex items-start gap-3">
							<div className="rounded-xl bg-muted p-2.5">
								<Building2 className="size-5 text-primary" />
							</div>
							<div>
								<h2 className="font-semibold">Studio details</h2>
								<p className="text-sm text-muted-foreground">
									Give your space a name and choose the category that fits it best.
								</p>
							</div>
						</div>
						<FieldGroup className="gap-5">
							<Field>
								<FieldLabel htmlFor="title">
									Studio title <span className="text-destructive">*</span>
								</FieldLabel>
								<Input
									id="title"
									name="title"
									placeholder="e.g. The Daylight Loft"
									required
									maxLength={100}
								/>
							</Field>
							<div className="grid gap-5 sm:grid-cols-2">
								<Field>
									<FieldLabel htmlFor="category">
										Category <span className="text-destructive">*</span>
									</FieldLabel>
									<Select
										name="category"
										required
										value={category}
										onValueChange={(value) => setCategory(value ? (value as StudioCategory) : "")}>
										<SelectTrigger
											id="category"
											className="h-8 w-full bg-transparent px-2.5 py-1 text-base md:text-sm dark:bg-input/30"
											aria-label="Category">
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent className="px-2.5 py-1">
											{categories.map((option) => (
												<SelectItem key={option} value={option}>
													{option}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</Field>
								<Field>
									<FieldLabel htmlFor="capacity">
										Maximum capacity <span className="text-destructive">*</span>
									</FieldLabel>
									<Input
										id="capacity"
										name="maxCapacity"
										type="number"
										min="1"
										step="1"
										placeholder="e.g. 12"
										required
									/>
								</Field>
							</div>
						</FieldGroup>
					</section>

					<section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
						<div className="mb-6 flex items-start gap-3">
							<div className="rounded-xl bg-muted p-2.5">
								<MapPin className="size-5 text-primary" />
							</div>
							<div>
								<h2 className="font-semibold">Location and pricing</h2>
								<p className="text-sm text-muted-foreground">
									Help creators plan their visit and understand your rates.
								</p>
							</div>
						</div>
						<FieldGroup className="gap-5">
							<Field>
								<FieldLabel htmlFor="address">
									Location / address <span className="text-destructive">*</span>
								</FieldLabel>
								<Input
									id="address"
									name="address"
									autoComplete="street-address"
									placeholder="Street, city, country"
									required
									maxLength={200}
								/>
							</Field>
							<div className="grid gap-5 sm:grid-cols-2">
								<Field>
									<FieldLabel htmlFor="hourlyRate">
										Hourly rate (USD) <span className="text-destructive">*</span>
									</FieldLabel>
									<div className="relative">
										<span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
											$
										</span>
										<Input
											id="hourlyRate"
											name="hourlyRate"
											type="number"
											min="0.01"
											step="0.01"
											placeholder="75.00"
											className="pl-7"
											required
										/>
									</div>
								</Field>
								<Field>
									<FieldLabel htmlFor="securityDeposit">
										Security deposit (USD) <span className="text-destructive">*</span>
									</FieldLabel>
									<div className="relative">
										<span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
											$
										</span>
										<Input
											id="securityDeposit"
											name="securityDeposit"
											type="number"
											min="0"
											step="0.01"
											placeholder="150.00"
											className="pl-7"
											required
										/>
									</div>
								</Field>
							</div>
						</FieldGroup>
					</section>

					<section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
						<div className="mb-6 flex items-start gap-3">
							<div className="rounded-xl bg-muted p-2.5">
								<ImagePlus className="size-5 text-primary" />
							</div>
							<div>
								<h2 className="font-semibold">Photos and overview</h2>
								<p className="text-sm text-muted-foreground">
									Show what makes your studio a great place to create.
								</p>
							</div>
						</div>
						<FieldGroup className="gap-5">
							<Field>
								<FieldLabel htmlFor="imageURL">
									Image URL <span className="text-destructive">*</span>
								</FieldLabel>
								<Input
									id="imageURL"
									name="imageURL"
									type="url"
									placeholder="https://example.com/your-studio.jpg"
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="gallery">Additional photo URLs</FieldLabel>
								<Textarea
									id="gallery"
									name="gallery"
									placeholder="Add one https:// image URL per line"
									rows={3}
								/>
								<p className="text-xs text-muted-foreground">
									Optional. Enter one image URL per line.
								</p>
							</Field>
							<Field>
								<FieldLabel htmlFor="overview">
									Detailed overview <span className="text-destructive">*</span>
								</FieldLabel>
								<Textarea
									id="overview"
									name="overview"
									placeholder="Describe the space, equipment, natural light, access, and what creators can make here..."
									rows={6}
									required
									minLength={30}
									maxLength={2000}
								/>
							</Field>
						</FieldGroup>
					</section>

					<section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
						<div className="mb-6 flex items-start gap-3">
							<div className="rounded-xl bg-muted p-2.5">
								<Sparkles className="size-5 text-primary" />
							</div>
							<div>
								<h2 className="font-semibold">Amenities</h2>
								<p className="text-sm text-muted-foreground">
									Select everything included with your space.
								</p>
							</div>
						</div>
						<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{amenities.map((amenity) => (
								<div
									key={amenity}
									className="flex items-center gap-3 rounded-xl border p-3 text-sm transition-colors hover:bg-muted/60 has-data-checked:border-primary/50 has-data-checked:bg-primary/5">
									<Checkbox
										id={`amenity-${amenity.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
										name="amenities"
										value={amenity}
									/>
									<FieldLabel
										htmlFor={`amenity-${amenity.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
										className="flex-1 cursor-pointer font-normal">
										{amenity}
									</FieldLabel>
								</div>
							))}
						</div>
					</section>

					<section className="rounded-2xl border bg-muted/40 p-5 sm:p-8">
						<div className="mb-5 flex items-center gap-3">
							<div className="rounded-xl bg-background p-2.5">
								<BadgeCheck className="size-5 text-primary" />
							</div>
							<div>
								<h2 className="font-semibold">Host information</h2>
								<p className="text-sm text-muted-foreground">
									This information comes from your account.
								</p>
							</div>
						</div>
						<div className="grid gap-5 sm:grid-cols-2">
							<Field>
								<FieldLabel htmlFor="ownerName">Your name</FieldLabel>
								<Input
									id="ownerName"
									value={isPending ? "Loading account…" : (data?.user.name ?? "")}
									readOnly
									aria-readonly="true"
									className="bg-background read-only:opacity-80"
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="ownerEmail">Your email</FieldLabel>
								<Input
									id="ownerEmail"
									type="email"
									value={isPending ? "Loading account…" : (data?.user.email ?? "")}
									readOnly
									aria-readonly="true"
									className="bg-background read-only:opacity-80"
								/>
							</Field>
						</div>
					</section>

					<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
						<Button
							type="button"
							variant="outline"
							size={"lg"}
							nativeButton={false}
							render={<Link href="/" />}>
							Cancel
						</Button>
						<Button
							type="submit"
							size="lg"
							className={"cursor-pointer"}
							disabled={isSubmitting || isPending}>
							{isSubmitting ? "Preparing…" : "Create studio"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
