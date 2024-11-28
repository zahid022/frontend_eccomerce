import AddBrandView from '@/views/admin/brands/AddBrandView.vue'
import BrandsView from '@/views/admin/brands/BrandsView.vue'
import AddCategoryView from '@/views/admin/category/AddCategoryView.vue'
import CategoryView from '@/views/admin/category/CategoryView.vue'
import AdminLogin from '@/views/admin/login/AdminLogin.vue'
import AddProductView from '@/views/admin/products/AddProductView.vue'
import ProductsView from '@/views/admin/products/ProductsView.vue'
import HomeView from '@/views/public/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
    {
      path: '/',
      name: 'public',
      meta: {
        requiresAuth: false,
        layout: 'PublicLayout',
      },
      children: [
        {
          path : '/',
          name : "home",
          component : HomeView
        }
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/products',
      meta: {
        requiresAuth: true,
        layout: 'AdminLayout',
      },
      children: [
        {
          path: 'products',
          name: 'products',
          component: ProductsView,
        },
        {
          path: 'add/product',
          name: 'add-product',
          component: AddProductView,
        },
        {
          path: 'brand',
          name: 'brand',
          component: BrandsView,
        },
        {
          path: 'add/brand',
          name: 'add-brand',
          component: AddBrandView,
        },
        {
          path: 'category',
          name: 'category',
          component: CategoryView,
        },
        {
          path: 'add/category',
          name: 'add-category',
          component: AddCategoryView,
        },
      ],
    },
    {
      path: '/admin-login',
      name: 'admin-login',
      component: AdminLogin,
      meta: {
        requiresAuth: false,
        layout: '',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token') 
  token = token ? JSON.parse(token) : null

  if (to.name === 'admin-login' && token) {
    next({ name: 'admin' })
  } else if (to.meta.requiresAuth && !token) {
    next({ name: 'admin-login' })
  } else {
    next()
  }
})

export default router
