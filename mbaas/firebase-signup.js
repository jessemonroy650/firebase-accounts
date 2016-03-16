/*
 * User signup - in theory, this is only called once. 
 * This is why it is dynamically loaded (lazy loaded).
 * Date: 2015-12-07
 * SEE: More documentation at Bottom.
*/
var signup = function (creds, userData, deviceData) {
    var  mine = {};
    var gUserDataRef    = null;    // Only used with signup.js
    var gUserDeviceRef  = null;    // Only used with signup.js
    /*
     *
     */
    mine.startAccount = function (credentials, userobj, deviceobj, success, error) {
        console.log("account.create:");
        var cryptedEmailAddr = (cryptGlue.which == 'sha256') ? 
                                   Sha256.hash(credentials.email) :
                                   md5(credentials.email);

        // detectCollision()
        cryptGlue.doesAccountExists(cryptedEmailAddr, gUsersURLCrypt, function (exists) {
            if (! exists) {
                mine.createAccount(credentials, userobj, deviceobj,
                    function (data) {
                        // assume we can create cryptedEmailAddr record.
                        cryptGlue.createAccount(cryptedEmailAddr, gUsersURLCrypt,
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
    // console.log("userData:", userData); console.log("creds:", creds);
    mine.startAccount(creds, 
            userData,
            deviceData,
            function (data) { // success
                myMessage.myMessage('message','success', "Account created", gTimeSuccessNewAccount);
            },
            function (error) { // error
                myMessage.myMessage('message','error', "Error creating account:" + error, gTimeErrorNewAccount);
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




var cryptGlue = {
    which : 'md5',
    // 'md5' slightly faster lookup, less secure
    // 'sha265' slightly longer lookup, more secure
    initialize : function (which) {
        if (which) { cryptGlue.which = which; }
    },
    createAccount : function (userEmail, usersURL, callback, errCallback) {
        var usersRef = new Firebase(usersURL);
        uref = usersRef.child(userEmail);
        account.updateData(uref, {'active':true}, callback, errCallback);
    },
    // Firebase: Detecting if data exists. This snippet detects if a user ID is already taken
    // https://gist.github.com/anantn/4323949
    // This call is asynchronous.
    doesAccountExists : function (userEmail, usersURL, callback, errCallback) {
        var usersRef = new Firebase(usersURL);
        usersRef.child(userEmail).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            callback(exists);
        },
        function (err) {
            errCallback(err);
        });

    }
};

/*
    There are six (6) routines in the file, in order of use.
    0) cryptGlue.initialize() - initializes which crypt method is used
    1) signup() - The main routine and entrance into this module.
    2) mine.startAccount() - start the account creation process
    3) cryptGlue.doesAccountExists() - Checks to see if the user already has an account
    4) mine.createAccount() - actually creates the account, writes user and device data
    5) cryptGlue.createAccount() - Creates an account with a crypted path
*/



