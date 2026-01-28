<script setup>
import { traerProducts } from '@/composables/Products/traerProducts'
import { ref, computed } from 'vue'
let filter = ref('')
const {products,llamarProductosAPI} = traerProducts()

llamarProductosAPI('http://localhost:3000/products/')

function filtrar(campo) {
 //AUTOMATICO llamarProductosAPI(`http://localhost:3000/products/?_sort=${campo}&_order=asc`)
 alert(`Filtrando por: ${campo}`)
}

const sinEnganches = computed(() => products.value.filter(p => p.category !== 'Enganche'))
</script>
<template>

  <h1>PRODUCTOS DE LIBRERÍA</h1>

   <nav>
    <RouterLink to="/productos/libreria/agregar">Añadir</RouterLink>
  </nav>
  <p for="filter">Filtrar productos</p>

  <select name="orderBy" id="" placeholder="Filtrar por:" v-model="filter">
    <option value="name">Nombre</option>
    <option value="price">Precio</option>
  </select>

  <button @click="filtrar(filter)">Filtrar</button>

  <div class="contenedor">
    <div class="producto" v-for="producto in sinEnganches" :key="producto.uuid">
      <p><strong>UUID:</strong> {{ producto.uuid }}</p>
      <p><strong>Producto:</strong> {{ producto.name }}</p>
      <p><strong>Precio:</strong> $ {{ producto.price }}</p>
      <p><strong>Descripcion:</strong> {{ producto.description }}</p>
      <p><strong>Categoría:</strong> {{ producto.category }}</p>
  </div>

  </div>
</template>
