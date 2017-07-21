var scene,
    camera,
    renderer;


window.onload = init;

function init(){
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera);

    camera.position.set(10,3,10);
    camera.lookAt(new THREE.Vector3(0,0,0));


    scene.add(new THREE.AxisHelper(3));

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xFF00FF));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    window.addEventListener('resize', resize);
    render();    
}


function resize(){ 
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
}


function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);

}