var scene,
    camera,
    renderer;

var mesh,
    cube = [];

var 
    client = deepstream('localhost:6020'),
    items; // item record

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


        /* item record */
        items = client.record.getList('TEST-ITEMS');

        items.whenReady(function(e){

            // TEST ADD FUNCTION
            // add('선물', {
            //     x : 0,
            //     y : 0,
            //     z : 0
            // });

            e.getEntries().forEach(function(entry){
                console.log(entry);

                // TEST REMOVE FUNCTION
                // remove(entry);

                // get entry record
                client.record.getRecord(entry).whenReady(function(e){
                    console.log(e.get());

                    // create mesh box
                    var 
                        box = create(entry, e.get());
                        
                    scene.add(box);
                    cube.push(box);

                });

            });

        });



        // dynamic record add event
        items.on('entry-added', function(recordName, index){
            console.log('add ', recordName, index);

            client.record.getRecord(recordName).whenReady(function(e){
                /** console test
                    
                    add('선물', { x : 0, y : 5, z : 0 })

                */
                // create mesh box
                var 
                    box = create(recordName, e.get());
                    
                scene.add(box);
                cube.push(box);

            });

        });


        // dynamic record remove event
        items.on('entry-removed', function(recordName, index){
            console.log('remove ', recordName, index);
            
            cube.forEach(function(e){
                if( e.name === recordName) scene.remove(e);
            })

        });        




    });


    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xFF00FF));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    window.addEventListener('resize', resize);
    render();


    // TEST MESH
    // var box = create('TEST-UUID123', {
    //     position : {
    //         x : 0,
    //         y : 0,
    //         z : 0
    //     }
    // });
    
    // scene.add(box);
    // cube.push(box);
    //

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






// mesh setup
function create(name, data){
    var 
        object = mesh.clone();

    object.position.set(data.position.x , data.position.y, data.position.z);
    object.name = name;
    return object;
}




// deepstream record add
function add(content, position){
    var 
        uid = new Date().getTime();

    items.addEntry('TEST-ITEMS'+uid);

    var 
        addRecord = client.record.getRecord('TEST-ITEMS'+uid);

    addRecord.set({
        content : content,
        position : position
    });

}




// deepstream record remove
function remove(content){
    items.removeEntry(content);

}





function addBox(){
    alert('add btn');
}

function removeBox(){
    alert('remove btn');

}