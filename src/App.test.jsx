import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import App from './App'

it('shows the amount per person after typing', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.type(screen.getByLabelText(/bill total/i), '100')
  await user.type(screen.getByLabelText(/people/i), '4')
  expect(screen.getByText(/25\.00/)).toBeInTheDocument()
})

it('changes the result when a tip button is clicked', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.type(screen.getByLabelText(/bill total/i), '100')
  await user.type(screen.getByLabelText(/people/i), '4')
  await user.click(screen.getByRole('button', { name: '20%' }))
  expect(screen.getByText(/30\.00/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '20%' })).toHaveAttribute('aria-pressed', 'true')
})

it('changes people with the stepper buttons', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /add a person/i }))
  await user.click(screen.getByRole('button', { name: /add a person/i }))
  expect(screen.getByLabelText(/people/i)).toHaveValue(2)
  await user.click(screen.getByRole('button', { name: /remove a person/i }))
  expect(screen.getByLabelText(/people/i)).toHaveValue(1)
  expect(screen.getByRole('button', { name: /remove a person/i })).toBeDisabled()
})

it('clears everything when reset is clicked', async () => {
  const user = userEvent.setup()
  render(<App />)
  expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled()
  await user.type(screen.getByLabelText(/bill total/i), '100')
  await user.type(screen.getByLabelText(/people/i), '4')
  await user.click(screen.getByRole('button', { name: '15%' }))
  await user.click(screen.getByRole('button', { name: /reset/i }))
  expect(screen.getByLabelText(/bill total/i)).toHaveValue(null)
  expect(screen.getByLabelText(/people/i)).toHaveValue(null)
  expect(screen.getByRole('button', { name: '0%' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByText(/enter a bill total/i)).toBeInTheDocument()
})

it('shows an error when people is 0', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.type(screen.getByLabelText(/bill total/i), '100')
  await user.type(screen.getByLabelText(/people/i), '0')
  expect(screen.getByRole('alert')).toHaveTextContent(/at least 1/i)
})
