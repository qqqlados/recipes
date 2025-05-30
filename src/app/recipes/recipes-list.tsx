import ArrowBack from '@/components/ui/arrow-back'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface IRecipe {
	id: number
	image: string
	imageType: 'jpg'
	title: string
}

type Props = {
	searchParams: {
		query: string
		cuisine: string
		maxReadyTime: string
	}
}

export default async function RecipesList({ searchParams }: Props) {
	const { query, cuisine, maxReadyTime } = await searchParams

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/complexSearch?query=${query}&cuisine=${cuisine}&maxReadyTime=${maxReadyTime}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
			{ cache: 'force-cache', next: { revalidate: 60 } }
		)

		const recipes: IRecipe[] = await response.json().then(res => res.results)

		if (!recipes?.length) {
			return <p className='text-center text-gray-500 mt-4'>No recipes found.</p>
		}

		return (
			<>
				<ArrowBack className='top-10 left-10' />

				<div className='grid gap-5 justify-items-center px-20' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
					{recipes?.map(rcp => (
						<Link href={`/recipes/${rcp.id}`} key={rcp.id} className=''>
							<Card className='w-full'>
								<CardHeader>
									<CardTitle className='truncate'>{rcp.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<Image src={rcp.image} alt='Recipe Image' width={400} height={400} style={{ borderRadius: 5 }} />
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</>
		)
	} catch (err) {
		return (
			<>
				<ArrowBack className='top-15 left-100' />
				<p className='text-red-500 text-center mt-4'>Failed to load recipes. Please try again later.</p>
			</>
		)
	}
}
