<template>
  <template v-if="totalCount > 30">
    <div class="pagination">
      <div class="pagination__body">
        <button @click="previousPage"><</button>
        <button
          @click="currentPage = i"
          v-for="i in totalPagesCount"
          :key="i"
          :class="{ selected: i === currentPage }"
        >
          {{ i }}
        </button>
        <button @click="nextPage">></button>
      </div>
    </div>
  </template>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  totalCount: {
    type: Number,
    required: true,
  },
})

const totalPagesCount = computed(() => Math.ceil(props.totalCount / 5))

const currentPage = ref(1)

const router = useRouter()
const route = useRoute()
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

function nextPage() {
  if (currentPage.value < totalPagesCount.value) {
    currentPage.value += 1
  }
}

watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = parseInt(newPage) || 1
  },
)

watch(currentPage, (newPage) => {
  router.push({ query: { ...route.query, page: newPage } })
})
</script>

<style lang="scss" scoped>
.pagination {
  grid-column-start: 1;
  grid-column-end: 6;
  &__body {
    display: flex;
    justify-content: center;
    gap: 8px;
    button {
      width: 36px;
      background-color: white;

      border: 1px solid rgb(217, 217, 217);
      border-radius: 12px;
      padding: 8px 0;
      &.selected {
        border: 1px solid red;
      }
    }
  }
}
</style>
