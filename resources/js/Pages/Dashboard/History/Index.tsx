import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcumb from '@/Components/Other/Breadcumb'
import Indicator from '@/Components/Other/Indicator'
import TimelineSection from '@/Components/Section/Dashboard/TimelineSection'

export default function Index({
    auth,
    violations,
    totalViolations,
}: PageProps & HistoryPageProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Riwayat Pelanggaran" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Dashboard">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route(
                                    auth?.admin?.user
                                        ? 'admin.dashboard.index'
                                        : 'student.dashboard.index'
                                )}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Riwayat Pelanggaran
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button></Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <TimelineSection
                    auth={auth}
                    violations={violations}
                    totalViolations={totalViolations}
                />
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
