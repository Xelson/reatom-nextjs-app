import { Ctx, Fn, Rec, createCtx, jsonClone, takeNested } from "@reatom/framework";
import { setupUrlAtomSettings } from "@reatom/url";
import { snapshotAtom } from "./persist";
import { PersistRecord } from "@reatom/persist";
import { fetchCharacters } from "~/pages/characters/model";

interface TakeSnapshotApi {
	prefetch: <I extends any[]>(cb: Fn<[Ctx, ...I]>, ...params: I) => Promise<void>
}

export interface TakeSnapshotReturn {
	persistRecords: Rec<PersistRecord>
	url: string,
}

export interface TakeSnapshotOptions {
	handler: (api: TakeSnapshotApi) => Promise<void>,
	env?: { searchParams?: SearchParams }
}

export type SearchParams = Record<string, string | string[] | undefined>;

export async function takeSnapshot({ handler, env = {} }: TakeSnapshotOptions): Promise<TakeSnapshotReturn> {	
	const ctx = createCtx();

	const url = new URL('http://localhost');
	if (env.searchParams) {
		Object.entries(env.searchParams).forEach(
			([k, v]) => Array.isArray(v) ?
				v.forEach(v => url.searchParams.append(k, v))
				: v && url.searchParams.set(k, v)
		)
	}
	setupUrlAtomSettings(ctx, () => url)

	await handler({
		prefetch: takeNested.bind(null, ctx)
	})

	const snapshot = jsonClone(ctx.get(snapshotAtom));

	// wtf?
	console.log('ctx.get', 
		ctx.get(fetchCharacters.dataAtom)?.results?.[0].name,
		(snapshot as any)?.['fetchCharacters._cacheAtom']?.data?.[0]?.[1].value.data.results[0].name
	);

	return {
		url: url.toString(),
		persistRecords: snapshot
	};
}