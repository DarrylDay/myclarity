require('dotenv').config();
const { exec } = require("child_process");
const yargs = require('yargs');
const fs = require('fs');

const argv = yargs
  .option('env', {
    alias: 'e',
    description: 'Set environment',
    choices: ['local', 'dev', 'staging', 'prod']
  })
  .option('layout', {
    alias: 'l',
    description: 'Set layout',
    choices: ['mobile', 'desktop', 'both']
  })
  .help()
  .alias('help', 'h').argv;

const GENERATED_DIR="src/generated"
const CONFIG_FILE=GENERATED_DIR+"/Config.ts"
const CONFIG_PROD_FILE="config/env_prod.ts"
const CONFIG_STAGING_FILE="config/env_staging.ts"
const CONFIG_DEV_FILE="config/env_dev.ts"
const CONFIG_LOCAL_FILE="config/env_local.ts"

const GOOGLE_SERVICE_ANDROID="android/app/google-services.json"
const GOOGLE_SERVICE_ANDROID_DEV="config/google-services-dev.json"
const GOOGLE_SERVICE_ANDROID_STAGING="config/google-services-staging.json"

const GOOGLE_SERVICE_IOS="ios/App/App/GoogleService-Info.plist"
const GOOGLE_SERVICE_IOS_DEV="config/GoogleService-Info-dev.plist"
const GOOGLE_SERVICE_IOS_STAGING="config/GoogleService-Info-staging.plist"

const env = argv.env ? argv.env : process.env.MYCLARITY_ENV ? process.env.MYCLARITY_ENV : "prod";

if (!fs.existsSync(GENERATED_DIR)){
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
}

if (env == "local") {
    fs.copyFile(CONFIG_LOCAL_FILE, CONFIG_FILE, (err) => {
        if (err) throw err;
      });
}
else if (env == "dev") {
    fs.copyFile(CONFIG_DEV_FILE, CONFIG_FILE, (err) => {
        if (err) throw err;
      });
    fs.copyFile(GOOGLE_SERVICE_ANDROID_DEV, GOOGLE_SERVICE_ANDROID, (err) => {
        if (err) throw err;
    });
    fs.copyFile(GOOGLE_SERVICE_IOS_DEV, GOOGLE_SERVICE_IOS, (err) => {
        if (err) throw err;
    });
}
else if (env == "staging") {
    fs.copyFile(CONFIG_STAGING_FILE, CONFIG_FILE, (err) => {
        if (err) throw err;
      });
    fs.copyFile(GOOGLE_SERVICE_ANDROID_STAGING, GOOGLE_SERVICE_ANDROID, (err) => {
        if (err) throw err;
    });
    fs.copyFile(GOOGLE_SERVICE_IOS_STAGING, GOOGLE_SERVICE_IOS, (err) => {
        if (err) throw err;
    });
}
else {
    fs.copyFile(CONFIG_PROD_FILE, CONFIG_FILE, (err) => {
        if (err) throw err;
      });
}

const APP_FILE=GENERATED_DIR+"/App.tsx"
const APP_MOBILE_FILE="config/layout_mobile.tsx"
const APP_DESKTOP_FILE="config/layout_desktop.tsx"
const APP_BOTH_FILE="config/layout_both.tsx"

if (process.env.MYCLARITY_LAYOUT && process.env.MYCLARITY_LAYOUT == "mobile") {
    fs.copyFile(APP_MOBILE_FILE, APP_FILE, (err) => {
        if (err) throw err;
      });
}
else if (process.env.MYCLARITY_LAYOUT && process.env.MYCLARITY_LAYOUT == "desktop") {
    fs.copyFile(APP_DESKTOP_FILE, APP_FILE, (err) => {
        if (err) throw err;
      });
}
else {
    fs.copyFile(APP_BOTH_FILE, APP_FILE, (err) => {
        if (err) throw err;
      });
}