import { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TodayViolationsSection from '@/Components/Section/Dashboard/TodayViolationsSection'
import Breadcumb from '@/Components/Other/Breadcumb'
import Indicator from '@/Components/Other/Indicator'
import WelcomeSection from '@/Components/Section/Dashboard/WelcomeSection'
import StatisticPieSection from '@/Components/Section/Dashboard/StatisticPieSection'
import StatisticBarSection from '@/Components/Section/Dashboard/StatisticBarSection'
import StatisticCardsSection from '@/Components/Section/Dashboard/StatisticCardsSection'

export default function Index({
    auth,
    todayViolations,
    monthlyViolationStats,
    years,
    selectedYear,
    totalPoints,
    totalMessage,
    totalViolations,
}: PageProps &
    DashboardPageProps & {
        totalPoints?: number
        totalMessage?: number
        totalViolations?: number
    }) {
    const [violationIsEmpty, setViolationIsEmpty] = useState(false)

    useEffect(() => {
        if (monthlyViolationStats) {
            const isEmpty = monthlyViolationStats.every(
                (item) => item.LL === 0 && item.P === 0
            )
            setViolationIsEmpty(isEmpty)
        }
    }, [selectedYear, monthlyViolationStats])

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Dashboard">
                        <Breadcumb>
                            <Breadcumb.Item href="" active={true}>
                                Dashboard
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button></Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <WelcomeSection auth={auth} />
                {monthlyViolationStats && (
                    <>
                        <div className="flex flex-col md:flex-row gap-5 h-fit">
                            <StatisticBarSection
                                monthlyViolationStats={monthlyViolationStats}
                                years={years}
                                selectedYear={selectedYear}
                                violationIsEmpty={violationIsEmpty}
                            />
                            {!violationIsEmpty && (
                                <StatisticPieSection
                                    selectedYear={selectedYear}
                                    monthlyViolationStats={
                                        monthlyViolationStats
                                    }
                                />
                            )}
                        </div>
                        <TodayViolationsSection
                            todayViolations={todayViolations || []}
                        />
                    </>
                )}
                {auth?.student?.user && (
                    <>
                        <StatisticCardsSection
                            totalPoints={totalPoints ?? 0}
                            totalMessage={totalMessage ?? 0}
                            totalViolations={totalViolations ?? 0}
                        ></StatisticCardsSection>
                    </>
                )}
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
