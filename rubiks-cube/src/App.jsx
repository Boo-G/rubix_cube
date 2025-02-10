import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function App() {
    useEffect(() => {
        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create a Rubik's Cube
        const rubikGroup = new THREE.Group();
        const cubeSize = 1;
        const spacing = 1.05;

        const colors = [
            0xff0000, // Red
            0x00ff00, // Green
            0x0000ff, // Blue
            0xffff00, // Yellow
            0xffa500, // Orange
            0xffffff, // White
        ];

        function createMiniCube(x, y, z) {
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            const materials = [
                new THREE.MeshBasicMaterial({ color: colors[0], side: THREE.DoubleSide }), // Red
                new THREE.MeshBasicMaterial({ color: colors[1], side: THREE.DoubleSide }), // Green
                new THREE.MeshBasicMaterial({ color: colors[2], side: THREE.DoubleSide }), // Blue
                new THREE.MeshBasicMaterial({ color: colors[3], side: THREE.DoubleSide }), // Yellow
                new THREE.MeshBasicMaterial({ color: colors[4], side: THREE.DoubleSide }), // Orange
                new THREE.MeshBasicMaterial({ color: colors[5], side: THREE.DoubleSide }), // White
            ];

            const cube = new THREE.Mesh(geometry, materials);
            cube.position.set(x * spacing, y * spacing, z * spacing);
            rubikGroup.add(cube);
        }

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    createMiniCube(x, y, z);
                }
            }
        }

        scene.add(rubikGroup);

        camera.position.z = 5;

        // Set up OrbitControls for user interaction
        const controls = new OrbitControls(camera, renderer.domElement);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();  // Update the controls
            renderer.render(scene, camera);
        }
        animate();

        // Resize handling
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Cleanup function
        return () => {
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return null;
}

export default App;
