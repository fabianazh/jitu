interface PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> {
    auth?: {
        admin?: {
            user: Admin
            unreadNotifications?: number
        }
        student?: {
            user: Student
            unreadNotifications?: number
        }
    }
    children?: React.ReactNode
}
