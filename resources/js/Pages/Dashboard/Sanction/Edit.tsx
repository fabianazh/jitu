import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import BackButton from '@/Components/Button/BackButton'
import { useForm } from '@inertiajs/react'
import TextareaInput from '@/Components/Form/TextareaInput'
import FormContainer from '@/Components/Container/FormContainer'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import TextInput from '@/Components/Form/TextInput'

export default function Edit({
    auth,
    sanction,
    maxWeight,
}: PageProps & EditSanctionPageProps) {
    const { data, setData, put, errors, reset, processing } = useForm({
        sanction: sanction.sanction,
        weight_from: sanction.weight_from,
        weight_to: sanction.weight_to,
        criteria: sanction.criteria,
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()

        put(route('admin.dashboard.sanctions.update', { sanction: sanction }))
    }

    function resetForm() {
        reset()
    }

    const minWeight = sanction.weight_from

    let weightFromDesc = minWeight
        ? `*min : ${minWeight}, max : ${sanction.weight_to - 1}`
        : ''

    if (maxWeight) {
        weightFromDesc = `*min : ${minWeight}, max : ${maxWeight - 2}`
    }

    let weightToDesc = `*min : ${sanction.weight_to}`

    if (maxWeight) {
        weightToDesc = `*min : ${minWeight + 1}, max : ${maxWeight - 1}`
    }

    let weightFromError

    if (data.weight_from < sanction.weight_from) {
        weightFromError = (
            <p className={'text-sm text-red-600 mt-2'}>
                Bobot dari harus lebih besar dari {minWeight}.
            </p>
        )
    } else if (
        data.weight_from !== sanction.weight_from &&
        data.weight_from >= data.weight_to
    ) {
        weightFromError = (
            <p className={'text-sm text-red-600 mt-2'}>
                Bobot dari tidak boleh lebih besar atau sama dengan bobot
                sampai.
            </p>
        )
    } else if (data.weight_from >= sanction.weight_to) {
        weightFromError = (
            <p className={'text-sm text-red-600 mt-2'}>
                Bobot dari tidak boleh lebih besar dari {sanction.weight_to - 1}
                .
            </p>
        )
    }

    let weightToError

    if (data.weight_to <= sanction.weight_from) {
        weightToError = (
            <p className={'text-sm text-red-600 mt-2'}>
                Bobot sampai harus lebih besar dari {minWeight}.
            </p>
        )
    } else if (maxWeight && data.weight_to > maxWeight - 1) {
        weightToError = (
            <p className={'text-sm text-red-600 mt-2'}>
                Bobot sampai tidak boleh lebih besar dari {maxWeight - 1}.
            </p>
        )
    }

    return (
        <AuthenticatedLayout>
            <Head title="Edit Data Sanksi" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Edit Data Sanksi">
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
                                Edit
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
                                heading="Edit Bentuk Pelanggaran"
                                desc="Perbarui informasi bentuk pelanggaran sesuai dengan informasi yang diperlukan."
                            />

                            <FormContainer.Content>
                                <FormContainer.Input
                                    htmlFor="sanction"
                                    label="Sanksi"
                                    errorMessage={errors.sanction}
                                    className="lg:w-7/12"
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
                                    desc={
                                        sanction.weight_from !== 1
                                            ? weightFromDesc
                                            : ''
                                    }
                                    errorMessage={errors.weight_from}
                                >
                                    <TextInput
                                        id="weight_from"
                                        type="number"
                                        className={`mt-1 block w-full ${
                                            data.weight_from >=
                                            sanction.weight_to
                                                ? 'border-red-700'
                                                : ''
                                        }`}
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
                                        required={sanction.weight_from !== 1}
                                        readOnly={sanction.weight_from === 1}
                                        disabled={sanction.weight_from === 1}
                                        autoComplete="weight_from"
                                        placeholder="Masukan bobot dari"
                                    />
                                    {weightFromError}
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="weight_to"
                                    label="Bobot sampai"
                                    desc={weightToDesc}
                                    errorMessage={errors.weight_to}
                                >
                                    <TextInput
                                        id="weight_to"
                                        type="number"
                                        className={`mt-1 block w-full ${
                                            data.weight_to <=
                                            sanction.weight_from
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
                                    {weightToError}
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
                                        data.weight_to <= data.weight_from ||
                                        (maxWeight
                                            ? data.weight_to > maxWeight - 1
                                            : false)
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
