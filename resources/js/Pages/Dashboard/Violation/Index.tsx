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
import Chip from '@/Components/Other/Chip'
import NotFoundCard from '@/Components/Card/NotFoundCard'
import AddButton from '@/Components/Button/AddButton'
import HeadingContainer from '@/Components/Container/HeadingContainer'

export default function Index({
    auth,
    violations,
    totalViolations,
    sort,
    direction,
    currentPage,
    perPage,
}: PageProps & ViolationsPageProps) {
    const {
        data,
        setData,
        reset,
        delete: destroy,
    } = useForm<{
        violation: Violation | null
    }>({
        violation: null,
    })

    const [confirmingViolationDeletion, setConfirmingViolationDeletion] =
        useState(false)
    const totalPages = Math.ceil(totalViolations / perPage)

    // if (currentPage !== 1 && violations.length === 0) {
    //     window.location.href = `/admin/dashboard/violations?page=${
    //         currentPage - 1
    //     }`
    // }

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
            route('admin.dashboard.violations.destroy', {
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
        <AuthenticatedLayout>
            <Head title="Data Pelanggaran Siswa" />
            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Data Pelanggaran Siswa">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Pelanggaran Siswa
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <AddButton
                            href={route('admin.dashboard.violations.create')}
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
                                                'admin.dashboard.violations.index',
                                                {
                                                    ...data,
                                                    perPage: 10,
                                                    page: 1,
                                                    sort: sort,
                                                    direction: direction,
                                                }
                                            )}
                                            active={perPage == 10}
                                        >
                                            10
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.violations.index',
                                                {
                                                    ...data,
                                                    perPage: 25,
                                                    page: 1,
                                                    sort: sort,
                                                    direction: direction,
                                                }
                                            )}
                                            active={perPage == 25}
                                        >
                                            25
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.violations.index',
                                                {
                                                    ...data,
                                                    perPage: 50,
                                                    page: 1,
                                                    sort: sort,
                                                    direction: direction,
                                                }
                                            )}
                                            active={perPage == 50}
                                        >
                                            50
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.violations.index',
                                                {
                                                    ...data,
                                                    perPage: 100,
                                                    page: 1,
                                                    sort: sort,
                                                    direction: direction,
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
                                                'admin.dashboard.violations.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: 'updated_at',
                                                    direction: 'desc',
                                                }
                                            )}
                                            active={
                                                sort === 'updated_at' &&
                                                direction === 'desc'
                                            }
                                        >
                                            Paling Baru
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.violations.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: 'updated_at',
                                                    direction: 'asc',
                                                }
                                            )}
                                            active={
                                                sort === 'updated_at' &&
                                                direction === 'asc'
                                            }
                                        >
                                            Paling Awal
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.violations.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: 'student_name',
                                                    direction: 'asc',
                                                }
                                            )}
                                            active={
                                                sort === 'student_name' &&
                                                direction === 'asc'
                                            }
                                        >
                                            Nama &nbsp;A-Z
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                'admin.dashboard.violations.index',
                                                {
                                                    ...data,
                                                    perPage: perPage,
                                                    page: currentPage,
                                                    sort: 'student_name',
                                                    direction: 'desc',
                                                }
                                            )}
                                            active={
                                                sort === 'student_name' &&
                                                direction === 'desc'
                                            }
                                        >
                                            Nama &nbsp;Z-A
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                                {/* <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="bg-transparent hover:bg-stone-100/80 focus:bg-stone-100/80 transition-all duration-300 border text-stone-500 flex items-center justify-center gap-1 p-2.5 rounded-lg h-10 w-fit cursor-pointer">
                                            <LuFilter />
                                             <span className="text-sm font-semibold block ml-1.5 text-stone-700">
                                               Filter
                                           </span>
                                           <LuChevronDown className="text-base" />
                                       </div>
                                   </Dropdown.Trigger>

                                   <Dropdown.Content align="right"></Dropdown.Content>
                               </Dropdown> */}
                            </HeadingContainer.Feature>
                        </HeadingContainer>
                        <TableContainer>
                            <TableContainer.Heading className="text-black justify-between">
                                <th className="w-5 lg:w-8 text-center">No</th>
                                <th className="w-[19%] truncate lg:overflow-clip">
                                    Nama Siswa
                                </th>
                                <th className="w-[10%] lg:w-[8%]">Kelas</th>
                                <th className="w-[27%] lg:w-[29%] truncate lg:overflow-clip">
                                    Bentuk Pelanggaran
                                </th>
                                <th className="hidden lg:block lg:w-[12%] text-center">
                                    Kategori Pelanggaran
                                </th>
                                <th className="w-[19%] lg:w-[11%] lg:text-center">
                                    Tanggal
                                </th>
                                <th className="w-[7%] text-center">Aksi</th>
                            </TableContainer.Heading>
                            <TableContainer.Content>
                                {violations.map(
                                    (violation: Violation, index: number) => (
                                        <tr
                                            key={violation.id}
                                            className="w-full h-auto flex justify-between py-3 border-b text-left text-black"
                                        >
                                            <td className="w-5 lg:w-8 text-center">
                                                {(currentPage - 1) * perPage +
                                                    index +
                                                    1}
                                            </td>
                                            <td className="w-[19%] truncate">
                                                {violation.student_name}
                                            </td>
                                            <td className="w-[10%] lg:w-[8%] truncate">
                                                {violation.student_class}
                                            </td>
                                            <td className="w-[27%] lg:w-[29%] truncate">
                                                {violation.violation_form}
                                            </td>
                                            <td className="hidden lg:block w-[12%] text-center">
                                                <Chip
                                                    category={
                                                        violation.violation_category
                                                    }
                                                >
                                                    {
                                                        violation.violation_category
                                                    }
                                                </Chip>
                                            </td>
                                            <td className="w-[19%] lg:w-[11%] text-center truncate">
                                                {violation.date}
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
                                                        {/* <Dropdown.Link
                                                            href={route(
                                                                'admin.dashboard.violations.edit',
                                                                {
                                                                    violation:
                                                                        violation,
                                                                }
                                                            )}
                                                            className="flex gap-2 items-center"
                                                        >
                                                            <LuPenSquare /> Edit
                                                        </Dropdown.Link> */}
                                                        <div className="block w-11/12 mx-auto bg-stone-200 h-[1px]"></div>
                                                        <button
                                                            onClick={() =>
                                                                confirmViolationDeletion(
                                                                    violation
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
                                )}
                            </TableContainer.Content>
                        </TableContainer>
                        {violations.length > 0 && (
                            <Pagination
                                totalPages={totalPages}
                                totalShowedData={violations.length}
                                totalData={totalViolations}
                                dataLabel="pelanggaran siswa"
                                queryString={`perPage=${perPage}&sort=${sort}&direction=${direction}`}
                                currentPage={currentPage}
                            />
                        )}
                        {violations.length < 1 && (
                            <NotFoundCard
                                imageWidth="w-60"
                                className="py-5"
                                message="Belum ada pelanggaran."
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
                                Setelah data pelanggaran siswa dihapus, semua
                                sumber daya dan data pelanggaran siswa akan
                                dihapus permanen.
                            </DeleteModal.Text>
                            <DeleteModal.Button
                                closeModal={closeModal}
                                onDelete={deleteViolation}
                            ></DeleteModal.Button>
                        </DeleteModal>
                    </div>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
