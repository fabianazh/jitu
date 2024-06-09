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
import { LuChevronDown, LuPenSquare } from 'react-icons/lu'
import Pagination from '@/Components/Other/Pagination'
import Chip from '@/Components/Other/Chip'
import NotFoundCard from '@/Components/Card/NotFoundCard'
import AddButton from '@/Components/Button/AddButton'
import HeadingContainer from '@/Components/Container/HeadingContainer'

export default function Index({
    auth,
    violationForms,
    totalViolationForms,
    currentPage,
    perPage,
}: PageProps & ViolationFormsPageProps) {
    const {
        data,
        setData,
        reset,
        delete: destroy,
    } = useForm<{
        violationForm: ViolationForm | null
    }>({ violationForm: null })

    const [
        confirmingViolationFormDeletion,
        setConfirmingViolationFormDeletion,
    ] = useState(false)

    const totalPages = Math.ceil(totalViolationForms / perPage)

    // if (currentPage !== 1 && violationForms.length === 0) {
    //     window.location.href = `/admin/dashboard/forms-of-violation?perPage=${perPage}&page=${
    //         currentPage - 1
    //     }`
    // }

    function confirmViolationFormDeletion(violationForm: ViolationForm) {
        setData({ violationForm })
        setConfirmingViolationFormDeletion(true)
    }

    function closeModal() {
        setConfirmingViolationFormDeletion(false)
        setData({ violationForm: null })
    }

    function deleteViolation(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.forms_of_violation.destroy', {
                violationForm: data.violationForm,
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
            <Head title="Data Bentuk Pelanggaran" />
            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Data Bentuk Pelanggaran">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Bentuk Pelanggaran
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        {auth?.admin?.user ? (
                            <AddButton
                                href={route(
                                    'admin.dashboard.forms_of_violation.create'
                                )}
                            />
                        ) : null}
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>
            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-fit pb-20 bg-transparent">
                    <div className="w-full h-fit py-3 lg:py-4 px-0 lg:px-5 bg-[#fefefe] shadow lg:rounded-lg -z-10">
                        <HeadingContainer>
                            <HeadingContainer.Heading
                                title="Daftar Bentuk Pelanggaran"
                                desc="Semua data bentuk pelanggaran"
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
                                                auth?.admin?.user
                                                    ? 'admin.dashboard.forms_of_violation.index'
                                                    : 'student.dashboard.forms_of_violation.index',
                                                {
                                                    ...data,
                                                    perPage: 10,
                                                    page: 1,
                                                }
                                            )}
                                            active={perPage == 10}
                                        >
                                            10
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                auth?.admin?.user
                                                    ? 'admin.dashboard.forms_of_violation.index'
                                                    : 'student.dashboard.forms_of_violation.index',
                                                {
                                                    ...data,
                                                    perPage: 25,
                                                    page: 1,
                                                }
                                            )}
                                            active={perPage == 25}
                                        >
                                            25
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                auth?.admin?.user
                                                    ? 'admin.dashboard.forms_of_violation.index'
                                                    : 'student.dashboard.forms_of_violation.index',
                                                {
                                                    ...data,
                                                    perPage: 50,
                                                    page: 1,
                                                }
                                            )}
                                            active={perPage == 50}
                                        >
                                            50
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                auth?.admin?.user
                                                    ? 'admin.dashboard.forms_of_violation.index'
                                                    : 'student.dashboard.forms_of_violation.index',
                                                {
                                                    ...data,
                                                    perPage: 100,
                                                    page: 1,
                                                }
                                            )}
                                            active={perPage == 100}
                                        >
                                            100
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </HeadingContainer.Feature>
                        </HeadingContainer>
                        <TableContainer>
                            <TableContainer.Heading className="text-black gap-2 lg:gap-4 justify-between">
                                <th className="w-5 lg:w-8 text-center">No</th>
                                <th className="w-4/12 lg:w-5/12 truncate lg:overflow-clip">
                                    Bentuk Pelanggaran
                                </th>
                                <th className="w-[10%] lg:w-[12%] text-center">
                                    Bobot
                                </th>
                                {auth?.admin?.user && (
                                    <th className="w-[13%] text-center hidden lg:block">
                                        Total Pelanggaran
                                    </th>
                                )}
                                <th className="w-[18%] lg:w-[15%] text-center">
                                    Kategori Pelanggaran
                                </th>
                                <th className="w-[7%] text-center">Aksi</th>
                            </TableContainer.Heading>
                            <TableContainer.Content>
                                {violationForms.map(
                                    (
                                        violationForm: ViolationForm,
                                        index: number
                                    ) => (
                                        <tr
                                            key={violationForm.id}
                                            className="w-full h-auto flex justify-between py-3 border-b text-left text-black gap-2 lg:gap-4"
                                        >
                                            <td className="w-5 lg:w-8 text-center">
                                                {(currentPage - 1) * 10 +
                                                    index +
                                                    1}
                                            </td>
                                            <td className="w-4/12 lg:w-5/12 truncate">
                                                {violationForm.description}
                                            </td>
                                            <td className="w-[10%] lg:w-[12%] truncate text-center">
                                                {violationForm.weight} Poin
                                            </td>
                                            {auth?.admin?.user && (
                                                <td className="w-[13%] text-center hidden lg:block">
                                                    {
                                                        violationForm.totalViolations
                                                    }{' '}
                                                    Pelangaran
                                                </td>
                                            )}

                                            <td className="w-[18%] lg:w-[15%] truncate text-center flex justify-center">
                                                <Chip
                                                    category={
                                                        violationForm.violation_category
                                                    }
                                                >
                                                    {
                                                        violationForm.violation_category
                                                    }
                                                </Chip>
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
                                                            href={
                                                                auth?.admin
                                                                    ?.user
                                                                    ? route(
                                                                          'admin.dashboard.forms_of_violation.show',
                                                                          {
                                                                              violationForm:
                                                                                  violationForm,
                                                                          }
                                                                      )
                                                                    : route(
                                                                          'student.dashboard.forms_of_violation.show',
                                                                          {
                                                                              violationForm:
                                                                                  violationForm,
                                                                          }
                                                                      )
                                                            }
                                                            className="flex gap-2 items-center"
                                                        >
                                                            <FaRegEye /> Detail
                                                        </Dropdown.Link>
                                                        {auth?.admin?.user && (
                                                            <>
                                                                <Dropdown.Link
                                                                    href={route(
                                                                        'admin.dashboard.forms_of_violation.edit',
                                                                        {
                                                                            violationForm:
                                                                                violationForm,
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
                                                                        confirmViolationFormDeletion(
                                                                            violationForm
                                                                        )
                                                                    }
                                                                    className="w-full rounded font-medium px-3 lg:px-4 py-2 text-start text-xs lg:text-sm leading-5 focus:outline-none focus:bg-red-100 transition-all duration-200 ease-in-out text-red-700 hover:bg-red-100 flex gap-2 items-center"
                                                                >
                                                                    <FaRegTrashCan />{' '}
                                                                    Hapus
                                                                </button>
                                                            </>
                                                        )}
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </TableContainer.Content>
                        </TableContainer>
                        {violationForms.length > 0 ? (
                            <Pagination
                                totalPages={totalPages}
                                totalShowedData={violationForms.length}
                                totalData={totalViolationForms}
                                dataLabel="bentuk pelanggaran"
                                currentPage={currentPage}
                            />
                        ) : null}
                        {violationForms.length < 1 && (
                            <NotFoundCard
                                imageWidth="w-60"
                                className="py-5"
                                message="Belum ada data bentuk pelanggaran."
                            />
                        )}
                        <DeleteModal
                            show={confirmingViolationFormDeletion}
                            onClose={closeModal}
                        >
                            <DeleteModal.Title>
                                Apa kamu yakin ingin menghapus data bentuk
                                pelanggaran "{data?.violationForm?.description}"
                                ?
                            </DeleteModal.Title>

                            <DeleteModal.Text>
                                Setelah data bentuk pelanggaran siswa dihapus,
                                semua sumber daya dan data bentuk pelanggaran
                                siswa akan dihapus permanen.
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
