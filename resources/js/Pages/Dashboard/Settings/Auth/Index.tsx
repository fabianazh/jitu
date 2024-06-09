import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcumb from '@/Components/Other/Breadcumb'
import Indicator from '@/Components/Other/Indicator'
import ResetButton from '@/Components/Button/ResetButton'
import FormContainer from '@/Components/Container/FormContainer'
import TextInput from '@/Components/Form/TextInput'
import ConfirmPasswordModal from '@/Components/Modal/ConfirmModal'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { TbEdit, TbEditOff } from 'react-icons/tb'

export default function Index({
    auth,
    authEndpoint,
}: PageProps & AuthSettingsPageProps) {
    const { data, setData, put, errors, reset, processing } = useForm({
        endpoint: authEndpoint.endpoint,
        password: '',
    })

    const [confirmingEndpointUpdate, setConfirmingEndpointUpdate] =
        useState<boolean>(false)

    function confirmEndpointUpdate() {
        setConfirmingEndpointUpdate(true)
    }

    function closeModal() {
        setConfirmingEndpointUpdate(false)
        reset('password')
    }

    function submit(e: React.FormEvent) {
        e.preventDefault()

        put(route('admin.dashboard.settings.auth.update'), {
            onSuccess: () => {
                closeModal()
            },
        })
    }

    useEffect(() => {
        reset('password')
    }, [])

    return (
        <AuthenticatedLayout>
            <Head title="Pengaturan Autentikasi" />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title title="Dashboard">
                        <Breadcumb>
                            <Breadcumb.Item
                                href={
                                    auth?.admin
                                        ? route('admin.dashboard.index')
                                        : route('student.dashboard.index')
                                }
                            >
                                Dashboard
                            </Breadcumb.Item>
                            <Breadcumb.Item
                                href={route('admin.dashboard.settings.index')}
                            >
                                Pengaturan
                            </Breadcumb.Item>
                            <Breadcumb.Item href="" active={true}>
                                Autentikasi
                            </Breadcumb.Item>
                        </Breadcumb>
                    </Indicator.Title>
                    <Indicator.Button></Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-auto">
                    <div className="w-full h-auto flex gap-5 mb-24">
                        <FormContainer>
                            <FormContainer.Heading
                                heading="Pengaturan Autentikasi"
                                desc="Pengaturan autentikasi admin."
                            />

                            <FormContainer.Content>
                                <FormContainer.Input
                                    htmlFor="endpoint"
                                    label="Endpoint Autentikasi Admin"
                                    errorMessage={errors.endpoint}
                                    className="w-full lg:w-7/12"
                                    desc="*min : 4, max : 16"
                                >
                                    <div className="mt-1 relative w-full flex gap-2">
                                        <div
                                            className={`text-sm w-fit shrink-0 py-2.5 px-4 rounded-md shadow-sm bg-stone-200/50 border-stone-200 border focus:ring-0 focus:border-stone-200/50`}
                                        >
                                            <span className="text-[0.65rem] lg:text-xs">
                                                /{' '}
                                                <span className="text-xs lg:text-sm">
                                                    auth
                                                </span>{' '}
                                                /{' '}
                                                <span className="text-xs lg:text-sm">
                                                    login
                                                </span>{' '}
                                                /
                                            </span>
                                        </div>
                                        <TextInput
                                            id="endpoint"
                                            type="text"
                                            className="block w-full"
                                            onChange={(e) =>
                                                setData((prevData) => ({
                                                    ...prevData,
                                                    endpoint:
                                                        e.target.value.replace(
                                                            /\s/g,
                                                            ''
                                                        ),
                                                }))
                                            }
                                            value={data.endpoint}
                                            required
                                            isFocused
                                            autoComplete="off"
                                            placeholder="Masukan Endpoint"
                                        />
                                    </div>
                                </FormContainer.Input>
                            </FormContainer.Content>
                            <FormContainer.Buttons>
                                <ResetButton onClick={() => reset()} />
                                <button
                                    disabled={
                                        data.endpoint.length < 5 ||
                                        data.endpoint.length > 16
                                    }
                                    onClick={confirmEndpointUpdate}
                                    className="text-white bg-blue-500 transition-all duration-200 hover:bg-blue-600 w-full py-2 px-6 rounded lg:rounded-md text-xs lg:text-sm shadow"
                                >
                                    Ubah
                                </button>
                            </FormContainer.Buttons>
                        </FormContainer>
                        <ConfirmPasswordModal
                            show={confirmingEndpointUpdate}
                            onClose={closeModal}
                            submit={submit}
                            maxWidth="lg"
                        >
                            <ConfirmPasswordModal.Title>
                                Apa kamu yakin ingin mengubah endpoint
                                autentikasi untuk admin?
                            </ConfirmPasswordModal.Title>

                            <ConfirmPasswordModal.Text>
                                Pastikan endpoint yang baru sesuai dengan
                                endpoint yang diinginkan.
                            </ConfirmPasswordModal.Text>
                            <FormContainer.Input
                                htmlFor="password"
                                label="Password"
                                errorMessage={errors.password}
                                className="w-full mt-6"
                            >
                                <TextInput
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData((prevData) => ({
                                            ...prevData,
                                            password: e.target.value,
                                        }))
                                    }
                                    value={data.password}
                                    required
                                    isFocused
                                    autoComplete="off"
                                    placeholder="Masukan password"
                                />
                            </FormContainer.Input>
                            <ConfirmPasswordModal.Button
                                closeModal={closeModal}
                                disabled={processing || data.password === ''}
                            ></ConfirmPasswordModal.Button>
                        </ConfirmPasswordModal>
                    </div>
                </section>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
