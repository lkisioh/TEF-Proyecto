import axios from 'axios'
import {ref} from 'vue'

export const traerUsers= ()=> {

  let users = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const llamarUsuariosAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await axios.get(url)

    users.value= res.data
  }catch (error){
    console.error(`Error al buscar los productos: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    users,
    error,
    cargando,
    llamarUsuariosAPI
}
}
