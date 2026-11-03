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
import { Ellipsis, LogOut } from "lucide-react";
import { cn } from "cn";

const TriggerElement = ({ position }: { position: string }) => {
	if (position === "header") {
		return (
			<Avatar>
				<AvatarImage src={"/next.svg"} />
				<AvatarFallback>NN</AvatarFallback>
			</Avatar>
		);
	}

	return (
		<div className="flex items-center gap-2 active:bg-muted  rounded">
			<Avatar>
				<AvatarImage src={"/next.svg"} />
				<AvatarFallback>NN</AvatarFallback>
			</Avatar>
			<div className="flex flex-1 items-center justify-between sm:hidden">
				<div>
					<p className="font-semibold text-base">Minhajul Islam Alif</p>
					<span className="text-muted-foreground">alif@gmail.com</span>
				</div>
				<div>
					<Ellipsis />
				</div>
			</div>
		</div>
	);
};

const AuthenticationButtons = ({
	position,
	className,
}: {
	position: string;
	className?: string;
}) => {
	const session = 1;
	return (
		<>
			{!session ? (
				<div className="flex items-center gap-2">
					<ToggleTheme />
					<div className={cn("items-center gap-2", className)}>
						<Separator orientation="vertical" />
						<Button variant="outline">
							<Link href="/login">Login</Link>
						</Button>
						<Button>
							<Link href="/register">Register</Link>
						</Button>
					</div>
				</div>
			) : (
				<Popover>
					<PopoverTrigger render={<TriggerElement position={position} />} nativeButton={false} />
					<PopoverContent align="end" className="w-fit">
						<PopoverHeader className="flex-row items-center gap-4">
							<div>
								<PopoverTitle>Minhajul Islam Alif</PopoverTitle>
								<PopoverDescription>minhajul.islam.alif@gmail.com</PopoverDescription>
							</div>
							<ToggleTheme />
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
		</>
	);
};

export default AuthenticationButtons;
