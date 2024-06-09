import { Link } from '@inertiajs/react'
import HeroIllustration from '@/Assets/Illustration/hero-illustration.png'

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="w-full lg:min-h-screen px-6 lg:px-12 relative flex items-center justify-center z-10 pt-20 lg:pt-0"
        >
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(29,78,216,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <div className="w-full h-auto max-w-screen-xl flex flex-col-reverse lg:flex-row justify-center items-center">
                <div className="flex flex-col gap-4 lg:gap-5 w-full lg:w-6/12 h-auto">
                    <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl truncate text-start lg:text-start">
                        Menuju Keunggulan,
                        <span className="text-blue-600 block leading-snug">
                            Dengan Kedisiplinan!
                        </span>
                    </h1>
                    <span className="block max-w-2xl text-sm font-medium text-zinc-700 sm:text-base mb-2 lg:mb-4 tracking-[0.01em]">
                        Selamat datang di JItu!, program kedisiplinan yang
                        inovatif untuk memperkuat integritas dan tanggung jawab
                        siswa SMK Pasim. Kami percaya bahwa pendidikan yang
                        efektif tidak hanya mencakup pengetahuan akademis,
                        tetapi juga mengajarkan kedisiplinan sebagai dasar
                        keberhasilan di masa depan.
                    </span>
                    <div className="grid grid-cols-2 lg:flex justify-center w-full lg:justify-start items-start gap-4 lg:gap-6 lg:w-fit">
                        <Link href="/dashboard">
                            <div className="bg-black/90 font-normal inline-block w-full text-center lg:w-fit text-white text-xs lg:text-sm rounded-md px-4 lg:px-8 py-2.5 lg:py-3 truncate border">
                                <span>Mulai Sekarang</span>
                            </div>
                        </Link>
                        <a
                            href="#features"
                            className="bg-transparent border border-blue-600 hover:bg-stone-50 hover:border-black transition-all duration-200 font-semibold inline-block w-full text-center lg:w-fit text-black shadow text-xs lg:text-sm rounded-md px-4 lg:px-8 py-2.5 lg:py-3 truncate"
                        >
                            <span>Pelajari Selengkapnya</span>
                        </a>
                    </div>
                </div>
                <div className="w-10/12 lg:w-6/12 grid place-items-center h-full">
                    <img
                        src={HeroIllustration}
                        alt="Wlee"
                        className="w-full h-fit"
                        draggable={false}
                    />
                </div>
            </div>
        </section>
    )
}
