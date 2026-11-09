"use client";

import { useEffect, useState } from "react";

const useHash = () => {
	const [hash, setHash] = useState<string | null>(null);

	useEffect(() => {
		const handleHashChange = () => {
			const urlHash = window.location.hash;
			if (urlHash !== "") {
				setHash(window.location.hash);
			} else {
				setHash(null);
			}
		};

		handleHashChange();

		window.addEventListener("hashchange", handleHashChange);

		return () => window.removeEventListener("hashchange", handleHashChange);
	});

	return hash ? `/${hash}` : null;
};

export default useHash;
