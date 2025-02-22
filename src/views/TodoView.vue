<template>
  <div
    class="container flex flex-col md:flex-row justify-start items-start gap-5 w-full md:w-2/3 mx-auto"
  >
    <TodoForm class="w-full md:w-1/3" :userRole="userRole" @onError="handleTodoError" />
    <div class="w-full rounded-lg shadow-lg p-4 md:w-2/3">
      <div v-if="todos.length > 0" class="my-2">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="rounded-md !mb-2"
          :class="todo?.completed ? 'bg-lime-100' : 'bg-sky-100'"
        >
          <div className="collapse collapse-plus">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              {{ todo?.title }}
            </div>
            <div className="collapse-content flex flex-col gap-y-2">
              <div class="flex flex-row justify-start items-center gap-x-2">
                <span>Status: </span>
                <div v-if="todo?.completed" className="badge badge-success gap-2">Completed</div>
                <div v-else className="badge badge-info gap-2">Doing</div>
              </div>
              <div className="divider"></div>
              <div>Created at: {{ new Date(todo?.createdAt).toLocaleString() }}</div>
              <div v-if="todo?.notes">
                <div className="divider"></div>
                <div>Notes: {{ todo?.notes }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-black">No Todo yet. Add your first Todo!</div>
    </div>
  </div>
  <div
    v-if="error?.trim()?.length > 0"
    className="toast toast-top toast-right p-4 hover:cursor-pointer"
    @click="error = ''"
  >
    <div className="alert alert-error">
      <span class="text-white overflow-ellipsis line-clamp-3 whitespace-normal">{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoForm from '@/components/TodoForm.vue'
import type { Todo } from '@/models/todo'
import { fetchTodos } from '@/services/api.service'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

interface TodoItem extends Todo {
  open: boolean
}

const todos = ref<TodoItem[]>([])

const error = ref('')

const route = useRoute()

const userRole = route.query?.userRole as string

const loadTodos = async () => {
  const res = await fetchTodos(userRole)
  todos.value = res.map((todo) => ({ ...todo, open: false }))
}

onMounted(loadTodos)

const handleTodoError = (err: string) => {
  error.value = err
}

watch(error, () => {
  const timer = setTimeout(() => {
    error.value = ''
    clearTimeout(timer)
  }, 5000)
})
</script>
