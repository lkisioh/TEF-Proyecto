<template>
  <div style="max-width:1000px;margin:0 auto;padding:16px;">
    <h1>Usuarios</h1>

    <nav style="margin:12px 0;">
      <RouterLink to="/usuarios/nuevo">Nuevo Cliente</RouterLink>
    </nav>

    <div style="overflow:auto;border:1px solid #ddd;border-radius:10px;">
      <table style="width:100%;border-collapse:collapse;min-width:850px;">
        <thead>
          <tr style="background:#f6f6f6;">
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">UUID</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">Cliente</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">Email</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">Celular</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:left;">Dirección</th>
            <th style="padding:10px;border-bottom:1px solid #ddd;text-align:center;">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.uuid">
            <td style="padding:10px;border-bottom:1px solid #eee;font-family:monospace;">
              {{ user.uuid }}
            </td>

            <td style="padding:10px;border-bottom:1px solid #eee;">
              {{ user.name }} {{ user.surname }}
            </td>

            <td style="padding:10px;border-bottom:1px solid #eee;">
              {{ user.email }}
            </td>

            <td style="padding:10px;border-bottom:1px solid #eee;">
              {{ user.phone }}
            </td>

            <td style="padding:10px;border-bottom:1px solid #eee;">
              {{ user.address }}
            </td>

            <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;white-space:nowrap;">
              <!-- Editar -->
              <RouterLink
                :to="`/usuarios/editar/${user.uuid}`"
                style="display:inline-block;padding:6px 10px;border:1px solid #999;border-radius:8px;margin-right:8px;text-decoration:none;"
              >
                Editar
              </RouterLink>

              <!-- Eliminar -->
              <button
                type="button"
                @click="eliminarCliente(user.uuid)"
                style="padding:6px 10px;border:1px solid #c33;background:transparent;border-radius:8px;cursor:pointer;"
              >
                Eliminar
              </button>
            </td>
          </tr>

          <tr v-if="!users || users.length === 0">
            <td colspan="6" style="padding:14px;text-align:center;">
              No hay usuarios cargados.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { traerUsers } from '@/composables/Users/traerUsers'

const {users,llamarUsuariosAPI} = traerUsers()

llamarUsuariosAPI('http://localhost:3000/users/')

const eliminarCliente = async (uuid) => {
  const ok = confirm('¿Seguro que querés eliminar este usuario?')
  if (!ok) return

  try {
    await fetch(`http://localhost:3000/users/${uuid}`, {
      method: 'DELETE'
    })

    // actualizar lista local
    users.value = users.value.filter(u => u.uuid !== uuid)

  } catch (e) {
    console.log(e)
    alert('No se pudo eliminar el usuario')
  }
}




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
