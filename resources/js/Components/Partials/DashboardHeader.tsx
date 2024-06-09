import { FiLogOut, FiUser } from 'react-icons/fi'
import { RxChevronDown } from 'react-icons/rx'
import { BiBell } from 'react-icons/bi'
import { BsGear } from 'react-icons/bs'
import Dropdown from '@/Components/Other/Dropdown'
import AppIcon from '../Icon/AppIcon'

export default function DashboardHeader({ auth }: PageProps) {
    return (
        <>
            <div className="w-full flex justify-center lg:justify-normal shrink-0 h-full items-center">
                <AppIcon />
            </div>
            <nav
                className={`bg-transparent w-full justify-end flex h-full items-center`}
            >
                <div className="flex sm:items-center gap-4 relative h-fit max-w-[12rem] lg:max-w-[18rem]">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="w-auto h-auto flex items-center justify-center lg:justify-normal gap-2 bg-[#fdfdfd] rounded-lg shadow py-1 px-1.5 cursor-pointer aspect-square lg:aspect-auto">
                                <img
                                    src={`/storage/${
                                        auth?.admin?.user
                                            ? auth?.admin?.user.photo
                                            : (auth?.student?.user
                                                  ?.photo as unknown as string)
                                    }`}
                                    alt=""
                                    className="w-5 aspect-square lg:aspect-auto h-fit rounded-md"
                                    draggable={false}
                                />
                                <div className="w-auto max-w-[9.5rem] truncate hidden lg:block">
                                    <span className="text-stone-700 text-sm font-medium">
                                        {auth?.admin?.user?.name}
                                        {auth?.student?.user?.name}
                                    </span>
                                </div>
                                <RxChevronDown className="hidden lg:block" />
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content
                            width="md"
                            contentClasses="bg-white p-1.5 gap-1"
                        >
                            <Dropdown.Link
                                href={
                                    auth?.admin?.user
                                        ? route('admin.dashboard.profile.index')
                                        : route(
                                              'student.dashboard.profile.index'
                                          )
                                }
                                className="flex gap-2.5 items-center text-xs lg:text-base"
                            >
                                <FiUser className="text-sm lg:text-[1rem]" />{' '}
                                Profil
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={
                                    auth?.admin?.user
                                        ? route(
                                              'admin.dashboard.notifications.index'
                                          )
                                        : route(
                                              'student.dashboard.notifications.index'
                                          )
                                }
                                className="flex gap-2.5 items-center truncate text-xs lg:text-base"
                            >
                                <BiBell />

                                {auth?.admin?.user &&
                                    (auth?.admin?.unreadNotifications ??
                                    0 > 0 ? (
                                        <span className="text-[0.65rem] lg:text-xs">
                                            <span className="text-xs lg:text-sm">
                                                Notifikasi{' '}
                                            </span>
                                            ({auth?.admin?.unreadNotifications})
                                        </span>
                                    ) : (
                                        'Notifikasi'
                                    ))}
                                {auth?.student?.user &&
                                    (auth?.student?.unreadNotifications ??
                                    0 > 0 ? (
                                        <span className="text-[0.65rem] lg:text-xs">
                                            <span className="text-xs lg:text-sm">
                                                Notifikasi{' '}
                                            </span>
                                            (
                                            {auth?.student?.unreadNotifications}
                                            )
                                        </span>
                                    ) : (
                                        'Notifikasi'
                                    ))}
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={
                                    auth?.admin?.user
                                        ? route(
                                              'admin.dashboard.settings.index'
                                          )
                                        : route(
                                              'student.dashboard.settings.index'
                                          )
                                }
                                className="flex gap-2.5 items-center text-xs lg:text-base"
                            >
                                <BsGear /> Pengaturan
                            </Dropdown.Link>
                            <div className="block bg-stone-200 h-[1px] w-11/12 mx-auto"></div>
                            <Dropdown.Link
                                href={
                                    auth?.admin?.user
                                        ? route('admin.logout')
                                        : route('student.logout')
                                }
                                method="post"
                                as="button"
                                className="text-red-700 text-xs lg:text-base flex gap-2.5 items-center hover:bg-red-200/50"
                            >
                                <FiLogOut /> Logout
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </nav>
        </>
    )
}
