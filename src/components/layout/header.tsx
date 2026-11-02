import { Aperture } from "lucide-react";
import NavBar from "./navbar";
import Link from "next/link";
import HeaderButtons from "./header-buttons";

const Header = () => {
	return (
		<header className="sticky top-0 mt-2 flex items-center justify-between container mx-auto px-4 py-2 border border-accent rounded backdrop-blur-lg text-primary-foreground">
			<Link href="/" className="flex items-center gap-2">
				<div className="bg-primary p-1 rounded-full text-primary-foreground">
					<Aperture size={32} />
				</div>
				<span className="font-bold">
					<span className="text-primary">Studio</span>Space
				</span>
			</Link>

			<NavBar />
			<HeaderButtons />
		</header>
	);
};

export default Header;
