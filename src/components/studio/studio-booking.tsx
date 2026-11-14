"use client";

import { useMemo, useState } from "react";
import type { IStudio } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function StudioBooking({ studio }: { studio: IStudio }) {
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [request, setRequest] = useState("");
	const duration = useMemo(() => {
		if (!startTime || !endTime) return 0;
		const [startHour, startMinute] = startTime.split(":").map(Number);
		const [endHour, endMinute] = endTime.split(":").map(Number);
		return Math.max(0, (endHour * 60 + endMinute - startHour * 60 - startMinute) / 60);
	}, [startTime, endTime]);
	const today = new Date().toISOString().slice(0, 10);
	const workspaceCost = duration * studio.hourlyRate;
	const estimatedTotal = workspaceCost + studio.securityDeposit;

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button
						className="mt-6 h-11 w-full cursor-pointer"
						disabled={studio.availabilityStatus !== "Available"}
					/>
				}>
				{studio.availabilityStatus === "Available" ? "Book Workspace Now" : "Currently unavailable"}
			</DialogTrigger>
			<DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-xl">
				<DialogHeader className="relative overflow-hidden border-b bg-linear-to-br from-primary/10 via-background to-accent/30 p-6 pr-14 sm:p-7 sm:pr-16">
					<div className="mb-3 flex flex-wrap items-center gap-2">
						<Badge
							variant="secondary"
							className="border border-primary/10 bg-background/80 text-primary">
							${studio.hourlyRate} / hour
						</Badge>
						<span className="text-xs font-medium text-muted-foreground">Booking estimate</span>
					</div>
					<DialogTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
						Plan your booking
					</DialogTitle>
					<p className="mt-1 text-sm font-medium text-foreground/80">{studio.title}</p>
					<DialogDescription className="mt-2 max-w-md leading-relaxed">
						Choose a date and time to see your estimated workspace cost. Booking requests are not
						available yet.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-5 p-5 sm:p-7">
					<div className="space-y-4">
						<Field>
							<FieldLabel htmlFor="booking-date" className="text-sm font-semibold">
								Booking date
							</FieldLabel>
							<Input
								id="booking-date"
								type="date"
								min={today}
								value={date}
								onChange={(event) => setDate(event.target.value)}
								className="h-11 bg-background px-3"
							/>
						</Field>
						<div className="grid grid-cols-2 gap-3 sm:gap-4">
							<Field>
								<FieldLabel htmlFor="booking-start-time" className="text-sm font-semibold">
									Start time
								</FieldLabel>
								<Input
									id="booking-start-time"
									type="time"
									value={startTime}
									onChange={(event) => setStartTime(event.target.value)}
									className="h-11 bg-background px-3"
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="booking-end-time" className="text-sm font-semibold">
									End time
								</FieldLabel>
								<Input
									id="booking-end-time"
									type="time"
									value={endTime}
									onChange={(event) => setEndTime(event.target.value)}
									className="h-11 bg-background px-3"
								/>
							</Field>
						</div>
						<Field>
							<div className="flex items-center justify-between gap-3">
								<FieldLabel htmlFor="booking-request" className="text-sm font-semibold">
									Special request
								</FieldLabel>
								<span className="text-xs text-muted-foreground">Optional</span>
							</div>
							<Textarea
								id="booking-request"
								rows={3}
								maxLength={500}
								value={request}
								onChange={(event) => setRequest(event.target.value)}
								placeholder="Share any details the host should know"
								className="min-h-24 resize-none bg-background px-3 py-2.5"
							/>
						</Field>
					</div>

					<Card className="gap-0 border-primary/15 bg-primary/[0.035] shadow-none ring-primary/10">
						<CardContent className="space-y-3 p-4 sm:p-5">
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="text-sm font-semibold">Price estimate</p>
									<p className="mt-0.5 text-xs text-muted-foreground">
										{duration
											? `${duration} hour${duration === 1 ? "" : "s"} selected`
											: "Select a time range to get started"}
									</p>
								</div>
								<span className="text-xs font-medium text-primary">USD</span>
							</div>
							<Separator />
							<div className="space-y-2.5 text-sm">
								<div className="flex justify-between gap-4">
									<span className="text-muted-foreground">Workspace</span>
									<span className="font-medium">${workspaceCost.toFixed(2)}</span>
								</div>
								<div className="flex justify-between gap-4">
									<span className="text-muted-foreground">Security deposit</span>
									<span className="font-medium">${studio.securityDeposit.toFixed(2)}</span>
								</div>
							</div>
							<div className="flex items-end justify-between gap-4 border-t border-primary/15 pt-3">
								<div>
									<p className="text-sm font-semibold">Estimated total</p>
									<p className="mt-0.5 text-xs text-muted-foreground">Includes security deposit</p>
								</div>
								<p className="text-2xl font-bold tracking-tight text-primary">
									${estimatedTotal.toFixed(2)}
								</p>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-2">
						<Button type="button" disabled className="h-11 w-full">
							Booking submission unavailable
						</Button>
						<p className="text-center text-xs text-muted-foreground">
							Your selections are for estimate purposes only.
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
