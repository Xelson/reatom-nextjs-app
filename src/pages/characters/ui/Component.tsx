import { fetchCharacters } from "../model";
import { List } from "./List";
import { HydrationBoundary } from "~/shared/lib/reatom-next-rsc";
import { SearchParams, takeSnapshot } from "~/shared/lib/reatom-next-rsc/server";

export async function Component({ searchParams }: { searchParams: SearchParams }) {	
	const snapshot = await takeSnapshot({
		handler: ({ prefetch }) => prefetch(fetchCharacters),
		env: { searchParams }
	})

	return (
		<HydrationBoundary snapshot={snapshot}>
			<List />
		</HydrationBoundary>
	)
}