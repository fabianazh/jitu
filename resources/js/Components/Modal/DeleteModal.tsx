import { Fragment, InputHTMLAttributes, PropsWithChildren } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Link } from '@inertiajs/react'

export default function DeleteModal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}: PropsWithChildren<{
    show: boolean
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    closeable?: boolean
    onClose: CallableFunction
}>) {
    const close = () => {
        if (closeable) {
            onClose()
        }
    }

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth]

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-[1000] transform transition-all"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}
                    >
                        <div className="p-6">{children}</div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}

function Title({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-base lg:text-xl font-medium text-gray-900">
            {children}
        </h2>
    )
}

function Text({
    children,
    className = 'text-xs lg:text-sm',
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <span className={`mt-2 block text-gray-600 ${className}`}>
            {children}
        </span>
    )
}

function Button({
    closeModal,
    onDelete,
    disabled,
}: InputHTMLAttributes<HTMLInputElement> & {
    closeModal: () => void
    onDelete: (e: React.FormEvent) => void
}) {
    return (
        <div className="mt-6 flex justify-end gap-5">
            <button
                onClick={closeModal}
                className="bg-stone-200 font-medium px-4 lg:px-5 shadow text-xs lg:text-sm py-1.5 lg:py-2 rounded lg:rounded-md focus:outline-none hover:bg-stone-300 transition-all duration-200 ease-in-out"
            >
                Batal
            </button>

            <button
                disabled={disabled}
                onClick={onDelete}
                className="bg-red-500 text-white font-normal px-4 lg:px-5 shadow text-xs lg:text-sm py-1.5 lg:py-2 rounded lg:rounded-md focus:outline-none focus:bg-red-600 hover:bg-red-600 transition-all duration-200 ease-in-out"
            >
                Hapus data
            </button>
        </div>
    )
}

DeleteModal.Title = Title
DeleteModal.Text = Text
DeleteModal.Button = Button
