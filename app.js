/*
    Main App
    Date: 2015-11-29
*/

var app = {
    initialize : function (device) {
        console.log("app.initialize");
    },

/* Move signup to stand-alone on 2015-12-07
    signup : function () { console.log("app.signup"); }
*/
    login : function (credentials) {
        console.log("app.login");
        gCredentials.email    = $('#login-email').val();
        gCredentials.password = $('#login-password').val();
        console.log("gCredentials:",gCredentials);
        account.login(gCredentials,
            function (payload) { // success
                // payload.uid payload.provider payload.auth payload.expires
                console.log('Login successfully with payload:', JSON.stringify(payload));
                //console.log('payload.expires:', myDate.makeISO(new Date(payload.expires)));
                myMessage.myMessage('message','success', "You are now logged in.", gTimeSuccessGeneric);
            },
            function (error) { // error
                myMessage.myMessage('message','error', error, gTimeErrorGeneric);
            });
    },

    logout : function () {
        console.log("app.logout");
        account.logout();
    },

    getAccount : function (callback) {
        console.log("app.getAccount");
        // 
        var userDataRef = gUserbaseRef.child(gUserFbId);
        console.log(gCloudConnected, gLoggedIn, userDataRef);
        if ((gCloudConnected) && (gLoggedIn) && (userDataRef)) {
            account.getAccount(userDataRef,
                function (snapshot) { // success
                    console.log("snapshot:", snapshot);
                    //console.log("snapshot:", JSON.stringify(snapshot));
                    $('#gs-name').val(snapshot.name);
                    $('#gs-email').val(snapshot.email);
                    $('#gs-phone').val(snapshot.phone);
                },
                function (error) { // error
                    myMessage.myMessage('message','error', error, gTimeErrorGeneric);
                });
        }
    },

    setAccount : function (callback) {
        console.log("app.setAccount");
        gUserData.name  = $('#gs-name').val();
        gUserData.email = $('#gs-email').val();
        gUserData.phone = $('#gs-phone').val();

        var userDataRef = gUserbaseRef.child(gUserFbId);
        console.log(gCloudConnected, gLoggedIn, userDataRef);
        if ((gCloudConnected) && (gLoggedIn) && (userDataRef)) {
            account.updateAccount(userDataRef, gUserData,
                function () { // success
                    myMessage.myMessage('message','success', "Your data updated.", gTimeSuccessGeneric);                
                },
                function (error) { // error
                    myMessage.myMessage('message','error', error, gTimeErrorGeneric);
                });
        }
    },

    resetPassword : function (email) {
        console.log("app.resetPassword");
        gCredentials.email    = email;
        account.resetPassword(gCredentials,
            function (data) { // success
                myMessage.myMessage('message','success', "Your account is being reset.", gTimeSuccessGeneric);
            },
            function (error) { // error
                myMessage.myMessage('message','error', error, gTimeErrorGeneric);
            });
    }
}