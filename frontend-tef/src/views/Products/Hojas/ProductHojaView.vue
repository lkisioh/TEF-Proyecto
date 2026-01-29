<script setup>
import { traerHojas } from '@/composables/Products/Hojas/traerHojas'
import { ref } from 'vue'

let filter = ref('')
const {hojas,llamarHojasAPI} = traerHojas()
llamarHojasAPI('http://localhost:3000/hojas')

function filtrar(campo) {
 //AUTOMATICO llamarHojasAPI(`http://localhost:3000/products/?_sort=${campo}&_order=asc`)
 alert(`Filtrando por: ${campo}`)
}

</script>
<template>

  <h1>Hojas</h1>

   <nav>
    <RouterLink to="/productos/hojas/nueva">Añadir</RouterLink>
  </nav>
  <p for="filter">Filtrar Hojas</p>

  <select name="orderBy" id="" placeholder="Filtrar por:" v-model="filter">
    <option value="name">Nombre</option>
    <option value="price">Precio</option>
  </select>

  <button @click="filtrar(filter)">Filtrar</button>

  <div class="contenedor">
    <div class="producto" v-for="hoja in hojas" :key="hoja.uuid">
      <p><strong>UUID:</strong> {{ hoja.uuid }}</p>
      <p><strong>Hoja:</strong> {{ hoja.name }}</p>
      <p><strong>Tamaño:</strong> {{ hoja.tamano}}</p>
      <p><strong>Gramaje:</strong> {{ hoja.gramaje }}</p>
      <p><strong>Precio BLANCO Y NEGRO (simple faz):</strong> $ {{ hoja.precioBynSimple }}</p>
      <p><strong>Precio BLANCO Y NEGRO (doble faz):</strong> $ {{ hoja.precioBynDobleFaz }}</p>
      <p><strong>Precio Color (simple faz):</strong> $ {{ hoja.precioColorSimple }}</p>
      <p><strong>Precio Color (doble faz):</strong> $ {{ hoja.precioColorDobleFaz }}</p>
      <p><strong>Descripcion:</strong> {{ hoja.description }}</p>
  </div>

  </div>
</template>
