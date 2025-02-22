<template>
  <form @submit.prevent="createNewTodo" class="w-full mx-auto p-4 rounded-lg shadow-lg">
    <div class="pb-4">
      <input
        v-model="todo.title"
        name="title"
        type="text"
        placeholder="Todo title"
        className="input input-info w-full"
        required
      />
    </div>

    <div class="pb-4">
      <textarea
        v-model="todo.notes"
        name="notes"
        v-if="props.userRole === 'paid'"
        className="textarea textarea-info w-full"
        placeholder="Note"
      ></textarea>
    </div>

    <div className="form-control pb-4">
      <label className="cursor-pointer label">
        <input
          v-model="todo.completed"
          name="completed"
          type="checkbox"
          className="checkbox checkbox-info rounded-sm"
        />
        <span className="label-text">Completed</span>
      </label>
    </div>

    <button className="btn btn-info w-full">Add Todo</button>
  </form>
</template>

<script setup lang="ts">
import { createTodo } from '@/services/api.service'
import { reactive } from 'vue'

const props = defineProps(['userRole'])
const emits = defineEmits(['onError'])

const todo = reactive({
  title: '',
  completed: false,
  notes: '',
})

const createNewTodo = async () => {
  try {
    const isCreateSuccess = await createTodo({ title: todo.title, notes: todo?.notes })

    if (isCreateSuccess) {
      todo.title = ''
      todo.notes = ''
      todo.completed = false
    }
  } catch (err: unknown) {
    const errorMessage = (err as Error)?.message ?? 'Error occured'
    emits('onError', errorMessage)
  }
}
</script>
