import { Head, Link } from '@inertiajs/react'
import ActionLayout from '@/Layouts/ActionLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import CreateSection from '@/Components/Section/Student/CreateSection'

export default function Create({
    auth,
    classes,
}: PageProps & CreateStudentPageProps) {
    return (
        <ActionLayout>
            <Head title={`Profile ${auth?.admin.name || auth?.student.name}`} />

            <ActionLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title
                        title={`Profile ${
                            auth?.admin.name || auth?.student.name
                        }`}
                    >
                        <Breadcumb>
                            <Breadcumb.Item
                                href={route('admin.dashboard.index')}
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Profile
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <Link
                            href={route('admin.dashboard.students.index')}
                            className="w-fit h-fit bg-stone-200 flex items-center gap-2 hover:bg-stone-300 rounded-md px-5 py-1.5 group transition-all duration-300 shadow"
                        >
                            <span className="text-sm font-medium text-black">
                                Kembali
                            </span>
                        </Link>
                    </Indicator.Button>
                </Indicator>
            </ActionLayout.Indicator>

            <ActionLayout.Content>
                <CreateSection classes={classes} />
            </ActionLayout.Content>
        </ActionLayout>
    )
}
