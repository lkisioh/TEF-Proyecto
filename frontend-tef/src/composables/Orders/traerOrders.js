import axios from 'axios'
import {ref} from 'vue'

export const traerOrders= ()=> {

  let orders = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const llamarOrdenesAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await axios.get(url)

    orders.value= res.data
  }catch (error){
    console.error(`Error al buscar los productos: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    orders,
    error,
    cargando,
    llamarOrdenesAPI
}
}
