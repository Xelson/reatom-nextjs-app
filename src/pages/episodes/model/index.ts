import { withErrorAtom, withDataAtom } from '@reatom/async'
import { reatomNumber, reatomResource, withCache, withStatusesAtom } from '@reatom/framework';
import { searchParamsAtom, withSearchParamsPersist } from '@reatom/url'
import { getEpisodes } from 'rickmortyapi'
import { withSsr } from '~/shared/lib/reatom-next-rsc';

export const pageAtom = reatomNumber(1, 'pageAtom').pipe(
	withSearchParamsPersist('page', (page = '1') => Number(page))
)

export const searchAtom = searchParamsAtom.lens('search');

export const fetchEpisodes = reatomResource(
	async (ctx) => {
		const query = ctx.spy(searchAtom)
		const page = ctx.spy(pageAtom)

		return ctx.schedule(() => getEpisodes({
			page,
			name: query
		}))
	},
	"fetchEpisodes"
).pipe(
	withDataAtom(null, (ctx, { data }) => data),
	withErrorAtom(),
	withStatusesAtom(),
	withCache({
		length: 50,
		staleTime: Infinity,
		swr: false,
		withPersist: withSsr
	}),
	withStatusesAtom()
);

export const {
	dataAtom,
	errorAtom,
	statusesAtom
} = fetchEpisodes