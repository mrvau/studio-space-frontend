"use client";

import { IStudio, APIPromise } from "@/types";
import { use } from "react";
import StudioGrid from "./studio-grid";

const CardGrid = ({
	studioPromise,
	manage = false,
}: {
	studioPromise: APIPromise<IStudio[]>;
	manage?: boolean;
}) => {
	const { data: studios } = use(studioPromise);

	return <StudioGrid studios={studios} manage={manage} />;
};

export default CardGrid;
