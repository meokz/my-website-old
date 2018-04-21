(() => {
	let canvasWidth  = null;
	let canvasHeight = null;
	let targetDOM    = null;

	let run = true;
	let isDown = false;

	let scene;
	let camera;
	let controls;
	let renderer;
	let geometry;
	let material;
	let materialPoint;
	let box = new Array(100);
	let directionalLight;
	let ambientLight;
	let axesHelper;

	const RENDERER_PARAM = {
		clearColor: 0x333333
	};

	const MATERIAL_PARAM = {
		color: 0xff9933,
		specular: 0xffffff
	};

	const MATERIAL_PARAM_POINT = {
		color: 0xff9933,
		size: 0.1
	};

	const DIRECTIONAL_LIGHT_PARAM = {
		color: 0xffffff,
		intensity: 1.0,
		x: 1.0,
		y: 1.0,
		z: 1.0
	};

	const AMBIENT_LIGHT_PARAM = {
		color: 0xffffff,
		intensity: 0.2
	};

	window.addEventListener('load', () => {
		canvasWidth  = window.innerWidth;
		canvasHeight = window.innerHeight;
		targetDOM    = document.getElementById('webgl');

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(60, canvasWidth / canvasHeight, 0.1, 50.0);
		camera.position.x = 0.0;
		camera.position.y = 3.0;
		camera.position.z = 10.0;
		camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
		renderer.setSize(canvasWidth, canvasHeight);

		targetDOM.appendChild(renderer.domElement);
		controls = new THREE.OrbitControls(camera, renderer.domElement);

		material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);
		materialPoint = new THREE.PointsMaterial(MATERIAL_PARAM_POINT);

		geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
		offset = 50;
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				index = i * 10 + j;
				box[index] = new THREE.Mesh(geometry, material);
				box[index].position.x = 1.0 * i - 5;
				box[index].position.y = 1.0 * j - 5;
				scene.add(box[index]);
			}
		}
		
		directionalLight = new THREE.DirectionalLight(
			DIRECTIONAL_LIGHT_PARAM.color,
			DIRECTIONAL_LIGHT_PARAM.intensity
		);

		directionalLight.position.x = DIRECTIONAL_LIGHT_PARAM.x;
		directionalLight.position.y = DIRECTIONAL_LIGHT_PARAM.y;
		directionalLight.position.z = DIRECTIONAL_LIGHT_PARAM.z;
		scene.add(directionalLight);

		ambientLight = new THREE.AmbientLight(
			AMBIENT_LIGHT_PARAM.color,
			AMBIENT_LIGHT_PARAM.intensity
		);
		scene.add(ambientLight);

		axesHelper = new THREE.AxesHelper(5.0);
		scene.add(axesHelper);

		window.addEventListener('keydown', (eve) => {
			run = eve.key !== 'Escape';
		}, false);

		window.addEventListener('mousedown', () => {
			isDown = true;
		}, false);

		window.addEventListener('mouseup', () => {
			isDown = false;
		}, false);

		window.addEventListener('resize', () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}, false);

		render();
	}, false);

	function render(){
		if(run){
			requestAnimationFrame(render);
		}

		if(isDown === true){
			for (var i = 0; i < 10; i++) {
				for (var j = 0; j < 10; j++) {
					index = i * 10 + j;
					box[index].rotation.y += 0.02;
					box[index].rotation.z += 0.02;
				}
			}
		}

		renderer.render(scene, camera);
	}
})();

