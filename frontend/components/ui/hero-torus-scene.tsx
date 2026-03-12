'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type HeroTorusSceneProps = {
    className?: string;
};

class SpiralEdgeCurve extends THREE.Curve<THREE.Vector3> {
    start: THREE.Vector3;
    end: THREE.Vector3;
    normal: THREE.Vector3;
    binormal: THREE.Vector3;
    turns: number;
    amplitude: number;

    constructor(start: THREE.Vector3, end: THREE.Vector3, turns: number, amplitude: number) {
        super();
        this.start = start.clone();
        this.end = end.clone();
        const tangent = new THREE.Vector3().subVectors(this.end, this.start).normalize();
        const helper = Math.abs(tangent.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
        this.normal = new THREE.Vector3().crossVectors(tangent, helper).normalize();
        this.binormal = new THREE.Vector3().crossVectors(tangent, this.normal).normalize();
        this.turns = turns;
        this.amplitude = amplitude;
    }

    getPoint(t: number, optionalTarget = new THREE.Vector3()): THREE.Vector3 {
        const base = this.start.clone().lerp(this.end, t);
        const angle = t * Math.PI * 2 * this.turns;
        const sinSign = Math.sign(Math.sin(angle)) || 0;
        const cosSign = Math.sign(Math.cos(angle)) || 0;
        const offset = this.normal
            .clone()
            .multiplyScalar(sinSign * this.amplitude)
            .add(this.binormal.clone().multiplyScalar(cosSign * this.amplitude * 0.35));
        return optionalTarget.copy(base.add(offset));
    }
}

export function HeroTorusScene({ className }: HeroTorusSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || initializedRef.current) return;

        initializedRef.current = true;

        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches;
        const isSmallViewport = window.matchMedia("(max-width: 768px)").matches;
        const useMobileProfile = isTouchDevice || isSmallViewport;

        const sizeMultiplier = useMobileProfile ? 1.02 : 1.24;
        const tubeSegments = useMobileProfile ? 8 : 12;
        const tubeRadialSegments = useMobileProfile ? 3 : 5;
        const nodeDetail = useMobileProfile ? 0 : 1;
        const maxPixelRatio = useMobileProfile ? 1.2 : 1.8;
        const targetFrameMs = isTouchDevice ? 1000 / 30 : 1000 / 60;
        const pointerInfluence = useMobileProfile ? 0.16 : 0.28;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xff4d3a, 0.012);

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || window.innerHeight;

        const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
        camera.position.z = 32;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
        renderer.setSize(width, height);
        renderer.setClearColor(0xff4d3a, 0);
        container.appendChild(renderer.domElement);

        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            emissive: 0x6b2f25,
            metalness: 0.45,
            roughness: 0.08,
            wireframe: true,
            transparent: true,
            opacity: 0.34,
        });

        const logoGroup = new THREE.Group();
        scene.add(logoGroup);

        const scale = 4.2 * sizeMultiplier;
        const edgeRadius = 0.32 * sizeMultiplier * 2;
        const nodeRadius = edgeRadius * 1.4;

        const baseVertices = [
            new THREE.Vector3(0, 2.2, 0.4),
            new THREE.Vector3(1.9, 1.1, -0.02),
            new THREE.Vector3(1.9, -1.1, 0.4),
            new THREE.Vector3(0, -2.2, -0.02),
            new THREE.Vector3(-1.9, -1.1, 0.4),
            new THREE.Vector3(-1.9, 1.1, -0.02),
            new THREE.Vector3(0.95, 0.55, -0.7),
            new THREE.Vector3(-0.35, -0.3, 1.2),
        ];

        const vertices = baseVertices.map((v) => v.clone().multiplyScalar(scale));

        const edges: Array<[number, number]> = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
            [5, 0],
            [0, 4],
            [0, 7],
            [0, 6],
            [6, 2],
            [4, 2],
            [4, 7],
            [7, 2],
            [7, 6],
        ];

        const nodeGeometry = new THREE.IcosahedronGeometry(nodeRadius, nodeDetail);
        const edgeGeometries: THREE.BufferGeometry[] = [];

        vertices.forEach((vertex) => {
            const node = new THREE.Mesh(nodeGeometry, material);
            node.position.copy(vertex);
            node.castShadow = false;
            node.receiveShadow = false;
            logoGroup.add(node);
        });

        edges.forEach(([from, to]) => {
            const start = vertices[from];
            const end = vertices[to];

            const curve = new SpiralEdgeCurve(start, end, 0.2, edgeRadius * 0.18);
            const tubeGeometry = new THREE.TubeGeometry(curve, tubeSegments, edgeRadius, tubeRadialSegments, false);
            edgeGeometries.push(tubeGeometry);

            const edge = new THREE.Mesh(tubeGeometry, material);
            edge.castShadow = false;
            edge.receiveShadow = false;
            logoGroup.add(edge);
        });

        const baseRotationX = -0.22;
        const baseRotationY = Math.PI * 0.22;
        logoGroup.rotation.y = baseRotationY;
        logoGroup.rotation.x = baseRotationX;

        let mouseX = 0;
        let mouseY = 0;

        const handlePointerMove = (event: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX = (event.clientX - innerWidth / 2) / innerWidth;
            mouseY = (event.clientY - innerHeight / 2) / innerHeight;
        };

        const clock = new THREE.Clock();
        let animationId = 0;
        let lastFrameTime = 0;

        const renderFrame = (timestamp = 0) => {
            if (timestamp - lastFrameTime < targetFrameMs) {
                animationId = requestAnimationFrame(renderFrame);
                return;
            }

            lastFrameTime = timestamp;
            const elapsed = clock.getElapsedTime();
            // Keep motion in a bounded orbit to avoid ugly edge-on profiles.
            logoGroup.rotation.x = baseRotationX + Math.sin(elapsed * 0.48) * 0.16 + mouseY * pointerInfluence;
            logoGroup.rotation.y = baseRotationY + Math.cos(elapsed * 0.62) * 0.24 + mouseX * pointerInfluence;

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(renderFrame);
        };

        const startLoop = () => {
            if (animationId) return;
            clock.start();
            lastFrameTime = 0;
            animationId = requestAnimationFrame(renderFrame);
        };

        const stopLoop = () => {
            if (!animationId) return;
            cancelAnimationFrame(animationId);
            animationId = 0;
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startLoop();
                } else {
                    stopLoop();
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(container);
        startLoop();

        const handleResize = () => {
            width = container.clientWidth || window.innerWidth;
            height = container.clientHeight || window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
            renderer.setSize(width, height);
        };

        window.addEventListener("resize", handleResize);
        if (!isTouchDevice) {
            window.addEventListener("mousemove", handlePointerMove);
        }

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
            if (!isTouchDevice) {
                window.removeEventListener("mousemove", handlePointerMove);
            }
            stopLoop();
            renderer.dispose();
            material.dispose();
            nodeGeometry.dispose();
            edgeGeometries.forEach((geo) => geo.dispose());
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "absolute inset-0 pointer-events-none overflow-hidden",
                className,
            )}
            aria-hidden="true"
        />
    );
}

export default HeroTorusScene;
