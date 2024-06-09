interface MonthlyViolationStat {
    name: string
    LL: number
    P: number
}

interface StatisticCardsSectionProps {
    totalPoints: number | 0
    totalMessage: number
    totalViolations: number
    totalData?: number
}

interface TodayViolationsSectionProps {
    todayViolations: Violation[]
}

interface ProfileCardProps {
    data?: {
        nis: number | undefined | string
        name: string
        class_name: string
        date_of_birth: string
        gender: string
        photo: File | null
    }
    label?: string
    value?: string | number
    children?: React.ReactNode
}

interface ToastProps<
    T extends Record<string, unknown> = Record<string, unknown>
> {
    flash?: {
        info: string
        success: string
        warning: string
        error: string
    }
}
