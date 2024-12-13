
const prompt = require('prompt-sync')({sigint: true});

//constants game elements
const HAT = '^';
const HOLE = 'O';
const GRASS = '░';
const PLAYER = '*';

//constants game scenarios (messages) 
const WIN = "Congratulations! You win! *\ /*";
const OUT_BOUND = "You are out of the field :/";
const INTO_HOLE = "You fell into a hole :/";
const WELCOME = "Welcome to Find Your Hat Game!!!";
const DIRECTION = "Which direction: Up(U), down(D), left(L) or right(R)?"; 
const QUIT = "Press Q to quit the game.\n"         // the \n give a space n allows user to enter the key in the next line
const END_GAME = "Game Ended. Thank you!";
const NOT_RECOGNIZED = "Input not recognized. Try again!"


class Field {
    //constructor
    constructor(rows, cols){
        this.rows = rows;           //pty to set no. of rows for field.
        this.cols = cols;           //pty to set no. of cols for field.
        this.field = new Array([]);          // pty that reps the field for game
        this.gamePlay = false;      // pty to set up the game play
        this.rowPlayer = 0;
        this.colPlayer = 0;

    }

    //methods 

    static welcomeMsg(msg){
        console.log(
            "\n**********************************************\n" +
            msg
            + "\n**********************************************\n"
        );
    }


    //TODO for assmt: 4. randomise the field with hat, hole, grass within generateField. there must be a sufficient level of holes placed strategically such that its not too easy to navigate but not impossible to get to the ^ 
    generateField() {

        for (let i= 0; i < this.rows; i++) {

                this.field[i] = new Array();

            for (let j = 0; j < this.cols; j++) {

                this.field[i][j] = Math.random() > percentage ? GRASS : HOLE;   //to gen a randomized field of holes n grass

            }

        }

     

    printField(){
        this.field.forEach(element => {
            console.log(element.join(""));
        });
    }

    // start game 
    startGame(){
        this.gamePlay = true;
        this.generateField(this.rows, this.cols);
        this.field[0][0] = PLAYER;
        this.plantHat();
        this.printField(); // to be able to see character at the start
        this.updateGame();
    }

    // update game 
    updateGame(){

        
        // obtain user input 
        let userInput = "";
        
        // get the user's direction
        do {

            console.log(DIRECTION.concat(" ", QUIT));
            userInput = prompt();
            
            switch (userInput.toLowerCase()) {
                case "u":
                case "d":
                case "l":
                case "r":
                    this.updatePlayer(userInput.toLowerCase());
                    break;
                case "q":
                    this.endGame();     // user has quit the game
                    break;
    
                default:
                    console.log(NOT_RECOGNIZED);    //input not recognized
                    break;
            }

           this.printField(); 
        } while (userInput.toLowerCase() !== "q");
    }

    inBounds(this.ROWS, COLS){
        return(
            ROWS < 10 &&
            ROWS >=0 &&
            COLS <10 &&
            COLS >= 0
        );
    }

    plantHat(){
        let hatPlanted = 0;                                                     /* Plant the hat to a random position */

        if (hatPlanted == 0) {
            let hatRow = Math.floor(Math.random() * ROWS);
            let hatCol = Math.floor(Math.random() * COLS);;

            if (hatCol == 0 && hatRow == 0) {
                hatRow = Math.floor(Math.random() * ROWS);
                hatCol = Math.floor(Math.random() * COLS);
            }
            this.field[hatRow][hatCol] = HAT;
        }
    }
    // end game 
    endGame(){
        console.log(END_GAME); 
        this.gamePlay = false;
        process.exit();
    }

    // update the player's movement n game condition 
    updatePlayer(position){
        //TODO for assmt: IMPT FIRST update player's position in the field 
        //TODO for assmt: 1. THEN check if player has fallen into hole, if yes, > LOSE AND ENDGAME
        //TODO for assmt: 2. THEN check if player has gotten out of bounds , if yes, LOSE end game
        //TODO for assmt: 3. THEN check if player has found the ^ hat or wtv, if yes, WIN and end game 

        const userInput = String(position).toLowerCase();

        let newRowPlayer = this.rowPlayer;
        let newColPlayer = this.colPlayer;

        switch (userInput.toLowerCase()) {
            case 'u':
                newRowPlayer--;
                break;
            case 'd':
                newRowPlayer++;
                break;
            case 'l':
                newColPlayer--;
                break;
            case 'r':
                newColPlayer++;
                break;
            default:
                console.log("Invalid input!");
                break;
        }

            console.log("player has moved: " + position)

            if (this.field[newRowPlayer][newColPlayer] === HAT) {
                console.log(WIN);                                           /* When user has found the hat, log win and end game  */
                this.endGame();
            }
    
    
            if (!this.inBounds(newRowPlayer, newColPlayer)) {
                console.log(OUT_BOUND);                                    /* When user went out of bounds, inform user and end game  */
                this.endGame();
                return;
            }
    
            if (this.field[newRowPlayer][newColPlayer] === HOLE) {
                console.log(INTO_HOLE);                                    /* When user has fallen into a hole, inform user and end game  */
                this.endGame();
            }
           
            this.field[this.rowPlayer][this.colPlayer] = GRASS;            /* Update the user's previous position to grass */                                     
            this.rowPlayer = newRowPlayer;
            this.colPlayer = newColPlayer;
            this.field[this.rowPlayer][this.colPlayer] = PLAYER;                  
    
            }

    
    }



// static method to welcome the player

Field.welcomeMsg(WELCOME);

const ROWS = 10;
const COLS = 10;
const field = new Field(ROWS, COLS); // declaring and creating an instance of field class
const percentage = .12;
field.startGame();
