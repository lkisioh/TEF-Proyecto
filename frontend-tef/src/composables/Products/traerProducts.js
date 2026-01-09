import axios from 'axios'
import {ref} from 'vue'

export const traerProducts= ()=> {

  let products = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const llamarProductosAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await axios.get(url)

    products.value= res.data
  }catch (error){
    console.error(`Error al buscar los productos: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    products,
    error,
    cargando,
    llamarProductosAPI
}
}
