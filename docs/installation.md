# How to install

1. Install [Node](https://nodejs.org/en/). We recommend downloading the LTS version (14.15.1 as of 12/12/2020).
1. Download this utility by clicking the green "Code" button [here](https://github.com/camtheperson/get-my-ps5), and then click "Download ZIP."
1. Unzip the contents by double clicking the ZIP file.
1. Next you'll need to open a CLI at the `get-my-ps5` folder:
    * Windows users: open the folder, type `cmd` in the address bar, and hit enter. [Still need help?](https://www.itechtics.com/open-command-window-folder/#:~:text=You%20can%20open%20a%20command,be%20opened%20in%20the%20folder.)
    * Mac users: right click the folder and select "New terminal at folder." (Note: [you'll likely need to set this up in your System Preferences](https://www.techrepublic.com/article/how-to-open-a-new-terminal-window-from-any-folder-shortcut/), but it will save you a lot of time)
1. Once you have the CLI open at the `get-my-ps5` folder, install the script by running:
    * `npm install`
1. Next, you'll want to start the script by running:
    * `npm run watch`
1. Choose which console you prefer (disc or digital).
1. Confirm whether you'd like the loud, annoying alarm to alert you when PlayStation 5 is back in stock.
1. Let it do it's thing. It will run continuously, and it open your browser as soon as it detects a queue forming.

Important note: if you're not using a VPN to mask your IP address (which we highly recommend), you may want to consider strategically limiting when and how long you let this script run. 

The longer you let this script run, the more likely Sony may notice you repeatedly pinging their website. And then they may ban your IP, which will prevent you from accessing the PlayStation Direct store.