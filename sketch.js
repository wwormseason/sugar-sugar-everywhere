let counter = 0;
let win = false;
let gravity;
let anti = false;
let button;
let sugarhitCup;
let sugarFallingSound;
let buttonPress;
let youWin;
let levelComplete;
let levelWon = false;

class Cup {
  constructor(requiredAmount, x, y, flipped = false) {
    this.requiredAmount = requiredAmount;
    this.x = x;
    this.y = y;
    this.filledAmount = 0;
    this.flipped = flipped;
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
    this.vy = 0.05;
    this.radius = 2;
    this.inCup = false;
  }

  update() {
    //gravity
    this.vy += gravity.y;

    this.x += this.vx;
    this.y += this.vy;

    //bottom to top
    if (this.y > height + this.radius + this.vy) {
      this.y = 0 - this.radius;
      this.vx = random(-0.1, 0.1);
      this.vy = 0.05;
    }

    // top to bottom
    if (this.y < 0 - this.radius - this.vy) {
      this.y = height + this.radius;
      this.vx = random(-0.1, 0.1);
      this.vy = 0.05;
    }

    //Right to left
    if (this.x > width + this.radius + this.vx) {
      this.x = 0 - this.radius;
      this.vy = 0.05;
    }

    //left to right
    if (this.x < 0 - this.radius - this.vx) {
      this.x = width + this.radius;
      this.vy = 0.05;
    }

    // Line collision handling
    for (let l of game[counter].lines) {
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
        this.y += normY * (this.radius + 1.5 - d) - this.radius * 2;

        // Add gravity along line direction
        this.vx += dx * 0.05;
        this.vy += dy * 0.05;
      }
    }

    game[counter].obstacles.forEach((obstacle) => {
      if (
        this.x > obstacle.x &&
        this.x < obstacle.x + obstacle.width &&
        this.y > obstacle.y - this.radius &&
        this.y < obstacle.y + obstacle.height + this.vy
      ) {
        this.y = obstacle.y - this.radius;
      }
    });

