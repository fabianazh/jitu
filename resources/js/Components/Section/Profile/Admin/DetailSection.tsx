import TextInput from '@/Components/Form/TextInput'
import FormContainer from '@/Components/Container/FormContainer'
import RedirectButton from '@/Components/Button/RedirectButton'
import { Link, useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import TabsContainer from '@/Components/Other/Tabs'
import PasswordInput from '@/Components/Form/PasswordInput'
import ResetButton from '@/Components/Button/ResetButton'

export default function DetailSection({ auth }: PageProps & ProfilePageProps) {
    const { data, setData, put, errors, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const [confirmPasswordError, setConfirmPasswordError] =
        useState<boolean>(false)

    function resetForm() {
        reset()
    }

    function submit(e: React.FormEvent) {
        e.preventDefault()

        put(route('admin.dashboard.profile.change-password'), {
            onSuccess: () => reset(),
            onError: () => reset(),
        })
    }

    useEffect(() => {
        if (
            data.password_confirmation !== '' &&
            data.password !== data.password_confirmation
        ) {
            setConfirmPasswordError(true)
        } else {
            setConfirmPasswordError(false)
        }
    }, [data.password, data.password_confirmation])

    return (
        <section className="w-full h-auto">
            <form onSubmit={submit} className="w-full h-auto flex gap-5 mb-24">
                <FormContainer>
                    <FormContainer.Heading
                        heading="Informasi Akun"
                        desc="Detail informasi akun anda."
                    />

                    <FormContainer.Content>
                        <TabsContainer>
                            <TabsContainer.Tab label="Informasi Akun">
                                {' '}
                                <FormContainer.Input label="Foto">
                                    <div className="w-36 lg:w-44 h-fit aspect-square rounded-xl overflow-hidden shadow border outline-2 p-1.5">
                                        <img
                                            src={`/storage/${auth?.admin?.user.photo}`}
                                            alt={auth?.admin?.user.name}
                                            className="w-full h-auto aspect-square rounded-lg shadow-sm border"
                                            draggable={false}
                                        />
                                    </div>
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="username"
                                    label="Username"
                                >
                                    <TextInput
                                        id="username"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={auth?.admin?.user.username}
                                        readOnly
                                        autoComplete="off"
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="name"
                                    label="Nama"
                                >
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={auth?.admin?.user.name}
                                        readOnly
                                        autoComplete="off"
                                    />
                                </FormContainer.Input>
                                <FormContainer.Buttons className="mt-7">
                                    <RedirectButton
                                        href={route(
                                            'admin.dashboard.profile.edit'
                                        )}
                                        className={'w-fit inline-block px-0'}
                                        text="Ubah Profil"
                                    />
                                </FormContainer.Buttons>
                            </TabsContainer.Tab>
                            <TabsContainer.Tab label="Ganti Password">
                                <FormContainer.Input
                                    htmlFor="current_password"
                                    label="Password"
                                    errorMessage={errors.current_password}
                                >
                                    <PasswordInput
                                        id="current_password"
                                        className="mt-1 block w-full"
                                        value={data.current_password}
                                        required
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                current_password:
                                                    e.target.value.toLowerCase(),
                                            }))
                                        }
                                        autoComplete="off"
                                        placeholder="Masukan password anda"
                                    />
                                </FormContainer.Input>

                                <FormContainer.Input
                                    htmlFor="password"
                                    label="Password Baru"
                                    errorMessage={errors.password}
                                    desc="*min : 8, max : 16"
                                >
                                    <PasswordInput
                                        id="password"
                                        className="mt-1 block w-full"
                                        value={data.password}
                                        required
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                password: e.target.value,
                                            }))
                                        }
                                        autoComplete="off"
                                        placeholder="Masukan password baru"
                                    />
                                    {data.password.length < 8 &&
                                        data.password.length !== 0 && (
                                            <p
                                                className={
                                                    'text-xs lg:text-sm text-red-600 mt-2'
                                                }
                                            >
                                                Password harus terdiri dari
                                                minimal 8 karakter.
                                            </p>
                                        )}
                                    {data.password.length > 16 && (
                                        <p
                                            className={
                                                'text-xs lg:text-sm text-red-600 mt-2'
                                            }
                                        >
                                            Password tidak boleh lebih dari 16
                                            karakter.
                                        </p>
                                    )}
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="password_confirmation"
                                    label="Konfirmasi Password Baru"
                                    errorMessage={errors.password_confirmation}
                                    desc="*min : 8, max : 16"
                                >
                                    <PasswordInput
                                        id="password_confirmation"
                                        className={`mt-1 block w-full ${
                                            confirmPasswordError
                                                ? 'border-red-700 outline-red-700'
                                                : ''
                                        }`}
                                        value={data.password_confirmation}
                                        required
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                password_confirmation:
                                                    e.target.value,
                                            }))
                                        }
                                        autoComplete="off"
                                        placeholder="Konfirmasi password baru"
                                    />
                                    {data.password_confirmation.length < 8 &&
                                        data.password_confirmation.length !==
                                            0 && (
                                            <p
                                                className={
                                                    'text-xs lg:text-sm text-red-600 mt-2'
                                                }
                                            >
                                                Password harus terdiri dari
                                                minimal 8 karakter.
                                            </p>
                                        )}
                                    {data.password_confirmation.length > 16 && (
                                        <p
                                            className={
                                                'text-xs lg:text-sm text-red-600 mt-2'
                                            }
                                        >
                                            Password tidak boleh lebih dari 16
                                            karakter.
                                        </p>
                                    )}
                                    {confirmPasswordError && (
                                        <p
                                            className={
                                                'text-xs lg:text-sm text-red-600 mt-2'
                                            }
                                        >
                                            Password tidak sesuai.
                                        </p>
                                    )}
                                </FormContainer.Input>
                                {confirmPasswordError}
                                <FormContainer.Buttons className="mt-7">
                                    <ResetButton onClick={resetForm} />
                                    <button
                                        type="submit"
                                        disabled={
                                            processing ||
                                            data.password !==
                                                data.password_confirmation
                                        }
                                        className="text-white bg-blue-500 w-full py-2 px-6 rounded lg:rounded-md text-xs lg:text-sm shadow"
                                    >
                                        Ubah
                                    </button>
                                </FormContainer.Buttons>
                            </TabsContainer.Tab>
                        </TabsContainer>
                    </FormContainer.Content>
                </FormContainer>
            </form>
        </section>
    )
}
