import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcumb from '@/Components/Other/Breadcumb'
import Indicator from '@/Components/Other/Indicator'
import BackButton from '@/Components/Button/BackButton'
import RedirectButton from '@/Components/Button/RedirectButton'
import { BsDot } from 'react-icons/bs'
import DeleteButton from '@/Components/Button/DeleteButton'
import DeleteModal from '@/Components/Modal/DeleteModal'
import { useForm } from '@inertiajs/react'
import { useState } from 'react'

export default function Index({
    auth,
    notification,
    student,
    admin,
    violation,
}: PageProps & DetailNotificationPageProps) {
    const newViolationNotification = notification.type.endsWith('NewViolation')
    const pointsThresholdReachedNotification = notification.type.endsWith(
        'PointsThresholdReached'
    )
    const messageFromGuestNotification =
        notification.type.endsWith('MessageFromGuest')

    const { delete: destroy, processing } = useForm()

    const [confirmingNotificationDeletion, setConfirmingNotificationDeletion] =
        useState<boolean>(false)

    function closeModal() {
        setConfirmingNotificationDeletion(false)
    }

    function deleteNotification(e: React.FormEvent): void {
        e.preventDefault()

        destroy(
            route('admin.dashboard.notifications.destroy', {
                notification: notification,
            }),
            {
                onSuccess: () => closeModal(),
            }
        )

        closeModal()
    }

    return (
        <AuthenticatedLayout>
            <Head
                title={`Notifikasi ${
                    messageFromGuestNotification ? 'Kritik & Saran' : ''
                } ${newViolationNotification ? 'Pelanggaran Baru' : ''} ${
                    pointsThresholdReachedNotification
                        ? 'Batas Poin Tercapai'
                        : ''
                }`}
            />

            <AuthenticatedLayout.Indicator auth={auth}>
                <Indicator>
                    <Indicator.Title
                        title={`Notifikasi ${
                            messageFromGuestNotification ? 'Kritik & Saran' : ''
                        } ${
                            newViolationNotification ? 'Pelanggaran Baru' : ''
                        } ${
                            pointsThresholdReachedNotification
                                ? 'Batas Poin Tercapai'
                                : ''
                        }`}
                    >
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
                                        ? 'admin.dashboard.notifications.index'
                                        : 'student.dashboard.notifications.index'
                                )}
                            >
                                Notifikasi
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
                                    ? 'admin.dashboard.notifications.index'
                                    : 'student.dashboard.notifications.index'
                            )}
                        />
                    </Indicator.Button>
                </Indicator>
            </AuthenticatedLayout.Indicator>

            <AuthenticatedLayout.Content auth={auth}>
                <section className="w-full h-fit pb-20 bg-transparent">
                    <div className="w-full h-fit py-3 pb-6 lg:py-4 px-3 lg:px-5 bg-[#fefefe] shadow lg:rounded-lg -z-10">
                        <div className="w-full h-auto mb-3 rounded-md flex justify-between items-start py-1 px-0.5">
                            <div className="flex flex-col h-full gap-0">
                                <div className="flex flex-wrap gap-0 lg:gap-2 items-center">
                                    <div className="w-full lg:w-fit">
                                        <h2 className="inline-block text-sm lg:text-xl font-semibold">
                                            {notification.data.title}
                                        </h2>
                                    </div>
                                    <div className="lg:bg-stone-200/80 block rounded-md lg:shadow-sm lg:px-2 lg:py-0.5">
                                        <span className="font-medium text-[11px] lg:text-xs">
                                            {messageFromGuestNotification
                                                ? 'Kritik & Saran'
                                                : ''}
                                            {newViolationNotification
                                                ? 'Pelanggaran Baru'
                                                : ''}
                                            {pointsThresholdReachedNotification
                                                ? 'Batas Poin Tercapai'
                                                : ''}
                                        </span>
                                    </div>
                                    <BsDot className="text-stone-600 block lg:hidden" />
                                    <span className="text-[10px] lg:text-sm font-medium block lg:hidden">
                                        {notification.date}
                                    </span>
                                </div>
                                <div className="text-[10px] lg:text-sm">
                                    <>
                                        {messageFromGuestNotification && (
                                            <span>
                                                Email :{' '}
                                                {notification.data.email}
                                            </span>
                                        )}
                                        {auth?.admin?.user &&
                                            pointsThresholdReachedNotification && (
                                                <>
                                                    Penerima :{' '}
                                                    <Link
                                                        href={route(
                                                            'admin.dashboard.students.show',
                                                            { student: student }
                                                        )}
                                                        className="text-blue-700 hover:underline"
                                                    >
                                                        {student?.name}
                                                    </Link>
                                                </>
                                            )}
                                        {auth?.student?.user &&
                                            pointsThresholdReachedNotification && (
                                                <>Pengirim : {admin?.name}</>
                                            )}
                                        {auth?.admin?.user &&
                                            newViolationNotification && (
                                                <>
                                                    Penerima :{' '}
                                                    <Link
                                                        href={route(
                                                            'admin.dashboard.students.show',
                                                            { student: student }
                                                        )}
                                                        className="text-blue-700 hover:underline"
                                                    >
                                                        {student?.name}
                                                    </Link>
                                                </>
                                            )}
                                        {auth?.student?.user &&
                                            newViolationNotification && (
                                                <>Pengirim : {admin?.name}</>
                                            )}
                                    </>
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <span className="text-[10px] lg:text-sm font-medium">
                                    {notification.date}
                                </span>
                            </div>
                        </div>
                        <div>
                            {messageFromGuestNotification && (
                                <span className="text-xs lg:text-base">
                                    "{notification.data.message}" -{' '}
                                    <span className="text-sm lg:text-base font-medium">
                                        {notification.data.name}
                                    </span>
                                </span>
                            )}
                            {pointsThresholdReachedNotification && (
                                <span className="text-xs lg:text-base">
                                    "{notification.data.message}" -{' '}
                                    <span className="text-sm lg:text-base font-medium">
                                        Jitu!
                                    </span>
                                </span>
                            )}
                            {newViolationNotification && (
                                <span className="text-xs lg:text-base">
                                    "{notification.data.message}" -{' '}
                                    <span className="text-sm lg:text-base font-medium">
                                        Jitu!
                                    </span>
                                </span>
                            )}
                        </div>
                        <div className="mt-5">
                            {pointsThresholdReachedNotification && (
                                <RedirectButton
                                    href={
                                        auth?.admin?.user
                                            ? route(
                                                  'admin.dashboard.students.show',
                                                  { student: student }
                                              )
                                            : route(
                                                  'student.dashboard.profile.index'
                                              )
                                    }
                                    className="block"
                                    text="Lihat Poin"
                                />
                            )}
                            {newViolationNotification && (
                                <RedirectButton
                                    href={route(
                                        auth?.admin?.user
                                            ? 'admin.dashboard.violations.show'
                                            : 'student.dashboard.history.show',
                                        {
                                            violation: violation,
                                        }
                                    )}
                                    className="block"
                                    text="Lihat Pelanggaran"
                                />
                            )}
                            {messageFromGuestNotification && (
                                <DeleteButton
                                    onClick={() =>
                                        setConfirmingNotificationDeletion(true)
                                    }
                                />
                            )}
                        </div>
                    </div>
                </section>
                <DeleteModal
                    show={confirmingNotificationDeletion}
                    onClose={closeModal}
                >
                    <DeleteModal.Title>
                        Apa kamu yakin ingin menghapus notifikasi dari{' '}
                        {notification?.data.name} ?
                    </DeleteModal.Title>

                    <DeleteModal.Text>
                        Setelah anda mengklik hapus, notifikasi akan dihapus
                        permanen.
                    </DeleteModal.Text>
                    <DeleteModal.Button
                        closeModal={closeModal}
                        onDelete={deleteNotification}
                        disabled={processing}
                    ></DeleteModal.Button>
                </DeleteModal>
            </AuthenticatedLayout.Content>
        </AuthenticatedLayout>
    )
}
