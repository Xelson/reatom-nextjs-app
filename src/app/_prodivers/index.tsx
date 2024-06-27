'use client';

import { PropsWithChildren } from "react";
import { createCtx } from '@reatom/core'
import { reatomContext } from '@reatom/npm-react'
import { connectLogger } from "@reatom/framework";

const ctx = createCtx()

export function Providers({ children }: PropsWithChildren) {
	return (
		<reatomContext.Provider value={ctx}>
			{children}
		</reatomContext.Provider>
	);
}

if(typeof window !== 'undefined')
	connectLogger(ctx);