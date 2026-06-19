import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { registerUser } from '../services/authService'

function Register({ onNavigate }) {
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

const handleSubmit = async (event) => {
  event.preventDefault()

  try {
    const data = await registerUser({
      name,
      email,
      password,
    })

    login({
      name: data.user.name,
      email: data.user.email,
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    })

    onNavigate('home')
  } catch (error) {
    setError(
      error.response?.data?.message ||
      'Registration failed'
    )
  }
}
  return (
    <section className="auth-panel-card">
      <h2 className="auth-title-large">Create Account</h2>
      <p className="auth-subtitle-muted">Sign up to unlock tickets, booking history, and event analytics.</p>
      
      <form onSubmit={handleSubmit} className="auth-form-group">
        <label className="auth-input-label">
          Full Name
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            className="auth-text-input"
            placeholder="Alex Johnson"
            required
          />
        </label>

        <label className="auth-input-label">
          Email Address
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            className="auth-text-input"
            placeholder="alex@example.com"
            required
          />
        </label>
        
        <label className="auth-input-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            className="auth-text-input"
            placeholder="••••••••"
            required
          />
        </label>
        
        {error ? <p className="auth-error-message">{error}</p> : null}
        
        <button type="submit" className="btn-primary" style={{ marginTop: '12px', width: '100%', borderRadius: '10px' }}>
          Sign Up
        </button>
      </form>
      
      <p className="auth-switch-prompt">
        Already have an account?
        <button type="button" className="auth-switch-link-btn" onClick={() => onNavigate('login')}>
          Log In
        </button>
      </p>
    </section>
  )
}

export default Register
