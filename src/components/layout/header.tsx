import { Aperture } from "lucide-react";
import NavBar from "./navbar";
import Link from "next/link";
import SideNavBar from "./side-navbar";
import AuthenticationButtons from "../authentication/authentication-buttons";

const Header = () => {
	return (
		<header className="sticky inset-0 h-14 z-50 mt-2 container mx-auto px-4 py-2 rounded backdrop-blur-lg text-primary-foreground shadow-sm shadow-primary border">
			<div className="flex items-center justify-between">
				<div className="block md:hidden">
					<SideNavBar />
				</div>
				<Link href="/" className="flex items-center gap-2">
					<div className="bg-primary p-1 rounded-full text-primary-foreground">
						<Aperture size={32} />
					</div>
					<span className="font-bold">
						<span className="text-primary">Studio</span>Space
					</span>
				</Link>
				<div className="hidden md:block">
					<NavBar />
				</div>
				<AuthenticationButtons position="header" className="hidden sm:flex" />
			</div>
		</header>
	);
};

export default Header;
