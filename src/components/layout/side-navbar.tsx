import React from "react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Aperture, Menu } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import NavBar from "./navbar";
import AuthenticationButtons from "./authentication-buttons";

const SideNavBar = () => {
	return (
		<Sheet>
			<SheetTrigger
				render={
					<Button variant="outline" size="icon">
						<Menu />
					</Button>
				}
			/>
			<SheetContent side="left" showCloseButton={false} className="gap-0">
				<SheetHeader className="gap-4">
					<Link href="/" className="flex items-center gap-2">
						<div className="bg-primary p-1 rounded-full text-primary-foreground">
							<Aperture size={32} />
						</div>
						<span className="font-bold text-xl">
							<span className="text-primary">Studio</span>Space
						</span>
					</Link>
				</SheetHeader>
				<Separator />
				<div className="p-4">
					<NavBar className="flex-none flex-col gap-2 items-start" />
				</div>
				<SheetFooter>
					<Separator />
					<AuthenticationButtons position="footer" />
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default SideNavBar;
