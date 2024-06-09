import { useState } from 'react'
import { BsGrid, BsGridFill } from 'react-icons/bs'
import {
    IoDocumentText,
    IoDocumentTextOutline,
    IoPeople,
    IoPeopleOutline,
    IoSchool,
    IoSchoolOutline,
    IoWarning,
    IoWarningOutline,
} from 'react-icons/io5'
import NavLink from '@/Components/Other/NavLink'
import { LuHistory, LuUserCircle2 } from 'react-icons/lu'
import { BiBell, BiChevronDown, BiSolidBell } from 'react-icons/bi'
import { RiKeyLine } from 'react-icons/ri'
import { PiGearSix, PiGearSixFill } from 'react-icons/pi'
import AppIcon from '../Icon/AppIcon'

export default function ResponsiveSidebar({
    auth,
    isNavbarClosed,
    handleNavbarClosed,
}: PageProps & {
    isNavbarClosed: boolean
    handleNavbarClosed: () => void
}) {
    const pathname = window.location.pathname

    return (
        <>
            <div
                onClick={handleNavbarClosed}
                className={`absolute block lg:hidden m-auto left-0 top-0 transition-all duration-200 w-screen bg-black/60 h-screen ${
                    isNavbarClosed ? 'opacity-0' : 'opacity-100'
                }`}
            />
            <aside
                className={`w-2/3 truncate h-fit fixed top-0 left-0 overflow-y-hidden bg-[#fdfdfd] shadow min-h-screen py-5 ${
                    isNavbarClosed ? 'hidden' : 'flex lg:hidden'
                }`}
            >
                <nav className="w-full h-auto flex flex-col px-4">
                    <div className="w-full lg:justify-normal items-center justify-center flex mb-4">
                        <AppIcon />
                    </div>
                    {pathname.startsWith('/admin/dashboard/settings') ||
                    pathname.startsWith('/admin/dashboard/profile') ||
                    pathname.startsWith('/dashboard/settings') ||
                    pathname.startsWith('/dashboard/profile') ? (
                        <ul className="w-full h-auto flex flex-col gap-2">
                            <li className="w-full h-auto flex">
                                <NavLink
                                    href={
                                        auth?.admin?.user
                                            ? route(
                                                  'admin.dashboard.settings.index'
                                              )
                                            : route(
                                                  'student.dashboard.settings.index'
                                              )
                                    }
                                    active={
                                        pathname ===
                                            '/admin/dashboard/settings' ||
                                        pathname === '/dashboard/settings'
                                    }
                                >
                                    {pathname === '/admin/dashboard/settings' ||
                                    pathname === '/dashboard/settings' ? (
                                        <PiGearSixFill className="text-lg lg:text-xl" />
                                    ) : (
                                        <PiGearSix className="text-lg lg:text-xl" />
                                    )}

                                    <span className="text-sm lg:text-base font-medium">
                                        Beranda
                                    </span>
                                </NavLink>
                            </li>
                            <li className="w-full h-auto flex">
                                <NavLink
                                    href={
                                        auth?.admin?.user
                                            ? route(
                                                  'admin.dashboard.profile.index'
                                              )
                                            : route(
                                                  'student.dashboard.profile.index'
                                              )
                                    }
                                    active={
                                        pathname.startsWith(
                                            '/admin/dashboard/profile'
                                        ) ||
                                        pathname.startsWith(
                                            '/dashboard/profile'
                                        ) ||
                                        pathname.startsWith(
                                            '/admin/dashboard/change-password'
                                        ) ||
                                        pathname.startsWith(
                                            '/dashboard/change-password'
                                        )
                                    }
                                >
                                    <LuUserCircle2 className="text-lg lg:text-xl" />

                                    <span className="text-sm lg:text-base font-medium">
                                        Akun
                                    </span>
                                </NavLink>
                            </li>
                            {auth?.admin?.user && (
                                <li className="w-full h-auto flex">
                                    <NavLink
                                        href={
                                            auth?.admin?.user
                                                ? route(
                                                      'admin.dashboard.settings.auth'
                                                  )
                                                : route(
                                                      'student.dashboard.settings.index'
                                                  )
                                        }
                                        active={
                                            pathname.startsWith(
                                                '/admin/dashboard/settings/auth'
                                            ) ||
                                            pathname.startsWith(
                                                '/dashboard/settings/auth'
                                            )
                                        }
                                    >
                                        {pathname.startsWith(
                                            '/admin/dashboard/settings/auth'
                                        ) ||
                                        pathname.startsWith(
                                            '/dashboard/settings/auth'
                                        ) ? (
                                            <RiKeyLine className="text-lg lg:text-xl" />
                                        ) : (
                                            <RiKeyLine className="text-lg lg:text-xl" />
                                        )}

                                        <span className="text-sm lg:text-base font-medium">
                                            Autentikasi
                                        </span>
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    ) : (
                        <ul className="w-full h-auto flex flex-col gap-2">
                            <li className="w-full h-auto flex">
                                <NavLink
                                    href={
                                        auth?.admin?.user
                                            ? route('admin.dashboard.index')
                                            : route('student.dashboard.index')
                                    }
                                    active={
                                        pathname === '/dashboard' ||
                                        pathname === '/dashboard/' ||
                                        pathname === '/admin/dashboard' ||
                                        pathname === '/admin/dashboard/'
                                    }
                                >
                                    {pathname === '/dashboard' ||
                                    pathname === '/dashboard/' ||
                                    pathname === '/admin/dashboard' ||
                                    pathname === '/admin/dashboard/' ? (
                                        <BsGridFill className="text-lg lg:text-xl" />
                                    ) : (
                                        <BsGrid className="text-lg lg:text-xl" />
                                    )}

                                    <span className="text-sm lg:text-base font-medium">
                                        Overview
                                    </span>
                                </NavLink>
                            </li>
                            {auth?.admin?.user && (
                                <>
                                    <li className={`w-full h-auto flex`}>
                                        <NavLink
                                            href={route(
                                                'admin.dashboard.students.index'
                                            )}
                                            active={pathname.startsWith(
                                                '/admin/dashboard/student'
                                            )}
                                        >
                                            {pathname.startsWith(
                                                '/admin/dashboard/student'
                                            ) ? (
                                                <IoPeople className="text-lg lg:text-xl" />
                                            ) : (
                                                <IoPeopleOutline className="text-lg lg:text-xl" />
                                            )}
                                            <span className="text-sm lg:text-base font-medium">
                                                Siswa
                                            </span>
                                        </NavLink>
                                    </li>
                                    <Dropdown
                                        icon={
                                            <IoSchoolOutline className="text-lg lg:text-xl" />
                                        }
                                        activeIcon={
                                            <IoSchool className="text-xl text-blue-700" />
                                        }
                                        label="Kelas & Jurusan"
                                        active={
                                            pathname.startsWith(
                                                '/admin/dashboard/class'
                                            ) ||
                                            pathname.startsWith(
                                                '/admin/dashboard/major'
                                            )
                                        }
                                    >
                                        <NavLink
                                            href={route(
                                                'admin.dashboard.classes.index'
                                            )}
                                            active={false}
                                            className={`mt-2.5 ${
                                                pathname.startsWith(
                                                    '/admin/dashboard/class'
                                                )
                                                    ? 'text-blue-700'
                                                    : ''
                                            }`}
                                        >
                                            <span className="truncate">
                                                Kelas
                                            </span>
                                        </NavLink>
                                        <NavLink
                                            href={route(
                                                'admin.dashboard.majors.index'
                                            )}
                                            active={false}
                                            className={`mt-2.5 ${
                                                pathname.startsWith(
                                                    '/admin/dashboard/major'
                                                )
                                                    ? 'text-blue-700'
                                                    : ''
                                            }`}
                                        >
                                            <span className="truncate">
                                                Jurusan
                                            </span>
                                        </NavLink>
                                    </Dropdown>
                                </>
                            )}
                            <Dropdown
                                icon={
                                    <IoDocumentTextOutline className="text-lg lg:text-xl" />
                                }
                                activeIcon={
                                    <IoDocumentText className="text-lg lg:text-xl text-blue-700" />
                                }
                                label="Aturan"
                                active={
                                    pathname.startsWith(
                                        '/admin/dashboard/forms-of-violation'
                                    ) ||
                                    pathname.startsWith(
                                        '/admin/dashboard/form-of-violation'
                                    ) ||
                                    pathname.startsWith(
                                        '/admin/dashboard/sanction'
                                    ) ||
                                    pathname.startsWith(
                                        '/dashboard/forms-of-violation'
                                    ) ||
                                    pathname.startsWith(
                                        '/dashboard/form-of-violation'
                                    ) ||
                                    pathname.startsWith('/dashboard/sanction')
                                }
                            >
                                <NavLink
                                    href={route(
                                        auth?.admin?.user
                                            ? 'admin.dashboard.forms_of_violation.index'
                                            : 'student.dashboard.forms_of_violation.index'
                                    )}
                                    active={false}
                                    className={`mt-2 lg:mt-2.5 ${
                                        pathname.startsWith(
                                            '/admin/dashboard/forms-of-violation'
                                        ) ||
                                        pathname.startsWith(
                                            '/admin/dashboard/form-of-violation'
                                        ) ||
                                        pathname.startsWith(
                                            '/dashboard/forms-of-violation'
                                        ) ||
                                        pathname.startsWith(
                                            '/dashboard/form-of-violation'
                                        )
                                            ? 'text-blue-700'
                                            : ''
                                    }`}
                                >
                                    <span className="truncate">
                                        Bentuk Pelanggaran
                                    </span>
                                </NavLink>
                                <NavLink
                                    href={route(
                                        auth?.admin?.user
                                            ? 'admin.dashboard.sanctions.index'
                                            : 'student.dashboard.sanctions.index'
                                    )}
                                    active={false}
                                    className={`mt-2 lg:mt-2.5 ${
                                        pathname.startsWith(
                                            '/admin/dashboard/sanction'
                                        ) ||
                                        pathname.startsWith(
                                            '/dashboard/sanction'
                                        )
                                            ? 'text-blue-700'
                                            : ''
                                    }`}
                                >
                                    <span className="truncate">Sanksi</span>
                                </NavLink>
                            </Dropdown>
                            {auth?.admin?.user && (
                                <>
                                    <li className="w-full h-auto flex">
                                        <NavLink
                                            href={route(
                                                'admin.dashboard.violations.index'
                                            )}
                                            active={pathname.startsWith(
                                                '/admin/dashboard/violation'
                                            )}
                                        >
                                            {pathname.startsWith(
                                                '/admin/dashboard/violation'
                                            ) ? (
                                                <IoWarning className="text-lg lg:text-xl" />
                                            ) : (
                                                <IoWarningOutline className="text-lg lg:text-xl" />
                                            )}
                                            <span className="text-sm lg:text-base font-medium">
                                                Pelanggaran
                                            </span>
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            {auth?.student?.user && (
                                <>
                                    <li className="w-full h-auto flex">
                                        <NavLink
                                            href={route(
                                                'student.dashboard.history.index'
                                            )}
                                            active={pathname.startsWith(
                                                '/dashboard/violation-history'
                                            )}
                                        >
                                            {pathname.startsWith(
                                                '/dashboard/violation-history'
                                            ) ? (
                                                <LuHistory className="text-lg lg:text-xl" />
                                            ) : (
                                                <LuHistory className="text-lg lg:text-xl" />
                                            )}
                                            <span className="text-sm lg:text-base font-medium">
                                                Riwayat
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li className="w-full h-auto flex">
                                        <NavLink
                                            href={route(
                                                'student.dashboard.notifications.index'
                                            )}
                                            active={pathname.startsWith(
                                                '/dashboard/notification'
                                            )}
                                        >
                                            {pathname.startsWith(
                                                '/dashboard/notification'
                                            ) ? (
                                                <BiSolidBell className="text-lg lg:text-xl" />
                                            ) : (
                                                <BiBell className="text-lg lg:text-xl" />
                                            )}
                                            <span className="text-sm lg:text-base font-medium">
                                                Notifikasi
                                            </span>
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    )}
                </nav>
            </aside>
        </>
    )
}

function Dropdown({
    icon,
    activeIcon,
    label,
    active,
    children,
}: {
    icon: React.ReactNode
    activeIcon: React.ReactNode
    label: string
    active: boolean
    children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`relative w-full h-auto ${isOpen ? 'z-10' : ''}`}>
            <div
                className={`relative rounded lg:rounded-md flex items-center gap-x-3 w-full py-3 px-4 transition-all duration-200 cursor-pointer ${
                    active || isOpen
                        ? 'bg-stone-100 shadow-sm text-blue-700'
                        : 'bg-transparent text-black shadow-none hover:bg-stone-100 hover:text-blue-700 hover:shadow-sm'
                } ${isOpen ? '' : ''}`}
                onClick={toggleDropdown}
            >
                {active ? activeIcon : icon}
                <div className="flex justify-between w-full items-center">
                    <span
                        className={`text-sm lg:text-base truncate font-medium ${
                            active ? 'text-blue-700' : ''
                        }`}
                    >
                        {label}
                    </span>
                    <BiChevronDown
                        className={`text-lg duration-200 transition-all ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </div>
            </div>
            {isOpen && <>{children}</>}
        </div>
    )
}
