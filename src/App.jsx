import { useEffect, useRef, useState } from 'react'
import './assets/css/App.css'
import './assets/css/butonStyles.css'
import './assets/css/LocationCard.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'


function App() {
  const locationId = getRandomNumber(126)
  const [ inputValue, setInputValue ] = useState(locationId)
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [ location, getLocation, hasError ] = useFetch(url)
  const [ currentPage, setCurrentPage ] = useState(1)
 


  


  useEffect(() => {
    getLocation()
  }, [inputValue])

   

  const inputLocation = useRef()
   
  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputLocation.current.value)
  }



  return (
    <div>
      <header className='api__header'>
          <div className='container__img'>
            <img src="public/img/portada.jpg" alt="" />
          </div>
      </header>
    
      <form className='form__location' onSubmit={handleSubmit}>
        <div className='input-container'>
        <input className='input' ref={inputLocation} type='text' required/>
        
        <label className="label" htmlFor="input">Enter Number</label>
        <div className="topline"></div>
        <div className="underline"></div>
        </div>
        <button>Search</button>
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
                  location?.residents.map(url => (
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


     </div>
   
  )
}

export default App
