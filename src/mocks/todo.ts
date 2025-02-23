import type { Todo } from '@/models/todo'

/**
 * Use this mock data to simulate a list of todos for testing purposes.
 */
export const MockTodos: Todo[] = [
  {
    id: 1,
    title: 'Learn Vue 3',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Learn Vuex 4',
    completed: true,
    createdAt: new Date().toISOString(),
    notes: 'Vuex is a state management pattern + library for Vue.js applications.',
  },
  {
    id: 3,
    title: 'Learn Vue Router 4',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Learn Vue Test Utils',
    completed: false,
    createdAt: new Date().toISOString(),
  },
]
