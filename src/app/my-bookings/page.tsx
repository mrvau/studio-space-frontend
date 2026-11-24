import { redirect } from "next/navigation";
import type { APIPromise, IBooking } from "@/types";
import MyBookingsList from "@/components/booking/my-bookings-list";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const getMyBookings = async (token: string): APIPromise<IBooking[]> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/booking`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Unable to load your bookings.");
	}

	return response.json();
};

export default async function MyBookingsPage() {
	const token = await getTokenFromServer();

	if (!token) redirect("/login?redirectFrom=my-bookings");

	let bookings: IBooking[] = [];
	let loadError: string | undefined;

	try {
		const result = await getMyBookings(token);

		if (result.success) {
			bookings = Array.isArray(result.data) ? result.data : [];
		} else {
			loadError = result.message || "Unable to load your bookings.";
		}
	} catch {
		loadError = "Unable to load your bookings. Please try again later.";
	}

	return (
		<section className="container w-full py-10 sm:py-14">
			<MyBookingsList initialBookings={bookings} loadError={loadError} />
		</section>
	);
}
