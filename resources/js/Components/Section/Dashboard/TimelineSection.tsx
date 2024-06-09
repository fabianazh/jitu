import NotFoundCard from '@/Components/Card/NotFoundCard'
import { Link } from '@inertiajs/react'
import { FaCircle } from 'react-icons/fa6'

export default function TimelineSection({
    auth,
    violations,
    totalViolations,
    student,
}: PageProps & {
    violations: Violation[]
    totalViolations: number
    student?: Student
}) {
    return (
        <section className="relative w-full h-auto flex flex-col gap-6 py-3 lg:py-4 p-0 lg:p-6 bg-[#fdfdfd] shadow rounded lg:rounded-lg text-gray-900 mb-5">
            <div className="w-full">
                <div className="w-full h-auto mb-3 rounded-md flex justify-between items-center py-1 px-3 lg:px-0.5">
                    <div className="items-center justify-end h-full gap-3">
                        <h2 className="text-sm lg:text-xl font-semibold">
                            Riwayat Pelanggaran
                        </h2>
                        <span className="text-[10px] lg:text-sm block text-stone-700 font-medium">
                            Riwayat semua pelanggaran{' '}
                            {auth?.admin?.user ? student?.name : 'anda'}
                        </span>
                    </div>
                </div>

                <div
                    className={`flex w-full items-center h-auto py-3 px-3 lg:px-6 text-[10px] lg:text-sm bg-stone-100 shadow-sm rounded-md font-semibold text-stone-700 justify-between`}
                >
                    <span>Timeline</span>
                </div>

                {totalViolations > 0 ? null : (
                    <NotFoundCard
                        message="Belum ada pelanggaran."
                        className="mt-5 mb-2"
                    />
                )}
            </div>
            <ul className="w-full px-3">
                {violations.map((violation: Violation, index: number) => (
                    <li className="relative w-full flex gap-4 lg:gap-6 pb-5 items-baseline">
                        <div
                            className={`${
                                index + 1 === violations.length
                                    ? ''
                                    : 'before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-stone-400 z-0'
                            }`}
                        >
                            <FaCircle className="text-[10px] lg:text-sm text-stone-400 z-10" />
                        </div>
                        <Link
                            href={route(
                                auth?.admin?.user
                                    ? 'admin.dashboard.violations.show'
                                    : 'student.dashboard.history.show',
                                {
                                    violation: violation,
                                }
                            )}
                            className="w-full text-xs lg:text-base flex flex-col gap-2 text-black transition-all duration-200 group"
                        >
                            <div className="text-stone-800 font-medium w-fit group-hover:text-blue-600">
                                {violation.date}
                            </div>
                            <div className="w-full flex gap-2 group-hover:text-blue-600">
                                <span>
                                    {auth?.admin?.user
                                        ? violation.student_name
                                        : 'Anda'}{' '}
                                    telah melakukan pelanggaran kategori{' '}
                                    <span className={`font-medium`}>
                                        {violation.violation_category}
                                    </span>{' '}
                                    yaitu{' '}
                                    <span className="font-medium">
                                        {violation.violation_form}
                                    </span>{' '}
                                    dengan sanksi{' '}
                                    <span className="font-medium">
                                        {violation.sanction}
                                    </span>
                                </span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
