export type UserRole = "host" | "creator";

export type StudioCategory =
	| "Photo Studio"
	| "Film Stage"
	| "Podcast Lounge"
	| "Music Suite"
	| "Workshop";

export type StudioAvailability = "Available" | "Unavailable";

export type BookingStatus = "Completed" | "Cancelled" | "Confirmed" | "Pending";

export type PaymentStatus = "Paid" | "Unpaid" | "Refunded";

export interface IMeta {
	name: string;
	version: string;
	generatedAt: string;
	referenceDate: string;
	currency: string;
	idFormat: string;
	timestampFormat: string;
	recordCounts: {
		users: number;
		studios: number;
		bookings: number;
		reviews: number;
		total: number;
	};
	categories: StudioCategory[];
	cities: string[];
	bookingStatusDistribution: Record<BookingStatus, number>;
	paymentStatusDistribution: Record<PaymentStatus, number>;
	notes: string[];
}

export interface IUser {
	_id: string;
	name: string;
	email: string;
	photoURL: string;
	role: UserRole;
	isVerified: boolean;
	createdAt: string;
}

export interface IStudio {
	_id: string;
	title: string;
	category: StudioCategory;
	hourlyRate: number;
	securityDeposit: number;
	maxCapacity: number;
	city: string;
	country: string;
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
	createdAt: string;
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
	createdAt: string;
}

export interface IReview {
	_id: string;
	studioId: string;
	bookingId: string;
	userId: string;
	userName: string;
	userPhotoURL: string;
	rating: number;
	comment: string;
	createdAt: string;
}

export interface Data {
	meta: IMeta;
	users: IUser[];
	studios: IStudio[];
	bookings: IBooking[];
	reviews: IReview[];
}
