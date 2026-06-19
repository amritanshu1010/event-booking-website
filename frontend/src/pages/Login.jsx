import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../services/authService'

function Login({ onNavigate }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

const handleSubmit = async (event) => {
  event.preventDefault()

  try {
    const data = await loginUser(email, password)

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
      'Login failed'
    )
  }
}
  return (
    <section className="auth-panel-card">
      <h2 className="auth-title-large">Welcome back</h2>
      <p className="auth-subtitle-muted">Enter your details to log in to EventHub.</p>
      
      <form onSubmit={handleSubmit} className="auth-form-group">
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
            placeholder="you@example.com"
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
          Log In
        </button>
      </form>
      
      <p className="auth-switch-prompt">
        Need an account?
        <button type="button" className="auth-switch-link-btn" onClick={() => onNavigate('register')}>
          Sign Up
        </button>
      </p>
    </section>
  )
}

export default Login
