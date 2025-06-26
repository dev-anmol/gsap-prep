import Image from "next/image"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false })

export const Grid = () => {
    const items = new Array(12).fill(0);



    useGSAP(() => {
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
                .to('#grid5', { scale: 1, duration: 6 }); // Zoom out
        });

        return () => ctx.revert(); // Clean-up
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

            <div>

            </div>
        </div>
    )
}