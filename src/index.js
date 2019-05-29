"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const helpers_1 = require("./helpers");
const textFile = fs.readFileSync(path.join(__dirname, '../data/world_map_medium.txt'), 'utf8');
const rawDataByLines = textFile.split('\n');
const maxInput = rawDataByLines.length;
const userInput = helpers_1.getUserInput(maxInput);
const numberOfMonsters = helpers_1.validateUserInput(userInput, rawDataByLines.length);
console.log(`Starting the game with ${numberOfMonsters} monsters...`);
const mapWithoutMonsters = helpers_1.formatData(rawDataByLines);
const monsters = helpers_1.unleashTheMonsters(numberOfMonsters);
let map = helpers_1.setStartingLocations(mapWithoutMonsters, monsters);
let round = 0;
while (round < 1000) {
    let occupiedCities = map.filter(({ monster, destinations }) => monster && destinations.length > 0);
    if (occupiedCities.length === 0)
        break;
    occupiedCities.forEach(currentCity => {
        let nextDestination = helpers_1.getNextDestination(currentCity.destinations);
        let nextCity = map.find(c => c.cityName === nextDestination);
        if (!nextCity)
            return;
        // city already occupied by an existing monster
        if (nextCity.monster) {
            console.log(`The City of ${nextCity.cityName} has been destroyed by ${currentCity.monster} and ${nextCity.monster}!`);
            // destroy the city and routes to the city
            map.splice(map.indexOf(nextCity), 1);
            map = helpers_1.deleteRoutesToCity(map, nextCity.cityName);
        }
        else {
            // No conflict
            nextCity.monster = currentCity.monster;
            currentCity.monster = '';
        }
    });
    round++;
}
const newData = helpers_1.unformatData(rawDataByLines, map);
fs.writeFileSync(path.join(__dirname, '../data/world_map_post_war.txt'), newData);
console.log('------------------------');
console.log('GAME OVER...');
console.log('------------------------');
console.log('You can see what is left of World X by going to data/world_map_post_war.txt');
console.log('------------------------');
console.log('YOU EVIL OVERLORD!!! 👹');
console.log('------------------------');
