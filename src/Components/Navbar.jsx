import React, { useEffect, useRef, useState } from "react";
import { navLinks } from '../../Constants/index.js';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const Navbar = () => {
    const navRef = useRef(null);
    const [isDocked, setIsDocked] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        // Dock navbar after 150px scroll
        if (window.scrollY > 150 && !isDocked) {
            setIsDocked(true);
        } else if (window.scrollY <= 150 && isDocked) {
            setIsDocked(false);
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isDocked]);

    useGSAP(()=>{
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: "bottom top"
            }
        });

        navTween.fromTo('nav', {backgroundColor: 'transparent'}, {
            backgroundColor: '#00000050', 
            backgroundFilter: 'blur(5px)',
            ease: 'power1.inOut',
            duration: 1
        });
         
    });

    useEffect(() => {
        const navbar = navRef.current;

        if (isDocked) {
        // Animate to floating dock
        gsap.to(navbar, {
            borderRadius: "21px",
            width: "92.5%",
            top: "10px",
            left: "50px",
            right: "50px",
            position: "fixed",
            duration: 0.6,
            ease: "power3.out",
            backgroundFilter: 'blur(50px)',
            // backgroundColor: "#214d2650",
        });
        } else {
        // Animate back to full navbar
        gsap.to(navbar, {
            backgroundColor: "transparent",
            width: "100%",
            borderRadius: "0px",
            top: "0px",
            left: "0px",
            position: "fixed",
            duration: 0.6,
            ease: "power3.out",
        });
        }
    }, [isDocked]);

    


  return (
    <nav ref={navRef} classname = "navbar-updated">
        <div>
            <a href="#home" className='flex items-center gap-2'>
                <img src="/images/logo.png" alt="logo" />
                <p>Velvet Pour</p>
            </a>

            <ul>
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                ))}
             
                
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
