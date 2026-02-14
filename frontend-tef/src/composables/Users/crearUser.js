import axios from 'axios'
import {ref} from 'vue'

export const crearUser= ()=> {

  let createdUser = ref({})
  const mistake = ref(null)
  const cargando = ref(false)

  const crearUserAPI= async(url, newUser)=>{
  try{
    cargando.value=true
    console.log('payload', JSON.stringify(newUser, null, 2))

    const res = await axios.post(url, newUser)

    createdUser.value= res.data
    return createdUser.value
  }catch (error){
    mistake.value = error.response?.data?.message || error.message
    console.log('error full', error)
    console.log('error data', error?.response?.data)
    console.error(`Error al crear usuario: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    createdUser,
    mistake,
    cargando,
    crearUserAPI
}
}
