<script setup>
import { ref, onMounted } from 'vue'
import { traerDocuments } from '@/composables/Documents/traerDocuments'

const { docs, uploading, error, llamarDocsAPI, uploadPdf } = traerDocuments()

const selectedDocUuid = ref('')    // el doc elegido
const selectedFile = ref(null)   // archivo a subir

onMounted(async () => {
  await llamarDocsAPI('http://localhost:3000/documents')
})


const onFileChange = (e) => {
  selectedFile.value = e.target.files?.[0] ?? null
}

const onUploadClick = async () => {
  try {
    const created = await uploadPdf(selectedFile.value)
    // auto-seleccionar el nuevo doc
    selectedDocUuid.value = created.uuid ?? created.id
    selectedFile.value = null
  } catch (err) {
    // si querés mostrar el mensaje
    console.error(err)
  }
}
</script>
<template>
  <h1>ARCHIVOS</h1>

  <!-- nuevo -->

  <div style="margin-bottom:12px;">
    <label>Subir nuevo PDF:</label><br />
    <input type="file" accept="application/pdf" @change="onFileChange" />
    <button type="button" :disabled="uploading || !selectedFile" @click="onUploadClick">
      {{ uploading ? 'Subiendo...' : 'Subir' }}
    </button>
  </div>

  <p v-if="error" style="color:red;">{{ error }}</p>

  <div v-if="docs.length === 0">
    <h4>No hay documentos subidos.</h4>
  </div>

  <div v-else>
    <label for="docSelect">Seleccionar documento:</label><br />
    <select id="docSelect" v-model="selectedDocUuid">
      <option value="" disabled>-- Seleccione un documento --</option>
      <option v-for="doc in docs" :key="doc.uuid" :value="doc.uuid || doc.uuidid">
        {{ doc.fileName }} - ({{ new Date(doc.createdAt).toLocaleDateString() }})
      </option>
    </select>

    <button><a :href="`http://localhost:3000/documents/${selectedDocUuid}`" target="_blank">Ver PDF</a></button>
  </div>

</template>
