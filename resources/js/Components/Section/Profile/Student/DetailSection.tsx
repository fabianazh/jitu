import TextInput from '@/Components/Form/TextInput'
import TextareaInput from '@/Components/Form/TextareaInput'
import FormContainer from '@/Components/Container/FormContainer'
import TabsContainer from '@/Components/Other/Tabs'
import DefaultAvatar from '@/Assets/Img/Avatar/DefaultAvatar.jpg'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import ResetButton from '@/Components/Button/ResetButton'
import PasswordInput from '@/Components/Form/PasswordInput'

export default function DetailSection({ auth }: PageProps) {
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

        put(route('student.dashboard.profile.update'), {
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
                        heading="Informasi Anda"
                        desc="Detail informasi anda."
                    />

                    <FormContainer.Content>
                        <TabsContainer>
                            <TabsContainer.Tab label="Biodata Anda">
                                <FormContainer.Input label="Foto">
                                    <div className="w-36 lg:w-44 h-fit aspect-square rounded-xl overflow-hidden shadow border outline-2 p-1.5">
                                        <img
                                            src={`/storage/${auth?.student?.user.photo}`}
                                            alt={auth?.student?.user?.name}
                                            className="w-full h-auto aspect-square rounded-lg shadow-sm border"
                                            draggable={false}
                                        />
                                    </div>
                                </FormContainer.Input>

                                <FormContainer.Input htmlFor="nis" label="NIS">
                                    <TextInput
                                        id="nis"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={auth?.student?.user?.nis}
                                        readOnly
                                        autoComplete="off"
                                    />
                                </FormContainer.Input>

                                <FormContainer.Input
                                    htmlFor="name"
                                    label="Nama Lengkap"
                                >
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={auth?.student?.user?.name}
                                        readOnly
                                        autoComplete="off"
                                    />
                                </FormContainer.Input>

                                <FormContainer.Input
                                    htmlFor="date_of_birth"
                                    label="Tanggal Lahir"
                                >
                                    <TextInput
                                        id="date_of_birth"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={
                                            auth?.student?.user?.date_of_birth
                                        }
                                        autoComplete="off"
                                        readOnly
                                    />
                                </FormContainer.Input>

                                <FormContainer.Input
                                    htmlFor="gender"
                                    label="Jenis Kelamin"
                                >
                                    <TextInput
                                        id="gender"
                                        className="mt-1 block w-full"
                                        value={auth?.student?.user?.gender}
                                        readOnly
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="phone"
                                    label="No Telepon"
                                >
                                    <TextInput
                                        id="phone"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={auth?.student?.user?.phone}
                                        autoComplete="off"
                                        readOnly
                                    />
                                </FormContainer.Input>

                                <FormContainer.Input
                                    htmlFor="address"
                                    label="Alamat"
                                >
                                    <TextareaInput
                                        id="address"
                                        className="mt-1 block w-full"
                                        value={auth?.student?.user?.address}
                                        autoComplete="off"
                                        rows={4}
                                        readOnly
                                    />
                                </FormContainer.Input>
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
                                <FormContainer.Buttons className="mt-3 lg:mt-7">
                                    <ResetButton onClick={resetForm} />
                                    <button
                                        type="submit"
                                        disabled={
                                            processing ||
                                            data.password !==
                                                data.password_confirmation ||
                                            data.password.length < 8 ||
                                            data.password.length > 16 ||
                                            data.password_confirmation.length <
                                                8 ||
                                            data.password_confirmation.length >
                                                16
                                        }
                                        className="text-white bg-blue-500 w-full py-2 px-6 rounded lg:rounded-md text-xs lg:text-sm shadow"
                                    >
                                        Ubah
                                    </button>
                                </FormContainer.Buttons>
                            </TabsContainer.Tab>
                            <TabsContainer.Tab label="Lainnya">
                                <FormContainer.Input
                                    htmlFor="status"
                                    label="Status"
                                >
                                    <TextInput
                                        id="status"
                                        name="status"
                                        className="mt-1 block w-full"
                                        value={auth?.student?.user?.status}
                                        readOnly
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="class_name"
                                    label="Kelas"
                                >
                                    <TextInput
                                        id="class_name"
                                        name="class_name"
                                        className="mt-1 block w-full"
                                        value={auth?.student?.user?.class_name}
                                        readOnly
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="phone"
                                    label="No Telepon Wali"
                                >
                                    <TextInput
                                        id="parents_phone"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={
                                            auth?.student?.user?.parents_phone
                                        }
                                        autoComplete="off"
                                        readOnly
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="points"
                                    label="Total Poin"
                                >
                                    <TextInput
                                        id="points"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={`${auth?.student?.user?.points} Poin`}
                                        autoComplete="off"
                                        readOnly
                                    />
                                </FormContainer.Input>
                                <FormContainer.Input
                                    htmlFor="totalViolations"
                                    label="Total Pelanggaran"
                                >
                                    <TextInput
                                        id="totalViolations"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={`${auth?.student?.user?.totalViolations} Pelanggaran`}
                                        autoComplete="off"
                                        readOnly
                                    />
                                </FormContainer.Input>
                            </TabsContainer.Tab>
                        </TabsContainer>
                    </FormContainer.Content>
                </FormContainer>
            </form>
        </section>
    )
}
