import logo from './logo.svg';
import './App.css';
import WhitewaterMap from "./components/WhitewaterMap.js";
import Geofences from "./components/Geofences.js";
import React, {useState, useLayoutEffect} from 'react';

const defaultCoords = 
{
  lat: 42.834328023799245, 
  lng: -88.73215564949541
}


function App() {

  const [keyboardMode, setKeyboardMode] = useState(false)

  const [coords, setCoords] = useState(defaultCoords)

  useLayoutEffect(() => {
    console.log("Calling useLayoutEffect with keyboardMode", keyboardMode);
    if (!keyboardMode){
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

    }
    else {
      setCoords(defaultCoords);
      const handleKeyPress = ({keyCode}) => {

        //const difConstant = 0.00000000000001;
        const difConstant = 0.000005;
        console.log("Calling handleKeyPress with keyCode", keyCode)
        if (keyCode === 38){
          setCoords((prev) => {
            return {lng: prev.lng, lat: (prev.lat + difConstant)}
          })
        }
        if (keyCode === 40){
          setCoords((prev) => {
            return {lng: prev.lng, lat: (prev.lat - difConstant)}
          })
        }
        if (keyCode === 39){
          setCoords((prev) => {
            return {lng: (prev.lng + difConstant), lat: prev.lat}
          })
        }
        if (keyCode === 37){
          setCoords((prev) => {
            return {lng: (prev.lng - difConstant), lat: prev.lat}
          })
        }
      }

      document.addEventListener("keydown", handleKeyPress);

      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      }
    }
  }, [keyboardMode])

  return <>
    <WhitewaterMap coords={coords}/>
    <div className="d-flex justify-content-between m-2">
      <button className="btn btn-small btn-primary" onClick={() => setKeyboardMode(!keyboardMode)}>
        {keyboardMode ? "Switch to GPS Mode" : "Switch to Keyboard Mode"}
      </button>
      <p>Current coords: {coords.lat + "," + coords.lng}</p>
    </div>
    <Geofences coords={coords} />
  </>

  /*return <>
    <WhitewaterMap coords={coords}/>
    Current coords: {coords.lat + "," + coords.lng}
    <Geofences coords={coords} />
    
  </>;*/
}

export default App;
