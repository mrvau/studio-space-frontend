"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock3, DollarSign, Hourglass, TicketCheck } from "lucide-react";
import type { IBooking, BookingStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const statusStyles: Record<BookingStatus, string> = {
	Pending: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
	Confirmed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
	Completed: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
	Cancelled: "border-muted-foreground/20 bg-muted text-muted-foreground",
};

const formatDate = (value: string) => {
	const date = new Date(`${value.slice(0, 10)}T12:00:00`);
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(date);
};

const formatTime = (value: string) => {
	const [hours, minutes] = value.split(":").map(Number);
	if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return value;
	const date = new Date(2000, 0, 1, hours, minutes);
	return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
};

const formatMoney = (value: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
	}).format(Number.isFinite(value) ? value : 0);

export default function MyBookingsList({
	initialBookings,
	loadError,
}: {
	initialBookings: IBooking[];
	loadError?: string;
}) {
	const router = useRouter();
	const [bookings, setBookings] = useState(initialBookings);
	const [cancellingId, setCancellingId] = useState<string | null>(null);

	const cancelBooking = async (booking: IBooking) => {
		if (booking.status !== "Pending" || cancellingId) return;
		setCancellingId(booking._id);

		try {
			const token = await getTokenFromClient();

			if (!token) throw new Error("Your session has expired. Please log in again.");

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/booking/${booking._id}`,
				{
					method: "PATCH",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ status: "Cancelled" }),
				},
			);

			if (!response.ok) throw new Error("Unable to cancel this booking. Please try again.");

			setBookings((current) =>
				current.map((item) => (item._id === booking._id ? { ...item, status: "Cancelled" } : item)),
			);
			toast.add({
				type: "success",
				title: "Booking cancelled",
				description: `${booking.studioTitle} has been cancelled.`,
			});
			router.refresh();
		} catch (error: unknown) {
			toast.add({
				type: "error",
				title: error instanceof Error ? error.message : "Something went wrong.",
				description: "Please try again later.",
			});
		} finally {
			setCancellingId(null);
		}
	};

	return (
		<>
			<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
						Your schedule
					</p>
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My bookings</h1>
					<p className="mt-2 text-muted-foreground">
						Keep track of your upcoming studio sessions and past reservations.
					</p>
				</div>
				<Link href="/studios" className={buttonVariants({ variant: "outline" })}>
					Browse studios
				</Link>
			</div>

			{loadError ? (
				<div
					role="alert"
					className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">
					{loadError}
				</div>
			) : bookings.length === 0 ? (
				<Empty className="min-h-72 border border-dashed">
					<EmptyHeader>
						<EmptyMedia>
							<TicketCheck className="size-8 text-primary" />
						</EmptyMedia>
						<EmptyTitle>No bookings yet</EmptyTitle>
						<EmptyDescription>
							When you reserve a studio, the details and booking status will show up here.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button nativeButton={false} render={<Link href="/studios" />}>
							Explore studios
						</Button>
					</EmptyContent>
				</Empty>
			) : (
				<div className="grid gap-4 lg:grid-cols-2">
					{bookings.map((booking) => (
						<Card key={booking._id} className="gap-0 py-0">
							<CardHeader className="gap-4 border-b py-5">
								<div className="flex items-start justify-between gap-3">
									<div className="min-w-0">
										<p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
											Studio reservation
										</p>
										<CardTitle className="truncate text-lg font-semibold">
											{booking.studioTitle}
										</CardTitle>
									</div>
									<Badge
										variant="outline"
										className={`shrink-0 ${statusStyles[booking.status] ?? statusStyles.Pending}`}>
										{booking.status}
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 py-5">
								<div className="grid gap-3 text-sm sm:grid-cols-2">
									<div className="flex items-center gap-2.5 text-muted-foreground">
										<CalendarDays className="size-4 shrink-0 text-primary" aria-hidden="true" />
										<span>{formatDate(booking.bookingDate)}</span>
									</div>
									<div className="flex items-center gap-2.5 text-muted-foreground">
										<Clock3 className="size-4 shrink-0 text-primary" aria-hidden="true" />
										<span>
											{formatTime(booking.startTime)} – {formatTime(booking.endTime)}
										</span>
									</div>
									<div className="flex items-center gap-2.5 text-muted-foreground">
										<Hourglass className="size-4 shrink-0 text-primary" aria-hidden="true" />
										<span>
											{booking.durationHours} hour{booking.durationHours === 1 ? "" : "s"}
										</span>
									</div>
									<div className="flex items-center gap-2.5 font-medium text-foreground">
										<DollarSign className="size-4 shrink-0 text-primary" aria-hidden="true" />
										<span>{formatMoney(booking.totalPrice)}</span>
									</div>
								</div>
								<p className="text-xs text-muted-foreground">Hosted by {booking.hostEmail}</p>
							</CardContent>
							<CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4">
								<Link
									href={`/studios/${booking.studioId}`}
									className={buttonVariants({ variant: "outline", size: "sm" })}>
									View studio
								</Link>
								{booking.status === "Pending" && (
									<Button
										variant="destructive"
										size="sm"
										className="cursor-pointer"
										onClick={() => void cancelBooking(booking)}
										disabled={cancellingId !== null}>
										{cancellingId === booking._id && <Spinner />}
										{cancellingId === booking._id ? "Cancelling…" : "Cancel Booking"}
									</Button>
								)}
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</>
	);
}
