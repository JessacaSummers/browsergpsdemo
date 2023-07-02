import React from "react"
import data from "./data.json"


export default function Geofences({coords}){

	return <div className="ml-4 w-100">
	    <p>Current coords: {coords.lat + "," + coords.lng}</p>

		{data.map(({id, name, location}, index) => {
			let isActive = (id === 5)

			return <div key={id} className="my-3 text-center">
				<h1 className={isActive ? "text-primary " : ""}>
					{isActive ? "**" : null}
					{name}
					{isActive ? "**" : null}
				</h1>
			</div>
		})};
	</div>
}