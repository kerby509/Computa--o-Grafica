/*  MANUEL
	Q -> Rotaciona ombro esquerdo
	R -> Rotaciona o tronco.
    D -> Rotaciona ombro direito
	A -> Rotaciona pé direito
	S -> Rotacao pé esquerdo
	L -> Rotacao cotovelo esquerdo

*/



var scene;//nosso mundo virtual
var camera; 
var render;// responsÃ¡vel por gerar as imagems

var elements = [];
var velCubo = 0.10;
var earth;

var criaMonstro = function(){

	let red = 	new THREE.Color(1,0,0);
	let green = new THREE.Color(0,1,0);
	let blue = 	new THREE.Color(0,0,1);
	let cores = [red, green, blue];

	let materials = [
		new THREE.MeshBasicMaterial({color: red}),
		new THREE.MeshBasicMaterial({color: green}),
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: red}),
		new THREE.MeshBasicMaterial({color: green}),
		new THREE.MeshBasicMaterial({color: blue})
	];	

	
	let tronco = new THREE.Mesh(new THREE.BoxGeometry(4,9, 2), 
								new THREE.MeshBasicMaterial({color: 0x899400})); /// 4,7,2
	elements["tronco"] = tronco;
	//tronco.position.y+=7;
	tronco.name = "Sol";
	
	let cabeca = new THREE.Mesh(new THREE.SphereGeometry(1.5,32, 32), new THREE.MeshBasicMaterial({color: 0x0000ff})); // 0,10,5
	tronco.add(cabeca);
	elements["cabeca"] = cabeca;
	cabeca.position.y = 5.7;
	
	let ombroEsq = new THREE.Mesh(new THREE.SphereGeometry(1,32, 32), new THREE.MeshBasicMaterial({color: 0xffffff})); // 0,10,5
	ombroEsq.position.x = -2.6;
	ombroEsq.position.y = 3.7; //3.3
	tronco.add(ombroEsq);
	let pivoObroEsq = new THREE.Group();
	ombroEsq.add(pivoObroEsq);
	elements["pivoOmbroEsq"] = pivoObroEsq;
	let bracoEsqP1 = new THREE.Mesh(new THREE.BoxGeometry(1,5, 1), new THREE.MeshBasicMaterial({color: 0x00ff00})); // 0,10,5
	bracoEsqP1.position.x -= 0.2;
	bracoEsqP1.position.y = -2;
	pivoObroEsq.add(bracoEsqP1);


    let ombroDir = new THREE.Mesh(new THREE.SphereGeometry(1,32, 32), new THREE.MeshBasicMaterial({color: 0xffffff})); // 0,10,5
	ombroDir.position.x = 2.9; //k
	ombroDir.position.y = 3.7; // posição
	tronco.add(ombroDir);
	let pivoObroDir = new THREE.Group();
	ombroDir.add(pivoObroDir);
	elements["pivoOmbroDir"] = pivoObroDir;
	let bracoDirP2 = new THREE.Mesh(new THREE.BoxGeometry(1,5, 1), new THREE.MeshBasicMaterial({color: 0x00ff00})); // 0,10,5
	bracoDirP2.position.x -= 0.2;
	bracoDirP2.position.y = 2;
	pivoObroDir.add(bracoDirP2);

	
	let ombrocotoEsq1 = new THREE.Mesh(new THREE.SphereGeometry(1,32, 32), new THREE.MeshBasicMaterial({color: 0xffffff})); // 0,10,5
	ombrocotoEsq1.position.x = -0.1; 
	ombrocotoEsq1.position.y = -1.3; // rotacao -3.3
	bracoEsqP1.add(ombrocotoEsq1);
	
	let pivoObroEsq1 = new THREE.Group();
	ombrocotoEsq1.add(pivoObroEsq1);
	elements["pivoOmbrocotoEsq1"] = pivoObroEsq1;

	let cotoEsqp1 = new THREE.Mesh(new THREE.BoxGeometry(1,5, 1), new THREE.MeshBasicMaterial({color: 0x00ff00})); // 0,10,5
	cotoEsqp1.position.x -= 0.2; //k
	cotoEsqp1.position.y = -2; //rotacao
	pivoObroEsq1.add(cotoEsqp1);
	
	let ombrocotoDir2 = new THREE.Mesh(new THREE.SphereGeometry(1,32, 32), new THREE.MeshBasicMaterial({color: 0xffffff})); // 0,10,5
	ombrocotoDir2.position.x = 0.1; 
	ombrocotoDir2.position.y = 1.3; // rotacao 
	bracoDirP2.add(ombrocotoDir2);
	
	let pivoObroDir2 = new THREE.Group();
	ombrocotoDir2.add(pivoObroDir2);
	elements["pivoOmbrocotoDir2"] = pivoObroDir2;

	let cotoDir2 = new THREE.Mesh(new THREE.BoxGeometry(1,5, 1), new THREE.MeshBasicMaterial({color: 0x00ff00})); // 0,10,5
	cotoDir2.position.x -= 0.2; //
	cotoDir2.position.y = 2; //rotacao
	pivoObroDir2.add(cotoDir2);
	
	
	
	
	
	
	
	let ombropéEsq = new THREE.Mesh(new THREE.SphereGeometry(1,32, 32), new THREE.MeshBasicMaterial({color: 0xffffff})); // 0,10,5
	ombropéEsq.position.x = -2.1; //k
	ombropéEsq.position.y = -4.2; // rotacao 
	tronco.add(ombropéEsq);
	let pivoObro1Esq = new THREE.Group();
	ombropéEsq.add(pivoObro1Esq);
	elements["pivoOmbropéEsq"] = pivoObro1Esq;

	let péEsqp1 = new THREE.Mesh(new THREE.BoxGeometry(1,5, 1), new THREE.MeshBasicMaterial({color: 0x00ff00})); // 0,10,5
	péEsqp1.position.x -= 0.2; //avanca mais perto
	péEsqp1.position.y = -2; //rotacao
	pivoObro1Esq.add(péEsqp1);


	let ombropéDir = new THREE.Mesh(new THREE.SphereGeometry(1,32, 32), new THREE.MeshBasicMaterial({color: 0xffffff})); // 0,10,5
	ombropéDir.position.x = 2.1; //avancar mais perto
	ombropéDir.position.y = -4.2; // rotacao 
	tronco.add(ombropéDir);
	let pivoObro2Dir = new THREE.Group();
	ombropéDir.add(pivoObro2Dir);
	elements["pivoOmbropéDir"] = pivoObro2Dir;

	let péDir = new THREE.Mesh(new THREE.BoxGeometry(1,5, 1), new THREE.MeshBasicMaterial({color: 0x00ff00})); // 0,10,5
	péDir.position.x -= 0.2; //k
	péDir.position.y = -2; //rotacao
	pivoObro2Dir.add(péDir);




	//cubo.add(cubo1);
	
	scene.add(tronco);
	//scene.add(pivo);
}



