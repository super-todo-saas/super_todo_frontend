<template>
  <div className="collapse collapse-plus">
    <input type="radio" name="todo-item" />
    <div className="collapse-title text-xl font-medium">
      {{ todo?.title }}
    </div>
    <div className="collapse-content flex flex-col gap-y-2">
      <div class="flex flex-row justify-between items-start gap-x-2">
        <div className="flex flex-col gap-y-2">
          <div v-if="todo?.completed" className="badge badge-success text-white gap-2">
            Completed
          </div>
          <div v-else className="badge badge-info text-white gap-2">Doing</div>
          <div>Created At: {{ new Date(todo?.createdAt).toLocaleString('vi-VN') }}</div>
        </div>
        <div class="flex flex-row justify-end items-start gap-x-4">
          <div className="tooltip" data-tip="Update">
            <button
              className="btn btn-square w-fit h-fit bg-transparent border-none"
              @click="handleUpdate"
            >
              <img src="@/assets/icons/svg/pen.svg" alt="Update" />
            </button>
          </div>
          <div className="tooltip" data-tip="Delete">
            <button
              className="btn btn-square w-fit h-fit bg-transparent border-none"
              @click="handleDelete"
            >
              <img src="@/assets/icons/svg/trash.svg" alt="Delete" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="todo?.notes">
        <div className="divider"></div>
        <div>{{ todo?.notes }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '@/models/todo'

interface Props {
  todo: Todo
}

interface Emits {
  (event: 'onDelete', todoId: number): unknown
  (event: 'onUpdate', todo: Todo): unknown
}

const { todo } = defineProps<Props>()

const emits = defineEmits<Emits>()

const handleUpdate = () => {
  emits('onUpdate', todo)
}

const handleDelete = () => {
  emits('onDelete', todo.id)
}
</script>
