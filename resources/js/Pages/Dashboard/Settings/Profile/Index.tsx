import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcumb from '@/Components/Other/Breadcumb'
import Indicator from '@/Components/Other/Indicator'
import StudentProfileSection from '@/Components/Section/Profile/Student/DetailSection'
import AdminProfileSection from '@/Components/Section/Profile/Admin/DetailSection'

export default function Index({ auth, admin }: PageProps & ProfilePageProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Profil" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Profil">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={
                                    auth?.admin?.user
                                        ? route('admin.dashboard.index')
                                        : route('student.dashboard.index')
                                }
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={
                                    auth?.admin?.user
                                        ? route(
                                              'admin.dashboard.settings.index'
                                          )
                                        : route(
                                              'student.dashboard.settings.index'
                                          )
                                }
                            >
                                Pengaturan
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Profil
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button></Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                {auth?.admin?.user ? (
                    <AdminProfileSection auth={auth} admin={admin} />
                ) : (
                    <StudentProfileSection auth={auth} />
                )}
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
