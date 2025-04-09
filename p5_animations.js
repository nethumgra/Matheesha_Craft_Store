/**
 * p5.js animations for Matheesha Craft Store
 * This file contains creative animations and interactive effects
 * using p5.js to enhance the user experience
 */

let particles = [];
const particleCount = 30;
let particleCanvas;

function setup() {
  // Create a canvas that fits the p5 container
  const container = document.getElementById('p5-container');
  particleCanvas = createCanvas(windowWidth, windowHeight);
  particleCanvas.parent('p5-container');
  
  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Set the frame rate to be gentle on resources
  frameRate(30);
}

function draw() {
  // Transparent background
  clear();
  
  // Only animate when visible in viewport
  if (isElementInViewport(document.getElementById('p5-container'))) {
    // Update and display particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].display();
    }
  }
}

function windowResized() {
  // Adjust canvas size when window is resized
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor() {
    // Initialize particle with random properties
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-0.3, 0.3), random(-0.3, 0.3));
    this.acceleration = createVector(0, 0);
    this.size = random(3, 8);
    this.color = this.getRandomColor();
    this.alpha = random(100, 150);
    this.maxSpeed = 1;
  }
  
  getRandomColor() {
    // Colors inspired by the craft store theme
    const colors = [
      [245, 158, 11], // amber-500
      [217, 119, 6],  // amber-600
      [146, 64, 14],  // amber-900
      [252, 211, 77], // amber-300
      [254, 243, 199] // amber-100
    ];
    return colors[Math.floor(random(colors.length))];
  }
  
  update() {
    // Add slight random movement
    let randomForce = createVector(random(-0.03, 0.03), random(-0.03, 0.03));
    this.acceleration.add(randomForce);
    
    // Update velocity and position
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    
    // Bounce off edges
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }
  
  display() {
    // Draw the particle
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    circle(this.position.x, this.position.y, this.size);
  }
}

// Interactive floating elements for specific sections
let craftFlowCanvas;
let craftElements = [];
const elementCount = 15;
const craftElementTypes = ['pot', 'basket', 'jewelry', 'fabric', 'woodcarving'];

// Create the craft flow canvas when the page loads
window.addEventListener('load', function() {
  setupCraftFlow();
});

function setupCraftFlow() {
  // Create canvas for craft section
  const craftSection = document.querySelector('#about');
  if (craftSection) {
    const craftWidth = craftSection.offsetWidth;
    const craftHeight = craftSection.offsetHeight;
    
    craftFlowCanvas = createCanvas(craftWidth, craftHeight);
    craftFlowCanvas.parent('about');
    craftFlowCanvas.style('position', 'absolute');
    craftFlowCanvas.style('z-index', '0');
    craftFlowCanvas.style('opacity', '0.1');
    
    // Initialize craft elements
    for (let i = 0; i < elementCount; i++) {
      craftElements.push(new CraftElement(craftWidth, craftHeight));
    }
  }
}

class CraftElement {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.position = createVector(random(w), random(h));
    this.velocity = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    this.type = random(craftElementTypes);
    this.size = random(10, 30);
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.01, 0.01);
  }
  
  update() {
    this.position.add(this.velocity);
    this.rotation += this.rotationSpeed;
    
    // Wrap around edges
    if (this.position.x < 0) this.position.x = this.width;
    if (this.position.x > this.width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = this.height;
    if (this.position.y > this.height) this.position.y = 0;
  }
  
  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    
    switch (this.type) {
      case 'pot':
        this.drawPot();
        break;
      case 'basket':
        this.drawBasket();
        break;
      case 'jewelry':
        this.drawJewelry();
        break;
      case 'fabric':
        this.drawFabric();
        break;
      case 'woodcarving':
        this.drawWoodcarving();
        break;
    }
    
    pop();
  }
  
  drawPot() {
    fill(146, 64, 14, 50);
    ellipse(0, 0, this.size, this.size * 0.8);
    rect(-this.size/3, -this.size/2, this.size/1.5, -this.size/3);
  }
  
  drawBasket() {
    fill(217, 119, 6, 50);
    ellipse(0, 0, this.size, this.size/2);
    rect(-this.size/2, -this.size/4, this.size, -this.size/2);
  }
  
  drawJewelry() {
    fill(252, 211, 77, 50);
    circle(0, 0, this.size/2);
    for (let i = 0; i < 8; i++) {
      const angle = TWO_PI * i / 8;
      const x = cos(angle) * this.size/2;
      const y = sin(angle) * this.size/2;
      circle(x, y, this.size/6);
    }
  }
  
  drawFabric() {
    fill(254, 243, 199, 50);
    rect(-this.size/2, -this.size/2, this.size, this.size);
    line(-this.size/2, -this.size/4, this.size/2, -this.size/4);
    line(-this.size/2, 0, this.size/2, 0);
    line(-this.size/2, this.size/4, this.size/2, this.size/4);
  }
  
  drawWoodcarving() {
    fill(146, 64, 14, 50);
    rect(-this.size/2, -this.size/3, this.size, this.size/1.5);
    rect(-this.size/3, -this.size/2, this.size/1.5, this.size);
  }
}

// Helper function to determine if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= -rect.height &&
    rect.left >= -rect.width &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width
  );
}

// Create an interactive cursor effect
let prevX = 0;
let prevY = 0;
let cursorTrails = [];
const maxTrails = 10;

function mouseMoved() {
  // Calculate the speed of mouse movement
  const speed = dist(mouseX, mouseY, prevX, prevY);
  
  // Add current position to the trail
  cursorTrails.push({
    x: mouseX,
    y: mouseY,
    size: map(speed, 0, 100, 5, 20),
    alpha: 100
  });
  
  // Keep trail at max length
  if (cursorTrails.length > maxTrails) {
    cursorTrails.shift();
  }
  
  prevX = mouseX;
  prevY = mouseY;
}

// Draw cursor trails
function drawCursorTrails() {
  for (let i = 0; i < cursorTrails.length; i++) {
    const trail = cursorTrails[i];
    
    // Fade out trail
    trail.alpha -= 5;
    
    if (trail.alpha > 0) {
      noStroke();
      fill(245, 158, 11, trail.alpha);
      circle(trail.x, trail.y, trail.size);
    }
  }
  
  // Remove faded trails
  cursorTrails = cursorTrails.filter(trail => trail.alpha > 0);
}
