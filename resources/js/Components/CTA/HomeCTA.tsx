import { Link } from '@inertiajs/react'
import ComponentsImage from '@/Assets/Illustration/ui-components.png'

export default function HomeCTA() {
    return (
        <>
            <section className="lg:w-10/12 h-fit lg:h-72 mb-0.5 bg-[#fefefe] shadow rounded-xl justify-between p-6 flex mx-auto mt-16 lg:mt-24 flex-col-reverse lg:flex-row gap-4 lg:gap-0">
                <div className="w-full lg:w-8/12 h-full flex-col flex justify-between gap-4 lg:gap-0">
                    <span className="text-base lg:text-3xl block font-bold lg:leading-9 text-start lg:text-start">
                        Jelajahi dunia pendidikan dengan{' '}
                        <span className="text-blue-700">Jitu!</span> Tingkatkan
                        kedisiplinan sekarang.
                    </span>
                    <span className="block font-medium leading-6 text-sm lg:text-base">
                        Selamat datang di JItu!, program kedisiplinan yang
                        inovatif untuk memperkuat integritas dan tanggung jawab
                        siswa SMK Pasim. Kami percaya bahwa pendidikan yang
                        efektif tidak hanya mencakup pengetahuan akademis,
                        tetapi juga mengajarkan kedisiplinan sebagai dasar
                        keberhasilan di masa depan.
                    </span>
                    <div className="grid grid-cols-2 lg:flex gap-5 w-full">
                        <Link
                            href="/about"
                            className="bg-transparent border border-black hover:bg-stone-50 hover:border-black transition-all duration-200 font-semibold inline-block w-full lg:w-fit text-xs text-black shadow lg:text-sm rounded-md text-center px-5 lg:px-8 py-2 lg:py-3 truncate"
                        >
                            <span>Pelajari Selengkapnya</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className="bg-black/90 font-normal inline-block w-full lg:w-fit text-xs text-white lg:text-sm rounded-md text-center px-5 lg:px-8 py-2 lg:py-3 truncate"
                        >
                            <span>Mulai Sekarang</span>
                        </Link>
                    </div>
                </div>
                <img
                    src={ComponentsImage}
                    alt="Jitu! UI Components"
                    className="w-full mx-auto h-60 lg:m-0 lg:w-fit rounded-xl shadow-sm"
                />
            </section>
        </>
    )
}
