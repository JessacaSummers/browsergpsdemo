import logo from './logo.svg';
import './App.css';
import WhitewaterMap from "./components/WhitewaterMap.js";
import Geofences from "./components/Geofences.js";
import React, {useState, useLayoutEffect} from 'react';

function App() {

  let [coords, setCoords] = useState({
      lat: 42,//.834328023799245, 
      lng: -88//.73215564949541
    })

  useLayoutEffect(() => {
    let watcher = navigator.geolocation.watchPosition(
      //success
      (pos) => {
        console.log("Watcher position:", pos)
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      },
      //Error
      () => {
        alert("Geolocation error :(")
      },
      //Options
      {
        enableHighAccuracy: true,
        //timeout: 1000,
        maximumAge: 0
      }
    )

    return () => {
      navigator.geolocation.clearWatch(watcher);
    }

  }, [])

  return <>
    <WhitewaterMap coords={coords}/>
    <Geofences coords={coords} />
  </>

  /*return <>
    <WhitewaterMap coords={coords}/>
    Current coords: {coords.lat + "," + coords.lng}
    <Geofences coords={coords} />
    
  </>;*/
}

export default App;
