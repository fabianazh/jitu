interface Admin {
    id: number
    name: string
    username: string
    photo: string
    old_photo: string
}

interface Student {
    nis: string
    name: string
    class_name: string
    email: string
    phone: string
    parents_phone: string
    address: string
    gender: string
    photo: File | string | null
    points: number
    date_of_birth: string
    class_id: string
    notifications: any
    totalViolations: number
    status: string
}

interface Class {
    id: string
    class_name: string
    total_students: number
    grade: string
    major: string
    major_id: string
    class_number: number
    homeroom_teacher: string
}

interface Major {
    id: string
    name: string
    abbreviation: string
    head_of_program: string
    background_color: string
    total_classes: number
}

interface ViolationCategory {
    id: number
    category: string
    violations: ViolationForm[]
}

interface ViolationForm {
    id: string
    violation_category: string
    violation_category_id: string
    description: string
    weight: number
    violations: Violation[]
    totalViolations: number
}

interface Sanction {
    id: string
    criteria: string
    weight_from: number
    weight_to: number
    sanction: string
    violations: Violation[]
    totalViolations: number
}

interface Violation {
    id: number
    student_nis: string
    student_name: string
    student_class: string
    student_points: number
    student_gender: string
    violation_form: string
    violation_category: string
    sanction: string
    message: string
    reporter: string
    violation_form_id: string
    sanction_id: string
    created_at: string
    weight: number
    date: string
    student_photo: string
    student_status: string
}

interface Notifications {
    id: string
    created_at: string
    updated_at: string
    read_at: string
    data: {
        title: string
        name: string
        email: string
        message: string
        points: number
    }
    type: string
    date: string
}
