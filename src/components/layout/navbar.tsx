"use client";

import { usePathname } from "next/navigation";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import { cn } from "cn";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
	{ name: "Home", path: "/" },
	{ name: "Explore Studios", path: "/studios" },
	{ name: "How It Works", path: "#how-it-works" },
	{ name: "About Us", path: "#about-us" },
];

const NavBar = ({ onClose, className = "" }: { className?: string; onClose?: () => void }) => {
	const [hash, setHash] = useState<string>("");
	const pathname = usePathname();

	useEffect(() => {
		const handleHashChange = () => setHash(window.location.hash);

		handleHashChange();

		window.addEventListener("hashchange", handleHashChange);

		return () => window.removeEventListener("hashchange", handleHashChange);
	});

	return (
		<NavigationMenu className={cn("flex-none")}>
			<NavigationMenuList className={cn(className)}>
				{NAV_ITEMS.map((item) => {
					const href = item.path.startsWith("#") ? `/${item.path}` : item.path;
					let active = false;

					if (pathname === "/") {
						if (hash) {
							active = hash === item.path;
						} else {
							active = pathname === item.path;
						}
					} else {
						active = pathname === item.path || pathname.startsWith(`${item.path}/`);
					}

					return (
						<NavigationMenuItem key={item.path}>
							<NavigationMenuLink
								onClick={onClose}
								className={cn(
									active ? "text-primary font-semibold" : "text-muted-foreground",
									"hover:text-primary hover:bg-transparent rounded-none text-lg sm:text-sm focus:bg-transparent",
								)}
								render={<Link href={href} />}>
								{item.name}
							</NavigationMenuLink>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default NavBar;
