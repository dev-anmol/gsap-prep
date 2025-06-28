import Image from "next/image"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false })

export const Grid = () => {
    const items = new Array(12).fill(0);
    const ref = useRef<HTMLParagraphElement | null>(null);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;

        const handleEnter = () => {
            let t1 = gsap.timeline();
            t1.to('.emoji', { scale: 1.6, opacity: 1 });
            t1.to('.layer', { xPercent: -100, opacity: 1, duration: 1 })
        }

        const handleLeave = () => {
            let t1 = gsap.timeline();
            t1.to('.emoji', { scale: 1, opacity: 0 });
            t1.to('.layer', { xPercent: 100, opacity: 0, duration: 0.6 })
        }

        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#grid5',
                    start: 'top 80%',
                    end: 'top 10%',
                    scrub: true,
                    markers: true,
                }
            });

            tl.to('#grid5', { scale: 6, duration: 6 })
                .to('#grid5', { scale: 1, duration: 6 });
        });

        return () => {
            ctx.revert();
            el.removeEventListener('mouseenter', handleEnter);
            el.removeEventListener('mouseleave', handleLeave);
        } // Clean-up
    });



    return (
        <div className="w-full flex flex-col items-center justify-center mt-80 piece">
            <div className="grid grid-cols-3 gap-32">
                {
                    items.map((img, idx) => (
                        <div key={idx} className="w-fit">
                            <Image
                                id={`grid${idx + 1}`}
                                width={300}
                                height={300}
                                src={`/photo${idx + 1}.avif`} alt="grid" className="h-[200px] w-[200px]" />
                        </div>
                    ))
                }
            </div>

            <div className="w-full h-[200px] bg-neutral-500 mt-48 flex items-center justify-center">

                <div className="w-full h-full p-10 relative overflow-hidden">
                    <p className="text-center cursor-pointer text w-full h-[100px]" ref={ref}>Hover Me <span className="opacity-0 emoji">👋</span></p>
                    <p className="w-full h-full absolute inset-0 bg-neutral-700 translate-x-full layer text-center pt-10">Keep learning</p>
                </div>
            </div>
        </div>
    )
}