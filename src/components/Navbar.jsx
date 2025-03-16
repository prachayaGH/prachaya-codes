import React, { useState } from 'react';

export function Navbar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);  
    const handleShowMobileMenu = () => setShowMobileMenu(prev => !prev);
    return (
        <nav className="bg-black text-white position: fixed top-0 w-full z-10">
            <div className="flex items-center h-16 justify-between p-10">
                {/* Logo */}
                <div>
                    <a href="#" className="text-blue-400 font-bold text-xl">LOGO</a>
                </div>
                {/* Desktop Menu */}
                <div className="flex-1 flex justify-center">
                    <div className='lg:ml-[330px] md:flex md:gap-14 flex gap-8 ' >
                        <a href="#" id='navbar-menu' >Home</a>
                        <a href="#" id='navbar-menu' >About</a>
                        <a href="#" id='navbar-menu'>Portfolio</a>
                        <a href="#" id='navbar-menu'>Blog</a>
                    </div>
                </div>
                {/* Auth Buttons */}
                <div className='md:flex justify-end items-center ml-auto hidden'>
                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-blue-400 hover:underline">Log in</a>
                    <a href="#" className="px-4 py-2 rounded-md text-sm font-medium ml-3" id='navbar-menu-secondary'>Sign in</a>
                </div>
                {/* Mobile Menu */}
                <div className='md:hidden flex justify-end '>
                    <button className="md:hidden p-2 " onClick={() => setShowMobileMenu(!showMobileMenu)}>
                            <span class="sr-only">Open main menu</span>
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                                </svg>
                    </button>
                </div>
            </div>
            
            {/* Dropdown menu */}
            {showMobileMenu && (
            <div className="md:hidden bg-gray-800 absolute left-0 right-0 w-full space-y-2 z-10">
                <div className=' h-[180px] flex flex-col gap-5 justify-center p-5 shadow-md'>   
                    <button className="block w-full h-[48px] text-center border-blue-600 border-2 rounded-full">
                    Log in
                    </button>
                    <button className="block w-full h-[48px] text-center border-blue-600 border-2 text-white rounded-full">
                    Sign up
                    </button>
                </div>
            </div>
            )}
        </nav>
    )
}


