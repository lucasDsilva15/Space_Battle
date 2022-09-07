//create if statements for hits and accuracy
//create a loop for attacking, at end of each itireation, prompt damage dealt or if hit at all.
//prompt and console log history
//add retreat or keep going options

//create a function for battle sequence to be called again for each battle
//dont do while loop
//use nested if statements to have messages appear and update numbers over time
//think about code for multiple ships (enemyship[i])

let stats = document.querySelector('.playerStats')
let enemyStats = document.querySelector('.enemyStats')
//declared variables
class Ship {
    constructor (Hull, Firepower, Accuracy){
        this.Hull = Hull
        this.Firepower = Firepower
        this.Accuracy = Accuracy
    }
}
let spaceShip = new Ship(20, 5, .7)
let enemyShip = new Ship(6, 3, .6)
//class that creates new ships (maybe create a factory for enemy ships?)


setTimeout(() => {
    let startMessage = window.confirm('Do you want to battle aliens Warrior?')
    if (startMessage == true){
    startGame()
}
}, '3000')

//confirm message that is paused so computer can load page

//function that starts game
function startGame(){
    confirm('Great! Enemies are invading')

    if (confirm('One of the ships is approaching, do we attack?')){
        battle()
   } else {
    confirm('we all died... thanks i guess')
   }
       
    
   
}

function battle(){
    while(spaceShip.Hull > 0|| enemyShip.Hull > 0){
        if(Math.random() < spaceShip.Accuracy){
            enemyShip.Hull-= spaceShip.Firepower  
            
            if (confirm(`Direct hit, you dealt ${spaceShip.Firepower}damage`||`Direct hit, you dealt ${spaceShip.Firepower}damage`) == false){
            updateEnemy()  
            }
        }else{
            confirm(`You missed!`)
        }
        if(Math.random() < enemyShip.Accuracy){
            spaceShip.Hull-=enemyShip.Firepower
            
            if (confirm (`Direct hit, the enemy dealt ${enemyShip.Firepower}damage`) || confirm(`Direct hit, the enemy dealt ${enemyShip.Firepower}damage`) == false){
              updateSelf()  
            }
            
        }else{
            confirm(`The enemy missed!`)
        }
    if (enemyShip.Hull <= 0) {
        enemyShip.Hull = 0
        updateEnemy()
        break;
        }
    }  
}



function updateSelf(){
    stats.textContent = `Hull: ${spaceShip.Hull} Firepower: ${spaceShip.Firepower} Accuracy: ${spaceShip.Accuracy}`
}
function updateEnemy(){
    enemyStats.textContent = `Hull: ${enemyShip.Hull} Firepower: ${enemyShip.Firepower} Accuracy: ${enemyShip.Accuracy}`
}
console.dir(stats.textContent)
