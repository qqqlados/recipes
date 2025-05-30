import ArrowBack from '@/components/ui/arrow-back'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface IRecipe {
	id: number
	image: string
	imageType: 'jpg'
	title: string
}

interface SearchParams {
	query: string
	cuisine: string
	maxReadyTime: string
}

interface RecipesListProps {
	searchParams: SearchParams
}

const API_CONFIG = {
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	cache: { cache: 'force-cache' as const, next: { revalidate: 60 } },
}

const buildApiUrl = async (searchParams: SearchParams): Promise<string> => {
	const { query, cuisine, maxReadyTime } = await searchParams
	const params = new URLSearchParams({
		query: query || '',
		cuisine: cuisine || '',
		maxReadyTime: maxReadyTime || '',
		apiKey: API_CONFIG.apiKey || '',
	})

	return `${API_CONFIG.baseUrl}/complexSearch?${params.toString()}`
}

export default async function RecipesList({ searchParams }: RecipesListProps) {
	try {
		const apiUrl = await buildApiUrl(searchParams)
		const response = await fetch(apiUrl, API_CONFIG.cache)

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		const recipes: IRecipe[] = data.results || []

		console.log(recipes)

		if (!recipes.length) {
			return (
				<div className='text-center py-8'>
					<ArrowBack className='top-10 left-10' />
					<p className='text-gray-500 mt-4'>No recipes found. Try adjusting your search criteria.</p>
				</div>
			)
		}

		return (
			<div className='relative'>
				<ArrowBack className='top-10 left-10' />

				<div className='grid gap-5 justify-items-center px-20' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
					{recipes.map((recipe) => (
						<Link href={`/recipes/${recipe.id}`} key={recipe.id} className='transition-transform hover:scale-105 w-full max-w-[310px]'>
							<Card className='w-full h-full'>
								<CardHeader>
									<CardTitle className='truncate text-sm' title={recipe.title}>
										{recipe.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='relative w-full h-48 overflow-hidden rounded-md'>
										<Image
											src={recipe.image}
											alt={`${recipe.title} recipe`}
											fill
											className='object-cover'
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										/>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		)
	} catch (error) {
		console.error('Failed to fetch recipes:', error)

		return (
			<div className='text-center py-8'>
				<ArrowBack className='top-10 left-10' />
				<div className='mt-4'>
					<p className='text-red-500 mb-2'>Failed to load recipes</p>
					<p className='text-gray-500 text-sm'>Please check your connection and try again later.</p>
				</div>
			</div>
		)
	}
}
