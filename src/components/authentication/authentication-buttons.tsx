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
import { authClient, Session } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { ComponentProps, useState } from "react";

type Position = "header" | "footer";

type TriggerElementProps = ComponentProps<"button"> & {
	position: Position;
	user: Session["user"];
};

const BUTTONS = [
	{ href: "/", name: "Home" },
	{ href: "/add-studio", name: "Add New Studio" },
	{ href: "/my-listings", name: "My Studio Listings" },
	{ href: "/my-bookings", name: "My Bookings" },
];

const TriggerElement = ({ position, user, ...props }: TriggerElementProps) => (
	<button
		{...props}
		className={cn(
			"cursor-pointer border-0 bg-transparent p-0 text-left shadow-none hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			position === "header"
				? "rounded-full"
				: "flex w-full items-center gap-2 rounded px-0 py-1 active:bg-muted",
		)}>
		{position === "header" ? (
			<Avatar>
				<AvatarImage src={user.image as string} />
				<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
			</Avatar>
		) : (
			<div className="w-full flex items-center gap-2">
				<Avatar>
					<AvatarImage src={user.image as string} />
					<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-1 items-center justify-between sm:hidden">
					<div>
						<p className="font-semibold text-base">{user.name}</p>
					</div>
					<div>
						<Ellipsis />
					</div>
				</div>
			</div>
		)}
	</button>
);

const AuthenticationButtons = ({
	position,
	className,
	onClose,
}: {
	position: Position;
	className?: string;
	onClose?: () => void;
}) => {
	const { data, isPending } = authClient.useSession();
	const router = useRouter();

	const [open, setOpen] = useState(false);

	if (isPending) {
		return <Skeleton className="size-8 shrink-0 rounded-full" />;
	}

	const handleLogout = async () => {
		try {
			const { data } = await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						router.replace("/login");
					},
				},
			});

			if (!data) throw new Error("Unable logout user.");

			setOpen(false);

			toast.add({
				type: "success",
				title: "User logged out successfully.",
			});
		} catch {
			toast.add({
				type: "error",
				title: "Something went wrong!",
				description: "Please try again.",
			});
		}
	};

	const handleClick = () => {
		setOpen(false);
		onClose?.();
	};

	return (
		<>
			{!data?.session ? (
				<div className={cn("flex items-center gap-2", position === "footer" ? "w-full" : "")}>
					<ToggleTheme className={position === "footer" ? "hidden" : ""} />
					<div className={cn("items-center gap-2", className)}>
						<Separator orientation="vertical" className={position === "footer" ? "hidden" : ""} />
						<Button
							nativeButton={false}
							variant="outline"
							className={position === "footer" ? "w-full" : ""}
							onClick={onClose}
							render={<Link href="/login" />}>
							Login
						</Button>
						<Button
							nativeButton={false}
							className={position === "footer" ? "w-full" : ""}
							onClick={onClose}
							render={<Link href="/register" />}>
							Register
						</Button>
					</div>
				</div>
			) : (
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger render={<TriggerElement position={position} user={data.user} />} />
					<PopoverContent align="end" className="w-fit">
						<PopoverHeader className="flex-row items-center gap-4">
							<div>
								<PopoverTitle>{data.user.name}</PopoverTitle>
								<PopoverDescription>{data.user.email}</PopoverDescription>
							</div>
							<ToggleTheme />
						</PopoverHeader>
						<Separator />

						{BUTTONS.map(({ name, href }) => (
							<Button
								key={href}
								nativeButton={false}
								variant="ghost"
								className="w-full justify-start"
								onClick={handleClick}
								render={<Link href={href}>{name}</Link>}
							/>
						))}

						<Separator />
						<Button variant="destructive" className="w-full cursor-pointer" onClick={handleLogout}>
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
