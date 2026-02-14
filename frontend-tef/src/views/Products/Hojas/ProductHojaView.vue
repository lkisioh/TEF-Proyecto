<script setup>
import { traerHojas } from '@/composables/Products/Hojas/traerHojas'
import { ref } from 'vue'

let filter = ref('')
const {hojas,llamarHojasAPI} = traerHojas()
llamarHojasAPI('http://localhost:3000/hojas')

function filtrar(campo) {
 //AUTOMATICO llamarHojasAPI(`http://localhost:3000/products/?_sort=${campo}&_order=asc`)
 alert(`Filtrando por: ${campo}`)
}

const eliminarHoja = async (uuid) => {
  const ok = confirm('¿Seguro que querés eliminar esta hoja?')
  if (!ok) return

  try {
    // ejemplo con fetch, reemplazalo por tu composable si ya lo tenés
    await fetch(`http://localhost:3000/hojas/${uuid}`, { method: 'DELETE' })
    // refrescá lista (o filtrá localmente)
    hojas.value = hojas.value.filter(h => h.uuid !== uuid)
  } catch (e) {
    console.log(e)
    alert('No se pudo eliminar.')
  }
}





</script>
<template>
  <div style="max-width:1100px;margin:0 auto;padding:16px;">
    <h1>Hojas</h1>

    <nav style="margin:12px 0;">
      <RouterLink to="/productos/hojas/nueva">Añadir</RouterLink>
    </nav>

    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:12px 0;">
      <label for="orderBy"><strong>Filtrar Hojas:</strong></label>

      <select id="orderBy" v-model="filter">
        <option value="name">Nombre</option>
        <option value="price">Precio</option>
      </select>

      <button type="button" @click="filtrar(filter)">Filtrar</button>
    </div>

    <div style="overflow:auto;border:1px solid #ddd;border-radius:10px;">
      <table style="width:100%;border-collapse:collapse;min-width:1050px;">
        <thead>
          <tr style="background:#f6f6f6;">
            <th style="text-align:left;padding:10px;border-bottom:1px solid #ddd;">UUID</th>
            <th style="text-align:left;padding:10px;border-bottom:1px solid #ddd;">Tamaño</th>
            <th style="text-align:left;padding:10px;border-bottom:1px solid #ddd;">Tipo</th>
            <th style="text-align:right;padding:10px;border-bottom:1px solid #ddd;">Gramaje</th>
            <th style="text-align:right;padding:10px;border-bottom:1px solid #ddd;">ByN Simple</th>
            <th style="text-align:right;padding:10px;border-bottom:1px solid #ddd;">ByN Doble</th>
            <th style="text-align:right;padding:10px;border-bottom:1px solid #ddd;">Color Simple</th>
            <th style="text-align:right;padding:10px;border-bottom:1px solid #ddd;">Color Doble</th>
            <th style="text-align:left;padding:10px;border-bottom:1px solid #ddd;">Descripción</th>
            <th style="text-align:center;padding:10px;border-bottom:1px solid #ddd;white-space:nowrap;">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="hoja in hojas" :key="hoja.uuid">
            <td style="padding:10px;border-bottom:1px solid #eee;font-family:monospace;">
              {{ hoja.uuid }}
            </td>
            <td style="padding:10px;border-bottom:1px solid #eee;">
              {{ hoja.tamano }}
            </td>
            <td style="padding:10px;border-bottom:1px solid #eee;">
              {{ hoja.tipo }}
            </td>
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
              {{ hoja.gramaje }}
            </td>
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
              $ {{ hoja.precioBynSimple }}
            </td>
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
              $ {{ hoja.precioBynDobleFaz }}
            </td>
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
              $ {{ hoja.precioColorSimple }}
            </td>
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
              $ {{ hoja.precioColorDobleFaz }}
            </td>
            <td style="padding:10px;border-bottom:1px solid #eee;">
              {{ hoja.description }}
            </td>

            <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;white-space:nowrap;">
              <!-- Editar: ajustá la ruta si la tuya es distinta -->
              <RouterLink
                :to="`/productos/hojas/editar/${hoja.uuid}`"
                style="display:inline-block;padding:6px 10px;border:1px solid #999;border-radius:8px;margin-right:8px;text-decoration:none;"
              >
                Editar
              </RouterLink>

              <button
                type="button"
                @click="eliminarHoja(hoja.uuid)"
                style="padding:6px 10px;border:1px solid #c33;background:transparent;border-radius:8px;cursor:pointer;"
              >
                Eliminar
              </button>
            </td>
          </tr>

          <tr v-if="!hojas || hojas.length === 0">
            <td colspan="11" style="padding:14px;text-align:center;">
              No hay hojas cargadas.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

