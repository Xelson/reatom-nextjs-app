'use client';

import { PropsWithChildren, useState } from "react";
import { snapshotAtom } from "./persist";
import { useCtx } from "@reatom/npm-react";
import { TakeSnapshotReturn } from "./take-snapshot";
import { setupUrlAtomSettings } from "@reatom/url";
import { fetchCharacters } from "~/pages/characters/model";

interface HydrationBoundaryProps extends PropsWithChildren {
	snapshot: TakeSnapshotReturn
}

export function HydrationBoundary({ snapshot, children }: HydrationBoundaryProps) {
	const ctx = useCtx();

	useState(() => {
		console.log('============= HYDRATION BOUNDARY ============= ');
		snapshotAtom(ctx, snapshot.persistRecords);

		console.log(
			'HydrationBoundary',
			ctx.get(fetchCharacters.dataAtom)?.results?.[0].name,
			'|',	
			(snapshot.persistRecords as any)?.['fetchCharacters._cacheAtom']?.data?.[0]?.[1].value.data.results[0].name
		);

		if (typeof window === 'undefined') {
			setupUrlAtomSettings(ctx, () => new URL(snapshot.url))
		}
	})

	return children;
}