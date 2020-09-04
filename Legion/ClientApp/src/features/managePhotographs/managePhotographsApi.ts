import Photograph from 'types/Photograph'

import Axios from 'axios'
import { RequestError } from 'types/RequestError'

const handleErrors = (error: any) => {
  const requestError = new RequestError(
    error.response ? error.response.status : -1,
    error.message,
    error.response ? error.response.statusText : 'Unknown Error'
  )

  throw requestError
}

const getAllPhotographs = async () => {
  try {
    const result = await Axios.get('/api/photograph/')
    return result.data
  } catch (error) {
    return handleErrors(error)
  }
}

const publishPhotograph = async (photograph: Photograph) => {
  try {
    const result = await Axios.patch(`/api/photograph/${photograph.id}/publish`)
    return result.data
  } catch (error) {
    return handleErrors(error)
  }
}

const retractPhotograph = async (photograph: Photograph) => {
  try {
    const result = await Axios.patch(`/api/photograph/${photograph.id}/retract`)
    return result.data
  } catch (error) {
    return handleErrors(error)
  }
}

const savePhotograph = async (photograph: Photograph) => {
  try {
    return await Axios.patch<Photograph, Photograph>(`/api/photograph/${photograph.id}/`, photograph)
  } catch (error) {
    return handleErrors(error)
  }
}

export { publishPhotograph, getAllPhotographs, retractPhotograph, savePhotograph }
