class Form {
    constructor() {     //properties --> input, button and greeting
        this.input = createInput('Name');
        this.button = createButton('Play');
        this.greeting = createElement('h2');
        this.title = createElement('h1');
        this.reset = createButton('Reset');
    }

    hide() {             //hide the input, button & greeting
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
        this.title.hide();
    }

    //display the form to the player
    display() {
        this.title.html("Car Racing Game");
        this.title.position(displayWidth/2 - 122.5, 200);

        this.input.position(displayWidth/2 - 88, displayHeight/2 - 80);

        this.button.position(displayWidth/2 - 20.5, displayHeight/2);

        this.reset.position(20, 20);

        //to click on the Play button and execute a set of commands --> variableName.mousePressed()
        this.button.mousePressed(() => {
            //hide the input & button --> variableName.hide()
            this.input.hide();
            this.button.hide();

            //create a variable called 'name' to store the input of the user --> variableName.value()
            player.name = this.input.value();

            //increase the playerCount by 1
            playerCount += 1;

            player.index = playerCount;

            //update the player's name in the db
            player.update();

            //update the playerCount in the db
            player.updateCount(playerCount);

            //greet the player with "Hello" and the player's name
            this.greeting.html("Hello " + player.name);
            this.greeting.position(displayWidth/2 - 36, displayHeight/2 - 80);
        })

        this.reset.mousePressed(() => {
            player.updateCount(0);

            game.update(0);

            Player.updateCarsAtEnd(0);

            var playerInfoRef = database.ref('players');
            playerInfoRef.remove();
        })
    }
}