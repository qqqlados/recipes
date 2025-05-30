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

export async function DetailedRecipe({ id }: { id: string }) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}/information?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`)

		const recipe: IDetailedRecipe = await response.json()

		const formattedCuisines = recipe?.cuisines?.reduce((acc, cur, index, array) => {
			acc += cur
			if (index !== array.length - 1) {
				acc += ', '
			}
			return acc
		}, '')

		return (
			<>
				<ArrowBack className='top-15 left-50' />

				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='text-center'>{recipe?.title}</CardTitle>
						<CardDescription className='text-center'>
							<div className='flex justify-center gap-5'>
								<p>Servings: {recipe.servings}</p>
								<p>{formattedCuisines} cuisines</p>
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex justify-center gap-10 flex-wrap w-full'>
							<Image src={recipe?.image} alt='Recipe Image' width={556} height={370} style={{ borderRadius: 5 }} />

							<ScrollArea className='h-[370px] w-[420px] pr-5'>
								<ul className='flex flex-col gap-5'>
									{recipe?.extendedIngredients?.map((ingr, index) => (
										<li key={ingr.id} className='h-[50px] flex gap-5 items-center'>
											<Image
												src={`https://spoonacular.com/cdn/ingredients_250x250/${ingr.image}`}
												width={50}
												height={50}
												alt='Ingredient'
												style={{ objectFit: 'contain' }}
											/>
											<p className='text-gray-800'>{ingr.original}</p>
										</li>
									))}
								</ul>
							</ScrollArea>

							<div className='max-w-[1020px]'>
								<p className='text-justify'>{recipe.summary}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</>
		)
	} catch (err) {
		return (
			<div>
				<ArrowBack className='top-15 left-50' />
				<p className='text-red-500 text-center mt-4'>Failed to load recipes. Please try again later.</p>
			</div>
		)
	}
}
