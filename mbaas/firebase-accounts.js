/*
    Firebase user accounts
    Date: 2015-11-28

*/
var sErrorMsgCreate   = {'EMAIL_TAKEN': "That email is in use on this system.", 'INVALID_EMAIL': "You gave me an invalid email address."};
var sErrorMsgLogin    = {'LOGIN_FAILED': "Your login did not work. Your email or password was wrong. I don't know which is wrong."};
var sErrorMsgLostPass = {'INVALID_USER': "The specified user account does not exist."};

var account = {

/* Moved to signup.js to stand-alone on 2015-12-07
    //
    create : function (obj, success, error) {
    },
*/
    //
    login : function(obj, success, error) {
        credentials = {"email": obj.email, "password": obj.password};

        // Log me in - https://www.firebase.com/docs/web/api/firebase/authwithpassword.html
        gUserbaseRef.authWithPassword(credentials, function(err, authData) {
            if (! err) {
                if ( typeof success === 'function' ) {
                    success(authData);
                }
                //console.log('Authenticated successfully with payload:', JSON.stringify(authData));
            } else {
                if ( typeof error === 'function' ) {
                    error(err);
                }
                console.error('Login Failed: ' + "err.code", JSON.stringify(err.code));
                console.error(sErrorMsgLogin[err.code]);
            }
        });
    },

    // logout is confirmed via an event callback. see: firebase-specific.js
    logout : function () {
        gUserbaseRef.unauth();
    },

    // https://www.firebase.com/docs/web/api/firebase/changeemail.html
    changeEmail : function () {
    },

    // https://www.firebase.com/docs/web/api/firebase/changepassword.html
    changePassword : function () {
    },

    // https://www.firebase.com/docs/web/api/query/once.html
    getAccount : function (baseRef, success, error) {
        baseRef.once('value', function (dataSnapshot) {
            success(dataSnapshot.val());
        }, function (err) {
            error(err);
        });
    },

    updateAccount : function (baseRef, data, success, error) {
        account.updateData(baseRef, data, success, error);
    },

    // https://www.firebase.com/docs/web/api/firebase/resetpassword.html
    resetPassword : function(obj, success, error) {
        var creds = {'email':obj.email}
        gMybaseRef.resetPassword(creds, function(err) {
            if (err == null){
                success();
                console.log("email away.");
            } else {
                error(err);
                console.log("err.code", JSON.stringify(err.code));
                console.log(sErrorMsgLostPass[err.code]);
            }        
        });
    }
};
