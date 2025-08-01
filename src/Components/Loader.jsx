import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader({ onFinish }) {
  const liquidRef = useRef(null);
  const glassRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1.7; // Duration of the pouring animation
    // Timeline for pouring animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide loader after animation
        gsap.to(glassRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: onFinish,
        });
      },
    });

    // Liquid fill animation
    tl.fromTo(
      liquidRef.current,
      { height: "0%" },
      { height: "100%", 
        duration: duration, 
        ease: "power2.inOut",
        onUpdate: () => {
          // Calculate progress dynamically
          const progressValue = Math.round(tl.progress() * 100);
          setProgress(progressValue);
        }, 
    }
    )
    // Optional "bouncing" liquid effect
    // .to(liquidRef.current, {
    //   height: "90%",
    //   duration: 0.3,
    //   yoyo: true,
    //   repeat: 1,
    // });

  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#0d0d0d",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        flexDirection: "column",
        color: "white",
      }}
    >
      {/* Glass */}
      <div
        ref={glassRef}
        style={{
          width: "120px",
          height: "200px",
          border: "4px solid #fff",
          borderRadius: "5px 5px 60px 60px",
          position: "relative",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        {/* Liquid */}
        <div
          ref={liquidRef}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "0%",
            background: "linear-gradient(180deg, #76f188ff, #036f10ff)",
            // transition: "height 0.3s",
          }}
        />
      </div>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: '#76f188f'}}>
        {progress}%
      </div>
    </div>
  );
}
