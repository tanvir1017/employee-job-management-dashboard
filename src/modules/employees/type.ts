export interface Employee {

    id: string

    name: string

    email: string

    role: string

    department: string

}


export interface CreateEmployeePayload {

    name: string

    email: string

    role: string

    department: string

}


export type UpdateEmployeePayload =
    Partial<CreateEmployeePayload>