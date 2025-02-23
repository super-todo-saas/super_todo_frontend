import type { UpdateTodoDto } from '@/dtos/update-dto'
import type { Todo } from '@/models/todo'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL

const todosApiUrl = `${apiBaseUrl}/todos`

const apiClient = axios.create({
  baseURL: todosApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Fetch all todos
 * @param userRole - 'free' | 'paid'
 * @returns Todos
 */
export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await apiClient.get('/', {
      params: {},
    })
    return response.data
  } catch (error: any) {
    throw Error(error?.response?.data?.message ?? error?.message)
  }
}

/**
 * Create a new Todo
 * @param data - New Todo data
 * @returns Created Todo
 */
export const createTodo = async (data: {
  title: string
  notes?: string
  userRole: string
}): Promise<Todo> => {
  try {
    const response = await apiClient.post('/', data)
    if (response?.status === 201) {
      return response.data
    }
    throw Error('Create Todo failed')
  } catch (error: any) {
    throw Error(error?.response?.data?.message ?? error?.message)
  }
}

/**
 * Update a Todo by ID
 * @param id - Todo ID
 * @param data - Properties need to update
 * @returns Updated Todo
 */
export const updateTodo = async (id: number, data: UpdateTodoDto): Promise<Todo> => {
  try {
    const response = await apiClient.put(`/${id}`, data)
    if (response?.status === 200) {
      return response.data
    }
    throw Error('Update Todo failed')
  } catch (error: any) {
    throw Error(error?.response?.data?.message ?? error?.message)
  }
}

/**
 * Delete a Todo by ID
 * @param id - Todo ID
 */
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const response = await apiClient.delete(`/${id}`)
    if (response?.status === 200) {
      return response.data
    }
    throw Error('Delete Todo failed')
  } catch (error: any) {
    throw Error(error?.response?.data?.message ?? error?.message)
  }
}
