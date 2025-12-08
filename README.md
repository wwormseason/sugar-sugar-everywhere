### Ideation:

We were unsure of what to make for the project, but we had decided we wanted to make a game of some sort. I, Yifan, started suggesting some old Flash games I used to play. I ended up suggesting Sugar, Sugar. Steven and Kevin fell in love with the idea and that's how we settled on our project.

### Collaboration:

We tried to split responsiblities by asking each team member what part of the project they wanted to do and allowing them to take it. The remaining bits were then split evenly. We each had our own GitHub branched where we made changes. Those changes would be pull requeted for the whole team to check before being integrated onto main.

### Coding & Development & Technical Highlights:

#### Yifan:

I'm used to working on a coding project with many members due to my high school experience, so I didn't have much trouble. I coded all of the classes and collision. At one point, the code got rally long and hard to read, so I reformatted how we checked for levels. I made 1 really long game object that holds the specific level data for each level and we call the level through an incremented variable. This was inspiried by how the screens were implemented in the text based adventure game.

I had a really hard time coding collision to work until I realized I could break all the elements down to rectangles. This helped my better visualize where the boundaries needed to be. What also helped was setting coordinates to show on screen that correlated to my mouse's position. This way I could hard code the more tricky bits of collision like the title of the start screen.

One of the big challenges that came with coding collision was accounting for the sugar's vertical acceleration. If not accounted for the sugar would accelerate to a point where the game wasn't able to check for collison before it sailed past. I ended up having to add vy to every single check in the game.

My 5 million if statements that check for collision ended up looking horrible and I absolutely missed something, but I'm glad it works at all.

#### Kevin:

I contributed the gravity parameters, the end screen, the various audio components, last two levels, flipping the cups, I also helped on the physics for the lines.

This was my first time working on a piece of code collaboratively and it went very smoothly. Each time we had made changes we would notify each other on the Discord. Also that if any of us had encountered a problem within the code we would also let each other know.

I worked on the functions: drawEndScreen and toggleGravity. Besides that I worked on bringing in the audio and the gravity parameters.

To be honest, nothing worked at first as everything needed tweaking and fixing.

The first given was the gravity function, since I had borrowed it from when we did physics, after I brought it in, I broke down its different compenents and figured out where each was supposed to go. This part wasn't to bad as I was able to figure it out, it was figuring out how the drawn lines would interact with the sugar when it's gravity was flipped. To do this, I had to add extra colllision parameters so it could account for when gravity was turned on.

The second thing that I had to work on was flipping the cup so that the gravity button could actually be used. Some of the issues was that when a cup was upside down, the sugar would pass straight through or fill from the wrong side. The first thing that I had to was add an extra condition to the cup class, so that we could make sure the right cups were flipped rather than all of them. By doing this, I was able to call back onto it to check if a cup was flipped or not and add it's respective collision checks to it.

The third problem was the audio, sometimes the sound wouldn't play, it would play when I didn't want it to play or the sound broke when there were multiple cups because I wanted to stop when it reached the continue level. I solved this by implenting parameters such as if win was true, if level won wasn't true, if they were on the last level and if they completed it to move onto the win screen and cutting sound off but the win audio.

The final problem I had was with the endscreen/winscreen, I had to create a new functionn and variable so that A. the function could be called and switch to the screen & B. It would only switch after the player finished level 5. Often times, it wouldn't switch and just stayed on the level complete screen on level 5. Solving this involved moving the way I was calling the function to the top of draw so it could be checked first.

#### Steven:

I helped make the line collision for the sugar added the win logic for multiple cups and made the 3rd level.
