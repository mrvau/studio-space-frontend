import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FieldGroup, FieldSet } from "../ui/field";
import type { LucideIcon } from "lucide-react";
import { ClassNameValue, cn } from "cn";

interface FormSectionWrapperProps {
	icon: LucideIcon;
	title: string;
	description: string;
	className?: ClassNameValue;
	children: React.ReactNode;
}

const FormSectionWrapper = ({
	icon: Icon,
	title,
	description,
	className,
	children,
}: FormSectionWrapperProps) => {
	return (
		<Card>
			<CardHeader className="flex gap-2">
				<div className="rounded-xl bg-muted p-2.5">
					<Icon className="size-5 text-primary" />
				</div>
				<div>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<FieldSet>
					<FieldGroup className={cn("gap-5", className)}>{children}</FieldGroup>
				</FieldSet>
			</CardContent>
		</Card>
	);
};

export default FormSectionWrapper;
