import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useEffect, useRef, useState } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/Form/TextInput'
import SelectInput from '@/Components/Form/SelectInput'
import TextareaInput from '@/Components/Form/TextareaInput'
import DefaultAvatar from '@/Assets/Img/Avatar/DefaultAvatar.jpg'
import FormContainer from '@/Components/Container/FormContainer'
import TabsContainer from '@/Components/Other/Tabs'
import ResetButton from '@/Components/Button/ResetButton'
import SubmitButton from '@/Components/Button/SubmitButton'
import getCurrentYear from '@/Utils/GetCurrentYear'
import BackButton from '@/Components/Button/BackButton'
import { LuCamera } from 'react-icons/lu'

export default function Create({
    auth,
    classes,
}: PageProps & CreateStudentPageProps) {
    const currentYear = getCurrentYear()

    const { data, setData, post, errors, reset, processing } = useForm({
        nis: '',
        name: '',
        class_name: '',
        date_of_birth: '',
        gender: '',
        address: '',
        photo: File || null,
        phone: '',
        parents_phone: '',
        password: `Pasim${currentYear}`,
    })

    const [previewImage, setPreviewImage] = useState<string | null>(null)

    function submit(e: React.FormEvent) {
        e.preventDefault()

        post(route('admin.dashboard.students.store'))
    }

    function resetForm() {
        reset()
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const fileInput = event.target as HTMLInputElement
        const file = fileInput.files?.[0]

        if (file) {
            const previewImageURL = URL.createObjectURL(file)

            setPreviewImage(previewImageURL)

            setData(
                (prevData) =>
                    ({
                        ...prevData,
                        photo: file,
                    } as any)
            )
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Data Siswa" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Tambah Data Siswa">
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
                                Tambah
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
                                heading="Informasi Siswa"
                                desc="Lengkapi informasi siswa dengan lengkap."
                            />

                            <FormContainer.Content>
                                <TabsContainer>
                                    <TabsContainer.Tab label="Biodata Siswa">
                                        <FormContainer.Input label="Foto">
                                            <div className="w-36 lg:w-44 h-fit aspect-square rounded-xl shadow border outline-2 p-1.5 relative">
                                                <img
                                                    src={
                                                        previewImage ??
                                                        DefaultAvatar
                                                    }
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
                                                    accept=".png, .jpg, .jpeg"
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
                                                className="mt-1 block w-full "
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
                                    <TabsContainer.Tab label="Akun Siswa">
                                        <FormContainer.Input
                                            htmlFor="nis"
                                            label="NIS"
                                        >
                                            <TextInput
                                                id="nis"
                                                className="mt-1 block w-full"
                                                placeholder="NIS siswa"
                                                value={data.nis}
                                                readOnly
                                                disabled
                                            />
                                        </FormContainer.Input>

                                        <FormContainer.Input
                                            htmlFor="password"
                                            label="Password"
                                            errorMessage={errors.password}
                                            desc={`*Default : Pasim${currentYear}`}
                                        >
                                            <TextInput
                                                id="password"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        password:
                                                            e.target.value,
                                                    }))
                                                }
                                                value={data.password}
                                                required
                                                autoComplete="password"
                                                placeholder="Masukan password akun siswa"
                                            />
                                        </FormContainer.Input>
                                    </TabsContainer.Tab>
                                    <TabsContainer.Tab label="Lainnya">
                                        <FormContainer.Input
                                            htmlFor="class_name"
                                            label="Kelas"
                                            errorMessage={errors.class_name}
                                        >
                                            <SelectInput
                                                id="class_name"
                                                name="class_name"
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        class_name:
                                                            e.target.value,
                                                    }))
                                                }
                                                value={data.class_name}
                                                defaultOption="Pilih kelas siswa"
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
