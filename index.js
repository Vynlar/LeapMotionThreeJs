var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var objects = [];

for(var i = 0; i < 10; i++) {
  var array = [];
  for(var j = 0; j < 10; j++) {
    //CUBE
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({
        color: 0x555555*(0.5*i)
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = j;
    cube.position.z = i;
    //scene.add(cube);
    array[j] = cube;
    scene.add(cube);
  }
  objects[i] = array;
}

//LAMP
var pointLight = new THREE.PointLight(0xFFFFFF);

pointLight.position.y = 7;
pointLight.position.z = 12;
pointLight.position.x = -7;
scene.add(pointLight);

camera.position.y = 5;
camera.position.x = -5;
camera.position.z = 10;
camera.lookAt(objects[5][5].position);

var clock = new THREE.Clock(true);
clock.start();

var render = function () {
    requestAnimationFrame(render);

    

    for(var i = 0; i < objects.length; i++) {
      for(var j = 0; j < objects.length; j++) {
        objects[i][j].position.y = Math.sin(clock.getElapsedTime()*Math.PI)*(1-((i/5)*(j/5)));
      }
    }

    renderer.render(scene, camera);
};

render();
