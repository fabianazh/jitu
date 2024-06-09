import { Link } from '@inertiajs/react'
import { PiHouseBold } from 'react-icons/pi'
import { FiChevronRight } from 'react-icons/fi'

export default function Breadcumb({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-fit h-fit flex items-center gap-0 lg:gap-1 truncate">
            <Link href={route('landing.home')}>
                <PiHouseBold className="hover:text-blue-700 transition text-xs lg:text-base" />
            </Link>
            <FiChevronRight className="text-sm lg:text-base" />
            {children}
        </div>
    )
}

export function Item({
    children,
    active,
    href,
}: {
    children: React.ReactNode
    active?: boolean
    href: string
}) {
    return (
        <>
            {active ? (
                <>
                    <span
                        className={`hover:text-blue-700 font-medium text-xs lg:text-sm ${
                            active ? 'text-blue-700' : ''
                        }`}
                    >
                        {children}
                    </span>
                </>
            ) : (
                <>
                    <Link
                        href={href}
                        className="font-medium text-xs lg:text-sm"
                    >
                        <span
                            className={`hover:text-blue-700 hover:underline ${
                                active ? 'text-blue-700' : ''
                            }`}
                        >
                            {children}
                        </span>
                    </Link>
                    <FiChevronRight className="text-sm lg:text-base" />
                </>
            )}
        </>
    )
}

Breadcumb.Item = Item
