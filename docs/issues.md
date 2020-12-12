# Troubleshooting / Common Issues

## Could not find browser revision 818858
```
Error: (node:31888) UnhandledPromiseRejectionWarning: Error: Could not find browser revision 818858. 
Run "PUPPETEER_PRODUCT=firefox npm install" or "PUPPETEER_PRODUCT=firefox yarn install" to download a supported Firefox browser binary.
```

To resolve this, issue the following command from inside the get-my-ps5 directory:
```npm i puppeteer```
