<script setup>
import { traerProducts } from '@/composables/Products/traerProducts'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
let filter = ref('')
const {products,llamarProductosAPI} = traerProducts()

llamarProductosAPI('http://localhost:3000/products/')

function filtrar(campo) {
 //AUTOMATICO llamarProductosAPI(`http://localhost:3000/products/?_sort=${campo}&_order=asc`)
 alert(`Filtrando por: ${campo}`)
}
</script>
<template>

  <h1>PRODUCTOS</h1>

  <nav>
    <RouterLink to="/productos/nuevo">AÑADIR PRODUCTO</RouterLink>
  </nav>

  <p for="filter">Filtrar productos</p>

  <select name="orderBy" id="" placeholder="Filtrar por:" v-model="filter">
    <option value="name">Nombre</option>
    <option value="price">Precio</option>
    <option value="category">Categoría</option>
  </select>

  <button @click="filtrar(filter)">Filtrar</button>

  <div class="contenedor">
    <div class="producto" v-for="producto in products" :key="producto.uuid">
      <p><strong>UUID:</strong> {{ producto.uuid }}</p>
      <p><strong>Producto:</strong> {{ producto.name }}</p>
      <p><strong>Precio:</strong> $ {{ producto.price }}</p>
      <p><strong>Descripcion:</strong> {{ producto.description }}</p>
      <p><strong>Categoría:</strong> {{ producto.category }}</p>
  </div>

  </div>
</template>

<style scoped>
.contenedor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
.pedido {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
