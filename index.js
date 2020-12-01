const axios = require('axios').default;
const open = require('open');
const promptly = require('promptly');

/** VARS */
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
let numTries = 1;
const CHECK_INTERVAL = 10000; // How often should we check

/** getGuid 
 * Get unique identifier (guid) used in subsequent results
 * Makes us look like we're human
 * @return string
 */
function getGuid() {
    return new Promise((resolve, reject) => {
        axios.post("https://api.direct.playstation.com/commercewebservices/ps-direct-us/users/anonymous/carts?fields=BASIC")
            .then(res => {
                resolve(res.data.guid);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/** addToCartLoop 
 * Recursively tries to add the product to the cart
 * @return string
 */
function addToCartLoop(choice, guid) {
    return new Promise(resolve => {
        axios.post(`https://api.direct.playstation.com/commercewebservices/ps-direct-us/users/anonymous/carts/${guid}/entries`, {
            "product": {
                "code": playstationType[choice].id
            },
            "quantity": 1,
            "cartIdCreated": false,
            "findingMethod": "pdp",
        }).catch(onFailure => {
            console.log(`No Playstation 5 ${choice} edition consoles found. Trying again...`);
            console.log(`Times run: ${numTries}`);
            console.log("");
            numTries++;

            setTimeout(() => {
                addToCartLoop(choice, guid);
            }, CHECK_INTERVAL);
        }).then(onSuccess => {
            resolve(onSuccess);
        });
    });
}

/** Let's do this */
(async function() {
    const choice = await promptly.choose("Which version would you like? (disc or digital)", ["disc", "digital"]);
    const guid = await getGuid();
    const cartResponse = await addToCartLoop(choice, guid);

    if (cartResponse) {
        open(playstationType[choice].url);
    }
})();