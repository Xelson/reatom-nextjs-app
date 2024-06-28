'use client';

import { PropsWithChildren, useState } from "react";
import { snapshotAtom } from "./persist";
import { useCtx } from "@reatom/npm-react";
import { TakeSnapshotReturn } from "./server";
import { setupUrlAtomBrowserSettings, setupUrlAtomSettings } from "@reatom/url";

interface HydrationBoundaryProps extends PropsWithChildren {
	snapshot: TakeSnapshotReturn
}

export function HydrationBoundary({ snapshot, children }: HydrationBoundaryProps) {
	const ctx = useCtx();

	useState(() => {
		snapshotAtom(ctx, snapshot.persistRecords);

		if (typeof window === 'undefined')
			setupUrlAtomSettings(ctx, () => new URL(snapshot.url));
	})

	return children;
}