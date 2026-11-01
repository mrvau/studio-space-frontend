import { Button } from "../ui/button";
import Link from "next/link";
import ToggleTheme from "./toggle-theme";
import { Separator } from "../ui/separator";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut } from "lucide-react";

const HeaderButtons = () => {
	const session = 1;
	return (
		<div className="flex items-center gap-2">
			<ToggleTheme />
			<Separator orientation="vertical" />
			{!session ? (
				<>
					<Button variant="outline">
						<Link href="/login">Login</Link>
					</Button>
					<Button>
						<Link href="/register">Register</Link>
					</Button>
				</>
			) : (
				<Popover>
					<PopoverTrigger
						render={
							<Avatar>
								<AvatarImage src={""} />
								<AvatarFallback>NN</AvatarFallback>
							</Avatar>
						}
						nativeButton={false}
					/>
					<PopoverContent align="end" className="w-fit">
						<PopoverHeader>
							<PopoverTitle>Minhajul Islam Alif</PopoverTitle>
							<PopoverDescription>minhajul.islam.alif@gmail.com</PopoverDescription>
						</PopoverHeader>
						<Separator />
						<Button variant="ghost" className="w-full justify-start">
							<Link href="/">Dashboard</Link>
						</Button>
						<Button variant="ghost" className="w-full justify-start">
							<Link href="/">Add New Studio</Link>
						</Button>
						<Button variant="ghost" className="w-full justify-start">
							<Link href="/">My Studio Listings</Link>
						</Button>
						<Button variant="ghost" className="w-full justify-start">
							<Link href="/">My Bookings</Link>
						</Button>
						<Separator />
						<Button variant="destructive" className="w-full">
							<LogOut />
							Logout
						</Button>
					</PopoverContent>
				</Popover>
			)}
		</div>
	);
};

export default HeaderButtons;
