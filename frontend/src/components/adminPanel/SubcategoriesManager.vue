<template>
  <div class="categories-view">
    <h3 class="title">Додати нову підкатегорію</h3>
    <div class="add-form">
      <label>
        Назва (UA)
        <input v-model="formData.title_ua" type="text" class="primary" />
      </label>
      <label>
        Назва (EN)
        <input v-model="formData.title_en" type="text" class="primary" />
      </label>

      <button @click="onAdd" class="primary">Додати</button>
    </div>

    <h3 class="title">Список всіх підкатегорій</h3>
    <div class="table">
      <div class="table__head">
        <div class="table__row-field">ID</div>
        <div class="table__row-field">Назва (UA)</div>
        <div class="table__row-field">Назва (EN)</div>
        <div class="table__row-field">Категорія</div>
      </div>

      <div v-for="(subcategory, i) in subcategoriesList" :key="subcategory.id" class="table__row">
        <div class="table__row-field">{{ subcategory.id }}</div>
        <div class="table__row-field">{{ subcategory.title_ua }}</div>
        <div class="table__row-field">{{ subcategory.title_en }}</div>
        <div class="table__row-field">
          <select v-model="modifiedList[i].category_id">
            <option :value="null">Не назначено</option>
            <option
              v-for="category in categoriesStore.categoriesList"
              :key="category.id"
              :value="category.id"
            >
              {{ category.id }} - {{ category.title_ua }}
            </option>
          </select>
          <div class="table__row-buttons">
            <button
              @click="subcategoriesStore.setCategory(modifiedList[i])"
              :disabled="modifiedList[i].category_id === subcategoriesList[i].category_id"
              class="secondary"
            >
              Зберегти
            </button>
            <button @click="subcategoriesStore.deleteSubcategory(subcategory.id)" class="danger">
              Видалити
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/modules/categoriesStore'
import { useSubcategoriesStore } from '@/stores/modules/subcategoriesStore'
import { computed, onMounted, ref } from 'vue'

const subcategoriesStore = useSubcategoriesStore()
const subcategoriesList = computed(() => subcategoriesStore.subcategoriesList)
const modifiedList = computed(() => subcategoriesStore.modifiedList)

const categoriesStore = useCategoriesStore()

onMounted(() => {
  subcategoriesStore.loadSubcategoriesList()
  categoriesStore.loadCategoriesListShortly()
})

const formData = ref({})

const isDataEntered = computed(() => {
  if (formData.value.title_en && formData.value.title_ua) return true
  else return false
})

function onAdd() {
  if (isDataEntered.value) {
    subcategoriesStore.addSubcategory(formData.value)
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/admin.scss');

.table {
  &__row {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  &__head {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
