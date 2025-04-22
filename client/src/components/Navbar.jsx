import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { useLocation } from 'react-router-dom';

export function Navbar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation(); // ใช้ useLocation เพื่อตรวจสอบเส้นทางปัจจุบัน

    return (
        <nav className="bg-primary text-primary position: fixed top-0 w-full z-10">
            <div className="flex items-center h-16 justify-between p-10">
                {/* Logo */}
                <div>
                    <a href="/" className="text-third font-bold text-xl">LOGO</a>
                </div>
                {/* Desktop Menu */}
                {location.pathname === '/' && ( // Show menu only on the Home page
                    <div className="flex-1 flex justify-center ">
                        <ul className="hidden lg:ml-[330px] md:flex md:gap-14 gap-8">
                            <li id="navbar-menu">
                                <Link to="home" smooth={true} duration={500}>Home</Link>
                            </li>
                            <li id="navbar-menu">
                                <Link to="about-me" smooth={true} duration={500}>About</Link>
                            </li>
                            <li id="navbar-menu">
                                <Link to="projects" smooth={true} duration={500}>Portfolio</Link>
                            </li>
                            <li id="navbar-menu">
                                <Link to="articles" smooth={true} duration={500}>Blog</Link>
                            </li>
                        </ul>
                    </div>
                )}
                {/* Auth Buttons */}
                <div className="md:flex justify-end items-center ml-auto hidden">
                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-blue-400 hover:underline">Log in</a>
                    <a href="#" className="px-4 py-2 rounded-md text-sm font-medium ml-3" id="navbar-menu-secondary">Sign in</a>
                </div>
                {/* Mobile Menu */}
                <div className="md:hidden flex justify-end">
                    <button className="md:hidden p-2" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Dropdown menu */}
            {showMobileMenu && (
                <div className="md:hidden bg-gray-800 absolute left-0 right-0 w-full space-y-2 z-10">
                    <div className="h-[180px] flex flex-col gap-5 justify-center p-5 shadow-md">
                        <button className="block w-full h-[48px] text-center primary-border-color border-2 rounded-full">
                            Log in
                        </button>
                        <button className="block w-full h-[48px] text-center primary-border-color border-2 text-primary rounded-full">
                            Sign up
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}