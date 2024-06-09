import { IoPeople, IoSchool, IoWarning } from 'react-icons/io5'
import StatisticCard from '@/Components/Card/StatisticCard'
import { FaCoins } from 'react-icons/fa6'
import {
    BiBell,
    BiSolidMessageAltDetail,
    BiSolidMessageAltDots,
} from 'react-icons/bi'

export default function StatisticCardsSection({
    totalPoints,
    totalMessage,
    totalViolations,
}: StatisticCardsSectionProps) {
    const cards = [
        {
            totalData: totalPoints,
            descData: 'Total Poin',
            icon: <FaCoins />,
            href: route('student.dashboard.profile.index'),
            backgroundColor: 'bg-blue-100',
            textColor: 'text-blue-500',
        },
        {
            totalData: totalViolations,
            descData: 'Total Pelanggaran',
            icon: <IoWarning />,
            href: route('student.dashboard.history.index'),
            backgroundColor: 'bg-green-100',
            textColor: 'text-green-500',
        },
        {
            totalData: totalMessage,
            descData: 'Total Pesan',
            icon: <BiSolidMessageAltDetail />,
            href: route('student.dashboard.notifications.index'),
            backgroundColor: 'bg-red-100',
            textColor: 'text-red-500',
        },
    ]

    return (
        <div className="flex flex-col lg:flex-row justify-between w-full h-auto lg:gap-6 mb-5">
            {cards.map((card, index) => {
                return (
                    <StatisticCard href={card.href} key={index}>
                        <StatisticCard.Data
                            totalData={card.totalData}
                            descData={card.descData}
                            icon={card.icon}
                            backgroundColor={card.backgroundColor}
                            textColor={card.textColor}
                        />
                        <StatisticCard.Button
                            href={card.href}
                            backgroundColor={card.backgroundColor}
                        />
                    </StatisticCard>
                )
            })}
        </div>
    )
}
