import ArrowBack from '@/components/ui/arrow-back'
import { MoveLeft } from 'lucide-react'
import Image from 'next/image'
import { DetailedRecipe } from './detailed-recipe'
import { Suspense } from 'react'
import { DetailedRecipeSkeleton } from '@/components/ui/skeletons/detailed-recipe-page-skeleton'

export default async function Recipe({ params }: { params: { id: string } }) {
	const { id } = await params

	return (
		<Suspense fallback={<DetailedRecipeSkeleton />}>
			<DetailedRecipe id={id} />
		</Suspense>
	)
}
