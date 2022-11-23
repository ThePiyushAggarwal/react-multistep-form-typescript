import { FormEvent, useState } from 'react'
import { AccountForm } from './AccountForm'
import { AddressForm } from './AddressForm'
import { useMultistepForm } from './useMultistepForm'
import { UserForm } from './UserForm'

type FormData = {
  firstName: string
  lastName: string
  age: string
  street: string
  city: string
  state: string
  zip: string
  email: string
  password: string
}

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  age: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  password: '',
}

function App() {
  const [data, setData] = useState<FormData>(INITIAL_DATA)

  const updateFields = (fields: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...fields }))
  }

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
    goTo,
  } = useMultistepForm([
    <UserForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />,
  ])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isLastStep) return next()
    alert('Account Created Successfully!')
    setData(INITIAL_DATA)
    goTo(0)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: 'white',
          border: '1px solid black',
          padding: '2rem',
          margin: '1rem',
          borderRadius: '.5rem',
          fontFamily: 'Arial',
          maxWidth: 'max-content',
        }}
      >
        <form onSubmit={onSubmit}>
          <div
            style={{
              position: 'absolute',
              top: '.5rem',
              right: '.5rem',
            }}
          >
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              gap: '.5rem',
              justifyContent: 'flex-end',
            }}
          >
            {!isFirstStep && (
              <button type='button' onClick={back}>
                Back
              </button>
            )}
            <button type='submit'>{isLastStep ? 'Finish' : 'Next'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
