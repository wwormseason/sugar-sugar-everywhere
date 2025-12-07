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
let gameWon = false;
let backimage;

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
      this.vy = 0.05;
    }

    // top to bottom
    if (this.y < 0 - this.radius - this.vy) {
      this.y = 0;
      this.vx = 0.05;
    }

    //Right to left
    if (this.x > 1535 + this.radius + this.vx) {
      this.x = 0 - this.radius;
      this.vy = 0.05;
    }

    //left to right
    if (this.x < 0 - this.radius - this.vx) {
      this.x = 1535 + this.radius;
      this.vy = 0.05;
    }

    // Line collision handling
    for (let l of game[counter].lines) {
      //console.log(l.x1, l.y1, l.x2, l.y2);

      let d = distToSegment(this.x, this.y, l.x1, l.y1, l.x2, l.y2);
      if (d < this.radius + 4) {
        let x1, x2, y1, y2;
        if (l.x2 < l.x1 && l.y2 < l.y1) {
          x1 = l.x2;
          x2 = l.x1;

          y1 = l.y2;
          y2 = l.y1;
        } else {
          x1 = l.x1;
          x2 = l.x2;

          y1 = l.y1;
          y2 = l.y2;
        }

        // line direction
        let dx = x2 - x1;
        let dy = y2 - y1;
        let len = sqrt(dx * dx + dy * dy);
        dx /= len;
        dy /= len;

        // normal vector
        let nx = -dy;
        let ny = dx;

        // distance from line (signed)
        let distToLine = (this.x - x1) * nx + (this.y - y1) * ny;

        // push sugar out of the line
        this.x -= nx * (this.radius - distToLine);
        this.y -= ny * (this.radius - distToLine) * 2 ;

        // Velocity → project onto tangent (sliding)
        let dot = this.vx * dx + this.vy * dy;
        this.vx = dx * dot;
        this.vy = dy * dot;

        //  ADJUST for gravity (SMOOTH)
        this.vx += dx * gravity.y * 0.5;
        this.vy += dy * gravity.y * 0.5;
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
        this.vx = 0.1;
      }
      if (
        this.x > obstacle.x &&
        this.x < obstacle.x + obstacle.width &&
        this.y <= obstacle.y + obstacle.height - this.vy &&
        this.y >= obstacle.y + obstacle.height + this.vy
      ) {
        console.log("bottom");
        this.y = obstacle.y + obstacle.height;
        //this.vy = -this.vy;
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
          if (!sugarhitCup.isPlaying() && !win) {
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
          if (!sugarhitCup.isPlaying() && !win) {
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
      // reset button
      if (this.x > 1400 && this.x < 1450 && this.y > 95 && this.y < 150) {
        this.y = 95 - this.radius;
      }
      if (counter > 3) {
        if (this.x > 40 && this.x < 120 && this.y > 65 && this.y < 145) {
          this.y = 65 - this.radius;
        }
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
    sugarPosition: 767.5,
    texts: [
      new Text("Our Knockoff of Sugar Sugar Everywhere", 767.5, 50),
      new Text("Start", 767.5, 600),
    ],
    bgColor: "#3D642D",
    fgColor: "#72ab5cff",
  },
  1: {
    cups: [new Cup(100, 767.5, 700)],
    obstacles: [new Obstacle(383.75, 740, 600, 20)],
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
    cups: [new Cup(100, 767.5, 30, true)],
    obstacles: [new Obstacle(383.75, 740, 600, 20)],
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
      buttonPress.play();
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
      buttonPress.play();
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
      buttonPress.play();
      if (counter < 5) {
        counter++;
        win = false;
        levelWon = false;
        if (counter > 3 && anti == true) {
          toggleGravity();
        }
      }
    }
    if (
      mouseX > 667.5 &&
      mouseX < 867.5 &&
      mouseY > 580 &&
      mouseY < 620 &&
      win == true &&
      counter == 5
    ) {
      gameWon = true;
      youWin.loop();
    }
    if (
      mouseX > 40 &&
      mouseX < 120 &&
      mouseY > 85 &&
      mouseY < 165 &&
      counter > 3
    ) {
      toggleGravity();
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
  //console.log(px, py, x1, x2, y1, y2);

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
  backimage = loadImage("AudioAssets/WinnninggameScreen.png");
}

function setup() {
  createCanvas(1535, 790);
  textFont(font);

  sugarFallingSound.setVolume(0.2);
  sugarhitCup.setVolume(0.3);

  gravity = createVector(0, 0.05);

}

function draw() {
  if (gameWon) {
    drawEndScreen();
    return; // stop the game
  }

  if (!win) {
    if (game[counter].sugar.length > 0) {
      if (!sugarFallingSound.isPlaying()) {
        sugarFallingSound.loop();
      }
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
  if (frameCount % 4 === 0) {
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

  stroke(game[counter].fgColor);
  strokeWeight(8);
  for (let l of game[counter].lines) {
    line(l.x1, l.y1, l.x2, l.y2);
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
      ellipse(cup.x, cup.y + 20, 30, 25);
      fill(game[counter].bgColor);
      ellipse(cup.x, cup.y + 20, 18, 13);
      fill("white");
      rect(cup.x, cup.y, 30, 40);
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

  // Handle sounds and level completion
  if (win && !levelWon) {
    // Stop ongoing sounds
    if (sugarFallingSound.isPlaying()) {
      sugarFallingSound.stop();
    }
    if (sugarhitCup.isPlaying()) {
      sugarhitCup.stop();
    }

    // Play level complete sound once
    levelComplete.play();
    levelWon = true;
  }

  if (!win) {
    levelWon = false;
  }

  stroke(game[counter].fgColor);
  if (counter > 0) {
    fill(game[counter].fgColor);
    rect(1400, 100, 50);
    fill("black");
    text("Reset", 1425, 120);
  }
  if (counter > 3) {
    fill(game[counter].fgColor);
    rect(45, 70, 70, 60);;
    fill("black");
    text(anti ? "Unflip\nGravity" : "Flip\nGravity", 80, 100);
  }
  if (win) {
    if (counter < 5) {
      noStroke();
      textSize(32);
      fill(255, 200);
      rect(0, 0, width, height);
      stroke(game[counter].fgColor);
      fill("black");
      text("You Finished This Level!", 767.5, 300);
      text("Continue", 767.5, 600);
      textSize(15);
    } else {
      textSize(32);
      fill(150, 200);
      rect(0, 0, width, height);
      fill("black");
      text("You Finished The Game!", 767.5, 300);
      text("End Game", 767.5, 600);
      textSize(15);
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
  

  //text(`${pmouseX}, ${pmouseY}`, 100, 100);
}

function toggleGravity() {
  anti = !anti;
  if (anti) {
    gravity.y = -0.05;
  } else {
    gravity.y = 0.05;
  }
  buttonPress.play();
}

function drawEndScreen() {
  background(backimage);
  fill(0);
  textAlign(CENTER, CENTER);

  textSize(50);
  text("You Have Finished Our", 767.5, 45);
  text("Knockoff Game of Sugar Sugar, Congrats!", 767.5, 745);
}