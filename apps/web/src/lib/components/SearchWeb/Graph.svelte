<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  
    let canvas;
  
    onMount(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
  
      // Create OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;
      controls.maxPolarAngle = Math.PI / 2;
  
      const geometry = new THREE.BufferGeometry();
      const vertices = new Float32Array(1000 * 3);
      const colors = new Float32Array(1000 * 3);
  
      for (let i = 0; i < 1000 * 3; i += 3) {
        vertices[i] = (Math.random() - 0.5) * 2;
        vertices[i + 1] = (Math.random() - 0.5) * 2;
        vertices[i + 2] = (Math.random() - 0.5) * 2;
  
        colors[i] = Math.random();
        colors[i + 1] = Math.random();
        colors[i + 2] = Math.random();
      }
  
      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
      const material = new THREE.PointsMaterial({ size: 0.02, vertexColors: true });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
  
      camera.position.z = 2;
  
      function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Update controls in the animation loop
        renderer.render(scene, camera);
      }
  
      animate();
  
      function handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
  
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
  
        renderer.setSize(width, height);
      }
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        controls.dispose();
      };
    });
  </script>
  
  <canvas bind:this={canvas}></canvas>
  
  <style>
    :global(body) {
      margin: 0;
      overflow: hidden;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  </style>