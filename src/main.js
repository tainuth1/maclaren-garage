import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x191919);
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 0, 3);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

document.getElementById("app").appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 3;
controls.maxDistance = 4.5;

controls.minAzimuthAngle = -Math.PI / 7.5;
controls.maxAzimuthAngle = Math.PI / -1.3;

controls.minPolarAngle = Math.PI / 2.4;
controls.maxPolarAngle = Math.PI / 2;

// ========[Environment Mapping Setup]========
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1080, {
  format: THREE.RGBAFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
});
cubeRenderTarget.texture.colorSpace = THREE.SRGBColorSpace;
cubeRenderTarget.texture.mapping = THREE.CubeReflectionMapping;

const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
cubeCamera.name = "ReflectionCubeCamera";
scene.add(cubeCamera);

// ========[Model Loader]========
const loader = new GLTFLoader();
loader.load("/models/garage.glb", (gltf) => {
  const model = gltf.scene;
  model.name = "GARAGE";
  model.position.set(0, 0, 0);

  model.traverse((child) => {
    if (child.name === "Body1095_3") {
      child.visible = false;
    }

    if (child.isMesh && child.material) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => {
          if (material.isMeshStandardMaterial || material.isMeshPhongMaterial) {
            material.envMap = cubeRenderTarget.texture;
            material.envMapIntensity = 1.0;
            material.envMap.mapping = THREE.CubeReflectionMapping;
            material.envMap.generateMipmaps = true;
            material.envMap.minFilter = THREE.LinearMipmapLinearFilter;
            material.envMap.magFilter = THREE.LinearFilter;
            material.needsUpdate = true;
          }
        });
      } else {
        if (
          child.material.isMeshStandardMaterial ||
          child.material.isMeshPhongMaterial
        ) {
          child.material.envMap = cubeRenderTarget.texture;
          child.material.envMapIntensity = 1.0;
          child.material.envMap.mapping = THREE.CubeReflectionMapping;
          child.material.envMap.generateMipmaps = true;
          child.material.envMap.minFilter = THREE.LinearMipmapLinearFilter;
          child.material.envMap.magFilter = THREE.LinearFilter;
          child.material.needsUpdate = true;
        }
      }
    }
  });

  scene.add(model);
});

loader.load("/models/mclaren.glb", (glft) => {
  const model = glft.scene;
  model.name = "MCLAREN";
  model.scale.set(0.7, 0.7, 0.7);
  model.rotation.set(0, -4.7, 0);
  model.position.set(0, -0.68, 0);

  model.traverse((child) => {
    if (child.isMesh && child.material) {
      child.castShadow = true;
      child.receiveShadow = true;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        if (material.isMeshStandardMaterial) {
          material.envMap = cubeRenderTarget.texture;
          material.envMapIntensity = 1.0;
          material.envMap.mapping = THREE.CubeReflectionMapping;
          material.envMap.generateMipmaps = true;
          material.envMap.minFilter = THREE.LinearMipmapLinearFilter;
          material.envMap.magFilter = THREE.LinearFilter;

          // Check for glass materials by name only (more specific to avoid wipers, etc.)
          const isGlassMaterial =
            material.name.toLowerCase().includes("glass") ||
            material.name.toLowerCase().includes("windshield") ||
            material.name.toLowerCase().includes("window") ||
            material.name.toLowerCase().includes("canopy") ||
            material.name.toLowerCase().includes("cockpit");

          if (isGlassMaterial) {
            // Enable proper PBR glass properties
            material.transparent = true;
            material.opacity = 0.3; // Dark tinted glass

            // Use transmission for proper glass physics
            material.transmission = 0.9; // High transmission for see-through effect
            material.ior = 1.45; // Index of refraction for glass
            material.thickness = 0.1; // Glass thickness

            // Surface properties
            material.roughness = 0.05; // Very smooth glass
            material.metalness = 0.0; // Non-metallic

            // Enhanced reflections for glass
            material.envMapIntensity = 2.0;
            material.refractionRatio = 0.98;

            // Color tinting (optional - for tinted glass)
            material.color.setHex(0x111111); // Very dark tint
          }

          material.needsUpdate = true;
        }
      });
    }
  });

  scene.add(model);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Increased intensity
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 1, 15);
pointLight1.position.set(-2.8, 0, 4);
scene.add(pointLight1);
// scene.add(new THREE.PointLightHelper(pointLight1, 0.5));

const pointLight2 = new THREE.PointLight(0xffffff, 60, 30);
pointLight2.position.set(8, 4, 0);
scene.add(pointLight2);
// scene.add(new THREE.PointLightHelper(pointLight2, 0.3));

const pointLight3 = new THREE.PointLight(0xffffff, 50, 25);
pointLight3.position.set(0, 4, 8);
scene.add(pointLight3);
// scene.add(new THREE.PointLightHelper(pointLight3, 0.3));

const gridHelper = new THREE.GridHelper(50, 20, 0xffffff);
// scene.add(gridHelper);
function animate() {
  controls.update();
  cubeCamera.update(renderer, scene);
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
