// oh hey its kevin
// steven is also here
let level1 = false,
  level2 = false,
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
let start = true;
let font;
let texts = [];

function preload() {
  font = loadFont("./assets/Monocraft-01.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(15);
  if (start) {
    backgroundColor = "#3D642D";
    secondaryColor = "#72ab5cff";
    textAlign(CENTER, CENTER);
    textSize(32);
    let text1 = new Text(
      "Our Knockoff of Sugar Sugar Everywhere",
      width / 2,
      50
    );

    texts.push(text1);
    let text2 = new Text("Start", width / 2, 600);
    texts.push(text2);
  }

  if (level1) {
    //cups
    sugar.length = 0;
    c1 = new Cup(100, windowWidth / 2, windowHeight - 90);
    cups.push(c1);

    //obstacles/platforms
    o1 = new Obstacle(windowWidth / 4, windowHeight - 50, 600, 20);
    obstacles.push(o1);
    let o2 = new Obstacle(50, 400, 300, 20);
    obstacles.push(o2);

    backgroundColor = "#DC9D00";
    secondaryColor = "#ffd366";
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
    if (start) {
      sugar.push(new Sugar(width / 2, 0));
    }
    if (level1) {
      sugar.push(new Sugar(200, 0));
    }
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
    text(cup.requiredAmount - cup.filledAmount, cup.x + 15, cup.y + 20);

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

  if (start) {
    strokeWeight(5);
    stroke(secondaryColor);
    fill("black");
    texts.forEach((t) => {
      text(t.text, t.x, t.y);
    });
    fill(backgroundColor);
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
    this.vx = random(-0.1, 0.1);
    this.vy = 0.1;
    this.radius = 2;
    this.inCup = false;
  }

  update() {
    //gravity
    this.vy += 0.1;

    this.x += this.vx;
    this.y += this.vy;
    if (this.y > height + this.radius + this.vy) {
      this.y = 0 - this.radius;
      this.vx = random(-0.1, 0.1);
      this.vy = 0.1;
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
    if (start) {
      // O in our
      if (this.x > 360 && this.x < 380 && this.y > 40 && this.y < 70) {
        this.y = 40 - this.radius;
        // ur in Our
      } else if (this.x > 380 && this.x < 420 && this.y > 45 && this.y < 70) {
        this.y = 45 - this.radius;
        // K in Knockoff
      } else if (this.x > 445 && this.x < 470 && this.y > 40 && this.y < 70) {
        this.y = 40 - this.radius;
        // noc in Knockoff
      } else if (this.x > 470 && this.x < 530 && this.y > 45 && this.y < 70) {
        this.y = 45 - this.radius;
        // k in Knockoff
      } else if (this.x > 530 && this.x < 550 && this.y > 40 && this.y < 70) {
        this.y = 40 - this.radius;
        // o in Knockoff
      } else if (this.x > 550 && this.x < 575 && this.y > 45 && this.y < 70) {
        this.y = 45 - this.radius;
        // ff in Knockoff
      } else if (this.x > 575 && this.x < 615 && this.y > 40 && this.y < 70) {
        this.y = 40 - this.radius;
        // o in of
      } else if (this.x > 640 && this.x < 660 && this.y > 45 && this.y < 70) {
        this.y = 45 - this.radius;
        // f in of
      } else if (this.x > 660 && this.x < 680 && this.y > 40 && this.y < 70) {
        this.y = 40 - this.radius;
        // S in Sugar
      } else if (this.x > 700 && this.x < 720 && this.y > 40 && this.y < 70) {
        this.y = 40 - this.radius;
        // ugar in Sugar
      } else if (this.x > 720 && this.x < 800 && this.y > 45 && this.y < 70) {
        this.y = 45 - this.radius;
        // S in Sugar (2)
      } else if (this.x > 830 && this.x < 850 && this.y > 40 && this.y < 70) {
        this.y = 40 - this.radius;
        // ugar in Sugar (2)
      } else if (this.x > 850 && this.x < 940 && this.y > 45 && this.y < 70) {
        this.y = 45 - this.radius;
        // E in Everywhere
      } else if (this.x > 955 && this.x < 980 && this.y > 40 && this.y < 70) {
        this.y = 40 - this.radius;
        // veryw in Everywhere
      } else if (this.x > 980 && this.x < 1085 && this.y > 45 && this.y < 70) {
        this.y = 45 - this.radius;
        // h in Everywhere
      } else if (this.x > 1085 && this.x < 1095 && this.y > 40 && this.y < 70) {
        this.y = 40 - this.radius;
        // here in Everywhere
      } else if (this.x > 1095 && this.x < 1175 && this.y > 45 && this.y < 70) {
        this.y = 45 - this.radius;
        // St in Start
      } else if (this.x > 710 && this.x < 745 && this.y > 590 && this.y < 620) {
        this.y = 590 - this.radius;
        // tart in Start
      } else if (this.x > 745 && this.x < 800 && this.y > 595 && this.y < 620) {
        this.y = 595 - this.radius;
        // t in Start
      } else if (this.x > 800 && this.x < 810 && this.y > 590 && this.y < 620) {
        this.y = 590 - this.radius;
      }
    }
  }

  show() {
    fill("white");
    square(this.x, this.y, this.radius * 2);
  }
}

class Text {
  constructor(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
  }
}

// start game button
function mouseClicked() {
  if (start) {
    if (mouseX > 710 && mouseX < 810 && mouseY > 590 && mouseY < 620) {
      start = false;
      level1 = true;
      setup();
    }
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
