<template>
  <Teleport to="body">
    <div class="auth">
      <div class="auth__body">
        <div @click="$emit('authClose')" class="auth__close"></div>
        <div class="auth__method">
          <button
            @click="selectedMethod = 'login'"
            :class="['primary', { selected: selectedMethod === 'login' }]"
          >
            {{ $t('auth.login') }}
          </button>
          <button
            @click="selectedMethod = 'signup'"
            :class="['primary', { selected: selectedMethod === 'signup' }]"
          >
            {{ $t('auth.signup') }}
          </button>
        </div>
        <template v-if="selectedMethod === 'signup'">
          <div class="auth__inputs">
            <input
              v-model="userData.name"
              :placeholder="$t('auth.name')"
              type="text"
              class="primary"
            />
            <input
              v-model="userData.lastname"
              :placeholder="$t('auth.lastname')"
              type="text"
              class="primary"
            />
            <input v-model="userData.email" placeholder="Email" type="text" class="primary" />
            <input
              v-model="userData.password"
              :placeholder="$t('auth.password')"
              type="password"
              class="primary"
            />
            <input
              v-model="userData.repeatPassword"
              :placeholder="$t('auth.repeatPassword')"
              type="password"
              class="primary"
            />
          </div>
        </template>

        <template v-if="selectedMethod === 'login'">
          <div class="auth__inputs">
            <input v-model="userData.email" placeholder="Email" type="text" class="primary" />
            <input
              v-model="userData.password"
              :placeholder="$t('auth.password')"
              type="password"
              class="primary"
            />
          </div>
        </template>
        <div v-if="authStore.authError" class="auth__error">
          {{ errorMessage }}
        </div>
        <button @click="onAuth" :disabled="!isDataEntered" class="primary">
          {{ actionButtonTitle }}
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useAuthStore } from '@/stores/modules/authStore'
import { ref, computed } from 'vue'

const userData = ref({})

const authStore = useAuthStore()
const selectedMethod = ref('login')
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
const actionButtonTitle = computed(() =>
  selectedMethod.value === 'login' ? t('auth.login') : t('auth.signup'),
)
const isDataEntered = computed(() => {
  if (
    selectedMethod.value === 'signup' &&
    userData.value.name &&
    userData.value.lastname &&
    userData.value.email &&
    userData.value.password?.length >= 8 &&
    userData.value.password === userData.value.repeatPassword
  )
    return true
  if (selectedMethod.value === 'login' && userData.value.password) return true

  return false
})
const emit = defineEmits(['authClose'])
async function onAuth() {
  if (isDataEntered.value && selectedMethod.value === 'login') {
    await authStore.login(userData.value)
    if (!authStore.authError) emit('authClose')
    console.log(authStore.authError)
    console.log(authStore.authResult)

    if (authStore.authResult.value) console.log(authStore.authResult.value)
  } else if (isDataEntered.value && selectedMethod.value === 'signup')
    authStore.signup(userData.value)
}

const errorMessage = computed(() => {
  if (authStore.authError?.status === 404) return 'Користувача не з таким email не існує'
  if (authStore.authError?.status === 401) return 'Неправильний email або пароль'
  return 'Помилка авторизації'
})
</script>

<style lang="scss" scoped>
.auth {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(#000000, 0.2);
  &__body {
    position: relative;

    border-radius: 12px;
    padding: 71px 40px;
    background: white;

    width: 400px;

    display: flex;
    flex-direction: column;
    gap: 32px;

    animation: scaleBlock 0.2s ease-in-out 1;
  }
  &__method {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    button {
      background: none;
      color: #000000;
    }

    & button.selected {
      background: #ff4848;
      color: white;
    }
  }
  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__close {
    top: 16px;
    right: 16px;

    position: absolute;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: url('@/assets/icons/cross.svg') no-repeat;
  }
  &__error {
    font-size: 12px;
    color: red;
  }
}
@keyframes scaleBlock {
  0% {
    transform: scale(0.5, 0.5);
    opacity: 0.2;
  }
  100% {
    transform: scale(1, 1);
    opacity: 1;
  }
}
</style>
