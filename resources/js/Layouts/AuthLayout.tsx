import AppIcon from '@/Components/Icon/AppIcon'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <main className="flex flex-col xl:flex-row xl:overflow-hidden h-screen w-screen bg-[#fefefe]">
            {children}
        </main>
    )
}

export function Visualizer({
    className,
    illustration,
    altText,
    quotes,
    quoter,
}: {
    className?: string
    illustration: string
    altText: string
    quotes: string
    quoter: string
}) {
    return (
        <section
            className={`bg-stone-100 flex flex-col items-center lg:items-start justify-center xl:w-[39%] w-full lg:min-h-screen shrink-0 px-8 gap-4 lg:gap-10 py-6 lg:py-0 ${className}`}
        >
            <div className="flex lg:flex-col gap-2 lg:gap-3 items-center justify-center lg:justify-normal lg:items-start">
                <span className="text-2xl lg:text-5xl block font-bold">
                    Welcome <span className="text-blue-700">to</span>
                </span>
                <AppIcon className="text-2xl lg:text-3xl" />
            </div>
            <div className="flex flex-col gap-4 lg:gap-12 items-center lg:items-start">
                <img
                    src={illustration}
                    alt={altText}
                    className="drop-shadow w-6/12 lg:w-fit"
                    draggable={false}
                />
                <span className="text-zinc-700 text-xs lg:text-sm font-medium block">
                    "{quotes}" - <span className="font-semibold">{quoter}</span>
                </span>
            </div>
        </section>
    )
}

export function Form({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <section
            className={`xl:w-[61%] w-full bg-[#fefefe] xl:px-10 py-6 lg:py-16 justify-center lg:min-h-screen flex flex-col gap-6 lg:gap-8 items-center shrink-0 lg:shadow ${className}`}
        >
            {children}
        </section>
    )
}

AuthLayout.Visualizer = Visualizer
AuthLayout.Form = Form
