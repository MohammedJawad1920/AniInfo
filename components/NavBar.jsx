"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import {  LoginLink, RegisterLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { Bars3Icon, MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Profile from './Profile';


const NavBar = ({auth, user}) => {

  const [isNavBar, setIsNavBar] = useState(false);  
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);  

  const handleNavBar = () => {
    setIsNavBar(!isNavBar)
  } 

  const handleSearch = () => {}  
  const handleSearchResult = () => {}  
  const handleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen)
  }  
  console.log(user)
  return (
    <header className='fixed z-10 top-0 right-0 left-0 flex flex-col items-center justify-between bg-black  h-auto md:h-16 my-auto py-2 px-3 gap-3'>
        <nav className='container mx-auto flex  justify-between items-center h-full'>

            {/* Left */}
            <div className='flex gap-5'>

                {/* Menu-Icon */}
                <div>
                <Bars3Icon className={isNavBar ? 'hidden' : ' h-8  text-white'} onClick={handleNavBar}/>
                </div>

                {/*Logo  */}
                <div className={isNavBar ? 'hidden ' : 'flex items-center'}>
                    <h2 className=' text-white font-bold text-xl md:text-2xl cursor-pointer'>Ani<span className=' text-amber-400'>Info</span></h2>
                </div>

                
            </div>

            {/* Middle */}
            <div className='hidden md:flex items-center justify-around bg-white h-10 w-96 rounded'>
                    <forn onSubmit={handleSearchResult}>
                        <input 
                            type="text" 
                            placeholder='Search Anime'
                            className='w-72 ml-2  outline-none'
                            onChange={handleSearch}  />
                    </forn>
                    <div>
                        <MagnifyingGlassIcon className=' h-5 w-5 md:h-7 md:w-7 cursor-pointer ' onClick={handleSearchResult}/>
                    </div>
                    <div className=' flex items-center bg-amber-400 text-sm text-black font-bold p-1.5 justify-center rounded' onClick={()=> setIsSearchBarOpen(false)}>
                      <Link href={'/filter'} className='w-full h-full'>
                        Filter
                      </Link>
                    </div>
            </div>

            {/* Right */}
            <div className=' flex items-center justify-between h-8'>
                <div>
                    <MagnifyingGlassIcon className=' h-6 md:h-7 text-amber-400 cursor-pointer md:mr-5 md:hidden' onClick={handleSearchBar}/>
                </div>
                <div>
                {!auth 
                ? (<div className='text-sm md:text-[1.1rem] space-x-2'>
                    <LoginLink className=' py-1 px-2 font-bold rounded text-white'>Login</LoginLink>
                    <RegisterLink className='bg-amber-400 py-1 px-2 font-bold rounded hover:bg-amber-300'>Register</RegisterLink>
                  </div>)
                : <Profile
                    user={user}
                    LogoutLink={LogoutLink} />
                }
                </div>
            </div>
            {/* side-bar */}
            
            <div className={isNavBar  ? ' bg-white bg-opacity-10 backdrop-blur-sm  absolute top-0 left-0 right-0 bottom-0 h-[100vh] text-white' : 'hidden'}  onClick={handleNavBar}></div>
            <div className={isNavBar  ? 'absolute top-0 left-0 bottom-0 w-72 bg-white bg-opacity-10 h-[100vh] px-3 pt-2' : 'hidden'}>
              <div className='flex justify-between'>
                <XMarkIcon className=' h-8' onClick={handleNavBar} />
                <div className='flex items-center justify-start w-3/5'>
                  <h2 className=' text-white font-bold text-xl cursor-pointer'>Ani<span className=' text-amber-400'>Info</span></h2>
                </div>
              </div>
              <div className='flex flex-col items-center  w-full'>
                 <ul className='flex flex-col gap-y-5 mt-8 w-full items-center'>
                   <li className='links'><Link href={'#'}>Top Upcoming</Link></li>
                   <li className='links'><Link href={'#'}>Top Ranking</Link></li>
                   <li className='links'><Link href={'#'}>Top Airing</Link></li>
                   <li className='links'><Link href={'#'}>Most Popular</Link></li>
                   <li className='links'><Link href={'#'}>Most Favourite</Link></li>
                 </ul>
              </div>
            </div>
        </nav>
            {/* small device search bar */}
        <div className={!isSearchBarOpen ? 'hidden' : 'flex h-1/2 w-full md:hidden'}>
          <div className='container flex mx-auto space-x-3'>
            <div className='flex justify-center items-center bg-gray-700 h-8 w-8 rounded'>
              <Link href={'/filter'}>
                <FunnelIcon className='text-white h-5'  onClick={()=> setIsSearchBarOpen(false)} />
              </Link>
            </div>
            <div className='flex items-center justify-between bg-white h-8 w-full rounded'>
                <form className='w-[94%]' onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder='Search Anime'
                        className='w-full ml-1 outline-none'
                        onChange={handleSearch}  />
                 </form>
                <div>
                  <MagnifyingGlassIcon className=' h-5 w-5 mr-2 cursor-pointer ' onClick={handleSearchResult}/>
                </div>
            </div>
         </div>    
        </div>

        
    </header>
  )
}

export default NavBar