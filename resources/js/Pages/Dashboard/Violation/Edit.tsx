import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import SelectInput from '@/Components/Form/SelectInput'
import TextareaInput from '@/Components/Form/TextareaInput'
import FormContainer from '@/Components/Container/FormContainer'
import TabsContainer from '@/Components/Other/Tabs'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import BackButton from '@/Components/Button/BackButton'

export default function Edit({
    auth,
    violationForms,
    sanctions,
    violation,
}: PageProps & EditViolationPageProps) {
    const { data, setData, put, errors, reset, processing } = useForm({
        violation_form_id: violation.violation_form_id,
        sanction_id: violation.sanction_id,
        sanction: violation.sanction,
        old_points: violation.weight,
        weight: violation.weight,
        message: violation.message,
        student_id: violation.student_nis,
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()

        put(
            route('admin.dashboard.violations.update', { violation: violation })
        )
    }

    function resetForm() {
        reset()
    }

    useEffect(() => {
        const foundViolationWeight = violationForms.find(
            (item) => item.id === data.violation_form_id
        )

        if (foundViolationWeight) {
            setData((prevData) => ({
                ...prevData,
                weight: foundViolationWeight.weight,
            }))

            const correspondingSanctionId = findSanctionByViolationFormWeight(
                foundViolationWeight.weight,
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
            <Head
                title={`Edit Data Pelanggaran oleh ${violation.student_name}`}
            />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title
                        title={`Edit Data Pelanggaran oleh ${violation.student_name}`}
                    >
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
                                Edit
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
                                heading={`Edit Pelanggaran oleh ${violation.student_name}`}
                                desc="Perbarui informasi data pelanggaran sesuai dengan informasi yang diperlukan."
                            />

                            <FormContainer.Content>
                                <TabsContainer>
                                    <TabsContainer.Tab label="Biodata siswa">
                                        <FormContainer.Input
                                            htmlFor="nis"
                                            label="NIS"
                                        >
                                            <TextInput
                                                id="nis"
                                                type="number"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        nis: e.target.value,
                                                    }))
                                                }
                                                value={violation.student_nis}
                                                readOnly
                                                disabled
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="name"
                                            label="Nama Siswa"
                                        >
                                            <TextInput
                                                id="name"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={violation.student_name}
                                                placeholder="Nama lengkap siswa"
                                                disabled
                                                readOnly
                                                autoComplete="off"
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="student_class"
                                            label="Kelas"
                                        >
                                            <TextInput
                                                id="student_class"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={violation.student_class.toUpperCase()}
                                                autoComplete="off"
                                                placeholder="Kelas siswa"
                                                disabled
                                                readOnly
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="student_gender"
                                            label="Jenis Kelamin"
                                        >
                                            <TextInput
                                                id="student_gender"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={violation.student_gender}
                                                autoComplete="off"
                                                placeholder="Jenis kelamin siswa"
                                                disabled
                                                readOnly
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
                                                name="violation_form_id"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        violation_form_id:
                                                            e.target.value,
                                                    }))
                                                }
                                                value={data.violation_form_id}
                                                required
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
                                            label="Penambahan Poin"
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
                                                value={data.message ?? ''}
                                                rows={4}
                                                isFocused
                                                placeholder="Masukan pesan untuk siswa"
                                            />
                                        </FormContainer.Input>
                                    </TabsContainer.Tab>
                                </TabsContainer>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <ResetButton onClick={resetForm} />
                                <SubmitButton disabled={processing} />
                            </FormContainer.Buttons>
                        </FormContainer>
                    </form>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
