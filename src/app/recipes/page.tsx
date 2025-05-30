import RecipesPageSkeletons from '@/components/ui/skeletons/recipes-page-skeletons'
import { Suspense } from 'react'

import RecipesList from './recipes-list'

export default async function Recipes({ searchParams }: { searchParams: { query: string; cuisine: string; maxReadyTime: string } }) {
	return (
		<div className='flex flex-col gap-10'>
			<p className='text-center text-lg'>Recipes</p>

			<Suspense fallback={<RecipesPageSkeletons />}>
				<RecipesList searchParams={searchParams} />
			</Suspense>
		</div>
	)
}
