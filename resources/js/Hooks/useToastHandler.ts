import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'

export default function useToastHandler() {
    const { flash } = usePage().props as ToastProps
    useEffect(() => {
        if (flash?.info) {
            toast.info(flash.info, {
                progress: undefined,
                autoClose: 3000,
            })
        } else if (flash?.success) {
            toast.success(flash.success, {
                progress: undefined,
                autoClose: 3000,
            })
        } else if (flash?.warning) {
            toast.warning(flash.warning, {
                progress: undefined,
                autoClose: 3000,
            })
        } else if (flash?.error) {
            toast.error(flash.error, {
                progress: undefined,
                autoClose: 3000,
            })
        }
    }, [flash])
}
