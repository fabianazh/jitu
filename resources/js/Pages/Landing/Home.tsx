import { Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'
import HeroSection from '@/Components/Section/Landing/HeroSection'
import ClientsSection from '@/Components/Section/Landing/ClientsSection'
import AboutPasimSection from '@/Components/Section/Landing/AboutPasimSection'
import HomeCTA from '@/Components/CTA/HomeCTA'

export default function Home({ auth }: PageProps) {
    return (
        <>
            <Head title="Jitu! - Menuju Keunggulan, Dengan Kedisiplinan!"></Head>

            <GuestLayout auth={auth}>
                <HeroSection />
                <AboutPasimSection />
                <ClientsSection />
                <HomeCTA />
            </GuestLayout>
        </>
    )
}
