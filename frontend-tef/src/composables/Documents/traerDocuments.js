import { ref } from 'vue'
import axios from 'axios'

export const traerDocuments= ()=> {

  const docs = ref([])
  const uploading = ref(false)
  const error = ref('')

  const llamarDocsAPI = async (url) => {
    error.value = ''
    const { data } = await axios.get(url)
    docs.value = data
  }

  /** const uploadPdf = async (file) => {
  const form = new FormData()
  form.append('file', file) // <-- clave

  const { data } = await axios.post('http://localhost:3000/documents', form)
  return data
}
 */
  const uploadPdf = async (file) => {
    error.value = ''
    if (!file) throw new Error('No seleccionaste archivo')
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      throw new Error('Solo PDF')
    }

    uploading.value = true
    try {
      const form = new FormData()
      form.append('file', file)

      const { data } = await axios.post('http://localhost:3000/documents', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return data
    } finally {
      uploading.value = false
    }
  }

  return { docs, uploading, error, llamarDocsAPI, uploadPdf }
}
