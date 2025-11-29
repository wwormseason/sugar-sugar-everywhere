// oh hey its kevin
// steven is also here
let level1 = true;
let level2 = false,
  level3 = false,
  level4 = false,
  level5 = false;
let cups = [];
let backgroundColor;
let secondaryColor;
let obstacles = [];
let linesDrawn = [];
let sugar = [];
let c1;
let o1, o2;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (level1) {
    //cups
    c1 = new Cup(100, windowWidth / 2, windowHeight - 90);
    cups.push(c1);

    //obstacles/platforms
    o1 = new Obstacle(windowWidth / 4, windowHeight - 50, 600, 20);
    obstacles.push(o1);
    let o2 = new Obstacle(200, 400, 300, 20);
    obstacles.push(o2);

    backgroundColor = "#DC9D00";
    secondaryColor = "#ffd366";
  }
  background(backgroundColor);

  sugar.push(new Sugar(100, 0));
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

  // if (frameCount % 10 === 0) {
  //   sugar.push(new Sugar(100, 0));
  // }

  for (let i = sugar.length - 1; i >= 0; i--) {
    let s = sugar[i];
    s.update();
    s.show();
  }

  stroke(secondaryColor);
  strokeWeight(8);
  for (let l of linesDrawn) {
    line(l.x1, l.y1, l.x2, l.y2);
  }
}

// function mouseDragged() {
//   stroke(secondaryColor);
//   strokeWeight(8);
//   line(pmouseX, pmouseY, mouseX, mouseY);
// }

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

class Sugar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-0.3, 0.3);
    this.vy = random(0, 0.5);
    this.radius = 2;
    this.fill = random(0, 255);
  }
  update() {
    // Gravity
    this.vy += 0.12;
    // Movement
    this.x += this.vx;
    this.y += this.vy;
  }

  show() {
    fill(this.fill);
    square(this.x, this.y, 5);
  }
}

// Draw lines with mouse
function mouseDragged() {
  linesDrawn.push({ x1: pmouseX, y1: pmouseY, x2: mouseX, y2: mouseY });
}
// Distance between point and line segment
function distToSegment(px, py, x1, y1, x2, y2) {
  let A = px - x1;
  let B = py - y1;
  let C = x2 - x1;
  let D = y2 - y1;
  let dot = A * C + B * D;
  let lenSq = C * C + D * D;
  let param = lenSq !== 0 ? dot / lenSq : -1;
  let xx, yy;
  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }
  let dx = px - xx;
  let dy = py - yy;
  return sqrt(dx * dx + dy * dy);
}
