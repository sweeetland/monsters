import { City } from "./helpers"

export default function battle(map: City[]): City[] {
	let round = 0
	while (round < 1000) {
		let occupiedCities = map.filter(
			({ monster, destinations }) => monster && destinations.length > 0
		)
		if (occupiedCities.length === 0) break

		occupiedCities.forEach(currentCity => {
			let nextDestination = getNextDestination(currentCity.destinations)
			let nextCity = map.find(c => c.cityName === nextDestination)
			if (!nextCity) return

			if (nextCity.monster) {
				// city already occupied by an existing monster
				console.log(
					`The City of ${nextCity.cityName} has been destroyed by ${currentCity.monster} and ${
						nextCity.monster
					}!`
				)
				// destroy the city and routes to the city
				map.splice(map.indexOf(nextCity), 1)
				map = deleteRoutesToCity(map, nextCity.cityName)
			} else {
				// No conflict so just move monster
				nextCity.monster = currentCity.monster
				currentCity.monster = ""
			}
		})
		round++
	}
	return map
}

function getNextDestination(destinations: string[]): string {
	return destinations[Math.floor(Math.random() * destinations.length)]
}

function deleteRoutesToCity(cities: City[], destroyedCity: string): City[] {
	cities.forEach(city => {
		if (city.destinations.includes(destroyedCity)) {
			let updatedDestinations = city.destinations.filter(dest => dest !== destroyedCity)
			city.destinations = updatedDestinations
		}
	})
	return cities
}
