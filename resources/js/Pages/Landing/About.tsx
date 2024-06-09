import { Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'
import AboutJituSection from '@/Components/Section/Landing/AboutJituSection'
import TestimonialsSection from '@/Components/Section/Landing/TestimonialsSection'

export default function About({ auth }: PageProps) {
    return (
        <>
            <Head title="About Jitu!" />

            <GuestLayout auth={auth}>
                <AboutJituSection />
                <TestimonialsSection />
            </GuestLayout>
        </>
    )
}
