import React from "react";

const AuthenticationPageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex min-h-full flex-col items-center justify-center px-6 pt-26 pb-14 md:pt-30 md:pb-18 md:px-10">
			<div className="w-full max-w-sm md:max-w-4xl">{children}</div>
		</div>
	);
};

export default AuthenticationPageLayout;
