import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, SplitText);
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Cocktails from './Components/Cocktails';
import About from './Components/About';
import Art from './Components/Art';
import Menu from './Components/Menu';
import Contact from './Components/Contact';
import Loader from './Components/Loader';


const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      {loading && <Loader onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          <Navbar />
          <Hero />
          <Cocktails />
          <About />
          <Art />
          <Menu />
          <Contact />
        </>
      )}
    </main>
  )
}

export default App
