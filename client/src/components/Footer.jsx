import { Github ,Linkedin, Instagram, AtSign } from 'lucide-react';

function Footer() {
    return (
        <>
            <div className='flex justify-center text-center mt-20'>
                <p className='text-fourth w-2xl text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='flex gap-5 py-6 justify-center'>
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
        </>
    )
}

export default Footer;