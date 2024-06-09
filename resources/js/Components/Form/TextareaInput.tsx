import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    TextareaHTMLAttributes,
} from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    isFocused?: boolean
}

export default forwardRef(function TextareaInput(
    { className = '', isFocused = false, ...props }: TextareaProps,
    ref
) {
    const localRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }))

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus()
        }
    }, [isFocused])

    return (
        <textarea
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-xs lg:text-sm placeholder:text-xs lg:placeholder:text-sm h-auto resize-none' +
                className
            }
            ref={localRef}
        />
    )
})
