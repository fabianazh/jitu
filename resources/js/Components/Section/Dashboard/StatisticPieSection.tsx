import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function StatisticPieSection({
    monthlyViolationStats,
    selectedYear,
}: DashboardPageProps) {
    const COLORS = ['#3b82f6', 'pink']

    const totalMaleViolations = monthlyViolationStats?.reduce(
        (sum, entry) => sum + entry.LL,
        0
    )
    const totalFemaleViolations = monthlyViolationStats?.reduce(
        (sum, entry) => sum + entry.P,
        0
    )

    const pieChartData = [
        { name: 'L', value: totalMaleViolations },
        { name: 'P', value: totalFemaleViolations },
    ]

    return (
        <div className="flex flex-col w-full md:w-[30%] shrink-0 h-[21rem] lg:h-auto gap-2 mb-5 bg-[#fdfdfd] shadow rounded lg:rounded-lg p-3 lg:p-4">
            <div>
                <h3 className="text-base lg:text-lg font-semibold">
                    Tampilan Persentase
                </h3>
                <span className="text-xs lg:text-sm">
                    Pelanggaran siswa tahun {selectedYear}.
                </span>
            </div>
            <ResponsiveContainer className={`w-full h-fit`}>
                <PieChart>
                    <Pie
                        data={pieChartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        fill="#82ca9d"
                        label={({ name, value }) =>
                            `${(
                                (value /
                                    ((totalMaleViolations ?? 0) +
                                        (totalFemaleViolations ?? 0))) *
                                100
                            ).toFixed(0)}%`
                        }
                    >
                        {pieChartData?.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
