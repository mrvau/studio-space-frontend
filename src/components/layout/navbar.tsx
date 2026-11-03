"use client";

import { usePathname } from "next/navigation";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import useHash from "@/hooks/useHash";
import { cn } from "cn";

const NAV_ITEMS = [
	{ name: "Home", path: "/" },
	{ name: "Explore Studios", path: "/studios" },
	{ name: "How It Works", path: "#how-it-works" },
	{ name: "About Us", path: "#about-us" },
];

const NavBar = ({ className = "" }: { className?: string }) => {
	const pathname = usePathname();
	const hash = useHash();

	return (
		<NavigationMenu className={cn("flex-none")}>
			<NavigationMenuList className={cn(className)}>
				{NAV_ITEMS.map((item) => {
					const active = hash ? hash === item.path : pathname === item.path;
					return (
						<NavigationMenuItem key={item.path}>
							<NavigationMenuLink
								className={cn(
									active ? "text-primary font-semibold" : "text-muted-foreground",
									"hover:text-primary hover:bg-transparent rounded-none text-lg sm:text-sm focus:bg-transparent",
								)}
								render={<Link href={item.path} />}>
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
