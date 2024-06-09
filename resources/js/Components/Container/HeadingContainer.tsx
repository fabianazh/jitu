export default function HeadingContainer({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full h-auto mb-3 px-3 rounded-md flex justify-between items-center py-1 lg:px-0.5">
            {children}
        </div>
    )
}

export function Heading({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="items-center justify-end h-full gap-3">
            <h2 className="text-sm lg:text-xl font-semibold">{title}</h2>
            <span className="text-[10px] lg:text-sm block text-stone-700 font-medium">
                {desc}
            </span>
        </div>
    )
}

export function Feature({ children }: { children: React.ReactNode }) {
    return <div className="h-auto flex justify-start gap-3">{children}</div>
}

HeadingContainer.Heading = Heading
HeadingContainer.Feature = Feature
