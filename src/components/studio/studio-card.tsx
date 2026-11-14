"use client";

import { IStudio } from "@/types";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Pencil, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { toast } from "../ui/toast";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";
import { Badge } from "../ui/badge";
import { cn } from "cn";
import { useRouter } from "next/navigation";
// import Error from "next/error";

const StudioCard = ({ studio, manage = false }: { studio: IStudio; manage?: boolean }) => {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteStudio = async () => {
		if (isDeleting) return;
		setIsDeleting(true);

		try {
			const response = await fetch(`http://localhost:8000/api/v1/studio/${studio._id}`, {
				method: "DELETE",
			});

			if (!response.ok) throw new Error("Unable to delete studio.");

			toast.add({
				type: "success",
				title: "Studio deleted",
				description: `${studio.title} was removed from your listings.`,
			});
			router.refresh();
		} catch (error: unknown) {
			toast.add({
				type: "error",
				title: error instanceof Error ? error.message : "Something went wrong.",
				description: "Please try again after some time.",
			});
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Card className="group gap-0 py-0 transition-shadow hover:shadow-lg">
			<div className="relative aspect-4/3 overflow-hidden">
				<Image
					src={studio.imageURL}
					alt={studio.title}
					fill
					unoptimized
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<Badge className="absolute left-3 top-3">{studio.category}</Badge>
				<Badge variant="secondary" className="absolute right-3 top-3 font-semibold">
					<Star
						data-icon="inline-start"
						className="fill-amber-400 text-amber-400"
						aria-hidden="true"
					/>
					{studio.averageRating.toFixed(1)}
				</Badge>
			</div>
			<CardHeader className="gap-2 pt-4">
				<div className="flex items-start justify-between gap-3">
					<CardTitle className="line-clamp-1 text-base font-semibold">{studio.title}</CardTitle>
					<p className="shrink-0 text-sm font-semibold">
						${studio.hourlyRate} <span className="font-normal text-muted-foreground">/ hr</span>
					</p>
				</div>
			</CardHeader>
			<CardContent className="w-xs pb-4 text-sm text-muted-foreground">
				<p className="truncate">{studio.address}</p>
			</CardContent>
			<CardFooter className="flex flex-col gap-2 border-t px-4 py-3">
				{manage && (
					<div className="flex items-center gap-2 w-full">
						<Link
							href={`/studios/edit/${studio._id}`}
							className={buttonVariants({ variant: "outline", className: "flex-1" })}>
							<Pencil aria-hidden="true" /> Update
						</Link>
						<Dialog>
							<DialogTrigger
								className={cn(buttonVariants({ variant: "destructive" }), "cursor-pointer")}>
								{isDeleting ? <Spinner /> : <Trash2 />}
								{isDeleting ? "Deleting..." : "Delete"}
							</DialogTrigger>
							<DialogContent showCloseButton={false}>
								<DialogHeader>
									<DialogTitle>Delete this studio?</DialogTitle>
									<DialogDescription>
										<span className="font-semibold text-primary-foreground">
											&ldquo;{studio.title}&rdquo;
										</span>{" "}
										will be removed permanently from your listings
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<DialogClose>Cancel</DialogClose>
									<DialogClose
										className={cn(buttonVariants({ variant: "destructive" }), "cursor-pointer")}
										disabled={isDeleting}
										onClick={handleDeleteStudio}>
										<Trash2 /> Delete Studio
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				)}

				<Link
					href={`/studios/${studio._id}`}
					className={buttonVariants({ className: manage ? "w-full" : "w-full" })}>
					View Details
				</Link>
			</CardFooter>
		</Card>
	);
};

export default StudioCard;
