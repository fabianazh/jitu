import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import FormContainer from '@/Components/Container/FormContainer'
import RedirectButton from '@/Components/Button/RedirectButton'
import DeleteButton from '@/Components/Button/DeleteButton'
import TabsContainer from '@/Components/Other/Tabs'
import DeleteModal from '@/Components/Modal/DeleteModal'
import BackButton from '@/Components/Button/BackButton'

export default function Detail({
    auth,
    grade,
}: PageProps & DetailClassPageProps) {
    const { delete: destroy, processing } = useForm()

    const [confirmingClassDeletion, setConfirmingClassDeletion] =
        useState(false)

    function closeModal() {
        setConfirmingClassDeletion(false)
    }

    function deleteClass(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.classes.destroy', {
                class: grade,
            }),
            {
                onSuccess: () => closeModal(),
            }
        )

        closeModal()
    }

    return (
        <AuthenticatedLayout>
            <Head title={`Detail Kelas ${grade.class_name}`} />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title={`Detail Kelas ${grade.class_name}`}>
                        <Breadcumb>
                            <Breadcumb.Item
                                href={
                                    auth?.admin?.user?.id
                                        ? route('admin.dashboard.index')
                                        : route('dashboard.index')
                                }
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={
                                    auth?.admin?.user?.id
                                        ? route('admin.dashboard.classes.index')
                                        : route('dashboard.classes.index')
                                }
                            >
                                Kelas
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Detail
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={route('admin.dashboard.classes.index')}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-auto">
                    <div className="w-full h-auto flex gap-5 mb-24">
                        <FormContainer>
                            <FormContainer.Heading
                                heading={`Detail Kelas ${grade.class_name}`}
                                desc="Lihat informasi lengkap tentang kelas ini."
                            />

                            <FormContainer.Content>
                                <TabsContainer>
                                    <TabsContainer.Tab label="Biodata Kelas">
                                        <FormContainer.Input
                                            htmlFor="id"
                                            label="ID Kelas"
                                            className="lg:w-7/12 mt-4"
                                        >
                                            <TextInput
                                                id="id"
                                                type="text"
                                                className={`mt-1 block w-full`}
                                                value={grade.id}
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="class_name"
                                            label="Nama Kelas"
                                        >
                                            <TextInput
                                                id="class_name"
                                                type="text"
                                                className={`mt-1 block w-full`}
                                                value={grade.class_name}
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="major"
                                            label="Jurusan"
                                        >
                                            <TextInput
                                                id="major"
                                                type="text"
                                                className={`mt-1 block w-full`}
                                                value={grade.major}
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="homeroom_teacher"
                                            label="Wali Kelas"
                                        >
                                            <TextInput
                                                id="homeroom_teacher"
                                                type="text"
                                                className={`mt-1 block w-full`}
                                                value={grade.homeroom_teacher}
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                    </TabsContainer.Tab>
                                    <TabsContainer.Tab label="Lainnya">
                                        <FormContainer.Input
                                            htmlFor="total_students"
                                            label="Jumlah Siswa"
                                        >
                                            <TextInput
                                                id="total_students"
                                                type="text"
                                                className={`mt-1 block w-full`}
                                                value={`${grade.total_students} Siswa`}
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                    </TabsContainer.Tab>
                                </TabsContainer>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <RedirectButton
                                    href={route(
                                        'admin.dashboard.classes.edit',
                                        {
                                            class: grade,
                                        }
                                    )}
                                />
                                <DeleteButton
                                    onClick={() =>
                                        setConfirmingClassDeletion(true)
                                    }
                                />
                            </FormContainer.Buttons>
                        </FormContainer>
                        <DeleteModal
                            show={confirmingClassDeletion}
                            onClose={closeModal}
                        >
                            <DeleteModal.Title>
                                Apa kamu yakin ingin menghapus data kelas{' '}
                                {grade?.class_name} ?
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
