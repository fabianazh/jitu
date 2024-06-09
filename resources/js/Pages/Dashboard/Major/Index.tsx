import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegEye, FaRegTrashCan } from 'react-icons/fa6'
import TableContainer from '@/Components/Container/TableContainer'
import Dropdown from '@/Components/Other/Dropdown'
import DeleteModal from '@/Components/Modal/DeleteModal'
import { useForm } from '@inertiajs/react'
import { LuPenSquare } from 'react-icons/lu'
import Pagination from '@/Components/Other/Pagination'
import NotFoundCard from '@/Components/Card/NotFoundCard'
import AddButton from '@/Components/Button/AddButton'
import HeadingContainer from '@/Components/Container/HeadingContainer'

export default function Index({
    auth,
    majors,
    totalMajors,
    currentPage,
    perPage,
}: PageProps & MajorsPageProps) {
    const {
        data,
        setData,
        reset,
        delete: destroy,
        processing,
    } = useForm<{
        major: Major | null
    }>({ major: null })

    const [confirmingMajorDeletion, setConfirmingMajorDeletion] =
        useState(false)
    const totalPages = Math.ceil(totalMajors / perPage)

    if (currentPage !== 1 && majors?.length === 0) {
        window.location.href = `/admin/dashboard/majors?page=${currentPage - 1}`
    }

    function confirmMajorDeletion(major: Major) {
        setData({ major })
        setConfirmingMajorDeletion(true)
    }

    function closeModal() {
        setConfirmingMajorDeletion(false)
        setData({ major: null })
    }

    function deleteMajor(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.majors.destroy', {
                major: data.major,
            }),
            {
                onSuccess: () => closeModal(),
                onFinish: () => reset(),
            }
        )

        closeModal()
    }

    return (
        <AuthenticatedLayout>
            <Head title="Data Jurusan" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Data Jurusan">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Jurusan
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <AddButton
                            href={route('admin.dashboard.majors.create')}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-fit pb-20 bg-transparent">
                    <div className="w-full h-fit py-3 lg:py-4 px-0 lg:px-5 bg-[#fefefe] shadow rounded-lg -z-10">
                        <HeadingContainer>
                            <HeadingContainer.Heading
                                title="Daftar Jurusan"
                                desc="Semua data jurusan"
                            />
                        </HeadingContainer>
                        <TableContainer>
                            <TableContainer.Heading className="text-black justify-between gap-4 lg:gap-0">
                                <th className="w-8 text-center">No</th>
                                <th className="w-1/2 lg:w-4/12">
                                    Nama Jurusan
                                </th>
                                <th className="w-24 lg:w-40">
                                    Singkatan Jurusan
                                </th>
                                <th className="w-20 hidden lg:block">
                                    Jumlah Kelas
                                </th>
                                <th className="w-5/12 lg:w-2/12">
                                    Ketua Program Keahlian
                                </th>
                                <th className="w-[7%] text-center">Aksi</th>
                            </TableContainer.Heading>
                            <TableContainer.Content>
                                {majors?.map((major: Major, index: number) => {
                                    return (
                                        <tr
                                            key={major.id}
                                            className="w-full h-auto flex justify-between py-3 border-b text-left text-black gap-4 lg:gap-0"
                                        >
                                            <td className="w-8 text-center">
                                                {(currentPage - 1) * 10 +
                                                    index +
                                                    1}
                                            </td>
                                            <td className="w-1/2 lg:w-4/12 truncate">
                                                {major.name}
                                            </td>
                                            <td className="w-24 lg:w-40">
                                                {major.abbreviation}
                                            </td>
                                            <td className="w-20 hidden lg:block">
                                                {major.total_classes} Kelas
                                            </td>
                                            <td className="w-5/12 lg:w-2/12 truncate">
                                                {major.head_of_program}
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
                                                                'admin.dashboard.majors.show',
                                                                {
                                                                    major: major,
                                                                }
                                                            )}
                                                            className="flex gap-2 items-center"
                                                        >
                                                            <FaRegEye /> Detail
                                                        </Dropdown.Link>
                                                        <Dropdown.Link
                                                            href={route(
                                                                'admin.dashboard.majors.edit',
                                                                {
                                                                    major: major,
                                                                }
                                                            )}
                                                            className="flex gap-2 items-center"
                                                        >
                                                            <LuPenSquare /> Edit
                                                        </Dropdown.Link>
                                                        <div className="block w-11/12 mx-auto bg-stone-200 h-[1px]"></div>
                                                        <button
                                                            onClick={() =>
                                                                confirmMajorDeletion(
                                                                    major
                                                                )
                                                            }
                                                            className="w-full rounded font-medium px-3 lg:px-4 py-2 text-start text-xs lg:text-sm leading-5 focus:outline-none focus:bg-red-100 transition-all duration-200 ease-in-out text-red-700 hover:bg-red-100 flex gap-2 items-center"
                                                        >
                                                            <FaRegTrashCan />{' '}
                                                            Hapus
                                                        </button>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </TableContainer.Content>
                        </TableContainer>
                        {majors.length > 1 && (
                            <Pagination
                                totalPages={totalPages}
                                totalShowedData={majors?.length || 0}
                                totalData={totalMajors}
                                dataLabel="jurusan"
                                currentPage={currentPage}
                            />
                        )}
                        {majors.length < 1 && (
                            <NotFoundCard
                                imageWidth="w-60"
                                className="py-5"
                                message="Belum ada data jurusan."
                            />
                        )}
                        <DeleteModal
                            show={confirmingMajorDeletion}
                            onClose={closeModal}
                        >
                            <DeleteModal.Title>
                                Apa kamu yakin ingin menghapus data jurusan{' '}
                                {data?.major?.name} ?
                            </DeleteModal.Title>

                            <DeleteModal.Text>
                                Setelah data jurusan dihapus, semua sumber daya
                                dan data jurusan akan dihapus permanen.
                            </DeleteModal.Text>
                            <DeleteModal.Button
                                closeModal={closeModal}
                                onDelete={deleteMajor}
                                disabled={processing}
                            ></DeleteModal.Button>
                        </DeleteModal>
                    </div>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
