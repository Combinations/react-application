import React from 'react';
import LandingPage from '../../components/Landing';
import {render, cleanup} from 'react-testing-library'
import  {BrowserRouter as Router} from 'react-router-dom'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const renderComponent = () => render(
  <Router>
    <LandingPage/>
  </Router>
);

it('always renders content', () => {
  const {container} = renderComponent()
  expect(container.firstChild).toMatchSnapshot() //ensure that the page's copy/layout has not changed.
})

it('should render its children components', ()=> {
  const {getByTestId} = renderComponent()

  //assert that the two children components are in the dom
  expect(getByTestId('AgeRestrictionAlert')).toBeInTheDocument()
  expect(getByTestId('LandingFooter')).toBeInTheDocument()
})

it('should have a background image in the hero section', () => {
  const {getByTestId} = renderComponent()
  expect(getByTestId('hero')).toHaveStyle(`background-image: url(meadow.jpg)`)
})

it('should have two sign up buttons that link to the sign up page', () => {
  const {queryAllByText} = renderComponent()
  const signUpButtons = queryAllByText('Sign up')

  //ensure that the buttons are visible and are in the DOM
  expect(signUpButtons).toHaveLength(2)
  expect(signUpButtons[0]).toBeVisible()
  expect(signUpButtons[1]).toBeVisible()

  //ensure that the buttons link to the correct page
  expect(signUpButtons[0].href).toEqual(`${base_url}/signup`)
  expect(signUpButtons[1].href).toEqual(`${base_url}/signup`)
})

it('should have two sign in buttons that link to the sign in page', () => {
  const {queryAllByText} = renderComponent()
  const signInButtons = queryAllByText('Sign in')

  //ensure that the buttons are visible and are in the DOM
  expect(signInButtons).toHaveLength(2)
  expect(signInButtons[0]).toBeVisible()
  expect(signInButtons[1]).toBeVisible()

  //ensure that the buttons link to the correct page
  expect(signInButtons[0].href).toEqual(`${base_url}/signin`)
  expect(signInButtons[1].href).toEqual(`${base_url}/signin`)
})

