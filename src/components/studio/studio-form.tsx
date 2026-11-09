"use client";

import { SubmitEvent, useState } from "react";
import FormSectionWrapper from "../shared/form-section-wrapper";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { BadgeCheck, Building2, ImagePlus, MapPin, Sparkles } from "lucide-react";
import { toast } from "../ui/toast";
import { User } from "better-auth";
import { useRouter } from "next/navigation";
import { IStudio, StudioCategory } from "@/types";

const categories = [
	{ label: "Select category", value: null },
	{ label: "Photo Studio", value: "Photo Studio" },
	{ label: "Film Stage", value: "Film Stage" },
	{ label: "Podcast Lounge", value: "Podcast Lounge" },
	{ label: "Music Suite", value: "Music Suite" },
	{ label: "Workshop", value: "Workshop" },
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

interface StudioFormProps {
	user: User;
	mode: "create" | "update";
}

const StudioForm = ({ user, mode }: StudioFormProps) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCreateStudio = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isSubmitting) return;

		const formData = new FormData(e.currentTarget);
		const gallery = String(formData.get("gallery") ?? "")
			.split(/\r?\n/)
			.map((url) => url.trim())
			.filter(Boolean);

		const studio: Omit<IStudio, "_id"> = {
			title: String(formData.get("title") ?? "").trim(),
			category: String(formData.get("category")) as StudioCategory,
			hourlyRate: Number(formData.get("hourlyRate")),
			securityDeposit: Number(formData.get("securityDeposit")),
			maxCapacity: Number(formData.get("maxCapacity")),
			address: String(formData.get("address") ?? "").trim(),
			imageURL: String(formData.get("imageURL") ?? "").trim(),
			gallery,
			amenities: formData.getAll("amenities").map(String),
			overview: String(formData.get("overview") ?? "").trim(),
			ownerId: user.id,
			ownerName: user.name,
			ownerEmail: user.email,
			availabilityStatus: "Available",
			averageRating: +(Math.random() * 5.0).toFixed(1),
			reviewCount: Math.floor(Math.random() * 50),
		};

		try {
			setIsSubmitting(true);

			const response = await fetch("http://localhost:8000/api/v1/studio", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(studio),
			});

			if (!response.ok) throw new Error("Unable to create new studio.");

			toast.add({
				type: "success",
				title: "Successfully added new studio.",
				description: "Visit My Listings to view newly added studio.",
			});
			router.push("/my-listings");
		} catch (error: unknown) {
			toast.add({
				type: "error",
				title: error instanceof Error ? error.message : "Something went wrong.",
				description: "Please try again later.",
			});
		}
	};

	const handleUpdateStudio = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form
			onSubmit={mode === "create" ? handleCreateStudio : handleUpdateStudio}
			className="space-y-6">
			<FormSectionWrapper
				icon={Building2}
				title="Studio details"
				description="Give your space a name and choose the category that fits it best.">
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
					<FieldError>Studio title is required.</FieldError>
				</Field>
				<div className="grid gap-5 sm:grid-cols-2">
					<Field>
						<FieldLabel htmlFor="category">
							Category <span className="text-destructive">*</span>
						</FieldLabel>
						<Select name="category" items={categories} required>
							<SelectTrigger id="category">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{categories.map((category) => (
										<SelectItem key={category.value} value={category.value}>
											{category.label}
										</SelectItem>
									))}
								</SelectGroup>
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
			</FormSectionWrapper>

			<FormSectionWrapper
				icon={MapPin}
				title="Location and pricing"
				description="Help creators plan their visit and understand your rates.">
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
			</FormSectionWrapper>

			<FormSectionWrapper
				icon={ImagePlus}
				title="Photos and overview"
				description="Show what makes your studio a great place to create.">
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
					<FieldDescription>Optional. Enter one image URL per line.</FieldDescription>
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
			</FormSectionWrapper>

			<FormSectionWrapper
				icon={Sparkles}
				title="Amenities"
				description="Select everything included with your space."
				className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{amenities.map((amenity, index) => (
					<Field
						key={amenity}
						orientation="horizontal"
						className="px-2 py-4 rounded-2xl cursor-pointer border border-border has-data-checked:bg-primary/5">
						<Checkbox
							id={`amenity-${index}`}
							name="amenities"
							value={amenity}
							className="cursor-pointer"
						/>
						<FieldLabel htmlFor={`amenity-${index}`} className="cursor-pointer">
							{amenity}
						</FieldLabel>
					</Field>
				))}
			</FormSectionWrapper>

			<FormSectionWrapper
				icon={BadgeCheck}
				title="Host information"
				description="This information comes from your account."
				className="grid gap-5 sm:grid-cols-2">
				<Field>
					<FieldLabel htmlFor="ownerName">Your name</FieldLabel>
					<Input
						id="ownerName"
						value={user.name}
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
						value={user.email}
						readOnly
						aria-readonly="true"
						className="bg-background read-only:opacity-80"
					/>
				</Field>
			</FormSectionWrapper>

			<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
				<Button
					type="button"
					variant="outline"
					size={"lg"}
					nativeButton={false}
					render={<Link href="/" />}>
					Cancel
				</Button>
				<Button type="submit" size="lg" className={"cursor-pointer"} disabled={isSubmitting}>
					{isSubmitting ? "Preparing…" : "Create studio"}
				</Button>
			</div>
		</form>
	);
};

export default StudioForm;
