import * as THREE from 'three';
//import { bloom } from 'three/addons/tsl/display/BloomNode.js'

const domContainer = document.getElementById("header-gl-canvas");

const scene = new THREE.Scene();
const aspect = domContainer.offsetWidth / domContainer.offsetHeight;
const camera = new THREE.OrthographicCamera(4 * aspect / -2, 4 * aspect / 2, 2, -2, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(domContainer.offsetWidth, domContainer.offsetHeight);

domContainer.appendChild(renderer.domElement);

camera.position.z = 10;

function animate() {
    time += clock.getDelta();
    while(time >= triangleAnimation[animationTimeIndex]) {
        time -= triangleAnimation[animationTimeIndex];
        if(++animationIndex === triangleAnimationLength) {
            animationIndex = 0;
            animationTimeIndex = 0;
        } else if(animationIndex >= 1) {
            animationTimeIndex = 1;
        }
    }
    triangleTexture.offset.x = animationIndex / triangleAnimationLength;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener( 'resize', function () {
    renderer.setSize(domContainer.offsetWidth, domContainer.offsetHeight);
});
window.addEventListener('pointermove', function (event) {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    planeMesh.rotation.x = planeMesh.rotation.y = (event.clientX / clientWidth) - 0.5;
});

var clock = new THREE.Clock();
var time = 0.0;
var frame = 0;
var triangleTexture = new THREE.TextureLoader().load('images/triangle.png');
triangleTexture.colorSpace = THREE.SRGBColorSpace;
triangleTexture.wrapS = triangleTexture.wrapT = THREE.RepeatWrapping;
var triangleAnimationLength = 50;
triangleTexture.repeat.set(1 / triangleAnimationLength, 1.0);
var triangleAnimation = [ 2, 0.05 ];
var animationIndex = 0;
var animationTimeIndex = 0;

const basicMaterial = new THREE.MeshBasicMaterial({map: triangleTexture, transparent: true});
const planeGeometry = new THREE.PlaneGeometry(4.5, 4.5);
const planeMesh = new THREE.Mesh(planeGeometry, basicMaterial);
scene.add(planeMesh);

// const postPro = new THREE.PostProcessing(renderer);
// const scenePass = pass(scene, camera);
// const scenePassColor = scenePass.getTextureNode('output');
// const bloomPass = bloom(scenePassColor);
// postPro.outputNode = scenePassColor.add(bloomPass);


