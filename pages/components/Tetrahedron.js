import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Tetrahedron = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // create a WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    // set the renderer's size
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // create a new Three.js scene
    const scene = new THREE.Scene();

    // create a camera and position it
    const camera = new THREE.PerspectiveCamera(
      75, // field of view
      canvas.clientWidth / canvas.clientHeight, // aspect ratio
      0.1, // near clipping plane
      1000 // far clipping plane
    );
    camera.position.z = 5;

    // create a tetrahedron and add it to the scene
    const geometry = new THREE.TetrahedronGeometry(1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const tetrahedron = new THREE.Mesh(geometry, material);
    scene.add(tetrahedron);

    // create a light and add it to the scene
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 5);
    scene.add(light);

    // define a function to update the tetrahedron's rotation
    const update = () => {
      tetrahedron.rotation.x += 0.01;
      tetrahedron.rotation.y += 0.01;

      // render the scene
      renderer.render(scene, camera);

      // request the next frame
      requestAnimationFrame(update);
    };

    // start the update loop
    update();

    // cleanup function to remove the scene and renderer on unmount
    return () => {
      scene.remove(tetrahedron);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Tetrahedron;