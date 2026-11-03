import Link from "next/link";
import { Aperture, ArrowRight } from "lucide-react";
import Image from "next/image";

const quickLinks = [
	{ label: "Home", href: "/" },
	{ label: "Explore Studios", href: "/studios" },
	{ label: "How It Works", href: "/#how-it-works" },
	{ label: "About Us", href: "/#about-us" },
];

const studioCategories = [
	"Photo Studios",
	"Sound Stages",
	"Podcast Rooms",
	"Music Suites",
	"Art Workshops",
];

const Footer = () => (
	<footer className="mt-auto bg-background text-foreground">
		<div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.3fr] lg:gap-8 lg:py-16">
			<div>
				<Link
					href="/"
					className="mb-4 inline-flex items-center gap-2"
					aria-label="StudioSpace home">
					<span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<Aperture className="size-5" aria-hidden="true" />
					</span>
					<span className="text-lg font-bold tracking-tight">
						<span className="text-primary">Studio</span>Space
					</span>
				</Link>
				<p className="max-w-xs text-sm leading-relaxed text-neutral-300">
					A home for bold ideas. Discover and book inspiring creative spaces, and make room for what
					you want to create.
				</p>
				<div className="mt-5 flex items-center gap-2">
					<a
						href="https://x.com"
						target="_blank"
						rel="noreferrer"
						aria-label="StudioSpace on X"
						className="flex size-9 items-center justify-center rounded-full border border-neutral-50/15 text-neutral-300 transition-colors hover:bg-neutral-50/10 hover:text-neutral-50">
						<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
							<path d="M18.901 1.153h3.68L14.54 10.15 24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.154h7.594l5.243 6.932zm-1.29 19.46h2.039L6.486 3.27h-2.19z" />
						</svg>
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noreferrer"
						aria-label="StudioSpace on Instagram"
						className="flex size-9 items-center justify-center rounded-full border border-neutral-50/15 text-neutral-300 transition-colors hover:bg-neutral-50/10 hover:text-neutral-50">
						<Image src={"/instagram.svg"} alt="Instagram Logo" width={24} height={24} />
					</a>
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noreferrer"
						aria-label="StudioSpace on Facebook"
						className="flex size-9 items-center justify-center rounded-full border border-neutral-50/15 text-neutral-300 transition-colors hover:bg-neutral-50/10 hover:text-neutral-50">
						<Image src={"/facebook.svg"} alt="Facebook Logo" width={24} height={24} />
					</a>
					<a
						href="https://youtube.com"
						target="_blank"
						rel="noreferrer"
						aria-label="StudioSpace on YouTube"
						className="flex size-9 items-center justify-center rounded-full border border-neutral-50/15 text-neutral-300 transition-colors hover:bg-neutral-50/10 hover:text-neutral-50">
						<Image src={"/youtube.svg"} alt="Youtube Logo" width={24} height={24} />
					</a>
				</div>
			</div>

			<nav aria-label="Footer quick links">
				<h2 className="mb-4 text-sm font-semibold">Quick Links</h2>
				<ul className="space-y-3">
					{quickLinks.map(({ label, href }) => (
						<li key={label}>
							<Link
								href={href}
								className="text-sm text-neutral-300 transition-colors hover:text-neutral-50">
								{label}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<nav aria-label="Popular studio categories">
				<h2 className="mb-4 text-sm font-semibold">Popular Categories</h2>
				<ul className="space-y-3">
					{studioCategories.map((category) => (
						<li key={category}>
							<Link
								href="/studios"
								className="text-sm text-neutral-300 transition-colors hover:text-neutral-50">
								{category}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div>
				<h2 className="mb-2 text-sm font-semibold">A little inspiration, occasionally</h2>
				<p className="mb-4 text-sm leading-relaxed text-neutral-300">
					Get studio discoveries and creative ideas in your inbox.
				</p>
				<form className="flex gap-2" action="#" aria-label="Newsletter signup">
					<label htmlFor="footer-email" className="sr-only">
						Email address
					</label>
					<input
						id="footer-email"
						name="email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						required
						className="min-w-0 flex-1 rounded-lg border border-neutral-50/15 bg-neutral-50/5 px-3 py-2 text-sm text-neutral-50 outline-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-primary"
					/>
					<button
						type="submit"
						aria-label="Subscribe to newsletter"
						className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/85">
						<ArrowRight className="size-4" />
					</button>
				</form>
			</div>
		</div>

		<div className="border-t border-neutral-50/10">
			<div className="container flex flex-col gap-3 py-5 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
				<p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
				<div className="flex gap-5">
					<Link href="/terms" className="transition-colors hover:text-neutral-50">
						Terms
					</Link>
					<Link href="/privacy" className="transition-colors hover:text-neutral-50">
						Privacy
					</Link>
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;