    game[counter].cups.forEach((cup) => {
      if (!cup.flipped) {
        if (
          this.x > cup.x &&
          this.x < cup.x + 30 &&
          this.y > cup.y &&
          this.y < cup.y + 20
        ) {
          cup.fill();
          this.inCup = true;
          if (!sugarhitCup.isPlaying()) {
            // prevent multiple overlaps
            sugarhitCup.play();
          }
        }
      } else {
        if (
          this.x > cup.x &&
          this.x < cup.x + 30 &&
          this.y > cup.y + 40 &&
          this.y < cup.y + 60
        ) {
          cup.fill();
          this.inCup = true;
          if (!sugarhitCup.isPlaying()) {
            // prevent multiple overlaps
            sugarhitCup.play();
          }
        }
      }
    });
    if (counter == 0) {
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
    } else {
      if (this.x > 1400 && this.x < 1450 && this.y > 95 && this.y < 150) {
        this.y = 95 - this.radius;
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

let game = {
  0: {
    cups: [],
    obstacles: [],
    lines: [],
    sugar: [],
    sugarPosition: 1535 / 2,
    texts: [
      new Text("Our Knockoff of Sugar Sugar Everywhere", 1535 / 2, 50),
      new Text("Start", 1535 / 2, 600),
    ],
    bgColor: "#3D642D",
    fgColor: "#72ab5cff",
  },
  1: {
    cups: [new Cup(100, 1535 / 2, 790 - 90)],
    obstacles: [new Obstacle(1535 / 4, 790 - 50, 600, 20)],
    lines: [],
    sugar: [],
    sugarPosition: 200,
    texts: [],
    bgColor: "#DC9D00",
    fgColor: "#ffd366",
  },
  2: {
    cups: [new Cup(100, 300, 560)],
    obstacles: [
      new Obstacle(100, 600, 600, 20),
      new Obstacle(500, 300, 900, 20),
    ],
    lines: [],
    sugar: [],
    sugarPosition: 600,
    texts: [],
    bgColor: "#3E5F8A",
    fgColor: "#74a5e7ff",
  },
  3: {
    cups: [new Cup(100, 300, 600), new Cup(100, 1200, 700)],
    obstacles: [new Obstacle(0, 640, 800, 20), new Obstacle(800, 740, 700, 20)],
    lines: [],
    sugar: [],
    sugarPosition: 800,
    texts: [],
    bgColor: "#924E7D",
    fgColor: "#d484baff",
  },
  4: {
    cups: [new Cup(100, 1535 / 2, 120 - 90, true)],
    obstacles: [new Obstacle(1535 / 4, 790 - 50, 600, 20)],
    lines: [],
    sugar: [],
    sugarPosition: 200,
    texts: [],
    bgColor: "#CB2821",
    fgColor: "#ec5f5aff",
  },
  5: {
    //Amount, x, y, flipped?
    cups: [
      new Cup(100, 910, 590),
      new Cup(100, 910, 10, true),
      new Cup(100, 500, 490, true),
    ],
    obstacles: [
      //x,y, width , height
      new Obstacle(130, 640, 140, 20),
      new Obstacle(700, 630, 400, 20),
    ],
    lines: [],
    sugar: [],
    sugarPosition: 200,
    texts: [],
    bgColor: "#4A192C",
    fgColor: "#8e4360ff",
  },
};

// start game button
function mouseClicked() {
  if (counter == 0) {
    if (mouseX > 710 && mouseX < 810 && mouseY > 590 && mouseY < 620) {
      counter++;
    }
  } else if (counter > 0 && counter <= 5) {
    if (
      mouseX > 1400 &&
      mouseX < 1450 &&
      mouseY > 100 &&
      mouseY < 150 &&
      win == false
    ) {
      game[counter].lines.length = 0;
      game[counter].sugar.length = 0;
      game[counter].cups.forEach((cup) => {
        cup.filledAmount = 0;
      });
    }
    if (
      mouseX > 675 &&
      mouseX < 850 &&
      mouseY > 590 &&
      mouseY < 620 &&
      win == true
    ) {
      if (counter < 5) {
        counter++;
        win = false;
      }
    }
    if (
      mouseX > 680 &&
      mouseX < 850 &&
      mouseY > 590 &&
      mouseY < 620 &&
      win == true &&
      counter == 5
    ) {
      window.close();
    }
  }
}

// Draw lines with mouse
function mouseDragged() {
  if (win == false) {
    game[counter].lines.push({
      x1: pmouseX,
      y1: pmouseY,
      x2: mouseX,
      y2: mouseY,
    });
  }
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

function preload() {
  font = loadFont("./assets/Monocraft-01.ttf");
  sugarFallingSound = loadSound("AudioAssets/sandfalling.mp3");
  sugarhitCup = loadSound("AudioAssets/sandcollectingincup.mp3");
  buttonPress = loadSound("AudioAssets/gravitybuttonsound.mp3");
  levelComplete = loadSound("AudioAssets/level-passed-143039.mp3");
  youWin = loadSound("AudioAssets/winsoundeffect.mp3");
}

function setup() {
  createCanvas(1535, 790);
  textFont(font);

  button = createButton("Turn Gravity On ☝️");
  button.position(60, 130);
  button.size(100, 50);
  button.style("border-radius: 50px;");
  button.mousePressed(toggleGravity);
  gravity = createVector(0, 0.05);
}

function draw() {
  button.style("background-color", game[counter].bgColor);
  if (counter === 4 || counter === 5) {
    button.show();
  } else {
    button.hide();
  }

  if (game[counter].sugar.length > 0) {
    if (!sugarFallingSound.isPlaying()) {
      sugarFallingSound.loop();
    }
  } else {
    if (sugarFallingSound.isPlaying()) {
      sugarFallingSound.stop();
    }
  }

  background(game[counter].bgColor);
  if (counter == 0) {
    textSize(32);
    textAlign(CENTER, CENTER);
  } else {
    textSize(15);
  }

  game[counter].obstacles.forEach((obstacle) => {
    noStroke();
    fill(game[counter].fgColor);
    rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });

  strokeWeight(0);
  if (frameCount % 3 === 0) {
    game[counter].sugar.push(new Sugar(game[counter].sugarPosition, 0));
  }

  for (let i = game[counter].sugar.length - 1; i >= 0; i--) {
    let s = game[counter].sugar[i];
    s.update();
    s.show();
    if (s.inCup) {
      game[counter].sugar.splice(i, 1);
    }
  }

  game[counter].cups.forEach((cup) => {
    fill("white");
    noStroke();

    if (!cup.flipped) {
      //normal cup
      ellipse(cup.x, cup.y + 20, 30, 25);
      fill(game[counter].bgColor);
      ellipse(cup.x, cup.y + 20, 18, 13);
      fill("white");
      rect(cup.x, cup.y, 30, 40);
    } else {
      //flipped cup
      rect(cup.x, cup.y, 30, 40);
      fill("white");
      ellipse(cup.x, cup.y + 40, 30, 25);
      fill(game[counter].bgColor);
      ellipse(cup.x, cup.y + 40, 18, 13);
    }

    stroke("black");
    strokeWeight(2);
    text(cup.requiredAmount - cup.filledAmount, cup.x + 15, cup.y + 20);
  });

  // Only check win if there is at least one cup
  if (game[counter].cups.length > 0) {
    win = game[counter].cups.every(
      (cup) => cup.filledAmount >= cup.requiredAmount
    );
  } else {
    win = false;
  }

  if (win && !levelWon) {
    levelComplete.play();
    levelWon = true;
  }

  if (!win) {
    levelWon = false;
  }

  stroke(game[counter].fgColor);
  strokeWeight(8);
  for (let l of game[counter].lines) {
    line(l.x1, l.y1, l.x2, l.y2);
  }
  if (counter > 0) {
    fill(game[counter].fgColor);
    rect(1400, 100, 50);
    fill("black");
    text("Reset", 1425, 120);
  }
  if (win) {
    if (counter < 5) {
      noStroke();
      textSize(32);
      fill(255, 200);
      rect(0, 0, width, height);
      stroke(game[counter].fgColor);
      fill("black");
      text("You Finished This Level!", 1535 / 2, 300);
      text("Continue", 1535 / 2, 600);
      textSize(15);
    } else {
      textSize(32);
      fill(150, 200);
      rect(0, 0, width, height);
      fill("black");
      text("You Finished The Game!", 1535 / 2, 300);
      text("End Game", 1535 / 2, 600);
      textSize(15);
      youWin.play();
    }
  }

  if (counter == 0) {
    strokeWeight(5);
    stroke(game[counter].fgColor);
    fill("black");
    game[counter].texts.forEach((t) => {
      text(t.text, t.x, t.y);
    });
    fill(game[counter].bgColor);
  }

  // text(`${pmouseX}, ${pmouseY}`, 100, 100);
}

function toggleGravity() {
  anti = !anti;
  if (anti) {
    gravity.y = -0.05;
    button.html("Gravity Off 🫳");
    buttonPress.play();
  } else {
    gravity.y = 0.05;
    button.html("Gravity On 🫴");
    buttonPress.play();
  }
}
