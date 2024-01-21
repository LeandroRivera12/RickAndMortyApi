import { useState } from "react"

const LocationCard = ({ location }) => {

  const [residents, setResidents] = useState([])
  
 
  
  return (
    <article className="location__body">
        <h2 className="location__title">{location?.name}</h2>
        <ul className="location__list">
            <li className="location_item"><span className="location__key">Type:</span><span className="location__value">{location?.type}</span></li>
            <li className="location_item"><span className="location__key">Dimension:</span><span className="location__value">{location?.dimension}</span></li>
            <li className="location_item"><span className="location__key">Population:</span><span className="location__value">{location?.residents.length}</span></li>
        </ul>
    </article>
  )
}

export default LocationCard