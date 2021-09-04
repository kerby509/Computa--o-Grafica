var scene;//nosso mundo virtual
var camera; 
var render;// responsável por gerar as imagems

var elements = [];
var velCubo = 0.10;

var parametrosGUI;
var controls;


/**
 * INTEFACE GRÁFICA
 */

var createGui = function(){
	const gui = new dat.GUI();

	parametrosGUI = {
		scalaMonstro: 1,
		posMonstroX: 0,
		posMonstroY: 0,
		posMonstroZ: 0,

		monstroColorT: "#899400",

		skyColor: "#00bfff",
		
		formaCabeca : "Suzanne"
	}

	let fazScala = gui.add(parametrosGUI, 'scalaMonstro').min(0.1).max(2).step(0.1).name("Scala Monstro");
	fazScala.onChange(function(parametro){
		elements["mamaco"].scale.x = elements["mamaco"].scale.y = elements["mamaco"].scale.z =  parametro;
	});

	let posicao = gui.addFolder("Posicao");
	
	let posX = posicao.add(parametrosGUI, 'posMonstroX').min(-4).max(4).step(0.5).name("Pos. X");
	posX.onChange(function(parametro){
		elements["mamaco"].position.x =  parametro;
	});
	let posY = posicao.add(parametrosGUI, 'posMonstroY').min(-4).max(4).step(0.5).name("Pos. Y");
	posY.onChange(function(parametro){
		elements["mamaco"].position.y =  parametro;
	});
	let posZ = posicao.add(parametrosGUI, 'posMonstroZ').min(-4).max(4).step(0.5).name("Pos. Z");
	posZ.onChange(function(parametro){
		elements["mamaco"].position.z =  parametro;
	});

	let cores = gui.addFolder("Closet");
	let tronColor = cores.addColor(parametrosGUI, 'monstroColorT').name("Camiseta");
	tronColor.onChange(function(parametro){
		console.log(elements["mamaco"]);
		elements["mamaco"].traverse(
			function (child){
				if (child instanceof THREE.Mesh){
					child.material = new THREE.MeshStandardMaterial({color: new THREE.Color(parametro)});
					console.log("passou aqui");
				}
			}
		);
	});

	let skyColor = cores.addColor(parametrosGUI, 'skyColor').name("Sky");
	skyColor.onChange(function(parametro){
		scene.background = new THREE.Color(parametro);
	});


	let opcoesCabeca = ["Horse", "Pug","Chihuahua","Tiger","Bull","Goat","Horse1","Goat1"];
	let opcHead = cores.add(parametrosGUI, 'formaCabeca').options(opcoesCabeca).name("Olhando");
	opcHead.onChange(function(parametro){
		let cabeca;
		
		if (parametro == "Horse"){
			camera.lookAt(elements["Horse"].position);
		}else if (parametro == "Pug"){
			camera.lookAt(elements["pug"].position);
		}else if (parametro == "Chihuahua"){
			camera.lookAt(elements["Chihuahua"].position); 
		}else if (parametro == "Tiger"){
			camera.lookAt(elements["Tiger"].position);
		}else if (parametro == "Bull"){
			camera.lookAt(elements["Bull"].position);
		}else if (parametro == "Goat"){
			camera.lookAt(elements["Goat"].position);
		 }else if (parametro == "Horse1"){
		 	camera.lookAt(elements["Horse1"].position);
		 }else if (parametro == "Goat1"){
			camera.lookAt(elements["Goat1"].position);
		}
	
	});


	//gui.open();
}

/* FIM INTERFACE*/

