let earth
let moon
let FOVRatio = .02
let cameraDistance = 800
let moonSize = 1
let earthSize = moonSize * 3.66
let distance = earthSize * 63
var fov
var cameraZ

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
	earth = loadImage("assets/3_no_ice_clouds_2k.jpg")
	moon = loadImage("assets/2k_moon.jpg")
	
	fov = 60 / 180 * PI * FOVRatio;
	cameraZ = height / 2.0 / tan(60 / 180 * PI / 2.0);
	
	perspective(fov, windowWidth / windowHeight, cameraZ * 0.1, cameraZ * 10);
  

}

function draw() {
	background(0)

	let locY = (mouseY / windowHeight - 0.5) * 2
	let locX = (mouseX / windowWidth - 0.5) * 2
	ambientLight(15)

	directionalLight(255, 255, 255, -2*locX, -2*locY, -.3);

	rotateX((PI)-locY)
	rotateY(2*-(locX))
	rotate(PI)

	texture(moon)
	sphere(moonSize)

	translate(0, 0, distance);
	
	texture(earth)
	sphere(earthSize)

	camera(0, 0, cameraDistance, 0, 0, 0, 0, 1, 0);
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		moonSize += 0.2;
		earthSize = moonSize * 3.66
		distance = earthSize * 63
		console.log('Moon size: ', moonSize)
	} else if (keyCode === DOWN_ARROW && moonSize > 0.3) {
		moonSize -= 0.2;
		earthSize = moonSize * 3.66
		distance = earthSize * 63
		console.log('Moon size: ', moonSize)
	}
	if(keyCode === RIGHT_ARROW && FOVRatio > 0.005) {
		FOVRatio -= 0.005;
		fov = 60 / 180 * PI * FOVRatio;
		console.log('Zoom: ', FOVRatio)
		perspective(fov, windowWidth / windowHeight, cameraZ * 0.1, cameraZ * 10);
	} 
	if (keyCode === LEFT_ARROW && FOVRatio < 1.6) {
		FOVRatio += 0.005;
		fov = 60 / 180 * PI * FOVRatio;
		console.log('Zoom: ', FOVRatio)
		perspective(fov, windowWidth / windowHeight, cameraZ * 0.1, cameraZ * 10);
	}
	return false; // prevent default
  }
