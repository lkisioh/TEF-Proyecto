<script setup>
import { ref, reactive, onMounted, computed } from 'vue'


// lógica docs
import { traerDocuments } from '@/composables/Documents/traerDocuments'

const { docs, llamarDocsAPI,} = traerDocuments()

// lógica user
import { traerUsers } from '@/composables/Users/traerUsers'

const { users, llamarUsuariosAPI } = traerUsers()

// lógica enganche

import { traerProducts } from '@/composables/Products/traerProducts'
const{ products, llamarProductosAPI } = traerProducts()

const enganches = computed(() => products.value.filter(p => p.category === 'Enganche'))

// lógica hojas

import { traerHojas } from '@/composables/Products/Hojas/traerHojas'
const {hojas, llamarHojasAPI } = traerHojas()


// Mostrar SUBTOTALES al elegir e ir cambiando selects

const getDoc = (uuid) => docs.value.find(x => x.uuid === uuid)
const getHoja = (uuid) => hojas.value.find(x => x.uuid === uuid)
const getEnganche = (uuid) => products.value.find(x => x.uuid === uuid)

const getPagesDoc = (detail) => {
  const doc = getDoc(detail.documentUuid)
  return Number(doc?.cantidadPaginas ?? 0)
}

const getPages = (detail) => {
  const doc = getDoc(detail.documentUuid)
  const paginas = Number(doc?.cantidadPaginas ?? 0)

  if (detail.printType === 'byn_doble' || detail.printType === 'col_doble') {
    return Math.ceil(paginas / 2)
  }

  return paginas
}

const getPrintOptions = (detail) => {
  const h = getHoja(detail.hojaUuid)
  if (!h) return []
  return [
    { key: 'byn_simple', label: `B/N Simple - $${h.precioBynSimple}`, price: Number(h.precioBynSimple) },
    { key: 'byn_doble',  label: `B/N Doble - $${h.precioBynDobleFaz}`, price: Number(h.precioBynDobleFaz) },
    { key: 'col_simple', label: `Color Simple - $${h.precioColorSimple}`, price: Number(h.precioColorSimple) },
    { key: 'col_doble',  label: `Color Doble - $${h.precioColorDobleFaz}`, price: Number(h.precioColorDobleFaz) },
  ]
}
// cambia la hoja y resetea
const onHojaChange = (d) => {
  d.printType = ''
  d.precioHoja = 0
}

// elige la impresión

const onPrintChange = (d) => {
  const opt = getPrintOptions(d).find(o => o.key === d.printType)
  d.precioHoja = opt ? opt.price : 0
}

// precios

const getPrecioEnganche = (d) => {
  const p = getEnganche(d.productUuid)
  return Number(p?.price ?? 0)
}

// regla típica: subtotal = paginas * cantidad * precioHoja + enganche
const getSubtotal = (d) => {
  const pages = getPages(d)
  const hoja = Number(d.precioHoja ?? 0)
  const enganche = getPrecioEnganche(d)
  return (pages * hoja + enganche)
}

//cargar selects
onMounted(() => {

    llamarDocsAPI('http://localhost:3000/documents'),
    llamarUsuariosAPI('http://localhost:3000/users'),
    llamarProductosAPI('http://localhost:3000/products'),
    llamarHojasAPI('http://localhost:3000/hojas')})



// estado UI
const loading = reactive({
  users: false,
  documents: false,
  hojas: false,
  products: false,
  submit: false,
})
const error = ref('')
const success = ref('')

// form
const form = reactive({
  userUuid: '',   // opcional
  notes: '',
  details: [
    {
      documentUuid: '',
      documentPageNumber: 1,
      hojaUuid: '',
      printType: '',
      precioHoja: 0,
      productUuid: '', // opcional
      precioEnganche: 0,
      cantidad: 1,
      description: '',
    },
  ],
})


const addDetail = () => {
  form.details.push({
    documentUuid: '',
    documentPageNumber: 1,
    hojaUuid: '',
    printType: '',
    precioHoja: 0,
    productUuid: '',
    precioEnganche: 0,
    cantidad: 1,
    description: '',
  })
}

const removeDetail = (idx) => {
  if (form.details.length === 1) return
  form.details.splice(idx, 1)
}

const validate = () => {
  if (form.details.length === 0) return 'Tenés que agregar al menos 1 detalle.'

  for (let i = 0; i < form.details.length; i++) {
    const d = form.details[i]
    if (!d.documentUuid) return `Detalle ${i + 1}: falta documento.`
    if (!d.hojaUuid) return `Detalle ${i + 1}: falta hoja.`
    if (!d.cantidad || d.cantidad < 1) return `Detalle ${i + 1}: cantidad inválida.`
  }
  return ''
}
import { crearPedido } from '@/composables/Orders/crearOrder'

