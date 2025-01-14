import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAdmin } from './helpers'
import { useGeneralStore } from '@/stores/generalStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: () => import('@/views/CatalogueView.vue'),
    },
    {
      path: '/catalogue/:category/:id',
      name: 'category',
      component: () => import('@/views/products/ProductsView.vue'),
    },
    {
      path: '/:subcategory/:id',
      name: 'subcategory',
      component: () => import('@/views/products/ProductsView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/products/ProductsView.vue'),
    },
    {
      path: '/products/:id',
      name: 'product',
      component: () => import('@/views/products/ProductPage.vue'),
      children: [
        {
          path: '',
          name: 'productAbout',
          component: () => import('@/components/products/ProductAbout.vue'),
          props: true,
        },
        {
          path: 'features',
          name: 'productFeatures',
          component: () => import('@/components/products/ProductFeatures.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/admin-panel',
      name: 'adminPanel',
      component: () => import('@/views/AdminPanel.vue'),
      meta: { requiresAdminRules: true },
      children: [
        {
          path: 'categories',
          name: 'categoriesManage',
          component: () => import('@/components/adminPanel/CategoriesManager.vue'),
        },
        {
          path: 'subcategories',
          name: 'subcategoriesManage',
          component: () => import('@/components/adminPanel/SubcategoriesManager.vue'),
        },
        {
          path: 'features',
          name: 'featuresManage',
          component: () => import('@/components/adminPanel/FeaturesManager.vue'),
        },
        {
          path: 'products',
          name: 'productsManage',
          component: () => import('@/components/adminPanel/ProductsManager.vue'),
        },
        {
          path: 'products/edit/:id',
          name: 'productEdit',
          component: () => import('@/components/adminPanel/ProductEdit.vue'),
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/OrderComplete.vue'),
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/ErrorPage.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta?.requiresAdminRules) {
    const admin = await isAdmin()
    if (!admin) {
      const generalStore = useGeneralStore()
      generalStore.setError({ response: { status: 403, statusText: 'Access denied' } })
      return next({ name: 'error' })
    }
  }
  next()
})

export default router
