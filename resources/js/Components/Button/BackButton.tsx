import { Link } from '@inertiajs/react'

export default function BackButton({ href }: { href: string }) {
    return (
        <Link
            href={href}
            className="w-full lg:w-fit h-fit bg-stone-200 flex items-center gap-2 hover:bg-stone-300 rounded md px-5 py-1.5 group lg:rounded-md transition-all duration-300 shadow"
        >
            <span className="text-xs lg:text-sm font-medium text-black text-center w-full lg:w-fit">
                Kembali
            </span>
        </Link>
    )
}
