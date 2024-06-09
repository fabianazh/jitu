import Footer from '@/Components/Partials/Footer'
import Header from '@/Components/Partials/Header'
import useToastHandler from '@/Hooks/useToastHandler'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function GuestLayout({ auth, children }: PageProps) {
    useToastHandler()
    const pathname = window.location.pathname

    return (
        <>
            <Header auth={auth} />
            <main
                className={`z-0 p-0 ${
                    pathname === '/' || '/contact' ? '' : 'mt-20'
                }`}
            >
                {children}
            </main>
            <Footer />
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
                    'font-poppins font-medium flex items-center truncate text-sm px-1.5'
                }
            />
        </>
    )
}
