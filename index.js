    //
    var gTheDevice = undefined;
    var device     = undefined;
    // Wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady, false);
    //
    function onDeviceReady() {
        console.log("deviceready");

        // After the 'deviceready event', Phonegap has initialized 'device'.
        gTheDevice = (device) ? device.platform : device;

        app.initialize(gTheDevice);
        events.initialize(gMybaseRef, gEventTypes, gEventHandlers);
        // 'md5' slightly faster lookup, less secure
        // 'sha265' slightly longer lookup, more secure
        cryptInitialize(); // 'sha256' or 'md5'; defaults 'md5'
    }
