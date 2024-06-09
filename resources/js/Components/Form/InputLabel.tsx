import { LabelHTMLAttributes } from 'react'

export default function InputLabel({
    value,
    desc,
    descClassName,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & {
    value?: string
    desc?: string
    descClassName?: string
}) {
    return (
        <>
            {desc ? (
                <div className="w-full flex justify-between items-center">
                    <label
                        {...props}
                        className={`block w-fit font-medium text-sm lg:text-base text-gray-900 mb-1.5 ${className}`}
                    >
                        {value ? value : children}
                    </label>
                    <span
                        className={`text-[0.65rem] lg:text-xs text-gray-500 font-medium ${descClassName}`}
                    >
                        {desc}
                    </span>
                </div>
            ) : (
                <label
                    {...props}
                    className={`block w-fit font-medium text-sm lg:text-base text-gray-900 mb-1.5 ${className}`}
                >
                    {value ? value : children}
                </label>
            )}
        </>
    )
}
