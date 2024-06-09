export default function CardsContainer({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <section
            className={`w-full h-auto p-3 bg-[#fbfbfb] shadow rounded-lg ${className}`}
        >
            {children}
        </section>
    )
}
