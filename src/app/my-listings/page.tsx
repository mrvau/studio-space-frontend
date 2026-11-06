import React from "react";

const getMyStudios = async () => {
	const response = await fetch("http://localhost:8000/api/v1/studio");
	return response.json();
};

const MyListingsPage = async () => {
	const { data: myStudios } = await getMyStudios();
	console.log(myStudios);
	return <div>{myStudios.length}</div>;
};

export default MyListingsPage;
