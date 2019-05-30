import { uniqueNamesGenerator } from "unique-names-generator"
import * as readline from "readline-sync"

export interface City {
	cityName?: string
	monster?: string
	destinations: Destination
}
export interface Destination {
	north?: string
	east?: string
	south?: string
	west?: string
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
		let destinations: Destination = {}
		let splitRow = row.split(" ")
		const cityName = splitRow.shift()
		splitRow.forEach(direction => {
			const pairs = direction.split("=")
			const key = pairs[0]
			const value = pairs[1]
			destinations = { ...destinations, [key]: value }
		})
		cities = [...cities, { cityName, monster: "", destinations }]
	})
	cities.pop()
	return cities
}

export function unleashTheMonsters(num: number): string[] {
	const monsters: string[] = []
	for (let i = 0; i < num; i++) {
		monsters.push(uniqueNamesGenerator())
	}
	return monsters
}

export function setStartingLocations(cities: City[], monsters: string[]): City[] {
	monsters.forEach(monster => {
		cities[Math.floor(Math.random() * cities.length)].monster = monster
	})
	return cities
}

export function unformatData(cities: City[]): string {
	const rows: string[] = []
	cities.forEach(({ cityName, destinations }) => {
		let string = `${cityName} `
		for (let [key, value] of Object.entries(destinations)) {
			string += `${key}=${value} `
		}
		rows.push(string.trim())
	})
	return rows.join("\n")
}
