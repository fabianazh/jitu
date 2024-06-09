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
import { LuPenSquare } from 'react-icons/lu'
import Pagination from '@/Components/Other/Pagination'
import NotFoundCard from '@/Components/Card/NotFoundCard'
import AddButton from '@/Components/Button/AddButton'
import HeadingContainer from '@/Components/Container/HeadingContainer'

export default function Index({
    auth,
    sanctions,
    totalSanctions,
    totalFilteredSanctions,
    currentPage,
    perPage,
}: PageProps & SanctionsPageProps) {
    const {
        data,
        setData,
        reset,
        delete: destroy,
    } = useForm<{
        sanction: Sanction | null
    }>({ sanction: null })

    const [confirmingSanctionDeletion, setConfirmingSanctionDeletion] =
        useState(false)
    const totalPages = Math.ceil(totalSanctions / perPage)

    if (currentPage !== 1 && sanctions.length === 0) {
        window.location.href = `/admin/dashboard/sanction?page=${
            currentPage - 1
        }`
    }

    function confirmSanctionDeletion(sanction: Sanction) {
        setData({ sanction })
        setConfirmingSanctionDeletion(true)
    }

    function closeModal() {
        setConfirmingSanctionDeletion(false)
        setData({ sanction: null })
    }

    function deleteViolation(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.sanctions.destroy', {
                sanction: data.sanction,
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
            <Head title="Data Sanksi" />
            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Data Sanksi">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Sanksi
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        {auth?.admin?.user ? (
                            <AddButton
                                href={route('admin.dashboard.sanctions.create')}
                            />
                        ) : null}
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>
            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-fit pb-20 bg-transparent">
                    <div className="w-full h-fit py-3 lg:py-4 px-0 lg:px-5 bg-[#fefefe] shadow rounded-lg -z-10">
                        <HeadingContainer>
                            <HeadingContainer.Heading
                                title="Daftar Sanksi"
                                desc="Semua data sanksi"
                            />
                        </HeadingContainer>
                        <TableContainer>
                            <TableContainer.Heading className="text-black justify-between">
                                <th className="w-5 lg:w-8 text-center">No</th>
                                <th className="w-[30%] lg:w-[38%]">Sanksi</th>
                                <th className="w-[10%] lg:w-[7%]">
                                    Bobot Dari
                                </th>
                                <th className="w-[13%] lg:w-[8%]">
                                    Bobot Sampai
                                </th>
                                <th className="w-[23%]">Kriteria</th>
                                <th className="w-[7%] text-center">Aksi</th>
                            </TableContainer.Heading>
                            <TableContainer.Content>
                                {sanctions.map(
                                    (sanction: Sanction, index: number) => (
                                        <tr
                                            key={sanction.id}
                                            className="w-full h-auto flex justify-between py-3 border-b text-left text-black"
                                        >
                                            <td className="w-5 lg:w-8 text-center">
                                                {(currentPage - 1) * 10 +
                                                    index +
                                                    1}
                                            </td>
                                            <td className="w-[30%] lg:w-[38%] truncate">
                                                {sanction.sanction}
                                            </td>
                                            <td className="w-[10%] lg:w-[7%] truncate">
                                                {sanction.weight_from} Poin
                                            </td>
                                            <td className="w-[13%] lg:w-[8%] truncate ">
                                                {sanction.weight_to} Poin
                                            </td>
                                            <td className="w-[23%] truncate">
                                                {sanction.criteria}
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
                                                                          'admin.dashboard.sanctions.show',
                                                                          {
                                                                              sanction:
                                                                                  sanction,
                                                                          }
                                                                      )
                                                                    : route(
                                                                          'student.dashboard.sanctions.show',
                                                                          {
                                                                              sanction:
                                                                                  sanction,
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
                                                                        'admin.dashboard.sanctions.edit',
                                                                        {
                                                                            sanction:
                                                                                sanction,
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
                                                                        confirmSanctionDeletion(
                                                                            sanction
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
                        {sanctions.length > 0 && (
                            <Pagination
                                totalPages={totalPages}
                                totalShowedData={sanctions.length}
                                totalData={totalSanctions}
                                dataLabel="sanksi"
                                currentPage={currentPage}
                            />
                        )}
                        {sanctions.length < 1 && (
                            <NotFoundCard
                                imageWidth="w-60"
                                className="py-5"
                                message="Belum ada data sanksi."
                            />
                        )}
                        <DeleteModal
                            show={confirmingSanctionDeletion}
                            onClose={closeModal}
                        >
                            <DeleteModal.Title>
                                Apa kamu yakin ingin menghapus data sanksi{' '}
                                {data?.sanction?.sanction} ?
                            </DeleteModal.Title>

                            <DeleteModal.Text>
                                Setelah data sanksi dihapus, semua sumber daya
                                dan data sanksi akan dihapus permanen.
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
