import { Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'
import RulesSection from '@/Components/Section/Landing/RulesSection'

export default function Rules({
    auth,
    categories,
}: PageProps & InformationPageProps) {
    return (
        <>
            <Head title="Peraturan SMK Pasim"></Head>

            <GuestLayout auth={auth}>
                <RulesSection categories={categories} />
                <section
                    id="about"
                    className="w-full min-h-screen px-12 mb-16 relative flex flex-col gap-6"
                >
                    {categories.map(
                        (category: ViolationCategory, index: number) => (
                            <div
                                key={index}
                                className={`bg-[#fefefe] w-8/12 rounded-lg p-6 flex flex-col gap-2 shadow ${
                                    index % 2 !== 0 ? 'place-self-end' : ''
                                }`}
                            >
                                <span
                                    className={`text-3xl font-bold ${
                                        category.category === 'Ringan'
                                            ? 'text-blue-700'
                                            : '' ||
                                              category.category === 'Sedang'
                                            ? 'text-green-600'
                                            : '' ||
                                              category.category === 'Berat'
                                            ? 'text-red-600'
                                            : ''
                                    }`}
                                >
                                    Kategori {category.category}
                                </span>
                                <ul className="flex flex-col list-decimal font-medium list-inside">
                                    {category.violations.map(
                                        (violation: ViolationForm) => (
                                            <li key={category.id}>
                                                {violation.description}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )
                    )}
                </section>
            </GuestLayout>
        </>
    )
}
