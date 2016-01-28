/*
    Events
    Date: 2015-12-09
    This module uses: mbaas/firebase-specific.js
*/

// Could not get handler to register as an Object item.
// Using global for now.
var handler = function (eventType, data) {
        console.log('handler: ', eventType, gLoggedIn, gCloudConnected);
        if (eventType == 'user') {
            // gLoggedIn
            if (data) {
                // user authenticated with Firebase
                gLoggedIn = true;
                gUserFbId = data.uid;  // uid     
                console.log("isLoggedIn as ID: '" + data.uid + "', Provider: " + data.provider);
            } else {
                gLoggedIn = false;
                console.log("user logged out.")
            }
            var status = (gLoggedIn) ? 'Logged In' : 'Logged Out';
            $('#status-user').html(status);
        } else if (eventType == 'cloud') {
            // gCloudConnected
            if (data) {
                // user authenticated with Firebase
                gCloudConnected = true;
                console.log("isCloudConnected");
            } else {
                gCloudConnected = false;
                console.log("NOT CloudConnected");
            }
            var status = (gCloudConnected) ? 'Connected' : 'Not Connected';               
            $('#status-cloud').html(status);
        }
    };

var events = {
    //
    initialize : function (baseref, events, handlers) {
        if (events.length) {
            for (var i = 0; i < events.length; i++) {
                event   = events[i];
                handler = handlers[i];
                console.log('monitoring event: ' + event);
                switch (event) {
                    case 'user':
                        monitorUserStatus(baseref, handler);
                    break;
                    case 'cloud':
                        monitorCloudStatus(baseref, handler);
                    break;
                    default:
                }
            }
        }
    }
};

var gEventTypes    = ['user','cloud'];  // This is redundent. Here for documentation purposes.
var gEventHandlers = [handler,handler]; // Functions must be defined before filling this array.
