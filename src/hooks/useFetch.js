import axios from 'axios'
import { useState } from 'react'


const useFetch = (url) => {
  const [ response, setResponse] = useState()
  const [ hasError, setHasError] = useState()

  const getApi = () => {
    axios.get(url)
    .then(res => {
        setHasError(false)
        setResponse(res.data)
    })
    .catch(err =>{ 
        console.log(err)
        setHasError(true)    
    })
  }

  return [ response, getApi, hasError ]
}

export default useFetch