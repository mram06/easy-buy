<template>
  <div class="categories-view">
    <div class="errors">
      <div class="errors__body">
        <template v-if="productsStore.errors"
          ><div v-for="error in productsStore.errors" :key="error.value">
            {{ error.msg }}
          </div></template
        >
      </div>
    </div>
    <h3 class="title">Додати нову підкатегорію</h3>
    <div class="add-form">
      <label>
        Бренд
        <input v-model="formData.brand" type="text" class="primary" />
      </label>
      <label>
        Назва (UA)
        <input v-model="formData.title_ua" type="text" class="primary" />
      </label>
      <label>
        Назва (EN)
        <input v-model="formData.title_en" type="text" class="primary" />
      </label>
      <label>
        Опис (UA)
        <input v-model="formData.description_ua" type="text" class="primary" />
      </label>
      <label>
        Опис (EN)
        <input v-model="formData.description_en" type="text" class="primary" />
      </label>
      <label>
        Ціна
        <input v-model="formData.price" type="number" class="primary" />
      </label>
      <label>
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

    <h3 class="title">Список всіх підкатегорій</h3>
    <div class="table">
      <div class="table__head">
        <div class="table__row-field">ID</div>
        <div class="table__row-field">Бренд</div>
        <div class="table__row-field">Назва (UA)</div>
        <div class="table__row-field">Назва (EN)</div>
        <div class="table__row-field">Опис (UA)</div>
        <div class="table__row-field">Опис (EN)</div>
        <div class="table__row-field">Ціна</div>
        <div class="table__row-field">Фото</div>
        <div class="table__row-field">Підкатегорія</div>
      </div>

      <div v-for="(product, i) in productsList" :key="product.id" class="table__row">
        <div class="table__row-field">{{ product.id }}</div>
        <div class="table__row-field">{{ product.brand }}</div>
        <div class="table__row-field">{{ product.title_ua }}</div>
        <div class="table__row-field">{{ product.title_en }}</div>
        <div class="table__row-field">{{ product.description_ua }}</div>
        <div class="table__row-field">{{ product.description_en }}</div>
        <div class="table__row-field">{{ product.price }}</div>
        <div class="table__row-field">
          <img :src="product.imgSrc" />
        </div>

        <div class="table__row-field">
          <select v-model="modifiedList[i].subcategory_id">
            <option :value="null">Не назначено</option>
            <option
              v-for="subcategory in subcategoriesStore.subcategoriesList"
              :key="subcategory.id"
              :value="subcategory.id"
            >
              {{ subcategory.id }} - {{ subcategory.title_ua }}
            </option>
          </select>
          <div class="table__row-buttons">
            <button
              @click="productsStore.setSubcategory(modifiedList[i])"
              :disabled="modifiedList[i].subcategory_id === productsList[i].subcategory_id"
              class="secondary"
            >
              Зберегти
            </button>
            <button @click="productsStore.deleteProduct(product.id)" class="danger">
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
import { useProductsStore } from '@/stores/modules/productsStore'
import { useSubcategoriesStore } from '@/stores/modules/subcategoriesStore'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const subcategoriesStore = useSubcategoriesStore()
const productsStore = useProductsStore()
const productsList = computed(() => productsStore.productsList)
const modifiedList = computed(() => productsStore.modifiedList)

onMounted(() => {
  productsStore.loadFullProductsList()
  subcategoriesStore.loadSubcategoriesList()
})

const router = useRouter()
function onEdit(id) {
  router.push({ name: 'productEdit', params: { id: id } })
}

const formData = ref({
  subcategory_id: null,
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

const isDataEntered = computed(() => {
  if (
    formData.value.imgSrc?.startsWith('data:image/') &&
    formData.value.brand &&
    formData.value.title_ua &&
    formData.value.title_en &&
    formData.value.description_ua &&
    formData.value.description_en &&
    formData.value.price &&
    formData.value.subcategory_id
  )
    return true
  else return false
})

function onAdd() {
  if (isDataEntered.value) {
    const formDataToSend = new FormData()
    formDataToSend.append('brand', formData.value.brand)
    formDataToSend.append('title_ua', formData.value.title_ua)
    formDataToSend.append('title_en', formData.value.title_en)
    formDataToSend.append('description_ua', formData.value.description_ua)
    formDataToSend.append('description_en', formData.value.description_en)
    formDataToSend.append('price', formData.value.price)
    formDataToSend.append('subcategory_id', formData.value.subcategory_id)

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

      productsStore.addProduct(formDataToSend)
      formData.value = {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/admin.scss');
.table {
  &__row {
    grid-template-columns: 0.5fr repeat(8, 1fr);
  }
  &__head {
    grid-template-columns: 0.5fr repeat(8, 1fr);
  }
}
</style>
