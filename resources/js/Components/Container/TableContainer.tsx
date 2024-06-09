export default function TableContainer({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <table className={`w-full h-auto flex flex-col table-fixed`}>
            {children}
        </table>
    )
}

export function Heading({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <thead className="w-full h-auto rounded-t-lg">
            <tr
                className={`flex w-full items-center h-full p-2 lg:p-3 text-sm bg-stone-100 shadow-sm lg:rounded-md font-semibold ${className}`}
            >
                {children}
            </tr>
        </thead>
    )
}

export function Content({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <tbody
            className={`flex h-auto flex-col z-10 rounded-b-lg px-2 lg:px-3 ${className}`}
        >
            {children}
        </tbody>
    )
}

TableContainer.Heading = Heading
TableContainer.Content = Content
