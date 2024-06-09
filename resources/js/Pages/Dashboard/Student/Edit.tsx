import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import SelectInput from '@/Components/Form/SelectInput'
import TextareaInput from '@/Components/Form/TextareaInput'
import DefaultAvatar from '@/Assets/Img/Avatar/DefaultAvatar.jpg'
import FormContainer from '@/Components/Container/FormContainer'
import TabsContainer from '@/Components/Other/Tabs'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import BackButton from '@/Components/Button/BackButton'
import { LuCamera } from 'react-icons/lu'

export default function Edit({
    auth,
    student,
    classes,
}: PageProps & EditStudentPageProps) {
    const { data, setData, post, errors, reset, processing } = useForm({
        nis: student.nis,
        name: student.name,
        grade_id: student.class_name.toLowerCase(),
        date_of_birth: student.date_of_birth,
        gender: student.gender,
        address: student.address,
        photo: `/storage/${student.photo}`,
        old_photo: student.photo,
        phone: student.phone,
        parents_phone: student.parents_phone,
        status: student.status,
    })

    const [previewImage, setPreviewImage] = useState<string | null>(
        typeof data.photo === 'string' ? data.photo : null
    )

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const fileInput = event.target as HTMLInputElement
        const file = fileInput.files?.[0]

        if (file) {
            const previewImageURL = URL.createObjectURL(file)

            setPreviewImage(previewImageURL)
            setData((prevData) => ({
                ...prevData,
                photo: file as unknown as string,
            }))
        }
    }

    function submit(e: React.FormEvent) {
        e.preventDefault()

        post(route('admin.dashboard.students.update', { student: student }))
    }

    function resetForm() {
        reset()
    }

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Informasi ${student.name}`} />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title={`Edit Informasi ${student.name}`}>
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
                                Edit
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
                    <form
                        onSubmit={submit}
                        encType="multipart/form-data"
                        className="w-full h-auto flex gap-5 mb-24"
                    >
                        <FormContainer>
                            <FormContainer.Heading
                                heading={`Edit Informasi ${student.name}`}
                                desc="Perbarui informasi data siswa sesuai dengan informasi yang diperlukan."
                            />

                            <FormContainer.Content>
                                <TabsContainer>
                                    <TabsContainer.Tab label="Biodata Siswa">
                                        <FormContainer.Input
                                            label="Foto"
                                            errorMessage={errors.photo}
                                        >
                                            <div className="w-36 lg:w-44 h-fit aspect-square rounded-xl shadow border outline-2 p-1.5 relative">
                                                <img
                                                    src={previewImage ?? ''}
                                                    alt={data.name}
                                                    className="w-full h-auto aspect-square rounded-lg shadow-sm border"
                                                    draggable={false}
                                                />
                                                <label
                                                    htmlFor="photo"
                                                    className="absolute cursor-pointer z-20 -right-2 -bottom-2 bg-white rounded-full border shadow-sm w-10 aspect-square grid place-items-center"
                                                >
                                                    <LuCamera className="text-xl" />
                                                </label>

                                                <input
                                                    id="photo"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="sr-only"
                                                />
                                            </div>
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="nis"
                                            label="NIS"
                                            errorMessage={errors.nis}
                                            desc="*min : 12, max : 16"
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
                                                value={data.nis}
                                                required
                                                isFocused
                                                autoComplete="nis"
                                                placeholder="Masukan nis siswa"
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="name"
                                            label="Nama Lengkap"
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
                                                autoComplete="name"
                                                placeholder="Masukan nama lengkap siswa"
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="date_of_birth"
                                            label="Tanggal Lahir"
                                            errorMessage={errors.date_of_birth}
                                        >
                                            <TextInput
                                                id="date_of_birth"
                                                type="date"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        date_of_birth:
                                                            e.target.value,
                                                    }))
                                                }
                                                value={data.date_of_birth}
                                                autoComplete="date_of_birth"
                                                required
                                                placeholder="Masukan tanggal lahir siswa"
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="gender"
                                            label="Jenis Kelamin"
                                            errorMessage={errors.gender}
                                        >
                                            <SelectInput
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        gender: e.target.value,
                                                    }))
                                                }
                                                value={data.gender}
                                                defaultOption="Pilih jenis kelamin siswa"
                                                required
                                            >
                                                <option value={'Laki-Laki'}>
                                                    Laki-Laki
                                                </option>
                                                <option value={'Perempuan'}>
                                                    Perempuan
                                                </option>
                                            </SelectInput>
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="phone"
                                            label="No Telepon Siswa"
                                            errorMessage={errors.phone}
                                        >
                                            <TextInput
                                                id="phone"
                                                type="number"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        phone: e.target.value,
                                                    }))
                                                }
                                                value={data.phone}
                                                autoComplete="phone"
                                                placeholder="Masukan no telepon siswa"
                                            />
                                            {data.phone !== '' &&
                                                data.parents_phone !== '' &&
                                                data.parents_phone ===
                                                    data.phone && (
                                                    <p
                                                        className={
                                                            'text-xs lg:text-sm text-red-600 mt-2'
                                                        }
                                                    >
                                                        No HP Siswa tidak boleh
                                                        sama dengan No HP Wali
                                                        Siswa.
                                                    </p>
                                                )}
                                        </FormContainer.Input>
                                    </TabsContainer.Tab>
                                    <TabsContainer.Tab label="Lainnya">
                                        <FormContainer.Input
                                            htmlFor="status"
                                            label="Status"
                                            errorMessage={errors.status}
                                        >
                                            <SelectInput
                                                id="status"
                                                name="status"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        status: e.target.value,
                                                    }))
                                                }
                                                value={data.status}
                                                defaultOption={data.status}
                                                required
                                                disabled={student.points >= 30}
                                            >
                                                <option
                                                    value="Aktif"
                                                    selected={
                                                        data.status === 'Aktif'
                                                    }
                                                >
                                                    Aktif
                                                </option>
                                                <option
                                                    value="Lulus"
                                                    selected={
                                                        data.status === 'Lulus'
                                                    }
                                                >
                                                    Lulus
                                                </option>
                                                {data.status === 'Dropout' && (
                                                    <option
                                                        value="Dropout"
                                                        selected={
                                                            data.status ===
                                                            'Dropout'
                                                        }
                                                    >
                                                        Dropout
                                                    </option>
                                                )}
                                            </SelectInput>
                                            {student.points >= 30 && (
                                                <p
                                                    className={
                                                        'text-xs lg:text-sm text-red-600 mt-2'
                                                    }
                                                >
                                                    Status siswa tidak dapat
                                                    diubah jika siswa telah
                                                    melebihi batas poin.
                                                </p>
                                            )}
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="grade_id"
                                            label="Kelas"
                                            errorMessage={errors.grade_id}
                                        >
                                            <SelectInput
                                                id="grade_id"
                                                name="grade_id"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        grade_id:
                                                            e.target.value,
                                                    }))
                                                }
                                                value={data.grade_id}
                                                defaultOption={data.grade_id}
                                                required
                                            >
                                                <>
                                                    {classes
                                                        .sort((a, b) =>
                                                            a.major.localeCompare(
                                                                b.major
                                                            )
                                                        )
                                                        .map((item: Class) => (
                                                            <option
                                                                key={item.id}
                                                                value={`${item.id}`}
                                                            >
                                                                {
                                                                    item.class_name
                                                                }
                                                            </option>
                                                        ))}
                                                </>
                                            </SelectInput>
                                        </FormContainer.Input>
                                        <FormContainer.Input
                                            htmlFor="phone"
                                            label="No Telepon Wali Siswa"
                                            errorMessage={errors.parents_phone}
                                        >
                                            <TextInput
                                                id="parents_phone"
                                                type="number"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        parents_phone:
                                                            e.target.value,
                                                    }))
                                                }
                                                value={data.parents_phone}
                                                autoComplete="parents_phone"
                                                placeholder="Masukan no telepon wali siswa"
                                            />
                                            {data.phone !== '' &&
                                                data.parents_phone !== '' &&
                                                data.parents_phone ===
                                                    data.phone && (
                                                    <p
                                                        className={
                                                            'text-xs lg:text-sm text-red-600 mt-2'
                                                        }
                                                    >
                                                        No HP Siswa tidak boleh
                                                        sama dengan No HP Wali
                                                        Siswa.
                                                    </p>
                                                )}
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="address"
                                            label="Alamat"
                                            errorMessage={errors.address}
                                            desc="*opsional"
                                        >
                                            <TextareaInput
                                                id="address"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        address: e.target.value,
                                                    }))
                                                }
                                                value={data.address}
                                                autoComplete="address"
                                                placeholder="Masukan alamat siswa"
                                                rows={4}
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
