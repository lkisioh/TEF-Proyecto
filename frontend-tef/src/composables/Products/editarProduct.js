import axios from 'axios'
import {ref} from 'vue'

export const editarProduct= ()=> {

  let product = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const editarProductoAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await axios.get(url)

    product.value= res.data
  }catch (error){
    console.error(`Error al buscar los productos: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    product,
    error,
    cargando,
    editarProductoAPI
}
}
