import React from "react"
import data from "./data.json"


export default function Geofences({coords}){

	const crowFliesDistance = (coords, location) => {
		//console.log("Crow flies distance params, coords:", coords, "location", location)

		let lat1 = coords.lat;
		let lon1 = coords.lng;
		let lat2 = location.lat;
		let lon2 = location.lng;

		let R = 6371; // km
		let dLat = toRad(lat2-lat1);
		let dLon = toRad(lon2-lon1);
		lat1 = toRad(lat1);
		lat2 = toRad(lat2);

		let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		let d = R * c;

		return (d * 1093.6132983);
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }


	return <div className="ml-4 w-100 text-center">

		{data.map(({id, name, location}, index) => {

			let distance = crowFliesDistance(coords, location);
			let isActive = (distance <= 5)

			return <div key={id} className="my-3 text-center">
				<h1 className={isActive ? "text-primary " : ""}>
					{isActive ? "**" : null}
					{name}
					{isActive ? "**" : null}
				</h1>
				<p>{distance.toFixed(3).toLocaleString()} yards away</p>
			</div>
		})}
	    <small>All distances are "as the crow flies" straight line distances, and do not take route information like roads and sidewalks into account.</small>
	</div>
}