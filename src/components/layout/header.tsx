import { Aperture } from "lucide-react";
import NavBar from "./navbar";
import Link from "next/link";
import HeaderButtons from "./header-buttons";

const Header = () => {
	return (
		<header className="sticky top-2 flex items-center justify-between container mx-auto px-4 py-2 border border-accent rounded">
			<Link href="/" className="flex items-center gap-2">
				<div className="bg-primary p-1 rounded-full text-primary-foreground">
					<Aperture size={32} />
				</div>
				<span className="font-bold">StudioSpace</span>
			</Link>

			<NavBar />
			<HeaderButtons />
		</header>
	);
};

export default Header;
