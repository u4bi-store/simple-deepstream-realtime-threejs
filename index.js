var scene,
    camera,
    renderer;

var mesh;

var 
    client = deepstream('localhost:6020');

window.onload = init;

function init(){
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera);

    camera.position.set(10,3,10);
    camera.lookAt(new THREE.Vector3(0,0,0));


    scene.add(new THREE.AxisHelper(3));

    // plane
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshPhongMaterial({color: 0xFFFFFF}));
    scene.add(plane);
    plane.rotateX(-Math.PI/2);
    //


    // light
    var light = new THREE.SpotLight(0xFF0000, 1);
    light.position.set(0, 3, 0);
    scene.add(light);
    //

    
    mesh = new THREE.Mesh( new THREE.BoxGeometry(.3, .3, .3), new THREE.MeshBasicMaterial( { color: 0x00FFFF, wireframe : true } ));
    console.log(mesh);


    // deepstream connection
    client.login({}, function(success){
        console.log(success);

    });


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