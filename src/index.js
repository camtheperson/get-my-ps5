const open = require("open");
const promptly = require("promptly");
const puppeteer = require("puppeteer");

const {watchWalmart, checkForPlaystationDirectRedirect, playAlarm} = require("./utils");

/** Constants */
const playstationType = {
    disc: {
        id: 3005816,
        url: "https://direct-queue.playstation.com/?c=sonyied&e=psdirectprodku1&t=https%3A%2F%2Fdirect.playstation.com%2Fen-us%2Fconsoles%2Fconsole%2Fplaystation5-console.3005816&cv=1089561812&cid=en-US",
        upc: "711719541028",
        walmartUrl: "https://affil.walmart.com/cart/buynow?items=363472942"
    },
    digital: {
        id: 3005817,
        url: "https://direct-queue.playstation.com/?c=sonyied&e=psdirectprodku1&t=https%3A%2F%2Fdirect.playstation.com%2Fen-us%2Fconsoles%2Fconsole%2Fplaystation5-digital-edition-console.3005817&cid=en-US",
        upc: "711719541035",
        walmartUrl: "https://affil.walmart.com/cart/buynow?items=493824815"
    }
};

/** Let's do this */
(async function() {
    const choice = await promptly.choose("Which version would you like? (disc or digital)", ["disc", "digital"]);
    const alarm = await promptly.choose("Would you like to hear a loud, annoying alarm when we find your PS5? (Y or N)", ["Y", "N", "y", "n"]);
    const storeId = await promptly.prompt("Enter your local Walmart store number.  If you're not sure, just leave this blank.", {default: "1"});
    console.log(`Searching for PlayStation 5 ${choice} edition...`);
    
    const onSuccess = () => {
        console.log("Found it! Opening queue now...");
        open(playstationType[choice].url);
        if (alarm.toUpperCase() === "Y") {
            playAlarm();
        }
    };

    const onWalmartSuccess = () => {
        console.log("Walmart in stock!  Opening add to cart link now...");
        open(playstationType[choice].walmartUrl);
        if (alarm.toUpperCase === "Y") {
            playAlarm();
        }
    }

    checkForPlaystationDirectRedirect(5000, onSuccess, playstationType[choice].id, await puppeteer.launch());
    watchWalmart(5000, onWalmartSuccess, playstationType[choice].upc, storeId);
})();

// Gracefully exit
process.on('SIGINT', () => {
    process.exit();
});
