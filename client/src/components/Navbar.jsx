// client/src/components/Navbar.jsx
// แก้ตอนกดรีเฟรซ จังหวะรอโหลดข้อมูล user ให้ปรับปุ่มเป็น null เพราะตอนนี้เห็นปุ่ม login อยู่
import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/authentication";


export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state, logout } = useAuth(); 
  const { user, loading } = state;

  const handleLogin = () => {
    navigate("/Login");
    setShowMobileMenu(false);
  };

  const handleSignUp = () => {
    navigate("/Signup");
    setShowMobileMenu(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-primary text-primary position: fixed top-0 w-full z-10">
      <div className="flex items-center h-16 justify-between p-10">
        {/* Logo */}
        <div>
          <a href="/" className="text-third font-bold text-xl">
            LOGO
          </a>
        </div>

        {/* Desktop Menu */}
        {location.pathname === "/" && (
          <div className="flex-1 flex justify-center ">
            <ul className="lg:ml-[330px] md:flex md:gap-14 gap-8 flex">
              <li id="navbar-menu" className="cursor-pointer">
                <Link to="home" smooth={true} duration={500}>
                  Home
                </Link>
              </li>
              <li id="navbar-menu" className="cursor-pointer">
                <Link to="about-me" smooth={true} duration={500}>
                  About
                </Link>
              </li>
              <li id="navbar-menu" className="cursor-pointer">
                <Link to="projects" smooth={true} duration={500}>
                  Portfolio
                </Link>
              </li>
              <li id="navbar-menu" className="cursor-pointer">
                <Link to="articles" smooth={true} duration={500}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Auth Buttons */}
        <div className="md:flex justify-end items-center ml-auto hidden">
          {loading ? null : user ? (
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-body-3 text-[color:var(--gray-700)]">
                {user?.name}
              </span>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                  {user?.profile_pic ? (
                    <img
                      src={user.profile_pic}
                      alt="avatar"
                      className="w-[32px] h-[32px] rounded-full object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="w-[32px] h-[32px] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                      <span className="text-xs font-medium text-gray-600">
                        {user?.name}
                      </span>
                    </div>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-0 w-[164px]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-[color:var(--gray-100)] hover:text-[color:var(--gray-950)] text-body-3 text-[color:var(--gray-800)]"
                    onClick={() => navigate("/user/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-[color:var(--gray-100)] hover:text-[color:var(--gray-950)] text-body-3 text-[color:var(--gray-800)]"
                    onClick={() => navigate("/service/repair")}
                  >
                    Reset password
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-[color:var(--gray-100)] hover:text-[color:var(--gray-950)] text-body-3 text-[color:var(--gray-800)]"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                className={`btn btn--icon ${isActivate ? "activate" : ""}`}
                onClick={() => setIsActivate(!isActivate)}
                aria-pressed={isActivate}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="px-3 py-2 rounded-md text-sm font-medium text-blue-400 hover:underline cursor-pointer"
              >
                Log in
              </button>
              <button
                onClick={handleSignUp}
                className="px-4 py-2 rounded-md text-sm font-medium ml-3 cursor-pointer"
                id="navbar-menu-secondary"
              >
                Sign in
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex justify-end">
          {loading ? null : user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                  {user?.profile_pic ? (
                    <img
                      src={user.profile_pic}
                      alt="avatar"
                      className="w-[32px] h-[32px] rounded-full object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="w-[32px] h-[32px] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                      <span className="text-xs font-medium text-gray-600">
                        {user?.name}
                      </span>
                    </div>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-0 w-[164px]">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <span className="text-sm font-medium">{user?.name}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-[color:var(--gray-100)] hover:text-[color:var(--gray-950)] text-body-3 text-[color:var(--gray-800)]"
                    onClick={() => navigate("/user/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-[color:var(--gray-100)] hover:text-[color:var(--gray-950)] text-body-3 text-[color:var(--gray-800)]"
                    onClick={() => navigate("/service/repair")}
                  >
                    Reset password
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-[color:var(--gray-100)] hover:text-[color:var(--gray-950)] text-body-3 text-[color:var(--gray-800)]"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                className={`btn btn--icon ${isActivate ? "activate" : ""}`}
                onClick={() => setIsActivate(!isActivate)}
                aria-pressed={isActivate}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button
              className="md:hidden p-2 cursor-pointer"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown menu - แสดงเฉพาะเมื่อไม่มี user */}
      {showMobileMenu && !loading && !user && (
        <div className="md:hidden bg-gray-800 absolute left-0 right-0 w-full space-y-2 z-10">
          <div className="h-[180px] flex flex-col gap-5 justify-center p-5 shadow-md">
            <button
              onClick={handleLogin}
              className="block w-full h-[48px] text-center primary-border-color border-2 rounded-full cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={handleSignUp}
              className="block w-full h-[48px] text-center primary-border-color border-2 text-primary rounded-full cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
