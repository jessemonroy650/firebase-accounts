/*
    Buttons
    Date: 2015-11-29
*/
$('#button-login').click(function() {
    console.info("#button-login");
    if ($('#login-email').val() && $('#login-password').val()) {
        app.login();
    } else {
        console.log("No email/password - email given:" + $('#login-email').val());
        // give user feedback, we require email and password
        myMessage.myMessage('message','error', "'email' and 'password' required.", gTimeErrorGeneric);
    }
});

$('#button-logout').click(function() {
    console.info("#button-logout");
    app.logout();
});

// This is the only interface that passes a value to the next layer. - 2015-12-09
$('#button-reset-password').click(function() {
    console.info("#button-reset-password");
    if ($('#reset-email').val()) {
        app.resetPassword($('#reset-email').val()) ;
    } else {
        console.log("No email/password - email given:" + $('#reset-email').val());
        // give user feedback, we require email and password
        myMessage.myMessage('message','error', "'email' required.", gTimeErrorGeneric);
    }
});
$('#button-get-account').click(function() {
    console.info("#button-get-account");
    app.getAccount();
});
$('#button-set-account').click(function() {
    console.info("#button-set-account");
    app.setAccount();
});

$('#button-signup').click(function() {
    console.info("#button-signup");
    if ($('#email').val() && $('#password').val()) {
        //app.signup();
        // changed to stand-alone module on 2015-12-07
        // moved UI scrape to here on 2016-03-15
        var okGetUU = $('#uuid').is(":checked");
        var okGetMM = $('#makemodel').is(":checked");

        gUserData.email     = $('#email').val();
        gUserData.password  = $('#password').val();
        gUserData.name      = $('#name').val();
        gUserData.phone     = $('#phone').val();
        //
        gDeviceData.uuid      = false;
        gDeviceData.makemodel = false;
        gDeviceData.cordova   = false;
        gDeviceData.platform  = false;
        // get device info only if we are using Cordova/Phonegap.
        if (gIsCordova == true) {
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
        simple.remove(gUserData, ['password']);
        //
        // SIGNUP
        signup(credentials, gUserData, gDeviceData);
    } else {
        console.log("No email/password - email given:" + $('#email').val());
        // give user feedback, we require email and password
        myMessage.myMessage('message','error', "'email' and 'password' required.", gTimeErrorGeneric);
    }
});
