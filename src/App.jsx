import { useEffect, useRef, useState } from 'react'
import './assets/css/App.css'
import './assets/css/butonStyles.css'
import './assets/css/LocationCard.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'
import Pagination from '@mui/material/Pagination';




function App() {
  const locationId = getRandomNumber(126)
  const [ inputValue, setInputValue ] = useState(locationId)
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [ location, getLocation, hasError ] = useFetch(url)
  const [ page, setPage ] = useState(1)
  const [ totalResidents, setTotalResidents] = useState()
 


  


  useEffect(() => {
    getLocation()
  }, [inputValue])

  useEffect(() => {
    setTotalResidents(location?.residents.length)
  }, [])
  



  let startIndex = (page - 1) * 5; // Índice inicial del slice
  let endIndex = startIndex + 5; // Índice final del slice
  let residents = location?.residents.slice(startIndex, endIndex) || [];
  

   
  const inputLocation = useRef()
   
  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputLocation.current.value)
  }


  const handleChange = (e, value) => {
     e.preventDefault()
     setPage(value)

  }



  return (
    <div>
      <header className='api__header'>
          <div className='container__img'>
            <img src="/img/portada.jpg" alt="" />
          </div>
      </header>
    
      <form className='form__location' onSubmit={handleSubmit}>
        <div className='input-container'>
        <input className='input' ref={inputLocation} type='text' required/>
        
        <label className="label" htmlFor="input">Enter Number</label>
        <div className="topline"></div>
        <div className="underline"></div>
        </div>
        <button className='btn-search'>Search</button>
      </form> 
        {
          hasError
          ? <h2>❌Hey! you must provide an id form 1 to 126 🥺</h2>
          :  (
              <>
              <LocationCard
              location={location}
              />
              <div className='resident__container'>
                {
                  residents.map(url => (
                    <ResidentCard
                      key={url}
                      url={url}
                    />
                  ))  
                }
              </div>
            
                </>

             )
         }
         <Pagination count={parseInt(Math.ceil( totalResidents / 5))} page={page} onChange={handleChange}/>


     </div>
   
  )
}

export default App
