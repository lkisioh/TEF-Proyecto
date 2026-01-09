<script setup>
import { traerProducts } from '@/composables/Products/traerProducts'
import { editarProduct } from '@/composables/Products/editarProduct'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const {llamarProductosAPI} = traerProducts()

const {editarProductoAPI} = editarProduct()

const product = ref({
  name: '',
  price: 0,
  description: '',
  category: 'papeleria'
})

const route = useRoute()
const router = useRouter()

const uuid = String(route.params.uuid ?? '')

onMounted(async () => {
  if (uuid) {
    const data = await llamarProductosAPI(`http://localhost:3000/products/${uuid}`)

    product.value = {
      name: data.name ?? '',
      price: data.price ?? 0,
      description: data.description ?? '',
      category: data.category ?? 'papeleria'
    }
  }
})

const onSubmit = async (e) => {
  e.preventDefault()

  if (uuid) {
    await editarProductoAPI(`http://localhost:3000/products/${uuid}`, product.value)
  } else {
    // await crearProductoAPI('http://localhost:3000/products', product.value)
  }


  router.push('/productos')
}

</script >
<template>

  <h1>PRODUCTO</h1>
  <form @submit="onSubmit">

    <label for="name">Nombre:</label>
    <input type="text" id="name" name="name" v-model="product.name"/>

    <label for="price">Precio:</label>
    <input type="number" id="price" name="price" v-model="product.price"/>

    <label for="description">Descripción:</label>
    <input type="text" id="description" name="description" v-model="product.description"/>

    <label for="category">Categoría:</label>
    <select id="category" name="category" v-model="product.category">
      <option value="papeleria">Papelería</option>
      <option value="libreria">Librería</option>
      <option value="enganche">Enganche</option>
    </select>

    <button type="submit">{{ uuid ? 'Editar' : 'Agregar' }}</button>

  </form>
</template>
