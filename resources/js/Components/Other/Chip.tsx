export default function Chip({
    category,
    children,
}: {
    category?: string
    children: React.ReactNode
}) {
    let backgroundColor = ''

    switch (category) {
        case 'Ringan':
            backgroundColor = 'bg-blue-400'
            break
        case 'Sedang':
            backgroundColor = 'bg-green-400'
            break
        case 'Berat':
            backgroundColor = 'bg-red-400'
            break
        default:
            backgroundColor = 'bg-blue-400'
            break
    }

    return (
        <div
            className={`py-0.5 lg:py-1 inline-block px-2 lg:px-2.5 text-white rounded-md shadow text-[0.6rem] lg:text-xs ${backgroundColor}`}
        >
            {children}
        </div>
    )
}
