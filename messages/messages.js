/*
	Inline Message (non-popup)
	Date: 2014-11-17

	2015-10-15 - rewrite of original

*/
//
//	Message is displayed in the <div id="{mId}" class="{mClass}"></div>
//	* Use 'mClass' to reassign the style/color - defaults to what you pre-set it to.
//	* The object is 'none' & 'collapse' by default.
//
var myMessage = {
	Classes   : ['info','success','warning','error'],
    DelayVisual : 50,
    DelayReading : 2000,
    PreviousClasses : {},
	DefaultId : 'message',
	GrowlId   : undefined,
	TimeoutHandle : undefined,
    BaseClass : 'message',
    AddedClass : {},
	
	
	//	* This object will automatically toggle the message off after 'timeout'.
	myMessage : function (mId, mClass, message, timeout) {
		GrowlId   = mId;
		var thing = document.getElementById(mId);
        // if the message is blank, then the default message is displayed.
		if (message !== undefined) {
			this.Toggle(mId, mClass);
			thing.innerHTML = message;
		}
		if (timeout) {
			if (timeout > 0) {
				this.TimeoutHandle =  window.setTimeout(this.Toggle, timeout);
			}
		} else {alert("Set the timeout for myMessage()\-1=No timeout.");}
	},
	//	* This object just toggles the object between visible and invisible.
	Toggle : function (mId, mClass, mMessage) {
        console.info("toggle:"+mId);
		if ( mId ) {
            theId = mId;
        } else if (myMessage.GrowlId) {
            theId = myMessage.GrowlId;
        } else if (myMessage.DefaultId) {
            theId = myMessage.DefaultId;
        }
        if (mClass) {
            AddedClass = mClass;
        }
        //console.info("toggle:" + document.getElementById(theId).classList);

		if (theId) {
			thing = document.getElementById(theId);
            // Make 'visible'
			if ( thing.classList.contains('hidden') === true ) {
                if (mMessage) {
                   thing.innerHTML = mMessage;
                }
				// NOTE: The class assignment below, only changes colors.
				if (mClass) {
                    // reset the base class
                    thing.className = myMessage.BaseClass;
					thing.classList.add(mClass);
				}
                setTimeout(function() {
                    thing.classList.add('growlDown');
                },
                myMessage.DelayVisual);
            // Make 'hidden'
			} else {
                thing.classList.remove('growlDown');
                thing.classList.add('growlUp');
                setTimeout(function() {
                    thing.classList.add('hidden');
                }, 
                myMessage.DelayReading + myMessage.DelayVisual);
			}
		}
        //console.info("After toggle:" + document.getElementById(theId).classList);
	}
};
