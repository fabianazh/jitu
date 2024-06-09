import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import TextareaInput from '@/Components/Form/TextareaInput'
import FormContainer from '@/Components/Container/FormContainer'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import TextInput from '@/Components/Form/TextInput'
import BackButton from '@/Components/Button/BackButton'

export default function Create({
    auth,
    maxWeight,
    lowCategory,
    mediumCategory,
}: PageProps & CreateViolationFormPageProps) {
    const { data, setData, post, errors, reset, processing } = useForm({
        weight: 1,
        description: '',
        violation_category_id: '',
        violation_category: '',
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()

        post(route('admin.dashboard.forms_of_violation.store'))
    }

    function resetForm() {
        reset()
    }

    useEffect(() => {
        if (data.weight >= 1 && data.weight <= lowCategory) {
            setData((prevData) => ({
                ...prevData,
                violation_category: 'Ringan',
                violation_category_id: '1618de7f-1ef0-3b3c-bd7d-8dnsiad80',
            }))
        } else if (data.weight > lowCategory && data.weight <= mediumCategory) {
            setData((prevData) => ({
                ...prevData,
                violation_category: 'Sedang',
                violation_category_id: '2618de7f-1ef0-3bsa3c-bd7d-8sd98ad4',
            }))
        } else if (data.weight >= mediumCategory) {
            setData((prevData) => ({
                ...prevData,
                violation_category: 'Berat',
                violation_category_id: '3618de7f-1ef0-3b3c-bd7d-6a6f6adasdaw',
            }))
        }
    }, [data.weight])

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Data Bentuk Pelanggaran" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Tambah Data Bentuk Pelanggaran">
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
                                Tambah
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
                                heading="Informasi Bentuk Pelanggaran"
                                desc="Lengkapi informasi bentuk pelanggaran dengan lengkap."
                            />

                            <FormContainer.Content>
                                <FormContainer.Input
                                    htmlFor="violation_category_id"
                                    label="Kategori Bentuk Pelanggaran"
                                    errorMessage={errors.violation_category_id}
                                    className="mt-0 w-full"
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
                                    errorMessage={errors.weight}
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
                                        required
                                        isFocused
                                        autoComplete="weight"
                                        placeholder="Masukan bobot pelanggaran"
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
                                    {data.weight > maxWeight &&
                                    maxWeight !== null ? (
                                        <p
                                            className={
                                                'text-xs lg:text-sm text-red-600 mt-2'
                                            }
                                        >
                                            Bobot tidak boleh lebih dari{' '}
                                            {maxWeight}.
                                        </p>
                                    ) : null}
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="description"
                                    label="Deskripsi Bentuk Pelanggaran"
                                    errorMessage={errors.description}
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
                                        rows={2}
                                        required
                                        autoComplete="off"
                                        placeholder="Masukan deskripsi bentuk pelanggaran"
                                    />
                                </FormContainer.Input>
                                {!maxWeight && (
                                    <p
                                        className={
                                            'text-xs lg:text-sm text-red-600 mt-2'
                                        }
                                    >
                                        Tidak dapat menambahkan data jika data
                                        sanksi tidak ada.
                                    </p>
                                )}
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
