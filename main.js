import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
// import sun from '/images/sun.png';
import earth from '/imagess/earth.png';
const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// camera.position.z = 5;
// document.body.appendChild( renderer.domElement );
// const controls = new OrbitControls( camera, renderer.domElement );


// Create a canvas element and add it to the document body
const canvasDiv = document.getElementById('canvasDiv');
let canvas = document.createElement('canvas'); // Create a canvas element
let gameBlock = canvasDiv.appendChild(canvas);
canvas.width = canvasDiv.clientWidth;
canvas.height = canvasDiv.clientHeight;
if (gameBlock == null) console.log('still not created');
const renderer = new THREE.WebGLRenderer({
  canvas: gameBlock
});
const camera = new THREE.PerspectiveCamera(75, gameBlock.width / gameBlock.height, 0.1, 1000);
camera.position.z = 5;
camera.aspect = canvas.width / canvas.height;

// Add OrbitControls for better camera control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Optional, for smooth damping effect
controls.dampingFactor = 0.25; // Optional, for damping effect
controls.screenSpacePanning = false; // Whether to enable panning

// Set the target of the OrbitControls to the center of the scene
controls.target.set(0, 0, 0);
// Function to focus on a planet (can be called from the HTML buttons)


// Attach functions to the window object so that they are accessible globally
window.focusOnPlanet = focusOnPlanet;
window.adjustSpeed = adjustSpeed;


// const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load('/imagess/sun.png');
const nepTexture = textureLoader.load('/imagee/neptune.png');
const maTexture = textureLoader.load('/imagee/mercury.png');
const marTexture = textureLoader.load('/imagee/mars.png');
const jeTexture = textureLoader.load('/imagee/jupitermap.png');
const saTexture = textureLoader.load('/imagee/saturn.png');
const vTexture = textureLoader.load('/imagee/venus.png');
const UTexture = textureLoader.load('/imagee/uranus-texture.png');
const eaTexture = textureLoader.load('/imagess/earth.png');
const moon = textureLoader.load('/imagee/moon.png');
// const mTexture = textureLoader.load('/imagess/Mercury.png');

// Create an audio listener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// Create a global audio object for each planet
// const sunAudio = new THREE.Audio(listener);
const mercuryAudio = new THREE.Audio(listener);
const venusAudio = new THREE.Audio(listener);
const earthAudio = new THREE.Audio(listener);  // Add Earth's audio if available
const marsAudio = new THREE.Audio(listener);
const jupiterAudio = new THREE.Audio(listener);
const saturnAudio = new THREE.Audio(listener);
const uranusAudio = new THREE.Audio(listener);

// Load the audio files
const audioLoader = new THREE.AudioLoader();
audioLoader.load('/audio/earth.wav', function(buffer) {
  earthAudio.setBuffer(buffer);
  earthAudio.setLoop(false);
  earthAudio.setVolume(0.5);
});
audioLoader.load('/audio/ElevenLabs_2024-10-05T18_15_59_Long Storyteller_pvc_s50_sb75_t2.mp3', function(buffer) {
    marsAudio.setBuffer(buffer);
    marsAudio.setLoop(false);
    marsAudio.setVolume(0.5);
});
audioLoader.load('/audio/jepeter.mp3', function(buffer) {
  jupiterAudio.setBuffer(buffer);
  jupiterAudio.setLoop(false);
  jupiterAudio.setVolume(0.5);
});
audioLoader.load('/audio/ElevenLabs_2024-10-05T18_17_04_Andrew - Smooth audio books_pvc_s50_sb75_t2.mp3', function(buffer) {
  saturnAudio.setBuffer(buffer);
  saturnAudio.setLoop(false);
  saturnAudio.setVolume(0.5);
});
audioLoader.load('/audio/ElevenLabs_2024-10-05T18_17_33_Andrew - Smooth audio books_pvc_s50_sb75_t2.mp3', function(buffer) {
  uranusAudio.setBuffer(buffer);
  uranusAudio.setLoop(false);
  uranusAudio.setVolume(0.5);
});
audioLoader.load('/audio/mercury-sound.wav', function(buffer) {
    mercuryAudio.setBuffer(buffer);
    mercuryAudio.setLoop(false);
    mercuryAudio.setVolume(0.5);
});
audioLoader.load('/audio/I am Venus the second pl 3.wav', function(buffer) {
    venusAudio.setBuffer(buffer);
    venusAudio.setLoop(false);
    venusAudio.setVolume(0.5);
});
// Repeat for other planets

