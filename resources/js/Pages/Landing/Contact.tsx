import { Head, useForm } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'
import { LuMail, LuMap, LuPhone } from 'react-icons/lu'
import InputLabel from '@/Components/Form/InputLabel'
import TextInput from '@/Components/Form/TextInput'
import TextareaInput from '@/Components/Form/TextareaInput'
import { useEffect } from 'react'
import InputError from '@/Components/Form/InputError'

export default function Contact({ auth }: PageProps) {
    const {
        data,
        post,
        processing,
        errors,
        reset,
        setData,
        recentlySuccessful,
    } = useForm({
        name: '',
        email: '',
        message: '',
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()

        post(route('landing.contact.post'))
    }

    useEffect(() => {
        reset()
    }, [recentlySuccessful])

    return (
        <>
            <Head title="Jitu! Kontak" />
            <GuestLayout auth={auth}>
                <section
                    id="contact"
                    className="w-full flex flex-col lg:flex-row gap-6 items-center lg:min-h-screen pt-24 px-6 lg:px-12 pb-1 relative"
                >
                    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(29,78,216,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
                    <div className="w-full flex flex-col gap-2 lg:gap-5">
                        <span className="text-black text-2xl lg:text-5xl font-semibold font-ubuntu">
                            Beri{' '}
                            <span className="text-blue-700 font-bold">
                                kami
                            </span>{' '}
                            masukan
                        </span>
                        <span className="text-zinc-700 font-medium text-sm lg:text-base mb-2 lg:mb-0">
                            Pendapat Anda memiliki nilai tak ternilai dalam
                            upaya kami untuk terus berkembang. Kami dengan
                            senang hati menerima pemikiran, saran, dan gagasan
                            Anda untuk membuat Jitu semakin baik. Bersama-sama,
                            mari kita bentuk masa depan pendidikan di SMK Pasim.
                        </span>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3 items-center">
                                <div className="rounded-md cursor-pointer border border-stone-700 aspect-square grid place-items-center p-1.5 lg:p-3">
                                    <LuMail className="text-sm lg:text-lg" />
                                </div>
                                <span className="text-zinc-700 font-medium text-xs lg:text-sm">
                                    jitu.company@email.com
                                </span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className="rounded-md cursor-pointer border border-stone-700 aspect-square grid place-items-center p-1 l.5 lg:p-3">
                                    <LuPhone className="text-sm lg:text-lg" />
                                </div>
                                <span className="text-zinc-700 font-medium text-xs lg:text-sm">
                                    (62) 1326-0216
                                </span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className="rounded-md cursor-pointer border border-stone-700 aspect-square grid place-items-center p-1.5 lg:p-3">
                                    <LuMap className="text-sm lg:text-lg" />
                                </div>
                                <span className="text-zinc-700 font-medium text-xs lg:text-sm">
                                    1234 Desert Road, Albuquerque, NM 87101,
                                    Amerika Serikat.
                                </span>
                            </div>
                        </div>
                    </div>
                    <form
                        onSubmit={submit}
                        className="bg-[#fefefe] rounded-xl shadow h-auto p-6 lg:p-9 pb-9 lg:pb-12 w-full flex flex-col gap-4 mt-4 lg:mt-0"
                    >
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Nama"
                                className="text-sm lg:text-base"
                            />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                className="mt-1 block w-full placeholder:text-xs lg:placeholder:text-sm"
                                autoComplete="off"
                                isFocused
                                placeholder="Masukan nama anda"
                                onChange={(e) =>
                                    setData((prevData) => ({
                                        ...prevData,
                                        name: e.target.value,
                                    }))
                                }
                                value={data.name}
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="text-sm lg:text-base"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                className="mt-1 block w-full placeholder:text-xs lg:placeholder:text-sm"
                                autoComplete="off"
                                placeholder="Masukan email anda"
                                onChange={(e) =>
                                    setData((prevData) => ({
                                        ...prevData,
                                        email: e.target.value,
                                    }))
                                }
                                value={data.email}
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="message"
                                value="Pesan"
                                className="text-sm lg:text-base"
                            />

                            <TextareaInput
                                rows={4}
                                id="message"
                                name="message"
                                className="mt-1 block w-full placeholder:text-xs lg:placeholder:text-sm"
                                autoComplete="off"
                                placeholder="Masukan pesan anda"
                                onChange={(e) =>
                                    setData((prevData) => ({
                                        ...prevData,
                                        message: e.target.value,
                                    }))
                                }
                                value={data.message}
                                required
                            />
                            <InputError
                                message={errors.message}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-full h-auto flex mt-2 lg:mt-5 justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 inline-block w-fit text-white text-xs lg:text-sm shadow font-normal rounded-md px-12 lg:px-16 py-2"
                            >
                                <span>Kirim</span>
                            </button>
                        </div>
                    </form>
                </section>
            </GuestLayout>
        </>
    )
}
