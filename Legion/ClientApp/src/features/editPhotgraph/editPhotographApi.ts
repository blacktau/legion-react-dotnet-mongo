import { handleError } from 'app/apiCommon'
import Axios from 'axios'
import Photograph from 'types/Photograph'

const getPhotograph = async (photographId: string) => {
  try {
    const result = await Axios.get<Photograph>(`/api/photograph/${photographId}`)
    return result.data
  } catch (error) {
    return handleError(error)
  }
}

const savePhotograph = async (photograph: Photograph) => {
  try {
    const result = await Axios.patch<Photograph>(`photograph/${photograph.id}/`, photograph)
    return result.data
  } catch (error) {
    return handleError(error)
  }
}

export { getPhotograph, savePhotograph }
