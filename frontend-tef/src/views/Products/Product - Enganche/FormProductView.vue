<script setup>
import { reactive, ref } from 'vue'
import { crearProductEnganche } from '@/composables/Products/crearProduct';


const { cargando, error, crearProductosAPI, } = crearProductEnganche()

let success = ref('')
let err = ref('')


const form = reactive({
  name: '',
  price: 0,
  description: '',
  category: 'librería', // 'enganche' | 'librería'
})

const submit = async () => {
  err.value = ''
  success.value = ''

  if (!form.name.trim()) return (error.value = 'Falta nombre')
  if (Number(form.price) < 0) return (error.value = 'Precio inválido')

  cargando.value = true
  try {
    const nuevoProductoEnganche = {
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description?.trim() || null,
    }
    if (form.category === 'enganche'){
      nuevoProductoEnganche.category.value = form.category
    }
    const { data } = await crearProductosAPI('http://localhost:3000/products',nuevoProductoEnganche)
    success.value = `Creado: ${data.uuid ?? 'OK'}`
    alert(`Producto / Enganche creado: ${data.uuid ?? 'OK'}`)

    form.name = ''
    form.price = 0
    form.description = ''
    form.category = 'librería'
  } catch (e) {
    err.value = e?.response?.data?.message ?? 'Error creando producto'
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <div style="max-width:700px;margin:0 auto;padding:16px;">
    <h1>Crear {{ form.category === 'librería' ? 'Producto' : 'Enganche' }}</h1>

    <label>Tipo</label><br />
    <select v-model="form.category">
      <option value="librería">Librería</option>
      <option value="enganche">Enganche</option>
    </select>

    <div style="margin-top:12px;">
      <label>Nombre</label><br />
      <input v-model="form.name" />
    </div>

    <div style="margin-top:12px;">
      <label>Precio</label><br />
      <input type="number" v-model.number="form.price" min="0" step="0.01" />
    </div>

    <div style="margin-top:12px;">
      <label>Descripción</label><br />
      <input v-model="form.description" />
    </div>

    <div style="margin-top:16px;">
      <button type="button" :disabled="cargando" @click="submit">
        {{ cargando ? 'Guardando...' : 'Guardar' }}
      </button>
    </div>

    <p v-if="err" style="color:crimson;margin-top:12px;">{{ err }}</p>
    <p v-if="success" style="color:green;margin-top:12px;">{{ success }}</p>
  </div>
</template>

