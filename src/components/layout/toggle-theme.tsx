"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "cn";

const ToggleTheme = ({ className }: { className?: string }) => {
	const { theme, setTheme } = useTheme();

	const handleToggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Button
			variant="outline"
			onClick={handleToggleTheme}
			size="icon"
			className={cn("cursor-pointer text-primary border-primary", className)}>
			{theme === "light" ? <Sun /> : <Moon />}
		</Button>
	);
};

export default ToggleTheme;
