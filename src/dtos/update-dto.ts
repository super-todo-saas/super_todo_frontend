import type { CreateTodoDto } from './create-todo'

export interface UpdateTodoDto extends CreateTodoDto {
  id: number
}
