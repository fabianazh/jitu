import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    SelectHTMLAttributes,
} from 'react'

export default forwardRef(function SelectInput(
    {
        className = '',
        isFocused = false,
        defaultOption = 'Pilih Opsi',
        children,
        ...props
    }: SelectHTMLAttributes<HTMLSelectElement> & {
        isFocused?: boolean
        defaultOption?: string
    },
    ref
) {
    const localRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }))

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus()
        }
    }, [])

    return (
        <select
            {...props}
            className={`
                border-gray-300 bg-white text-xs lg:text-sm py-2.5 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}
           `}
            ref={localRef}
        >
            <option value="" disabled hidden className="text-xl lg:text-sm">
                {defaultOption}
            </option>
            {children}
        </select>
    )
})
