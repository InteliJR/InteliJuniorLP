"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  m,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-32 md:pb-48">
        {data.map((item, index) => (
          <m.div
            key={index}
            className="flex justify-start pt-10 lg:pt-40 lg:gap-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
          >
            <m.div
              className="sticky flex flex-col lg:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm lg:w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.15 + 0.2 }}
            >
              <div className="h-10 absolute left-3 lg:left-3 w-10 bg-black flex items-center justify-center border border-white/10 rotate-45">
                <div className="h-4 w-4 bg-primary/20 border border-primary p-2 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
              </div>
              <div className="hidden lg:flex items-center gap-4 lg:pl-20">
                <h3 className="text-xl md:text-5xl font-bold text-white">
                  {item.title}
                </h3>
                <div className="h-px flex-1 bg-linear-to-r from-primary/40 to-transparent max-w-24" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary/20 rotate-45" />
                  <div className="w-2 h-2 bg-primary/40 rotate-45" />
                  <div className="w-2 h-2 bg-primary/60 rotate-45" />
                </div>
              </div>
            </m.div>

            <m.div
              className="relative pl-20 pr-4 lg:pl-4 w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 + 0.3 }}
            >
              <h3 className="lg:hidden block text-2xl mb-4 text-left font-bold text-white/20">
                {item.title}
              </h3>
              {item.content}{" "}
            </m.div>
          </m.div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-0.5 bg-linear-to-b from-transparent from-0% via-neutral-200 dark:via-neutral-700 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <m.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-0.5 bg-linear-to-t from-primary via-primary/50 to-transparent from-0% via-10% "
          />
        </div>
      </div>
    </div>
  );
};
