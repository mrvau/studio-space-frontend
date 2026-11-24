import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { ArrowLeft, Building2 } from "lucide-react";
import StudioForm from "@/components/studio/studio-form";
import { auth } from "@/lib/auth";
import type { IStudio } from "@/types";

async function getStudio(id: string): Promise<IStudio | null> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/studios/${id}`);
		if (!response.ok) return null;
		const result = await response.json();
		return result.data ?? result;
	} catch {
		return null;
	}
}

export default async function EditStudioPage({ params }: PageProps<"/studios/edit/[id]">) {
	const { id } = await params;

	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) redirect(`/login?redirectFrom=studios/edit/${id}`);

	const studio = await getStudio(id);
	if (!studio) notFound();
	if (studio.ownerId !== session.user.id) notFound();

	return (
		<div className="mx-auto max-w-4xl">
			<Link
				href="/my-listings"
				className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
				<ArrowLeft className="size-4" /> Back to my listings
			</Link>
			<div className="mb-8 space-y-3">
				<div className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
					<Building2 className="size-6" />
				</div>
				<div>
					<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
						Host dashboard
					</p>
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Update studio listing</h1>
					<p className="mt-2 max-w-2xl text-muted-foreground">
						Edit the details for {studio.title}.
					</p>
				</div>
			</div>
			<StudioForm user={session.user} mode="update" previousStudio={studio} />
		</div>
	);
}
