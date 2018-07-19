# Running the application for development

This application is a react + materalizeCSS application

see http://materializecss.com for more information on the ui kit. 

Follow the below steps to run the application. 

## Setup

Navigate to /src/services and modify BASE_URL to be the url of the backend server. (ie. localhost:8090) 

install application dependencies: 

>yarn install 

## Run the application

To start the application: 

>yarn start

To confirm, navigate to localhost:3000

## Tests

We are using create-react-app's test runner + react-testing-library + jest-dom for tests. create-react-app's test runner uses jest. react-testing-library is well suited for unit, component, and integration tests. jest-dom is used for more robust asserts.

(More information: https://github.com/kentcdodds/react-testing-library, https://github.com/facebook/jest, https://github.com/gnapse/jest-dom, REACTREADME.md).

Because we have not ejected from create-react-app in order to add/use mocks during the execution of tests the mocks need to be specifed in /src/setupTests.js. This is a default supported by create-react-app.

To run the tests:

> npm test 

To get test coverage: 

> npm test -- --coverage
