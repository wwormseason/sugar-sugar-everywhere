We have multiple classes, Cup, Sugar, and Obstacle to set properties and behaviors for the three main elements of our game. A key function is the update function in the Sugar class. It controls collision with obstacles, checks for if sugar has fallen into the cup, and animates the sugar movement. It does this by changing the sugar's position based on its velocity parameters. It also checks for boundaries of the cups an dobstacles, so the sugar doesn't phase through. Currently, we're focusing on allowing the sugar to have collision when interacting with player drawn lines. Our current code allows for lines to be drawn, but the sugar bounces off the lines and behaves erratically.

 ### Your(Kevin's) personal contribution to the project?

#### I contributed the gravity parameters, the end screen, the various audio components, last two levels, flipping the cups, I also helped on the physics for the lines
___
 ### Your experience working collaboratively?

#### This was my first time working on a piece of code collaboratively and ti went very smoothly. Each time we had made changes we would notify each other on the discord. Also that if any of us had encountered a problem within the code we would also let each other know. 
___
### Any specific functions, classes, or features you worked on?

#### I worked on the functions: drawEndScreen and toggleGravity. Besides that I worked on bringing in the audio and the gravity parameters
___
 ### What aspects of the code:

 - ### Worked exactly as you hoped?
___
##### To be honest, nothing worked at first as everything needed tweaking and fixing
___
-  ### Didn’t work at first, and how you solved or re-designed them?
___
#### The first given was the gravity function, since I had borrowed it from when we did physics, after I brought it in, I broke down its different compenents and figured out where each was supposed to go. This part wasn't to bad as I was able to figure it out, it was figuring out how the drawn lines would interact with the sugar when it's gravity was flipped. To do this, I had to add extra colllision parameters  so it could account for when gravity was turned on. 
___
##### The second thing that I had to work on was flipping the cup so that the gravity button could actually be used. Some of the issues was that when a cup was upside down, the sugar would pass straight through or fill from the wrong side. The first thing that I had to was add an extra condition to the cup class, so that we could make sure the right cups were flipped rather than all of them. By doing this, I was able to call back onto it to check if a cup was flipped or not and add it's respective collision checks to it

___

##### The third problem was the audio, sometimes the sound wouldn't play, it would play when I didn't want it to play or the sound broke when there were multiple cups because I wanted to stop when it reached the continue level. I solved this by implenting parameters such as if win was true, if level won wasn't true, if they were on the last level and if they completed it to move onto the win screen and cutting sound off but the win audio.
___
##### The final problem I had was with the endscreen/winscreen, I had to create a new functionn and variable so that A. the function could be called and  switch to the screen & B. It would only switch after the player finished level 5. Often times, it wouldn't switch and just stayed on the level complete screen on level 5. Solving this involved moving the way I was calling the function to the top of draw so it could be checked first.



We have multiple classes, Cup, Sugar, and Obstacle to set properties and behaviors for the three main elements of our game. A key function is the update function in the Sugar class. It controls collision with obstacles, checks for if sugar has fallen into the cup, and animates the sugar movement. It does this by changing the sugar's position based on its velocity parameters. It also checks for boundaries of the cups and obstacles, so the sugar doesn't phase through. Currently, we're focusing on allowing the sugar to have collision when interacting with player drawn lines. Our current code allows for lines to be drawn, but the sugar bounces off the lines and behaves erratically.
Steven
I helped make the line collision for the sugar added the win logic for multiple cups and made the 3rd level.
