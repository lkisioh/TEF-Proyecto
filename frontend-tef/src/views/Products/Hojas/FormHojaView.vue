<script setup>
import { reactive, ref } from 'vue'

import { crearHojas } from '@/composables/Hojas/crearHoja'

const { createdHoja, error, crearHojaAPI }= crearHojas()

const success = ref('')
const loading = ref(false)

let err = ref('')

const form = reactive({
  tamano: 'A4',
  tipo: '',
  gramaje: 80,
  precioBynSimple: 0,
  precioBynDobleFaz: 0,
  precioColorSimple: 0,
  precioColorDobleFaz: 0,
  description: '',
})

const submit = async () => {
  err.value = ''

  const nums = [
    form.precioBynSimple,
    form.precioBynDobleFaz,
    form.precioColorSimple,
    form.precioColorDobleFaz,
  ].map(Number)

  if (nums.some((n) => Number.isNaN(n) || n < 0)) return (err.value = 'Precios inválidos')
  if (Number(form.gramaje) <= 0) return (error.value = 'Gramaje inválido')

  loading.value = true
  try {
    const nuevaHoja = {
      tamano: form.tamano?.trim() || null,
      tipo: form.tipo?.trim() || null,
      gramaje: Number(form.gramaje),
      precioBynSimple: Number(form.precioBynSimple),
      precioBynDobleFaz: Number(form.precioBynDobleFaz),
      precioColorSimple: Number(form.precioColorSimple),
      precioColorDobleFaz: Number(form.precioColorDobleFaz),
      description: form.description?.trim() || null,
    }

    //const data = await crearHojaAPI('http://localhost:3000/hojas',nuevaHoja)
    //success.value = `Hoja creada: ${data.uuid ?? 'OK'}`
    //alert(`Hoja creada con éxito: ${data.uuid ?? 'OK'}`)

    const res = await crearHojaAPI('http://localhost:3000/hojas', nuevaHoja)
    const data = res?.data ?? res

    success.value = `Hoja creada: ${data?.uuid ?? 'OK'}`
    alert(`Hoja creada con éxito: ${data?.uuid ?? 'OK'}`)


    // reset
    form.tamano = 'A4'
    form.tipo = ''
    form.gramaje = 80
    form.precioBynSimple = 0
    form.precioBynDobleFaz = 0
    form.precioColorSimple = 0
    form.precioColorDobleFaz = 0
    form.description = ' '
  } catch (e) {
    err.value = e?.response?.data?.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div style="max-width:700px;margin:0 auto;padding:16px;">
    <h1>Crear Hoja</h1>

    <div>
      <label>Tamaño</label><br />
      <select v-model="form.tamano" >
        <option value="">-- Seleccionar Hoja--</option>
        <option value="A3">A3</option>
        <option value="A4">A4</option>
        <option value="Oficio">Oficio</option>
      </select>
    </div>

    <div>
      <label>Tipo de hoja</label><br />
      <select v-model="form.tipo" >
        <option value="">-- Seleccionar Tipo de Hoja--</option>
        <option value="Ilustracion">Ilustración</option>
        <option value="Papel Obra">Papel Obra</option>
        <option value="Papel Ilustracion Adhesivo">Papel Ilustración Adhesivo</option>
        <option value="Adhesivo OPP">Adhesivo OPP</option>
        <option value="Papel Fotografico">Papel Fotográfico</option>
        <option value="Papel Fotografico Adhesivo">Papel Fotográfico Adhesivo</option>
        <option value="Outlet">Outlet</option>
      </select>
    </div>




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
      <input v-model="form.description" placeholder="Ej: sticker - papel fotográfico" />
    </div>

    <div style="margin-top:16px;">
      <button type="button" :disabled="loading" @click="submit">
        {{ loading ? 'Guardando...' : 'Guardar hoja' }}
      </button>
    </div>

    <p v-if="err" style="color:crimson;margin-top:12px;">{{ err }}</p>
    <p v-if="success" style="color:green;margin-top:12px;">{{ success }}</p>
  </div>
</template>
