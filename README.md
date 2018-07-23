## Run the application

Ensure that docker is installed. (https://docs.docker.com/install/)

> docker-compose up --build (this will build the container and run it; it runs docker-compose build; docker-compose up)

read about docker-compose (https://docs.docker.com/compose/). Inspect our dockerfile in Docker/dockerfile and our docker-compose file in docker-compose.yaml. 

To confirm that the application is running navigate to localhost:3000

## Tests

We are using create-react-app's test runner + react-testing-library + jest-dom for tests. create-react-app's test runner uses jest. react-testing-library is well suited for unit, component, and integration tests. jest-dom is used for more robust asserts.

(More information: https://github.com/kentcdodds/react-testing-library, https://github.com/facebook/jest, https://github.com/gnapse/jest-dom, REACTREADME.md).

Because we have not ejected from create-react-app in order to add/use mocks during the execution of tests the mocks need to be specifed in /src/setupTests.js. This is a default supported by create-react-app.

To run the tests:

> yarn test (this will start the watcher by default)

To get test coverage: 

> yarn test -- --coverage

## Deploy 

The application is deployed via gitlab ci/cd + AWS's EB/ECR services. 

Read about gitlab ci/cd (https://about.gitlab.com/features/gitlab-ci-cd/) and inspect .gitlab-ci.yml. 

Read about AWS's EB service (https://aws.amazon.com/elasticbeanstalk/) and ECR (https://aws.amazon.com/ecr/)
