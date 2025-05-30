'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function RecipesPageSkeletons() {
	const grid = Array.from({ length: 9 }, (_, i) => i)

	return (
		<div className='grid gap-5 justify-items-center px-20' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
			{grid.map(skel => (
				<Skeleton className='w-[310px] h-[290px] rounded-xl' />
			))}
		</div>
	)
}
