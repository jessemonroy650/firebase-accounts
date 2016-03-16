//
var gTheDevice = undefined;
var gIsCordova = undefined;
var device     = undefined;
/*
    Date: 2016-03-15
*/
var index = {
    self : {},
    //
    onDeviceReady : function () {
        // After the 'deviceready event', Phonegap has initialized 'device'.
        gTheDevice = (device) ? device.platform : device;

        if (device.platform === "iOS") {
            alert("got iOS.");
            // hide Exit button. They don't have one on iOS devices.
            document.getElementById('exitApp').classList.add("hidden");
            // deals with post-iOS-7 change that covers the status bar
            document.body.style.marginTop = "20px";
            // hide the Splash Screen for iOS only
            navigator.splashscreen.hide();
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body); 
            },false);
            // Exit App
            document.getElementById('exitApp').addEventListener('click', function() {
                navigator.app.exitApp();
            });
        } else if (device.platform == 'browser') {
            // hide Exit button. Browser does not exit.
            document.getElementById('exitApp').classList.add("hidden");
        }
        index.initialize()
    },
    initialize : function() {
        app.initialize();
        events.initialize(gMybaseRef, gEventTypes, gEventHandlers);
        // 'md5' slightly faster lookup, less secure
        // 'sha265' slightly longer lookup, more secure
        cryptGlue.initialize(); // 'sha256' or 'md5'; defaults 'md5'
    }
};

//
//    Entry Point
//
document.addEventListener('DOMContentLoaded', function() {
    // Detect if we are using Cordova/Phonegap or a browser.
    // https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
    gIsCordova = (typeof window.cordova !== "undefined");

    // Is it a device we know?
    if ( gIsCordova === true ) {
        // Wait for PhoneGap to load
        document.addEventListener("deviceready", index.onDeviceReady, false);
    } else {
        // This needs to be global so other modules can see it.
        device = {platform:'browser'};
        // Force the function.
        index.onDeviceReady();
    }
});
