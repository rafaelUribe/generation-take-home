import React, { useState, useCallback } from 'react'
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import SuperClusterAlgorithm from "../utils/superClusterAlgorithm";

const options = {
  zoom: 12,
  center: {
    lat: 19.42847,
    lng: -99.12766,
  },
};

const Map = (props) => {

  const [mapContainer, setMapContainer] = useState(null);
 
  const onLoad = useCallback(map => {
    addMarkers(map, props)
  }, [])
  
  return (
    <GoogleMapsProvider
      googleMapsAPIKey="AIzaSyBc_DeOHpcrucKFgd6dlXkRkRJLMXq27Sw"
      mapOptions={options}
      mapContainer={mapContainer}
      onLoadMap={onLoad}
    >
        <div ref={node => setMapContainer(node)} className="map"/>
    </GoogleMapsProvider>
  )
}

function addMarkers(map, props){

  const infoWindow = new window.google.maps.InfoWindow();

  const markers = props.storeLocations.map(({name, lat, lng}) => {
    const marker = new window.google.maps.Marker({position: {lat, lng}});

    marker.addListener("click", () => {
      infoWindow.setPosition({lat, lng});
      infoWindow.setContent(`
        <div class='info-window'>
          <h2>${name}</h2>
          <button class="btn-success">Añadir a favoritos</button>
        </div>
      `);

      infoWindow.open({map})
    })

    return marker
  })


  new MarkerClusterer({
    markers,
    map,
    algorithm: new SuperClusterAlgorithm({radius: 200}),
  })
}


export default Map