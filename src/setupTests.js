import {localStorageMock} from './__mocks__/localStorageMock.js'

//This file contains mocks/variables that are needed to run the tests. 

  global.localStorage = localStorageMock;
  global.base_url = 'http://localhost'