//The game can be played by the WASD keys or by the DPAD. 
//Highest possible score is 70 (7 collectables) once done make it down to the saloon, best of luck!

//Character and location
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

//Movement 
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumping;

//Items
var clouds;
var mountains;
var cactus_x;
var collectable;
var canyon;
var flagpole;
var enemies;
var platforms;


//UI
var game_score;
var lives;



function preload()
{
    
    //images
    ground = loadImage('assets/ground.jpg')
    enemiesImg = loadImage('assets/enemiesImage.png')
    saloonLeft = loadImage('assets/saloon1.png')
    saloonRight = loadImage('assets/saloon2.png')
    
    //custom fonts
    western = loadFont('assets/western.ttf');
    livesfont = loadFont('assets/westerncounter.ttf');

}

function setup()
{
    
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 4;
    startGame() 
    
}

function startGame()
{
    
 	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	scrollPos = 0;
    game_score = 0;
	gameChar_world_x = gameChar_x - scrollPos;

	
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    isJumping = false;

    
    cactus_x = [180, 550, 1000, 1150, 1490, 1780, 2100, 2900, 3600, 4350, 5200, 5800, 6200, 7000];
    

    clouds = 
    [
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 130},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 100},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 90},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 145},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 110},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 110},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 130},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 120},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 100},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 105},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 80},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 70},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 50},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 150},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 90},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 110},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 70},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 50},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 150},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 90},
        {Pos_x: random(-100,9000), Scale: 1.0, Pos_y: 110}

    ];
    
    
    mountains = 
    [
        {x_pos: 10,y_pos: 330},
        {x_pos: 960,y_pos: 330},
        {x_pos: 2200,y_pos: 330},
        {x_pos: 4600,y_pos: 330},
        {x_pos: 5600,y_pos: 330},
        {x_pos: 6600,y_pos: 330},
        {x_pos: 7500,y_pos: 330},
    ];
    
    
    canyon = 
    [
        {x_pos: 250, width: 120, y_pos: 442},
        {x_pos: 620, width: 280, y_pos: 460},
        {x_pos: 1250, width: 130, y_pos: 440},
        {x_pos: 1870, width: 140, y_pos: 510},
        {x_pos: 2600, width: 310, y_pos: 490},
        {x_pos: 3000, width: 120, y_pos: 460},
        {x_pos: 3200, width: 120, y_pos: 470},
        {x_pos: 3800, width: 120, y_pos: 440},
        {x_pos: 4200, width: 120, y_pos: 490},
        {x_pos: 5000, width: 120, y_pos: 520},
        {x_pos: 5300, width: 120, y_pos: 540},
        {x_pos: 6870, width: 120, y_pos: 460},
        {x_pos: -1000, width: 880, y_pos: 490}
    ];
    
    
    collectable = 
    [
        {x_pos: 180, y_pos: 300, isFound: false, isCollected: false, size: 32},
        {x_pos: 980, y_pos: 250, isFound: false, isCollected: false, size: 32},
        {x_pos: 1480, y_pos: 370, isFound: false, isCollected: false, size: 32},
        {x_pos: 2300, y_pos: 240, isFound: false, isCollected: false, size: 32},
        {x_pos: 3500, y_pos: 370, isFound: false, isCollected: false, size: 32},
        {x_pos: 4200, y_pos: 250, isFound: false, isCollected: false, size: 32},
        {x_pos: 5900, y_pos: 370, isFound: false, isCollected: false, size: 32}

    ];
    
    
    flagpole = {x_pos: 7250, isReached: false}   
    
    
    lives -= 1;
    
    
    enemies = [];
    enemies.push(new Enemy(0,floorPos_y, 100));
    enemies.push(new Enemy(950,floorPos_y, 100));
    enemies.push(new Enemy(2200,floorPos_y, 200));
    enemies.push(new Enemy(4400,floorPos_y, 500));
    enemies.push(new Enemy(5600,floorPos_y, 200));
    enemies.push(new Enemy(6200,floorPos_y, 200));
    
    platforms = [];
    platforms.push(createPlatforms(710,400,100));
    platforms.push(createPlatforms(2700,400,100));
    
};

