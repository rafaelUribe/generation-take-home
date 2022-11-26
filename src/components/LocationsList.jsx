import React, { useEffect, useState } from 'react'

const LocationsList = (props) => {

    const handleFavAdd = () => {
        const tempFav = [...props.favStores]
        const filterDuplicate = tempFav.filter( store => store.place_id === props.selectedStore.place_id)
        if(filterDuplicate.length > 0){
            alert(`The store ${props.selectedStore.name} is already in your favorites list`)
        } else {
            tempFav.push(props.selectedStore)
            props.setFavStores(tempFav)
            props.setFavMode(true)
        }
    }

  return (
    <div className='container-md mt-5'>
        <div className='row text-center justify-content-center'>
            <div className='col-md-3'>
                <h3>Select store</h3>

            </div>
            <div className='col-md-8'>
                <select 
                    name="" 
                    id="" 
                    className='w-100 mt-2'
                    onChange={e => props.setSelectedStore(JSON.parse(e.target.value))}
                >
                    {
                        props.storeLocations.length > 0 && props.storeLocations.map( loc => (
                            <option 
                                key={loc.address}
                                value={JSON.stringify(loc)} 
                            >
                                {loc.name}
                            </option>    
                        ))
                    }
                </select>
            </div>
            <div className='col-md-12 text-center mt-2'>
                    <h4>
                        {props.selectedStore? "Address" : ""}
                    </h4>
                    <p>
                        {props.selectedStore ? props.selectedStore.address: ""}
                    </p>
                    {   
                        props.selectedStore &&
                        <button 
                            className='btn btn-success'
                            onClick={handleFavAdd}
                        >
                            Add to favorites
                        </button>
                    }
            </div>
        </div>
    </div>
  )
}

export default LocationsList