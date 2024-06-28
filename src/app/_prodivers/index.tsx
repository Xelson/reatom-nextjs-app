'use client';

import { PropsWithChildren } from "react";
import { connectLogger } from "@reatom/framework";
import { ReatomContextProvider } from "~/shared/lib/reatom-next-rsc";

export function Providers({ children }: PropsWithChildren) {
	return (
		<ReatomContextProvider
			extend={ctx => {
				if (typeof window !== 'undefined')
					connectLogger(ctx);
			}}
		>
			{children}
		</ReatomContextProvider>
	);
}