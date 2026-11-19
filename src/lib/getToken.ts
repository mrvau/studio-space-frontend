"use server";

import { headers } from "next/headers";
import { auth } from "./auth";
import { authClient } from "./auth-client";

export const getTokenFromServer = async () => {
	const jwtToken = await auth.api.getToken({
		headers: await headers(),
	});

	const token = jwtToken?.token;

	return token;
};

export const getTokenFromClient = async () => {
	const { data } = await authClient.token();

	const token = data?.token;

	return token;
};