var loadObjects = function(){
	let objLoader = new THREE.OBJLoader();
	let fbxLoader = new THREE.FBXLoader();
	let textLoader = new THREE.TextureLoader();



	// objLoader.load(
	// 	'assets/Horse.fbx',//o que carregar
	// 	function(obj){ //função executada após o loading
			
	// 		obj.traverse(
	// 			function (child){
	// 				if (child instanceof THREE.Mesh){
	// 					child.material = new THREE.MeshStandardMaterial({color: 0x050794});
	// 					console.log("passou aqui");
	// 				}
	// 			}
	// 		);

	// 		obj.scale.x = 3;
	// 		obj.scale.y = 3;
	// 		obj.scale.z = 3;//3
			
	// 		obj.rotation.x-= Math.PI/2; //rotação de 90°	
			
	// 		scene.add(obj);
	// 		elements['Horse'] = obj;
	// 		console.log("Carregou!");
	// 	},
	// 	function (andamento){ //função executada durante o loading
	// 		console.log(andamento.loaded/andamento.total*100 + "%");
	// 	},
	// 	function(error){//função executada se deu problema
	// 		console.log("Deu erro: "+error);
	// 	}
	// );

	fbxLoader.load(
		'assets/Pug.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/Pug_texture.png');
						//child.material = new THREE.MeshStandardMaterial({color: 0xffffff});
						child.material = new THREE.MeshStandardMaterial({Map: texture});

						console.log("passou aqui");
					}
				}
			);

			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;

			obj.position.x = 47; //-45
			obj.position.y = -5;
			obj.position.z = 20;
			//obj.rotation.x-= Math.PI/2; //rotação de 90°	

			//obj.rotation.x-= Math.PI/2; //rotação de 90°
			
			
			scene.add(obj);
			elements['pug'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);


	fbxLoader.load(
		'assets/Chihuahua.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/Chihuahua_texture.png');
						child.material = new THREE.MeshStandardMaterial({Map: texture});

						//.material = new THREE.MeshStandardMaterial({color: 0xFFFF00});
						console.log("passou aqui");
					}
				}
			);
	
			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;
	
			obj.position.x = -40;
			obj.position.y = -5;
			obj.position.z = 50;
			
			
			scene.add(obj);
			elements['Chihuahua'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);
	
	
	fbxLoader.load(
		'assets/Tiger.fbx', //o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/UV Tiger.png');
						child.material = new THREE.MeshStandardMaterial({Map: texture});
						console.log("passou aqui");
					}
				}
			);
	
			obj.scale.x = 0.03;
			obj.scale.y = 0.03;
			obj.scale.z = 0.03;
	
			obj.position.x = -25; //-25
			obj.position.y = -5; // -5
			obj.position.z = 20;
			
			
			scene.add(obj);
			elements['Tiger'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);
	
	fbxLoader.load(
		'assets/Bull.fbx', //o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/UV Bull.png');
						child.material = new THREE.MeshStandardMaterial({Map: texture});
						//child.material = new THREE.MeshStandardMaterial({color: 0x000000});
						console.log("passou aqui");
					}
				}
			);
	
			obj.scale.x = 0.01; //0.01
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;
	
			obj.position.x = -30; //-30
			obj.position.y = -5; //-5
			obj.position.z = 97; //95

			
			
			scene.add(obj);
			elements['Bull'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*120 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);


    fbxLoader.load(
		'assets/Goat.fbx', //o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/UVGoat.png');
						child.material = new THREE.MeshStandardMaterial({Map: texture});

						//child.material = new THREE.MeshStandardMaterial({color: 0xf5f5dc});
						console.log("passou aqui");
					}
				}
			);
	
			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;
	
			obj.position.x = 40;
			obj.position.y = -5;
			obj.position.z = 52;

			
			
			scene.add(obj);
			elements['Goat'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);


	fbxLoader.load(
		'assets/Goat.fbx', //o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/UVGoat.png');
						child.material = new THREE.MeshStandardMaterial({Map: texture});

						//child.material = new THREE.MeshStandardMaterial({color: 0xf5f5dc});
						console.log("passou aqui");
					}
				}
			);
	
			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;
	
			obj.position.x = 30; //40
			obj.position.y = -5; //-5
			obj.position.z = 105; //52, 105

			
			
			scene.add(obj);
			elements['Goat1'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);



	fbxLoader.load(
		'assets/Horse.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/Horse UV.png');
						//child.material = new THREE.MeshStandardMaterial({color: 0xffffff});
						child.material = new THREE.MeshStandardMaterial({Map: texture});

						console.log("passou aqui");
					}
				}
			);
			
			
			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;
			
			
			obj.position.x = 3;
			obj.position.y = -4;
			obj.position.z = 3;//3
			
			
			
			scene.add(obj);
			elements['horse'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);
	

	fbxLoader.load(
		'assets/Horse.fbx',//o que carregar
		function(obj){ //função executada após o loading
			
			obj.traverse(
				function (child){
					if (child instanceof THREE.Mesh){
						let texture = textLoader.load('assets/Horse UV.png');
						//child.material = new THREE.MeshStandardMaterial({color: 0xffffff});
						child.material = new THREE.MeshStandardMaterial({Map: texture});

						console.log("passou aqui");
					}
				}
			);
			
			
			obj.scale.x = 0.01;
			obj.scale.y = 0.01;
			obj.scale.z = 0.01;
			
			
			obj.position.x = 3;
			obj.position.y = -4;
			obj.position.z = 3;//3
			
			
			
			scene.add(obj);
			elements['horse1'] = obj;
			console.log("Carregou!");
		},
		function (andamento){ //função executada durante o loading
			console.log(andamento.loaded/andamento.total*100 + "%");
		},
		function(error){//função executada se deu problema
			console.log("Deu erro: "+error);
		}
	);
	



}







