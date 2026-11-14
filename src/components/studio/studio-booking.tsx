"use client";

import { useMemo, useState } from "react";
import type { IStudio } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button
						className="mt-6 h-11 w-full"
						disabled={studio.availabilityStatus !== "Available"}
					/>
				}>
				{studio.availabilityStatus === "Available" ? "Book Workspace Now" : "Currently unavailable"}
			</DialogTrigger>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Plan your booking</DialogTitle>
					<DialogDescription>
						Choose a date and time to see your estimated workspace cost. This form does not submit a
						booking yet.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<label className="block space-y-2 text-sm font-medium">
						Booking date
						<Input
							type="date"
							min={today}
							value={date}
							onChange={(event) => setDate(event.target.value)}
						/>
					</label>
					<div className="grid grid-cols-2 gap-3">
						<label className="space-y-2 text-sm font-medium">
							Start time
							<Input
								type="time"
								value={startTime}
								onChange={(event) => setStartTime(event.target.value)}
							/>
						</label>
						<label className="space-y-2 text-sm font-medium">
							End time
							<Input
								type="time"
								value={endTime}
								onChange={(event) => setEndTime(event.target.value)}
							/>
						</label>
					</div>
					<label className="block space-y-2 text-sm font-medium">
						Special request{" "}
						<Textarea
							rows={3}
							maxLength={500}
							value={request}
							onChange={(event) => setRequest(event.target.value)}
							placeholder="Share any details the host should know"
						/>
					</label>
					<div className="rounded-xl bg-muted p-4 text-sm">
						<div className="flex justify-between">
							<span className="text-muted-foreground">Duration</span>
							<span>
								{duration
									? `${duration} hour${duration === 1 ? "" : "s"}`
									: "Choose a valid time range"}
							</span>
						</div>
						<div className="mt-2 flex justify-between">
							<span className="text-muted-foreground">Workspace</span>
							<span>${(duration * studio.hourlyRate).toFixed(2)}</span>
						</div>
						<div className="mt-2 flex justify-between">
							<span className="text-muted-foreground">Security deposit</span>
							<span>${studio.securityDeposit.toFixed(2)}</span>
						</div>
						<div className="mt-3 flex justify-between border-t pt-3 font-semibold">
							<span>Estimated total</span>
							<span>${(duration * studio.hourlyRate + studio.securityDeposit).toFixed(2)}</span>
						</div>
					</div>
					<Button type="button" disabled className="w-full">
						Booking submission unavailable
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
