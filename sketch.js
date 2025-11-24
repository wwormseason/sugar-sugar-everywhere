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
}

function mouseDragged() {
  stroke(secondaryColor);
  strokeWeight(8);
  line(pmouseX, pmouseY, mouseX, mouseY);
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
