import { Link } from '@inertiajs/react'

export default function AppIcon({ className }: { className?: string }) {
    return (
        <Link href={'/'}>
            <span
                className={`font-bold text-2xl lg:text-3xl text-black ${className}`}
            >
                Jitu!
            </span>
        </Link>
    )
}
