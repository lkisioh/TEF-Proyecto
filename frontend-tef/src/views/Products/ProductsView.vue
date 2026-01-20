<script setup>
import { RouterLink } from 'vue-router'

</script>
<template>

  <h1>PRODUCTOS</h1>

  <nav>
    <RouterLink to="/productos/librería">LIBRERÍA</RouterLink>
  </nav>

  <nav>
    <RouterLink to="/productos/hojas">HOJAS</RouterLink>
  </nav>

  <nav>
    <RouterLink to="/productos/enganches">ENGANCHES</RouterLink>
  </nav>

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
