import { fetchCharacters } from "../model";
import { List } from "./List";
import { HydrationBoundary } from "~/shared/lib/reatom-next-rsc/hydration-boundary";
import { SearchParams, takeSnapshot } from "~/shared/lib/reatom-next-rsc/take-snapshot";

export async function Component({ searchParams }: { searchParams: SearchParams }) {	
	console.log('\n\n\n\n============= SERVER COMPONENT ============= ');
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