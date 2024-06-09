import { Link } from '@inertiajs/react'

export default function RedirectButton({
    href,
    className,
    text = 'Ubah',
}: {
    href: string
    className?: string
    text?: string
}) {
    return (
        <Link
            href={href}
            className={`font-medium text-black bg-stone-200 hover:bg-stone-300 transition-all duration-200 w-full lg:w-fit text-center lg:rounded-md py-2 px-6 rounded text-xs lg:text-sm shadow ${className}`}
        >
            {text}
        </Link>
    )
}
