"use client";

import { useEffect, useState } from "react";

const useHash = () => {
	const [hash, setHash] = useState("");

	useEffect(() => {
		const handleHashChange = () => {
			setHash(window.location.hash);
		};

		handleHashChange();
	});
	return hash;
};

export default useHash;
