import RecipesPageSkeletons from '@/components/ui/skeletons/recipes-page-skeletons'
import { Suspense } from 'react'
import RecipesList from './recipes-list'

interface SearchParams {
	query: string
	cuisine: string
	maxReadyTime: string
}

interface RecipesPageProps {
	searchParams: SearchParams
}

export default async function Recipes({ searchParams }: RecipesPageProps) {
	return (
		<div className='flex flex-col gap-10'>
			<header>
				<h1 className='text-center text-lg font-semibold'>Recipes</h1>
			</header>

			<main>
				<Suspense fallback={<RecipesPageSkeletons />}>
					<RecipesList searchParams={searchParams} />
				</Suspense>
			</main>
		</div>
	)
}
