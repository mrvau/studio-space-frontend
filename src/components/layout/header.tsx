"use client";

import { Aperture } from "lucide-react";
import NavBar from "./navbar";
import Link from "next/link";
import SideNavBar from "./side-navbar";
import AuthenticationButtons from "../authentication/authentication-buttons";
import { useEffect, useState } from "react";
import { cn } from "cn";

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className={cn(isScrolled ? "pt-0" : "pt-2", "sticky h-14 z-50 top-0 transition-all")}>
			<div
				className={cn(
					isScrolled ? "max-w-full mx-auto border-b" : "container rounded border",
					"backdrop-blur-lg shadow-sm shadow-primary border-accent transition-all duration-500",
				)}>
				<div className="container px-4 py-2 text-primary-foreground">
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
				</div>
			</div>
		</header>
	);
};

export default Header;
