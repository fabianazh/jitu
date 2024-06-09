import { useState, useEffect, useRef } from 'react'

interface TabProps {
    label: string
    children: React.ReactNode
}

interface TabsProps {
    children: React.ReactElement<TabProps>[]
}

function Tab({ children }: TabProps) {
    return <>{children}</>
}

export default function TabsContainer({ children }: TabsProps) {
    const [activeTab, setActiveTab] = useState(0)
    const [indicatorPosition, setIndicatorPosition] = useState({
        left: 0,
        width: 0,
    })
    const tabListRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (tabListRef.current) {
            const labelWidth =
                tabListRef.current.children[activeTab].getBoundingClientRect()
                    .width
            const left = (tabListRef.current.children[activeTab] as HTMLElement)
                .offsetLeft
            setIndicatorPosition({ left, width: labelWidth })
        }
    }, [activeTab, children])

    const handleTabClick = (index: number) => {
        setActiveTab(index)
    }

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex gap-4 pb-0.5 relative" ref={tabListRef}>
                {children.map((tab, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 cursor-pointer transition duration-300 ${
                            index === activeTab
                                ? 'font-medium text-xs lg:text-sm text-stone-800'
                                : 'text-stone-500 text-xs lg:text-sm font-medium hover:text-stone-800'
                        }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.props.label}
                    </div>
                ))}
                <div
                    className="absolute bottom-0 left-0 h-0.5 rounded-full bg-stone-800 transition duration-300"
                    style={{
                        width: indicatorPosition.width,
                        transform: `translateX(${indicatorPosition.left}px)`,
                    }}
                />
            </div>
            <div className="w-full">
                {children.map((tab, index) => (
                    <div
                        key={index}
                        className={`bg-transparent ${
                            index === activeTab ? 'block' : 'hidden'
                        }`}
                    >
                        {tab.props.children}
                    </div>
                ))}
            </div>
        </div>
    )
}

TabsContainer.Tab = Tab
