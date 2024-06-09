import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import FormContainer from '@/Components/Container/FormContainer'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import BackButton from '@/Components/Button/BackButton'

export default function Create({
    auth,
    majors,
}: PageProps & CreateMajorPageProps) {
    const { data, setData, post, errors, reset, processing } = useForm({
        id: '',
        name: '',
        abbreviation: '',
        head_of_program: '',
        existingMajor: false,
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()

        post(route('admin.dashboard.majors.store'))
    }

    function resetForm() {
        reset()
    }

    useEffect(() => {
        reset('existingMajor')
        const foundMajor = majors.find((major: Major) => major.id === data.id)

        if (foundMajor) {
            setData('existingMajor', true)
        }
        setData((prevData) => ({
            ...prevData,
            id: data.abbreviation.toLowerCase(),
        }))
    }, [data.abbreviation, data.existingMajor, data.id])

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Data Jurusan" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Tambah Data Jurusan">
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
                                Tambah
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
                <section className="w-full h-auto">
                    <form
                        onSubmit={submit}
                        className="w-full h-auto flex gap-5 mb-24"
                    >
                        <FormContainer>
                            <FormContainer.Heading
                                heading="Informasi Jurusan"
                                desc="Lengkapi informasi jurusan dengan lengkap."
                            />

                            <FormContainer.Content>
                                <FormContainer.Input
                                    htmlFor="id"
                                    label="ID Jurusan"
                                    errorMessage={errors.id}
                                    className="lg:w-7/12 mt-0"
                                >
                                    <TextInput
                                        id="id"
                                        type="text"
                                        className={`mt-1 block w-full ${
                                            data.existingMajor
                                                ? 'border-red-600 border'
                                                : ''
                                        }`}
                                        value={data.id}
                                        disabled
                                        readOnly
                                    />
                                    {data.existingMajor && (
                                        <p
                                            className={
                                                'text-xs lg:text-sm text-red-600 mt-2'
                                            }
                                        >
                                            Jurusan {data.id.toUpperCase()}{' '}
                                            sudah ada.
                                        </p>
                                    )}
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="name"
                                    label="Nama Jurusan"
                                    errorMessage={errors.name}
                                >
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                name: e.target.value,
                                            }))
                                        }
                                        value={data.name}
                                        required
                                        isFocused
                                        placeholder="Masukan nama jurusan"
                                        autoComplete="off"
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="abbreviation"
                                    label="Singkatan Jurusan"
                                    errorMessage={errors.abbreviation}
                                >
                                    <TextInput
                                        id="abbreviation"
                                        type="text"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                abbreviation:
                                                    e.target.value.toUpperCase(),
                                            }))
                                        }
                                        value={data.abbreviation}
                                        required
                                        placeholder="Masukan nama jurusan"
                                        autoComplete="off"
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="head_of_program"
                                    label="Nama Kaprodi"
                                    errorMessage={errors.head_of_program}
                                >
                                    <TextInput
                                        id="head_of_program"
                                        type="text"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                head_of_program: e.target.value,
                                            }))
                                        }
                                        value={data.head_of_program}
                                        required
                                        placeholder="Masukan nama kaprodi jurusan"
                                    />
                                </FormContainer.Input>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <ResetButton onClick={resetForm} />
                                <SubmitButton
                                    disabled={data.existingMajor || processing}
                                />
                            </FormContainer.Buttons>
                        </FormContainer>
                    </form>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
