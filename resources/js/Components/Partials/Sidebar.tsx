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

export default function Sidebar({ auth }: PageProps) {
    const pathname = window.location.pathname

    return (
        <aside className="hidden lg:flex w-[20%] truncate h-fit bg-[#fdfdfd] shadow rounded-lg px-4 py-5">
            <nav className="w-full h-auto">
                {pathname.startsWith('/admin/dashboard/settings') ||
                pathname.startsWith('/admin/dashboard/profile') ||
                pathname.startsWith('/dashboard/settings') ||
                pathname.startsWith('/dashboard/profile') ? (
                    <ul className="w-full h-auto flex flex-col gap-2.5">
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
                                    pathname === '/admin/dashboard/settings' ||
                                    pathname === '/dashboard/settings'
                                }
                            >
                                {pathname === '/admin/dashboard/settings' ||
                                pathname === '/dashboard/settings' ? (
                                    <PiGearSixFill className="text-xl" />
                                ) : (
                                    <PiGearSix className="text-xl" />
                                )}

                                <span className="text-base font-medium">
                                    Beranda
                                </span>
                            </NavLink>
                        </li>
                        <li className="w-full h-auto flex">
                            <NavLink
                                href={
                                    auth?.admin?.user
                                        ? route('admin.dashboard.profile.index')
                                        : route(
                                              'student.dashboard.profile.index'
                                          )
                                }
                                active={
                                    pathname.startsWith(
                                        '/admin/dashboard/profile'
                                    ) ||
                                    pathname.startsWith('/dashboard/profile') ||
                                    pathname.startsWith(
                                        '/admin/dashboard/change-password'
                                    ) ||
                                    pathname.startsWith(
                                        '/dashboard/change-password'
                                    )
                                }
                            >
                                <LuUserCircle2 className="text-xl" />

                                <span className="text-base font-medium">
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
                                        <RiKeyLine className="text-xl" />
                                    ) : (
                                        <RiKeyLine className="text-xl" />
                                    )}

                                    <span className="text-base font-medium">
                                        Autentikasi
                                    </span>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                ) : (
                    <ul className="w-full h-auto flex flex-col gap-2.5">
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
                                    <BsGridFill className="text-xl" />
                                ) : (
                                    <BsGrid className="text-xl" />
                                )}

                                <span className="text-base font-medium">
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
                                            <IoPeople className="text-xl" />
                                        ) : (
                                            <IoPeopleOutline className="text-xl" />
                                        )}
                                        <span className="text-base font-medium">
                                            Siswa
                                        </span>
                                    </NavLink>
                                </li>
                                <Dropdown
                                    icon={
                                        <IoSchoolOutline className="text-xl" />
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
                                        <span className="truncate">Kelas</span>
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
                            icon={<IoDocumentTextOutline className="text-xl" />}
                            activeIcon={
                                <IoDocumentText className="text-xl text-blue-700" />
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
                                className={`mt-2.5 ${
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
                                className={`mt-2.5 ${
                                    pathname.startsWith(
                                        '/admin/dashboard/sanction'
                                    ) ||
                                    pathname.startsWith('/dashboard/sanction')
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
                                            <IoWarning className="text-xl" />
                                        ) : (
                                            <IoWarningOutline className="text-xl" />
                                        )}
                                        <span className="text-base font-medium">
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
                                            <LuHistory className="text-xl" />
                                        ) : (
                                            <LuHistory className="text-xl" />
                                        )}
                                        <span className="text-base font-medium">
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
                                            <BiSolidBell className="text-xl" />
                                        ) : (
                                            <BiBell className="text-xl" />
                                        )}
                                        <span className="text-base font-medium">
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
                className={`relative rounded-md flex items-center gap-3 w-full py-3 px-4 transition-all duration-200 cursor-pointer ${
                    active || isOpen
                        ? 'bg-stone-100 shadow text-blue-700'
                        : 'bg-transparent text-black shadow-none hover:bg-stone-100 hover:text-blue-700 hover:shadow'
                } ${isOpen ? '' : ''}`}
                onClick={toggleDropdown}
            >
                {active ? activeIcon : icon}
                <div className="flex justify-between w-full lg:w-fit items-center truncate">
                    <span
                        className={`text-sm lg:text-base truncate font-medium ${
                            active ? 'text-blue-700' : ''
                        }`}
                    >
                        {label}
                    </span>
                    <BiChevronDown
                        className={`text-lg block lg:hidden duration-200 transition-all ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </div>
            </div>
            {isOpen && <>{children}</>}
        </div>
    )
}
