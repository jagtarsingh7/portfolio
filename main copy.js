import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  // sets what we can see

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//set pixel ratio to window device ratio
renderer.setPixelRatio(window.devicePixelRatio);

//render size to window size

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);

// Torus
//spaceship
// new THREE.TorusBufferGeometry(radius, tubeRadius, radialSegments, tubularSegments);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x05406c });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  //randpm positions of stars
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100)); //random number from -100 t0 +100

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpg');
scene.background = spaceTexture;

// Avatar

const spaceShipTexture = new THREE.TextureLoader().load('./assets/ufo.jpg');

const spaceShip = new THREE.Mesh(new THREE.ConeBufferGeometry(2, 2, 6), new THREE.MeshBasicMaterial({ map: spaceShipTexture }));

scene.add(spaceShip);

// Moon

const moonTexture = new THREE.TextureLoader().load('./assets/earth.jpg');
const normalTexture = new THREE.TextureLoader().load('./assets/earth.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

const earthTexture = new THREE.TextureLoader().load('./assets/moon.jpg');
const earthlTexture = new THREE.TextureLoader().load('./assets/normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthlTexture,
  })
);

scene.add(earth)
earth.position.z=50;
earth.position.setX(-20);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

spaceShip.position.z = -5;
spaceShip.position.x = 2;

// Scroll Animation

function moveCamera() { 
  const t = document.body.getBoundingClientRect().top;      //gives dimension of viewport,gets the value how far we from the top, it always is negative
  moon.rotation.x += 0.02;
  moon.rotation.y += 0.02;
  moon.rotation.z += 0.02;

  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  spaceShip.rotation.y += 0.01;
  spaceShip.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  earth.rotation.x += 0.009;

  // controls.update();

  renderer.render(scene, camera);
}

animate();