<script setup>
import { traerOrders } from '@/composables/Orders/traerOrders'
import { traerUsers } from '@/composables/Users/traerUsers'
import { traerDocuments} from '@/composables/Documents/traerDocuments'

import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const {orders,llamarOrdenesAPI} = traerOrders()
const {users,llamarUsuariosAPI} = traerUsers()
const {docs,llamarDocsAPI} = traerDocuments()

llamarOrdenesAPI('http://localhost:3000/orders/')
llamarUsuariosAPI('http://localhost:3000/users/')
llamarDocsAPI('http://localhost:3000/documents/')


const findUser = (uuid) => users.value.find(u => u.uuid === uuid)
const findDoc = (uuid) => docs.value.find(d => d.uuid === uuid)

const ordersView = computed(() => {
  return orders.value.map((o) => {
    const user = o.userUuid ? findUser(o.userUuid) : null

    // total copias (sum de cantidad por detalle)
    const totalCopias = (o.details ?? []).reduce((acc, d) => acc + Number(d.cantidad ?? 0), 0)

    // subtotal sumando detalles
    const subtotal = (o.details ?? []).reduce((acc, d) => acc + Number(d.subtotal ?? 0), 0)

    // archivo: si hay 1 detalle, usamos su doc, si hay varios -> "Varios (N)"
    const firstDocUuid = o.details?.[0]?.documentUuid
    const firstDoc = firstDocUuid ? findDoc(firstDocUuid) : null

    const archivoLabel =
      (o.details?.length ?? 0) === 0
        ? '(sin documento)'
        : (o.details?.length ?? 0) === 1
          ? (firstDoc?.fileName ?? firstDocUuid ?? '(doc)')
          : `Varios (${o.details.length})`

    return {
      uuid: o.uuid,
      clienteNombre: user?.name ?? 'Consumidor',
      clienteApellido: user?.surname ?? 'Final',
      archivo: archivoLabel,
      archivoUuid: firstDocUuid ?? null, // para abrir el primero
      fecha: new Date(o.createdAt).toLocaleString(),
      estado: o.estado,
      cantidad: totalCopias,
      subtotal,
      total: Number(o.total ?? subtotal),
      // si querés usar detalles en la UI
      details: o.details ?? [],
      notes: o.notes ?? '',
    }
  })
})

const abrirArchivo = (docUuid) => {
  window.open(`http://localhost:3000/documents/${docUuid}`, '_blank')
}


</script>
<template>
  <h1>Pedidos</h1>

  <div class="contenedor">

    <nav>
    <RouterLink to="/pedidos/nuevo">Nuevo Pedido</RouterLink>
  </nav>
    Aquí va la lista de pedidos

    <div class="pedido" v-for="order in ordersView" :key="order.uuid">
  <p><strong>UUID:</strong> {{ order.uuid }}</p>

  <p><strong>Cliente:</strong>  {{ order.clienteNombre }} {{ order.clienteApellido }}</p>

  <p><strong>Archivo:</strong> {{ order.archivo }}
    <ul v-if="order.details?.length">
      <li v-for="d in order.details" :key="d.uuid">
        {{ findDoc(d.documentUuid)?.fileName ?? d.documentUuid }}
      <button type="button" @click="abrirArchivo(d.documentUuid)">Ver</button> — Copias: {{ d.cantidad }} — Subtotal: ${{ d.subtotal }}
      
      </li>
    </ul>
  </p>

  <p><strong>Fecha:</strong> {{ order.fecha }}</p>
  <p><strong>Estado:</strong> {{ order.estado }}</p>
  <p><strong>Notas:</strong> {{ order.notes }}</p>

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
