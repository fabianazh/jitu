import GlobeImage from '@/Assets/Illustration/urban-earth.png'

export default function AboutJituSection() {
    return (
        <section
            id="about"
            className="w-full h-auto lg:min-h-screen px-6 lg:px-12 mb-16 relative pt-24 lg:pt-0"
        >
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(29,78,216,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <div className="w-full h-auto lg:h-screen flex flex-col lg:flex-row gap-6 items-center">
                <div className="w-full h-full grid place-items-center">
                    <img
                        src={GlobeImage}
                        alt="Globe Image"
                        className="w-6/12 lg:w-8/12 h-fit drop-shadow-xl"
                        draggable={false}
                    />
                </div>
                <div className="w-full flex flex-col gap-4 lg:gap-7">
                    <span className="text-2xl lg:text-5xl font-semibold font-ubuntu">
                        Apa itu{' '}
                        <span className="text-blue-700 font-bold">Jitu?</span>
                    </span>
                    <span className="text-sm lg:text-sm font-medium text-zinc-700">
                        Jitu merupakan sebuah program inovatif yang bertujuan
                        untuk memperkuat dan meningkatkan tata tertib di
                        lingkungan SMK Pasim. Dengan fokus pada disiplin dan
                        pengembangan karakter, program ini tidak hanya
                        menciptakan sebuah sekolah yang lebih baik, tetapi juga
                        memberikan kesempatan kepada siswa untuk tumbuh dan
                        berkembang secara holistik. Kami berkomitmen untuk
                        menciptakan lingkungan belajar yang positif, mendukung,
                        dan inspiratif, di mana setiap siswa dapat meraih
                        potensinya secara maksimal. Bersama-sama, kita membangun
                        masa depan yang lebih baik untuk pendidikan di SMK
                        Pasim!
                    </span>
                    <div className="flex w-full h-auto gap-8 mt-4 lg:mt-0">
                        <div className="flex w-1/4 shrink-0 h-auto flex-col gap-1">
                            <span className="text-2xl lg:text-4xl text-blue-700 font-bold">
                                75%
                            </span>
                            <span className="font-medium text-sm lg:text-base text-zinc-700">
                                Penurunan{' '}
                                <span className="block">Pelanggaran</span>
                            </span>
                        </div>
                        <div className="flex w-1/4 shrink-0 h-auto flex-col gap-1">
                            <span className="text-2xl lg:text-4xl text-blue-700 font-bold">
                                50%
                            </span>
                            <span className="font-medium text-sm lg:text-base text-zinc-700">
                                Peningkatan Siswa Berprestasi
                            </span>
                        </div>
                        <div className="flex w-1/4 shrink-0 h-auto flex-col gap-1">
                            <span className="text-2xl lg:text-4xl text-blue-700 font-bold">
                                600+
                            </span>
                            <span className="font-medium text-sm lg:text-base text-zinc-700">
                                Dukungan Orang Tua Siswa
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
