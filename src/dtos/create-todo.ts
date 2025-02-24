export class CreateTodoDto {
  title: string = ''
  userRole: string = 'free'
  completed?: boolean
  notes?: string
}
