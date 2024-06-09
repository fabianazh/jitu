import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegEye, FaRegTrashCan } from 'react-icons/fa6'
import TableContainer from '@/Components/Container/TableContainer'
import Dropdown from '@/Components/Other/Dropdown'
import DeleteModal from '@/Components/Modal/DeleteModal'
import { useForm } from '@inertiajs/react'
import {
    LuChevronDown,
    LuFilter,
    LuPenSquare,
    LuSlidersHorizontal,
} from 'react-icons/lu'
import Pagination from '@/Components/Other/Pagination'
import NotFoundCard from '@/Components/Card/NotFoundCard'
import AddButton from '@/Components/Button/AddButton'
import HeadingContainer from '@/Components/Container/HeadingContainer'

export default function Index({
    auth,
    students,
    totalStudents,
    sort,
    direction,
    currentPage,
    perPage,
    filter,
}: PageProps & StudentsPageProps) {
    const {
        data,
        setData,
        reset,
        get,
        delete: destroy,
    } = useForm<{
        student: Student | null
    }>({
        student: null,
    })

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const totalPages = Math.ceil(totalStudents / perPage)

    // if (currentPage !== 1 && students.length === 0) {
    //     window.location.href = `/admin/dashboard/students?perPage=${perPage}&sort=${sort}&direction=${direction}&filter=${filter}&page=${
    //         currentPage - 1
    //     }`
    // }

    function confirmUserDeletion(student: Student) {
        setData({ student })
        setConfirmingUserDeletion(true)
    }

    function closeModal() {
        setConfirmingUserDeletion(false)
        setData({ student: null })
    }

    function deleteStudent(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.students.destroy', {
                student: data.student,
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
            <Head title="Data Siswa" />
            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Data Siswa">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route('admin.dashboard.students.index')}
                                active={true}
                            >
                                Siswa
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <AddButton
                            href={route('admin.dashboard.students.create')}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>
            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-fit pb-20 bg-transparent">
                    <div className="w-full h-fit py-3 lg:py-4 px-0 lg:px-5 bg-[#fefefe] shadow lg:rounded-lg -z-10">
                        <HeadingContainer>
                            <HeadingContainer.Heading
                                title="Daftar Pelanggaran Siswa"
                                desc="Semua data pelanggaran siswa"
                            />
                            <HeadingContainer.Feature>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="bg-transparent hover:bg-stone-100/80 focus:bg-stone-100/80 transition-all duration-300 border text-stone-500 flex items-center justify-center gap-1 p-1.5 lg:p-2.5 rounded-md lg:rounded-lg aspect-square lg:aspect-auto h-8 lg:h-10 w-fit cursor-pointer">
                                            {/* <LuSlidersHorizontal className="text-xs lg:text-base" /> */}
                                            <span className="text-xs md:text-sm font-semibold block ml-0.5 md:ml-1.5 text-stone-500 md:text-stone-700">
                                                {perPage}
                                            </span>
                                            <LuChevronDown className="hidden lg:block text-base" />
                                        </div>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right">
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: 10,
                                                    page: 1,
                                                    sort: sort,
                                                    direction: direction,
                                                    filter: filter,
                                                }
                                            )}
                                            active={perPage == 10}
                                        >
                                            10
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: 25,
                                                    page: 1,
                                                    sort: sort,
                                                    direction: direction,
                                                    filter: filter,
                                                }
                                            )}
                                            active={perPage == 25}
                                        >
                                            25
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: 50,
                                                    page: 1,
                                                    sort: sort,
                                                    direction: direction,
                                                    filter: filter,
                                                }
                                            )}
                                            active={perPage == 50}
                                        >
                                            50
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: 100,
                                                    page: 1,
                                                    sort: sort,
                                                    direction: direction,
                                                    filter: filter,
                                                }
                                            )}
                                            active={perPage == 100}
                                        >
                                            100
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="bg-transparent hover:bg-stone-100/80 focus:bg-stone-100/80 transition-all duration-300 border text-stone-500 flex items-center justify-center gap-1 p-1.5 lg:p-2.5 rounded-md lg:rounded-lg aspect-square lg:aspect-auto h-8 lg:h-10 w-fit cursor-pointer">
                                            <LuSlidersHorizontal className="text-xs lg:text-base" />
                                            <span className="hidden text-sm font-semibold lg:block ml-0.5 lg:ml-1.5 text-stone-700">
                                                Sort by
                                            </span>
                                            <LuChevronDown className="hidden lg:block text-base" />
                                        </div>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right">
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: 'name',
                                                    direction: 'asc',
                                                    filter: filter,
                                                }
                                            )}
                                            active={
                                                sort === 'name' &&
                                                direction === 'asc'
                                            }
                                        >
                                            Nama &nbsp;A-Z
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: 'name',
                                                    direction: 'desc',
                                                    filter: filter,
                                                }
                                            )}
                                            active={
                                                sort === 'name' &&
                                                direction === 'desc'
                                            }
                                        >
                                            Nama &nbsp;Z-A
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: 'points',
                                                    direction: 'asc',
                                                    filter: filter,
                                                }
                                            )}
                                            active={
                                                sort === 'points' &&
                                                direction === 'asc'
                                            }
                                        >
                                            Poin Terendah
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: 'points',
                                                    direction: 'desc',
                                                    filter: filter,
                                                }
                                            )}
                                            active={
                                                sort === 'points' &&
                                                direction === 'desc'
                                            }
                                        >
                                            Poin Tertinggi
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="bg-transparent hover:bg-stone-100/80 focus:bg-stone-100/80 transition-all duration-300 border text-stone-500 flex items-center justify-center gap-1 p-1.5 lg:p-2.5 rounded-md lg:rounded-lg aspect-square lg:aspect-auto h-8 lg:h-10 w-fit cursor-pointer">
                                            <LuFilter className="text-xs lg:text-base" />
                                            <span className="hidden text-sm font-semibold lg:block ml-1.5 text-stone-700">
                                                Filter
                                            </span>
                                            <LuChevronDown className="hidden lg:block text-base" />
                                        </div>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right">
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: sort,
                                                    direction: direction,
                                                    filter: 'all',
                                                }
                                            )}
                                            active={filter === 'all'}
                                        >
                                            Semua
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: sort,
                                                    direction: direction,
                                                    filter: 'Aktif',
                                                }
                                            )}
                                            active={filter === 'Aktif'}
                                        >
                                            Aktif
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: sort,
                                                    direction: direction,
                                                    filter: 'Lulus',
                                                }
                                            )}
                                            active={filter === 'Lulus'}
                                        >
                                            Lulus
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.students.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: sort,
                                                    direction: direction,
                                                    filter: 'Dropout',
                                                }
                                            )}
                                            active={filter === 'Dropout'}
                                        >
                                            Dropout
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </HeadingContainer.Feature>
                        </HeadingContainer>
                        <TableContainer>
                            <TableContainer.Heading className="text-black justify-between">
                                <th className="w-5 lg:w-10 text-center">No</th>
                                <th className="w-3/12">Nama</th>
                                <th className="w-3/12 lg:w-2/12">NIS</th>
                                <th className="w-12 lg:w-20">Kelas</th>
                                <th className="w-[14%] hidden lg:block">
                                    Jenis Kelamin
                                </th>
                                <th className="w-[10%] lg:w-[7%]">Poin</th>
                                <th className="w-[7%] text-center">Aksi</th>
                            </TableContainer.Heading>
                            <TableContainer.Content>
                                {students.map(
                                    (student: Student, index: number) => {
                                        return (
                                            <tr
                                                key={student.nis}
                                                className="w-full h-auto flex justify-between py-3 border-b text-left text-black"
                                            >
                                                <td className="w-5 lg:w-10 text-center">
                                                    {(currentPage - 1) *
                                                        perPage +
                                                        index +
                                                        1}
                                                </td>
                                                <td className="truncate w-3/12">
                                                    {student.name}
                                                </td>
                                                <td className="w-3/12 lg:w-2/12">
                                                    {student.nis}
                                                </td>
                                                <td className="w-12 lg:w-20">
                                                    {student.class_name}
                                                </td>
                                                <td className="w-[14%] hidden lg:block">
                                                    {student.gender}
                                                </td>
                                                <td className="w-[10%] lg:w-[7%]">
                                                    {student.points ?? 0} Poin
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
                                                                    'admin.dashboard.students.show',
                                                                    {
                                                                        student:
                                                                            student,
                                                                    }
                                                                )}
                                                                className="flex gap-2 items-center"
                                                            >
                                                                <FaRegEye />{' '}
                                                                Detail
                                                            </Dropdown.Link>
                                                            <Dropdown.Link
                                                                href={route(
                                                                    'admin.dashboard.students.edit',
                                                                    {
                                                                        student:
                                                                            student,
                                                                    }
                                                                )}
                                                                className="flex gap-2 items-center"
                                                            >
                                                                <LuPenSquare />{' '}
                                                                Edit
                                                            </Dropdown.Link>
                                                            <div className="block w-11/12 mx-auto bg-stone-200 h-[1px]"></div>
                                                            <button
                                                                onClick={() =>
                                                                    confirmUserDeletion(
                                                                        student
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
                                    }
                                )}
                            </TableContainer.Content>
                        </TableContainer>
                        {students.length > 0 && (
                            <Pagination
                                totalPages={totalPages}
                                totalShowedData={students.length}
                                totalData={totalStudents}
                                dataLabel="siswa"
                                queryString={`perPage=${perPage}&sort=${sort}&direction=${direction}&filter=${filter}`}
                                currentPage={currentPage}
                            />
                        )}
                        {students.length < 1 && (
                            <NotFoundCard
                                imageWidth="w-60"
                                className="py-5"
                                message="Belum ada data siswa."
                            />
                        )}
                        <DeleteModal
                            show={confirmingUserDeletion}
                            onClose={closeModal}
                        >
                            <DeleteModal.Title>
                                Apa kamu yakin ingin menghapus data{' '}
                                {data?.student?.name} ?
                            </DeleteModal.Title>

                            <DeleteModal.Text>
                                Setelah data siswa dihapus, semua sumber daya
                                dan data siswa akan dihapus permanen.
                            </DeleteModal.Text>
                            <DeleteModal.Button
                                closeModal={closeModal}
                                onDelete={deleteStudent}
                            ></DeleteModal.Button>
                        </DeleteModal>
                    </div>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
