import { Link } from '@inertiajs/react'
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Footer() {
    const pathname = window.location.pathname
    const currentYear = new Date().toLocaleDateString().split('/')[2]

    return (
        <>
            <footer
                id="footer"
                className={`${
                    pathname === '/about' ? '' : 'mt-12 lg:mt-24'
                } flex relative bottom-0 divide-y-1.5 divide-black/60 bg-gray-100 flex-col px-6 lg:px-12`}
            >
                <div className="w-full h-auto pt-7 lg:pt-14 pb-6 lg:pb-12 flex flex-col lg:flex-row">
                    <div className="flex flex-auto flex-col gap-2 lg:gap-4 mb-4 lg:mb-0">
                        <Link href={'/'}>
                            <span className="font-bold text-2xl lg:text-3xl text-black">
                                Jitu!
                            </span>
                        </Link>
                        <span className="font-medium text-sm lg:text-base">
                            Menuju Keunggulan, dengan Kedisiplinan!
                        </span>
                    </div>
                    {/* <hr className="bg-black lg:hidden" /> */}
                    <div className="flex flex-col gap-2 lg:gap-4 my-3 lg:my-0 flex-auto">
                        <span className="footer__heading">Navigasi</span>
                        <hr className="bg-black lg:hidden" />
                        <ul className="flex flex-col gap-2 lg:gap-4">
                            <li>
                                <Link href={'/'}>
                                    <span className="footer__link">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/about'}>
                                    <span className="footer__link">Profil</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/contact'}>
                                    <span className="footer__link">Kontak</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* <hr className="bg-black lg:hidden" /> */}
                    <div className="flex flex-col gap-2 lg:gap-4 my-3 lg:my-0 flex-auto">
                        <span className="footer__heading">Program</span>
                        <hr className="bg-black lg:hidden" />
                        <ul className="flex flex-col gap-2 lg:gap-4">
                            <li>
                                <Link href={'/about'}>
                                    <span className="footer__link">
                                        Tentang Kami
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/about#about'}>
                                    <span className="footer__link">Karir</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/about#testimonials'}>
                                    <span className="footer__link">Ulasan</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/contact#contact'}>
                                    <span className="footer__link">Kontak</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* <hr className="bg-black lg:hidden" /> */}
                    <div className="flex flex-col gap-2 lg:gap-4 my-3 lg:my-0 flex-auto max-w-sm">
                        <span className="footer__heading">Kontak</span>
                        <hr className="bg-black lg:hidden" />
                        <ul className="flex flex-col gap-2 lg:gap-4">
                            <li>
                                <span className="footer__link">
                                    jitu.company@email.com
                                </span>
                            </li>
                            <li>
                                <span className="footer__link">
                                    +62 1326-0216
                                </span>
                            </li>
                            <li>
                                <span className="footer__link">
                                    1234 Desert Road, Albuquerque, NM 87101,
                                    Amerika Serikat.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:flex-row gap-4 lg:gap-0 justify-between py-4">
                    <span className="text-sm lg:text-sm text-black font-medium">
                        © {currentYear} Fabianazh. All rights reserved
                    </span>
                    <div className="h-auto flex lg:justify-between w-auto gap-6 lg:gap-8">
                        <Link
                            href="http://github.com/fabianazh/"
                            className="icon__sm"
                        >
                            <FaGithub />
                        </Link>
                        <Link href="#" className="icon__sm">
                            <FaFacebook />
                        </Link>
                        <Link
                            href="https://instagram.com/fabianazhrr"
                            className="icon__sm"
                        >
                            <FaInstagram />
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    )
}
