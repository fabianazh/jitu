export default function DeleteButton({ ...props }) {
    return (
        <button
            {...props}
            className="text-white bg-red-500 transition-all duration-200 hover:bg-red-600 w-full lg:w-fit py-2 px-6 rounded text-xs lg:rounded-md lg:text-sm shadow"
        >
            Hapus
        </button>
    )
}
