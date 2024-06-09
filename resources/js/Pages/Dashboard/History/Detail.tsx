import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import TextInput from '@/Components/Form/TextInput'
import TextareaInput from '@/Components/Form/TextareaInput'
import FormContainer from '@/Components/Container/FormContainer'
import TabsContainer from '@/Components/Other/Tabs'
import BackButton from '@/Components/Button/BackButton'

export default function Detail({
    auth,
    violation,
}: PageProps & DetailViolationPageProps) {
    return (
        <AuthenticatedLayout>
            <Head title={`Detail Pelanggaran ${violation.date}`} />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title
                        title={`Detail Pelanggaran ${violation.date}`}
                    >
                        <Breadcumb>
                            <Breadcumb.Item
                                href={
                                    auth?.admin?.user?.id
                                        ? route('admin.dashboard.index')
                                        : route('student.dashboard.index')
                                }
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={
                                    auth?.admin?.user?.id
                                        ? route(
                                              'admin.dashboard.violations.index'
                                          )
                                        : route(
                                              'student.dashboard.history.index'
                                          )
                                }
                            >
                                Riwayat Pelanggaran
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Detail
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={
                                auth?.admin?.user?.id
                                    ? route('admin.dashboard.violations.index')
                                    : route('student.dashboard.history.index')
                            }
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-auto flex gap-5 mb-24">
                    <FormContainer>
                        <FormContainer.Heading
                            heading={`Informasi Pelanggaran ${violation.date}`}
                            desc="Lihat informasi lengkap tentang pelanggaran ini."
                        />

                        <FormContainer.Content>
                            <TabsContainer>
                                <TabsContainer.Tab label="Pelanggaran dan Sanksi">
                                    <FormContainer.Input
                                        htmlFor="violation_category"
                                        label="Kategori Bentuk Pelanggaran"
                                    >
                                        <TextInput
                                            id="violation_category"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.violation_category}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="violation_form"
                                        label="Bentuk Pelanggaran"
                                    >
                                        <TextInput
                                            id="violation_form"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.violation_form}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="sanction"
                                        label="Sanksi"
                                    >
                                        <TextInput
                                            id="sanction"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.sanction}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="weight"
                                        label="Total Penambahan Poin"
                                    >
                                        <TextInput
                                            id="weight"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={`${violation.weight} Poin`}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                </TabsContainer.Tab>
                                <TabsContainer.Tab label="Lainnya">
                                    <FormContainer.Input
                                        htmlFor="date"
                                        label="Tanggal Pelanggaran"
                                    >
                                        <TextInput
                                            id="date"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={violation.date}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="student_points"
                                        label="Poin Saat Ini"
                                    >
                                        <TextInput
                                            id="student_points"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={`${violation.student_points} Poin`}
                                            readOnly
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="message"
                                        label="Pesan untuk siswa"
                                    >
                                        <TextareaInput
                                            id="message"
                                            className="mt-1 block w-full"
                                            value={violation.message}
                                            rows={4}
                                            readOnly
                                            placeholder="Tidak ada pesan"
                                        />
                                    </FormContainer.Input>
                                </TabsContainer.Tab>
                            </TabsContainer>
                        </FormContainer.Content>
                    </FormContainer>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
