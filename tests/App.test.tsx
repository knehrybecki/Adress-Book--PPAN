import { render,fireEvent  } from '@testing-library/react';
// import { describe, it, expect,test } from 'vitest';
import '@testing-library/jest-dom'
import App from '../src/App';

test('renders Vite + React heading', () => {
  const { getByText } = render(<App />)
  const headingElement = getByText(/Vite \+ React/i)
  expect(headingElement).toBeInTheDocument()
})

test('renders Vite and React logos', () => {
  const { getByAltText } = render(<App />)
  const viteLogo = getByAltText('Vite logo')
  const reactLogo = getByAltText('React logo')
  expect(viteLogo).toBeInTheDocument()
  expect(reactLogo).toBeInTheDocument()
})

test('increments count on button click', async () => {
  const { getByText } = render(<App />)
  const button = getByText(/count is/i)

  fireEvent.click(button)
  expect(getByText(/count is 1/i)).toBeInTheDocument()

  fireEvent.click(button)
  expect(getByText(/count is 2/i)).toBeInTheDocument()
})

test('renders edit src/App.tsx message', () => {
  const { getByText } = render(<App />)
  const editMessage = getByText(/and save to test HMR/i)
  expect(editMessage).toBeInTheDocument()
})

test('renders read-the-docs message', () => {
  const { getByText } = render(<App />)
  const readTheDocsMessage = getByText(/Click on the Vite and React logos to learn more/i)
  expect(readTheDocsMessage).toBeInTheDocument()
})