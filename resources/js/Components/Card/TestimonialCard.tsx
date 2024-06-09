import { FaQuoteRight } from 'react-icons/fa6'

export default function TestimonialsCard({
    children,
    customClass,
}: {
    children: React.ReactNode
    customClass: string
}) {
    return (
        <div
            className={`${customClass} bg-white h-fit flex flex-col gap-3 shadow rounded-lg p-4 pb-6`}
        >
            <FaQuoteRight className="text-xl lg:text-3xl text-black" />
            {children}
        </div>
    )
}

export function Text({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-sm lg:text-base font-medium mb-2">
            {children}
        </span>
    )
}

export function Profile({
    imgPath,
    altText,
    name,
    role,
}: {
    imgPath: string
    altText: string
    name: string
    role: string
}) {
    return (
        <div className="w-full h-auto flex items-center gap-5">
            <div className="w-[13%] lg:w-[20%] h-auto">
                <img
                    src={imgPath}
                    alt={altText}
                    width={'0'}
                    height={'0'}
                    className="w-full shadow-md aspect-square rounded-full"
                    draggable={false}
                />
            </div>
            <div className="w-9/12 h-auto flex flex-col justify-center">
                <span className="text-black font-semibold text-sm lg:text-base 2xl:text-lg">
                    {name}
                </span>
                <span className="text-zinc-700 font-medium text-sm">
                    {role}
                </span>
            </div>
        </div>
    )
}

TestimonialsCard.Text = Text
TestimonialsCard.Profile = Profile
