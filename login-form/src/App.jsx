import { useState } from 'react'
import './App.css'

function App() {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <p className="title">Hello, welcome to my website</p>
      <div>
        <input
          className="input"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          className="input"
          type={!showPassword ? "password" : "text"}
          placeholder="Password"
        />
        <button
          className="toggle-password-button"
          onClick={togglePassword}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div>
        <button
          className="button"
        >
          Login
        </button>
        <button
          className="button"
        >
          Sign up
        </button>
      </div>
    </>
  );
}

export default App