function draw()
{
    
    //Creates background and floor
	background(200, 212, 224);
	noStroke();
	fill(188, 106, 33);
	rect(0, floorPos_y, width, height/4);
    push();
    translate(scrollPos, 0);
    image(ground,-2000,floorPos_y + 20,11000,432);
    gameChar_world_x = gameChar_x - scrollPos;
    
    //Draws items
    drawClouds();
    drawMountains();
    drawCacti();
    
    //Draws and checks the collectables
    for(var i = 0; i < collectable.length; i++)
    {
        if(!collectable[i].isFound)
        {    
            drawCollectable(collectable[i]);
            checkCollectable(collectable[i]);
        }
    }
    
    //Draws and checks the canyons
    for(var i = 0; i < canyon.length; i++)
    {          
        drawCanyon(canyon[i]);
        checkCanyon(canyon[i]);
    }
    
    //Draws flagpole
    renderFlagpole();
    
    //Creates overlay of completed game if flagpole is reached
    if(flagpole.isReached == true)
    {
        image(saloonRight, flagpole.x_pos - 1, 10, 632, 432);
        fill(0);
        noStroke();
        background(20,20,20,190);
        fill(254,193,51)
        textFont(western, [50]);
        text("GAME COMPLETE!", flagpole.x_pos, height/2);
        textFont(western, [30]);
        text("Press space to play again", flagpole.x_pos, height - 250);
        return
        
    };
    
    
    //Draws enemies and checks for contact
    for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].update();
        enemies[i].draw();
        
        if(enemies[i].isContact(gameChar_world_x,gameChar_y))
        {
            startGame();
            break;
        }
    }
    
    //Draws the platforms
    for(var i = 0; i < platforms.length; i++)
        {
            platforms[i].draw();
        }
    
    pop();
    
    //Draws game character and lives+score
    drawGameChar();
    drawScores();
    
    //1 half of the saloon(flagpole) so that it looks as though the character walks in
    push();
    translate(scrollPos, 0);
    image(saloonRight, flagpole.x_pos - 1, 10, 632, 432);
    pop();
    
    //Checks if flagpole is reached
    if(flagpole.isReached == false)
    {
        checkFlagpole();
    }
    
    //Creates overlay for if you run out of lives
    if(lives < 1)
    {
        background(20,20,20,190);
        fill(255,0,0)
        textFont(western, [50]);
        text("GAME OVER,YOU LOST!", width/3, height/2);
        textFont(western, [30]);
        text("Press space to try again", width/2.65, height - 250);

    }

    //Logic to make game reset if you lose a life
    if(gameChar_y > 576 && lives > 0)
    {
        startGame();
    }
    
    //Logic for the character to jump into the air and the gravity
    if(isJumping == true)
    {
        if(!isFalling && !isPlummeting)
        {
            gameChar_y  -= 9;
        }
    }

    if (gameChar_y <=  250)
    {
        isFalling =  true;
        isJumping = false;  
    }
    
    if(isFalling == true)
    {
        if (gameChar_y <= floorPos_y)    
            var isContact = false;            
            {
                for(var i = 0; i < platforms.length; i++)
                {
                    if(platforms[i].checkContact(gameChar_world_x, gameChar_y) == true )
                    {
                        isContact = true;
                        break;
                    }
                }
                    if(isContact == false)
                    {
                        gameChar_y += 7;  
                    }
                
                    else 
                    {
                        isFalling = false;
                        gameChar_world_x == floorPos_y;
                    }
            }
    }
}
function drawScores()
{

    fill(20,20,20,60);
    rect(0,0,1024,40);
 
    //GAME SCORE COUNTER
    fill(255,0,0);
    beginShape();
    vertex(36,
           9);
    vertex(28,
           22);
    vertex(36,
           35); 
    vertex(44, 
           22);
    endShape();
    fill(79,48,21);
    textFont(livesfont, [24]);
    text(": " + game_score, 49, 30);
    GameScoreCounter()
    
    //LIVES
    fill(217,145,100);
    rect(109, 17, 15, 15, 2);
    fill(68,0,0);
    ellipse(116, 17, 26, 3);
    rect(110, 10, 14, 8, 3);
    fill(79,48,21);
    textFont(livesfont, [24]);
    text(": " + lives,130, 30);
    
}

