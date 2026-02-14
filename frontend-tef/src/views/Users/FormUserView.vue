<script setup>
import { reactive, ref } from 'vue'
import { crearUser } from '@/composables/Users/crearUser'


const { cargando, error, crearUserAPI, } = crearUser()

let success = ref('')
let err = ref('')


const form = reactive({
  name: '',
  surname: '',
  email: '',
  address: '',
  phone: '',
  password: '123456',
})

const submit = async () => {


  if (!form.name.trim()) return (error.value = 'Falta nombre')
  if (!form.surname.trim()) return (error.value = 'Falta apellido')
  if (!form.email.trim()) return (error.value = 'Falta email')
  if (!form.address.trim()) return (error.value = 'Falta dirección')
  if (!form.phone.trim()) return (error.value = 'Falta teléfono')
  if (!form.password.trim()) return (error.value = 'Falta contraseña')
  cargando.value = true
  try {
    const nuevoUser = {
      name: form.name.trim(),
      surname: form.surname.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      phone: form.phone.trim(),
      password: form.password.trim(),
    }
    const data = await crearUserAPI('http://localhost:3000/users',nuevoUser)
    success.value = `Creado: ${data.uuid ?? 'OK'}`
    alert(`Usuario creado: ${data.uuid ?? 'OK'}`)

    form.name = ''
    form.surname = ''
    form.email = ''
    form.address = ''
    form.phone = ''
  } catch (e) {
    err.value = e?.response?.data?.message
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <div style="max-width:700px;margin:0 auto;padding:16px;">
    <h1>Usuario nuevo</h1>

    <div style="margin-top:12px;">
      <label>Nombre</label><br />
      <input v-model="form.name" />
    </div>

    <div style="margin-top:12px;">
      <label>Apellido</label><br />
      <input v-model="form.surname" />
    </div>

    <div style="margin-top:12px;">
      <label>Email</label><br />
      <input type="email" v-model="form.email" />
    </div>

    <div style="margin-top:12px;">
      <label>Dirección</label><br />
      <input v-model="form.address" />
    </div>

    <div style="margin-top:12px;">
      <label>Teléfono</label><br />
      <input type="string" v-model="form.phone"  />
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
