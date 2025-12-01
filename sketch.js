//Particle

let cups = [];
let backgroundColor = 220;
let secondaryColor = 170;
let obstacles = [];
let timer = 5;
let timert = true;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //cups
  let c1 = new Cup(100, windowWidth / 2, windowHeight - 90);
  cups.push(c1);

  //obstacles/platforms
  let o1 = new Obstacle(windowWidth / 4, windowHeight - 50, 600, 20);
  obstacles.push(o1);
  let o2 = new Obstacle(200, 400, 300, 20);
  obstacles.push(o2);

  background(backgroundColor);
}

function draw() {
  cups.forEach((cup) => {
    fill("white");
    noStroke();
    ellipse(cup.x, cup.y + 20, 30, 25);
    fill(backgroundColor);
    ellipse(cup.x, cup.y + 20, 18, 13);
    fill("white");
    rect(cup.x, cup.y, 30, 40);
    stroke("black");
    strokeWeight(2);
    text(cup.requiredAmount - cup.filledAmount, cup.x + 4, cup.y + 20);
  });
  obstacles.forEach((obstacle) => {
    noStroke();
    fill(secondaryColor);
    rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });

  // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  if (timer == 0) {
    text("The Sugar is running", 200, 200);
    textSize(50);
  }

  fill(0);
  noStroke();
  text(timer, width / 2, height / 2);
}

function mouseDragged() {
  stroke(secondaryColor);
  strokeWeight(10);
  line(pmouseX, pmouseY, mouseX, mouseY);
  timert = false;
}

class Cup {
  constructor(requiredAmount, x, y) {
    this.requiredAmount = requiredAmount;
    this.x = x;
    this.y = y;
    this.filledAmount = 0;
  }

  fill() {
    this.filledAmount++;
  }
}

class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

//CHAT - GPT VERSION
// // Sugar Sugar clone with improved physics and piling sugar in cup.
// // Draw lines to guide sugar into the cup.
// // Left-click & drag to draw.

// let sugar = [];
// let linesDrawn = [];
// let cup;
// let sugarNeeded = 200;  // goal amount
// let collected = 0;

// function setup() {
//   createCanvas(800, 600);
//   cup = { x: 560, y: 450, w: 160, h: 120 };
// }

// function draw() {
//   background(245);

//   // Draw cup
//   noStroke();
//   fill(255, 180, 0);
//   rect(cup.x, cup.y, cup.w, cup.h, 15);

//   fill(0);
//   textSize(22);
//   text(`Cup: ${collected}/${sugarNeeded}`, cup.x + 25, cup.y + 60);

//   // Draw user lines
//   stroke(50);
//   strokeWeight(3);
//   for (let l of linesDrawn) {
//     line(l.x1, l.y1, l.x2, l.y2);
//   }

//   // Spawn sugar continuously
//   if (frameCount % 2 === 0 && sugar.length < 1500) {
//     sugar.push(new Grain(random(width), 0));
//   }

//   // Update and show grains
//   for (let i = sugar.length - 1; i >= 0; i--) {
//     let g = sugar[i];

//     g.update();
//     g.show();

//     // Check cup
//     if (
//       g.x > cup.x &&
//       g.x < cup.x + cup.w &&
//       g.y > cup.y &&
//       g.y < cup.y + cup.h
//     ) {
//       collected++;
//       sugar.splice(i, 1); // remove grain
//     }
//   }

//   if (collected >= sugarNeeded) {
//     fill(0, 255, 0);
//     textSize(48);
//     text("LEVEL COMPLETE!", width / 2 - 200, height / 2);
//     noLoop();
//   }
// }

// class Grain {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.vx = random(-0.3, 0.3);
//     this.vy = random(0, 0.5);
//     this.radius = 2;
//   }

//   update() {
//     // Gravity
//     this.vy += 0.12;

//     // Movement
//     this.x += this.vx;
//     this.y += this.vy;

//     // Slight friction
//     this.vx *= 0.995;
//     this.vy *= 0.995;

//     // Bounce off floor
//     if (this.y > height - this.radius) {
//       this.y = height - this.radius;
//       this.vy *= -0.3;
//     }

//     // Bounce off drawn lines
//     for (let l of linesDrawn) {
//       let d = distToSegment(this.x, this.y, l.x1, l.y1, l.x2, l.y2);
//       if (d < this.radius + 1.5) {
//         let angle = atan2(l.y2 - l.y1, l.x2 - l.x1);
//         let speed = sqrt(this.vx * this.vx + this.vy * this.vy);
//         this.vx = -speed * cos(angle);
//         this.vy = -speed * sin(angle);
//       }
//     }
//   }

//   show() {
//     stroke(255);
//     strokeWeight(this.radius);
//     point(this.x, this.y);
//   }
// }

// // Draw lines with mouse
// function mouseDragged() {
//   linesDrawn.push({ x1: pmouseX, y1: pmouseY, x2: mouseX, y2: mouseY });
// }

// // Distance between point and line segment
// function distToSegment(px, py, x1, y1, x2, y2) {
//   let A = px - x1;
//   let B = py - y1;
//   let C = x2 - x1;
//   let D = y2 - y1;

//   let dot = A * C + B * D;
//   let lenSq = C * C + D * D;
//   let param = lenSq !== 0 ? dot / lenSq : -1;

//   let xx, yy;
//   if (param < 0) {
//     xx = x1;
//     yy = y1;
//   } else if (param > 1) {
//     xx = x2;
//     yy = y2;
//   } else {
//     xx = x1 + param * C;
//     yy = y1 + param * D;
//   }

//   let dx = px - xx;
//   let dy = py - yy;
//   return sqrt(dx * dx + dy * dy);
// }
