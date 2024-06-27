import { withErrorAtom, withDataAtom } from '@reatom/async'
import { reatomNumber, reatomResource, withCache, withInit, withStatusesAtom } from '@reatom/framework';
import { searchParamsAtom, withSearchParamsPersist } from '@reatom/url'
import { getCharacters } from 'rickmortyapi'
import { withSsr } from '~/shared/lib/reatom-next-rsc/persist';

export const pageAtom = reatomNumber(1, 'pageAtom').pipe(
	withSearchParamsPersist('page', (page = '1') => Number(page))
)

export const searchAtom = searchParamsAtom.lens('search');

export const fetchCharacters = reatomResource(
	async (ctx) => {
		const query = ctx.spy(searchAtom)
		const page = ctx.spy(pageAtom)

		return ctx.schedule(() => getCharacters({
			page,
			name: query
		}))
	},
	"fetchCharacters"
).pipe(
	withDataAtom(null, (ctx, { data }) => { console.log('withDataAtom', data.results?.[0].name); return data }),
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
} = fetchCharacters