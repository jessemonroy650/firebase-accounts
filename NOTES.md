#= NOTES =
Date: 2016-01-22

- `buttons.js` - handles direct UI and UX, including input
- `index.js` - registers event handling and library intialization. It is called on start up.
- `app.js` - collects form data, issues calls to the "xxx" module and handles the UI/UX for success or error reporting
- `consts.js - system constants, error message and globals.

** The following modules only talk to `app.js`. They have their own support routines.**

- `events.js` - handles 'communication events' coming from the server.
- `mbass/xxx-accounts.js` - directly talks to the database and returns success and errors
- `mbass/xxx-signup.js` - handles the one time signup task
- `mbass/xxx-rw.js` - directly talks to database to do read/write/update
- `mbaas/xxx-specific.js` - subscribes to server 'communication events'

Web Sockets tutorial with simple Python server
http://yz.mit.edu/wp/web-sockets-tutorial-with-simple-python-server/