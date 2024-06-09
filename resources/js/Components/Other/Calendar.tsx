import { useEffect, useState } from 'react'
import { BiCalendar } from 'react-icons/bi'

export default function Calendar() {
    const [time, setTime] = useState(new Date())
    const [userTimeZone, setUserTimeZone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(intervalID)
    }, [])

    const formattedTime = new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric',
        timeZone: userTimeZone,
    }).format(time)

    return (
        <div className="w-full lg:w-fit h-fit flex items-center justify-center gap-2 border shadow-sm bg-blue-500 text-white rounded-md px-4 py-2">
            <span className="text-xs lg:text-sm font-normal">
                {formattedTime}
            </span>
            {/* <FaCalendarAlt className="text-stone-500" /> */}
            <BiCalendar className="text-base lg:text-lg -translate-y-[0.5px]" />
        </div>
    )
}
