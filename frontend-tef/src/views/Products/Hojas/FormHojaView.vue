<script setup>
import { reactive, ref } from 'vue'
import { api } from '@/services/api'

const error = ref('')
const success = ref('')
const loading = ref(false)

const form = reactive({
  gramaje: 80,
  precioBynSimple: 0,
  precioBynDobleFaz: 0,
  precioColorSimple: 0,
  precioColorDobleFaz: 0,
  description: '',
})

const submit = async () => {
  error.value = ''
  success.value = ''

  const nums = [
    form.precioBynSimple,
    form.precioBynDobleFaz,
    form.precioColorSimple,
    form.precioColorDobleFaz,
  ].map(Number)

  if (nums.some((n) => Number.isNaN(n) || n < 0)) return (error.value = 'Precios inválidos')
  if (Number(form.gramaje) <= 0) return (error.value = 'Gramaje inválido')

  loading.value = true
  try {
    const payload = {
      gramaje: Number(form.gramaje),
      precioBynSimple: Number(form.precioBynSimple),
      precioBynDobleFaz: Number(form.precioBynDobleFaz),
      precioColorSimple: Number(form.precioColorSimple),
      precioColorDobleFaz: Number(form.precioColorDobleFaz),
      description: form.description?.trim() || null,
    }

    const { data } = await api.post('/hojas', payload)
    success.value = `Hoja creada: ${data.uuid ?? 'OK'}`

    // reset
    form.gramaje = 80
    form.precioBynSimple = 0
    form.precioBynDobleFaz = 0
    form.precioColorSimple = 0
    form.precioColorDobleFaz = 0
    form.description = ''
  } catch (e) {
    error.value = e?.response?.data?.message ?? 'Error creando hoja'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div style="max-width:700px;margin:0 auto;padding:16px;">
    <h1>Crear Hoja</h1>

    <div>
      <label>Gramaje</label><br />
      <input type="number" min="1" v-model.number="form.gramaje" />
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
      <div>
        <label>ByN Simple</label><br />
        <input type="number" min="0" step="0.01" v-model.number="form.precioBynSimple" />
      </div>

      <div>
        <label>ByN Doble Faz</label><br />
        <input type="number" min="0" step="0.01" v-model.number="form.precioBynDobleFaz" />
      </div>

      <div>
        <label>Color Simple</label><br />
        <input type="number" min="0" step="0.01" v-model.number="form.precioColorSimple" />
      </div>

      <div>
        <label>Color Doble Faz</label><br />
        <input type="number" min="0" step="0.01" v-model.number="form.precioColorDobleFaz" />
      </div>
    </div>

    <div style="margin-top:12px;">
      <label>Descripción</label><br />
      <input v-model="form.description" placeholder="Ej: A4 80g" />
    </div>

    <div style="margin-top:16px;">
      <button type="button" :disabled="loading" @click="submit">
        {{ loading ? 'Guardando...' : 'Guardar hoja' }}
      </button>
    </div>

    <p v-if="error" style="color:crimson;margin-top:12px;">{{ error }}</p>
    <p v-if="success" style="color:green;margin-top:12px;">{{ success }}</p>
  </div>
</template>
