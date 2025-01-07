<template>
  <div class="features">
    <div class="features__body">
      <h3 class="title">Додати нову характеристику</h3>
      <div class="features__form">
        <div class="add-form">
          <label>
            Назва (UA)
            <input v-model="formData.feature_ua" type="text" class="primary" />
          </label>
          <label>
            Назва (EN)
            <input v-model="formData.feature_en" type="text" class="primary" />
          </label>
          <label>
            Підкатегорія
            <select v-model="formData.subcategory_id" class="primary">
              <option :value="null">Не назначено</option>
              <option
                v-for="subcategory in subcategoriesStore.subcategoriesList"
                :key="subcategory.id"
                :value="subcategory.id"
              >
                {{ subcategory.id }} - {{ subcategory.title_ua }}
              </option>
            </select>
          </label>

          <button @click="onAdd" :disabled="!isDataEntered" class="primary">Додати</button>
        </div>
      </div>
      <h3 class="title">Список характеристик за категорією</h3>
      <label class="subcategory__select">
        Підкатегорія
        <select v-model="selectedSubcategory" class="primary">
          <option :value="null">Не обрано</option>
          <option
            v-for="subcategory in subcategoriesStore.subcategoriesList"
            :key="subcategory.id"
            :value="subcategory.id"
          >
            {{ subcategory.id }} - {{ subcategory.title_ua }}
          </option>
        </select>
      </label>
      <div class="table">
        <div class="table__head">
          <div class="table__row-field">ID</div>
          <div class="table__row-field">Назва (UA)</div>
          <div class="table__row-field">Назва (EN)</div>
          <div class="table__row-field">Дії</div>
        </div>

        <div v-for="feature in featuresList" :key="feature.id" class="table__row">
          <div class="table__row-field">{{ feature.id }}</div>
          <div class="table__row-field">{{ feature.feature_ua }}</div>
          <div class="table__row-field">{{ feature.feature_en }}</div>
          <div class="table__row-field">
            <div class="table__row-buttons">
              <button
                @click="featuresStore.deleteFeature(feature.id, feature.subcategory_id)"
                class="danger"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFeaturesStore } from '@/stores/modules/featuresStore'
import { useSubcategoriesStore } from '@/stores/modules/subcategoriesStore'
import { computed, onMounted, ref, watch } from 'vue'

const subcategoriesStore = useSubcategoriesStore()
onMounted(() => {
  subcategoriesStore.loadSubcategoriesList()
})

const featuresStore = useFeaturesStore()
const featuresList = computed(() => featuresStore.featuresList)
const selectedSubcategory = ref(null)
watch(selectedSubcategory, (newValue) => {
  featuresStore.loadFeaturesBySubcategoryId(newValue)
})

const formData = ref({
  subcategory_id: null,
})

const isDataEntered = computed(() => {
  if (formData.value.feature_ua && formData.value.feature_en && formData.value.subcategory_id)
    return true
  else return false
})

async function onAdd() {
  if (isDataEntered.value) {
    await featuresStore.addFeature(formData.value)
    selectedSubcategory.value = formData.value.subcategory_id
    formData.value = { subcategory_id: null }
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/admin.scss');

.subcategory__select {
  margin: 24px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.title {
  margin: 24px 0 0 0;
}
.table {
  margin: 24px 0 0 0;
  &__row {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  &__head {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.features {
  &__form {
    margin: 24px 0 0 0;
  }
}
</style>
