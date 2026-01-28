import axios from 'axios'
import {ref} from 'vue'

export const crearProductEnganche= ()=> {

  let createdProduct = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const crearProductosAPI= async(url, newProductEnganche)=>{
  try{
    cargando.value=true
    const res = await axios.post(url, newProductEnganche)

    createdProduct.value= res.data
  }catch (error){
    console.error(`Error al buscar los productos: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    createdProduct,
    error,
    cargando,
    crearProductosAPI
}
}
