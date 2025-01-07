<template>
  <default-layout>
    <div class="auth">
      <div class="container">
        <div class="auth__body">
          <div>Ваше ім'я</div>
          <input v-model="userData.name" type="text" />

          <div>Прізвище</div>
          <input v-model="userData.lastname" type="text" />

          <div>Email</div>
          <input v-model="userData.email" type="text" />

          <div>Пароль</div>
          <input v-model="userData.password" type="text" />

          <div>Повторіть пароль</div>
          <input type="text" />
          <button @click="onAuth">Зареєструватися</button>
        </div>
        <div class="auth__body">
          <div>Email</div>
          <input v-model="userData.email" type="text" />

          <div>Пароль</div>
          <input v-model="userData.password" type="text" />
          <button @click="onLogin">Увійти</button>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/modules/authStore'
import { ref } from 'vue'

const userData = ref({})

const authStore = useAuthStore()

function onAuth() {
  authStore.signup(userData.value)
}
function onLogin() {
  authStore.login(userData.value)
}
</script>

<style lang="scss" scoped></style>
