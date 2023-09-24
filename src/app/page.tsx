"use client";
import Button from "@/components/Button/Button";
import { useWindowSize } from "@/hooks/useWindowSize";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect } from "react";

export default function Home() {
    const x = useMotionValue(200);
    const y = useMotionValue(200);

    const springX = useSpring(x, { stiffness: 300, damping: 100 });
    const springY = useSpring(y, { stiffness: 300, damping: 100 });

    // const { innerWidth: w, innerHeight: h } = window;
    const { width: w, height: h } = useWindowSize();

    const translateX1 = useTransform(springX, [0, w], ["0%", "-2%"]);
    const translateY1 = useTransform(springY, [0, h], ["0%", "-2%"]);

    const translateX2 = useTransform(springX, [0, w], ["5%", "-6%"]);
    const translateY2 = useTransform(springY, [0, h], ["6%", "-10%"]);

    const handleMouseMove = useCallback(
        (event: any) => {
            const { pageX, pageY } = event;

            x.set(pageX);
            y.set(pageY);
        },
        [x, y]
    );

    useEffect(() => {
        const motionEvent: any = window.addEventListener("devicemotion", function (event: any) {
            const accX = event.accelerationIncludingGravity.x;
            const accY = event.accelerationIncludingGravity.y * -1;
            const isLandscape = window.matchMedia("(orientation: landscape)").matches;

            // adjust to replicate mouse movement values
            let pageX = (accX / 10) * w + w / 2;
            let pageY = (accY / 10) * h + h / 2;

            if (isLandscape) {
                // swap values
                [pageX, pageY] = [pageY, pageX];
            }

            x.set(pageX);
            y.set(pageY);
        });

        return () => {
            window.removeEventListener("devicemotion", motionEvent);
        };
    }, [h, w, x, y]);

    return (
        <main
            className="flex min-h-screen items-center justify-between p-6 sm:p-24"
            onMouseMove={handleMouseMove}
        >
            <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                <div className="flex flex-col items-start sm:w-1/2">
                    <h2 className="mb-4 text-4xl font-bold leading-snug">Employee Performance Management</h2>
                    <p className="mb-10 text-lg text-slate-600">
                        With the acquisition of Weekly10, you can now empower your employees to take ownership of their performance and development with the
                        user-friendly check-in system. Effortlessly establish goals, align expectations, and track progress, while enabling managers to
                        proactively guide overall employee engagement and productivity.
                    </p>

                    <Button />
                </div>
                <div className="relative aspect-video w-full text-center sm:w-1/2">
                    <motion.img
                        // initial={{ y: 100, opacity: 0 }}
                        // animate={{ y: 0, opacity: 1 }}
                        transition={{ ease: "easeOut", duration: 2 }}
                        src={"/images/background.png"}
                        className="absolute left-0 top-0 h-full w-full transform-gpu object-cover"
                        style={{
                            translateX: translateX1,
                            translateY: translateY1,
                        }}
                    />
                    <motion.img
                        transition={{ ease: "easeOut", duration: 2 }}
                        src={"/images/ui-elements.png"}
                        className="absolute left-0 top-0 h-full w-full transform-gpu object-cover"
                        style={{
                            translateX: translateX2,
                            translateY: translateY2,
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
