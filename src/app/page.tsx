'use client'


import { Grid } from "@/components/Grid";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React, { useRef } from "react";

export default function Home() {


  const comp = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
        delay: 0
      }).from(["#title-1", "#title-2", "#title-3"], {
        opacity: 0,
        y: "+=30",
        stagger: 0.5
      }).to(["#title-1", "#title-2", "#title-3"], {
        opacity: 0,
        y: "-=30",
        delay: 0.3,
        stagger: 0.5
      }).to("#intro-slider", {
        xPercent: "100",
        duration: 1.3,
      })
    }, comp);


    return () => ctx.revert();
  }, [])

  return (
    <React.Fragment>
      <div className="relative overflow-hidden" ref={comp}>
        <div
          id="intro-slider"
          className="h-screen p-10 bg-gray-50 absolute top-0 left-0 text-black/90 z-10 w-full flex flex-col gap-10 tracking-tight"
        >
          <h1 className="text-9xl" id="title-1">
            Software Engineer
          </h1>
          <h1 className="text-9xl" id="title-2">
            Designer
          </h1>
          <h1 className="text-9xl" id="title-3">
            Freelancer
          </h1>
        </div>
        <div className="h-screen flex bg-gray-950 justify-center place-items-center">
          <h1
            id="welcome"
            className="text-9xl font-bold text-gray-100 hover:text-stone-400 transition-colors duration-300"
          >
            Welcome.
          </h1>
        </div>
      </div>

      <Grid />

    </React.Fragment>
  );
}
