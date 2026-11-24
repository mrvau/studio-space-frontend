"use client";

import { authClient } from "./auth-client";

export const getTokenFromClient = async (): Promise<string | null> => {
	const { data, error } = await authClient.token();

	if (error) {
		return null;
	}

	const token = data.token;

	return token;
};
