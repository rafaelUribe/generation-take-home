import React from 'react'

const Toggler = (props) => {
  return (
    <div className='container-fluid text-center'>
        {
            props.favMode &&
            <div className='row'>

                <div 
                    className='col-6 p-3 border border-light cursor-pointer'
                    onClick={e => props.setFavMode(false)}
                >
                    Directory
                </div>
                <div className='col-6 bg-light p-3 text-black '>
                    Favorites
                </div>
            </div>
        }
        {
            !props.favMode &&
            <div className='row text-center'>
                <div className='col-6 bg-light p-3 text-black '>
                    Directory
                </div>
                <div 
                    className='col-6 p-3 border border-light cursor-pointer'
                    onClick={e => props.setFavMode(true)}
                >
                    Favorites
                </div>
            </div>
        }
    </div>
  )
}

export default Toggler