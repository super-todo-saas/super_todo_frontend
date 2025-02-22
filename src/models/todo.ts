export interface Todo {
  id: number

  title: string

  completed: boolean

  /**
   * ISO 8601 format
   */
  createdAt: string

  /**
   * Just use for 'paid' user
   */
  notes?: string
}
