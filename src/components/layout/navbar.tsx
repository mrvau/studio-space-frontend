"use client";

import { usePathname } from "next/navigation";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import useHash from "@/hooks/useHash";

const NAV_ITEMS = [
	{ name: "Home", path: "/" },
	{ name: "Explore Studios", path: "/studios" },
	{ name: "How It Works", path: "#how-it-works" },
	{ name: "About Us", path: "#about-us" },
];

const NavBar = () => {
	const pathname = usePathname();
	const hash = useHash();

	return (
		<NavigationMenu>
			<NavigationMenuList>
				{NAV_ITEMS.map((item) => {
					const active = hash ? hash === item.path : pathname === item.path;
					return (
						<NavigationMenuItem
							key={item.path}
							className={active ? "text-primary border-b border-primary" : ""}>
							<NavigationMenuLink
								render={<Link href={item.path} />}
								className={`${navigationMenuTriggerStyle()} focus:bg-transparent`}>
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
