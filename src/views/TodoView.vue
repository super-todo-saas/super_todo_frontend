<template>
  <div class="container flex flex-col md:flex-row justify-start items-start gap-5 w-full md:w-2/3 mx-auto">
    <div class="flex flex-col gap-y-2 w-full md:w-1/3">
      <TodoForm class="w-full" :userRole="userRole" :initial-value="updatingTodo" @on-error="handleTodoError"
        @on-change="handleAfterCreateOrUpdate" />
      <UserPlan class="w-full" :userRole="userRole" />
    </div>
    <div class="w-full rounded-lg shadow-lg p-4 md:w-2/3">
      <div v-if="todos.length > 0" class="my-2">
        <div v-for="todo in todos" :key="todo.id" class="rounded-md !mb-2"
          :class="todo?.completed ? 'bg-lime-100' : 'bg-sky-100'">
          <TodoItem :todo="todo" @on-update="handleUpdateTodo" @on-delete="handleDeleteTodo" />
        </div>
      </div>
      <div v-else class="text-center text-black">No Todo yet. Add your first Todo!</div>
    </div>
  </div>
  <ErrorToast :error="error" v-if="error?.trim()?.length > 0" @on-close="error = ''" />
</template>

<script setup lang="ts">
import ErrorToast from '@/components/ErrorToast.vue'
import TodoForm from '@/components/TodoForm.vue'
import TodoItem from '@/components/TodoItem.vue'
import UserPlan from '@/components/UserPlan.vue'
import type { Todo } from '@/models/todo'
import { fetchTodos, deleteTodo } from '@/services/api.service'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

interface TodoItem extends Todo {
  open: boolean
}

const todos = ref<TodoItem[]>([])
const updatingTodo = ref<Todo>()

const error = ref('')

const route = useRoute()

const userRole = ref<string>(route.query?.userRole as string)

const loadTodos = async () => {
  const res = await fetchTodos()
  todos.value = res.map((todo) => ({ ...todo, open: false }))
}

onMounted(loadTodos)

const handleTodoError = (err: string) => {
  error.value = err
}

const handleUpdateTodo = (todo: Todo) => {
  updatingTodo.value = todo
  window.scrollTo(0, 0)
}

const handleDeleteTodo = (id: number) => {
  deleteTodo(id)?.then(() => loadTodos())
}

const handleAfterCreateOrUpdate = () => {
  updatingTodo.value = undefined
  loadTodos()
}

watch(
  () => route.query?.userRole,
  (newUserRole) => {
    userRole.value = newUserRole as string
  },
)
</script>
