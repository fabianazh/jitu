import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useEffect, useRef } from 'react'
import { useForm } from '@inertiajs/react'
import TextareaInput from '@/Components/Form/TextareaInput'
import FormContainer from '@/Components/Container/FormContainer'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import TextInput from '@/Components/Form/TextInput'
import BackButton from '@/Components/Button/BackButton'

export default function Create({
    auth,
    minWeight,
}: PageProps & CreateSanctionPageProps) {
    const { data, setData, post, errors, reset, processing } = useForm({
        sanction: '',
        weight_from: minWeight,
        weight_to: minWeight + 1,
        criteria: '',
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()

        post(route('admin.dashboard.sanctions.store'))
    }

    function resetForm() {
        reset()
    }

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Data Sanksi" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Tambah Data Sanksi">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route('admin.dashboard.sanctions.index')}
                            >
                                Sanksi
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Tambah
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={route('admin.dashboard.sanctions.index')}
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
                                    htmlFor="sanction"
                                    label="Sanksi"
                                    errorMessage={errors.sanction}
                                    className="w-full"
                                >
                                    <TextInput
                                        id="sanction"
                                        type="text"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                sanction: e.target.value,
                                            }))
                                        }
                                        value={data.sanction}
                                        required
                                        isFocused
                                        autoComplete="off"
                                        placeholder="Masukan sanksi"
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="weight_from"
                                    label="Bobot dari"
                                    errorMessage={errors.weight_from}
                                >
                                    <TextInput
                                        id="weight_from"
                                        type="number"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                weight_from: parseInt(
                                                    e.target.value,
                                                    10
                                                ),
                                            }))
                                        }
                                        value={data.weight_from}
                                        readOnly
                                        disabled
                                        autoComplete="weight_from"
                                        placeholder="Masukan bobot dari"
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="weight_to"
                                    label="Bobot sampai"
                                    desc={
                                        minWeight
                                            ? `*min : ${minWeight + 1}`
                                            : ''
                                    }
                                    errorMessage={errors.weight_to}
                                >
                                    <TextInput
                                        id="weight_to"
                                        type="number"
                                        className={`mt-1 block w-full ${
                                            data.weight_to <= data.weight_from
                                                ? 'border-red-700'
                                                : ''
                                        }`}
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                weight_to: parseInt(
                                                    e.target.value,
                                                    10
                                                ),
                                            }))
                                        }
                                        value={data.weight_to}
                                        required
                                        autoComplete="weight_to"
                                        placeholder="Masukan bobot sampai"
                                    />
                                    {data.weight_to <= data.weight_from && (
                                        <p
                                            className={
                                                'text-xs lg:text-sm text-red-600 mt-2'
                                            }
                                        >
                                            Bobot sampai harus lebih besar dari{' '}
                                            {minWeight}.
                                        </p>
                                    )}
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="criteria"
                                    label="Kriteria Sanksi"
                                    errorMessage={errors.criteria}
                                >
                                    <TextareaInput
                                        id="criteria"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                criteria: e.target.value,
                                            }))
                                        }
                                        value={data.criteria}
                                        rows={2}
                                        required
                                        autoComplete="off"
                                        placeholder="Masukan kriteria sanksi"
                                    />
                                </FormContainer.Input>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <ResetButton onClick={resetForm} />
                                <SubmitButton
                                    disabled={
                                        processing ||
                                        data.weight_to <= data.weight_from
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
