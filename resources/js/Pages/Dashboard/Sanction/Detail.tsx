import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Indicator from '@/Components/Other/Indicator'
import Breadcumb from '@/Components/Other/Breadcumb'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import TextareaInput from '@/Components/Form/TextareaInput'
import FormContainer from '@/Components/Container/FormContainer'
import TextInput from '@/Components/Form/TextInput'
import RedirectButton from '@/Components/Button/RedirectButton'
import DeleteButton from '@/Components/Button/DeleteButton'
import DeleteModal from '@/Components/Modal/DeleteModal'
import TabsContainer from '@/Components/Other/Tabs'
import BackButton from '@/Components/Button/BackButton'

export default function Detail({
    auth,
    sanction,
}: PageProps & DetailSanctionPageProps) {
    const { delete: destroy, processing } = useForm()

    const [confirmingSanctionDeletion, setConfirmingSanctionDeletion] =
        useState<boolean>(false)

    function confirmSanctionDeletion() {
        setConfirmingSanctionDeletion(true)
    }

    function closeModal() {
        setConfirmingSanctionDeletion(false)
    }

    function deleteSanction(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.sanctions.destroy', {
                sanction: sanction,
            }),
            {
                onSuccess: () => {
                    closeModal()
                },
            }
        )
    }

    return (
        <AuthenticatedLayout>
            <Head title="Detail Data Sanksi" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Detail Data Sanksi">
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
                            <Breadcumb.Item
                                href={route(
                                    auth?.admin?.user
                                        ? 'admin.dashboard.sanctions.index'
                                        : 'student.dashboard.sanctions.index'
                                )}
                            >
                                Sanksi
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Detail
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button>
                        <BackButton
                            href={route(
                                auth?.admin?.user
                                    ? 'admin.dashboard.sanctions.index'
                                    : 'student.dashboard.sanctions.index'
                            )}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-auto">
                    <div className="w-full h-auto flex gap-5 mb-24">
                        <FormContainer>
                            <FormContainer.Heading
                                heading="Informasi Bentuk Pelanggaran"
                                desc="Lihat informasi lengkap tentang sanksi ini."
                            />

                            {auth?.admin?.user ? (
                                <>
                                    <FormContainer.Content>
                                        <TabsContainer>
                                            <TabsContainer.Tab label="Informasi">
                                                <FormContainer.Input
                                                    htmlFor="sanction"
                                                    label="Sanksi"
                                                    className="lg:w-7/12 mt-4"
                                                >
                                                    <TextInput
                                                        id="sanction"
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        value={
                                                            sanction.sanction
                                                        }
                                                        readOnly
                                                        isFocused
                                                        autoComplete="off"
                                                        placeholder="Masukan sanksi"
                                                    />
                                                </FormContainer.Input>
                                                <FormContainer.Input
                                                    htmlFor="weight_from"
                                                    label="Bobot dari"
                                                >
                                                    <TextInput
                                                        id="weight_from"
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        value={`${sanction.weight_from} Poin`}
                                                        readOnly
                                                        autoComplete="weight_from"
                                                        placeholder="Masukan bobot dari"
                                                    />
                                                </FormContainer.Input>
                                                <FormContainer.Input
                                                    htmlFor="weight_to"
                                                    label="Bobot sampai"
                                                >
                                                    <TextInput
                                                        id="weight_to"
                                                        type="text"
                                                        className={`mt-1 block w-full`}
                                                        value={`${sanction.weight_to} Poin`}
                                                        readOnly
                                                        autoComplete="weight_to"
                                                        placeholder="Masukan bobot sampai"
                                                    />
                                                </FormContainer.Input>
                                                <FormContainer.Input
                                                    htmlFor="criteria"
                                                    label="Kriteria Sanksi"
                                                >
                                                    <TextareaInput
                                                        id="criteria"
                                                        className="mt-1 block w-full"
                                                        value={
                                                            sanction.criteria
                                                        }
                                                        rows={2}
                                                        readOnly
                                                        autoComplete="off"
                                                        placeholder="Masukan kriteria sanksi"
                                                    />
                                                </FormContainer.Input>
                                            </TabsContainer.Tab>
                                            <TabsContainer.Tab label="Lainnya">
                                                <FormContainer.Input
                                                    htmlFor="totalViolations"
                                                    label="Total Pelanggaran"
                                                >
                                                    <TextInput
                                                        id="totalViolations"
                                                        type="text"
                                                        className={`mt-1 block w-full`}
                                                        value={`${sanction.totalViolations} Pelanggaran`}
                                                        readOnly
                                                        autoComplete="totalViolations"
                                                        placeholder="Belum ada pelanggaran"
                                                    />
                                                </FormContainer.Input>
                                            </TabsContainer.Tab>
                                        </TabsContainer>
                                    </FormContainer.Content>
                                    <FormContainer.Buttons>
                                        <RedirectButton
                                            href={route(
                                                'admin.dashboard.sanctions.edit',
                                                {
                                                    sanction: sanction,
                                                }
                                            )}
                                        />

                                        <DeleteButton
                                            onClick={confirmSanctionDeletion}
                                        />
                                    </FormContainer.Buttons>
                                </>
                            ) : (
                                <FormContainer.Content>
                                    <FormContainer.Input
                                        htmlFor="sanction"
                                        label="Sanksi"
                                        className=""
                                    >
                                        <TextInput
                                            id="sanction"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={sanction.sanction}
                                            readOnly
                                            isFocused
                                            autoComplete="off"
                                            placeholder="Masukan sanksi"
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="weight_from"
                                        label="Bobot dari"
                                    >
                                        <TextInput
                                            id="weight_from"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={`${sanction.weight_from} Poin`}
                                            readOnly
                                            autoComplete="weight_from"
                                            placeholder="Masukan bobot dari"
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="weight_to"
                                        label="Bobot sampai"
                                    >
                                        <TextInput
                                            id="weight_to"
                                            type="text"
                                            className={`mt-1 block w-full`}
                                            value={`${sanction.weight_to} Poin`}
                                            readOnly
                                            autoComplete="weight_to"
                                            placeholder="Masukan bobot sampai"
                                        />
                                    </FormContainer.Input>
                                    <FormContainer.Input
                                        htmlFor="criteria"
                                        label="Kriteria Sanksi"
                                    >
                                        <TextareaInput
                                            id="criteria"
                                            className="mt-1 block w-full"
                                            value={sanction.criteria}
                                            rows={2}
                                            readOnly
                                            autoComplete="off"
                                            placeholder="Masukan kriteria sanksi"
                                        />
                                    </FormContainer.Input>
                                </FormContainer.Content>
                            )}
                        </FormContainer>
                        <DeleteModal
                            show={confirmingSanctionDeletion}
                            onClose={closeModal}
                        >
                            <DeleteModal.Title>
                                Apa kamu yakin ingin menghapus data sanksi{' '}
                                {sanction?.sanction} ?
                            </DeleteModal.Title>

                            <DeleteModal.Text>
                                Setelah data sanksi dihapus, semua sumber daya
                                dan data sanksi akan dihapus permanen.
                            </DeleteModal.Text>
                            <DeleteModal.Button
                                closeModal={closeModal}
                                onDelete={deleteSanction}
                                disabled={processing}
                            ></DeleteModal.Button>
                        </DeleteModal>
                    </div>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
