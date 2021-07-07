/*
    1. read the number of players --> readCount()
    2. update the no. of players --> updateCount(count)
    3. update the name and distance travelled of the player --> update()
*/

class Player {
    constructor() { //roperties --> name, distance, index (p1,p2,p3,p4)
        this.name = null;
        this.distance = 0;
        this.index = null;
        this.rank = null;
    }

    readCount() {
        //create a variable to refer to the db --> database.ref()
        var playerCountRef = database.ref('playerCount');

        //listen to the changes --> variableName.on("value", function)
        playerCountRef.on("value", (data) => {
        //store the changes inside a variable --> variableName = data.val()
            playerCount = data.val();
        });

    }

    updateCount(count) {
        //refer to the entire db ('/') and update the playerCount entry --> .update()
        database.ref('/').update({
            playerCount: count
        });

    }

    update() {
        var playerIndex = "players/player" + this.index;

        //refer to the database and update the name --> .set()
        database.ref(playerIndex).set({
            name: this.name,         //entry name = name property of the player
            distance: this.distance
        })
    }

    static getPlayerInfo() {         //collect the info of all the players and store it inside allPlayers variable
        //ref to the database for 'players' entry
        var playerInfoRef = database.ref('players');

        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    getCarsAtEnd() {
        database.ref('carsAtEnd').on("value", (data) => {
            this.rank = data.val();
        });
    }

    static updateCarsAtEnd(rank) {
        database.ref('/').update({
            carsAtEnd: rank
        })
    }
}

//(ball/position)