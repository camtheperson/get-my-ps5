# Troubleshooting

If you don't see your issue listed below, please check our [Issues page](https://github.com/camtheperson/get-my-ps5/issues).

If you still don't see your issue listed, please [create a new issue](https://github.com/camtheperson/get-my-ps5/issues/new) with the following information:
1. Steps to replicate the issue
1. Any helpful screenshots (particularly if there are error messages)
1. Platform (Windows? Mac? Linux? What version?)
1. node version (run `node -v` in your CLI to check)
1. npm version (run `npm -v` in your CLI to check)

## Known issues
### Could not find browser revision 818858
```
Error: (node:31888) UnhandledPromiseRejectionWarning: Error: Could not find browser revision 818858. 
Run "PUPPETEER_PRODUCT=firefox npm install" or "PUPPETEER_PRODUCT=firefox yarn install" to download a supported Firefox browser binary.
```

To resolve this, issue the following command from inside the get-my-ps5 directory:
```
npm i puppeteer
```
