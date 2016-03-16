/*
    Date: 2016-03-15
*/
var gUserFbId       = ""; // This is the UID assigned by firebase.
                          // It is updated after every Auth event.
var gUserData       = {"email": undefined,"name": undefined,"phone": undefined};
var gDeviceData     = {"uuid": undefined,"makemodel": undefined,"cordova": undefined,"platform":undefined};

var gCloudConnected = null;    // State change handled by events.js
var gLoggedIn       = null;    // State change handled by events.js

// FIREBASE
//    NOTE: The firebase specific routines must be fired before any of the
//    subroutines in the firebase module. BUT THIS MODULE (FILE) MUST LOAD FIRST.
var gCredentials    = {"email": undefined, "password": undefined};
var gAppURL         = "https://user-login.firebaseio.com/"
var gUsersURL       = "https://user-login.firebaseio.com/users";
var gUsersURLCrypt  = "https://user-login.firebaseio.com/users-crypt";
var gMybaseRef      = new Firebase(gAppURL);
var gUserbaseRef    = new Firebase(gUsersURL);
var gUserCryptRef   = new Firebase(gUsersURLCrypt);
// FIREBASE events see `mbaas/events.js`
var gEventTypes    = ['user','cloud'];  // This is redundent. Here for documentation purposes.
var gEventHandlers = [handler,handler]; // Functions must be defined before filling this array.
//
//  TIME FOR MESSAGES
var gTimeSuccessGeneric = 6000;
var gTimeErrorGeneric   = 8000;

var gTimeSuccessNewAccount = 10000;
var gTimeErrorNewAccount   = 12000;
