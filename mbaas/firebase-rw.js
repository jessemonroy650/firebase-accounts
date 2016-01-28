//
//    Read Data
//
//var readData = function (dataRef, callback, err) {
account.readData = function (dataRef, callback, err) {

    if (dataRef) {
        dataRef.once('value', function(datasnapshot) {
            var val = datasnapshot.hasChildren();
            if (val) {
                if ( typeof callback === 'function' ) {
                    console.log("readData callback()");
                    callback(datasnapshot);
                }
                console.log("readData has children/data." + JSON.stringify(datasnapshot.val()));
            } else {
                console.log("readData found no Data.");
            }
        });
    } else {
        console.log("readData has no reference.");
    }
};
//
//    Write some actual data
//
//var writeData = function (dataRef, data, callback, callerr) {
account.writeData = function (dataRef, data, callback, callerr) {

    if (dataRef) {
        dataRef.set(data, function(e) {
            if (e) {
                callerr(e);
            } else {
                callback("data written:" + data);
            }
        });
    } else {
        console.log("writeData has no reference.");
    }
};
//
//    Write some actual data
//
//var updateData = function (dataRef, data, callback, callerr) {
account.updateData = function (dataRef, data, callback, callerr) {

    if (dataRef) {
        dataRef.update(data, function(e) {
            if (e) {
                callerr(e);
            } else {
                callback("data updated:" + data);
            }
        });
    } else {
        console.log("updateData has no reference.");
    }
};
