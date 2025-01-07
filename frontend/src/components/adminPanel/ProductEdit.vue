<template>
  <div class="product">
    <div class="product__body">
      <div class="product__head">
        <h2 class="product__title">{{ product.id }} - {{ product.title_ua }}</h2>
      </div>
      <div class="product__edit">
        <h2>Змінити дані про товар</h2>
        <div class="product__edit-row">
          <div class="form">
            <label>
              Бренд
              <input v-model="modifiedProduct.brand" type="text" class="primary" />
            </label>
            <label>
              Назва (UA)
              <input v-model="modifiedProduct.title_ua" type="text" class="primary" />
            </label>
            <label>
              Назва (EN)
              <input v-model="modifiedProduct.title_en" type="text" class="primary" />
            </label>
            <label>
              Опис (UA)
              <textarea v-model="modifiedProduct.description_ua" rows="10" />
            </label>
            <label>
              Опис (EN)
              <textarea v-model="modifiedProduct.description_en" rows="10" />
            </label>
            <label>
              Ціна
              <input v-model="modifiedProduct.price" type="number" class="primary" />
            </label>
            <label>
              Підкатегорія
              <select v-model="modifiedProduct.subcategory_id" class="primary">
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

            <button @click="onAdd" :disabled="isProductModified" class="primary">Змінити</button>
          </div>
          <div
            class="custom-file-input"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
            :class="{ 'drag-over': isDragging }"
            @click="triggerFileInput"
          >
            <span>Перетягніть фото або натисніть</span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              @change="onFileChange"
              hidden
              ref="fileInput"
            />
            <div class="file-preview" v-if="fileName || modifiedProduct.imgSrc">
              <img
                v-if="modifiedProduct.imgSrc"
                :src="modifiedProduct.imgSrc"
                alt="Image preview"
              />
              <p v-if="fileName">{{ fileName }}</p>
            </div>
          </div>
        </div>
      </div>
      <h2>Змінити дані про характеристики</h2>
      <div class="features">
        <div class="features__feature-head">
          <div>UA</div>
          <div>EN</div>
        </div>
        <div
          v-for="(feature, i) in featuresList"
          :key="feature.subcategory_features_id"
          class="features__feature"
        >
          <div class="features__feature-title">{{ feature.feature_ua }}</div>
          <label>
            <input v-model="featuresModifiedList[i].value_ua" type="text" class="primary" />
          </label>
          <label>
            <input v-model="featuresModifiedList[i].value_en" type="text" class="primary" />
          </label>
        </div>
        <button @click="onUpdateFeatures" :disabled="isFeaturesEqual" class="features__btn primary">
          Змінити
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFeaturesStore } from '@/stores/modules/featuresStore'
import { useProductsStore } from '@/stores/modules/productsStore'
import { useSubcategoriesStore } from '@/stores/modules/subcategoriesStore'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const productsStore = useProductsStore()
const product = computed(() => productsStore.currentProduct)
const modifiedProduct = computed(() => productsStore.currentModifiedProduct)

const isProductModified = computed(() => {
  return JSON.stringify(product.value) === JSON.stringify(modifiedProduct.value)
})

const fileName = ref('') // Назва завантаженого файлу
const isDragging = ref(false) // Стан перетягування
const fileInput = ref(null) // Посилання на інпут файлу

function onFileChange(event) {
  const file = event.target.files[0]

  console.log(file)

  handleFile(file)
}

const onDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  handleFile(file)
}

