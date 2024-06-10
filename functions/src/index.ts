import * as functions from "firebase-functions";
import UserProfile from "../../src/models/UserProfile";
import { getRandomAvatar } from "../../src/utils/HelperFunctions";
import { JsonConvert } from "json2typescript";

const admin = require('firebase-admin');
admin.initializeApp();

exports.createUserProfileData = functions.auth.user().onCreate(async (user) => {
    let data = UserProfile.create(user.email ? user.email : "");
    const splitName = user.displayName
        ? user.displayName.split(" ")
        : ["", ""];
    data.firstName = splitName[0];
    data.lastName =
        splitName.length > 1 ? splitName[splitName.length - 1] : "";
    data.avatarURL = getRandomAvatar();

    const jsonConvert = new JsonConvert();
    await admin.firestore().doc("users/" + user.uid).set(jsonConvert.serialize(data));
    console.log("User created - " + user.uid)
  });

exports.deleteUserData = functions.auth.user().onDelete(async (user) => {
    await admin.firestore().doc("users/" + user.uid).delete();
    await admin.storage().bucket().deleteFiles({
        prefix: "users/" + user.uid 
    })
    console.log("User deleted - " + user.uid)
  });