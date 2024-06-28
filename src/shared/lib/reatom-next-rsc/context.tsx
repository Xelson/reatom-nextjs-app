'use client';

import { PropsWithChildren } from "react";
import { reatomContext, useCreateCtx } from '@reatom/npm-react'
import { Ctx, connectLogger } from "@reatom/framework";

interface ReatomContextProviderProps extends PropsWithChildren {
	extend?: (ctx: Ctx) => void
}

export function ReatomContextProvider({ children, extend }: ReatomContextProviderProps) {
	const ctx = useCreateCtx(extend);

	return (
		<reatomContext.Provider value={ctx}>
			{children}
		</reatomContext.Provider>
	);
}