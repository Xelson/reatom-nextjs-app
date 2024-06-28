'use client';

import React from 'react'
import { useCtx } from '@reatom/npm-react'
import { updateFromSource, urlAtom } from '@reatom/url'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export function RouterSync() {
	const ctx = useCtx()
	const setupRef = React.useRef(false)

	const router = useRouter();
	const pathname = usePathname()!;
	const searchParams = useSearchParams()!;

	if (typeof window === 'undefined')
		return null;

	if (setupRef.current) {
		const newLocation = new URL(pathname, location.href);
		if (searchParams)
			newLocation.search = `?${searchParams.toString()}`;

		if (ctx.get(urlAtom).href !== newLocation.href)
			updateFromSource(ctx, newLocation)
	}
	else {
		setupRef.current = true

		urlAtom.settingsAtom(ctx, {
			init: () => new URL(location.href),
			sync: (_ctx, url, replace) => {
				const link = url.pathname + url.search;

				if (replace)
					router.replace(link);
				else
					router.push(link)
			}
		})
		// urlAtom(ctx, new URL(location.href))
	}

	return null
}