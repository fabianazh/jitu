import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import TextareaInput from '@/Components/Form/TextareaInput'
import FormContainer from '@/Components/Container/FormContainer'
import TabsContainer from '@/Components/Other/Tabs'
import DeleteModal from '@/Components/Modal/DeleteModal'
import RedirectButton from '@/Components/Button/RedirectButton'
import DeleteButton from '@/Components/Button/DeleteButton'
import BackButton from '@/Components/Button/BackButton'

export default function Detail({
    auth,
    violation,
}: PageProps & DetailViolationPageProps) {
    const { delete: destroy, processing } = useForm()

    const [confirmingViolationDeletion, setConfirmingViolationDeletion] =
        useState(false)

    function confirmViolationDeletion() {
        setConfirmingViolationDeletion(true)
    }

    function closeModal() {
        setConfirmingViolationDeletion(false)
    }

    function deleteViolation(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.violations.destroy', {
                violation: violation,
            }),
            {
                onSuccess: () => {
                    closeModal()
                },
            }
        )
    }

    return (
        <AuthenticatedLayout>
            <Head title={`Detail Pelanggaran oleh ${violation.student_name}`} />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title
                        title={`Detail Pelanggaran oleh ${violation.student_name}`}
                    >
                        <Breadcumb>
                            <Breadcumb.Item
                                href={
                                    auth?.admin?.user?.id
                                        ? route('admin.dashboard.index')
                                        : route('student.dashboard.index')
                                }
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={
                                    auth?.admin?.user?.id
                                        ? route(
                                              'admin.dashboard.violations.index'
                                          )
                                        : route(
                                              'student.dashboard.violations.index'
                                          )
                                }
                            >
                                Pelanggaran Siswa
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Detail
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={
                                auth?.admin?.user?.id
                                    ? route('admin.dashboard.violations.index')
                                    : route(
                                          'student.dashboard.violations.index'
                                      )
                            }
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-auto flex gap-5 mb-24">
                    <FormContainer>
                        <FormContainer.Heading
                            heading={`Informasi Pelanggaran oleh ${violation.student_name}`}
                            desc="Lihat informasi lengkap tentang pelanggaran ini."
                        />

                        <FormContainer.Content>
                            <TabsContainer>
                                <TabsContainer.Tab label="Biodata siswa">
                                    <FormContainer.Input label="Foto">
                                        <div className="w-30 lg:w-36 h-fit aspect-square rounded-xl overflow-hidden shadow border outline-2 p-1.5">
                                            <img
                                                src={`/storage/${violation.student_photo}`}
                                                alt={violation.student_name}
                                                className="w-full h-auto aspect-square rounded-lg shadow-sm border"
                                                draggable={false}
                                            />
                                        </div>
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="nis"
                                        label="NIS"
                                    >
                                        <TextInput
                                            id="nis"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={violation.student_nis}
                                            readOnly
                                        />
                                    </FormContainer.Input>

                                    <FormContainer.Input
                                        htmlFor="student_name"
                                        label="Nama Siswa"
                                    >
                                        <TextInput
                                            id="student_name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.student_name}
                                            readOnly
                                            autoComplete="off"
                                        />
                                    </FormContainer.Input>

                                    <FormContainer.Input
                                        htmlFor="student_gender"
                                        label="Jenis Kelamin Siswa"
                                    >
                                        <TextInput
                                            id="student_gender"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.student_gender}
                                            readOnly
                                            autoComplete="off"
                                        />
                                    </FormContainer.Input>

                                    <FormContainer.Input
                                        htmlFor="status"
                                        label="Status Siswa"
                                    >
                                        <TextInput
                                            id="status"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.student_status}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="class_name"
                                        label="Kelas"
                                    >
                                        <TextInput
                                            id="class_name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.student_class}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="student_points"
                                        label="Poin Saat Ini"
                                    >
                                        <TextInput
                                            id="student_points"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={`${violation.student_points} Poin`}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                </TabsContainer.Tab>
                                <TabsContainer.Tab label="Pelanggaran dan Sanksi">
                                    <FormContainer.Input
                                        htmlFor="violation_category"
                                        label="Kategori Bentuk Pelanggaran"
                                    >
                                        <TextInput
                                            id="violation_category"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.violation_category}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="violation_form"
                                        label="Bentuk Pelanggaran"
                                    >
                                        <TextInput
                                            id="violation_form"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.violation_form}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="sanction"
                                        label="Sanksi"
                                    >
                                        <TextInput
                                            id="sanction"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.sanction}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="weight"
                                        label="Total Penambahan Poin"
                                    >
                                        <TextInput
                                            id="weight"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={`${violation.weight} Poin`}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                </TabsContainer.Tab>
                                <TabsContainer.Tab label="Lainnya">
                                    <FormContainer.Input
                                        htmlFor="date"
                                        label="Tanggal Pelanggaran"
                                    >
                                        <TextInput
                                            id="date"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.date}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="message"
                                        label="Pesan untuk siswa"
                                    >
                                        <TextareaInput
                                            id="message"
                                            className="mt-1 block w-full"
                                            value={violation.message}
                                            rows={4}
                                            readOnly
                                            placeholder="Tidak ada pesan"
                                        />
                                    </FormContainer.Input>
                                </TabsContainer.Tab>
                            </TabsContainer>
                        </FormContainer.Content>
                        <div
                            className={`flex lg:flex gap-3 items-center lg:w-fit mt-2`}
                        >
                            <DeleteButton onClick={confirmViolationDeletion} />
                        </div>
                        {/* <FormContainer.Buttons>
                            <RedirectButton
                                href={route('admin.dashboard.violations.edit', {
                                    violation: violation,
                                })}
                            />
                            <DeleteButton onClick={confirmViolationDeletion} />
                        </FormContainer.Buttons> */}
                        <DeleteModal
                            show={confirmingViolationDeletion}
                            onClose={closeModal}
                        >
                            <DeleteModal.Title>
                                Apa kamu yakin ingin menghapus data pelanggaran{' '}
                                {violation?.student_name} ?
                            </DeleteModal.Title>

                            <DeleteModal.Text>
                                Setelah data pelanggaran siswa dihapus, semua
                                sumber daya dan data pelanggaran siswa akan
                                dihapus permanen.
                            </DeleteModal.Text>
                            <DeleteModal.Button
                                closeModal={closeModal}
                                onDelete={deleteViolation}
                                disabled={processing}
                            ></DeleteModal.Button>
                        </DeleteModal>
                    </FormContainer>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
