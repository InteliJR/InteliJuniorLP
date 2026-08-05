'use client';


import { useScroll, useTransform, m } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface ImageData {
	src: string;
	alt?: string;
	date?: string;
	description?: string;
}

interface ZoomParallaxProps {

	images: ImageData[];
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
						<m.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center pointer-events-none ${index === 1 ? '[&>div]:-top-[30vh]! [&>div]:left-[5vw]! [&>div]:h-[30vh]! [&>div]:w-[35vw]!' : ''} ${index === 2 ? '[&>div]:-top-[10vh]! [&>div]:-left-[25vw]! [&>div]:h-[45vh]! [&>div]:w-[20vw]!' : ''} ${index === 3 ? '[&>div]:left-[27.5vw]! [&>div]:h-[25vh]! [&>div]:w-[25vw]!' : ''} ${index === 4 ? '[&>div]:top-[27.5vh]! [&>div]:left-[5vw]! [&>div]:h-[25vh]! [&>div]:w-[20vw]!' : ''} ${index === 5 ? '[&>div]:top-[27.5vh]! [&>div]:-left-[22.5vw]! [&>div]:h-[25vh]! [&>div]:w-[30vw]!' : ''} ${index === 6 ? '[&>div]:top-[22.5vh]! [&>div]:left-[25vw]! [&>div]:h-[15vh]! [&>div]:w-[15vw]!' : ''} `}
						>
							<div
								className="relative h-[25vh] w-[25vw] group overflow-visible pointer-events-auto"
							>
								<div
									className="absolute inset-0 overflow-hidden"
									style={{
										clipPath: 'polygon(5% 0%, 95% 0%, 100% 8%, 100% 92%, 95% 100%, 5% 100%, 0% 92%, 0% 8%)'
									}}
								>
									<Image
										src={src}
										alt={alt || `Parallax image ${index + 1}`}
										fill
										sizes={index === 0 ? "100vw" : "(max-width: 768px) 50vw, 35vw"}
										className="object-cover transition-transform duration-500 group-hover:scale-110"
										loading={index === 0 ? "eager" : "lazy"}
										priority={index === 0}
										unoptimized={index === 0}
									/>
									<div className="absolute inset-0 pointer-events-none shadow-(--shadow-inner-glass-premium)" />
									<div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80 opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
									<div className="absolute inset-0 flex flex-col justify-between p-4">
										{date && (
											<div className="self-start">
												<span className="text-2xl font-light text-white tracking-widest border-b border-primary/50 pb-1">
													{date}
												</span>
											</div>
										)}
										{description && (
											<p className="rounded-sm text-sm text-gray-200 font-light tracking-wide bg-black/50 px-2 py-1 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
												{description}
											</p>
										)}
									</div>
								</div>
								<div className="absolute inset-0 pointer-events-none">
									<svg
										className="w-full h-full"
										viewBox="0 0 100 100"
										preserveAspectRatio="none"
									>
										<path
											d="M 5 0 L 95 0 L 100 8 L 100 92 L 95 100 L 5 100 L 0 92 L 0 8 L 5 0 Z"
											vectorEffect="non-scaling-stroke"
											className="stroke-1 fill-none stroke-white/20"
										/>
									</svg>
								</div>
							</div>
						</m.div>
					);
				})}
			</div>
		</div>
	);
}
