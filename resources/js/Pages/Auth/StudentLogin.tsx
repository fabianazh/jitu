import { useEffect, useState, FormEvent } from 'react'
import Checkbox from '@/Components/Form/Checkbox'
import AuthLayout from '@/Layouts/AuthLayout'
import InputError from '@/Components/Form/InputError'
import InputLabel from '@/Components/Form/InputLabel'
import TextInput from '@/Components/Form/TextInput'
import { Head, Link, useForm } from '@inertiajs/react'
import SignInIllustartion from '@/Assets/Illustration/journal-effective-social-media-marketing-strategies.png'

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import PasswordInput from '@/Components/Form/PasswordInput'

export default function StudentLogin({
    status,
    canResetPassword,
}: {
    status?: string
    canResetPassword: boolean
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nis: '',
        password: '',
        remember: false,
    })

    function submit(e: FormEvent) {
        e.preventDefault()

        post(route('student.login.store'), {
            onError: () => reset('password'),
        })
    }

    return (
        <AuthLayout>
            <Head title="Jitu! Login" />

            <AuthLayout.Visualizer
                illustration={SignInIllustartion as unknown as string}
                altText="p"
                quotes="Orang yang paling sukses dalam hidup adalah mereka yang disiplin terhadap diri mereka sendiri."
                quoter="John C. Maxwell"
            />

            <AuthLayout.Form>
                <h1 className="text-xl lg:text-3xl font-bold">
                    Sign <span className="text-blue-700">In</span>
                </h1>

                {status && (
                    <div className="mb-4 font-medium text-xs lg:text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form
                    onSubmit={submit}
                    className="h-auto w-9/12 lg:w-8/12 flex flex-col gap-4 lg:gap-6"
                >
                    <div>
                        <InputLabel htmlFor="nis" value="NIS" />

                        <TextInput
                            id="nis"
                            type="number"
                            name="nis"
                            value={data.nis}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            isFocused={true}
                            onChange={(e) => setData('nis', e.target.value)}
                            placeholder="Masukan NIS anda"
                            required
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />

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
                            placeholder="Masukan password anda"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-between items-center text-xs lg:text-sm font-medium text-gray-800">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2">Ingat saya</span>
                        </label>
                        {canResetPassword && (
                            <Link href={route('password.request')}>
                                <span className="hover:text-stone-950 transition-all duration-200">
                                    Lupa password anda?
                                </span>
                            </Link>
                        )}
                    </div>

                    <InputError message={errors.nis} className="mt-1 lg:mt-2" />

                    <button
                        type="submit"
                        className="bg-stone-800 mt-1 lg:mt-2 hover:bg-stone-900 transition-all duration-200 font-normal w-full text-white text-xs lg:text-sm rounded-md grid place-items-center py-2 lg:py-3"
                        disabled={processing}
                    >
                        <span>Masuk</span>
                    </button>
                </form>
            </AuthLayout.Form>
        </AuthLayout>
    )
}
