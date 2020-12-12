const open = require("open");
const promptly = require("promptly");
const puppeteer = require("puppeteer");

const {checkForPlaystationDirectRedirect, playAlarm} = require("./utils");

/** Constants */
const playstationType = {
    disc: {
        id: 3005816,
        url: "https://direct.playstation.com/en-us/consoles/console/playstation5-console.3005816",
    },
    digital: {
        id: 3005817,
        url: "https://direct.playstation.com/en-us/consoles/console/playstation5-digital-edition-console.3005817",
    }
};

/** Let's do this */
(async function() {
    const choice = await promptly.choose("Which version would you like? (disc or digital)", ["disc", "digital"]);
    const alarm = await promptly.choose("Would you like to hear a loud, annoying alarm when we find your PS5? (Y or N)", ["Y", "N"])
    console.log(`Searching for PlayStation 5 ${choice} edition...`);
    
    const onSuccess = () => {
        console.log("Found it! Opening queue now...");
        if (alarm.toUpperCase() === "Y") {
            playAlarm();
        }
        open(playstationType[choice].url);
    };
    checkForPlaystationDirectRedirect(5000, onSuccess, playstationType[choice].id, await puppeteer.launch());
})();