// Function to stop all audio (in case one is already playing)
function stopAllAudio() {
    // sunAudio.stop();
    mercuryAudio.stop();
    venusAudio.stop();
    earthAudio.stop(); // Add for Earth if you have it
    marsAudio.stop();
    jupiterAudio.stop();
    saturnAudio.stop();
    uranusAudio.stop();
}

// Function to focus on the selected planet
function focusOnPlanet(planet) {
    let texture, audio;

    // Load the texture and audio based on the planet clicked
    switch(planet) {
        case 'Sun':
            texture = sunTexture;
            // audio = sunAudio;
            break;
        case 'Mercury':
            texture = maTexture;
            audio = mercuryAudio;
            break;
        case 'Venus':
            texture = vTexture;
            audio = venusAudio;
            break;
        case 'Earth':
            texture = eaTexture;
            audio = earthAudio;
            break;
        case 'Mars':
            texture = marTexture;
            audio = marsAudio;
            break;
        case 'Jupiter':
            texture = jeTexture;
            audio = jupiterAudio;
            break;
        case 'Saturn':
            texture = saTexture;
            audio = saturnAudio;
            break;
        case 'Uranus':
            texture = UTexture;
            audio = uranusAudio;
            break;
        case 'Neptune':
            texture = nepTexture;
            // audio = uranusAudio;
            break;
        default:
            console.log('Planet not found');
            return;
    }

    // Stop any currently playing audio
    stopAllAudio();

    // Play the audio for the selected planet
    if (audio && !audio.isPlaying) {
        audio.play();
    }

    // Assuming you have a 3D object for each planet, update its material map
    const planetObject = scene.getObjectByName(planet); // Assuming each planet is named
    if (planetObject && texture) {
        planetObject.material.map = texture;
        planetObject.material.needsUpdate = true; // Ensure the texture is applied
    }
  // Log the selected planet
  console.log(`Focusing on ${planet}`);

  // Update the camera position to focus on the selected planet
  if (planetObject) {
      const planetPosition = planetObject.position;
      
      // Adjust the camera to zoom in on the planet
      camera.position.set(
          planetPosition.x + 5,  // Adjust the 50 to change zoom level
          planetPosition.y + 5,  // Adjust height for better viewing
          planetPosition.z + 5,   // Adjust depth as needed
      );

      // Make the camera look at the planet
      camera.lookAt(planetPosition);
  } else {
      console.log(`${planet} object not found in the scene.`);
  }

  // Optionally, call renderer to re-render the scene
  renderer.render(scene, camera);
}
let valu = 0;
// Function to adjust simulation speed
function adjustSpeed(value) {
  valu = value;
  document.getElementById('speed-value').innerText = value + 'x';
  console.log(`Adjusting speed to ${value}`);
}

// Attach functions to the window object so that they are accessible globally
window.focusOnPlanet = focusOnPlanet;
window.adjustSpeed = adjustSpeed;
//sun
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({map: sunTexture});
const sphere = new THREE.Mesh(geometry, material);
sphere.name = "SUN"
scene.add(sphere);

// moon
// const textureLoader3 = new THREE.TextureLoader()
// const geometry3 = new THREE.SphereGeometry(1, 32, 32);
// const material3 = new THREE.MeshBasicMaterial({ map: moon});
// const mesh3 = new THREE.Mesh(geometry3, material3);
// // mesh3.position.set(22, 0,0)
// mesh3.name = "MOON";
// scene.add(mesh3);


const geometryMercury = new THREE.SphereGeometry(0.1, 32, 32);
const materialMercury = new THREE.MeshBasicMaterial({map: maTexture});
const Mercury = new THREE.Mesh(geometryMercury, materialMercury);
Mercury.name = "Mercury"
scene.add(Mercury);

const vgeometry = new THREE.SphereGeometry(1, 32, 32);
const vmaterial = new THREE.MeshBasicMaterial({map: vTexture});
const vsphere = new THREE.Mesh(vgeometry, vmaterial);
vsphere.name = "Venus"
scene.add(vsphere);