const handleFile = (file) => {
  if (file) {
    fileName.value = file.name

    // Завантажуємо зображення для попереднього перегляду
    const reader = new FileReader()
    reader.onload = (e) => {
      modifiedProduct.value.imgSrc = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    fileName.value = ''
    modifiedProduct.value.imgSrc = ''
  }
}

const triggerFileInput = () => {
  fileInput.value.click() // Імітуємо клік на прихованому інпуті
}

async function onAdd() {
  if (!isProductModified.value) {
    const formDataToSend = new FormData()

    // Додаємо текстові поля до formData
    formDataToSend.append('id', product.value.id)
    formDataToSend.append('brand', modifiedProduct.value.brand)
    formDataToSend.append('title_ua', modifiedProduct.value.title_ua)
    formDataToSend.append('title_en', modifiedProduct.value.title_en)
    formDataToSend.append('description_ua', modifiedProduct.value.description_ua)
    formDataToSend.append('description_en', modifiedProduct.value.description_en)
    formDataToSend.append('price', modifiedProduct.value.price)
    formDataToSend.append('subcategory_id', modifiedProduct.value.subcategory_id)

    // Додаємо зображення
    if (modifiedProduct.value.imgSrc) {
      let file

      if (modifiedProduct.value.imgSrc.startsWith('data:image/')) {
        // Якщо зображення у форматі Base64
        const base64String = modifiedProduct.value.imgSrc.split(',')[1]
        const blob = atob(base64String)
        const array = new Uint8Array(blob.length)

        for (let i = 0; i < blob.length; i++) {
          array[i] = blob.charCodeAt(i)
        }

        file = new File([array], fileName.value || 'image.png', { type: 'image/png' })
      } else if (modifiedProduct.value.imgSrc.startsWith('http')) {
        // Якщо зображення — URL, завантажуємо його
        file = await fetchImageAsFile(modifiedProduct.value.imgSrc)
      }

      if (file) {
        formDataToSend.append('image', file)
      }
    }

    console.log(formDataToSend)

    // Відправляємо дані
    productsStore.updateProduct(formDataToSend, product.value.id)
  }
}

// Завантаження зображення за URL і створення файлу
async function fetchImageAsFile(url) {
  const response = await fetch(url)
  const blob = await response.blob()
  const fileName = url.split('/').pop() // Отримуємо назву файлу з URL
  return new File([blob], fileName, { type: blob.type })
}

const subcategoriesStore = useSubcategoriesStore()

const featuresStore = useFeaturesStore()
const featuresList = computed(() => featuresStore.featuresList)
const featuresModifiedList = computed(() => featuresStore.featuresModifiedList)
const isFeaturesEqual = computed(() => {
  return JSON.stringify(featuresList.value) === JSON.stringify(featuresModifiedList.value)
})

const route = useRoute()

function onUpdateFeatures() {
  if (!isFeaturesEqual.value) {
    featuresStore.updateFeatures()
  }
}

onMounted(async () => {
  await productsStore.loadProductById(route.params.id)
  modifiedProduct.value = JSON.parse(JSON.stringify(product.value))
  subcategoriesStore.loadSubcategoriesList()
  featuresStore.loadFeaturesByProductId(route.params.id)
})
</script>

<style lang="scss" scoped>
.product {
  &__body {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  &__title {
  }

  &__img {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
    }
  }
  &__edit {
    margin: 24px 0 0 0;
    &-row {
      display: flex;
      gap: 24px;
    }
  }
}

.form {
  margin: 24px 0 0 0;

  max-width: 700px;
  flex: 1 0 auto;

  display: flex;
  flex-direction: column;
  gap: 24px;
  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-weight: bold;
  }
  button {
    width: 200px;
  }
}

.custom-file-input {
  height: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #313131;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
}

.custom-file-input.drag-over {
  background-color: #e3f2fd;
}

.custom-file-input span {
  font-size: 14px;
  color: #6c757d;
}

.file-preview {
  margin-top: 10px;
  text-align: center;
}

.file-preview img {
  max-width: 100%;
  max-height: 150px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
}

.features {
  flex: 1 1 auto;

  &__feature {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    label {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    &-title {
      margin: 24px 0 0 0;

      grid-column-start: 1;
      grid-column-end: 3;

      font-weight: bold;
    }
    &-head {
      display: grid;
      grid-template-columns: 1fr 1fr;
      text-align: center;
    }
  }
  &__btn {
    width: 200px;
    margin: 24px 0 0 0;
  }
}
</style>
