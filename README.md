<h2>Back-end files Setup</h2>

You will need to create a .env inside the notes-backend folder and it'll need this line of code:
```
JWT_SECRET_KEY=bec82b67067781d02a743a2f242372cb7c9f5c6d54cb3aa5afd5be6ed1d1f951
```
Then in the config.json inside the config folder you'll have to setup your postgres username, password and database and using SQL shell you'll have to create the database using the name you used in the config.json

<h2>Front-end files setup</h2>
You will need to create a .env inside the notes-frontend folder and it'll need this line of code:

```
VITE_API_URL = "http://localhost:3000/"
```

<h2>Running the app</h2>
use the "start_app.sh" file to start both the back-end and front-end then open the application on your browser.

<h2>Features</h2>
To use the app you'll need to create an account. to do so click the login button or the create a new note button while you're not logged in to open up the login/register window, there you have to input an username and 6 character (or longer) password.
Now you can create, edit (by clicking the note), archive or delete your notes.

The app supports multiple users.
