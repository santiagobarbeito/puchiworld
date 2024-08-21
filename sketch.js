let unit = 40;
let count;
let mods = [];
let cameraDistance = 350; // Parameter to control camera zoom

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Use WEBGL for 3D rendering
  noStroke();

  // Set up camera with adjustable distance
  setupCamera(cameraDistance);

  let cubesPerSide = 5; // Number of modules per side of the cube
  count = cubesPerSide * cubesPerSide * cubesPerSide;

  let index = 0;
  for (let z = 0; z < cubesPerSide; z++) {
    for (let y = 0; y < cubesPerSide; y++) {
      for (let x = 0; x < cubesPerSide; x++) {
        mods[index++] = new Module(
          (x - cubesPerSide / 2) * unit * 2, // x offset
          (y - cubesPerSide / 2) * unit * 2, // y offset
          (z - cubesPerSide / 2) * unit * 2, // z offset
          random(-unit, unit),
          random(-unit, unit),
          random(-unit, unit),
          random(0.05, 0.8),
          unit
        );
      }
    }
  }

  // Set up lighting once
  
}

function draw() {
  pointLight(190, 255, 190, 200, -150, 270); // Luz puntual principal
  pointLight(190, 190, 255, -107, 230, -304); // Luz puntual secundaria
  pointLight(255, 190, 190, 331, 222, -163); // Luz puntual secundaria
  background(0);
  orbitControl(); // Enable camera rotation, zoom, and pan

  // Update and draw each module
  for (let i = 0; i < count; i++) {
    mods[i].update();
    mods[i].draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setupCamera(distance) {
  // Calculate camera position based on distance parameter
  let camX = distance;
  let camY = distance / 2;
  let camZ = distance;

  let centerX = 0;
  let centerY = 0;
  let centerZ = 0;
  let upX = 0;
  let upY = 1;
  let upZ = 0;

  camera(camX, camY, camZ, centerX, centerY, centerZ, upX, upY, upZ);
}

// Optimized Module class
class Module {
  constructor(xOff, yOff, zOff, x, y, z, speed, unit) {
    this.xOff = xOff;
    this.yOff = yOff;
    this.zOff = zOff;
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = speed;
    this.unit = unit;
    this.xDir = random([-1, 1]);
    this.yDir = random([-1, 1]);
    this.zDir = random([-1, 1]);
    this.anguloX = random(TWO_PI);
    this.anguloY = random(TWO_PI);
    this.anguloZ = random(TWO_PI);
    this.r = 50;
    this.rotSpeedX = random(0.01, 0.03);
    this.rotSpeedY = random(0.01, 0.03);
    this.rotSpeedZ = random(0.01, 0.03);
    this.color = color(255, 255, 255); // Use a single color object
  }

  update() {
    // Move along x, y, and z axes
    this.x += this.speed * this.xDir;
    this.y += this.speed * this.yDir;
    this.z += this.speed * this.zDir;

    // Reverse direction if reaching boundaries
    if (this.x >= this.unit || this.x <= -this.unit) this.xDir *= -1;
    if (this.y >= this.unit || this.y <= -this.unit) this.yDir *= -1;
    if (this.z >= this.unit || this.z <= -this.unit) this.zDir *= -1;

    // Rotate around each axis
    this.anguloX += this.rotSpeedX;
    this.anguloY += this.rotSpeedY;
    this.anguloZ += this.rotSpeedZ;
  }

  draw() {
    push();
    translate(this.xOff + this.x, this.yOff + this.y, this.zOff + this.z); // Position in 3D space

    // Rotate the module along X, Y, and Z axes
    rotateX(this.anguloX);
    rotateY(this.anguloY);
    rotateZ(this.anguloZ);

    // Draw the module body
    fill(this.color); // Use precomputed color
    box(this.unit * 0.1, this.unit * 0.1, this.r);

    // Draw the module filter
    fill(249, 166, 30);
    translate(0, 0, -this.r / 2 - this.unit * 0.2);
    box(this.unit * 0.1, this.unit * 0.1, this.unit * 0.4);

    pop();
  }
}


