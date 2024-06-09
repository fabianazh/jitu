import InputError from '../Form/InputError'
import InputLabel from '../Form/InputLabel'

export default function FormContainer({
    children,
    className = 'gap-4 lg:gap-6 ',
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={`w-full h-fit bg-white shadow lg:rounded-lg p-3 pb-5 lg:pb-6 lg:p-6 flex flex-col ${className}`}
        >
            {children}
        </div>
    )
}

function Heading({ heading, desc }: { heading: string; desc: string }) {
    return (
        <header>
            <h2 className="text-sm lg:text-xl font-medium text-gray-900">
                {heading}
            </h2>
            <span className="block mt-1 text-[10px] lg:text-sm text-gray-600">
                {desc}
            </span>
        </header>
    )
}

function Content({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return <div className={`flex flex-col ${className}`}>{children}</div>
}

function Input({
    htmlFor,
    label,
    desc,
    descClassName,
    className = 'mt-4 w-full lg:w-7/12 ',
    children,
    errorMessage,
}: {
    htmlFor?: string
    label: string
    desc?: string
    descClassName?: string
    className?: string
    children: React.ReactNode
    errorMessage?: string | undefined
}) {
    return (
        <div className={`lg:w-7/12 ${className}`}>
            <InputLabel
                htmlFor={htmlFor}
                value={label}
                className="text-xs lg:text-sm"
                desc={desc}
                descClassName={descClassName}
            />
            <div className="relative">{children}</div>
            <InputError className="mt-2" message={errorMessage} />
        </div>
    )
}

function Buttons({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={`grid grid-cols-2 lg:flex gap-3 items-center lg:w-fit mt-2 ${className}`}
        >
            {children}
        </div>
    )
}

FormContainer.Heading = Heading
FormContainer.Content = Content
FormContainer.Input = Input
FormContainer.Buttons = Buttons