const { mistake, crearPedidoAPI } = crearPedido()
const submit = async () => {
  error.value = ''
  success.value = ''

  const msg = validate()
  if (msg) {
    error.value = msg
    return
  }

  // payload que espera Nest
  const payload = {
    userUuid: form.userUuid || undefined,
    notes: form.notes || undefined,
    details: form.details.map((d) => ({
      documentUuid: d.documentUuid,
      hojaUuid: d.hojaUuid,
      printType: d.printType,
      productUuid: d.productUuid || undefined,
      cantidad: Number(d.cantidad),
      description: d.description || undefined,
    })),
  }

  loading.submit = true
  try {

    const created = await crearPedidoAPI('http://localhost:3000/orders', payload)


    success.value = `Pedido creado: ${created.uuid ?? '(ok)'}`
    alert(`Pedido creado: ${created.uuid ?? '(ok)'}`)
    alert(mistake.value)


    // reset básico
    form.userUuid = ''
    form.notes = ''
    form.details = [
      { documentUuid: '', hojaUuid: '', productUuid: '', count: 1, description: '', },
    ]

    // opcional: redirigir a la vista del pedido creado o seguir cargando, preguntar al usuario, etc.

  } catch (mistake) {
    // mensaje simple
    error.value = mistake.value ?? 'Error creando el pedido'
  } finally {
    loading.submit = false
  }
}
</script>

<template>
  <div style="max-width: 900px; margin: 0 auto; padding: 16px;">
    <h1>Crear Pedido</h1>

    <div style="margin: 12px 0;">
      <label>Cliente</label><br />
      <select v-model="form.userUuid" :disabled="loading.users">
        <option value="">-- Seleccionar Usuario --</option>
        <option v-for="u in users" :key="u.uuid" :value="u.uuid">
          {{ (u.name || '') }} {{ (u.surname || '') }} — {{ u.email }}
        </option>
      </select>
    </div>

    <div style="margin: 12px 0;">
      <label>Notas</label><br />
      <input v-model="form.notes" placeholder="Notas generales" style="width: 100%;" />
    </div>

    <hr />

    <h2>Detalles</h2>

    <div
      v-for="(d, idx) in form.details"
      :key="idx"
      style="border: 1px solid #ddd; border-radius: 8px; padding: 12px; margin-bottom: 12px;"
    >
      <div style="display:flex; justify-content: space-between; align-items: center;">
        <h3 style="margin:0;">DOCUMENTO Nº {{ idx + 1 }}</h3>
        <button type="button" @click="removeDetail(idx)" :disabled="form.details.length === 1">
          Quitar
        </button>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
        <div>
          <label>Documento</label><br />
          <select v-model="d.documentUuid" :disabled="loading.documents" style="width: 100%;">
            <option value="">-- seleccionar --</option>
            <option v-for="doc in docs" :key="doc.uuid" :value="doc.uuid">
              {{ doc.fileName }}
            </option>
          </select>
        </div>

        <div>

          <label>Hoja</label><br />
          <select v-model="d.hojaUuid" :disabled="loading.hojas" style="width: 100%;" @change="onHojaChange(d)">
             <option value="">-- seleccionar --</option>
              <option v-for="h in hojas" :key="h.uuid" :value="h.uuid">
                {{ h.tamano }} - {{ h.gramaje }} grs
              </option>
          </select>

          <label style="display:block;margin-top:8px;">Impresión</label>
          <select v-model="d.printType" :disabled="loading.hojas || !d.hojaUuid" style="width: 100%;" @change="onPrintChange(d)">
            <option value="">-- seleccionar tipo impresión --</option>
          <option v-for="opt in getPrintOptions(d)" :key="opt.key" :value="opt.key">
          {{ opt.label }}
          </option>
          </select>

        </div>

        <div>
          <label>Enganche (opcional)</label><br />
          <select v-model="d.productUuid" :disabled="loading.products" style="width: 100%;">
            <option value="">-- ninguno --</option>
            <option v-for="p in enganches" :key="p.uuid" :value="p.uuid">
              {{ p.name ?? p.nombre ?? p.uuid }} - $ {{ p.price ?? p.precio }}
            </option>
          </select>
        </div>

        <div>
          <label>Cantidad</label><br />
          <input type="number" min="1" v-model.number="d.cantidad" style="width: 100%;" />
        </div>

        <div style="grid-column: 1 / -1;">
          <label>Descripción (opcional)</label><br />
          <input v-model="d.description" placeholder="Ej: doble faz, anillado, etc." style="width: 100%;" />
        </div>
      </div>

      <h5>Páginas PDF: {{ getPagesDoc(d) }}</h5>
      <h5>Precio hoja elegido: ${{ d.precioHoja }}</h5>
      <h5>Precio enganche: ${{ getPrecioEnganche(d) }}</h5>
      <h5>Cantidad (copias): {{ d.cantidad }}</h5>
      <h5>Total impresiones: {{ getPages(d) * d.cantidad }} paginas en total</h5>
      <h5>Subtotal: ${{ getSubtotal(d) }}</h5>
      <h5>Total: ${{ getSubtotal(d) * d.cantidad }}</h5>

    </div>

    <button type="button" @click="addDetail">Agregar otro documento</button>



    <div style="margin-top: 16px;">
      <button type="button" @click="submit" :disabled="loading.submit">
        {{ loading.submit ? 'Creando...' : 'Crear pedido' }}
      </button>
    </div>

    <p v-if="error" style="color: crimson; margin-top: 12px;">{{ error }}</p>
    <p v-if="success" style="color: green; margin-top: 12px;">{{ success }}</p>
  </div>
</template>
