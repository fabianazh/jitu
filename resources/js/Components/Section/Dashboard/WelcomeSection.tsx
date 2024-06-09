export default function WelcomeSection({ auth }: PageProps) {
    return (
        <div className="relative w-full h-auto flex justify-between p-3 lg:p-6 bg-[#fdfdfd] shadow lg:rounded-lg text-gray-900 mb-5">
            <div className="flex flex-col lg:gap-1">
                <span className="font-medium text-sm lg:text-xl">
                    Selamat Datang,{' '}
                </span>
                <span className="font-medium text-xl lg:text-3xl">
                    {auth?.admin?.user?.name ?? auth?.student?.user?.name}!
                </span>
            </div>
        </div>
    )
}
