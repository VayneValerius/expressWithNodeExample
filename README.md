# expressWithNodeExample
Two express servers running together to create a frontend application to add and delete JSON elements

To use the application, use a text editor with built in powershell.

To start:

npm install

(optional)Install Cors --- npm install cors (Not in dependencies, will update)

Then start both servers -

node serverScript.js
node frontEndScript.js

Your browser should go to the URL however if not to navigate

http://localhost:3000/api/cardlist/ ---> Backend
http://localhost:3001 ---> Frontend

Using the frontend you can add and delete cards.
