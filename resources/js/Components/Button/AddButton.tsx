import { Link } from '@inertiajs/react'

export default function AddButton({ href }: { href: string }) {
    return (
        <Link
            href={href}
            className="w-full lg:w-fit h-fit bg-blue-500 text-white font-normal flex items-center gap-2 hover:bg-blue-600 lg:rounded-md transition-all duration-300 rounded px-3 py-1 group shadow justify-center"
        >
            <span className="text-base lg:text-lg">+</span>
            <span className="text-xs lg:text-sm">Tambah data</span>
        </Link>
    )
}
