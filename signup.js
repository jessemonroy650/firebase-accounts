/*
 * User signup - in theory, this is only called once. 
 * This is why it is dynamically loaded (lazy loaded).
 * Date: 2015-12-07
 * SEE: More documentation at Bottom.
*/
var gWhichCrypt = 'md5';

var signup = function () {
    var  mine = {};
    /*
     *
     */
    mine.startAccount = function (credentials, userobj, deviceobj, success, error) {
        console.log("account.create:");
        var cryptedEmail = "";

        cryptedEmail = (gWhichCrypt == 'sha256') ? 
                           Sha256.hash(credentials.email) :
                           md5(credentials.email);

        // detectCollision()
        doesAccountExists(cryptedEmail, gUsersURLCrypt, function (exists) {
            if (! exists) {
                mine.createAccount(credentials, userobj, deviceobj,
                    function (data) {
                        // assume we can create cryptedEmail record.
                        createAccountCrypt(cryptedEmail, gUsersURLCrypt,
                            function() { success(data); },
                            function(e) { error("Could not create crypt" + e);
                            })
                    }, 
                    function (e) { error("Could not create account: " + e); });
            } else {
                error("email already exists");
            }
        });
    };

    /*
     *
     */
    mine.createAccount = function (credentials, userobj, deviceobj, success, error) {
        // Firebase.createUser() 
        // https://www.firebase.com/docs/web/api/firebase/createuser.html
        // 2015-09-03 - Added 'userData', new to API
        gUserbaseRef.createUser(credentials, function(err, userData) {
            if (! err) {
                console.log('createUser() succeeded with ' + userData.uid);
                account.login(credentials, function(payload) {
                    // payload.uid payload.provider payload.auth payload.expires
                    gUserDataRef   = gUserbaseRef.child(userData.uid);
                    gUserDeviceRef = gUserbaseRef.child(userData.uid).child('device');
                    // Write User Data
                    account.writeData(gUserDataRef,
                        userobj,
                        // Write User Device Data
                        function () { 
                            account.writeData(gUserDeviceRef, deviceobj,
                                function()  { success("account created and data added"); },
                                function(e) { error("write device data to account failed. ", e);
                            });
                        },
                        function(e) {
                            error("write data to account failed. " + e);
                        });
                }, function(err) {
                    error("Error with authWithPassword, which should not happen.");
                });
            } else {
                error(err);
            }
        });
    };

    /*
     *
     */
    console.log("signup");
    var okGetUU = $('#uuid').is(":checked");
    var okGetMM = $('#makemodel').is(":checked");

    gUserData.email     = $('#email').val();
    gUserData.password  = $('#password').val();
    gUserData.name      = $('#name').val();
    gUserData.phone     = $('#phone').val();
    gDeviceData.uuid      = false;
    gDeviceData.makemodel = false;
    gDeviceData.cordova   = false;
    gDeviceData.platform  = false;
    // get device info only if we are on the device.
    if (gTheDevice != undefined) {
        gDeviceData.uuid      = (okGetUU) ? device.uuid : false;
        gDeviceData.makemodel = (okGetMM) ? device.model : false;
        gDeviceData.cordova   = device.cordova;
        gDeviceData.platform  = device.platform + ";" + device.version;
    } else {
        gDeviceData.uuid      = (okGetUU) ? 'fake.uuid' : false;
        gDeviceData.makemodel = (okGetMM) ? 'fake.model' : false;
        gDeviceData.cordova   = "Cordova fake-5.2.0";
        gDeviceData.platform  = "LG Fake ; Android 5.1.0";
    }
    credentials = {"email": gUserData.email, "password": gUserData.password};
    simple_remove(gUserData, ['password']);
    // console.log("gUserData:", gUserData); console.log("credentials:", credentials);
    mine.startAccount(credentials, 
            gUserData,
            gDeviceData,
            function (data) { // success
                myMessage.myMessage('message','success', "Account created", 10000);
            },
            function (error) { // error
                myMessage.myMessage('message','error', "Error creating account:" + error, 12000);
            });
    //
    // clear & reset out fields
    //
/*
    $('#email').val("");
    $('#password').val("");
    $('#name').val("");
    $('#phone').val("");
    $('#uuid').prop("checked", true);
    $('#makemodel').prop("checked", true);
*/
};


// Firebase: Detecting if data exists. This snippet detects if a user ID is already taken
// https://gist.github.com/anantn/4323949
// This call is asynchronous.
var doesAccountExists = function (userEmail, usersURL, callback, errCallback) {
    var usersRef = new Firebase(usersURL);
    usersRef.child(userEmail).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        callback(exists);
    },
    function (err) {
        errCallback(err);
    });

};

var createAccountCrypt = function (userEmail, usersURL, callback, errCallback) {
    var usersRef = new Firebase(usersURL);
    uref = usersRef.child(userEmail);
    account.updateData(uref, {'active':true}, callback, errCallback);
}

// 'md5' slightly faster lookup, less secure
// 'sha265' slightly longer lookup, more secure
var cryptInitialize = function (which) {
    gWhichCrypt = which;
} ;

/*
    There are six (6) routines in the file, in order of use.
    1) signup() - The main routine and entrance into this module.
    2) mine.startAccount() - start the account creation process
    3) doesAccountExists() - Checks to see if the user already has an account
    4) mine.createAccount() - actually creates the account, writes user and device data
    5) createAccountCrypt() - Creates an account with a crypted path
    6) cryptInitialize() - initializes with crypt method is used
*/



