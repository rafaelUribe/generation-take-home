import React from 'react'

const MapService = () => {

  const key = "AIzaSyBc_DeOHpcrucKFgd6dlXkRkRJLMXq27Sw"

  const demolat = 47.618164194 
  const demolng = -122.350665264

  return (
    <div className='container-sm'>
        <div className='row'>
            <iframe
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${key}
                    &q=Space+Needle,Seattle+WA`}
            >
            </iframe>   
        </div>
    </div>
  )
}

export default MapService