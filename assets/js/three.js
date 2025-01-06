import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let controls;

const renderer = new THREE.WebGLRenderer( { alpha: true, antialias:true } );
renderer.setClearColor( 0x000000, 0 );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.getElementById('three-container').appendChild(renderer.domElement);

const loader = new GLTFLoader()
loader.load(
  '/assets/3D/12_21_2024.glb',
  function (gltf) { 
    scene.add(gltf.scene)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error)
  }
)

const light = new THREE.AmbientLight( 0xFFFFFF );
light.intensity = 3;
scene.add(light);

controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.target = new THREE.Vector3(0.3, 0.4, 0);
    controls.autoRotateSpeed = 0.3;
    controls.minDistance = 1;
    controls.maxDistance = 2;
    controls.zoomSpeed = 3;
    controls.maxPolarAngle = 1.5;

camera.position.z = 5;

function animate() {

	renderer.render( scene, camera );
    controls.update();

}