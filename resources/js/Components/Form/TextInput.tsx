import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
} from 'react'

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        disabled = false,
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
        <input
            {...props}
            type={type}
            className={`text-xs lg:text-sm py-2.5 rounded-md shadow-sm ${className} ${
                disabled
                    ? 'bg-stone-200/50 border-stone-200 focus:ring-0 focus:border-stone-200/50'
                    : 'border-gray-300 bg-white focus:border-indigo-500 focus:ring-indigo-500'
            }`}
            ref={localRef}
        />
    )
})
