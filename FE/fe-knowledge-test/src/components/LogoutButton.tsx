import React from 'react'
import Button from './Button'
import { destroyCookie } from 'nookies';

const LogoutButton = () => {

    const handleLogout = () => {
        destroyCookie(null, "authToken");
        window.location.href = "/login";
    }

  return (
    <div className='fixed bottom-4 left-4'>
        <Button text="Logout" onClick={handleLogout} variant="danger" />
    </div>
  )
}

export default LogoutButton