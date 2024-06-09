import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useEffect, useRef, useState } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import SelectInput from '@/Components/Form/SelectInput'
import TextareaInput from '@/Components/Form/TextareaInput'
import FormContainer from '@/Components/Container/FormContainer'
import TabsContainer from '@/Components/Other/Tabs'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import { toast } from 'react-toastify'
import BackButton from '@/Components/Button/BackButton'
import ConfirmModal from '@/Components/Modal/ConfirmModal'

export default function Create({
    auth,
    students,
    violationForms,
    sanctions,
    classes,
}: PageProps & CreateViolationPageProps) {
    const { data, setData, post, errors, reset, processing } = useForm({
        name: '',
        gender: '',
        violation_form_id: '',
        violation_category: '',
        sanction_id: '',
        sanction: '-',
        weight: 0,
        message: '',
        class_id: '',
        student_id: '',
        photo: 'img/avatar/default-avatar.jpg',
        studentsByClass: null as Student[] | null,
    })

    const [confirmingCreateViolation, setConfirmingCreateViolation] =
        useState<boolean>(false)

    function confirmCreateViolation() {
        setConfirmingCreateViolation(true)
    }

    function closeModal() {
        setConfirmingCreateViolation(false)
    }

    function submit(e: React.FormEvent) {
        e.preventDefault()

        if (data.student_id === '' || data.violation_form_id === '') {
            toast.warning('Data belum terisi semua.', {
                progress: undefined,
                autoClose: 3000,
            })

            return
        }

        post(route('admin.dashboard.violations.store'), {
            onSuccess: () => closeModal(),
        })
    }

    function resetForm() {
        reset()
    }

    useEffect(() => {
        reset('student_id', 'gender')
        if (data.class_id) {
            const studentsByClass = students.filter(
                (student) =>
                    student.class_id === data.class_id &&
                    student.status === 'Aktif'
            )

            setData((prevData) => ({
                ...prevData,
                studentsByClass: studentsByClass,
            }))
        }
    }, [data.class_id])

    useEffect(() => {
        const foundStudent = students.find(
            (student) => student.nis.toString() === data.student_id
        )
        if (foundStudent) {
            setData((prevData) => ({
                ...prevData,
                name: foundStudent.name,
                gender: foundStudent.gender,
                student_id: foundStudent.nis,
                photo: foundStudent.photo as unknown as string,
            }))
        }
    }, [data.student_id])

    useEffect(() => {
        const foundViolationForm = violationForms.find(
            (item) => item.id === data.violation_form_id
        )

        if (foundViolationForm) {
            setData((prevData) => ({
                ...prevData,
                weight: foundViolationForm.weight,
                violation_category: foundViolationForm.violation_category,
            }))

            const correspondingSanctionId = findSanctionByViolationFormWeight(
                foundViolationForm.weight,
                sanctions
            )

            if (correspondingSanctionId !== undefined) {
                setData((prevData) => ({
                    ...prevData,
                    sanction_id: correspondingSanctionId.id,
                    sanction: correspondingSanctionId.sanction,
                }))
            }
        }
    }, [data.violation_form_id, violationForms, sanctions])

    function findSanctionByViolationFormWeight(
        violationFormWeight: number,
        sanctions: Sanction[]
    ) {
        const foundSanction = sanctions.find(
            (sanction) =>
                violationFormWeight >= sanction.weight_from &&
                violationFormWeight <= sanction.weight_to
        )

        return foundSanction ? foundSanction : undefined
    }

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Data Pelanggaran Siswa" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Tambah Data Pelanggaran Siswa">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route('admin.dashboard.violations.index')}
                            >
                                Pelanggaran Siswa
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Tambah
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={route('admin.dashboard.violations.index')}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-auto">
                    <form
                        onSubmit={submit}
                        className="w-full h-auto flex gap-5 mb-24"
                    >
                        <FormContainer>
                            <FormContainer.Heading
                                heading="Informasi Pelanggaran Siswa"
                                desc="Lengkapi informasi pelanggaran siswa dengan lengkap."
                            />

                            <FormContainer.Content>
                                <TabsContainer>
                                    <TabsContainer.Tab label="Biodata siswa">
                                        <FormContainer.Input
                                            htmlFor="class_id"
                                            label="Pilih Kelas Siswa"
                                            errorMessage={errors.class_id}
                                        >
                                            <SelectInput
                                                id="class_id"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        class_id:
                                                            e.target.value,
                                                    }))
                                                }
                                                value={data.class_id}
                                                defaultOption="Pilih kelas siswa"
                                                isFocused
                                            >
                                                {classes.map((grade: Class) => (
                                                    <option
                                                        key={grade.id}
                                                        value={grade.id}
                                                    >
                                                        {grade.class_name}
                                                    </option>
                                                ))}
                                            </SelectInput>
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="student_id"
                                            label="Pilih Siswa"
                                            errorMessage={errors.student_id}
                                        >
                                            <SelectInput
                                                id="student_id"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        student_id:
                                                            e.target.value,
                                                    }))
                                                }
                                                value={data.student_id}
                                                defaultOption="Pilih siswa"
                                                disabled={data.class_id === ''}
                                            >
                                                {data?.studentsByClass
                                                    ?.length ?? 0 > 0 ? (
                                                    data?.studentsByClass?.map(
                                                        (student: Student) => (
                                                            <option
                                                                key={
                                                                    student.nis
                                                                }
                                                                value={
                                                                    student.nis
                                                                }
                                                            >
                                                                {student.name}
                                                            </option>
                                                        )
                                                    )
                                                ) : (
                                                    <>
                                                        <option value="">
                                                            Tidak ada siswa
                                                        </option>
                                                    </>
                                                )}
                                            </SelectInput>
                                        </FormContainer.Input>

                                        <FormContainer.Input label="Foto">
                                            <div className="w-30 lg:w-36 h-fit aspect-square rounded-xl overflow-hidden shadow border outline-2 p-1.5">
                                                <img
                                                    src={`/storage/${data.photo}`}
                                                    alt={data.name}
                                                    className="w-full h-auto aspect-square rounded-lg shadow-sm border"
                                                    draggable={false}
                                                />
                                            </div>
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="nis"
                                            label="NIS"
                                            errorMessage={errors.student_id}
                                        >
                                            <TextInput
                                                id="nis"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.student_id}
                                                readOnly
                                                disabled
                                                autoComplete="off"
                                                placeholder="NIS siswa"
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="gender"
                                            label="Jenis Kelamin Siswa"
                                            errorMessage={errors.gender}
                                        >
                                            <TextInput
                                                id="gender"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.gender}
                                                placeholder="Jenis kelamin siswa"
                                                disabled
                                                readOnly
                                                autoComplete="off"
                                            />
                                        </FormContainer.Input>
                                    </TabsContainer.Tab>
                                    <TabsContainer.Tab label="Pelanggaran dan Sanksi">
                                        <FormContainer.Input
                                            htmlFor="violation_form_id"
                                            label="Bentuk Pelanggaran"
                                            errorMessage={
                                                errors.violation_form_id
                                            }
                                        >
                                            <SelectInput
                                                id="violation_form_id"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        violation_form_id:
                                                            e.target.value,
                                                    }))
                                                }
                                                value={data.violation_form_id}
                                                defaultOption="Pilih bentuk pelanggaran siswa"
                                            >
                                                {violationForms.map(
                                                    (
                                                        violationForm: ViolationForm
                                                    ) => (
                                                        <option
                                                            key={
                                                                violationForm.id
                                                            }
                                                            value={
                                                                violationForm.id
                                                            }
                                                        >
                                                            {
                                                                violationForm.description
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </SelectInput>
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="violation_category"
                                            label="Kategori Pelanggaran"
                                            errorMessage={
                                                errors.violation_category
                                            }
                                        >
                                            <TextInput
                                                id="violation_category"
                                                className="mt-1 block w-full"
                                                value={`Pelanggaran ${data.violation_category}`}
                                                readOnly
                                                disabled
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="sanction"
                                            label="Sanksi"
                                            errorMessage={errors.sanction}
                                        >
                                            <TextInput
                                                id="sanction"
                                                className="mt-1 block w-full"
                                                value={data.sanction}
                                                readOnly
                                                disabled
                                            />
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="weight"
                                            label="Total Penambahan Poin"
                                            errorMessage={errors.weight}
                                        >
                                            <TextInput
                                                id="weight"
                                                className="mt-1 block w-full"
                                                value={data.weight}
                                                readOnly
                                                disabled
                                            />
                                        </FormContainer.Input>
                                    </TabsContainer.Tab>
                                    <TabsContainer.Tab label="Lainnya">
                                        <FormContainer.Input
                                            htmlFor="message"
                                            label="Pesan untuk siswa"
                                            desc="*opsional"
                                            errorMessage={errors.message}
                                        >
                                            <TextareaInput
                                                id="message"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        message: e.target.value,
                                                    }))
                                                }
                                                value={data.message}
                                                rows={4}
                                                isFocused
                                                autoComplete="message"
                                                placeholder="Masukan pesan untuk siswa"
                                            />
                                        </FormContainer.Input>
                                    </TabsContainer.Tab>
                                </TabsContainer>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <ResetButton onClick={resetForm} />
                                <button
                                    type="button"
                                    disabled={
                                        data.name === '' ||
                                        data.violation_form_id === ''
                                    }
                                    onClick={confirmCreateViolation}
                                    className="text-white bg-blue-500 transition-all duration-200 hover:bg-blue-600 w-full lg:w-fit py-2 px-6 rounded lg:rounded-md text-xs lg:text-sm shadow"
                                >
                                    Submit
                                </button>
                            </FormContainer.Buttons>
                        </FormContainer>
                        <ConfirmModal
                            show={confirmingCreateViolation}
                            onClose={closeModal}
                            submit={submit}
                            maxWidth="xl"
                        >
                            <ConfirmModal.Title>
                                Pastikan data pelanggaran sudah benar
                            </ConfirmModal.Title>
                            <ConfirmModal.Text>
                                Data pelanggaran tidak dapat diubah setelah
                                pelanggaran ditambahkan.
                            </ConfirmModal.Text>
                            <ConfirmModal.Button
                                closeModal={closeModal}
                                disabled={
                                    processing ||
                                    data.name === '' ||
                                    data.violation_form_id === ''
                                }
                            />
                        </ConfirmModal>
                    </form>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
