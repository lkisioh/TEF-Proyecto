import axios from 'axios'
import {ref} from 'vue'

export const crearPedido= ()=> {

  let createdPedido = ref({})
  const mistake = ref(null)
  const cargando = ref(false)

  const crearPedidoAPI= async(url, newPedido)=>{
  try{
    cargando.value=true
    console.log('payload', JSON.stringify(newPedido, null, 2))

    const res = await axios.post(url, newPedido)

    createdPedido.value= res.data
    return createdPedido.value
  }catch (error){
    mistake.value = error.response?.data?.message || error.message
    console.log('error full', error)
    console.log('error data', error?.response?.data)
    console.error(`Error al crear pedido: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    createdPedido,
    mistake,
    cargando,
    crearPedidoAPI
}
}
