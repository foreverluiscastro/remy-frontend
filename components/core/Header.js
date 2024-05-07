import React from 'react'
import Logo from './Logo'
import Login from './Login'

function Header() {
  return (
    <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto px-4 min-h-screen">
    <Logo/>
    <Login/>
  </div>
  )
}

export default Header