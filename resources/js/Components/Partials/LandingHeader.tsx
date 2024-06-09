import { Link } from '@inertiajs/react'
import AppIcon from '../Icon/AppIcon'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useEffect, useState } from 'react'
import { disableScroll, enableScroll } from '@/Utils/ControllScroll'

export default function LandingHeader({ auth }: PageProps) {
    const [isNavbarClosed, setIsNavbarClosed] = useState<boolean>(true)

    function handleNavbarClosed() {
        setIsNavbarClosed((prev) => !prev)
    }

    useEffect(() => {
        isNavbarClosed ? enableScroll() : disableScroll()
    }, [isNavbarClosed])

    const pathname = window.location.pathname

    return (
        <>
            <div className="w-full lg:w-1/3">
                <AppIcon />
            </div>
            <div className="justify-end w-full flex lg:hidden">
                <button type="button" onClick={handleNavbarClosed}>
                    <div
                        className={`hover:bg-stone-50 hover:border-black border border-blue-700 shadow font-semibold duration-200 transition-all inline-block w-fit text-black text-xs rounded-md p-2 ${
                            isNavbarClosed ? 'scale-100' : 'scale-0'
                        }`}
                    >
                        <RxHamburgerMenu />
                        {/* {isNavbarClosed ? (
                            <RxHamburgerMenu />
                        ) : (
                            <BiX className="text-lg" />
                        )} */}
                    </div>
                </button>
            </div>

            {!isNavbarClosed && (
                <div
                    onClick={handleNavbarClosed}
                    className={`absolute block m-auto left-0 top-0 transition-all duration-200 w-screen bg-black/60 h-screen ${
                        isNavbarClosed ? 'opacity-0' : 'opacity-100'
                    }`}
                />
            )}

            <div
                className={`w-2/3 flex ${
                    isNavbarClosed
                        ? 'hidden lg:w-2/3 lg:flex items-center justify-between lg:shrink-0'
                        : 'fixed left-0 top-0 h-screen overflow-hidden p-6 pt-[1.15rem] gap-12 bg-white shadow z-50 items-start flex-col justify-between'
                }`}
            >
                <nav
                    className={`w-1/2 justify-between ${
                        pathname.startsWith('/dashboard') ? 'hidden' : 'lg:flex'
                    } ${
                        isNavbarClosed
                            ? 'hidden lg:flex items-center lg:shrink-0'
                            : 'flex flex-col gap-6'
                    }`}
                >
                    <AppIcon className={isNavbarClosed ? 'hidden' : 'block'} />
                    <ul
                        className={`w-2/3 lg:w-full flex text-sm font-semibold shrink-0 justify-center ${
                            isNavbarClosed
                                ? 'flex-row gap-9'
                                : 'w-2/3 flex-col bg-white gap-6'
                        }`}
                    >
                        <li>
                            <Link href={route('landing.home')}>
                                <span
                                    className={`nav__link ${
                                        route().current() === 'landing.home'
                                            ? 'active'
                                            : 'inactive'
                                    } transition-all transform hover:text-black`}
                                >
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('landing.about')}>
                                <span
                                    className={`nav__link ${
                                        route().current() === 'landing.about'
                                            ? 'active'
                                            : 'inactive'
                                    } transition-all transform hover:text-black`}
                                >
                                    Profil
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('landing.contact')}>
                                <span
                                    className={`nav__link ${
                                        route().current() === 'landing.contact'
                                            ? 'active'
                                            : 'inactive'
                                    } transition-all transform hover:text-black`}
                                >
                                    Kontak
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div
                    className={`gap-4 ${
                        pathname.startsWith('/dashboard') ||
                        pathname.startsWith('/admin/dashboard')
                            ? 'hidden'
                            : 'flex'
                    } ${
                        isNavbarClosed
                            ? 'justify-end w-1/2'
                            : 'w-full flex z-50 h-auto flex-col'
                    }`}
                >
                    <hr
                        className={
                            isNavbarClosed
                                ? 'hidden'
                                : 'z-50 bg-stone-400 outline-stone-400 border-stone-400 w-full mb-2'
                        }
                    />
                    {auth?.admin?.user || auth?.student?.user ? (
                        <div
                            className={
                                isNavbarClosed
                                    ? 'lg:flex lg:gap-4'
                                    : 'flex flex-col gap-4'
                            }
                        >
                            <Link
                                href={route(
                                    auth?.admin?.user
                                        ? 'admin.logout'
                                        : 'student.logout'
                                )}
                                method="post"
                                as="button"
                            >
                                <div
                                    className={`hover:bg-stone-50 hover:border-black border border-blue-700 shadow font-semibold lg:w-fit text-black text-xs rounded-md px-4 py-2 transition-all duration-200 ${
                                        isNavbarClosed
                                            ? 'hidden lg:inline-block'
                                            : 'flex w-full justify-center'
                                    }`}
                                >
                                    <span>Logout</span>
                                </div>
                            </Link>
                            {auth?.student?.user && (
                                <Link href={route('student.dashboard.index')}>
                                    <div
                                        className={`bg-black/90 hover:bg-black hover:border-black font-normal lg:w-fit text-white text-xs border border-black rounded-md px-4 py-2 transition-all duration-200 ${
                                            isNavbarClosed
                                                ? 'hidden lg:inline-block'
                                                : 'flex w-full justify-center'
                                        }`}
                                    >
                                        <span>Dashboard</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href={route('student.login.index')}>
                                <div
                                    className={`hover:bg-stone-50 hover:border-black border border-blue-700 shadow font-semibold lg:w-fit text-black text-xs rounded-md px-4 py-2 transition-all duration-200 ${
                                        isNavbarClosed
                                            ? 'hidden lg:inline-block'
                                            : 'flex w-full justify-center'
                                    }`}
                                >
                                    <span>Masuk</span>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