var animation = function (){
	requestAnimationFrame(animation); //loop da animação

	movimentaBoneco();

	render.render(scene,camera); //quem, e como será vista a cena
}

var criaIluminacao = function (){
	let spot = new THREE.SpotLight(0xffffff);
	spot.position.set(100,100,100);
	scene.add(spot);
}

var init = function (){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x00bfff);

	camera = new THREE.PerspectiveCamera(
					40, //angulo de visualização
					window.innerWidth/window.innerHeight, //aspect ratio
					6, //distancia do near
					100 //far
				);


	render = new THREE.WebGLRenderer();
	render.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(render.domElement);

	camera.position.z = 30;
	// camera.position.y = 6;
	// camera.position.x = 4;
	createGui();
	criaIluminacao();
	loadObjects();

	animation();	


	controls = new THREE.OrbitControls(camera, render.domElement);


	let textLoader = new THREE.TextureLoader();
	let textureGround = textLoader.load('assets/grasslight-big.jpg');
	textureGround.wrapS = textureGround.wrapT = THREE.RepeatWrapping;
	textureGround.repeat.set(25,25);
	textureGround.encoding = THREE.sRGBEncoding;
	let ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,1000),
								new THREE.MeshStandardMaterial({map: textureGround}));
	
	ground.rotation.x = -Math.PI/2;
	ground.position.y-=6;
	scene.add(ground);
							
	



	// let phere = new THREE.Mesh(new THREE.SphereGeometry(3,32,32),
	// 							new THREE.MeshStandardMaterial( {color: 0xffff00} )
	// 			);
	// phere.position.x-=6;
	// scene.add(phere);


	// let ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,1000),
	// 							new THREE.MeshStandardMaterial({color: 0x7cfc00}));
	// ground.rotation.x = -Math.PI/2;
	// ground.position.y-=6;
	// scene.add(ground);
	

	


	document.addEventListener('keydown', onKeyDown); //pegar um evento do teclado. Aperta tecla.
	document.addEventListener('keyup', onKeyUp); //pegar um evento do teclado. Solta tecla.

//COMENTAR PARA VER
	 //Eventos relacionados ao mouser
	// document.addEventListener('mousemove', movimentaMouser); //pegar um evento do teclado. Aperta tecla.
	// document.addEventListener('mouseup', soltaClick); //pegar um evento do teclado. Aperta tecla.
	// document.addEventListener('mousedown', click); //pegar um evento do teclado. Aperta tecla.

}

