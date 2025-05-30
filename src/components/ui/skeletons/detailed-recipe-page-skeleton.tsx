import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

export function DetailedRecipeSkeleton() {
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='text-center'>
					<Skeleton className='h-6 w-[250px] mx-auto' />
				</CardTitle>
				<CardDescription className='text-center'>
					<div className='flex justify-center gap-5 mt-2'>
						<Skeleton className='h-4 w-[100px]' />
						<Skeleton className='h-4 w-[120px]' />
					</div>
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className='flex justify-center gap-10 flex-wrap w-full'>
					<Skeleton className='w-[556px] h-[370px] rounded' />

					<ScrollArea className='h-[370px] w-[420px] pr-5'>
						<ul className='flex flex-col gap-5'>
							{Array.from({ length: 6 }).map((_, i) => (
								<li key={i} className='h-[50px] flex gap-5 items-center'>
									<Skeleton className='w-[50px] h-[50px] rounded' />
									<Skeleton className='h-4 w-[300px]' />
								</li>
							))}
						</ul>
					</ScrollArea>

					<div className='max-w-[1020px] space-y-2 mt-4'>
						{Array.from({ length: 6 }).map((_, i) => (
							<Skeleton key={i} className='h-4 w-full' />
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
