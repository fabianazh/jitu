import { motion, useAnimation } from 'framer-motion'
import DashboardHeader from '@/Components/Partials/DashboardHeader'
import LandingHeader from '@/Components/Partials/LandingHeader'
import { disableScroll, enableScroll } from '@/Utils/ControllScroll'
import { useEffect, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import ResponsiveSidebar from './ResponsiveSidebar'

export default function Header({ auth }: PageProps) {
    const [isNavbarClosed, setIsNavbarClosed] = useState<boolean>(true)

    function handleNavbarClosed() {
        setIsNavbarClosed((prev) => !prev)
    }

    useEffect(() => {
        isNavbarClosed ? enableScroll() : disableScroll()
    }, [isNavbarClosed])

    const controls = useAnimation()
    const pathname = window.location.pathname

    useEffect(() => {
        function handleScroll() {
            const scrollYValue = window.scrollY

            if (scrollYValue > 0) {
                controls.start({
                    backgroundColor: 'rgb(255 255 255 / 0.88)',
                    boxShadow:
                        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                    backdropFilter: 'blur(4px)',
                })
            } else {
                controls.start({
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    backdropFilter: 'none',
                })
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [controls])

    return (
        <>
            <motion.header
                initial={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    backdropFilter: 'none',
                }}
                animate={controls}
                exit={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    backdropFilter: 'none',
                }}
                transition={{ duration: 0 }}
                className={`top-0 right-0 transition-all duration-200 z-[1000] h-auto grid items-center justify-between w-full ${
                    pathname.startsWith('/dashboard') ||
                    pathname.startsWith('/admin/dashboard')
                        ? 'fixed py-4 pr-4 lg:pr-8 pl-4 lg:pl-12 grid-cols-3 lg:grid-cols-2'
                        : 'fixed py-4 px-6 lg:px-12 grid-cols-2 lg:flex'
                }`}
            >
                {pathname.startsWith('/dashboard') ||
                pathname.startsWith('/admin/dashboard') ? (
                    <>
                        <div className="w-full z-0 h-full items-center flex lg:hidden justify-start shrink-0">
                            <button
                                type="button"
                                onClick={handleNavbarClosed}
                                className={`hover:bg-stone-50 shadow font-semibold inline-block w-fit text-black text-xs rounded-md bg-[#fdfdfd] p-2.5 z-0`}
                            >
                                <RxHamburgerMenu />
                            </button>
                        </div>
                        <DashboardHeader auth={auth} />
                        {!isNavbarClosed && (
                            <ResponsiveSidebar
                                auth={auth}
                                isNavbarClosed={isNavbarClosed}
                                handleNavbarClosed={handleNavbarClosed}
                            />
                        )}
                    </>
                ) : (
                    <LandingHeader auth={auth} />
                )}
            </motion.header>
        </>
    )
}
