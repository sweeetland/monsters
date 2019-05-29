import * as fs from 'fs';
import * as path from 'path';

import {
    getUserInput,
    validateUserInput,
    formatData,
    setStartingLocations,
    unleashTheMonsters,
    getNextDestination,
    deleteRoutesToCity,
    unformatData,
} from './helpers';

const textFile = fs.readFileSync(path.join(__dirname, '../data/world_map_medium.txt'), 'utf8');
const rawDataByLines = textFile.split('\n');
const maxInput = rawDataByLines.length;
const userInput = getUserInput(maxInput);
const numberOfMonsters = validateUserInput(userInput, rawDataByLines.length);

console.log(`Starting the game with ${numberOfMonsters} monsters...`);

const mapWithoutMonsters = formatData(rawDataByLines);
const monsters = unleashTheMonsters(numberOfMonsters);

let map = setStartingLocations(mapWithoutMonsters, monsters);
let round = 0;

while (round < 1000) {
    let occupiedCities = map.filter(
        ({ monster, destinations }) => monster && destinations.length > 0
    );
    if (occupiedCities.length === 0) break;

    occupiedCities.forEach(currentCity => {
        let nextDestination = getNextDestination(currentCity.destinations);
        let nextCity = map.find(c => c.cityName === nextDestination);
        if (!nextCity) return;

        if (nextCity.monster) {
            // city already occupied by an existing monster
            console.log(
                `The City of ${nextCity.cityName} has been destroyed by ${
                    currentCity.monster
                } and ${nextCity.monster}!`
            );
            // destroy the city and routes to the city
            map.splice(map.indexOf(nextCity), 1);
            map = deleteRoutesToCity(map, nextCity.cityName);
        } else {
            // No conflict so just move monster
            nextCity.monster = currentCity.monster;
            currentCity.monster = '';
        }
    });
    round++;
}

const newData = unformatData(rawDataByLines, map);
fs.writeFileSync(path.join(__dirname, '../data/world_map_post_war.txt'), newData);

console.log('------------------------');
console.log('GAME OVER...');
console.log('------------------------');
console.log('You can see what is left of World X by going to data/world_map_post_war.txt');
console.log('------------------------');
console.log('YOU EVIL OVERLORD!!! 👹');
console.log('------------------------');
