'use client'

import { Skeleton } from '@/components/ui/skeleton'

const SKELETON_COUNT = 9

export default function RecipesPageSkeletons() {
	const skeletonItems = Array.from({ length: SKELETON_COUNT }, (_, index) => index)

	return (
		<div className='relative'>
			<div className='absolute top-10 left-10 z-10'>
				<Skeleton className='h-8 w-8 rounded-full' />
			</div>

			<div className='grid gap-5 justify-items-center px-20' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
				{skeletonItems.map((_, index) => (
					<div key={`recipe-skeleton-${index}`} className='w-full max-w-[310px]'>
						<div className='rounded-lg border bg-card text-card-foreground shadow-sm'>
							<div className='p-6 pb-4'>
								<Skeleton className='h-5 w-3/4 mx-auto' />
							</div>

							<div className='p-6 pt-0'>
								<div className='relative w-full h-48 overflow-hidden rounded-md'>
									<Skeleton className='h-full w-full' />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
