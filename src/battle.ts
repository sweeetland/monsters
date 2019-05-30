import { City, Destination } from "./helpers"

export default function battle(map: City[]): City[] {
	let round = 0
	while (round < 1000) {
		const occupiedCities = map.filter(
			({ monster, destinations }) => monster && Object.values(destinations).length > 0
		)
		if (occupiedCities.length === 0) break

		occupiedCities.forEach(currentCity => {
			const nextDestination = getNextDestination(currentCity.destinations)
			const nextCity = map.find(c => c.cityName === nextDestination)
			if (!nextCity) return

			if (nextCity.monster) {
				// city already occupied by an existing monster
				console.log(
					`The City of ${nextCity.cityName} has been destroyed by ${currentCity.monster} and ${
						nextCity.monster
					}!`
				)
				// destroy the city and routes to city
				map.splice(map.indexOf(nextCity), 1)
				map = deleteRoutesToCity(map, nextCity.cityName)
			} else {
				// no conflict so just move monster
				nextCity.monster = currentCity.monster
				currentCity.monster = ""
			}
		})
		round++
	}
	return map
}

function getNextDestination(destinations: Destination): string {
	return Object.values(destinations)[Math.floor(Math.random() * Object.values(destinations).length)]
}

function deleteRoutesToCity(cities: City[], destroyedCity: string): City[] {
	cities.forEach(city => {
		const direction = getKeyByValue(city.destinations, destroyedCity)
		if (direction) delete city.destinations[direction]
	})
	return cities
}

function getKeyByValue(object: Destination, value: string): string {
	return Object.keys(object).find(key => object[key] === value)
}
