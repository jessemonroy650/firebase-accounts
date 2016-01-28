#= NOTES =
Date: 2016-01-22

- `buttons.js` - handles direct UI and UX, including input
- `app.js` - collect form data, issues calls to the "xxx" module and handles the UI/UX for success or error reporting

** The following modules only talk to `app.js`. They have their own support routines.**

- `mbass/xxx-accounts.js` - directly talks to the database and returns success and errors
- `mbass/xxx-signup.js` - handles the one time signup task
- `mbass/xxx-events.js` - handles 'communication events' coming from the server.
- `mbass/xxx-rw.js` - directly talks to database to do read/write/update
- `mbaas/xxx-specific.js` - subscribes to server 'communication events'
