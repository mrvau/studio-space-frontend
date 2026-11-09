import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import StudioForm from "@/components/studio/studio-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AddStudioPage() {
	const data = await auth.api.getSession({ headers: await headers() });

	if (!data) redirect("/login");

	return (
		<section className="container w-full py-10 sm:py-14">
			<div className="mx-auto max-w-4xl">
				<Link
					href="/"
					className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
					<ArrowLeft className="size-4" />
					Back to home
				</Link>

				<div className="mb-8 space-y-3">
					<div className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
						<Building2 className="size-6" />
					</div>
					<div>
						<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
							For studio hosts
						</p>
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Add a new studio</h1>
						<p className="mt-2 max-w-2xl text-muted-foreground">
							Share your creative space with the people looking for their next great place to make.
						</p>
					</div>
				</div>

				<StudioForm user={data?.user} mode="create" />
			</div>
		</section>
	);
}
