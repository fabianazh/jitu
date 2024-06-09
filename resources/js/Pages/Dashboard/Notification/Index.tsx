import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcumb from '@/Components/Other/Breadcumb'
import Indicator from '@/Components/Other/Indicator'
import BackButton from '@/Components/Button/BackButton'
import Dropdown from '@/Components/Other/Dropdown'
import { Link } from '@inertiajs/react'
import { LuChevronDown, LuSlidersHorizontal } from 'react-icons/lu'
import { useState } from 'react'
import NotFoundCard from '@/Components/Card/NotFoundCard'
import HeadingContainer from '@/Components/Container/HeadingContainer'

export default function Index({
    auth,
    notifications,
    totalNotifications,
}: PageProps & NotificationsPageProps) {
    const [sortBy, setSortBy] = useState<string>('Baru')

    function handleSort(sortBy: string) {
        setSortBy(sortBy)
    }

    function sortedNotifications() {
        switch (sortBy) {
            case 'Awal':
                return notifications.sort((a, b) =>
                    a.created_at.localeCompare(b.created_at)
                )
            default:
                return notifications.sort((a, b) =>
                    b.created_at.localeCompare(a.created_at)
                )
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Notifikasi" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Notifikasi">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route(
                                    auth?.admin?.user
                                        ? 'admin.dashboard.index'
                                        : 'student.dashboard.index'
                                )}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Notifikasi
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        {auth?.admin?.user && (
                            <BackButton href={route('admin.dashboard.index')} />
                        )}
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-fit pb-20 bg-transparent">
                    <div className="w-full h-fit py-3 lg:py-4 px-0 lg:px-5 bg-[#fefefe] shadow lg:rounded-lg -z-10">
                        <HeadingContainer>
                            <HeadingContainer.Heading
                                title="Daftar Pesan"
                                desc={
                                    auth?.admin?.unreadNotifications ??
                                    (0 > 0 ||
                                        auth?.student?.unreadNotifications) ??
                                    0 > 0
                                        ? `Anda memiliki ${
                                              auth?.admin
                                                  ?.unreadNotifications ??
                                              auth?.student?.unreadNotifications
                                          } pesan belum dibaca`
                                        : 'Semua pesan anda'
                                }
                            />
                            <HeadingContainer.Feature>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="bg-transparent hover:bg-stone-100/80 focus:bg-stone-100/80 transition-all duration-300 border text-stone-500 flex items-center justify-center gap-1 p-1.5 lg:p-2.5 rounded-md lg:rounded-lg aspect-square lg:aspect-auto h-8 lg:h-10 w-fit cursor-pointer">
                                            <LuSlidersHorizontal className="text-xs lg:text-base" />
                                            <span className="hidden text-sm font-semibold lg:block ml-0.5 lg:ml-1.5 text-stone-700">
                                                Sort by
                                            </span>
                                            <LuChevronDown className="hidden lg:block text-base" />
                                        </div>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right">
                                        <Dropdown.Button
                                            handleClick={handleSort}
                                            value="Baru"
                                            active={sortBy === 'Baru'}
                                        >
                                            Paling Baru
                                        </Dropdown.Button>
                                        <Dropdown.Button
                                            handleClick={handleSort}
                                            value="Awal"
                                            active={sortBy === 'Awal'}
                                        >
                                            Paling Awal
                                        </Dropdown.Button>
                                    </Dropdown.Content>
                                </Dropdown>
                            </HeadingContainer.Feature>
                        </HeadingContainer>
                        <div className="border-t my-4 block">
                            {sortedNotifications().map(
                                (notification: Notifications) => (
                                    <Link
                                        href={
                                            auth?.admin?.user
                                                ? route(
                                                      'admin.dashboard.notifications.show',
                                                      {
                                                          notification:
                                                              notification,
                                                      }
                                                  )
                                                : route(
                                                      'student.dashboard.notifications.show',
                                                      {
                                                          notification:
                                                              notification,
                                                      }
                                                  )
                                        }
                                    >
                                        <div
                                            className={`hover:bg-stone-100 px-3 w-full flex justify-center items-center gap-2 transition-all duration-200 text-xs lg:text-base h-fit py-4 border-b ${
                                                notification.read_at
                                                    ? 'bg-stone-50'
                                                    : 'bg-transparent'
                                            }`}
                                        >
                                            <div
                                                className={`flex shrink-0 ${
                                                    auth?.admin?.user
                                                        ? 'lg:w-2/12'
                                                        : 'lg:w-[20%]'
                                                }`}
                                            >
                                                <span className="font-medium">
                                                    {notification.type.endsWith(
                                                        'MessageFromGuest'
                                                    )
                                                        ? 'Kritik & Saran'
                                                        : ''}
                                                    {notification.type.endsWith(
                                                        'NewViolation'
                                                    )
                                                        ? 'Pelanggaran Baru'
                                                        : ''}
                                                    {notification.type.endsWith(
                                                        'PointsThresholdReached'
                                                    )
                                                        ? 'Batas Poin Tercapai'
                                                        : ''}
                                                </span>
                                            </div>
                                            <span className="lg:hidden">-</span>
                                            <div className="w-full truncate gap-4 flex items-center lg:justify-between">
                                                <div className="truncate">
                                                    <span className="font-medium">
                                                        {
                                                            notification.data
                                                                .title
                                                        }
                                                    </span>
                                                    <span className="font-medium">
                                                        {' - '}
                                                    </span>
                                                    <span className="text-zinc-800">
                                                        {
                                                            notification.data
                                                                .message
                                                        }
                                                    </span>
                                                </div>
                                                <span>{notification.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            )}
                        </div>
                        {totalNotifications < 1 && (
                            <NotFoundCard
                                imageWidth="w-60"
                                className="py-5"
                                message="Belum ada pesan."
                            />
                        )}
                    </div>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
