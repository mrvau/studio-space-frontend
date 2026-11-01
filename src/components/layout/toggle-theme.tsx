"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {
	const { theme, setTheme } = useTheme();

	const handleToggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Button
			variant="outline"
			onClick={handleToggleTheme}
			size="icon"
			className="cursor-pointer text-primary border-primary">
			{theme === "light" ? <Sun /> : <Moon />}
		</Button>
	);
};

export default ToggleTheme;
