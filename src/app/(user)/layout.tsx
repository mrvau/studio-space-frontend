import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	return <section className="container w-full pt-16 pb-10 sm:pt-26 sm:pb-20">{children}</section>;
};

export default UserLayout;
