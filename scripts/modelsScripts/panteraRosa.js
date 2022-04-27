import * as THREE from '../../Three/build/three.module.js';
import { GLTFLoader } from '../../Three/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from '../../Three/examples/jsm/controls/OrbitControls.js'

const canvas = document.getElementById("canvas");
const scene = new THREE.Scene();



var root;
const loader = new GLTFLoader();
loader.load("../../3dmodels/PanteraRosa.glb", function(gltf){
    root = gltf.scene;
    root.scale.set(0.1,0.1,0.1)
    root.position.set(0,0,0)

    
    scene.add(root);
}, function(xhr){
    console.log(xhr.loaded/xhr.total * 100 + "% cargado")
}, (error)=>{
    console.log("error")
})

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,5);
scene.add(light)
const light2 = new THREE.DirectionalLight(0xffffff, .8);
light2.position.set(2,2,-5);
scene.add(light2)
const light3 = new THREE.DirectionalLight(0xffffff, .8);
light3.position.set(-2,2,2);
scene.add(light3)
const light4 = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light4 );

/*const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );*/

const size = {
    width: window.innerWidth - 1000,
    height: window.innerHeight - 600
}

const camera = new THREE.PerspectiveCamera(90, size.width/size.height, 0.1, 100);
camera.up.set(0,1,0)
camera.position.set(1,2,0);

scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(0,1.5,0)
controls.update();

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.updateShadowMap.enabled = true;



function animate(){
    requestAnimationFrame(animate)
    renderer.setClearColor( 0xffffff, 0);
    renderer.render(scene, camera)
}

animate();