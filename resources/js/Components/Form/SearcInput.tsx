import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
} from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { FaSearch } from 'react-icons/fa'

export default forwardRef(function SearchInput(
    {
        className = '',
        isFocused = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }))

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus()
        }
    }, [])

    return (
        <div className="relative h-10 flex items-center rounded-lg">
            <input
                {...props}
                type="text"
                className={`text-sm py-2.5 px-5 bg-white h-full placeholder:text-stone-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-r-none rounded-l-lg border border-r-2 border-r-transparent focus:border-r-indigo-500 border-stone-200 ${className}`}
                ref={localRef}
            />
            {/* <button className="w-11 h-full border border-l-0 border-stone-200 grid place-items-center rounded-r-lg transition-all duration-300 text-stone-600 text-lg">
                <BiSearchAlt />
            </button> */}
        </div>
    )
})
