import { Github } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { AtSign } from 'lucide-react';
import { Instagram } from 'lucide-react';

export function Herosection() {
  return (
    <section>
        <div className="flex flex-col items-center md:flex-row gap-20 px-15 mt-20">
            {/* Left Content */}
            <div className="">
                <img src="\public\IMG\profileHome.png" alt="" 
                    className="w-full md:w-xl object-cover "/>
            </div>
            
            {/* right content */}
            <div className="w-full md:w-1/2">
                <h1 className="text-[40px] xl:text-[52px] flex text-white">Hi, it's <span className="text-blue-500 ml-2">Prachaya</span></h1>
                <h3 className="text-[30px] xl:text-[40px] flex text-white">I'm a <span className="text-blue-500 ml-2">web developer</span></h3>
                <p className="text-white pt-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque rem assumenda aut expedita adipisci nam exercitationem similique. Maxime enim est assumenda, officiis neque cum odit culpa quis tempore facilis saepe?</p>
                <div className='flex gap-5 pt-10'>
                    <a href="#" className="text-blue-600"><Linkedin /></a>
                    <a href="#" className="text-blue-600"><Github /></a>
                    <a href="#" className="text-blue-600"><AtSign /></a>
                    <a href="#" className="text-blue-600"><Instagram /></a>
                </div>
                <button className="text-blue-600 mt-8 w-32 h-10 rounded-3xl border-blue-600 border-2">Hire Me</button>
            </div>
        </div>
    </section>
  );
}

export function Footer() {
    return (
        <>
            <div className='flex justify-center text-center mt-20'>
                <p className='w-2xl text-sm' id='footer-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='flex gap-5 py-6 justify-center'>
                <a href="#" className="text-blue-600"><Linkedin /></a>
                <a href="#" className="text-blue-600"><Github /></a>
                <a href="#" className="text-blue-600"><AtSign /></a>
                <a href="#" className="text-blue-600"><Instagram /></a>
            </div>
            
        </>
    )
}





           