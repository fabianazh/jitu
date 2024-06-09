import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcumb from '@/Components/Other/Breadcumb'
import Indicator from '@/Components/Other/Indicator'
import BackButton from '@/Components/Button/BackButton'

export default function Index({ auth }: PageProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Pengaturan Autentikasi" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Dashboard">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={
                                    auth?.admin?.user
                                        ? route('admin.dashboard.index')
                                        : route('student.dashboard.index')
                                }
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Pengaturan
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={route(
                                auth?.admin?.user
                                    ? 'admin.dashboard.index'
                                    : 'student.dashboard.index'
                            )}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="relative w-full h-auto flex justify-between p-3 lg:p-6 bg-[#fdfdfd] shadow lg:rounded-lg text-gray-900 mb-5">
                    <div className="text-center mx-auto flex flex-col gap-1 lg:gap-4 py-3 w-full h-fit">
                        <img
                            src={`/storage/${
                                auth?.admin?.user
                                    ? auth?.admin?.user.photo
                                    : auth?.student?.user?.photo
                            }`}
                            alt="Profile Picture"
                            className="w-28 aspect-square rounded-full mx-auto block lg:mb-2"
                            draggable={false}
                        />
                        <h1 className="text-lg lg:text-2xl font-medium">
                            Selamat Datang,{' '}
                            {auth?.admin?.user
                                ? auth?.admin.user?.name
                                : auth?.student?.user?.name}
                            !
                        </h1>
                        <span className="text-sm lg:text-base">
                            {auth?.admin?.user
                                ? 'Kelola informasi akun, dan pengaturan autentikasi agar Jitu! berfungsi lebih baik untuk anda.'
                                : 'Kelola akun agar Jitu! berfungsi lebih baik untuk anda.'}
                        </span>
                    </div>
                </section>
                <section className="relative w-full gap-5 h-auto flex flex-col lg:flex-row justify-between text-gray-900">
                    <div
                        className={`flex flex-col h-fit lg:h-40 bg-[#fdfdfd] shadow lg:rounded-lg ${
                            auth?.admin?.user ? 'lg:w-1/2' : 'w-full'
                        }`}
                    >
                        <div className="px-3 lg:px-6 py-3 lg:py-5 flex flex-col gap-2 lg:gap-5">
                            <span className="text-base lg:text-xl font-medium">
                                Personalisasi
                            </span>
                            <span className="text-sm lg:text-base text-zinc-700">
                                Lihat informasi akun dan kelola data dari akun
                                anda.{' '}
                            </span>
                        </div>
                        <div className="px-3 lg:px-6 py-3 border-t">
                            <Link
                                href={
                                    auth?.admin?.user
                                        ? route('admin.dashboard.profile.index')
                                        : route(
                                              'student.dashboard.profile.index'
                                          )
                                }
                                className="text-sm hover:text-blue-800 transition-all duration-200 font-medium text-blue-600"
                            >
                                Kelola Informasi Pribadi
                            </Link>
                        </div>
                    </div>
                    {auth?.admin?.user && (
                        <div className="flex flex-col h-fit lg:h-40 bg-[#fdfdfd] shadow lg:rounded-lg lg:w-1/2">
                            <div className="px-3 lg:px-6 py-3 lg:py-5 flex flex-col gap-2 lg:gap-5">
                                <span className="text-base lg:text-xl font-medium">
                                    Autentikasi
                                </span>
                                <span className="text-sm lg:text-base text-zinc-700">
                                    Kelola autentikasi admin agar Jitu! lebih
                                    aman.
                                </span>
                            </div>
                            <div className="px-3 lg:px-6 py-3 border-t">
                                <Link
                                    href={route(
                                        'admin.dashboard.settings.auth'
                                    )}
                                    className="text-sm hover:text-blue-800 transition-all duration-200 font-medium text-blue-600"
                                >
                                    Kelola Pengaturan Autentikasi
                                </Link>
                            </div>
                        </div>
                    )}
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
