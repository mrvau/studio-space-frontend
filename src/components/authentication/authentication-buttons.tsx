"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import ToggleTheme from "../layout/toggle-theme";
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
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";

const TriggerElement = ({
	position,
	user,
}: {
	position: string;
	user: typeof authClient.$Infer.Session.user;
}) => {
	if (position === "header") {
		return (
			<Avatar>
				<AvatarImage src={user.image as string} />
				<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
			</Avatar>
		);
	}

	return (
		<div className="flex items-center gap-2">
			<Avatar>
				<AvatarImage src={user.image as string} />
				<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
			</Avatar>
			<div className="flex flex-1 items-center justify-between sm:hidden">
				<div>
					<p className="font-semibold text-base">{user.name}</p>
					<span className="text-muted-foreground">{user.email}</span>
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
	const { data, isPending } = authClient.useSession();
	const router = useRouter();

	if (isPending) {
		return <Skeleton className="size-8 shrink-0 rounded-full" />;
	}

	const handleLogout = async () => {
		try {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						router.replace("/login");
					},
				},
			});
		} catch {
			toast.add({
				type: "error",
				title: "Something went wrong!",
				description: "Please try again.",
			});
		}
	};

	return (
		<>
			{!data?.session ? (
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
					<PopoverTrigger
						render={
							<button
								type="button"
								aria-label="Open account menu"
								className={cn(
									"cursor-pointer border-0 bg-transparent p-0 text-left shadow-none hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
									position === "header"
										? "rounded-full"
										: "flex w-full items-center gap-2 rounded px-0 py-1 active:bg-muted",
								)}>
								<TriggerElement position={position} user={data.user} />
							</button>
						}
					/>
					<PopoverContent align="end" className="w-fit">
						<PopoverHeader className="flex-row items-center gap-4">
							<div>
								<PopoverTitle>{data.user.name}</PopoverTitle>
								<PopoverDescription>{data.user.email}</PopoverDescription>
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
						<Button variant="destructive" className="w-full" onClick={handleLogout}>
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
