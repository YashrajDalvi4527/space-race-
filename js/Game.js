class Game {
  constructor(){
  }                              

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })                                                     
  }                     

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }       

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    ship1 = createSprite(100,200);
    ship1.addImage(heroImg);
    ship1.scale = 0.5;
    ship2 = createSprite(300,160);
    ship2.addImage(villanImg);
    ships = [ship1, ship2];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(backgroundImg);
      image(backgroundImg,0,-displayHeight * 3,displayWidth,displayHeight * 4);    

      var index = 0;
      var x = 200;
      var y;

      for(var plr in allPlayers){
        index = index + 1 ;
        x = x + 500;
  
        y = displayHeight - allPlayers[plr].distance;
        ships[index-1].x = x;
        ships[index-1].y = y;

        if (index === player.index){
          fill("red") ;
          ellipse(x,y,60,60);
          camera.position.x = displayWidth/2;
          camera.position.y = ships[index-1].y
        }
  
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }


    if(player.distance > 3550){
      gameState = 2;
    }

    drawSprites();
  }

  end(){
    textSize(20)
    stroke("white")
    text("game ended",90,90);

  }
}





