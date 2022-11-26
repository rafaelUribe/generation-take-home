import React from 'react'

const Favorites = (props) => {

    const handleFavRmv = () => {
        alert("removed from favorites")
        const tempFav = props.favStores.filter( store => store.place_id != props.selectedFav.place_id)
        props.setSelectedFav(null)
        props.setFavStores(tempFav)
    }

  return (
    <div className='container-md mt-5'>
        <div className='row text-center justify-content-center'>
            <div className='col-md-3'>
                {
                    props.favStores.length > 0 &&
                    <h3>Select favorite store</h3>
                }

            </div>
            <div className='col-md-8'>
                {
                    props.favStores.length > 0 &&
                    <select 
                        name="" 
                        id="" 
                        className='w-100 mt-2'
                        onChange={e => props.setSelectedFav(JSON.parse(e.target.value))}
                    >
                        {
                            props.selectedFav === null &&
                            <option value="">
                                select a store
                            </option>
                        }
                        {
                            props.favStores.map( loc => (
                                <option 
                                    key={loc.address}
                                    value={JSON.stringify(loc)} 
                                >
                                    {loc.name}
                                </option>    
                            ))
                        }
                    </select>
                }
                {
                    props.favStores.length < 1 &&
                    <p>There are no favorites yet</p>
                }
            </div>
            <div className='col-md-12 text-center mt-2'>
                    <h4>
                        {props.selectedFav? "Address" : ""}
                    </h4>
                    <p>
                        {props.selectedFav ? props.selectedFav.address: ""}
                    </p>
                    {   
                        props.selectedFav &&
                        <button 
                            className='btn btn-danger'
                            onClick={handleFavRmv}
                        >
                            Remove From Favorites
                        </button>
                    }
            </div>
        </div>
    </div>
  )
}

export default Favorites