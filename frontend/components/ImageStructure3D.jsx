import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const POINTER_IDLE_TIMEOUT = 600;
const POINTER_SMOOTHING = 0.08;
const POINTER_MAX_X = 0.6;
const POINTER_MAX_Y = 0.4;
const AUTO_ROTATION_SPEED = 0.0035;
const STRUCTURE_SCALE = 0.76;
const STRUCTURE_Y_STRETCH = 1.12;
const CAMERA_FOV = 56;
const CAMERA_POSITION = { x: 5.4, y: 0.95, z: 11.5 };
const CAMERA_FOCUS_POINT = { x: 0.4, y: 0.2, z: 0 };
const STRUCTURE_ROOT_OFFSET = { x: 7.8, y: -1.7, z: 0.25 };
const DRAG_SENSITIVITY = 0.009;

const ImageStructure3D = ({ className = "" }) => {
    const mountRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const sceneRef = useRef(null);
    const structureRef = useRef(null);
    const animationFrameIdRef = useRef(null);

    const [isRotating, setIsRotating] = useState(false);
    const isRotatingRef = useRef(false);

    const pointerTargetRef = useRef({ x: 0, y: 0 });
    const pointerRotationRef = useRef({ x: 0, y: 0 });
    const autoRotationRef = useRef(0);
    const pointerActiveRef = useRef(false);
    const pointerIdleTimeoutRef = useRef(null);
    const pointerDownRef = useRef(false);
    const pointerLastPositionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        isRotatingRef.current = isRotating;
    }, [isRotating]);

    useEffect(() => {
        const mountElement = mountRef.current;
        if (!mountElement) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsRotating(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(mountElement);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const mountElement = mountRef.current;
        if (!mountElement) {
            return;
        }

        const scene = new THREE.Scene();
        scene.background = null;
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            CAMERA_FOV,
            mountElement.clientWidth / mountElement.clientHeight,
            0.1,
            1000
        );
        camera.position.set(
            CAMERA_POSITION.x,
            CAMERA_POSITION.y,
            CAMERA_POSITION.z
        );
        camera.lookAt(
            CAMERA_FOCUS_POINT.x,
            CAMERA_FOCUS_POINT.y,
            CAMERA_FOCUS_POINT.z
        );
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.backgroundColor = "transparent";
        mountElement.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const ambientLight = new THREE.AmbientLight(0x000, 0.25);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0x000, 1.25);
        mainLight.position.set(6.5, 7, 5.2);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.set(2048, 2048);
        scene.add(mainLight);

        const warmFill = new THREE.DirectionalLight(0xff6f9b, 0.6);
        warmFill.position.set(-5, -2.5, -4.5);
        scene.add(warmFill);

        const coolFill = new THREE.DirectionalLight(0x6aa6ff, 0.75);
        coolFill.position.set(4.5, 3.2, 6);
        scene.add(coolFill);

        const rimLight = new THREE.DirectionalLight(0xd7e1ff, 0.55);
        rimLight.position.set(-7.5, 4.5, 3.5);
        scene.add(rimLight);

        const rootGroup = new THREE.Group();
        rootGroup.position.set(
            STRUCTURE_ROOT_OFFSET.x,
            STRUCTURE_ROOT_OFFSET.y,
            STRUCTURE_ROOT_OFFSET.z
        );
        scene.add(rootGroup);

        const structure = new THREE.Group();
        structureRef.current = structure;
        structure.scale.set(
            STRUCTURE_SCALE,
            STRUCTURE_SCALE * STRUCTURE_Y_STRETCH,
            STRUCTURE_SCALE
        );
        rootGroup.add(structure);

        const regularSphereGeometry = new THREE.SphereGeometry(0.22, 42, 42);
        const largeSphereGeometry = new THREE.SphereGeometry(0.27, 52, 52);
        const cylinderRadius = 0.08;

        const sphereMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xf5f5ff,
            metalness: 0.15,
            roughness: 0.25,
            clearcoat: 0.85,
            clearcoatRoughness: 0.1,
            reflectivity: 0.8,
            transmission: 0.08,
            thickness: 0.08,
        });

        const largeSphereMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.07,
            roughness: 0.12,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            reflectivity: 0.95,
            emissive: 0x1a1a1a,
            emissiveIntensity: 0.12,
        });

        const cylinderMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xe6e6f2,
            metalness: 0.35,
            roughness: 0.38,
            clearcoat: 0.65,
            clearcoatRoughness: 0.2,
            reflectivity: 0.75,
        });

        const vertices = [
            new THREE.Vector3(0, 2.2, 0.4),
            new THREE.Vector3(1.9, 1.1, -0.02),
            new THREE.Vector3(1.9, -1.1, 0.4),
            new THREE.Vector3(0, -2.2, -0.02),
            new THREE.Vector3(-1.9, -1.1, 0.4),
            new THREE.Vector3(-1.9, 1.1, -0.02),
            new THREE.Vector3(0.95, 0.55, -0.7),
            new THREE.Vector3(-0.35, -0.3, 1.2),
        ];

        vertices.forEach((vertex) => {
            const isForwardFacing = vertex.z > 0;
            const geometry = isForwardFacing ? largeSphereGeometry : regularSphereGeometry;
            const material = isForwardFacing ? largeSphereMaterial : sphereMaterial;

            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.copy(vertex);
            sphere.castShadow = true;
            sphere.receiveShadow = true;

            structure.add(sphere);
        });

        const edges = [
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

        edges.forEach(([from, to]) => {
            const start = vertices[from];
            const end = vertices[to];
            const distance = start.distanceTo(end);

            const geometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, distance, 20);
            const cylinder = new THREE.Mesh(geometry, cylinderMaterial);

            cylinder.position.copy(start).add(end).divideScalar(2);
            cylinder.quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3().subVectors(end, start).normalize()
            );
            cylinder.castShadow = true;
            cylinder.receiveShadow = true;

            structure.add(cylinder);
        });

        structure.rotation.y = Math.PI * 0.24;
        structure.rotation.x = -0.18;
        autoRotationRef.current = structure.rotation.y;

        const syncAutoRotationToStructure = () => {
            if (!structureRef.current) {
                return;
            }
            autoRotationRef.current =
                structureRef.current.rotation.y - pointerRotationRef.current.x;
        };

        const resetPointerIdleTimer = () => {
            if (pointerIdleTimeoutRef.current) {
                clearTimeout(pointerIdleTimeoutRef.current);
            }

            pointerIdleTimeoutRef.current = setTimeout(() => {
                syncAutoRotationToStructure();
                pointerActiveRef.current = false;
                pointerTargetRef.current.x = 0;
                pointerTargetRef.current.y = 0;
            }, POINTER_IDLE_TIMEOUT);
        };

        const handlePointerDown = (event) => {
            if (!renderer.domElement) {
                return;
            }

            renderer.domElement.setPointerCapture?.(event.pointerId);

            pointerDownRef.current = true;
            pointerActiveRef.current = true;
            pointerLastPositionRef.current.x = event.clientX;
            pointerLastPositionRef.current.y = event.clientY;
            pointerTargetRef.current.x = pointerRotationRef.current.x;
            pointerTargetRef.current.y = pointerRotationRef.current.y;

            syncAutoRotationToStructure();
            resetPointerIdleTimer();
        };

        const handlePointerMove = (event) => {
            if (!renderer.domElement) {
                return;
            }

            const rect = renderer.domElement.getBoundingClientRect();
            const normX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const normY = ((event.clientY - rect.top) / rect.height) * 2 - 1;

            if (pointerDownRef.current) {
                const deltaX = event.clientX - pointerLastPositionRef.current.x;
                const deltaY = event.clientY - pointerLastPositionRef.current.y;

                pointerLastPositionRef.current.x = event.clientX;
                pointerLastPositionRef.current.y = event.clientY;

                pointerTargetRef.current.x = THREE.MathUtils.clamp(
                    pointerTargetRef.current.x + deltaX * DRAG_SENSITIVITY,
                    -POINTER_MAX_X,
                    POINTER_MAX_X
                );
                pointerTargetRef.current.y = THREE.MathUtils.clamp(
                    pointerTargetRef.current.y + deltaY * DRAG_SENSITIVITY,
                    -POINTER_MAX_Y,
                    POINTER_MAX_Y
                );
            } else {
                pointerTargetRef.current.x = THREE.MathUtils.clamp(normX, -1, 1) * POINTER_MAX_X;
                pointerTargetRef.current.y = THREE.MathUtils.clamp(normY, -1, 1) * POINTER_MAX_Y;
            }

            if (!pointerActiveRef.current) {
                syncAutoRotationToStructure();
            }

            pointerActiveRef.current = true;
            resetPointerIdleTimer();
        };

        const handlePointerUp = (event) => {
            if (renderer.domElement?.hasPointerCapture?.(event.pointerId)) {
                renderer.domElement.releasePointerCapture(event.pointerId);
            }

            pointerDownRef.current = false;
            resetPointerIdleTimer();
        };

        const handlePointerLeave = () => {
            syncAutoRotationToStructure();
            pointerActiveRef.current = false;
            pointerTargetRef.current.x = 0;
            pointerTargetRef.current.y = 0;
            pointerDownRef.current = false;
        };

        const handleResize = () => {
            if (!rendererRef.current || !cameraRef.current || !mountRef.current) {
                return;
            }

            const { clientWidth, clientHeight } = mountRef.current;

            rendererRef.current.setSize(clientWidth, clientHeight);
            cameraRef.current.aspect = clientWidth / clientHeight;
            cameraRef.current.updateProjectionMatrix();
            cameraRef.current.lookAt(
                CAMERA_FOCUS_POINT.x,
                CAMERA_FOCUS_POINT.y,
                CAMERA_FOCUS_POINT.z
            );
        };

        renderer.domElement.addEventListener("pointerdown", handlePointerDown);
        renderer.domElement.addEventListener("pointermove", handlePointerMove);
        renderer.domElement.addEventListener("pointerup", handlePointerUp);
        renderer.domElement.addEventListener("pointercancel", handlePointerUp);
        renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
        window.addEventListener("resize", handleResize);

        const animate = () => {
            animationFrameIdRef.current = requestAnimationFrame(animate);

            if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
                return;
            }

            const structureGroup = structureRef.current;

            if (structureGroup && isRotatingRef.current) {
                if (pointerActiveRef.current) {
                    pointerRotationRef.current.x +=
                        (pointerTargetRef.current.x - pointerRotationRef.current.x) * POINTER_SMOOTHING;
                    pointerRotationRef.current.y +=
                        (pointerTargetRef.current.y - pointerRotationRef.current.y) * POINTER_SMOOTHING;
                } else {
                    pointerRotationRef.current.x *= 0.92;
                    pointerRotationRef.current.y *= 0.9;
                    autoRotationRef.current += AUTO_ROTATION_SPEED;
                }

                structureGroup.rotation.y =
                    autoRotationRef.current + pointerRotationRef.current.x;

                const targetX = THREE.MathUtils.clamp(pointerRotationRef.current.y, -0.6, 0.6);
                structureGroup.rotation.x = THREE.MathUtils.lerp(
                    structureGroup.rotation.x,
                    targetX,
                    0.12
                );

            }

            rendererRef.current.render(sceneRef.current, cameraRef.current);
        };

        animate();

        return () => {
            if (pointerIdleTimeoutRef.current) {
                clearTimeout(pointerIdleTimeoutRef.current);
            }

            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }

            window.removeEventListener("resize", handleResize);

            renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
            renderer.domElement.removeEventListener("pointermove", handlePointerMove);
            renderer.domElement.removeEventListener("pointerup", handlePointerUp);
            renderer.domElement.removeEventListener("pointercancel", handlePointerUp);
            renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);

            if (mountElement.contains(renderer.domElement)) {
                mountElement.removeChild(renderer.domElement);
            }

            structure.traverse((object) => {
                if (object.isMesh) {
                    object.geometry.dispose();

                    if (Array.isArray(object.material)) {
                        object.material.forEach((material) => material.dispose());
                    } else if (object.material) {
                        object.material.dispose();
                    }
                }
            });

            renderer.dispose();
            scene.clear();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className={`isolate w-full ${className}`}
        />
    );
};

export default ImageStructure3D;

