"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {

  const path= usePathname();
  return (
    
  <div>
      <header className="bg-white shadow-md">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <Image src={'/logo.svg'} width={40} height={25} alt='logo'/>
        </a>
      </div>

      <div className="hidden md:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a className={`text-gray-500  hover:text-blue-500/75 hover:text-base hover:cursor-pointer hover:scale-105 transition-all
              ${path=='/dashboard' && 'text-blue-600/75 font-bold'}` 
              } href="#"> Dashboard </a>
            </li>

            <li>
              <a className={`text-gray-500  hover:text-blue-500/75 hover:text-base hover:cursor-pointer hover:scale-105 transition-all
              ${path=='/dashboard/Questions' && 'text-blue-600/75 font-bold'}`} href="#"> Questions </a>
            </li>

            <li>
              <a className={`text-gray-500  hover:text-blue-500/75 hover:text-base hover:cursor-pointer hover:scale-105 transition-all
              ${path=='/dashboard/How' && 'text-blue-600/75 font-bold'}`} href="#"> How it works? </a>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <UserButton/>
      </div>
    </div>
  </div>
</header>
    </div>
  
  )
}

export default Header

