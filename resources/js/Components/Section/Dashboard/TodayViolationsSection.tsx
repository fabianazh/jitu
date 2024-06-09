import NotFoundCard from '@/Components/Card/NotFoundCard'
import HeadingContainer from '@/Components/Container/HeadingContainer'
import TableContainer from '@/Components/Container/TableContainer'
import DeleteModal from '@/Components/Modal/DeleteModal'
import Chip from '@/Components/Other/Chip'
import Dropdown from '@/Components/Other/Dropdown'
import { Link, useForm } from '@inertiajs/react'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegEye, FaRegTrashCan } from 'react-icons/fa6'
import { LuPenSquare } from 'react-icons/lu'

export default function TodayViolationsSection({
    todayViolations,
}: TodayViolationsSectionProps) {
    const {
        data,
        setData,
        reset,
        delete: destroy,
    } = useForm<{
        violation: Violation | null
    }>({ violation: null })

    const [confirmingViolationDeletion, setConfirmingViolationDeletion] =
        useState(false)

    function confirmViolationDeletion(violation: Violation) {
        setData({ violation })
        setConfirmingViolationDeletion(true)
    }

    function closeModal() {
        setConfirmingViolationDeletion(false)
        setData({ violation: null })
    }

    function deleteViolation(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.violation.destroy', {
                violation: data.violation,
            }),
            {
                onSuccess: () => closeModal(),
                onFinish: () => reset(),
            }
        )

        closeModal()
    }

    return (
        <section className="w-full h-fit pb-16">
            <div className="w-full h-full bg-[#fdfdfd] flex flex-col lg:gap-5 shadow rounded lg:rounded-lg py-3 p-0 lg:p-5">
                <HeadingContainer>
                    <HeadingContainer.Heading
                        title="Pelanggaran Terbaru"
                        desc={`${
                            todayViolations.length > 0
                                ? 'Ada ' +
                                  todayViolations.length +
                                  ' Pelanggaran hari ini.'
                                : 'Tidak ada pelanggaran hari ini.'
                        }`}
                    />
                </HeadingContainer>
                <TableContainer>
                    <TableContainer.Heading className="text-black justify-between items-center gap-4">
                        <th className="w-5 lg:w-8 text-center">No</th>
                        <th className="w-[19%] lg:w-[22%]">Nama Siswa</th>
                        <th className="w-[27%]">Bentuk Pelanggaran</th>
                        <th className="w-[14%] text-center hidden lg:block">
                            Kategori Pelanggaran
                        </th>
                        <th className="w-[25%] lg:w-[16%] lg:text-center">
                            Dilaporkan pada
                        </th>
                        <th className="w-[7%] text-center">Aksi</th>
                    </TableContainer.Heading>
                    <TableContainer.Content>
                        {todayViolations
                            .slice(0, 10)
                            .map((violation: Violation, index: number) => (
                                <tr
                                    key={violation.id}
                                    className="w-full h-auto flex justify-between py-3 border-b text-left text-black gap-4"
                                >
                                    <td className="w-5 lg:w-8 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="w-[19%] lg:w-[22%] truncate">
                                        {violation.student_name}
                                    </td>
                                    <td className="w-[27%] truncate">
                                        {violation.violation_form}
                                    </td>
                                    <td className="w-[14%] text-center hidden lg:block">
                                        <Chip
                                            category={
                                                violation.violation_category
                                            }
                                        >
                                            {violation.violation_category}
                                        </Chip>
                                    </td>
                                    <td className="w-[25%] lg:w-[16%] text-center truncate">
                                        {violation.created_at}
                                    </td>
                                    <td className="w-[7%] grid place-items-center whitespace-nowrap">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <BsThreeDotsVertical className="cursor-pointer" />
                                            </Dropdown.Trigger>

                                            <Dropdown.Content
                                                align="right"
                                                contentClasses="gap-0"
                                            >
                                                <Dropdown.Link
                                                    href={route(
                                                        'admin.dashboard.violations.show',
                                                        {
                                                            violation:
                                                                violation,
                                                        }
                                                    )}
                                                    className="flex gap-2 items-center"
                                                >
                                                    <FaRegEye /> Detail
                                                </Dropdown.Link>
                                                <div className="block w-11/12 mx-auto bg-stone-200 h-[1px]"></div>
                                                <button
                                                    onClick={() =>
                                                        confirmViolationDeletion(
                                                            violation
                                                        )
                                                    }
                                                    className="w-full rounded font-medium px-3 lg:px-4 py-2 text-start text-xs lg:text-sm leading-5 focus:outline-none focus:bg-red-100 transition-all duration-200 ease-in-out text-red-700 hover:bg-red-100 flex gap-2 items-center"
                                                >
                                                    <FaRegTrashCan />
                                                    Hapus
                                                </button>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        {todayViolations.length > 0 && (
                            <tr className="w-full h-auto flex justify-between py-3 border-b text-center text-black">
                                <td className="mx-auto block text-xs lg:text-sm">
                                    <Link
                                        href={route(
                                            'admin.dashboard.violations.index'
                                        )}
                                    >
                                        Lihat Semua
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </TableContainer.Content>
                </TableContainer>
                {todayViolations.length < 1 && (
                    <NotFoundCard
                        imageWidth="w-48 lg:w-60"
                        className="pb-5"
                        message="Belum ada pelanggaran hari ini."
                    />
                )}
                <DeleteModal
                    show={confirmingViolationDeletion}
                    onClose={closeModal}
                >
                    <DeleteModal.Title>
                        Apa kamu yakin ingin menghapus data pelanggaran{' '}
                        {data?.violation?.student_name} ?
                    </DeleteModal.Title>

                    <DeleteModal.Text>
                        Setelah data pelanggaran siswa dihapus, semua sumber
                        daya dan data pelanggaran siswa akan dihapus permanen.
                    </DeleteModal.Text>
                    <DeleteModal.Button
                        closeModal={closeModal}
                        onDelete={deleteViolation}
                    ></DeleteModal.Button>
                </DeleteModal>
            </div>
        </section>
    )
}
