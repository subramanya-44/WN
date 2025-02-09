import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import { useAppDispatch } from '../hooks'
import { setAdminLoggedIn } from '../stores/AdminStore'

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  background: #222639;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const Title = styled.h1`
  font-size: 28px;
  color: #fff;
  text-align: center;
  margin: 0;
  margin-bottom: 8px;
`

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background: #1f2937;
    color: #fff;
    
    fieldset {
      border-color: rgba(255, 255, 255, 0.1);
    }

    &:hover fieldset {
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  .MuiInputLabel-root {
    color: #9ca3af;
  }
`

const LoginButton = styled(Button)`
  height: 48px;
  font-size: 16px !important;
  background: #4f46e5 !important;

  &:hover {
    background: #4338ca !important;
  }
`

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'subbu' && password === 'subbu') {
      dispatch(setAdminLoggedIn(true))
    } else {
      setError(true)
    }
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Title>Admin Login</Title>
      <TextField
        label="Username"
        variant="outlined"
        color="secondary"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        color="secondary"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Alert severity="error">Invalid credentials!</Alert>}
      <Button variant="contained" color="secondary" type="submit">
        Login
      </Button>
    </Wrapper>
  )
}