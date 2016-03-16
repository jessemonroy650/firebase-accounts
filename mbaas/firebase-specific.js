//
//	2016-03-15 - attached to account.
//
// https://www.firebase.com/docs/web/guide/user-auth.html#section-monitoring-authentication
// This call is asynchronous.
account.monitorUserStatus = function (baseref, handler) {
    baseref.onAuth(function(authData) {
        handler('user', authData);
    });
};
//
// http://stackoverflow.com/questions/11351689/detect-if-firebase-connection-is-lost-regained
// This call is asynchronous.
// NOTE: must wait until connection is made; sometimes upto a 3 seconds.
account.monitorCloudStatus = function (baseref, handler) {
    var connectedRef = baseref.child(".info/connected");
    connectedRef.on('value', function(snap) {
        handler('cloud', snap.val());
    });
};
