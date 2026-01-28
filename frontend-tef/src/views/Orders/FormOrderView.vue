<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import axios from 'axios'

// lógica docs
import { traerDocuments } from '@/composables/Documents/traerDocuments'

const { docs, llamarDocsAPI,} = traerDocuments()

//lógica user
import { traerUsers } from '@/composables/Users/traerUsers'

const {users,llamarUsuariosAPI} = traerUsers()

// lógica enganche

import { traerProducts } from '@/composables/Products/traerProducts'
const{ products, llamarProductosAPI} = traerProducts()

const enganches = computed(() => products.value.filter(p => p.category === 'Enganche'))

//cargar selects
onMounted(async () => {
  await llamarDocsAPI('http://localhost:3000/documents', llamarUsuariosAPI('http://localhost:3000/users/'), llamarProductosAPI('http://localhost:3000/products'))
})


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
      hojaUuid: '',
      productUuid: '', // opcional
      count: 1,
      description: '',
    },
  ],
})


const addDetail = () => {
  form.details.push({
    documentUuid: '',
    hojaUuid: '',
    productUuid: '',
    count: 1,
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
    if (!d.count || d.count < 1) return `Detalle ${i + 1}: cantidad inválida.`
  }
  return ''
}

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
      productUuid: d.productUuid || undefined,
      count: Number(d.count),
      description: d.description || undefined,
    })),
  }

  loading.submit = true
  try {
    const { data } = await axios.post('/orders', payload)
    success.value = `Pedido creado: ${data.uuid ?? '(ok)'}`
    // reset básico
    form.userUuid = ''
    form.notes = ''
    form.details = [
      { documentUuid: '', hojaUuid: '', productUuid: '', count: 1, description: '' },
    ]
  } catch (e) {
    // mensaje simple
    error.value = e?.response?.data?.message ?? 'Error creando el pedido'
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
        <h3 style="margin:0;">Detalle {{ idx + 1 }}</h3>
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
          <select v-model="d.hojaUuid" :disabled="loading.hojas" style="width: 100%;">
            <option value="">-- seleccionar --</option>
            <option v-for="h in hojas" :key="h.uuid" :value="h.uuid">
              {{ h.name ?? h.tipo ?? h.uuid }}
            </option>
          </select>
        </div>

        <div>
          <label>Enganche (opcional)</label><br />
          <select v-model="d.productUuid" :disabled="loading.products" style="width: 100%;">
            <option value="">-- ninguno --</option>
            <option v-for="p in enganches" :key="p.uuid" :value="p.uuid">
              {{ p.name ?? p.nombre ?? p.uuid }}
            </option>
          </select>
        </div>

        <div>
          <label>Cantidad</label><br />
          <input type="number" min="1" v-model.number="d.count" style="width: 100%;" />
        </div>

        <div style="grid-column: 1 / -1;">
          <label>Descripción (opcional)</label><br />
          <input v-model="d.description" placeholder="Ej: doble faz, anillado, etc." style="width: 100%;" />
        </div>
      </div>
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
