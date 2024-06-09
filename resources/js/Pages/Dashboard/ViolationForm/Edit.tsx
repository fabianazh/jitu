import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import TextareaInput from '@/Components/Form/TextareaInput'
import FormContainer from '@/Components/Container/FormContainer'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import BackButton from '@/Components/Button/BackButton'
import { useEffect } from 'react'

export default function Edit({
    auth,
    violationForm,
    maxWeight,
}: PageProps & EditViolationFormPageProps) {
    const { data, setData, put, errors, reset, processing } = useForm({
        violation_category_id: violationForm.violation_category_id,
        description: violationForm.description,
        weight: violationForm.weight,
        violation_category: violationForm.violation_category,
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()

        put(
            route('admin.dashboard.forms_of_violation.update', {
                violationForm: violationForm,
            })
        )
    }

    function resetForm() {
        reset()
    }

    useEffect(() => {
        if (data.weight >= 1 && data.weight <= 10) {
            setData((prevData) => ({
                ...prevData,
                violation_category: 'Ringan',
                violation_category_id: '1618de7f-1ef0-3b3c-bd7d-8dnsiad80',
            }))
        } else if (data.weight >= 11 && data.weight <= 20) {
            setData((prevData) => ({
                ...prevData,
                violation_category: 'Sedang',
                violation_category_id: '2618de7f-1ef0-3bsa3c-bd7d-8sd98ad4',
            }))
        } else if (data.weight >= 21) {
            setData((prevData) => ({
                ...prevData,
                violation_category: 'Berat',
                violation_category_id: '3618de7f-1ef0-3b3c-bd7d-6a6f6adasdaw',
            }))
        }
    }, [data.weight])

    return (
        <AuthenticatedLayout>
            <Head title={`Detail Bentuk Pelanggaran`} />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title={`Edit Bentuk Pelanggaran`}>
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route(
                                    'admin.dashboard.forms_of_violation.index'
                                )}
                            >
                                Bentuk Pelanggaran
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Edit
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={route(
                                'admin.dashboard.forms_of_violation.index'
                            )}
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
                                heading={`Edit Bentuk Pelanggaran`}
                                desc="Perbarui informasi bentuk pelanggaran sesuai dengan informasi yang diperlukan."
                            />

                            <FormContainer.Content>
                                <FormContainer.Input
                                    htmlFor="violation_category_id"
                                    label="Kategori Bentuk Pelanggaran"
                                    errorMessage={errors.violation_category_id}
                                    className="mt-0"
                                >
                                    <TextInput
                                        id="violation_category_id"
                                        className="mt-1 block w-full"
                                        value={data.violation_category}
                                        placeholder="Kategori bentuk pelanggaran"
                                        disabled
                                        readOnly
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="weight"
                                    label="Bobot Pelanggaran"
                                    desc={
                                        maxWeight
                                            ? `*min : 1, max : ${maxWeight}`
                                            : ''
                                    }
                                >
                                    <TextInput
                                        id="weight"
                                        type="number"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                weight: parseInt(
                                                    e.target.value,
                                                    10
                                                ),
                                            }))
                                        }
                                        value={data.weight}
                                        autoComplete="off"
                                        placeholder="Masukan bobot pelanggaran"
                                        required
                                    />
                                    {data.weight < 1 && (
                                        <p
                                            className={
                                                'text-xs lg:text-sm text-red-600 mt-2'
                                            }
                                        >
                                            Bobot tidak boleh kurang dari 1.
                                        </p>
                                    )}
                                    {data.weight >= maxWeight && (
                                        <p
                                            className={
                                                'text-xs lg:text-sm text-red-600 mt-2'
                                            }
                                        >
                                            Bobot tidak boleh lebih dari{' '}
                                            {maxWeight}.
                                        </p>
                                    )}
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="description"
                                    label="Deskripsi"
                                >
                                    <TextareaInput
                                        id="description"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                description: e.target.value,
                                            }))
                                        }
                                        value={data.description}
                                        placeholder="Masukan deskripsi bentuk pelanggaran"
                                        required
                                        autoComplete="off"
                                        rows={2}
                                    />
                                </FormContainer.Input>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <ResetButton onClick={resetForm} />
                                <SubmitButton
                                    disabled={
                                        processing ||
                                        data.weight < 1 ||
                                        data.weight >= maxWeight
                                    }
                                />
                            </FormContainer.Buttons>
                        </FormContainer>
                    </form>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
