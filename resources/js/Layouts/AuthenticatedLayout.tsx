import Sidebar from '@/Components/Partials/Sidebar'
import Header from '@/Components/Partials/Header'
import { ToastContainer } from 'react-toastify'
import useToastHandler from '@/Hooks/useToastHandler'
import 'react-toastify/dist/ReactToastify.css'

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    useToastHandler()
    return (
        <>
            <div className="w-screen min-h-screen bg-gray-100/80 flex flex-col px-0 lg:px-12 gap-5">
                {children}
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                bodyClassName={() =>
                    'font-poppins font-medium flex items-center text-sm px-1.5 w-auto text-stone-700'
                }
                toastClassName={'w-auto shadow'}
            />
        </>
    )
}

function Indicator({ children, auth }: PageProps) {
    return (
        <div className="w-full h-auto flex flex-col pt-4 lg:pt-0">
            <Header auth={auth} />
            {children}
        </div>
    )
}

function Content({ children, auth }: PageProps) {
    const pathname = window.location.pathname

    return (
        <div className="w-full h-auto flex gap-5 justify-between">
            {pathname.startsWith('/admin/dashboard/notification') ? null : (
                <Sidebar auth={auth} />
            )}
            <main className="w-full h-auto flex flex-col lg:p-0.5 min-h-screen mb-20">
                {children}
            </main>
        </div>
    )
}

AuthenticatedLayout.Indicator = Indicator
AuthenticatedLayout.Content = Content
