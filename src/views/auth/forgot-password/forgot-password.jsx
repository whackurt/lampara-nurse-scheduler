import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './forgot-password.css'

const ForgotPassword = (props) => {
  return (
    <div className="forgot-password-container">
      <Helmet>
        <title>Forgot-Password - Lampara</title>
        <meta property="og:title" content="Forgot-Password - Lampara" />
      </Helmet>
      <div className="forgot-password-container1"></div>
      <h1 className="forgot-password-text">Forgot your Password?</h1>
      <img
        alt="image"
        src="/LAMPARA/logo1-200h.png"
        className="forgot-password-image"
      />
      <input
        type="text"
        name="Password"
        required
        placeholder="   "
        className="forgot-password-textinput input"
      />
      <span className="forgot-password-link">Remember your password? </span>
      <Link to="/" className="forgot-password-navlink">
        <span>Log in Here</span>
      </Link>
      <span className="forgot-password-text4">Email</span>
      <a
        href="mailto:kookiediana@gmail.com?subject=Password Reset"
        className="forgot-password-link1 button"
      >
        Reset Password
      </a>
    </div>
  )
}

export default ForgotPassword
