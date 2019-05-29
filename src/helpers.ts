import { uniqueNamesGenerator } from "unique-names-generator"
import * as readline from "readline-sync"

export interface City {
	cityName?: string
	monster?: string
	destinations: string[]
}

export function getUserInput(maxInput: number): string {
	console.log("Welcome to the monster game!! 👋")
	console.log(
		"To start the game, please specify how many monsters 👾  you would like to start the game with?"
	)
	console.log(`(Input must be an integer between 1 and ${maxInput})...`)

	return readline.question("👉   ")
}

export function validateUserInput(userInput: string | number, maxInput: number): number {
	userInput = Number(userInput)
	while (!userInput || userInput <= 0 || userInput > maxInput) {
		console.log(
			`Ooops that's an invalid input - 👎  please enter an an integer between 1 - ${maxInput}...`
		)
		console.log("To quit Monster game press crtl + c")
		userInput = Number(readline.question("👉   "))
	}
	return Math.floor(userInput) as number
}

export function formatData(rows: string[]): City[] {
	let cities: City[] = []
	rows.forEach(row => {
		let destinations: string[] = []
		let splitRow = row.split(" ")
		let cityName = splitRow.shift()
		splitRow.forEach(direction => {
			let vals = direction.split("=")
			let destination = vals[1]
			destinations.push(destination)
		})
		cities = [...cities, { cityName, monster: "", destinations }]
	})
	cities.pop()
	return cities
}

export function unleashTheMonsters(num: number): string[] {
	let monsters: string[] = []
	for (let i = 0; i < num; i++) {
		monsters.push(uniqueNamesGenerator())
	}
	return monsters
}

export function setStartingLocations(cities, monsters): City[] {
	monsters.forEach(monster => {
		cities[Math.floor(Math.random() * cities.length)].monster = monster
	})
	return cities
}

export function getNextDestination(destinations: string[]): string {
	return destinations[Math.floor(Math.random() * destinations.length)]
}

export function deleteRoutesToCity(cities: City[], destroyedCity: string): City[] {
	cities.forEach(city => {
		if (city.destinations.includes(destroyedCity)) {
			let updatedDestinations = city.destinations.filter(dest => dest !== destroyedCity)
			city.destinations = updatedDestinations
		}
	})
	return cities
}

export function unformatData(initialRows: string[], cities: City[]): string {
	// initialRows is the rawData pre war
	// cities is the remaining cities post war
	let newRows: string[] = []
	initialRows.forEach(row => {
		let splitRow = row.split(" ")
		let cityName = splitRow.shift()
		cities.forEach(newCity => {
			if (cityName === newCity.cityName) {
				// the city hasn't been destroyed
				// get remaining destinations
				let updatedDestinations: string[] = []
				newCity.destinations.forEach(destination => {
					updatedDestinations = splitRow.filter(direction => direction.includes(destination))
				})
				newRows.push(`${cityName} ` + updatedDestinations.join(" "))
			}
		})
	})
	// Return in the same format as the input file
	return newRows.join("\n")
}
