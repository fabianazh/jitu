import { Link } from '@inertiajs/react'
import { BsFillPlayCircleFill } from 'react-icons/bs'

export default function AdvantageCard({
    leftContent,
    children,
}: {
    leftContent: boolean
    children: React.ReactNode
}) {
    return (
        <div
            className={`shadow lg:shadow-none bg-[#fefefe] rounded-xl lg:bg-transparent w-full h-auto flex flex-col lg:flex-row lg:gap-4 ${
                leftContent ? 'lg:flex-row-reverse' : ''
            }`}
        >
            {children}
        </div>
    )
}

export function Video({
    imgPath,
    altText,
}: {
    imgPath: string
    altText: string
}) {
    return (
        <div className="lg:shadow relative h-auto lg:h-60 lg:aspect-square overflow-hidden lg:rounded-xl lg:w-1/3 lg:bg-[#fefefe] pb-0 lg:pb-5 p-2.5 lg:p-5 grid place-items-center">
            <img
                src={imgPath}
                alt={altText}
                draggable={false}
                className="w-fit rounded-lg blur-[0.5px] brightness-[.7] h-full aspect-video"
            />
            <BsFillPlayCircleFill className="absolute text-5xl z-10 text-white cursor-pointer" />
        </div>
    )
}

export function Description({
    id,
    children,
}: {
    children: React.ReactNode
    id: number
}) {
    return (
        <div className="lg:shadow h-fit lg:h-60 lg:rounded-xl lg:w-2/3 lg:bg-[#fefefe] p-4 pt-3 pb-0 lg:px-6 lg:py-7 flex flex-col gap-1.5 lg:gap-3">
            {children}
            <div className="w-full flex gap-4 mt-2">
                {/* <Link
                    href="/dashboard"
                    className="bg-black/90 font-normal inline-block w-fit text-white text-sm rounded-md px-5 py-2"
                >
                    <span>Pelajari Selengkapnya</span>
                </Link> */}
            </div>
        </div>
    )
}

AdvantageCard.Video = Video
AdvantageCard.Description = Description
