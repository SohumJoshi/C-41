/*
    1. read the gameState --> readState()
    2. update the gameState --> update(state)
    3. wait state --> wait()
*/

class Game {
    constructor() {
        
    }

    readState() {
        var gameStateRef = database.ref('gameState');

        gameStateRef.on("value", function(data) {
            gameState = data.val();
        });
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async wait() {
        //if the gameState is 0, 
        if (gameState === 0) {
            //new player object is created from the playerClass
                //objectName = new ClassName()
            player = new Player();

            //create a var and ref to the db for a temporary listener and store it inside the playerCount variable
            var playerCountRef = await database.ref('playerCount').once("value");

                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();

                //playerCount is read
                player.readCount();
                }
                      
            //a new form object is created for the Form class
            form = new Form();
            
            //form is displayed
            form.display();
        }
    }

    play() {         //after the 4th player logs in
        //hide the form
        form.hide();

        //to get the function that reads the information of the player
        Player.getPlayerInfo();

        player.getCarsAtEnd();

        //to take the defined values (values in the database)    correct - not wrong   defined = not undefined
        if (allPlayers !== undefined) {
            background(groundImage);

            image(trackImage, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

            var index = 0;

            var x = 275;
            var y;

            for (var i in allPlayers) {           //i --> every single player in allPlayers
                index = index + 1;
                x = x + 275;
                y = windowHeight - allPlayers[i].distance;

                cars[index - 1].x = x;
                cars[index - 1].y = y;

                if (index === player.index) { //if car1 belongs to player1
                    fill("red");
                    noStroke();
                    ellipse(x, y, 60, 60);

                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index - 1].y;
                }
            }
        }

        if (keyIsDown(UP_ARROW)) {
            player.distance += 50;

            player.update();
        }

        if (player.distance >= 5180) {
            player.distance = 5180;

            p = player.index;

            Player.updateCarsAtEnd(player.rank);
        } else if (player.distance >= 5180 && player.index != p) {
            player.distance = 5180;

            p = player.index;

            Player.updateCarsAtEnd(player.rank);
        } else if (player.distance >= 5180 && player.index != p) {
            player.distance = 5180;

            p = player.index;

            Player.updateCarsAtEnd(player.rank);
        } else if (player.distance >= 5180 && player.index != p) {
            player.distance = 5180;

            p = player.index;

            Player.updateCarsAtEnd(player.rank);

            gameState = 2;
        }

        drawSprites();
    }

    end() {
        console.log("Game Ended");
        console.log(player.rank);
    }
}