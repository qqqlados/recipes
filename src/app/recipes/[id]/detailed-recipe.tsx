import ArrowBack from '@/components/ui/arrow-back'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

interface IDetailedRecipe {
	title: string
	image: string
	extendedIngredients: IIngredient[]
	servings: number
	cuisines: string[]
	summary: string
}

interface IIngredient {
	id: number
	name: string
	image: string
	original: string
}

interface DetailedRecipeProps {
	id: string
}

const API_CONFIG = {
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
}

const INGREDIENT_IMAGE_BASE_URL = 'https://spoonacular.com/cdn/ingredients_250x250/'

const buildRecipeApiUrl = (id: string): string => {
	return `${API_CONFIG.baseUrl}/${id}/information?apiKey=${API_CONFIG.apiKey}`
}

const formatCuisines = (cuisines: string[]): string => {
	if (!cuisines?.length) return 'Various cuisines'

	return cuisines.reduce((acc, cuisine, index, array) => {
		acc += cuisine
		if (index !== array.length - 1) {
			acc += ', '
		}
		return acc
	}, '')
}

const stripHtmlTags = (html: string): string => {
	return html.replace(/<[^>]*>/g, '')
}

export async function DetailedRecipe({ id }: DetailedRecipeProps) {
	try {
		const apiUrl = buildRecipeApiUrl(id)
		const response = await fetch(apiUrl)

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const recipe: IDetailedRecipe = await response.json()

		if (!recipe) {
			throw new Error('Recipe not found')
		}

		const formattedCuisines = formatCuisines(recipe.cuisines)
		const cleanSummary = stripHtmlTags(recipe.summary)

		return (
			<div className='space-y-6'>
				<ArrowBack className='top-15 left-50' />

				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='text-center text-xl'>{recipe.title}</CardTitle>
						<CardDescription className='text-center'>
							<div className='flex justify-center gap-5 flex-wrap'>
								<span>Servings: {recipe.servings}</span>
								<span>{formattedCuisines} cuisines</span>
							</div>
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className='flex justify-center gap-10 flex-wrap w-full'>
							<div className='relative'>
								<Image src={recipe.image} alt={`${recipe.title} recipe image`} width={556} height={370} className='rounded-lg' priority />
							</div>

							<div className='w-full max-w-[420px]'>
								<h3 className='text-lg font-semibold mb-4'>Ingredients</h3>
								<ScrollArea className='h-[370px] pr-5'>
									<ul className='flex flex-col gap-5'>
										{recipe.extendedIngredients?.map((ingredient) => (
											<li key={ingredient.id} className='h-[50px] flex gap-5 items-center'>
												<div className='flex-shrink-0'>
													<Image
														src={`${INGREDIENT_IMAGE_BASE_URL}${ingredient.image}`}
														width={50}
														height={50}
														alt={ingredient.name}
														className='object-contain'
													/>
												</div>
												<p className='text-gray-800 flex-1'>{ingredient.original}</p>
											</li>
										))}
									</ul>
								</ScrollArea>
							</div>

							<div className='max-w-[1020px] w-full'>
								<h3 className='text-lg font-semibold mb-4'>Description</h3>
								<p className='text-justify leading-relaxed'>{cleanSummary}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	} catch (error) {
		console.error('Failed to fetch recipe details:', error)

		return (
			<div className='space-y-6'>
				<ArrowBack className='top-15 left-50' />
				<Card className='w-full'>
					<CardContent className='py-8'>
						<div className='text-center'>
							<p className='text-red-500 mb-2'>Failed to load recipe details</p>
							<p className='text-gray-500 text-sm'>Please check your connection and try again later.</p>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}
}
