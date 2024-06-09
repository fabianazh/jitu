import DefaultProfilePicture from '@/Assets/Img/Avatar/DefaultAvatar.jpg'
import { LuCamera, LuPenSquare } from 'react-icons/lu'

export default function ProfileCard({ children }: ProfileCardProps) {
    return (
        <div className="w-full h-fit bg-white shadow rounded-lg max-w-sm flex flex-col gap-3">
            <div className="w-full flex flex-col justify-center p-6 gap-4">
                {children}
            </div>
        </div>
    )
}

function Image({
    previewImage,
    name,
    onChange,
    children,
    image,
}: ProfileCardProps & {
    name: string
    image?: string | null
    previewImage?: File | string | null
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
    const pathname = window.location.pathname
    return (
        <>
            <div className="h-auto w-10/12 mx-auto flex flex-col gap-4">
                <div className="relative w-9/12 mx-auto h-auto grid place-items-center mt-1">
                    {/* {image ? (
                        <img
                            src={image}
                            alt={data?.name}
                            className="w-full h-auto aspect-square rounded-full shadow-sm border"
                        />
                    ) : previewImage instanceof File ? (
                        <img
                            src={URL.createObjectURL(previewImage)}
                            alt="Preview student picture"
                            className="w-full h-auto aspect-square rounded-full shadow-sm border"
                        />
                    ) : (
                        <img
                            src={previewImage || DefaultProfilePicture}
                            alt={'Default student picture'}
                            className="w-full h-auto aspect-square rounded-full shadow-sm border"
                        />
                    )} */}
                    {children}
                    {pathname.endsWith('add') && (
                        <label
                            htmlFor="photo"
                            className="absolute cursor-pointer z-20 right-5 bottom-0 bg-white rounded-full border shadow-sm w-10 aspect-square grid place-items-center"
                        >
                            <LuCamera className="text-xl" />
                        </label>
                    )}
                    {pathname.endsWith('edit') && (
                        <label
                            htmlFor="photo"
                            className="absolute cursor-pointer z-20 right-5 bottom-0 bg-white rounded-full border shadow-sm w-10 aspect-square grid place-items-center"
                        >
                            <LuPenSquare className="text-xl" />
                        </label>
                    )}
                    <input
                        id="photo"
                        type="file"
                        onChange={onChange}
                        className="sr-only"
                    />
                </div>
                <div className="flex flex-col text-center">
                    <span
                        className={`truncate text-xl font-medium ${
                            name === '' ? 'text-stone-600' : 'text-stone-900'
                        }`}
                    >
                        {name === '' ? 'Nama Siswa' : name}
                    </span>
                    <span
                        className={`truncate text-base font-medium text-stone-600`}
                    >
                        Siswa
                    </span>
                </div>
            </div>
        </>
    )
}

function DataContainer({ data }: ProfileCardProps) {
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) {
            return '-'
        }

        const options = {
            year: 'numeric' as const,
            month: 'short' as const,
            day: '2-digit' as const,
        }
        const formattedDate = new Date(dateString).toLocaleDateString(
            'id-ID',
            options
        )
        return formattedDate
    }

    return (
        <div className="w-full h-auto flex flex-col font-medium gap-5 justify-center items-center">
            <Data value={data?.nis} label="NIS" />
            <Data value={data?.class_name} label="Kelas" />
            <Data
                value={formatDate(data?.date_of_birth)}
                label="Tanggal Lahir"
            />
            <Data
                value={data?.gender === '' ? '-' : data?.gender}
                label="Jenis Kelamin"
            />
        </div>
    )
}

function Data({ label, value }: ProfileCardProps) {
    return (
        <div className="w-9/12 h-fit flex gap-4 items-center">
            <div className="w-[15rem] h-full">
                <span className="text-base font-normal text-stone-600">
                    {label}
                </span>
            </div>
            <div
                className={`truncate text-base w-full ${
                    value === '' ? 'text-stone-600' : 'text-stone-950'
                }`}
            >
                <span>{value === '' ? '-' : value?.toString()}</span>
            </div>
        </div>
    )
}

ProfileCard.Image = Image
ProfileCard.DataContainer = DataContainer
ProfileCard.Data = Data