var animation = function (){
	
	requestAnimationFrame(animation);

	




	render.render(scene,camera);
}

var init = function (){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 100);

	render = new THREE.WebGLRenderer();
	render.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(render.domElement);

	camera.position.z = 50;
	camera.position.y = 6;
	camera.position.x = 4;

	criaMonstro();

	animation();	

	document.addEventListener('keydown', onKeyDown); //pegar um evento do teclado. Aperta tecla.

}

// var x = 0.1,y = 1.5,z = 0.4;
var rotacaoPivoOmbEsq = 0.1;
var rotacaoPivoOmbDir = 0.1;
var rotacaoPivoOmbpéDir= 0.1;
var rotacaoPivoOmbpéEsq= 0.1;
var rotacaoPivoOmbcotoEsq= 0.1;
var rotacaoPivoOmbcotoDir2= 0.1

var onKeyDown = function (e){
	console.log(e.keyCode);

	if (e.keyCode == 189){ //tecla -
		elements.forEach(cubo => {
			cubo.scale.x-= 0.1;
			cubo.scale.y-= 0.1;
			cubo.scale.z-= 0.1;
		});
	}

	if (e.keyCode == 187){ // tecla +
		elements.forEach(cubo => {
			cubo.scale.x+= 0.1;
			//cubo.scale.y+= 0.1;
			//cubo.scale.z+= 0.1;
		});
	}

	if (e.keyCode == 38){ // up
		elements.forEach(cubo => {
			cubo.position.y+= 0.1;
		});
	}

	if (e.keyCode == 40){ // down
		elements.forEach(cubo => {
			cubo.position.y-= 0.1;
		});
	}

	if (e.keyCode == 16){ // down
		earth.rotation.z+=0.1;
	}

	if (e.keyCode == 81){ // q
		if (elements["pivoOmbroEsq"].rotation.x < -2.8 || elements["pivoOmbroEsq"].rotation.x > 0.1)
			rotacaoPivoOmbEsq*=-1;

		
		elements["pivoOmbroEsq"].rotation.x-=rotacaoPivoOmbEsq;
		
		console.log("Rot "+ elements["pivoOmbroEsq"].rotation.x);
	}

	if (e.keyCode == 68){ // d para movimenta
		if (elements["pivoOmbroDir"].rotation.x < 0.1 || elements["pivoOmbroDir"].rotation.x > 3.2)
        rotacaoPivoOmbDir*=-1;

		
		elements["pivoOmbroDir"].rotation.x-=rotacaoPivoOmbDir;
		
		console.log("Rot "+ elements["pivoOmbroDir"].rotation.x);
	}

	if (e.keyCode == 65){ // A para movimenta pé direita
		if (elements["pivoOmbropéDir"].rotation.x < -2.8 || elements["pivoOmbropéDir"].rotation.x > 0.1)
        rotacaoPivoOmbpéDir*=-1;

		
		elements["pivoOmbropéDir"].rotation.x-=rotacaoPivoOmbpéDir;
		
		console.log("Rot "+ elements["pivoOmbropéDir"].rotation.x);
	}

	if (e.keyCode == 83){ // S para movimenta pé esq
		if (elements["pivoOmbropéEsq"].rotation.x < -2.8 || elements["pivoOmbropéEsq"].rotation.x > 0.1)
        rotacaoPivoOmbpéEsq*=-1;

		
		elements["pivoOmbropéEsq"].rotation.x-=rotacaoPivoOmbpéEsq;
		
		console.log("Rot "+ elements["pivoOmbropéEsq"].rotation.x);
	}


	if (e.keyCode == 76){ // L para movimenta coto esq
		if (elements["pivoOmbrocotoEsq1"].rotation.x < 0.1 || elements["pivoOmbrocotoEsq1"].rotation.x > 3.2)
        rotacaoPivoOmbcotoEsq*=-1;

		
		elements["pivoOmbrocotoEsq1"].rotation.x-=rotacaoPivoOmbcotoEsq;
		
		console.log("Rot "+ elements["pivoOmbrocotoEsq1"].rotation.x);
	}

	if (e.keyCode == 80){ // P para movimenta coto direito
		if (elements["pivoOmbrocotoDir2"].rotation.x < 0.1 || elements["pivoOmbrocotoDir2"].rotation.x > 3.2)
        rotacaoPivoOmbDir*=-1;

		
		elements["pivoOmbrocotoDir2"].rotation.x-=rotacaoPivoOmbcotoDir2;
		
		console.log("Rot "+ elements["pivoOmbrocotoDir2"].rotation.x);
	}


	if (e.keyCode == 82){ // R
		elements["tronco"].rotation.y-=0.1;

    }

	
		
        
}






        
        
        
        
        
        
        
        
        
        
       

window.onload = this.init;

