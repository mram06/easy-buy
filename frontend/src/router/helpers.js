import { useAuthStore } from '@/stores/modules/authStore'
import { useUsersStore } from '@/stores/modules/usersStore'

async function isAdmin() {
  await useAuthStore().loginWithCredential()
  console.log(useUsersStore().user?.type)

  return useUsersStore().user?.type === 'admin' ? true : false
}
export { isAdmin }
