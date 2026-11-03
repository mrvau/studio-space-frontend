import { Aperture } from "lucide-react";
import NavBar from "./navbar";
import Link from "next/link";
import SideNavBar from "./side-navbar";
import AuthenticationButtons from "./authentication-buttons";

const Header = () => {
	return (
		<header className="fixed inset-0 h-14 mt-2 flex items-center justify-between container mx-auto px-4 py-2 border border-accent rounded backdrop-blur-lg text-primary-foreground">
			<div className="block sm:hidden">
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
			<div className="hidden sm:block">
				<NavBar />
			</div>
			<AuthenticationButtons position="header" className="hidden sm:flex" />
		</header>
	);
};

export default Header;
