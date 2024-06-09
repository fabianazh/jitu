import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import FormContainer from '@/Components/Container/FormContainer'
import RedirectButton from '@/Components/Button/RedirectButton'
import DeleteModal from '@/Components/Modal/DeleteModal'
import { useState } from 'react'
import DeleteButton from '@/Components/Button/DeleteButton'
import TabsContainer from '@/Components/Other/Tabs'
import BackButton from '@/Components/Button/BackButton'

export default function Detail({
    auth,
    major,
}: PageProps & DetailMajorPageProps) {
    const { delete: destroy, processing } = useForm()

    const [confirmingMajorDeletion, setConfirmingMajorDeletion] =
        useState(false)

    function confirmMajorDeletion() {
        setConfirmingMajorDeletion(true)
    }

    function closeModal() {
        setConfirmingMajorDeletion(false)
    }

    function deleteMajor(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.majors.destroy', {
                major: major,
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
            <Head title={`Detail Jurusan ${major.name}`} />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title={`Detail Jurusan ${major.name}`}>
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route('admin.dashboard.majors.index')}
                            >
                                Jurusan
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Detail
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={route('admin.dashboard.majors.index')}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-auto flex gap-5 mb-24">
                    <FormContainer>
                        <FormContainer.Heading
                            heading={`Detail Jurusan ${major.name}`}
                            desc="Lihat informasi lengkap tentang jurusan ini."
                        />

                        <FormContainer.Content>
                            <TabsContainer>
                                <TabsContainer.Tab label="Informasi Jurusan">
                                    <FormContainer.Input
                                        htmlFor="id"
                                        label="ID Jurusan"
                                    >
                                        <TextInput
                                            id="id"
                                            type="text"
                                            className={`mt-1 block w-full`}
                                            value={major.id}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="name"
                                        label="Nama Jurusan"
                                    >
                                        <TextInput
                                            id="name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={major.name}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="abbreviation"
                                        label="Singkatan Jurusan"
                                    >
                                        <TextInput
                                            id="abbreviation"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={major.abbreviation}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="head_of_program"
                                        label="Ketua Program Keahlian"
                                    >
                                        <TextInput
                                            id="head_of_program"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={major.head_of_program}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                </TabsContainer.Tab>
                                <TabsContainer.Tab label="Lainnya">
                                    <FormContainer.Input
                                        htmlFor="total_classes"
                                        label="Total Kelas"
                                    >
                                        <TextInput
                                            id="total_classes"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={major.total_classes}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                </TabsContainer.Tab>
                            </TabsContainer>
                        </FormContainer.Content>
                        <FormContainer.Buttons>
                            <RedirectButton
                                href={route('admin.dashboard.majors.edit', {
                                    major: major,
                                })}
                            />
                            <DeleteButton onClick={confirmMajorDeletion} />
                        </FormContainer.Buttons>
                    </FormContainer>
                    <DeleteModal
                        show={confirmingMajorDeletion}
                        onClose={closeModal}
                    >
                        <DeleteModal.Title>
                            Apa kamu yakin ingin menghapus data jurusan{' '}
                            {major?.name} ?
                        </DeleteModal.Title>

                        <DeleteModal.Text>
                            Setelah data jurusan dihapus, semua sumber daya dan
                            data jurusan akan dihapus permanen.
                        </DeleteModal.Text>
                        <DeleteModal.Button
                            closeModal={closeModal}
                            onDelete={deleteMajor}
                            disabled={processing}
                        ></DeleteModal.Button>
                    </DeleteModal>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
