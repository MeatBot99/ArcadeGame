
// Enemies our player must avoid. They are mostly misunderstood and not implicitely evil.
let Enemy = function(x, y, speed) {
    this.sprite= 'images/enemy-bug.png';
    this.x= x;
    this.y= y;
    this.speed= speed;
};

//Creates the illusion of movement when called repeatedly which is what is happening in engine.js.
Enemy.prototype.update = function(dt) {
    let rand= 0;
    this.x+= rand+ this.speed *dt;
    if(this.x>=505){
      this.x= -50;
      this.speed= Math.floor(Math.random()* Math.floor(450))+250;
    }
};

//Drawing the enemy objects.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class that gets instanciated as "player", our protagonist for this game.
class Player{
  constructor(img, x, y){
    this.img= img;
    this.x= x;
    this.y= y;
  }
  //Reset to starting position after reaching the water or hitting an enemy.
  reset(){
   this.x=200;
   this.y=400;
  };
  //Keep the player image on the screen. If player reaches top of screen, they are reset for next round.
  update(){
      if(this.x<0){
        this.x= 0;
      }if(this.x>400){
        this.x=400;
      }if(this.y>400){
        this.y=400;
      }if(this.y<=0){
        this.reset();
        count();
      }
  };
  //Draws the image at the specified coordinates everytime it updates.
  render(){
    ctx.drawImage(Resources.get(this.img), this.x, this.y);
  };
  //The control scheme works well if you have a keyboard. If not, there is no control. Yet.
  moveUp(){
    this.y= this.y-90;
  };
  moveDown(){
    this.y= this.y+90;
  };
  moveLeft(){
    this.x= this.x-100;
  };
  moveRight(){
    this.x= this.x+100;
  };
  handleInput(input){
    switch(input){
      case'up':
        player.moveUp();
        break;
      case 'down':
        player.moveDown();
        break;
      case 'left':
        player.moveLeft();
        break;
      case 'right':
        player.moveRight();
    }
  };
  //Win when score reaches 10.
  win(){
    restart();
    setTimeout(function(){
      showHidden();}, 150);
  };
  //Lose if all lives are lost.
  lose(){
    restart();
    showLose();
  }
}

//Sets starting condition with a score of 0 and lives = 3.
const restart= function(){
  life= 4;
  loseLife();
  number= -1;
  count();
  player.reset();
}

//The nefarious beatles are here to mildly inconvenience our hero.
let allEnemies= [];
let george= new Enemy(-50, 63, 400);
let ringo= new Enemy(-50, 148, 450);
let john= new Enemy(-50, 228, 300);

//Push all enemies into array that is called from engine.js so they can be iterated.
(function(){
  allEnemies.push(george, ringo, john);
})();

//Lose a life when collision is detected. Global vairable used for ease of access.
let life=3;

const loseLife= function(){
  let lives= document.querySelector(".lives");
  life--;
  lives.innerText="Lives: "+life;
  if(life==0){
    player.lose();
  }
}

//Increase the size of the "Score" by 1 when player reaches the water.
let number=0;

const count= function(){
  let score= document.querySelector(".score");
  number++;
  score.innerText="Score: "+number;
  if(number==10){
    player.win();
  }
}

//Checks to see if the enemies and player occupy the same place. If so, triggers player.reset.
const checkCollisions= function(){
  for(let i=0; i<=allEnemies.length-1; i++){
    if(player.x < allEnemies[i].x+50 && player.x+40 > allEnemies[i].x && player.y < allEnemies[i].y+50 && player.y+50> allEnemies[i].y){
      player.reset();
      loseLife();
    }
  }
};

//Win modal appears when win condition is met and then offers to reset game to start condition.
let hideModal= document.querySelector(".hidemodal");
let modal= document.querySelector(".winmodal");

const showHidden= function(){
  if(modal.style.display==="flex"){
    modal.style.display="none";
  }else{
    modal.style.display="flex";
  }
}

//Lose modal appears when lose condition is met by running out of lives. Resets start condition.
let loseModal= document.querySelector(".losemodal");
let loseButton= document.querySelector(".losebutton");

const showLose= function(){
  landingPage();
  if(loseModal.style.display==="flex"){
    loseModal.style.display="none";
  }else{
    loseModal.style.display="flex";
  }

}

//Character select screen. Choose your character wisely.
let confirmButton= document.querySelector(".confirm");
let startPage= document.querySelector(".startpage");
let characters= document.querySelectorAll(".startpage img");

for(let character of characters){
  character.addEventListener("click", function(event){
    player.img= event.target.className;
    event.target.style.backgroundColor="#fff";
  });
}

const landingPage= function landingPage(){
  if(startPage.style.display="none"){
    startPage.style.display="flex";
  }if(startPage.style.display="flex"){
    startPage.style.display="none";
  }
}

confirmButton.addEventListener("click", landingPage);

//Button listeners to reinitialize game mode.
loseButton.addEventListener("click", showLose);
hideModal.addEventListener("click", showHidden);

//Instanciate the Player class.
let player= new Player('images/char-boy.png', 200, 400);

////////////////////////////////////////////////////////////////////////////////
//This event listener setup was provided with the base code. I have not modified it.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
////////////////////////////////////////////////////////////////////////////////
