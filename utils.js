const axios = require('axios').default;

/** addToCartLoop 
 * Recursively tries to add a product to the cart
 * @return string
 */
function addToCartLoop(id, guid, numTries, checkInterval = 10000) {
    return new Promise(resolve => {
        axios.post(`https://api.direct.playstation.com/commercewebservices/ps-direct-us/users/anonymous/carts/${guid}/entries`, {
            "product": {
                "code": id
            },
            "quantity": 1,
            "cartIdCreated": false,
            "findingMethod": "pdp",
        }).catch(onFailure => {
            console.log(`Could not add product to cart. Trying again...`);
            console.log(`Times run: ${numTries}`);
            console.log("");
            numTries++;

            setTimeout(() => {
                addToCartLoop(id, guid, numTries);
            }, checkInterval);
        }).then(onSuccess => {
            if (onSuccess) {
                console.log("Product successfully added to cart!", onSuccess);
                resolve(onSuccess);
            }
        });
    });
}

/** checkForPlaystationDirectRedirect
 * Recursively checks for redirects.
 * @param checkInterval - How often to check in ms
 * @param onSuccess - Callback function for successful redirect
 */
async function checkForPlaystationDirectRedirect(checkInterval, onSuccess, version, browser, numTries = 1) {
    // Create a new incognito session each request to clear cookies and cache
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    const url = `https://direct.playstation.com/en-us/consoles/console/playstation5-console.${version}`;
    const response = await page.goto(url);
    const responseBody = await response.text();
    const responseStatus = await response.status();

    console.log(`Response status: ${responseStatus}`);

    // Uncomment to see the response body for debugging
    // console.log(`Response body: ${responseBody}`);

    if (responseBody.indexOf("queue-it_log") > 0 && 
        responseBody.indexOf("softblock") === -1) {
        onSuccess();
    } else {
        setTimeout(() => {
            console.log("No redirect detected. Trying again...");
            console.log("Number of tries", numTries);
            console.log("");
            numTries++;

            checkForPlaystationDirectRedirect(checkInterval, onSuccess, version, browser, numTries);
        }, checkInterval);
    }
}


/** getGuid 
 * Get unique identifier (guid) used in subsequent results
 * Makes us look like we're human
 * @return string
 */
async function getGuid() {
    const response = await axios.post("https://api.direct.playstation.com/commercewebservices/ps-direct-us/users/anonymous/carts?fields=BASIC")
    return response.data.guid;
}

module.exports = {
    addToCartLoop,
    checkForPlaystationDirectRedirect,
    getGuid,
}