function keyPressed()
{
    //Move left
    if(keyCode == 65 || key == "A" || keyCode == 37)
    { 
        isLeft = true;
    }
    
    //Move right
    if(keyCode == 68 || key == "D" || keyCode == 39)
    { 
        isRight = true;
    }
    
    //Sets jumping to true
    if(key == "W" || key == " " || keyCode == 38)
    { 
        isJumping = true;      
    }
    
    //Restarts game if you run out of lives or reach flagpole
    if(key == " " && lives <= 0 || flagpole.isReached == true)
    {
            setup();
    }
    
}

function keyReleased()
{   
    if(keyCode == 65 || key == "A" || keyCode == 37)
    { 
        isLeft = false;
    }
    
    if(keyCode == 68 || key == "D" || keyCode == 39)
    { 
        isRight = false;
    }

}

function drawGameChar()
{
    
    if(isLeft && isFalling)
	{
        //Jumping left 
         //right arm
        stroke(217,145,100);
        strokeWeight(3);
        line(gameChar_x, gameChar_y - 45, gameChar_x - 17, gameChar_y - 50);
        noStroke();
        //body
        fill(65,218,255);
        rect(gameChar_x - 5, gameChar_y - 50, 12, 30); 
        //left arm
        stroke(217,145,100);
        strokeWeight(3);
        line(gameChar_x + 2, gameChar_y - 42, gameChar_x - 14, gameChar_y - 45);
        noStroke();
        //legs
        fill(14,0,141);
        rect(gameChar_x - 5, gameChar_y - 20, 7, 20);
        rect(gameChar_x, gameChar_y - 20, 7, 20); 
        //head
        fill(217,145,100);
        rect(gameChar_x - 5, gameChar_y - 65, 12, 15, 2);
        //hat
        fill(68,0,0);
        ellipse(gameChar_x + 1, gameChar_y - 65, 26, 3);
        rect(gameChar_x - 6, gameChar_y - 72, 14, 8, 3);


	}
    
	else if(isRight && isFalling)
	{
        //Jumping right 
        //right arm
        stroke(217,145,100);
        strokeWeight(3);
        line(gameChar_x, gameChar_y - 45, gameChar_x + 17, gameChar_y - 50);
        noStroke();
        //body
        fill(65,218,255);
        rect(gameChar_x - 5, gameChar_y - 50, 12, 30); 
        //left arm
        stroke(217,145,100);
        strokeWeight(3);
        line(gameChar_x + 2, gameChar_y - 42, gameChar_x + 14, gameChar_y - 45);
        noStroke();
        //legs
        fill(14,0,141);
        rect(gameChar_x - 5, gameChar_y - 20, 7, 20);
        rect(gameChar_x, gameChar_y - 20, 7, 20); 
        //head
        fill(217,145,100);
        rect(gameChar_x - 5, gameChar_y - 65, 12, 15, 2);
        //hat
        fill(68,0,0);
        ellipse(gameChar_x + 1, gameChar_y - 65, 26, 3);
        rect(gameChar_x - 6, gameChar_y - 72, 14, 8, 3);


	}
    
	else if(isLeft)
	{
		//Walking left
        //right arm
        stroke(217,145,100);
        strokeWeight(3);
        line(gameChar_x, gameChar_y - 45, gameChar_x - 14, gameChar_y - 20);
        noStroke();
        //body
        fill(65,218,255);
        rect(gameChar_x - 5, gameChar_y - 50, 12, 30); 
        //left arm
        stroke(217,145,100);
        strokeWeight(3);
        line(gameChar_x + 2, gameChar_y - 42, gameChar_x + 14, gameChar_y - 20);
        noStroke();
        //legs
        fill(14,0,141);
        rect(gameChar_x - 5, gameChar_y - 20, 7, 20);
        rect(gameChar_x, gameChar_y - 20, 7, 20); 
        //head
        fill(217,145,100);
        rect(gameChar_x - 5, gameChar_y - 65, 12, 15, 2);
        //hat
        fill(68,0,0);
        ellipse(gameChar_x + 1, gameChar_y - 65, 26, 3);
        rect(gameChar_x - 6, gameChar_y - 72, 14, 8, 3);

	}
    
	else if(isRight)
	{
		 //Walking right
         //right arm
        stroke(217,145,100);
        strokeWeight(3);
        line(gameChar_x, gameChar_y - 45, gameChar_x + 14, gameChar_y - 20);
        noStroke();
        //body
        fill(65,218,255);
        rect(gameChar_x - 5, gameChar_y - 50, 12, 30); 
        //left arm
        stroke(217,145,100);
        strokeWeight(3);
        line(gameChar_x + 2, gameChar_y - 42, gameChar_x - 14, gameChar_y - 20);
        noStroke();
        //legs
        fill(14,0,141);
        rect(gameChar_x - 5, gameChar_y - 20, 7, 20);
        rect(gameChar_x, gameChar_y - 20, 7, 20); 
        //head
        fill(217,145,100);
        rect(gameChar_x - 5, gameChar_y - 65, 12, 15, 2);
        //hat
        fill(68,0,0);
        ellipse(gameChar_x + 1, gameChar_y - 65, 26, 3);
        rect(gameChar_x - 6, gameChar_y - 72, 14, 8, 3);

	}
    
	else if(isFalling || isPlummeting)
	{
		//Jumping facing forwards
        //arms
        stroke(217,145,100);
        strokeWeight(3);
        line(gameChar_x - 9, gameChar_y - 45, gameChar_x - 17, gameChar_y - 60);
        line(gameChar_x + 9, gameChar_y - 45, gameChar_x + 17, gameChar_y - 60);
        noStroke();
        //body
        fill(65,218,255);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 30); 
        //bandana
        fill(255,0,0);
        triangle(gameChar_x - 7, gameChar_y - 50, gameChar_x, gameChar_y - 40, gameChar_x + 8, gameChar_y - 50);
        //legs
        fill(14,0,141);
        rect(gameChar_x - 10, gameChar_y - 20, 7, 15);
        rect(gameChar_x + 3, gameChar_y - 20, 7, 15); 
        //head
        fill(217,145,100);
        rect(gameChar_x - 7, gameChar_y - 65, 15, 15, 2);
        //hat
        fill(68,0,0);
        ellipse(gameChar_x + 1, gameChar_y - 65, 26, 3);
        rect(gameChar_x - 6, gameChar_y - 72, 14, 8, 3);
        
	}
    
	else
	{
		//Standing facing forwards
        //arms
        stroke(217,145,100);
        strokeWeight(3);
        line(gameChar_x - 9, gameChar_y - 45, gameChar_x - 14, gameChar_y - 20);
        line(gameChar_x + 9, gameChar_y - 45, gameChar_x + 14, gameChar_y - 20);
        noStroke();
        //body
        fill(65,218,255);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 30); 
        //bandana
        fill(255,0,0);
        triangle(gameChar_x - 7, gameChar_y - 50, gameChar_x, gameChar_y - 40, gameChar_x + 8, gameChar_y - 50);
        //legs
        fill(14,0,141);
        rect(gameChar_x - 10, gameChar_y - 20, 7, 20);
        rect(gameChar_x + 3, gameChar_y - 20, 7, 20); 
        //head
        fill(217,145,100);
        rect(gameChar_x - 7, gameChar_y - 65, 15, 15, 2);
        //hat
        fill(68,0,0);
        ellipse(gameChar_x + 1, gameChar_y - 65, 26, 3);
        rect(gameChar_x - 6, gameChar_y - 72, 14, 8, 3);

	}

	// Logic to make the game character move or the background scroll.
    if(isPlummeting == false)
    {
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
        
		else
		{
			scrollPos += 5;
		}
	}
    }
    if(isPlummeting == false)
    {
	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
        
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}
    }
}


// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
    {
        noStroke();
        fill(255);
        ellipse(clouds[i].Pos_x,
            clouds[i].Pos_y,
            40 * clouds[i].Scale);
        ellipse(clouds[i].Pos_x + 25 * clouds[i].Scale,
            clouds[i].Pos_y + 5,
            40 * clouds[i].Scale);
        ellipse(clouds[i].Pos_x + 55 * clouds[i].Scale,
            clouds[i].Pos_y,
            35 * clouds[i].Scale);
        ellipse(clouds[i].Pos_x + 20 * clouds[i].Scale,
            clouds[i].Pos_y - 10,
            40 * clouds[i].Scale);
        ellipse(clouds[i].Pos_x + 40 * clouds[i].Scale,
            clouds[i].Pos_y - 15,
            20 * clouds[i].Scale);     
            
    }
}
// Function to draw mountains objects.

function drawMountains()
{
    for(var i = 0; i < mountains.length; i++)
    {
            
        //middle mountain
        fill(150, 80, 42);
        quad(mountains[i].x_pos, mountains[i].y_pos - 20,
            mountains[i].x_pos - 45, mountains[i].y_pos + 102,
            mountains[i].x_pos + 80, mountains[i].y_pos + 102,
            mountains[i].x_pos + 70, mountains[i].y_pos  - 15);
        fill(150, 80, 42); 
        quad(mountains[i].x_pos + 10, mountains[i].y_pos - 30,
            mountains[i].x_pos - 40, mountains[i].y_pos + 102, 
            mountains[i].x_pos + 140, mountains[i].y_pos + 102,
            mountains[i].x_pos + 60, mountains[i].y_pos - 25);
        quad(mountains[i].x_pos + 40 , mountains[i].y_pos - 20,
            mountains[i].x_pos - 10, mountains[i].y_pos + 102,
            mountains[i].x_pos + 170, mountains[i].y_pos + 102,
            mountains[i].x_pos + 120, mountains[i].y_pos - 15);
    
        //mountain left
        fill(214, 157, 60);   
        quad(mountains[i].x_pos - 50, mountains[i].y_pos,
            mountains[i].x_pos - 55, mountains[i].y_pos + 102,
            mountains[i].x_pos - 30, mountains[i].y_pos + 102,
            mountains[i].x_pos - 30, mountains[i].y_pos + 3);
        quad(mountains[i].x_pos - 40, mountains[i].y_pos - 10,
             mountains[i].x_pos - 40, mountains[i].y_pos + 102,
            mountains[i].x_pos  - 10, mountains[i].y_pos + 102,
            mountains[i].x_pos - 10, mountains[i].y_pos - 5);
        quad(mountains[i].x_pos - 10, mountains[i].y_pos,
             mountains[i].x_pos - 10, mountains[i].y_pos + 102,
            mountains[i].x_pos - 40, mountains[i].y_pos + 102,
            mountains[i].x_pos - 40, mountains[i].y_pos - 15);
        quad(mountains[i].x_pos - 40, mountains[i].y_pos + 40,
             mountains[i].x_pos - 40, mountains[i].y_pos + 102,
            mountains[i].x_pos - 20, mountains[i].y_pos + 102,
            mountains[i].x_pos - 20, mountains[i].y_pos + 45);
    
        //mountain right
        fill(214, 157, 60);
        quad(mountains[i].x_pos + 150, mountains[i].y_pos + 40,
             mountains[i].x_pos + 145, mountains[i].y_pos + 102,
            mountains[i].x_pos + 170, mountains[i].y_pos + 102,
            mountains[i].x_pos + 170, mountains[i].y_pos + 45);
        quad(mountains[i].x_pos + 160, mountains[i].y_pos + 30,
             mountains[i].x_pos + 160, mountains[i].y_pos + 102,
            mountains[i].x_pos + 190, mountains[i].y_pos + 102,
            mountains[i].x_pos + 190, mountains[i].y_pos + 45);
        quad(mountains[i].x_pos + 190, mountains[i].y_pos + 40,
             mountains[i].x_pos + 190, mountains[i].y_pos + 102,
             mountains[i].x_pos + 220, mountains[i].y_pos + 102,
             mountains[i].x_pos + 220, mountains[i].y_pos + 25);
        quad(mountains[i].x_pos + 220, mountains[i].y_pos + 80,
             mountains[i].x_pos + 220, mountains[i].y_pos + 102,
             mountains[i].x_pos + 240, mountains[i].y_pos + 102,
             mountains[i].x_pos + 240, mountains[i].y_pos + 85);
            
    } 
}

