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
    if (frameCount % 60 == 0 && timer > 0 && !timert) {
    timer --;
  }
  if (timer == 0) {
    text('The Sugar is running', 200, 200);
    textSize(50);
  }

  fill(0);
  noStroke();
  text(timer, width/2, height/2);
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