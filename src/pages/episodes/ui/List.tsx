/* eslint-disable @next/next/no-img-element */
'use client';

import { useAction, useAtom } from "@reatom/npm-react";
import { dataAtom, pageAtom, searchAtom, statusesAtom } from "../model";
import Link from "next/link";

export function List() {
	const [list] = useAtom(dataAtom)
	const [status] = useAtom(statusesAtom)
	const [search, setSearch] = useAtom(searchAtom);
	const next = useAction(pageAtom.increment);
	const prev = useAction(pageAtom.decrement);

	return (
		<div className='flex flex-col gap-[1rem] mx-auto w-[20rem]'>
			<Link href='/'>to characters</Link>

			<input
				defaultValue={search}
				onChange={(e) => setSearch(e.currentTarget.value)}
				placeholder="Search"
				className='p-[0.5rem]'
			/>

			{status.isFirstPending && (
				<p>Loading...</p>
			)}

			<div className={status.isPending ? 'opacity-80' : undefined}>
				{list?.results?.map(c => (
					<div className='flex gap-[1rem] items-center' key={c.id}>
						<span>{c.episode}</span>

						{c.name}
					</div>
				))}
			</div>

			<div className='flex justify-end gap-[1rem]'>
				{list?.info?.prev && (
					<button onClick={() => prev()}>
						{'<- prev'}
					</button>
				)}

				{list?.info?.next && (
					<button onClick={() => next()}>
						{'next ->'}
					</button>
				)}
			</div>
		</div>
	);
}