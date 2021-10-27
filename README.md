
# SETUP INSTRUCTIONS
## Magic command -
```
npm run grade
```
 The above CLI command will install packages for the Nodejs server and React app and then run 2 concurrent servers on the following endpoints - <br><br>
  React App - `localhost:3000` <br>
  Nodejs Server - `localhost:3001` <br><br>

If you want to do it step by step instead, follow the instructions below:
## Step by Step - 
### 1. Build React app
``` 
cd client
npm install 
npm start
```
### 2. Serve files using Nodejs server
``` 
(Open a new terminal)
npm install 
npm start
```
The client is now running on `localhost:3000`<br>
The server is now running on `localhost:3001` 
<br><br>

# UNIT TESTING 
```
npm test
```
- We have unit tested backend routes in this assignment.
- The tests are performed using `jest` and and `supertest` for testing the routes. 
- We've written tests for both valid and erroneous inputs.
- Since the main purpose of the server in this case is to perform CRUD operations and keep track of the user session, these unit tests cover the major functionality of the app.
<br>

![Alt text](unit-tests.png?raw=true "Passed tests example")

# ABOUT THE PROJECT
## HotSpot 
### ~~Link to Website: https://uic-cs484.github.io/assignment-1---team-project-proposal-team7/proposal.html~~ We've shifted to a React app from assignment 2 onwards <br><br>
# Members
### **Christina "Boss" Wen Gehua**  
Owner of the idea and reponsible for resolving disputes in the group. 
Will be the backbone of the project as the **backend** developer. <br>
Side hustle - Tech Support.<br>
### **Diyin "Detective" Hu** 
Knows it all. The silent killer type. Will mostly be handling the client side on the **frontend** - HTML/CSS/JS. <br>
Side hustle - cat mom and god of C++.<br>
### **Fahad "Consigliere" Ahmad**
Right hand man. Collects resources and keeps morale high. Tasked with the **server side** using Node.js. <br>
Side hustle - Being late to class. <br><br>

# Workflow strategy
1. Create issues on Github Projects Kanban Board and assign it to a team member from the Issues Tab
2. Make branches corresponding to above tasks and merge them with the dev branch
3. After testing dev branch, create a pull request to merge it with main branch
4. One of the members views and approves the PR and merges it with the main branch

![Alt text](git-workflow.png?raw=true "Git workflow")
## Development Tools
- **Backend**: mongodb  
- **Server side**: nodejs, express, passport.js, jest 
- **Client side**: react

<br><br>
<br><br>
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
