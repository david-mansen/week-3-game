$(document).ready(function(){

  function House(name, baseHealth, baseAttack, counterAttack){
    this.name = name;
    this.baseHealth = baseHealth;
    this.baseAttack = baseAttack;
    this.counterAttack = counterAttack;
    this.buffedAttack = baseAttack;
    this.currentHealth = baseHealth;
  }

  function getArrayIndex(array, name){
    for(var i=0; i<array.length; i++){
      if(array[i].name === name) return i;
    }
    return -1;
  }

  function battle(attackerID,defenderID){
    var attacker = houses[attackerID];
    var defender = houses[defenderID];
    defender.currentHealth -= attacker.buffedAttack;
    attacker.currentHealth -= defender.counterAttack;
    attacker.buffedAttack += attacker.baseAttack;

    $("#"+attacker.name+" h5").text(attacker.currentHealth);
    $("#"+defender.name+" h5").text(defender.currentHealth);

    info = "Your armies killed or wounded "+attacker.buffedAttack+" of their troops. <br> Their armies killed or wounded "+defender.counterAttack+" of your troops.";
    $("#infoText").html(info);

    if(attacker.currentHealth <=0){
      $("#"+attacker.name).remove();
      $(".house").remove();
      info = "You have been defeated and your house is ended!";
      $("#infoText").html(info);
    }

    if(defender.currentHealth <= 0){
      remainingEnemies--;
      $("#"+defender.name).remove();
      info = "You have defeated House "+defender.name+"!";
      $("#infoText").html(info);
      gameState = "chooseOpponent";
      if(remainingEnemies <= 0){
        info = "You have defeated your enemies and claimed the Iron Throne!";
        $("#infoText").html(info);
      }
    }
  }

  var houses = [];

  houses.push(new House("stark", 110, 10, 10));
  houses.push(new House("lannister", 200, 20, 20));
  houses.push(new House("tyrell", 150, 10, 10));
  houses.push(new House("baratheon", 100, 12, 12));
  houses.push(new House("targaryen", 80, 5, 5));

  var gameState = "selectHouse";
  var myHouseID;
  var opponentID;
  var info = "The death of King Robert Baratheon has plunged the seven kingdoms into war.<br> Choose your side!"
  var remainingEnemies = 4;

  $("#infoText").html(info);



  $("#attackButtonInner").on("click", function(){
    if(gameState === "battle"){
      battle(myHouseID, opponentID);
    }
  });

  $(".house").on("click", function(){

    var houseName = $(this).attr('id');
    var houseID = getArrayIndex(houses, $(this).attr('id'));

    if(gameState === "selectHouse"){
      $(this).parentToAnimate($("#fieldRow"),'slow');
      info = "You have chosen House "+houseName;
      myHouseID = houseID;
      gameState = "chooseOpponent";
    }
    else if(gameState === "chooseOpponent"){
      if(myHouseID === houseID){
        info = "Those are your own armies you fool!";
      }
      else{
        $(this).parentToAnimate($("#fieldRow"),'slow');
        info = "Your armies meet House "+houseName+" upon the battlefield!";
        opponentID = houseID;
        gameState = "battle";
      }
    }
    else if(gameState === "battle"){

    }

    $("#infoText").html(info);


  });
});
