import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import SelectInput from '@/Components/Form/SelectInput'
import FormContainer from '@/Components/Container/FormContainer'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import TabsContainer from '@/Components/Other/Tabs'
import { ToastContainer, toast } from 'react-toastify'
import BackButton from '@/Components/Button/BackButton'

export default function Create({
    auth,
    majors,
    classes,
}: PageProps & CreateClassPageProps) {
    const { data, setData, post, errors, reset, processing } = useForm({
        id: '',
        grade: '',
        major_id: '',
        class_number: '-1',
        homeroom_teacher: '',
        existingClass: false,
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()

        post(route('admin.dashboard.classes.store'))
    }

    function resetForm() {
        reset()
    }

    useEffect(() => {
        reset('existingClass')
        const foundClass = classes.find((item: Class) => item.id === data.id)

        if (foundClass) {
            setData('existingClass', true)
        }
        setData((prevData) => ({
            ...prevData,
            id: `${data.grade}-${data.major_id}${data.class_number}`,
        }))
    }, [
        data.class_number,
        data.existingClass,
        data.grade,
        data.id,
        data.major_id,
    ])

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Data Kelas" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Tambah Data Kelas">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route('admin.dashboard.classes.index')}
                            >
                                Kelas
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Tambah
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
                    <form
                        onSubmit={submit}
                        className="w-full h-auto flex gap-5 mb-24"
                    >
                        <FormContainer>
                            <FormContainer.Heading
                                heading="Informasi Kelas"
                                desc="Lengkapi informasi kelas dengan lengkap."
                            />

                            <FormContainer.Content>
                                <FormContainer.Input
                                    htmlFor="id"
                                    label="ID Kelas"
                                    errorMessage={errors.id}
                                    className="lg:w-7/12"
                                >
                                    <TextInput
                                        id="id"
                                        type="text"
                                        className={`mt-1 block w-full ${
                                            data.existingClass
                                                ? 'border-red-600'
                                                : ''
                                        }`}
                                        value={
                                            data.grade === '' &&
                                            data.major_id === ''
                                                ? '-'
                                                : data.id
                                        }
                                        disabled
                                        readOnly
                                    />
                                    {data.existingClass && (
                                        <p
                                            className={
                                                'text-xs lg:text-sm text-red-600 mt-2'
                                            }
                                        >
                                            Data kelas sudah ada
                                        </p>
                                    )}
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="grade"
                                    label="Kelas"
                                    errorMessage={errors.grade}
                                >
                                    <SelectInput
                                        id="grade"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                grade: e.target.value,
                                            }))
                                        }
                                        value={data.grade}
                                        defaultOption="Pilih kelas"
                                        isFocused
                                        required
                                    >
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                    </SelectInput>
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="major_id"
                                    label="Jurusan"
                                    errorMessage={errors.major_id}
                                >
                                    <SelectInput
                                        id="major_id"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                major_id: e.target.value,
                                            }))
                                        }
                                        value={data.major_id}
                                        defaultOption="Pilih jurusan"
                                        required
                                    >
                                        {majors.map((major: Major) => (
                                            <option
                                                key={major.id}
                                                value={major.id}
                                            >
                                                {major.name} (
                                                {major.abbreviation})
                                            </option>
                                        ))}
                                    </SelectInput>
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="class_number"
                                    label="Nomor Kelas"
                                    errorMessage={errors.class_number}
                                    desc="*opsional"
                                >
                                    <SelectInput
                                        id="class_number"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                class_number: e.target.value,
                                            }))
                                        }
                                        value={data.class_number}
                                        defaultOption={data.class_number}
                                        required
                                    >
                                        <option value={'-1'}>1</option>
                                        <option value={'-2'}>2</option>
                                        <option value={'-3'}>3</option>
                                        <option value={'-4'}>4</option>
                                    </SelectInput>
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="homeroom_teacher"
                                    label="Wali Kelas"
                                    errorMessage={errors.homeroom_teacher}
                                >
                                    <TextInput
                                        id="homeroom_teacher"
                                        type="text"
                                        className={`mt-1 block w-full`}
                                        value={data.homeroom_teacher}
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                homeroom_teacher:
                                                    e.target.value,
                                            }))
                                        }
                                        placeholder="Masukan nama wali kelas"
                                        autoComplete="off"
                                        required
                                    />
                                </FormContainer.Input>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <ResetButton onClick={resetForm} />
                                <SubmitButton
                                    disabled={
                                        processing ||
                                        data.existingClass === true
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
