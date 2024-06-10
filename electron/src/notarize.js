require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;  
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  if (process.env.MYCLARITY_OSX_NOTARIZE != "true" &&
      process.env.CI_COMMIT_BRANCH != "master" && 
      process.env.CI_COMMIT_BRANCH != "staging") {
    return;
  }

  return await notarize({
    appBundleId: 'io.myclarity.app',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
  });
};