// var x = 0.1,y = 1.5,z = 0.4;
var rotacaoPivoOmbEsq = 0.1;

/**
 * ROTAÇÃO MOUSER
 */

var estaClicando = false;

var click = function(){
	estaClicando = true;
}

var soltaClick = function(){
	estaClicando = false;
}

var mouserAnterior = {
	x:0,
	y:0

};

var movimentaMouser = function(e){
	let difMouser = {
		x: e.offsetX - mouserAnterior.x,
		y: e.offsetY - mouserAnterior.y
	}

	if (estaClicando){
		let rotacaoElemento = new THREE.Quaternion().setFromEuler( new THREE.Euler(0, //paraRadianos(difMouser.y)*0.1,
																					paraRadianos(difMouser.x)*0.1,
																					0,
																					'XYZ'));

		//elements["tronco"].quaternion.multiplyQuaternions(rotacaoElemento, elements["tronco"].quaternion);

		camera.quaternion.multiplyQuaternions(rotacaoElemento, camera.quaternion);

		//camera.rotation.y+=paraRadianos(difMouser.x)*0.1;
	//	camera.rotation.x+=paraRadianos(difMouser.y)*0.001;
	}
	mouserAnterior = {
		x:e.offsetX,
		y:e.offsetY
	
	};

}

var paraRadianos = function (valor){
	return valor *(Math.PI/180);
}
/**
 * FIM ROTAÇÃO MOUSER
 */


/**
 * Mapeamento e ações de movimento
 */
function movimentaBoneco(){
	if (keyPressed["R"]){
		elements["tronco"].rotation.y+=0.1;
	}

	if (keyPressed['W']) {
		elements["tronco"].position.z-=0.1;
	} else if (keyPressed['S']) {
			elements["tronco"].position.z+=0.1;
		}
}


var keyPressed = []; 

keyPressed['R'] = false;
keyPressed['S'] = false;
keyPressed['W'] = false;


var onKeyUp = function (e){
	console.log("Soltei: " + e.keyCode);

	//Solução elegante -> keyPressed[e.keyCode] = false;
	
	if (e.keyCode == 82){ //tecla R
		keyPressed['R'] = false;
	}

	if (e.keyCode == 87){ //tecla w
		keyPressed['W'] = false;
	}

	if (e.keyCode == 83){ //tecla s
		keyPressed['S'] = false;
	}
}


var onKeyDown = function (e){
	//console.log(e.keyCode);

	/* TECLAS DE MOVIMENTAÇÃO */
	if (e.keyCode == 87){ //tecla w
		keyPressed['W'] = true;
	}

	if (e.keyCode == 83){ //tecla s
		keyPressed['S'] = true;
	}


	if (e.keyCode == 189){ //tecla -
		elements["tronco"].scale.x-= 0.1;
		elements["tronco"].scale.y-= 0.1;
		elements["tronco"].scale.z-= 0.1;
	}

	if (e.keyCode == 187){ // tecla +
		elements["tronco"].scale.x+= 0.1;
		elements["tronco"].scale.y+= 0.1;
		elements["tronco"].scale.z+= 0.1;
	}

	if (e.keyCode == 38){ // up
		camera.position.z-=0.5;
	}

	if (e.keyCode == 40){ // down
		camera.position.z+=0.5;
	}

	
	if (e.keyCode == 81){ // q
		if (elements["pivoOmbroEsq"].rotation.x < -2.8 || elements["pivoOmbroEsq"].rotation.x > 0.1)
			rotacaoPivoOmbEsq*=-1;

		
		elements["pivoOmbroEsq"].rotation.x-=rotacaoPivoOmbEsq;
		
		console.log("Rot "+ elements["pivoOmbroEsq"].rotation.x);
	}

	if (e.keyCode == 82){ // R
		keyPressed["R"] = true;
		
	}
}
/**
 * FIM MOVIMENTOS
 */

window.onload = this.init;
