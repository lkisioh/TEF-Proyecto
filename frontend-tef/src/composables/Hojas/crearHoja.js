import axios from 'axios'
import {ref} from 'vue'

export const crearHojas= ()=> {

  let createdHoja = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const crearHojaAPI= async(url, newHoja)=>{
  try{
    cargando.value=true
    const res = await axios.post(url, newHoja)

    createdHoja.value= res.data
  }catch (error){
    console.error(`Error al crear hoja: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    createdHoja,
    error,
    cargando,
    crearHojaAPI
}
}
