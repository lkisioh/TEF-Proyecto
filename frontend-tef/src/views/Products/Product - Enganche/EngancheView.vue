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

const enganches = computed(() => products.value.filter(p => p.category === 'Enganche'))

</script>
<template>

  <h1>ENGANCHES</h1>

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
    <div class="producto" v-for="e in enganches" :key="e.uuid">
      <p><strong>UUID:</strong> {{ e.uuid }}</p>
      <p><strong>Producto:</strong> {{ e.name }}</p>
      <p><strong>Precio:</strong> $ {{ e.price }}</p>
      <p><strong>Descripcion:</strong> {{ e.description }}</p>
  </div>

  </div>
</template>
