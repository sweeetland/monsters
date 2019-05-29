"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const unique_names_generator_1 = require("unique-names-generator");
const readline = __importStar(require("readline-sync"));
function getUserInput(maxInput) {
    console.log('Welcome to the monster game!! 👋');
    console.log('To start the game, please specify how many monsters 👾  you would like to start the game with?');
    console.log(`(Input must be an integer between 1 and ${maxInput})...`);
    return readline.question('👉   ');
}
exports.getUserInput = getUserInput;
function validateUserInput(userInput, maxInput) {
    userInput = Number(userInput);
    while (!userInput || userInput <= 0 || userInput > maxInput) {
        console.log(`Ooops that's an invalid input - 👎  please enter an an integer between 1 - ${maxInput}...`);
        userInput = readline.question('👉   ');
    }
    return Math.floor(userInput);
}
exports.validateUserInput = validateUserInput;
function formatData(rows) {
    let cities = [];
    rows.forEach(row => {
        let destinations = [];
        let splitRow = row.split(' ');
        let cityName = splitRow.shift();
        splitRow.forEach(direction => {
            let vals = direction.split('=');
            let destination = vals[1];
            destinations.push(destination);
        });
        cities = [...cities, { cityName, monster: '', destinations }];
    });
    cities.pop();
    return cities;
}
exports.formatData = formatData;
function unleashTheMonsters(num) {
    let monsters = [];
    for (let i = 0; i < num; i++) {
        monsters.push(unique_names_generator_1.uniqueNamesGenerator());
    }
    return monsters;
}
exports.unleashTheMonsters = unleashTheMonsters;
function setStartingLocations(cities, monsters) {
    monsters.forEach(monster => {
        cities[Math.floor(Math.random() * cities.length)].monster = monster;
    });
    return cities;
}
exports.setStartingLocations = setStartingLocations;
function getNextDestination(destinations) {
    return destinations[Math.floor(Math.random() * destinations.length)];
}
exports.getNextDestination = getNextDestination;
function deleteRoutesToCity(cities, destroyedCity) {
    cities.forEach(city => {
        if (city.destinations.includes(destroyedCity)) {
            let updatedDestinations = city.destinations.filter(dest => dest !== destroyedCity);
            city.destinations = updatedDestinations;
        }
    });
    return cities;
}
exports.deleteRoutesToCity = deleteRoutesToCity;
function unformatData(initialRows, cities) {
    // initialRows is the rawData pre war
    // cities is the remaining cities post war
    let newRows = [];
    initialRows.forEach(row => {
        let splitRow = row.split(' ');
        let cityName = splitRow.shift();
        cities.forEach(newCity => {
            // if the city hasn't been destroyed
            if (cityName === newCity.cityName) {
                let updatedDestinations = [];
                newCity.destinations.forEach(destination => {
                    updatedDestinations = splitRow.filter(direction => direction.includes(destination));
                });
                newRows.push(`${cityName} ` + updatedDestinations.join(' '));
            }
        });
    });
    // Return in the same format as the input file
    return newRows.join('\n');
}
exports.unformatData = unformatData;
