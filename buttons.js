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
        myMessage.myMessage('message','error', "'email' and 'password' required.", 6000);
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
        myMessage.myMessage('message','error', "'email' required.", 6000);
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
        signup();
    } else {
        console.log("No email/password - email given:" + $('#email').val());
        // give user feedback, we require email and password
        myMessage.myMessage('message','error', "'email' and 'password' required.", 8000);
    }
});
