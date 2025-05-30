'use client'

import clsx from 'clsx'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ArrowBack({ className }: { className?: string }) {
	const router = useRouter()

	return (
		<div className={clsx('fixed flex items-center gap-2 cursor-pointer z-99999', className)} onClick={() => router.back()}>
			<MoveLeft />
			<span>Back</span>
		</div>
	)
}
