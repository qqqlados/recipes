'use client'

import { lazy, Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const cuisines = [
	'African',
	'Asian',
	'American',
	'British',
	'Cajun',
	'Caribbean',
	'Chinese',
	'Eastern European',
	'European',
	'French',
	'German',
	'Greek',
	'Indian',
	'Irish',
	'Italian',
	'Japanese',
	'Jewish',
	'Korean',
	'Latin American',
	'Mediterranean',
	'Mexican',
	'Middle Eastern',
	'Nordic',
	'Southern',
	'Spanish',
	'Thai',
	'Vietnamese',
] as const

type Cuisines = (typeof cuisines)[number]

export default function Home() {
	const [query, setQuery] = useState<string>('')
	const [selectedCuisine, setSelectedCuisine] = useState<Cuisines | ''>('')
	const [preparationTime, setPreparationTime] = useState<number>(0)

	const router = useRouter()

	const handleSelectCuisine = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCuisine(e.target.value as Cuisines)
	}

	return (
		<main>
			<div className='grid place-items-center gap-15 w-full'>
				<Image src={'/imgs/home-logo.jpg'} alt='Home logo' width={300} height={500} style={{ borderRadius: 5 }} />

				<div className='w-full mx-auto flex justify-center gap-5'>
					<Input name='query' type='text' placeholder='Type the name of recipe' onChange={e => setQuery(e.target.value)} className='w-60' />

					<Select onValueChange={(val: Cuisines) => setSelectedCuisine(val)}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Select a cuisine' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Cuisines</SelectLabel>

								{cuisines.map((cs, index) => (
									<SelectItem key={index} value={cs}>
										{cs}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>

					<Input
						name='maxReadyTime'
						type='number'
						min={10}
						max={180}
						step={5}
						placeholder='Time, min'
						onChange={e => setPreparationTime(Number(e.target.value))}
						onKeyDown={e => {
							const allowedKeys = ['ArrowUp', 'ArrowDown', 'Backspace', 'Delete', 'Tab', 'Home', 'End', 'ArrowLeft', 'ArrowRight']

							if (!allowedKeys.includes(e.key) && !/^[0-9]$/.test(e.key)) {
								e.preventDefault()
							}
						}}
						className='w-40 text-center'
					/>
				</div>

				<Button
					onClick={() => router.push(`/recipes?query=${query}&cuisine=${selectedCuisine}&maxReadyTime=${preparationTime}`)}
					disabled={!query || !selectedCuisine || !preparationTime}
					className='cursor-pointer'
				>
					Search recipes
				</Button>
			</div>
		</main>
	)
}
