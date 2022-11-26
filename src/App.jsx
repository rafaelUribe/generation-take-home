import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import stores from './data/store_directory.json'
import LocationsList from './components/LocationsList';
import formatAddress from './utils/formatAddress';
import StoreLocations from './components/StoreLocations';
import Toggler from './components/Toggler';
import Favorites from './components/Favorites';


function App() {

  const [storesData, setStoresData] = useState([]);

  const [storeLocations, setStoreLocations] = useState([]);

  const [selectedStore, setSelectedStore] = useState(null);

  const [selectedFav, setSelectedFav] = useState(null);

  const [favStores, setFavStores] = useState([])

  const [mapsURL, setMapsURL] = useState("")

  const [favMode, setFavMode] = useState(false);

  const [loading, setLoading] = useState(0);

  const APIKEY = "AIzaSyBc_DeOHpcrucKFgd6dlXkRkRJLMXq27Sw"

  const getStores = async () => {
    let resultObj = []
    try{
      for(let store of stores){
        const a = formatAddress(store.Address.toLowerCase())
        const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${a}&key=${APIKEY}`
        const p = await fetch(URL);
        const r = await p.json();
        const mainResult = await r.results[0]
        resultObj.push({...mainResult, name: store.Name})
      }
    } catch(e){
      console.log(e)
    }
    console.log(resultObj)
    setStoresData(resultObj)
  }

  const getLocations = () => {
    if(storeLocations.length < 1){
      let tempLocations = storesData
      .filter( store => store.geometry)
      .map( store => {
        return {
          name: store.name, 
          lat: store.geometry.location.lat || 0,
          lng: store.geometry.location.lng || 0,
          place_id: store.place_id,
          address: store.formatted_address,
        }
      })
      setStoreLocations(tempLocations)
    }
  }

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("locations"))
    if(localData === null){
      console.log("calling from")
      getStores()
    } else {
      setStoreLocations(localData)
    }
  }, []);

  useEffect(() => {
    if(storesData.length > 0){
      getLocations()
    }
  }, [storesData]);

  useEffect(() => {
    if(storeLocations.length > 0){
      localStorage.setItem("locations", JSON.stringify(storeLocations))  
    }
  }, [storeLocations]);

  useEffect(() => {
    if(selectedStore != null){
      const id = selectedStore.place_id
      const zoom = 15
      const url = `https://www.google.com/maps/embed/v1/place?&zoom=${zoom}&key=${APIKEY}&q=place_id:${id}`
      setMapsURL(url)
    }
  }, [selectedStore]);

  useEffect(() => {
    if(selectedFav != null){
      const id = selectedFav.place_id
      const zoom = 15
      const url = `https://www.google.com/maps/embed/v1/place?&zoom=${zoom}&key=${APIKEY}&q=place_id:${id}`
      setMapsURL(url)
    }
  }, [selectedFav]);
    
  useEffect(() => {
      const URLDEFAULT = `https://www.google.com/maps/embed/v1/place?&zoom=12&key=${APIKEY}&q=Ciudad+de+México`
      setMapsURL(URLDEFAULT)
  }, []);

  return (
    <div className="App container-fluid p-0">
        {
          storeLocations.length < 1 &&
          <div className='container-sm loader'>
            <div className='row text-center'>
              <div className='col-12'>
                <h3>
                  Loading... please wait
                </h3>
              </div>
              <div className='col-12'>
                <p>
                 Getting data from maps api
                </p>
              </div>
            </div>
          </div>    
        }
        {
          <Toggler favMode={favMode} setFavMode={setFavMode}/>
        }
        {

        }
        {
          !favMode && storeLocations.length > 0 &&
          <LocationsList 
            storeLocations={storeLocations} 
            selectedStore={selectedStore} 
            setSelectedStore={setSelectedStore}
            setFavMode={setFavMode}
            setFavStores={setFavStores}
            favStores={favStores}
            selectedFav={selectedFav}
            setSelectedFav={setSelectedFav}
          ></LocationsList>
        }
        {
          favMode && storeLocations.length > 0 &&
          <Favorites 
            favStores={favStores}
            setFavStores={setFavStores}
            mapsURL={mapsURL}
            setMapsURL={setMapsURL}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            selectedFav={selectedFav}
            setSelectedFav={setSelectedFav}
          ></Favorites>
        }
        {
          <StoreLocations 
            selectedStore={selectedStore}
            mapsURL={mapsURL}
            setMapsURL={setMapsURL}
          >

          </StoreLocations>
        }
    </div>
  );

}

export default App;
