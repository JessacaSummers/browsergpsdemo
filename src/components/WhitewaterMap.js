import React, {useState, useEffect, useCallback, useRef, Fragment} from 'react';
import { GoogleMap, useJsApiLoader, useLoadScript, MarkerF } from '@react-google-maps/api';

export default function WhitewaterMap ({coords}){

	//const [map, setMap] = React.useState(null);

	const { isLoaded, loadError } = useLoadScript({
	    id: 'google-map-script',
	    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
	})

	const mapRef = useRef();
  	const onMapLoad = useCallback((map) => {
    	mapRef.current = map;
  	}, []);

  useEffect(() => {
  	console.log("WhitewaterMap coords update:", coords);
  }, [coords])

	/*useEffect(() => {

		return () => {
			setMap(null)
		}
	}, [])

	useEffect(() => {
		const bounds = new window.google.maps.LatLngBounds(coords);
	    map.fitBounds(bounds);
	    setMap(map)
	}, [JSON.stringify(coords)])

	console.log("Map coords:", coords);*/

  return (
      isLoaded ? <GoogleMap
      	mapContainerStyle={{ height: '35vh', width: '100%' }}
        center={coords}
        zoom={20}
        center={coords}
        onLoad={onMapLoad}
        options={{
        	//disableDefaultUI: true,
        	//zoomControl: true
        }}
      >
      	<MarkerF
            position={coords}
        />
      </GoogleMap> : null
  );
}