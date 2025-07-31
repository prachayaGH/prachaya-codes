import { Github ,Linkedin, Instagram, AtSign } from 'lucide-react';
import profileHome from '@/assets/IMG/profileHome.png'

export function Herosection() {
  return (
    <section className="pt-20 ">
        <div className="flex flex-col items-center md:flex-row gap-20 px-15 slide-in-down">
            {/* Left Content */}
            <div>
                <img src={profileHome} alt={profileHome}  
                    className="w-full md:w-xl object-cover"/>
            </div>
            
            {/* right content */}
            <div className="w-full md:w-1/2">
                <h1 className="text-[40px] xl:text-[52px] flex text-primary">Hi, it's <span className="text-third ml-2">Prachaya</span></h1>
                <h3 className="sub-heading flex">I'm a <span className="text-third ml-2">web developer</span></h3>
                <p className="text-primary pt-2">Full-Stack Developer with strong skills in JavaScript, TypeScript, React, Next.js, and FastAPI. Passionate about building user-focused web apps and RESTful APIs. Completed an intensive full-stack bootcamp with several hands-on projects. Eager to grow in a real-world development team environment.</p>
                <div className='flex gap-5 pt-10'>
                    <a  href="https://www.linkedin.com/in/prachaya-kosolpattrapak-286654326/" 
                        className="text-third"
                        target='_blank'
                        ><Linkedin /></a>
                    <a  href="https://github.com/prachayaGH" 
                        className="text-third"
                        target='_blank'
                        ><Github /></a>
                    <a href="mailto:prachaya.ksp@gmail.com" className="text-third"><AtSign /></a>
                    <a href="#" className="text-third"><Instagram /></a>
                </div>
                <button className="text-third mt-8 w-32 h-10 rounded-3xl primary-border-color border-2">Hire Me</button>
            </div>
            
        </div>
    </section>
  );
}







           