# operational_flow #
Date: 2016-01-16 <br>
Last Update: 2016-01-16


| order | Startup |
|-------|---------|
|   1   | app.initialize() |
|   2   | buttons.initialize() |
|   3   | events.initialize() |
|   4   | signup.initialize() |
|   5   | mbaas/firebase-accounts.initialize() |

    Event      | operational flow 
---------------|-------------------
login          | [button click] -> app.login() -> account.login() -> [firebase].authWithPassword() -> (success)() -> app.js:app.login(){}:myMessage.myMessage()
logout         | [button click] -> app.logout() -> account.logout() -> [firebase].unauth() -> [success] assumed
signup         | [button click] -> {{SEE Below}}
reset_password | [button click] -> app.resetPassword() -> account.resetPassword() -> [firebase].resetPassword() -> (success)() -> myMessage.myMessage()
get_account    | [button click] -> app.getAccount() -> account.getAccount() -> [firebase].once() -> (success)() -> (callback)() -> to UI


```
signup() {
// Unload form values into variables
// Does account exists
mine.startAccount() -> doesAccountExists() -> [firebase].child() -> [success] -> (callback)() ->
    // Create account
    mine.createAccount() -> [firebase].createUser() -> [success] -> (callback)() ->
        // Login
        account.login() -> [firebase].authWithPassword() -> [success] -> (callback)() ->
            // Write user data
            writeData({userdata}) -> [firebase].set({userdata}) -> [success] -> (callback)() ->
                // Write user device data
                writeData({devicedata}) -> [firebase].set({devicedata}) -> [success] -> (callback)() ->
                    // Create Crypt account
                    createAccountCrypt() -> updateData() -> [firebase].update() -> (success)() ->
myMessage.myMessage()
} 
```


[values to form]
set_account    | [button click] -> app.setAccount() -> account.setAccount() -> (callback)()
