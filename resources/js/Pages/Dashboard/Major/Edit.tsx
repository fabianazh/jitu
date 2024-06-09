import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import FormContainer from '@/Components/Container/FormContainer'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import BackButton from '@/Components/Button/BackButton'

export default function Edit({
    auth,
    majors,
    major,
}: PageProps & EditMajorPageProps) {
    const { data, setData, put, errors, reset, processing } = useForm({
        id: major.id,
        name: major.name,
        abbreviation: major.abbreviation,
        head_of_program: major.head_of_program,
        existingMajor: false,
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()

        put(route('admin.dashboard.majors.update', { major: major }))
    }

    function resetForm() {
        reset()
    }

    useEffect(() => {
        reset('existingMajor')
        const foundMajor = majors.find((major: Major) => major.id === data.id)

        if (foundMajor) {
            if (foundMajor.id !== major.id) {
                setData('existingMajor', true)
            }
        }

        setData((prevData) => ({
            ...prevData,
            id: data.abbreviation.toLowerCase(),
        }))
    }, [data.existingMajor, data.abbreviation, data.id])

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Jurusan ${major.name}`} />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title={`Edit Jurusan ${major.name}`}>
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
                                Edit
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
                                heading={`Edit Jurusan ${major.name}`}
                                desc="Perbarui informasi jurusan sesuai dengan informasi yang diperlukan."
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
                                                ? 'border-red-600'
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
                                            Jurusan sudah ada
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
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="head_of_program"
                                    label="Ketua Program Keahlian"
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
                                        autoComplete="off"
                                        placeholder="Masukan nama kaprodi"
                                    />
                                </FormContainer.Input>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <ResetButton onClick={resetForm} />
                                <SubmitButton disabled={data.existingMajor} />
                            </FormContainer.Buttons>
                        </FormContainer>
                    </form>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
