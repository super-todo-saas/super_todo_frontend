<template>
  <form @submit.prevent="createOrUpdateTodo" class="w-full mx-auto p-4 rounded-lg shadow-lg">
    <div class="pb-4">
      <input
        v-model="todo.title"
        name="title"
        type="text"
        placeholder="Title"
        className="input input-info w-full"
        required
      />
    </div>

    <div v-if="props?.userRole === 'paid'" class="pb-4">
      <textarea
        v-model="todo.notes"
        name="notes"
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

    <button className="btn btn-info w-full text-white">
      {{ initialValue ? 'Update' : 'Add' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import type { Todo } from '@/models/todo'
import { createTodo, updateTodo } from '@/services/api.service'
import { reactive, watch } from 'vue'

interface Props {
  userRole: string
  initialValue?: Todo
}

interface Emits {
  (event: 'onError', message: string): unknown
  (event: 'onChange'): unknown
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const todo = reactive<Partial<Todo>>({
  title: '',
  completed: false,
  notes: undefined,
})

watch(
  () => props?.initialValue,
  (newValue) => {
    todo.title = newValue?.title ?? ''
    todo.notes = newValue?.notes ?? ''
    todo.completed = newValue?.completed ?? false
  },
)

const createOrUpdateTodo = async () => {
  try {
    let result: Todo;

    if (props?.initialValue) {
      result = await updateTodo(props?.initialValue?.id, {
        title: todo?.title ?? '',
        notes: todo?.notes ?? undefined,
        completed: todo?.completed ?? false,
        userRole: props?.userRole,
      })
    } else {
      result = await createTodo({
        title: todo?.title ?? '',
        notes: todo?.notes ?? undefined,
        completed: todo?.completed ?? false,
        userRole: props?.userRole,
      })
    }

    if (result) {
      todo.title = ''
      todo.notes = ''
      todo.completed = false

      emits('onChange')
    }
  } catch (err: any) {
    const errorMessage = err?.message ?? 'Error occured'
    emits('onError', errorMessage)
  }
}
</script>
