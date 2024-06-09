import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import FormContainer from '@/Components/Container/FormContainer'
import TabsContainer from '@/Components/Other/Tabs'
import DeleteModal from '@/Components/Modal/DeleteModal'
import RedirectButton from '@/Components/Button/RedirectButton'
import DeleteButton from '@/Components/Button/DeleteButton'
import BackButton from '@/Components/Button/BackButton'

export default function Detail({
    auth,
    violationForm,
}: PageProps & DetailViolationFormPageProps) {
    const { delete: destroy, processing } = useForm()

    const [
        confirmingViolationFormDeletion,
        setConfirmingViolationFormDeletion,
    ] = useState(false)

    function confirmViolationFormDeletion() {
        setConfirmingViolationFormDeletion(true)
    }

    function closeModal() {
        setConfirmingViolationFormDeletion(false)
    }

    function deleteViolationForm(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.forms_of_violation.destroy', {
                violationForm: violationForm,
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
            <Head title={`Detail Bentuk Pelanggaran`} />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title={`Detail Bentuk Pelanggaran`}>
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route(
                                    auth?.admin?.user
                                        ? 'admin.dashboard.index'
                                        : 'student.dashboard.index'
                                )}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route(
                                    auth?.admin?.user
                                        ? 'admin.dashboard.forms_of_violation.index'
                                        : 'student.dashboard.forms_of_violation.index'
                                )}
                            >
                                Bentuk Pelanggaran
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Detail
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={route(
                                auth?.admin?.user
                                    ? 'admin.dashboard.forms_of_violation.index'
                                    : 'student.dashboard.forms_of_violation.index'
                            )}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-auto flex gap-5 mb-24">
                    <FormContainer>
                        <FormContainer.Heading
                            heading={`Detail Bentuk Pelanggaran`}
                            desc="Lihat informasi lengkap tentang bentuk pelanggaran ini."
                        />

                        {auth?.admin?.user ? (
                            <>
                                <FormContainer.Content>
                                    <TabsContainer>
                                        <TabsContainer.Tab label="Informasi">
                                            <FormContainer.Input
                                                htmlFor="violation_category"
                                                label="Kategori"
                                            >
                                                <TextInput
                                                    id="violation_category"
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                    value={
                                                        violationForm.violation_category
                                                    }
                                                    readOnly
                                                />
                                            </FormContainer.Input>
                                            <FormContainer.Input
                                                htmlFor="description"
                                                label="Deskripsi"
                                            >
                                                <TextInput
                                                    id="description"
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                    value={
                                                        violationForm.description
                                                    }
                                                    readOnly
                                                    autoComplete="off"
                                                />
                                            </FormContainer.Input>
                                            <FormContainer.Input
                                                htmlFor="weight"
                                                label="Bobot Pelanggaran"
                                            >
                                                <TextInput
                                                    id="weight"
                                                    type="number"
                                                    className="mt-1 block w-full"
                                                    value={violationForm.weight}
                                                    readOnly
                                                />
                                            </FormContainer.Input>
                                        </TabsContainer.Tab>
                                        <TabsContainer.Tab label="Lainnya">
                                            <FormContainer.Input
                                                htmlFor="totalViolations"
                                                label="Total Pelanggaran"
                                            >
                                                <TextInput
                                                    id="totalViolations"
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                    value={`${violationForm.totalViolations} Pelanggaran`}
                                                    readOnly
                                                    placeholder="Tidak ada pelanggaran"
                                                />
                                            </FormContainer.Input>
                                        </TabsContainer.Tab>
                                    </TabsContainer>
                                </FormContainer.Content>
                                <FormContainer.Buttons>
                                    <RedirectButton
                                        href={route(
                                            'admin.dashboard.forms_of_violation.edit',
                                            {
                                                violationForm: violationForm,
                                            }
                                        )}
                                    />
                                    <DeleteButton
                                        onClick={confirmViolationFormDeletion}
                                    />
                                </FormContainer.Buttons>
                            </>
                        ) : (
                            <FormContainer.Content>
                                <FormContainer.Input
                                    htmlFor="violation_category"
                                    label="Kategori"
                                    className=""
                                >
                                    <TextInput
                                        id="violation_category"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={violationForm.violation_category}
                                        readOnly
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="description"
                                    label="Deskripsi"
                                >
                                    <TextInput
                                        id="description"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={violationForm.description}
                                        readOnly
                                        autoComplete="off"
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="weight"
                                    label="Bobot Pelanggaran"
                                >
                                    <TextInput
                                        id="weight"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={violationForm.weight}
                                        readOnly
                                    />
                                </FormContainer.Input>
                            </FormContainer.Content>
                        )}
                        <DeleteModal
                            show={confirmingViolationFormDeletion}
                            onClose={closeModal}
                        >
                            <DeleteModal.Title>
                                Apa kamu yakin ingin menghapus data bentuk
                                pelanggaran "{violationForm?.description}" ?
                            </DeleteModal.Title>

                            <DeleteModal.Text>
                                Setelah data pelanggaran siswa dihapus, semua
                                sumber daya dan data pelanggaran siswa akan
                                dihapus permanen.
                            </DeleteModal.Text>
                            <DeleteModal.Button
                                closeModal={closeModal}
                                onDelete={deleteViolationForm}
                                disabled={processing}
                            ></DeleteModal.Button>
                        </DeleteModal>
                    </FormContainer>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
