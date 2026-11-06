"use client";

import { IStudio } from "@/types";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { LoaderCircle, Pencil, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "../ui/toast";

const StudioCard = ({ studio, manage = false, onDeleted }: { studio: IStudio; manage?: boolean; onDeleted?: (id: string) => void }) => {
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteStudio = async () => {
		if (isDeleting) return;
		setIsDeleting(true);
		try {
			const response = await fetch(`http://localhost:8000/api/v1/studio/${studio._id}`, { method: "DELETE" });
			if (!response.ok) throw new Error("Delete request failed");
			onDeleted?.(studio._id);
			setConfirmingDelete(false);
			toast.add({ type: "success", title: "Studio deleted", description: `${studio.title} was removed from your listings.` });
		} catch {
			toast.add({ type: "error", title: "Could not delete studio", description: "Please try again." });
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
				<span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
					{studio.category}
				</span>
				<span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur">
					<Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
					{studio.averageRating.toFixed(1)}
				</span>
			</div>
			<CardHeader className="gap-2 pt-4">
				<div className="flex items-start justify-between gap-3">
					<CardTitle className="line-clamp-1 text-base font-semibold">{studio.title}</CardTitle>
					<p className="shrink-0 text-sm font-semibold">
						${studio.hourlyRate} <span className="font-normal text-muted-foreground">/ hr</span>
					</p>
				</div>
			</CardHeader>
			<CardContent className="pb-4 text-sm text-muted-foreground">{studio.address}</CardContent>
			<CardFooter className="flex flex-wrap gap-2 border-t px-4 py-3">
				{manage && <Link href={`/update-studio/${studio._id}`} className={buttonVariants({ variant: "outline", className: "flex-1" })}>
					<Pencil aria-hidden="true" /> Update
				</Link>}
				{manage && <Button type="button" variant="destructive" className="flex-1" onClick={() => setConfirmingDelete(true)}>
					<Trash2 aria-hidden="true" /> Delete
				</Button>}
				<Link href={`/studios/${studio._id}`} className={buttonVariants({ className: manage ? "w-full" : "w-full" })}>
					View Details
				</Link>
			</CardFooter>
			{confirmingDelete && <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !isDeleting) setConfirmingDelete(false); }}>
				<section role="alertdialog" aria-modal="true" aria-labelledby={`delete-title-${studio._id}`} aria-describedby={`delete-description-${studio._id}`} className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl">
					<h2 id={`delete-title-${studio._id}`} className="text-lg font-semibold">Delete this studio?</h2>
					<p id={`delete-description-${studio._id}`} className="mt-2 text-sm text-muted-foreground">“{studio.title}” will be permanently removed from your listings.</p>
					<div className="mt-6 flex justify-end gap-2">
						<Button type="button" variant="outline" disabled={isDeleting} onClick={() => setConfirmingDelete(false)}>Cancel</Button>
						<Button type="button" variant="destructive" disabled={isDeleting} onClick={deleteStudio}>
							{isDeleting ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Trash2 aria-hidden="true" />}
							{isDeleting ? "Deleting…" : "Delete studio"}
						</Button>
					</div>
				</section>
			</div>}
		</Card>
	);
};

export default StudioCard;
