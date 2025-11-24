let cups = [];
let backgroundColor = 220;
let secondaryColor = 170;
let obstacles = [];

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

  strokeWeight(10);
}

function draw() {
  background(backgroundColor);

  cups.forEach((cup) => {
    fill("white");
    noStroke();
    ellipse(cup.x, cup.y + 20, 30, 25);
    fill(backgroundColor);
    ellipse(cup.x, cup.y + 20, 18, 13);
    fill("white");
    rect(cup.x, cup.y, 30, 40);
    stroke("black");
    text(cup.requiredAmount - cup.filledAmount, cup.x + 4, cup.y + 20);
    noStroke();
  });
  obstacles.forEach((obstacle) => {
    noStroke();
    fill(secondaryColor);
    rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function mouseDragged() {
  let lineHue = mouseX - mouseY;
  stroke(lineHue, 90, 90);
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
