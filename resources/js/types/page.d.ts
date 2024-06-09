interface InformationPageProps {
    categories: ViolationCategory[]
}

// Dashboard
interface DashboardPageProps {
    todayViolations?: Violation[]
    monthlyViolationStats?: MonthlyViolationStat[]
    years?: []
    selectedYear?: number | undefined
    violationIsEmpty?: boolean
}

interface ProfilePageProps {
    admin: Admin
}

interface EditProfilePageProps {
    admin: Admin
}

interface AuthSettingsPageProps {
    authEndpoint: {
        id: number
        endpoint: string
    }
}

interface HistoryPageProps {
    violations: Violation[]
    totalViolations: number
}

// Profile
interface ProfilePageProps {}

// Notification
interface NotificationsPageProps {
    notifications: Notifications[]
    totalNotifications: number
}

interface DetailNotificationPageProps {
    notification: Notifications
    student?: Student
    admin?: Admin
    violation?: Violation
}

interface NotificationsPageProps {
    notification: Notifications
}

// Student
interface StudentsPageProps {
    students: Student[]
    totalStudents: number
    sort: string
    direction: string
    currentPage: number
    perPage: number
    filter: string
}

interface CreateStudentPageProps {
    classes: Class[]
}

interface DetailStudentPageProps {
    student: Student
    violations: Violation[]
    totalViolations: number
}

interface EditStudentPageProps {
    classes: Class[]
    student: Student
}

// Class
interface ClassesPageProps {
    classes: Class[]
    totalClasses: number
    currentPage: number
    perPage: number
}

interface CreateClassPageProps {
    classes: Class[]
    majors: Major[]
}

interface DetailClassPageProps {
    grade: Class
}

interface EditClassPageProps {
    classes: Class[]
    majors: Major[]
    grade: Class
}

// Major
interface MajorsPageProps {
    majors: Major[]
    totalMajors: number
    currentPage: number
    perPage: number
}

interface CreateMajorPageProps {
    majors: Major[]
}

interface DetailMajorPageProps {
    major: Major
}

interface EditMajorPageProps {
    majors: Major[]
    major: Major
}

// Violation Form
interface ViolationFormsPageProps {
    violationForms: ViolationForm[]
    totalViolationForms: number
    currentPage: number
    perPage: number
}

interface CreateViolationFormPageProps {
    maxWeight: number
    lowCategory: number
    mediumCategory: number
}

interface DetailViolationFormPageProps {
    violationForm: ViolationForm
}

interface EditViolationFormPageProps {
    violationForms: ViolationForm[]
    violationForm: ViolationForm
    maxWeight: number
}

// Sanction
interface SanctionsPageProps {
    sanctions: Sanction[]
    totalSanctions: number
    totalFilteredSanctions: number
    currentPage: number
    perPage: number
}

interface CreateSanctionPageProps {
    minWeight: number
}

interface DetailSanctionPageProps {
    sanction: Sanction
}

interface EditSanctionPageProps {
    sanction: Sanction
    maxWeight: number
}

// Violation
interface ViolationsPageProps {
    violations: Violation[]
    totalViolations: number
    sort: string
    direction: string
    currentPage: number
    perPage: number
}

interface CreateViolationPageProps {
    students: Student[]
    violationForms: ViolationForm[]
    sanctions: Sanction[]
    classes: Class[]
}

interface DetailViolationPageProps {
    violation: Violation
}

interface EditViolationPageProps {
    classes: Class[]
    violationForms: ViolationForm[]
    sanctions: Sanction[]
    violation: Violation
    students: Student[]
}
