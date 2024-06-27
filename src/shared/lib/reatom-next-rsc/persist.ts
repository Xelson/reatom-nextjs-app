import { withInit, withReset } from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist'

export const ssrStorage = createMemStorage({ name: 'ssr', subscribe: false })
export const snapshotAtom = ssrStorage.snapshotAtom.pipe(
	withInit((ctx, init) => ({ ...init(ctx) }))
)

// eslint-disable-next-line @reatom/reatom-prefix-rule
export const withSsr = reatomPersist(ssrStorage)