// Function to draw trees objects.

function drawCacti()
{
    for(var i = 0; i < cactus_x.length; i++)
    {
          
        fill(41, 89, 46);
        noStroke();
    
        rect(cactus_x[i], 
         floorPos_y - 85, 30, 
         20,20);
        rect(cactus_x[i] + 20, 
         floorPos_y - 125, 
         25, 125, 20,20,0,0);
        rect(cactus_x[i] - 5, 
         floorPos_y - 115, 
         20, 50, 20);
        rect(cactus_x[i] + 35, 
         floorPos_y - 59, 
         30, 20, 20);
        rect(cactus_x[i] + 49, 
         floorPos_y - 89, 
         20, 50, 20);  
            
    }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

function drawCanyon(t_canyon)
{
    
    fill(200, 212, 224);
    rect(t_canyon.x_pos,floorPos_y,t_canyon.width,154);
    
    noStroke();
    fill(188, 106, 33);
    
    beginShape();
    vertex(t_canyon.x_pos,
           t_canyon.y_pos);
    
    vertex(t_canyon.x_pos,
           t_canyon.y_pos + 52); 
    
    vertex(t_canyon.x_pos + 11, 
           t_canyon.y_pos + 40);
    endShape();
    
    beginShape();
    vertex(t_canyon.x_pos + t_canyon.width,
           t_canyon.y_pos);
    
    vertex(t_canyon.x_pos + t_canyon.width,
           t_canyon.y_pos + 92); 
    
    vertex(t_canyon.x_pos + t_canyon.width - 11, 
           t_canyon.y_pos + 85);
    endShape();
    
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{

    if(gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y)
    {
        isPlummeting = true;
        gameChar_y += 15;
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    noStroke();
    fill(255);
    rect(t_collectable.x_pos,t_collectable.y_pos,
         t_collectable.size,55,2);
    fill(255,0,0);
    textFont('Helvetica');
    textSize(12);
    text("A", t_collectable.x_pos + 2,
              t_collectable.y_pos + 10);
    text("A", t_collectable.x_pos + 23,
              t_collectable.y_pos + 53);
    beginShape();
    vertex(t_collectable.x_pos + 16,
           t_collectable.y_pos + 15);
    vertex(t_collectable.x_pos + 8,
           t_collectable.y_pos + 28 );
    vertex(t_collectable.x_pos + 16,
           t_collectable.y_pos + 41); 
    vertex(t_collectable.x_pos + 24, 
           t_collectable.y_pos + 28);
    endShape();
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) <= t_collectable.size + 40)
    {
        t_collectable.isFound = true;
    }
    
}

// Counts collected items

function GameScoreCounter()
{
    for (var i = 0; i < collectable.length; i++)
    {
        if((collectable[i].isFound == true) && (collectable[i].isCollected == false))
        {
            game_score = game_score + 10;
            collectable[i].isCollected = true;
        }

    }


}

// Function to draw flagpole
function renderFlagpole()
{
    image(saloonLeft, flagpole.x_pos, 10, 632, 432);
}

function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos - 450)
    if (d < 20)
    {
        flagpole.isReached = true;
    };
};

function Enemy(x,y,range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    this.current_x = x;
    this.current_y = y;
    this.incr = 1;
    
    this.draw = function()
    {
        image(enemiesImg,this.current_x, this. y - 50, 50 , 50);
    }
    
    this.update = function()
    {
        this.current_x += this.incr;
        
        if(this.current_x < this.x)
            {
                this.incr = random(0.8,3);
            }
        
        else if(this.current_x > this.x + this.range)
            {
                this.incr = random(-1,-3);
            }
        
    }
    
    this.isContact = function(gameChar_x, gameChar_y)
    {
        var d = dist(gameChar_x, gameChar_y, this.current_x, this.y);
        
        if(d < 25 )
            {
                return true;
            }
        
        return false;
    }
    
    
}

function createPlatforms(x,y,length)
{
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function()
        {
            fill(217, 74, 17);
            rect(this.x, this.y, this.length, 75, 10);
        },
        
        checkContact: function(gc_x, gc_y)
        {
            if(gc_x > this.x && gc_x < this.x + this.length)
                {
                    var d = this.y - gc_y;
                    if(d >= 0 && d < 5)
                        {
                            return true;
                        }
                }
               
            return false; 
        }
    }
    
    return p;
}

