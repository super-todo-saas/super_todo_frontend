<template>
  <div class="flex flex-row justify-start items-center gap-x-2 pt-4">
    <span>Your current plan:</span>
    <div v-if="props?.userRole === 'paid'" class="badge badge-success text-white">Paid</div>
    <div v-else class="badge badge-neutral text-white">Free</div>
  </div>
  <button
    v-if="props?.userRole === 'paid'"
    class="btn btn-outline btn-error hover:text-white"
    @click="handleSignOut"
  >
    Sign out
  </button>
  <button v-else class="btn btn-outline btn-success hover:text-white" @click="handleUpgrade">
    Upgrade now
  </button>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

interface Props {
  userRole: string
}

const props = defineProps<Props>()

const router = useRouter()
const route = useRoute()

const handleUpgrade = () => {
  router.push({
    query: {
      ...route.query,
      userRole: 'paid',
    },
  })
}

const handleSignOut = () => {
  router.push({
    query: {
      ...route.query,
      userRole: 'free',
    },
  })
}
</script>
