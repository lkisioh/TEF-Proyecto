import axios from 'axios'
import {ref} from 'vue'

export const traerHojass= ()=> {

  let hojas = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const llamarHojasAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await axios.get(url)

    hojas.value= res.data
  }catch (error){
    console.error(`Error al buscar las hojas: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    hojas,
    error,
    cargando,
    llamarHojasAPI
}
}
