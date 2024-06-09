import { useEffect, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcumb from '@/Components/Other/Breadcumb'
import Indicator from '@/Components/Other/Indicator'
import BackButton from '@/Components/Button/BackButton'
import TextInput from '@/Components/Form/TextInput'
import FormContainer from '@/Components/Container/FormContainer'
import ResetButton from '@/Components/Button/ResetButton'
import ConfirmPasswordModal from '@/Components/Modal/ConfirmModal'
import DefaultAvatar from '@/Assets/Img/Avatar/DefaultAvatar.jpg'
import { LuCamera } from 'react-icons/lu'

export default function Edit({ auth }: PageProps) {
    const { data, setData, post, errors, reset, processing } = useForm({
        name: auth?.admin?.user.name,
        username: auth?.admin?.user?.username,
        password: '',
        photo: `/storage/${auth?.admin?.user?.photo}`,
        old_photo: auth?.admin?.user?.photo,
    })

    const [confirmingProfileUpdate, setConfirmingProfileUpdate] =
        useState<boolean>(false)

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

    function confirmProfileUpdate() {
        setConfirmingProfileUpdate(true)
    }

    function closeModal() {
        setConfirmingProfileUpdate(false)
        reset('password')
    }

    function resetForm() {
        reset()
    }

    function submit(e: React.FormEvent) {
        e.preventDefault()

        post(route('admin.dashboard.profile.update'))
    }

    useEffect(() => {
        reset('password')
    }, [])

    return (
        <AuthenticatedLayout>
            <Head title="Edit Profil" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Edit Profil">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route('admin.dashboard.settings.index')}
                            >
                                Pengaturan
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route('admin.dashboard.profile.index')}
                            >
                                Profil
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Edit
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={route('admin.dashboard.profile.index')}
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
                                heading="Edit Profil"
                                desc="Perbarui informasi akun anda sesuai dengan informasi yang diperlukan."
                            />

                            <FormContainer.Content>
                                <FormContainer.Input
                                    label="Foto"
                                    errorMessage={errors.photo}
                                    className="w-7/12"
                                >
                                    <div className="w-36 lg:w-44 h-fit aspect-square rounded-xl shadow border outline-2 p-1.5 relative">
                                        <img
                                            src={previewImage ?? DefaultAvatar}
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
                                    htmlFor="username"
                                    label="Username"
                                    errorMessage={errors.username}
                                >
                                    <TextInput
                                        id="username"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.username}
                                        required
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                username:
                                                    e.target.value.toLowerCase(),
                                            }))
                                        }
                                        autoComplete="off"
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="name"
                                    label="Nama"
                                    errorMessage={errors.name}
                                >
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        required
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                name: e.target.value,
                                            }))
                                        }
                                        autoComplete="off"
                                    />
                                </FormContainer.Input>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <ResetButton onClick={resetForm} />
                                <button
                                    type="button"
                                    onClick={confirmProfileUpdate}
                                    className="text-white bg-blue-500 transition-all duration-200 hover:bg-blue-600 w-full py-2 px-6 rounded lg:rounded-md text-xs lg:text-sm shadow"
                                >
                                    Ubah
                                </button>
                            </FormContainer.Buttons>
                        </FormContainer>
                        <ConfirmPasswordModal
                            show={confirmingProfileUpdate}
                            onClose={closeModal}
                            submit={submit}
                            maxWidth="lg"
                        >
                            <ConfirmPasswordModal.Title>
                                Apa kamu yakin ingin memperbarui profil?
                            </ConfirmPasswordModal.Title>

                            <ConfirmPasswordModal.Text>
                                Pastikan profil yang baru sesuai dengan profil
                                yang diinginkan.
                            </ConfirmPasswordModal.Text>
                            <FormContainer.Input
                                htmlFor="password"
                                label="Password"
                                errorMessage={errors.password}
                                className="w-full mt-6"
                            >
                                <TextInput
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData((prevData) => ({
                                            ...prevData,
                                            password: e.target.value,
                                        }))
                                    }
                                    value={data.password}
                                    required
                                    isFocused
                                    autoComplete="off"
                                    placeholder="Masukan password"
                                />
                            </FormContainer.Input>
                            <ConfirmPasswordModal.Button
                                closeModal={closeModal}
                                disabled={processing || data.password === ''}
                            />
                        </ConfirmPasswordModal>
                    </form>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
