export type StudioCategory =
	| "Photo Studio"
	| "Film Stage"
	| "Podcast Lounge"
	| "Music Suite"
	| "Workshop";

export type StudioAvailability = "Available" | "Unavailable";

export type BookingStatus = "Completed" | "Cancelled" | "Confirmed" | "Pending";

export type PaymentStatus = "Paid" | "Unpaid" | "Refunded";

export interface IStudio {
	_id: string;
	title: string;
	category: StudioCategory;
	hourlyRate: number;
	securityDeposit: number;
	maxCapacity: number;
	address: string;
	imageURL: string;
	gallery: string[];
	amenities: string[];
	overview: string;
	ownerId: string;
	ownerName: string;
	ownerEmail: string;
	availabilityStatus: StudioAvailability;
	averageRating: number;
	reviewCount: number;
}

export interface IBooking {
	_id: string;
	studioId: string;
	studioTitle: string;
	hostId: string;
	hostEmail: string;
	userId: string;
	userName: string;
	userEmail: string;
	bookingDate: string;
	startTime: string;
	endTime: string;
	durationHours: number;
	hourlyRate: number;
	securityDeposit: number;
	totalPrice: number;
	status: BookingStatus;
	paymentStatus: PaymentStatus;
	specialRequest: string;
}
