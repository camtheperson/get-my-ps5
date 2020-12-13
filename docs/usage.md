# How to use

## Searching for your PlayStation 5

1. Make sure you are logged into the [PlayStation Direct store](https://direct.playstation.com/en-us/hardware) prior to using this tool. Also make sure you have a payment method, and shipping and billing addresses configured within your PSN account.

2. From the root directory, enter the following command in Terminal (or whatever CLI you use):
```
npm run watch
```
3. You will be prompted which version (disc or digital) you would like to search for.

4. You will be prompted if you'd like a loud, annoying alarm sound to play (more details on testing this below). If you are using linux, you'll need to have VLC installed to hear the alarm. Check your system for the binary `which nvlc`.

5. Let it run in the background. Your browser will open up and direct you to the PlayStation Direct store as soon as stock is available.

**Important note:**
If you're not using a VPN to mask your IP address (which we highly recommend), you may want to consider strategically limiting how long you let this script run. 

The longer you let this script run, the more likely Sony may notice you repeatedly pinging their website. And then they may ban your IP, which will prevent you from accessing the PlayStation Direct store.


## Other commands
Test opening your browser:
```
npm run open
```
Test the alarm:
```
npm run sound
```
Note: Linux users will need VLC for this to work.