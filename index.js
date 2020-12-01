const axios = require('axios').default;
const open = require('open');

/** VARS */
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
function addToCartLoop(guid) {
    return new Promise(resolve => {
        axios.post(`https://api.direct.playstation.com/commercewebservices/ps-direct-us/users/anonymous/carts/${guid}/entries`, {
            "product": {
                "code": 3005816
            },
            "quantity": 1,
            "cartIdCreated": false,
            "findingMethod": "pdp",
        }).catch(onFailure => {
            console.log("No Playstation 5 consoles found. Trying again...");
            console.log(`Times run: ${numTries}`);
            numTries++;

            setTimeout(() => {
                addToCartLoop(guid);
            }, CHECK_INTERVAL);
        }).then(onSuccess => {
            resolve(onSuccess);
        });
    });
}

/** Let's do this */
(async function() {
    const guid = await getGuid();
    const cartResponse = await addToCartLoop(guid);

    if (cartResponse) {
        open("https://direct.playstation.com/en-us/consoles/console/playstation5-console.3005816");
    }
})();