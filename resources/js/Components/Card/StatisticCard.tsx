import { Link } from '@inertiajs/react'

export default function StatisticCard({
    children,
    href,
}: {
    children: React.ReactNode
    href: string
}) {
    return (
        <Link
            href={href}
            className="lg:w-10/12 shadow flex flex-col h-auto px-4 py-3 lg:py-6 lg:rounded-lg bg-[#fdfdfd] overflow-hidden"
        >
            {children}
        </Link>
    )
}

export function Data({
    totalData,
    descData,
    icon,
    backgroundColor,
    textColor,
}: {
    totalData: number
    descData: string
    icon: React.ReactNode
    backgroundColor?: string
    textColor?: string
}) {
    return (
        <div className="flex flex-col gap-2 lg:px-6 w-full h-auto">
            <div className="w-full h-auto flex justify-between">
                <span
                    className={`text-blue-500 font-bold text-2xl lg:text-5xl block`}
                >
                    {totalData}
                </span>
                <div
                    className={`grid place-items-center mt-1 my-auto w-8 lg:w-11 aspect-square rounded-full shadow bg-blue-100 text-base lg:text-2xl text-blue-700`}
                >
                    {icon}
                </div>
            </div>
            <span className="text-sm lg:text-lg text-stone-700 font-medium">
                {descData}
            </span>
        </div>
    )
}

export function Button({
    href,
    backgroundColor,
}: {
    href: string
    backgroundColor?: string
}) {
    return (
        // <div
        //     className={`w-full h-auto bg-stone-100 flex justify-end items-center p-3 gap-3`}
        // >
        //     <Link
        //         href={href}
        //         className={`px-3 py-1 w-fit h-fit text-black font-medium rounded text-sm shadow bg-blue-100`}
        //     >
        //         Lihat Detail
        //     </Link>
        // </div>
        <></>
    )
}

StatisticCard.Data = Data
StatisticCard.Button = Button
