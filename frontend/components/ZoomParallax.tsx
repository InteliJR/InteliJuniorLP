'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import GlassBackground from './GlassBackground';

interface Image {
	src: string;
	alt?: string;
	date?: string;
	description?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt, date, description }, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center pointer-events-none ${index === 1 ? '[&>div]:-top-[30vh]! [&>div]:left-[5vw]! [&>div]:h-[30vh]! [&>div]:w-[35vw]!' : ''} ${index === 2 ? '[&>div]:-top-[10vh]! [&>div]:-left-[25vw]! [&>div]:h-[45vh]! [&>div]:w-[20vw]!' : ''} ${index === 3 ? '[&>div]:left-[27.5vw]! [&>div]:h-[25vh]! [&>div]:w-[25vw]!' : ''} ${index === 4 ? '[&>div]:top-[27.5vh]! [&>div]:left-[5vw]! [&>div]:h-[25vh]! [&>div]:w-[20vw]!' : ''} ${index === 5 ? '[&>div]:top-[27.5vh]! [&>div]:-left-[22.5vw]! [&>div]:h-[25vh]! [&>div]:w-[30vw]!' : ''} ${index === 6 ? '[&>div]:top-[22.5vh]! [&>div]:left-[25vw]! [&>div]:h-[15vh]! [&>div]:w-[15vw]!' : ''} `}
						>
							<div className="relative h-[25vh] w-[25vw] group overflow-hidden rounded-sm shadow-[0_0_30px_rgba(255,77,58,0.25)] bg-black/20 pointer-events-auto">
								<img
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									className="h-full w-full rounded-sm object-cover border border-white/20 transition-transform duration-500 group-hover:scale-110"
								/>
								{/* Efeito elegante de sombra interna */}
								<div className="absolute inset-0 rounded-sm pointer-events-none shadow-[var(--shadow-inner-glass-premium)]" />
								<div className="absolute inset-0 rounded-sm bg-linear-to-b from-black/60 via-transparent to-black/80 opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
								<div className="absolute inset-0 flex flex-col justify-between p-4">
									{date && (
										<div className="self-start">
											<span className="text-2xl font-light text-white tracking-widest border-b border-primary/50 pb-1">
												{date}
											</span>
										</div>
									)}
									{description && (
										<p className="rounded-sm text-sm text-gray-200 font-light tracking-wide translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
											{description}
										</p>
									)}
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
