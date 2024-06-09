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
    classes,
    totalClasses,
    currentPage,
    perPage,
}: PageProps & ClassesPageProps) {
    const {
        data,
        setData,
        delete: destroy,
        processing,
    } = useForm<{
        grade: Class | null
        password: string
    }>({
        grade: null,
        password: '',
    })

    const [confirmingClassDeletion, setConfirmingClassDeletion] =
        useState(false)

    const totalPages = Math.ceil(totalClasses / perPage)

    if (currentPage !== 1 && classes?.length === 0) {
        window.location.href = `/admin/dashboard/classes?page=${
            currentPage - 1
        }`
    }

    function confirmClassDeletion(grade: Class) {
        setData((prevData) => ({ ...prevData, grade }))
        setConfirmingClassDeletion(true)
    }

    function closeModal() {
        setConfirmingClassDeletion(false)
        setData((prevData) => ({ ...prevData, grade: null }))
    }

    function deleteClass(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.classes.destroy', {
                class: data.grade,
            }),
            {
                onSuccess: () => closeModal(),
            }
        )

        closeModal()
    }

    return (
        <AuthenticatedLayout>
            <Head title="Data Kelas" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Data Kelas">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Kelas
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <AddButton
                            href={route('admin.dashboard.classes.create')}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-fit pb-20 bg-transparent">
                    <div className="w-full h-fit py-3 lg:py-4 px-0 lg:px-5 bg-[#fefefe] shadow rounded-lg -z-10">
                        <HeadingContainer>
                            <HeadingContainer.Heading
                                title="Daftar Kelas"
                                desc="Semua data kelas"
                            />
                        </HeadingContainer>
                        <TableContainer>
                            <TableContainer.Heading className="text-black gap-8 justify-between">
                                <th className="w-5 lg:w-8 text-center">No</th>
                                <th className="w-4/12">Nama Kelas</th>
                                <th className="w-8/12 lg:w-[45%]">Jurusan</th>
                                <th className="w-5/12 lg:w-3/12">Wali Kelas</th>
                                <th className="w-2/12 hidden lg:block">
                                    Jumlah Siswa
                                </th>
                                <th className="w-[7%] text-center">Aksi</th>
                            </TableContainer.Heading>
                            <TableContainer.Content>
                                {classes?.map((item: Class, index: number) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className="w-full h-auto flex justify-between py-3 border-b text-left text-black gap-8"
                                        >
                                            <td className="w-5 lg:w-8 text-center">
                                                {(currentPage - 1) * 10 +
                                                    index +
                                                    1}
                                            </td>
                                            <td className="w-4/12 truncate">
                                                {item.class_name}
                                            </td>
                                            <td className="w-8/12 lg:w-[45%] truncate">
                                                {item.major}
                                            </td>
                                            <td className="w-5/12 lg:w-3/12 truncate">
                                                {item.homeroom_teacher}
                                            </td>
                                            <td className="w-2/12 hidden lg:block">
                                                {item.total_students} Siswa
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
                                                                'admin.dashboard.classes.show',
                                                                {
                                                                    class: item,
                                                                }
                                                            )}
                                                            className="flex gap-2 items-center"
                                                        >
                                                            <FaRegEye /> Detail
                                                        </Dropdown.Link>
                                                        <Dropdown.Link
                                                            href={route(
                                                                'admin.dashboard.classes.edit',
                                                                {
                                                                    class: item,
                                                                }
                                                            )}
                                                            className="flex gap-2 items-center"
                                                        >
                                                            <LuPenSquare /> Edit
                                                        </Dropdown.Link>
                                                        <div className="block w-11/12 mx-auto bg-stone-200 h-[1px]"></div>
                                                        <button
                                                            onClick={() =>
                                                                confirmClassDeletion(
                                                                    item
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
                        {classes.length > 0 && (
                            <Pagination
                                totalPages={totalPages}
                                totalShowedData={classes?.length || 0}
                                totalData={totalClasses}
                                dataLabel="kelas"
                                currentPage={currentPage}
                            />
                        )}
                        {classes.length < 1 && (
                            <NotFoundCard
                                imageWidth="w-60"
                                className="py-5"
                                message="Belum ada data kelas."
                            />
                        )}
                        <DeleteModal
                            show={confirmingClassDeletion}
                            onClose={closeModal}
                        >
                            <DeleteModal.Title>
                                Apa kamu yakin ingin menghapus data kelas{' '}
                                {data?.grade?.class_name} ?
                            </DeleteModal.Title>

                            <DeleteModal.Text>
                                Setelah data kelas dihapus, semua sumber daya
                                dan data kelas akan dihapus permanen.
                            </DeleteModal.Text>
                            <DeleteModal.Button
                                closeModal={closeModal}
                                onDelete={deleteClass}
                                disabled={processing}
                            ></DeleteModal.Button>
                        </DeleteModal>
                    </div>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
