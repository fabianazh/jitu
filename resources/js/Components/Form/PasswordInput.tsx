import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
    useState,
} from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

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

    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)

    function handlePasswordInput() {
        setIsPasswordHidden((prevState: any) => !prevState)
    }

    const eyeIcon = isPasswordHidden ? (
        <FaRegEye
            onClick={handlePasswordInput}
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-sm lg:text-base z-20"
        />
    ) : (
        <FaRegEyeSlash
            onClick={handlePasswordInput}
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-sm lg:text-base z-20"
        />
    )

    return (
        <div className="w-full relative">
            <input
                {...props}
                type={isPasswordHidden ? 'password' : 'text'}
                className={`text-xs lg:text-sm py-2.5 rounded-md shadow-sm ${className} ${
                    disabled
                        ? 'bg-stone-200/50 border-stone-200 focus:ring-0 focus:border-stone-200/50'
                        : 'border-gray-300 bg-white focus:border-indigo-500 focus:ring-indigo-500'
                }`}
                ref={localRef}
            />
            <div className="absolute h-6 w-16 lg:w-20 rounded-l-md top-1/2 -translate-y-1/2 right-1 bg-gradient-to-l from-white via-white to-transparent z-10" />
            {eyeIcon}
        </div>
    )
})
