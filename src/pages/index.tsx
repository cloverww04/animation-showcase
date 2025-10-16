"use client";

import { useLayoutEffect, useRef } from "react";
import Typed from "typed.js";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Home() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const fadeRefs = useRef<HTMLDivElement[]>([]);
  const floatingRefs = useRef<HTMLDivElement[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // Typed.js hero animation
  useLayoutEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          "Welcome to my animation showcase!",
          "Built with Next.js + Tailwind ✨",
        ],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true,
      });
      return () => typed.destroy();
    }
  }, []);

  // GSAP scroll-triggered animations
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const loadGsap = async () => {
      const gsap = (await import("gsap")).gsap;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Fade-in sections
      fadeRefs.current.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Floating boxes
      floatingRefs.current.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: -50, rotation: -10 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Play videos when in view
      videoRefs.current.forEach((video) => {
        ScrollTrigger.create({
          trigger: video,
          start: "top 80%",
          onEnter: () => video.play(),
          onLeaveBack: () => video.pause(),
        });
      });
    };

    loadGsap();
  }, []);

  const colors = ["bg-gray-800", "bg-gray-700", "bg-gray-600"];

  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">
      {/* Particles background */}
      <ParticlesBackground />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 bg-black bg-opacity-70">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span ref={typedRef}></span>
        </h1>
        <p className="text-xl md:text-2xl opacity-80">
          Scroll down to see the animations 👇
        </p>
      </section>

      {/* Section 1: Fade-in text */}
      <section
        ref={(el) => {
          if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
        }}
        className={`h-screen flex items-center justify-center px-4 ${colors[0]}`}
      >
        <div className="max-w-xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Fading Text Section
          </h2>
          <p className="text-lg opacity-80">
            This section fades in as you scroll. Customize with images, buttons, or text.
          </p>
        </div>
      </section>

      {/* Section 2: Floating box */}
      <section
        ref={(el) => {
          if (el && !floatingRefs.current.includes(el)) floatingRefs.current.push(el);
        }}
        className={`h-screen flex items-center justify-center px-4 ${colors[1]}`}
      >
        <div className="w-40 h-40 bg-pink-500 rounded-lg shadow-lg flex items-center justify-center text-white text-xl font-bold">
          Floating Box
        </div>
      </section>

      {/* Section 3: Video */}
      <section
        className={`h-screen flex items-center justify-center px-4 ${colors[2]}`}
      >
        <video
          ref={(el) => {
            if (el && !videoRefs.current.includes(el)) videoRefs.current.push(el);
          }}
          src="/sample-video.mp4"
          muted
          playsInline
          className="w-3/4 rounded-lg shadow-lg"
        />
      </section>
    </main>
  );
}
