<template>
  <h1>Usuarios</h1>

  <div class="contenedor">
    <div class="usuarios" v-for="user in users" :key="user.uuid">
      <p><strong>UUID:</strong> {{ user.uuid }}</p>
      <p><strong>Cliente:</strong> {{user.name }} {{ user.surname }} </p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Celular</strong> {{ user.phone }}</p>
      <button @click="editarCliente(user.uuid)">Editar</button>
  </div>

  </div>
</template>
<script setup>
import { traerUsers } from '@/composables/Users/traerUsers'

const {users,llamarUsuariosAPI} = traerUsers()

llamarUsuariosAPI('http://localhost:3000/users/')

</script>
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
