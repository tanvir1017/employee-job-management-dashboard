import { employees } from '@/mocks/database'
import { delay } from '@/mocks/delay'
import type { Employee, UpdateEmployeePayload } from '../type'

export async function getEmployees() {
    await delay()

    return employees
}

export async function createEmployee(payload: Omit<Employee, 'id'>) {
    await delay()

    const newEmployee = {
        id: (employees.length + 1).toString(),
        ...payload,
    }

    employees.push(newEmployee)

    return newEmployee
}

export async function getEmployeeById(id: string) {
    await delay()

    const employee = employees.find((employee) => employee.id === id)

    if (!employee) {
        throw new Error('Employee not found')
    }

    return employee
}

export async function updateEmployee(id: string, payload: UpdateEmployeePayload) {
    await delay()

    const index = employees.findIndex((employee) => employee.id === id)

    if (index === -1) {
        throw new Error('Employee not found')
    }

    // @ts-ignore
    employees[index] = {
        ...employees[index],

        ...payload,
    }

    return employees[index]
}

export async function deleteEmployee(id: string) {
    // await delay()

    const index = employees.findIndex((employee) => employee.id === id)

    if (index === -1) {
        throw new Error('Employee not found')
    }

    employees.splice(index, 1)

    return true
}

export const empApi = {
    getEmployees,

    getEmployeeById,

    updateEmployee,

    deleteEmployee,

    createEmployee,
}
