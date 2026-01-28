<script setup>
import { traerOrders } from '@/composables/Orders/traerOrders'
import { RouterLink } from 'vue-router'

const {orders,llamarOrdenesAPI} = traerOrders()

llamarOrdenesAPI('http://localhost:3000/orders/')

</script>
<template>
  <h1>Pedidos</h1>

  <div class="contenedor">

    <nav>
    <RouterLink to="/pedidos/nuevo">Nuevo Pedido</RouterLink>
  </nav>
    Aquí va la lista de pedidos
    <div class="pedido" v-for="order in orders" :key="order.uuid">
      <p><strong>UUID:</strong> {{ order.uuid }}</p>
      <p><strong>Cliente:</strong> {{ order.clienteApellido }} {{ order.clienteNombre }} </p>
      <p><strong>Archivo:</strong> {{ order.archivo }}</p> <button @click="abrirArchivo(order.archivo)">Ver archivo</button>
      <p><strong>Fecha:</strong> {{ order.fecha }}</p>
      <p><strong>Estado:</strong> {{ order.estado }}</p>
      <p><strong>Cantidad:</strong> {{ order.cantidad }}</p>
      <p><strong>Subtotal:</strong> {{ order.subtotal }}</p>
      <p><strong>Total:</strong> ${{ order.total }}</p>
  </div>

  </div>
</template>
>
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
