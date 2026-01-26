import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SoporteView.vue'),
    },
     {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/Users/UsersView.vue'),
    },
     {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/Products/ProductsView.vue'),
    },
     {
      path: '/productos/librería',
      name: 'productosLibreríaAñadir',
      component: () => import('../views/Products/ProductLibraryView.vue'),
    },
     {
      path: '/productos/librería/editar/:uuid',
      name: 'productosEditar',
      component: () => import('../views/Products/FormProductLibraryView.vue'),
    },
     {
      path: '/productos/librería/agregar',
      name: 'productosLibreríaAgregar',
      component: () => import('../views/Products/FormProductLibraryView.vue'),
    },
     {
      path: '/pedidos',
      name: 'pedidos',
      component: () => import('../views/Orders/OrdersView.vue'),
    },
     {
      path: '/pedidos/nuevo',
      name: 'pedidosNuevo',
      component: () => import('../views/Orders/FormOrderView.vue'),
    },
     {
      path: '/archivos',
      name: 'archivos',
      component: () => import('../views/Documents/DocumentsView.vue'),
    },
     {
      path: '/soporte',
      name: 'soporte',
      component: () => import('../views/SoporteView.vue'),
    },
  ],
})

export default router