const mageometry = new THREE.SphereGeometry(1, 32, 32);
const mamaterial = new THREE.MeshBasicMaterial({map: marTexture});
const masphere = new THREE.Mesh(mageometry, mamaterial);
masphere.name = "Mars"
scene.add(masphere);

const jgeometry = new THREE.SphereGeometry(1, 32, 32);
const jmaterial = new THREE.MeshBasicMaterial({map: jeTexture});
const jsphere = new THREE.Mesh(jgeometry, jmaterial);
jsphere.name = "Jupiter"
scene.add(jsphere);

const sgeometry = new THREE.SphereGeometry(1, 32, 32);
const smaterial = new THREE.MeshBasicMaterial({map: saTexture});
const ssphere = new THREE.Mesh(sgeometry, smaterial);
ssphere.name = "Saturn"
scene.add(ssphere);

const ugeometry = new THREE.SphereGeometry(1, 32, 32);
const umaterial = new THREE.MeshBasicMaterial({map: UTexture});
const usphere = new THREE.Mesh(ugeometry, umaterial);
usphere.name = "Uranus"
scene.add(usphere);

const ngeometry = new THREE.SphereGeometry(1, 32, 32);
const nmaterial = new THREE.MeshBasicMaterial({map: sunTexture});
const nsphere = new THREE.Mesh(ngeometry, nmaterial);
nsphere.name = "Neptune"
scene.add(nsphere);

const pgeometry = new THREE.SphereGeometry(1, 32, 32);
const pmaterial = new THREE.MeshBasicMaterial({map: sunTexture});
const psphere = new THREE.Mesh(pgeometry, pmaterial);
psphere.name = "Pluto"
scene.add(psphere);

// const textureLoadercircle = new THREE.TextureLoader()
const geometrycircle = new THREE.RingGeometry(10, 10.05, 100);
const mecircle = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
const mesh4 = new THREE.Mesh(geometrycircle, mecircle);
// mesh4.rotateX(0.5);

mesh4.position.set(0, 0, 0); // Centered at the origin
mesh4.rotation.x = Math.PI / 2;
scene.add(mesh4);

// const geometry1 = new THREE.SphereGeometry(1, 32, 32);
// const material1 = new THREE.MeshBasicMaterial({map: sunTexture});
// const sphere1 = new THREE.Mesh(geometry1, material1);
// sphere1.position.set(94.5/2, 0, 5);
// sphere.name = "la"
// scene.add(sphere1);

//earth
//   // earth
// const textureLoader2 = new THREE.TextureLoader();
const earthTexture = textureLoader.load('/imagess/earth.png');
  const geometry2 = new THREE.SphereGeometry(1, 32, 32);
  const material2 = new THREE.MeshBasicMaterial({ map: earthTexture});
  const mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.set(94.5/2, 0, 0);
  mesh2.name = "EARTH";
  scene.add(mesh2);
//
const starttime = Date.now();
//Mer
const Mperiod =  88.0;
const msma = 0.387098;
const meccentricity = 0.20563;
//Venus
const vperiod =  224.701;
const vsma = 0.723332;
const veccentricity = 0.006772;
//Mars
const mperiod =  686.971;
const mearthsma = 1.523679	;
const meartheccentricity = 0.0934;
//Jupiter
const Jupiterperiod =  365.25638;
const Jupitersma = 5.2044;
const Jupiterccentricity = 0.0489;
//Saturn
const Saturnperiod =  10759.22;
const Saturnsma = 9.5826;
const Saturneccentricity = 0.0565;
//Uranus
const Uranusperiod =  30688.5;
const Uranussma = 19.2184;
const Uranuseccentricity = 0.046381;
//Neptune
const Neptuneperiod =  60182.0;
const Neptunesma = 30.110388	;
const Neptuneeccentricity = 0.009456	;
//Pluto
const Plutoperiod =  90560.0;
const Plutosma = 39.48;
const Plutoeccentricity = 0.2488;
//earth
const earthperiod =  365.25638;
const earthsma = 1;
const eartheccentricity = 0.016708;

