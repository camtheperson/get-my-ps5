const open = require('open');
const promptly = require('promptly');

const {addToCartLoop, getGuid} = require("./utils");

/** Constants */
let numTries = 1;
const playstationType = {
    "disc": {
        "id": 3005816,
        "url": "https://direct.playstation.com/en-us/consoles/console/playstation5-console.3005816",
    },
    "digital": {
        "id": 3005817,
        "url": "https://direct.playstation.com/en-us/consoles/console/playstation5-digital-edition-console.3005817",
    }
};

/** Let's do this */
(async function() {
    const choice = await promptly.choose("Which version would you like? (disc or digital)", ["disc", "digital"]);
    console.log(`Searching for PlayStation 5 ${choice} edition...`);
    const guid = await getGuid();
    const cartResponse = await addToCartLoop(playstationType[choice].id, guid, numTries);

    if (cartResponse) {
        open(playstationType[choice].url);
    }
})();
