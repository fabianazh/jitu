import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
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
import TimelineSection from '@/Components/Section/Dashboard/TimelineSection'

export default function Detail({
    auth,
    student,
    violations,
    totalViolations,
}: PageProps & DetailStudentPageProps) {
    const { delete: destroy, processing } = useForm()

    const [confirmingStudentDeletion, setConfirmingStudentDeletion] =
        useState(false)

    function closeModal() {
        setConfirmingStudentDeletion(false)
    }

    function deleteStudent(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.students.destroy', {
                student: student,
            }),
            {
                onSuccess: () => closeModal(),
            }
        )

        closeModal()
    }

    return (
        <AuthenticatedLayout>
            <Head title={student.name} />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title={`Detail ${student.name}`}>
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route('admin.dashboard.students.index')}
                            >
                                Siswa
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Detail
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={route('admin.dashboard.students.index')}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-auto">
                    <div className="w-full h-auto flex gap-5 mb-6">
                        <FormContainer>
                            <FormContainer.Heading
                                heading="Informasi Siswa"
                                desc="Lihat informasi lengkap tentang siswa ini."
                            />

                            <FormContainer.Content>
                                <TabsContainer>
                                    <TabsContainer.Tab label="Biodata Siswa">
                                        <FormContainer.Input label="Foto">
                                            <div className="w-36 lg:w-44 h-fit aspect-square rounded-xl overflow-hidden shadow border outline-2 p-1.5">
                                                <img
                                                    src={`/storage/${
                                                        student?.photo as string
                                                    }`}
                                                    alt={student.name}
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
                                                value={student.nis}
                                                readOnly
                                                autoComplete="off"
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="name"
                                            label="Nama Lengkap"
                                        >
                                            <TextInput
                                                id="name"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={student.name}
                                                readOnly
                                                autoComplete="off"
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="date_of_birth"
                                            label="Tanggal Lahir"
                                        >
                                            <TextInput
                                                id="date_of_birth"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={student.date_of_birth}
                                                autoComplete="off"
                                                readOnly
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="gender"
                                            label="Jenis Kelamin"
                                        >
                                            <TextInput
                                                id="gender"
                                                className="mt-1 block w-full"
                                                value={student.gender}
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="phone"
                                            label="No Telepon Siswa"
                                        >
                                            <TextInput
                                                id="phone"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={student.phone}
                                                autoComplete="off"
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="address"
                                            label="Alamat"
                                        >
                                            <TextareaInput
                                                id="address"
                                                className="mt-1 block w-full"
                                                value={student.address}
                                                autoComplete="off"
                                                rows={4}
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                    </TabsContainer.Tab>
                                    <TabsContainer.Tab label="Lainnya">
                                        <FormContainer.Input
                                            htmlFor="status"
                                            label="Status"
                                        >
                                            <TextInput
                                                id="status"
                                                name="status"
                                                className="mt-1 block w-full"
                                                value={student.status}
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="class_name"
                                            label="Kelas"
                                        >
                                            <TextInput
                                                id="class_name"
                                                name="class_name"
                                                className="mt-1 block w-full"
                                                value={student.class_name}
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="phone"
                                            label="No Telepon Wali Siswa"
                                        >
                                            <TextInput
                                                id="parents_phone"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={student.parents_phone}
                                                autoComplete="off"
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="points"
                                            label="Total Poin"
                                        >
                                            <TextInput
                                                id="points"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={`${student?.points} Poin`}
                                                autoComplete="off"
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="totalViolations"
                                            label="Total Pelanggaran"
                                        >
                                            <TextInput
                                                id="totalViolations"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={`${student?.totalViolations} Pelanggaran`}
                                                autoComplete="off"
                                                readOnly
                                            />
                                        </FormContainer.Input>
                                    </TabsContainer.Tab>
                                </TabsContainer>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <RedirectButton
                                    href={route(
                                        'admin.dashboard.students.edit',
                                        {
                                            student: student,
                                        }
                                    )}
                                />
                                <DeleteButton
                                    onClick={() =>
                                        setConfirmingStudentDeletion(true)
                                    }
                                />
                            </FormContainer.Buttons>
                        </FormContainer>
                        <DeleteModal
                            show={confirmingStudentDeletion}
                            onClose={closeModal}
                        >
                            <DeleteModal.Title>
                                Apa kamu yakin ingin menghapus data{' '}
                                {student?.name} ?
                            </DeleteModal.Title>

                            <DeleteModal.Text>
                                Setelah data siswa dihapus, semua sumber daya
                                dan data siswa akan dihapus permanen.
                            </DeleteModal.Text>
                            <DeleteModal.Button
                                closeModal={closeModal}
                                onDelete={deleteStudent}
                                disabled={processing}
                            ></DeleteModal.Button>
                        </DeleteModal>
                    </div>
                </section>
                <TimelineSection
                    auth={auth}
                    violations={violations}
                    student={student}
                    totalViolations={totalViolations}
                />
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
