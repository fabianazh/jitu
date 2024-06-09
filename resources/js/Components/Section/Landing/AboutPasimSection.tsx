import AdvantageCard from '@/Components/Card/AdvantageCard'
import SMKPKImage from '@/Assets/Illustration/smkpk.webp'
import CodeImage from '@/Assets/Illustration/code.jpg'
import JituDashboardImage from '@/Assets/Illustration/original-e6663b80dfd9e7fdc33764c1975cd5f5.png'

export default function AboutPasimSection() {
    const abouts = [
        {
            id: 1,
            leftContent: false,
            imagePath: SMKPKImage as unknown as string,
            altText: 'SMK Pusat Keunggulan',
            heading: (
                <span className="text-black text-base lg:text-xl font-semibold">
                    SMK <span className="text-blue-700">Pusat Keunggulan</span>{' '}
                    di Kota Sukabumi
                </span>
            ),
            desc: 'Sejak tahun 2022, SMK Pasim Plus Kota Sukabumi telah membanggakan diri sebagai wujud keunggulan pendidikan, meraih pengakuan sebagai Sekolah Pusat Keunggulan dari Kemendikbudristek RI. Dengan keberhasilan ini, SMK Pasim Plus Kota Sukabumi telah melampaui batas-batas ekspektasi, menjadi pilar utama pendidikan di Sukabumi dan mendapatkan predikat sebagai Sekolah Swasta Terbaik yang diakui secara nasional.',
        },
        {
            id: 2,
            leftContent: true,
            imagePath: CodeImage as unknown as string,
            altText: 'Elon Musk explaining Jitu! Features',
            heading: (
                <span className="text-black text-base lg:text-xl font-semibold">
                    Program
                    <span className="text-blue-700"> Jurusan Populer</span> dan
                    Relevan Dengan DUDI
                </span>
            ),
            desc: 'SMK Pasim Plus Kota Sukabumi mempersembahkan beragam program jurusan yang tidak hanya populer namun juga sangat relevan dengan kebutuhan industri. Dengan mengadopsi pendekatan pembelajaran yang inovatif, kami berkomitmen untuk mempersiapkan setiap siswa agar dapat meraih kesuksesan dalam karir mereka, sesuai dengan tuntutan dunia industri.',
        },
        {
            id: 3,
            leftContent: false,
            imagePath: JituDashboardImage as unknown as string,
            altText: 'Jitu! Features',
            heading: (
                <span className="text-black text-base lg:text-xl font-semibold">
                    Membentuk
                    <span className="text-blue-700"> Kedisiplinan </span>Melalui
                    Program Jitu!
                </span>
            ),
            desc: 'Jitu! berkomitmen sepenuh hati untuk membimbing dan mendukung siswa dalam mengembangkan sikap tanggung jawab, ketertiban, dan kedisiplinan yang kuat. Melalui pendekatan ini, kami tidak hanya membentuk siswa yang berprestasi akademis, tetapi juga menciptakan landasan kokoh yang mempersiapkan mereka untuk meraih kesuksesan yang berkelanjutan di masa depan.',
        },
    ]

    return (
        <section
            id="features"
            className="w-full px-6 lg:px-0 lg:w-11/12 mx-auto scroll-mt-24 flex-col items-center gap-4 lg:gap-9 flex h-auto mt-20 lg:mt-0"
        >
            <span className="text-2xl lg:text-4xl text-black font-semibold font-ubuntu">
                Tentang
                <span className="font-bold text-blue-700">
                    {' '}
                    SMK Pasim{' '}
                </span>{' '}
                Plus
            </span>
            <div className="flex flex-col lg:grid lg:grid-rows-3 gap-4 lg:gap-7 w-full lg:w-10/12 h-auto">
                {abouts.map((advantage) => {
                    return (
                        <AdvantageCard
                            key={advantage.id}
                            leftContent={advantage.leftContent}
                        >
                            <AdvantageCard.Video
                                imgPath={advantage.imagePath}
                                altText={advantage.altText}
                            />
                            <AdvantageCard.Description id={advantage.id}>
                                {advantage.heading}
                                <span className="text-zinc-700 font-medium text-sm lg:text-base">
                                    {advantage.desc}
                                </span>
                            </AdvantageCard.Description>
                        </AdvantageCard>
                    )
                })}
            </div>
        </section>
    )
}
