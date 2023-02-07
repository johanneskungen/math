import React from 'react'
import { FaFacebook } from 'react-icons/fa'

function Navbar() {
  return (
    <nav className='p-8 flex justify-between items-center'>
        <h2 className='font-bold text-blue-400'>MathHelper.io</h2>
        <FaFacebook className='text-blue-400' size={28}/>
    </nav>
  )
}

export default Navbar