<script setup>
import { traerOrders } from '@/composables/Orders/traerOrders'
import { traerUsers } from '@/composables/Users/traerUsers'
import { traerDocuments} from '@/composables/Documents/traerDocuments'

import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { onMounted } from 'vue'

const {orders,llamarOrdenesAPI} = traerOrders()
const {users,llamarUsuariosAPI} = traerUsers()
const {docs,llamarDocsAPI} = traerDocuments()

llamarOrdenesAPI('http://localhost:3000/orders/')
llamarUsuariosAPI('http://localhost:3000/users/')
llamarDocsAPI('http://localhost:3000/documents/')

import { traerHojas } from '@/composables/Products/Hojas/traerHojas'
const {hojas, llamarHojasAPI } = traerHojas()

import { traerProducts } from '@/composables/Products/traerProducts'
const{ products, llamarProductosAPI } = traerProducts()

const enganches = computed(() => products.value.filter(p => p.category === 'Enganche'))

const findUser = (uuid) => users.value.find(u => u.uuid === uuid)
const findDoc = (uuid) => docs.value.find(d => d.uuid === uuid)

const findHoja = (uuid) => hojas.value.find(x => x.uuid === uuid)
const findEnganche = (uuid) => enganches.value.find(x => x.uuid === uuid)

onMounted(() => {

    llamarProductosAPI('http://localhost:3000/products'),
    llamarHojasAPI('http://localhost:3000/hojas')})

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

const eliminarPedido = async (uuid) => {
  const ok = confirm('¿Seguro que querés eliminar este pedido?')
  if (!ok) return

  try {
    await fetch(`http://localhost:3000/orders/${uuid}`, {
      method: 'DELETE'
    })

    ordersView.value = ordersView.value.filter(o => o.uuid !== uuid)
  } catch (e) {
    console.log(e)
    alert('No se pudo eliminar el pedido')
  }
}


</script>
<template>
  <div style="max-width:1200px;margin:0 auto;padding:16px;">
    <h1>Pedidos</h1>

    <nav style="margin:12px 0;">
      <RouterLink to="/pedidos/nuevo">Nuevo Pedido</RouterLink>
    </nav>

    <div style="overflow:auto;border:1px solid #ddd;border-radius:10px;">
      <table style="width:100%;border-collapse:collapse;min-width:1100px;">
        <thead>
          <tr style="background:#f6f6f6;">
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">UUID</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">Cliente</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">Archivos</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">Detalle</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">Fecha</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">Estado</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:right;">Subtotal</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:right;">Total</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:center;">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="order in ordersView" :key="order.uuid">
            <!-- UUID -->
            <td style="padding:10px;border-bottom:1px solid #eee;font-family:monospace;">
              {{ order.uuid }}
            </td>

            <!-- Cliente -->
            <td style="padding:10px;border-bottom:1px solid #eee;">
              {{ order.clienteNombre }} {{ order.clienteApellido }}
            </td>

            <!-- Archivos / detalles -->
            <td style="padding:10px;border-bottom:1px solid #eee;">
              <div v-if="order.details?.length">
                <div
                  v-for="d in order.details"
                  :key="d.uuid"
                  style="margin-bottom:4px;font-size:13px;"
                >

                  {{ findDoc(d.documentUuid)?.fileName ?? d.documentUuid }}
                  —
                  Copias: {{ d.cantidad }}
                  —
                  ${{ d.subtotal }}

                  <button
                    type="button"
                    @click="abrirArchivo(d.documentUuid)"
                    style="margin-left:6px;padding:2px 6px;font-size:12px;"
                  >
                    Ver
                  </button>
                </div>
              </div>
              <span v-else>-</span>
            </td>

            <td>
              <!-- detalle -->
               <div v-if="order.details?.length">
                <div
                  v-for="d in order.details"
                  :key="d.uuid"
                  style="margin-bottom:4px;font-size:13px;"
                >

                   hoja: {{ findHoja(d.hojaUuid)?.tamano}}, {{ findHoja(d.hojaUuid)?.gramaje }} grs, {{ findHoja(d.hojaUuid)?.tipo }}
                  -
                  enganche: {{ findEnganche(d.productUuid)?.name ?? '(sin enganche)' }}
                  
                </div>
              </div>
              <span v-else>-</span>


            </td>
            <!-- Fecha -->
            <td style="padding:10px;border-bottom:1px solid #eee;">
              {{ order.fecha }}
            </td>

            <!-- Estado -->
            <td style="padding:10px;border-bottom:1px solid #eee;">
              {{ order.estado }}
            </td>

            <!-- Subtotal -->
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
              $ {{ order.subtotal }}
            </td>

            <!-- Total -->
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;">
              $ {{ order.total }}
            </td>

            <!-- Acciones -->
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;white-space:nowrap;">
              <RouterLink
                :to="`/pedidos/editar/${order.uuid}`"
                style="display:inline-block;padding:6px 10px;border:1px solid #999;border-radius:8px;margin-right:6px;text-decoration:none;"
              >
                Editar
              </RouterLink>

              <button
                type="button"
                @click="eliminarPedido(order.uuid)"
                style="padding:6px 10px;border:1px solid #c33;background:transparent;border-radius:8px;cursor:pointer;"
              >
                Eliminar
              </button>
            </td>
          </tr>

          <tr v-if="!ordersView || ordersView.length === 0">
            <td colspan="8" style="padding:14px;text-align:center;">
              No hay pedidos cargados.
            </td>
          </tr>
        </tbody>
      </table>
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
