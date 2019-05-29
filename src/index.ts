import * as fs from "fs"
import * as path from "path"

import battle from "./battle"
import {
	getUserInput,
	validateUserInput,
	formatData,
	setStartingLocations,
	unleashTheMonsters,
	unformatData
} from "./helpers"

// prepare for war
const textFile = fs.readFileSync(path.join(__dirname, "../data/world_map_medium.txt"), "utf8")
const rawDataByLines = textFile.split("\n")
const maxInput = rawDataByLines.length
const userInput = getUserInput(maxInput)
const numberOfMonsters = validateUserInput(userInput, maxInput)

// go to war
console.log(`Starting the game with ${numberOfMonsters} monsters...`)

const mapWithoutMonsters = formatData(rawDataByLines)
const monsters = unleashTheMonsters(numberOfMonsters)
const mapPreWar = setStartingLocations(mapWithoutMonsters, monsters)
const mapPostWar = battle(mapPreWar)

// write data to file
console.log("mapPostWar: ", mapPostWar)
const postWarData = unformatData(mapPostWar)
console.log("postWarData: ", postWarData)
fs.writeFileSync(path.join(__dirname, "../data/world_map_post_war.txt"), postWarData)

console.log("------------------------")
console.log("GAME OVER...")
console.log("------------------------")
console.log("You can see what is left of World X by going to data/world_map_post_war.txt")
console.log("------------------------")
console.log("YOU EVIL OVERLORD!!! 👹")
console.log("------------------------")
