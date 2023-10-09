import React from 'react'
import { BiLogoReddit } from 'react-icons/bi'

const Header = () => {
  return (
    <header className='absolute flex justify-center items-center top-0 left-0 w-full h-16 shadow-lg'>
      <BiLogoReddit className='w-12 h-12 text-blue-500' />
      <h1 className='font-bold text-4xl'>Reddit<span className='text-blue-500'>Minimal</span></h1>
    </header>
  )
}

export default Header