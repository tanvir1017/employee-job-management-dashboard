
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { empApi } from "../api/employees.api"
import type { Employee } from "../type"

export const useEmployees = () => {

    const queryClient = useQueryClient()



    const fetchEmployees = useQuery({
        queryKey: ['employees'],
        queryFn: empApi.getEmployees
    })

    const fetchSingleEmployee = (id: string) => useQuery({
        queryKey: [`single-employee`, id],
        queryFn: () => empApi.getEmployeeById(id),
        enabled: !!id
    })

    const employeeMutation = useMutation({
        mutationFn: empApi.createEmployee,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['employees']
            })
        }
    })

    const employeeUpdateMutation = useMutation({
        mutationFn: ({ id, employeeData }: { id: string, employeeData: Partial<Omit<Employee, "id">> }) => empApi.updateEmployee(id, employeeData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['employees']
            })
        }
    })

    const deleteEmployeeMutation = useMutation({
        mutationFn: ({ id }: { id: string }) => empApi.deleteEmployee(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['employees']
            })
        }
    })


    return {
        fetchEmployees,
        employeeMutation,
        employeeUpdateMutation,
        fetchSingleEmployee,
        deleteEmployeeMutation
    }
}