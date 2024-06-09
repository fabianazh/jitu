import Illust from '@/Assets/Illustration/urban-no-data-found-1.png'

export default function NotFoundCard({
    imageWidth = 'w-48 lg:w-60',
    className,
    message = 'Data tidak ditemukan',
}: {
    imageWidth?: string
    className?: string
    message?: string
}) {
    return (
        <div
            className={`w-full h-auto flex flex-col justify-center items-center ${className}`}
        >
            <img
                src={Illust}
                alt="Women with magnifying glasses searching"
                className={`h-fit ${imageWidth}`}
            />
            <span className="font-medium text-xs lg:text-base">{message}</span>
        </div>
    )
}
