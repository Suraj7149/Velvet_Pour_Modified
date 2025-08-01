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
        const mm = gsap.matchMedia();
        const navbar = navRef.current;

         mm.add(
      {
        // Define media queries
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)",
      },
      (context) => {
        const { isMobile, isDesktop } = context.conditions;

        if (isDocked) {
          // Floating dock animation
          gsap.to(navbar, {
            borderRadius: isMobile ? "15px" : "21px",
            width: isMobile ? "95%" : "92.5%",
            top: isMobile ? "5px" : "10px",
            left: isMobile ? "10px" : "50px",
            right: isMobile ? "10px" : "50px",
            position: "fixed",
            duration: 0.6,
            ease: "power3.out",
            backdropFilter: isMobile ? "blur(20px)" : "blur(30px)",
            backgroundColor: "#45464550",
          });
        } else {
          // Full navbar animation
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
      }
    );

    return () => mm.revert(); // Cleanup matchMedia when component unmounts
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
