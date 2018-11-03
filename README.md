# EverLife.AI Token Sale Webb App

EverLife token sale web app.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
deploy /dist folder to the http server

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Build Configuration

|Variable               |Example Value|Description|
|-----------------------|-------------|-----------|
|CAPTCH_SITE_KEY        |6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI|Recapthca site key. (Generic dev key is shown as example.)|
|STELLAR_ENV            |development||
|IDM_PLUGIN_JS          |https://cd1st.identitymind.com/idm.min.js||
|IDM_PLUGIN_TOKEN       ||See `tools/getIdmAppToken.js` for how to authenticate and get the token.|
|STELLAR_TESTNET        |'true' or 'false' (String -> true is testnet - false is real network.|

### Using IdentityMind integration for local testing

The IDM plugin integration is locked against the hostname and port used for the application. For staging we use `stageapp.everlife.ai` as the hostname and 80 for the port. This means that to test the IDM integration in a development environment you need to have your webapp listen to port `80` and that you need to put `stageapp.everlife.ai` to refer to `127.0.0.1` during the tests. 