function animate()
{
    const correnttime =  Date.now();
    let time= 0;
    if (valu == 0)
      time =  (correnttime - starttime) / 100 ;
    else
      time =  (correnttime - starttime) / 100 * valu ;
    const earthangel = time * (2*Math.PI / earthperiod);
    const r = earthsma * 10;
    mesh2.position.x = r * Math.cos(earthangel); // Update x position
    mesh2.position.z = r * Math.sin(earthangel) * (1 - eartheccentricity); // Update z position for elliptical orbit
    mesh2.rotateY(0.06)
    //Mercury
    const mangel = time * (2*Math.PI / Mperiod);
    const M = msma * 10;
    Mercury.position.x = M * Math.cos(mangel); // Update x position
    Mercury.position.z = M * Math.sin(mangel) * (1 - meccentricity); // Update z position for elliptical orbit
    Mercury.rotateY(0.06)
    //Venus
    const vangel = time * (2*Math.PI / vperiod);
    const v = vsma * 10;
    vsphere.position.x = v * Math.cos(vangel); // Update x position
    vsphere.position.z = v * Math.sin(vangel) * (1 - veccentricity); // Update z position for elliptical orbit
    vsphere.rotateY(0.06)
    //Mars
    const maangel = time * (2*Math.PI / mperiod);
    const ma = mearthsma * 10;
    masphere.position.x = ma * Math.cos(maangel); // Update x position
    masphere.position.z = ma * Math.sin(maangel) * (1 - meartheccentricity); // Update z position for elliptical orbit
    masphere.rotateY(0.06)
    //Jupiter
    const Jupiterangel = time * (2*Math.PI / Jupiterperiod);
    const Jupiterma = Jupitersma * 10;
    jsphere.position.x = Jupiterma * Math.cos(Jupiterangel); // Update x position
    jsphere.position.z = Jupiterma * Math.sin(Jupiterangel) * (1 - meartheccentricity); // Update z position for elliptical orbit
    jsphere.rotateY(0.06)
    //Saturn
    const Saturnangel = time * (2*Math.PI / Saturnperiod);
    const Saturnma = Saturnsma * 10;
    ssphere.position.x = Saturnma * Math.cos(Saturnangel); // Update x position
    ssphere.position.z = Saturnma * Math.sin(Saturnangel) * (1 - meartheccentricity); // Update z position for elliptical orbit
    ssphere.rotateY(0.06)

  //Uranus
  const Uranusangel = time * (2*Math.PI / Uranusperiod);
  const Uranusma = Uranussma * 10;
  usphere.position.x = Uranusma * Math.cos(Uranusangel); // Update x position
  usphere.position.z = Uranusma * Math.sin(Uranusangel) * (1 - Uranuseccentricity); // Update z position for elliptical orbit
  usphere.rotateY(0.06)
    

    //Neptune
    const Neptuneangel = time * (2*Math.PI / Neptuneperiod);
    const Neptunema = Neptunesma * 10;
    nsphere.position.x = Neptunema * Math.cos(Neptuneangel); // Update x position
    nsphere.position.z = Neptunema * Math.sin(Neptuneangel) * (1 - Neptuneeccentricity); // Update z position for elliptical orbit
    nsphere.rotateY(0.06)
    //Pluto
    const Plutoangel = time * (2*Math.PI / Plutoperiod);
    const Plutoma = Plutosma * 10;
    nsphere.position.x = Plutoma * Math.cos(Plutoangel); // Update x position
    nsphere.position.z = Plutoma * Math.sin(Plutoangel) * (1 - Plutoeccentricity); // Update z position for elliptical orbit
    nsphere.rotateY(0.06)
    
    const earthspeed = 0.314;
    const moonspeed = earthspeed * 13.37; //  the Moon revolves around Earth about 13.37 times in the course of a year

    // let moonhangel = 0;
    // moonhangel += moonspeed * (1/60);
    // let moondistancetoearth = 10;

    // mesh3.position.x = mesh2.position.x +  Math.cos(moonhangel)*moondistancetoearth;
    // mesh3.position.z = mesh2.position.z +  Math.sin(moonhangel)*moondistancetoearth;


    renderer.render(scene, camera);

}







renderer.setAnimationLoop(animate);
// const angle = time * (2 * Math.PI / planet.period); // Calculate angle based on period
//       const r = planet.sma * 10; // Scale for visibility
//       planet.mesh.position.x = r * Math.cos(angle); // Update x position
//       planet.mesh.position.z = r * Math.sin(angle) * (1 - planet.eccentricity); // Update z position for elliptical orbit
//   });
