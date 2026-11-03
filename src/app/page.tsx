import BrowseByCategories from "@/components/home/browse-by-categories";
import FeaturedSection from "@/components/home/featured";
import HeroSection from "@/components/home/hero";
import HowBookingWorks from "@/components/home/how-booking-works";
import HostCreatorSupport from "@/components/home/host-creator-support";

const HomePage = () => {
	return (
		<>
			<HeroSection />

			<FeaturedSection />

			<BrowseByCategories />

			<HowBookingWorks />

			<HostCreatorSupport />
		</>
	);
};

export default HomePage;
