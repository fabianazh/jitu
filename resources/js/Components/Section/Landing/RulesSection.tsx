import SheetsImage from '@/Assets/Illustration/urban-flying-sheets-of-documents-1.png'

export default function RulesSection({ categories }: InformationPageProps) {
    return (
        <section
            id="rules"
            className="w-full min-h-screen px-12 mb-16 relative"
        >
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(29,78,216,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <div className="w-full h-screen grid grid-cols-2 gap-6 items-center">
                <div className="flex flex-col gap-7">
                    <span className="text-5xl font-semibold font-ubuntu">
                        Peraturan{' '}
                        <span className="text-blue-700 font-bold">
                            SMK Pasim
                        </span>
                    </span>
                    <span className="font-medium text-zinc-700">
                        Selamat datang di SMK Pasim, tempat di mana setiap
                        langkah menjadi bagian dari perjalanan unik pembelajaran
                        dan pertumbuhan. Kami, sebagai komunitas SMK Pasim,
                        menganggap penting untuk bersama-sama berkomitmen dalam
                        menciptakan lingkungan belajar yang tidak hanya positif
                        dan kondusif, tetapi juga mendukung pertumbuhan holistik
                        setiap individu. Berikut jumlah peraturan di SMK Pasim
                        berdasarkan kategori :
                    </span>
                    <div className="flex w-full h-auto gap-8">
                        {categories.map((category: ViolationCategory) => (
                            <div className="flex w-1/4 shrink-0 h-auto flex-col gap-1">
                                <span className="text-4xl text-blue-700 font-bold">
                                    {category.violations.length}
                                </span>
                                <span className="font-medium text-zinc-700">
                                    Peraturan Kategori {category.category}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full h-full grid place-items-center">
                    <img
                        src={SheetsImage}
                        alt="Sheets Image"
                        className="w-8/12 h-fit drop-shadow-xl"
                        draggable={false}
                    />
                </div>
            </div>
        </section>
    )
}
