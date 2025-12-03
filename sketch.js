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
let win = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (level1) {
    //cups
    c1 = new Cup(5, windowWidth / 2, windowHeight - 90);
    cups.push(c1);

    //obstacles/platforms
    o1 = new Obstacle(windowWidth / 4, windowHeight - 50, 600, 20);
    obstacles.push(o1);
    let o2 = new Obstacle(50, 400, 300, 20);
    obstacles.push(o2);

    backgroundColor = "#DC9D00";
    secondaryColor = "#ffd366";

    //sugar.push(new Sugar(200, 0));
  }

  if (level2) {
    cups.length = 0;
    c1 = new Cup(100, 300, 560);
    cups.push(c1);

    //obstacles/platforms
    obstacles.length = 0;
    o1 = new Obstacle(100, 600, 600, 20);
    obstacles.push(o1);
    let o2 = new Obstacle(500, 300, 900, 20);
    obstacles.push(o2);

    backgroundColor = "#3E5F8A";
    secondaryColor = "#74a5e7ff";

    sugar.length = 0;
    //sugar.push(new Sugar(200, 0));

    linesDrawn.length = 0;
    win = false;
  }
}

function draw() {
  background(backgroundColor);

  obstacles.forEach((obstacle) => {
    noStroke();
    fill(secondaryColor);
    rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });

  strokeWeight(0);
  if (frameCount % 10 === 0) {
    sugar.push(new Sugar(400, 0));
  }

  for (let i = sugar.length - 1; i >= 0; i--) {
    let s = sugar[i];
    s.update();
    s.show();
    if (s.inCup) {
      sugar.splice(i, 1);
    }
  }

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

    if (cup.filledAmount - cup.requiredAmount == 0) {
      win = true;
    }
  });

  stroke(secondaryColor);
  strokeWeight(8);
  for (let l of linesDrawn) {
    line(l.x1, l.y1, l.x2, l.y2);
  }

  if (win) {
    text("you win", 0, 0);
    if (level1) {
      level1 = false;
      level2 = true;
      setup();
    }
  }
}

class Cup {
  constructor(requiredAmount, x, y) {
    this.requiredAmount = requiredAmount;
    this.x = x;
    this.y = y;
    this.filledAmount = 0;
  }

  fill() {
    if (this.filledAmount < this.requiredAmount) {
      this.filledAmount++;
    }
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
    this.vy = 0.2;
    this.radius = 2;
    this.inCup = false;
  }

  update() {
    //gravity
    this.vy += 0.2;

    this.x += this.vx;
    this.y += this.vy;
    if (this.y > height + this.radius + this.vy) {
      this.y = 0 - this.radius;
      this.vx = random(-0.5, 0.5);
      this.vy = 0.2;
    }

    // Line collision handling
    for (let l of linesDrawn) {
      let d = distToSegment(this.x, this.y, l.x1, l.y1, l.x2, l.y2);
      if (d < this.radius + 1.5) {
        // Calculate normal vector of line
        let dx = l.x2 - l.x1;
        let dy = l.y2 - l.y1;
        let len = sqrt(dx * dx + dy * dy);
        dx /= len;
        dy /= len;

        // Project velocity onto the line direction (slide along line)
        let dot = this.vx * dx + this.vy * dy;
        this.vx = dx * dot;
        this.vy = dy * dot;

        // Stick particle to the line surface
        let normX = dy;
        let normY = -dx;
        this.x += normX * (this.radius + 1.5 - d);
        this.y += normY * (this.radius + 1.5 - d);

        // Add gravity along line direction
        this.vx += dx * 0.05;
        this.vy += dy * 0.05;
      }
    }

    obstacles.forEach((obstacle) => {
      if (
        this.x > obstacle.x &&
        this.x < obstacle.x + obstacle.width &&
        this.y > obstacle.y - this.radius &&
        this.y < obstacle.y + obstacle.height + this.vy
      ) {
        this.y = obstacle.y - this.radius;
      }
    });

    cups.forEach((cup) => {
      if (
        this.x > cup.x &&
        this.x < cup.x + 30 &&
        this.y > cup.y &&
        this.y < cup.y + 20
      ) {
        cup.fill();
        this.inCup = true;
      }
    });
  }

  show() {
    fill("white");
    square(this.x, this.y, this.radius * 2);
  }
}

// Draw lines with mouse
function mouseDragged() {
  linesDrawn.push({ x1: pmouseX, y1: pmouseY, x2: mouseX, y2: mouseY });
}

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
