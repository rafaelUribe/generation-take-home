import React, { useEffect, useState } from 'react'

const StoreLocations = (props) => {


  return (
    <div className='container-fluid mt-4 '>
        <div className='row'>
            <iframe
                src={props.mapsURL}
                allowFullScreen
                className='map container-fluid p-0'
            >
            </iframe>
        </div>
    </div>
  )
}

export default StoreLocations