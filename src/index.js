const promptly = require("promptly");
const puppeteer = require("puppeteer");

const {checkForPlaystationDirectRedirect, playAlarm, openUrl} = require("./utils");

/** Constants */
const playstationType = {
    disc: {
        id: 3005816,
        url: "https://direct-queue.playstation.com/?c=sonyied&e=psdirectprodku1&t=https%3A%2F%2Fdirect.playstation.com%2Fen-us%2Fconsoles%2Fconsole%2Fplaystation5-console.3005816&cv=1089561812&cid=en-US",
    },
    digital: {
        id: 3005817,
        url: "https://direct-queue.playstation.com/?c=sonyied&e=psdirectprodku1&t=https%3A%2F%2Fdirect.playstation.com%2Fen-us%2Fconsoles%2Fconsole%2Fplaystation5-digital-edition-console.3005817&cid=en-US",
    }
};

/** Let's do this */
(async function() {
    const choice = process.env.PS5_VERSION || await promptly.choose("Which version would you like? (disc or digital)", ["disc", "digital"]);
    const alarm = process.env.PLAY_ALARM || await promptly.confirm("Would you like to hear a loud, annoying alarm when we find your PS5? (Y or N)", ["y", "n"]);

    console.log(`Searching for PlayStation 5 ${choice} edition...`);
    const onSuccess = () => {
        console.log("Found it! Opening queue now...");
        openUrl(playstationType[choice].url);
        if (alarm) {
          playAlarm();
        }
    };
    checkForPlaystationDirectRedirect(process.env.CHECK_INTERVAL || 5000, onSuccess, playstationType[choice].id, await puppeteer.launch());
})();

// Gracefully exit
process.on('SIGINT', () => {
    process.exit();
});
