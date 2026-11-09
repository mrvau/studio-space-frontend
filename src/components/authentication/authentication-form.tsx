"use client";

import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { Eye, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

type AuthenticationFormProps = React.ComponentProps<"div"> & {
	mode: "login" | "register";
};

const AuthenticationForm = ({ mode, className, ...props }: AuthenticationFormProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const isRegister = mode === "register";

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isSubmitting) return;
		setIsSubmitting(true);

		const formData = new FormData(e.currentTarget);
		const { name, email, password, image } = Object.fromEntries(formData.entries());

		try {
			const { error } = isRegister
				? await authClient.signUp.email({
						name: name as string,
						email: email as string,
						password: password as string,
						image: image as string,
						callbackURL: "/login",
					})
				: await authClient.signIn.email({
						email: email as string,
						password: password as string,
						callbackURL: "/",
					});

			if (error)
				throw new Error(isRegister ? "Registration failed." : "Login failed.", {
					cause: error.message,
				});

			toast.add({
				type: "success",
				title: isRegister ? "Registration successful" : "Login successful",
				description: isRegister ? "Please sign in to your account." : "Welcome back.",
			});
			router.replace(isRegister ? "/login" : "/");
		} catch (error: unknown) {
			toast.add({
				type: "error",
				title: error instanceof Error ? error.message : "Something went wrong.",
				description: error instanceof Error ? (error.cause as string) : "Please try again later.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleGoogleAuthentication = async () => {
		try {
			const { error } = await authClient.signIn.social({
				provider: "google",
			});

			if (error)
				throw new Error(isRegister ? "Registration failed." : "Login failed.", {
					cause: error.message,
				});

			toast.add({
				type: "success",
				title: isRegister ? "Registration successful" : "Login successful",
				description: isRegister ? "Successfully registered with Google." : "Welcome back.",
			});
		} catch (error: unknown) {
			toast.add({
				type: "error",
				title: error instanceof Error ? error.message : "Something went wrong.",
				description: error instanceof Error ? (error.cause as string) : "Please try again later.",
			});
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form className="p-6 md:p-8" onSubmit={handleSubmit}>
						<FieldGroup>
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">
									{isRegister ? "Create your account" : "Welcome back"}
								</h1>
								<p className="text-sm text-balance text-muted-foreground">
									{isRegister
										? "Enter your email below to create your account"
										: "Login to your Studio Space account"}
								</p>
							</div>
							{isRegister && (
								<Field>
									<FieldLabel htmlFor="name">Name</FieldLabel>
									<Input
										id="name"
										name="name"
										type="text"
										placeholder="John Doe"
										autoComplete="name"
										required
									/>
								</Field>
							)}
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									autoComplete="email"
									required
								/>
								{isRegister && (
									<FieldDescription>
										We&apos;ll use this to contact you. We will not share your email with anyone
										else.
									</FieldDescription>
								)}
							</Field>
							{isRegister && (
								<Field>
									<FieldLabel htmlFor="photo-url">Photo URL</FieldLabel>
									<Input
										id="photo-url"
										name="image"
										type="url"
										placeholder="https://example.com/example.jpg"
									/>
								</Field>
							)}
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									{!isRegister && (
										<a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
											Forgot your password?
										</a>
									)}
								</div>
								<InputGroup>
									<InputGroupInput
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter password"
										autoComplete={isRegister ? "new-password" : "current-password"}
										required
										minLength={isRegister ? 8 : undefined}
									/>
									<InputGroupAddon align="inline-end">
										<InputGroupButton
											type="button"
											size="icon-xs"
											aria-label={showPassword ? "Hide password" : "Show password"}
											aria-pressed={showPassword}
											onClick={() => setShowPassword((prev) => !prev)}>
											{showPassword ? <Eye /> : <EyeOffIcon />}
										</InputGroupButton>
									</InputGroupAddon>
								</InputGroup>
							</Field>
							<Field>
								<Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
									{isSubmitting && <Spinner />}
									{isRegister ? "Create Account" : "Login"}
								</Button>
							</Field>
							<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
								Or continue with
							</FieldSeparator>
							<Field>
								<Button
									className="cursor-pointer"
									variant="outline"
									type="button"
									onClick={handleGoogleAuthentication}>
									<Image src={"/google.svg"} alt="Google" width={18} height={18} />
									<span className="sr-only">
										{isRegister ? "Sign up with Google" : "Login with Google"}
									</span>
								</Button>
							</Field>
							<FieldDescription className="text-center">
								{isRegister ? (
									<>
										Already have an account? <Link href="/login">Sign in</Link>
									</>
								) : (
									<>
										Don&apos;t have an account? <Link href="/register">Sign up</Link>
									</>
								)}
							</FieldDescription>
						</FieldGroup>
					</form>
					<div className="relative hidden bg-muted md:block">
						<Image
							src={isRegister ? "/photo-studio.jpg" : "/music-studio.jpg"}
							alt={isRegister ? "Photo Studio" : "Music Studio"}
							fill
							className="object-cover"
						/>
					</div>
				</CardContent>
			</Card>
			{isRegister && (
				<FieldDescription className="px-6 text-center">
					By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
					<a href="#">Privacy Policy</a>.
				</FieldDescription>
			)}
		</div>
	);
};

export default AuthenticationForm;
