import { MockTodos } from '@/mocks/todo'
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
 * Fetch todos in pagination mode.
 * @param userRole - 'free' | 'paid'
 * @returns Todos
 */
export const fetchTodos = async (userRole: string): Promise<Todo[]> => {
  try {
    const response = await apiClient.get('/todos', {
      params: { userRole },
    })
    return response.data
  } catch (error) {
    console.error('Fetch Todos error:', error)
    // throw error
    return MockTodos
  }
}

/**
 * Create a new Todo.
 * @param newTodo - New Todo data
 * @returns Created Todo
 */
export const createTodo = async (newTodo: { title: string; notes?: string }): Promise<Todo> => {
  try {
    const response = await apiClient.post('/todos', newTodo)
    if (response?.status === 201) {
      return response.data
    }
    throw Error('Create Todo failed')
  } catch (error) {
    throw error
  }
}

/**
 * Update a Todo by ID.
 * @param id - Todo ID
 * @param updatedFields - Properties need to update
 * @returns Todo after updated
 */
export const updateTodo = async (id: number, updatedFields: Partial<Todo>): Promise<Todo> => {
  try {
    const response = await apiClient.put(`/todos/${id}`, updatedFields)
    return response.data
  } catch (error) {
    console.error(`Update Todo has ${id} error:`, error)
    throw error
  }
}

/**
 * Delete a Todo by ID.
 * @param id - Todo ID
 */
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/todos/${id}`)
  } catch (error) {
    console.error(`Delete Todo has ${id} error:`, error)
    throw error
  }
}
