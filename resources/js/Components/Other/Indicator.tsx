import Calendar from '@/Components/Other/Calendar'

export default function Indicator({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="w-full h-auto py-3 mt-[4.5rem] px-3 lg:px-5 flex flex-col lg:flex-row lg:items-center justify-between bg-[#fdfdfd] shadow lg:rounded-lg gap-3 lg:gap-0">
                {children}
            </div>
        </>
    )
}

export function Title({
    children,
    title,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-0.5 h-full justify-center">
            <span className="text-base lg:text-xl font-semibold">{title}</span>
            {children}
        </div>
    )
}

export function Button({ children }: { children?: React.ReactNode }) {
    return (
        <div className="lg:w-fit w-full h-full flex gap-5 items-center">
            {children ? children : <Calendar />}
        </div>
    )
}

Indicator.Title = Title
Indicator.Button = Button
