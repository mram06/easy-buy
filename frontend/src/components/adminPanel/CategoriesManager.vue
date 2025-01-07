<template>
  <div class="categories-view">
    <h3 class="title">Додати нову категорію</h3>
    <div class="add-form">
      <label>
        Назва (UA)
        <input v-model="formData.title_ua" type="text" class="primary" />
      </label>
      <label>
        Назва (EN)
        <input v-model="formData.title_en" type="text" class="primary" />
      </label>
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
        <div class="file-preview" v-if="fileName || formData.imgSrc">
          <img v-if="formData.imgSrc" :src="formData.imgSrc" alt="Image preview" />
          <p v-if="fileName">{{ fileName }}</p>
        </div>
      </div>

      <button @click="onAdd" class="primary">Додати</button>
    </div>

    <h3 class="title">Список всіх категорій</h3>
    <div class="table">
      <div class="table__head">
        <div class="table__row-field">ID</div>
        <div class="table__row-field">Назва (UA)</div>
        <div class="table__row-field">Назва (EN)</div>
        <div class="table__row-field">Фото</div>
        <div class="table__row-field">Дії</div>
      </div>

      <div v-for="category in categoriesStore.categoriesList" :key="category.id" class="table__row">
        <div class="table__row-field">{{ category.id }}</div>
        <div class="table__row-field">{{ category.title_ua }}</div>
        <div class="table__row-field">{{ category.title_en }}</div>
        <div class="table__row-field">
          <img :src="category.imgSrc" />
        </div>
        <div class="table__row-field">
          <div class="table__row-buttons">
            <button @click="categoriesStore.deleteCategory(category.id)" class="danger">
              Видалити
            </button>
            <button @click="onEdit(product.id)" class="black">Налаштувати</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/modules/categoriesStore'
import { computed, onMounted, ref } from 'vue'

const categoriesStore = useCategoriesStore()

onMounted(() => categoriesStore.loadCategoriesList())

// const fieldsCount = ref(Object.keys(categoriesStore.categoriesList[0]).length)
// const gridStyle = computed(() => {
//   return {
//     display: 'grid',
//     gridTemplateColumns: `repeat(${fieldsCount}, 1fr)`,
//   }
// })

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
      formData.value.imgSrc = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    fileName.value = ''
    formData.value.imgSrc = ''
  }
}

const triggerFileInput = () => {
  fileInput.value.click() // Імітуємо клік на прихованому інпуті
}

const formData = ref({})
const isDataEntered = computed(() => {
  if (
    formData.value.title_en &&
    formData.value.title_ua &&
    formData.value.imgSrc?.startsWith('data:image/')
  )
    return true
  else return false
})

async function onAdd() {
  if (isDataEntered.value) {
    const formDataToSend = new FormData()
    formDataToSend.append('title_ua', formData.value.title_ua)
    formDataToSend.append('title_en', formData.value.title_en)

    // Додаємо файл лише якщо він існує
    if (formData.value.imgSrc.startsWith('data:image/')) {
      const base64String = formData.value.imgSrc.split(',')[1]
      const blob = atob(base64String)
      const array = new Uint8Array(blob.length)

      for (let i = 0; i < blob.length; i++) {
        array[i] = blob.charCodeAt(i)
      }

      const file = new File([array], fileName.value, { type: 'image/png' })
      formDataToSend.append('image', file)
      console.log(formDataToSend)

      await categoriesStore.addCategory(formDataToSend)
      formData.value = {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/admin.scss');

.table {
  &__row {
    grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr;
  }
  &__head {
    grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr;
  }
}
</style>
