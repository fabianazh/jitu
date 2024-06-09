import { Link, InertiaLinkProps } from '@inertiajs/react'

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'text-sm lg:text-base rounded lg:rounded-md flex items-center gap-3 w-full py-3 px-4 transition-all duration-200 ' +
                (active
                    ? 'bg-stone-100 shadow-sm text-blue-700 '
                    : 'bg-transparent text-black shadow-none hover:bg-stone-100 hover:text-blue-700 hover:shadow-sm ') +
                className
            }
        >
            {children}
        </Link>
    )
}
