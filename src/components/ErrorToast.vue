<template>
  <div className="toast toast-top toast-right p-4 hover:cursor-pointer" @click="handleClose">
    <div className="alert alert-error flex flex-row gap-x-2 justify-start items-center">
      <img src="@/assets/icons/svg/error.svg" alt="Error" />
      <span class="text-white overflow-ellipsis line-clamp-3 whitespace-normal">{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: string
}

interface Emits {
  (event: 'onClose'): unknown
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const { error } = props

const handleClose = () => {
  emits('onClose')
}

const timer = setTimeout(() => {
  handleClose()
  clearTimeout(timer)
}, 5000)
</script>
