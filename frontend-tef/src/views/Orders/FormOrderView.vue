<script setup>

//nuevo
import { traerDocuments } from '@/composables/Documents/traerDocuments'
import { ref } from 'vue'
//import { useDocuments } from '@/composables/useDocuments'

const { docs, uploading, error, fetchDocs, uploadPdf } = traerDocuments()

const selectedDocId = ref('')    // el doc elegido para el pedido
const selectedFile = ref(null)   // archivo a subir

//onMounted(fetchDocs)

const onFileChange = (e) => {
  selectedFile.value = e.target.files?.[0] ?? null
}

const onUploadClick = async () => {
  try {
    const created = await uploadPdf(selectedFile.value)
    // auto-seleccionar el nuevo doc
    selectedDocId.value = created.uuid ?? created.id
    selectedFile.value = null
  } catch (err) {
    // si querés mostrar el mensaje
    console.error(err)
  }
}

// cuando crees el pedido:
const createOrder = async () => {
  const payload = {
    // ... tus campos del pedido
    documentId: selectedDocId.value || null,
  }
  // POST /orders con payload
}

</script>
<template>
  <br>
  <h1>NUEVO PEDIDO</h1>

  <!-- nuevo -->
   <div style="margin-bottom:12px;">
    <label>Seleccionar PDF existente:</label><br />
    <select v-model="selectedDocId">
      <option value="">-- Sin documento --</option>
      <option v-for="d in docs" :key="d.uuid ?? d.id" :value="d.uuid ?? d.id">
        {{ d.fileName }}
      </option>
    </select>

    <div v-if="selectedDocId" style="margin-top:6px;">
      <a :href="`http://localhost:3000/documents/${selectedDocId}`" target="_blank">Ver PDF</a>
    </div>
  </div>

  <div style="margin-bottom:12px;">
    <label>Subir nuevo PDF:</label><br />
    <input type="file" accept="application/pdf" @change="onFileChange" />
    <button type="button" :disabled="uploading || !selectedFile" @click="onUploadClick">
      {{ uploading ? 'Subiendo...' : 'Subir' }}
    </button>
  </div>

  <p v-if="error" style="color:red;">{{ error }}</p>

  <button type="button" @click="createOrder">Crear pedido</button>

</template>
