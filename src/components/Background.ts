import * as THREE from "three";
import { inSphere } from "../utils/maath";

export class StarfieldBG {
  #canvas!: HTMLCanvasElement;
  #renderer!: THREE.WebGLRenderer;
  #scene!: THREE.Scene;
  #camera!: THREE.PerspectiveCamera;
  #clock!: THREE.Clock;
  #points!: THREE.Points;

  constructor(
    canvas: HTMLCanvasElement,
  ) {
    this.#canvas = canvas;
    this.#renderer = new THREE.WebGLRenderer({ canvas: this.#canvas });
    this.#renderer.setSize(window.innerWidth, window.innerHeight);

    this.#scene = new THREE.Scene();

    // Initialize camera
    this.#camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.2,
      1000
    );
    this.#camera.position.z = 2.4;
    this.#camera.position.x = -0.5;

    // Generate points for starfield
    const sphere = inSphere(new Float32Array(500), { radius: 3 });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(sphere, 3));
    geometry.boundingSphere = new THREE.Sphere(
      new THREE.Vector3(0, 0, 0),
      1
    );
    const vertexShader = `
        attribute float sizeVariation;
        varying vec3 vColor;

        void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = sizeVariation * (1.0 / -mvPosition.z); 
            gl_Position = projectionMatrix * mvPosition;

            // Introducing subtle color variation based on size
            vColor = vec3(1.0, 1.0 + sin(sizeVariation * 6.0) * 0.1, 1.0 + cos(sizeVariation * 6.0) * 0.1);
        }
    `;

    // Fragment Shader with brightness variation based on size
    const fragmentShader = `
        varying vec3 vColor;
        
        void main() {
            vec2 coords = gl_PointCoord.xy - vec2(0.5, 0.5);
            float dist = length(coords);
            if (dist > 0.5) discard;

            gl_FragColor = vec4(vColor, 1.0); 
        }
    `;

    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        console.error(`Position at index ${i} is NaN!`);
      }
    }

    const sizes = new Float32Array(geometry.attributes.position.count);
    for (let i = 0; i < sizes.length; i++) {
      sizes[i] = 4.0 + Math.random() * 3.0;
    }
    geometry.setAttribute(
      "sizeVariation",
      new THREE.BufferAttribute(sizes, 1)
    );

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    this.#points = new THREE.Points(geometry, material);
    this.#scene.add(this.#points);

    // Initialize clock
    this.#clock = new THREE.Clock();

    this.#animate();
    this.#addResizeListener();

  }

  #addResizeListener() {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.#renderer.setSize(width, height);
      const aspect = width / height;

      if (this.#camera instanceof THREE.PerspectiveCamera) {
        this.#camera.aspect = aspect;
        this.#camera.updateProjectionMatrix();
      }
    });
  }

  #animate() {
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.#animate();
      }, 1000 / 60);
    });

    const delta = this.#clock.getDelta();
    this.#points.rotation.x -= delta / 10;
    this.#points.rotation.y += delta / 25;

    const opacity = Math.max((this.#clock.elapsedTime - 0.3) / 5, 0);
    if (opacity <= 1) {
      (this.#points.material as THREE.PointsMaterial).opacity = opacity;
    }

    this.#renderer.render(this.#scene, this.#camera);
  }
}
