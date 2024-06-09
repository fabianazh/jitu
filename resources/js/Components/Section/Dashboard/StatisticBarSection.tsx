import Dropdown from '@/Components/Other/Dropdown'
import { LuChevronDown } from 'react-icons/lu'
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import NotFoundCard from '@/Components/Card/NotFoundCard'

export default function StatisticBarSection({
    monthlyViolationStats,
    years,
    selectedYear,
    violationIsEmpty,
}: DashboardPageProps) {
    return (
        <div
            className={`relative w-full flex flex-col h-auto py-3 lg:py-5 text-sm bg-[#fdfdfd] shadow rounded lg:rounded-lg text-gray-900 mb-5 ${
                violationIsEmpty ? '' : 'min-h-[20rem]'
            }`}
        >
            <div className="px-3 lg:px-6 mb-6 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="font-semibold text-base lg:text-xl">
                        Statistik Pelanggaran tahun {selectedYear ?? 2023}
                    </span>
                    <span className="text-xs lg:text-base">
                        Visualisasi statistik pelanggaran siswa berdasarkan
                        jenis kelamin.
                    </span>
                </div>
                <Dropdown>
                    <Dropdown.Trigger>
                        <div className="bg-transparent hover:bg-stone-100/80 focus:bg-stone-100/80 transition-all duration-300 border text-stone-500 flex items-center justify-center gap-1 p-1.5 lg:p-2.5 rounded-lg h-10 w-fit cursor-pointer">
                            <span className="text-xs lg:text-sm font-semibold block ml-1.5 text-stone-700">
                                {selectedYear}
                            </span>
                            <LuChevronDown className="text-base" />
                        </div>
                    </Dropdown.Trigger>

                    <Dropdown.Content align="right" width="xs">
                        {years?.map((year) => (
                            <Dropdown.Link
                                key={year}
                                href={`?year=${year}`}
                                className={`flex gap-2 items-center`}
                                active={selectedYear === year}
                            >
                                {year}
                            </Dropdown.Link>
                        ))}
                    </Dropdown.Content>
                </Dropdown>
            </div>
            {violationIsEmpty ? (
                <NotFoundCard
                    imageWidth="w-48 lg:w-60"
                    message={`Tidak ada data pelanggaran pada tahun ${selectedYear}.`}
                />
            ) : (
                <>
                    <ResponsiveContainer
                        className={'-translate-x-5 w-full h-full'}
                    >
                        <BarChart
                            width={500}
                            height={300}
                            data={monthlyViolationStats}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="LL"
                                fill="#3b82f6"
                                activeBar={
                                    <Rectangle fill="#8884d8" stroke="blue" />
                                }
                            />
                            <Bar
                                dataKey="P"
                                fill="pink"
                                activeBar={
                                    <Rectangle fill="pink" stroke="purple" />
                                }
                            />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="px-6 flex flex-col text-xs lg:text-sm">
                        <span className="font-semibold -translate-x-[1px]">
                            Keterangan
                        </span>
                        <span className="font-medium text-stone-700">
                            LL = Laki-Laki
                        </span>
                        <span className="font-medium text-stone-700">
                            P = Perempuan
                        </span>
                    </div>
                </>
            )}
        </div>
    )
}
