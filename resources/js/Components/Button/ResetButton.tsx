export default function ResetButton({ ...props }) {
    return (
        <button
            {...props}
            type="reset"
            className="font-medium text-black bg-stone-200 transition-all duration-200 hover:bg-stone-300 w-full py-2 px-6 rounded lg:rounded-md text-xs lg:w-fit lg:text-sm shadow"
        >
            Reset
        </button>
    )
}
