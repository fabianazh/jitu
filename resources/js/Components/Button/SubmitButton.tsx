import { InputHTMLAttributes } from 'react'

export default function SubmitButton({
    disabled,
}: InputHTMLAttributes<HTMLInputElement>) {
    const pathname = window.location.pathname

    return (
        <button
            type="submit"
            className={`text-white bg-blue-500 transition-all duration-200 w-full py-2 px-6 rounded lg:rounded-md text-xs lg:text-sm shadow ${
                disabled ? 'opacity-60' : 'opacity-100 hover:bg-blue-600'
            }`}
            disabled={disabled}
        >
            {pathname.endsWith('/edit') ? 'Ubah' : 'Simpan'}
        </button>
    )
}
