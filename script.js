//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ALL FUNCTION USED ARE DEFINED ON BOTTOM OF PAGE EXCEPT FOR GENERATE ENEMY FUNCTION FOR READABILITY
// also note the use of timeout functions are used to give time for the HTML to update, anytime the HTML is updating a settimeout function will be called
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//declared variables
let stats = document.querySelector('.playerStats')
let enemyStats = document.querySelector('.enemyStats')
let playerimg = document.querySelector('.playerImage')
let enemyimg = document.querySelector('.enemyImage')

//ship class that creates new ships (yours and enemies)

class Ship {
    constructor (Hull, Firepower, Accuracy){
        this.Hull = Hull
        this.Firepower = Firepower
        this.Accuracy = Accuracy
    }
}

let spaceship = new Ship (20, 5, .7)

//function to create a random number of enemies with random stats

function genereateEnemy(number){
    while (number > 0){
    const enemyShip = new Ship (integer(3, 6), integer(2, 4), decimal())
    enemies.unshift(enemyShip)
    number--
    }
}

//creating an array to push enemies into when calling generate enemy function and creating a copy of the array to be able to receive half of the length of the array

let enemies = []
genereateEnemy(integer(4, 8))

//getting values for the upgrade feature that is defined later

let totalE = [...enemies]
let half = Math.floor(totalE.length/2)

//updateE function to update the html to the correct enemy we are facing before the page loads

updateE(enemies[0])

// initial prompt when starting game for the first time

setTimeout(() => {
    let startMessage = window.confirm('As enemies invade earth you are its sole warrior defending your home. You set out to space to combat the enemy invaders');
    if (startMessage) {
        startGame()
    }
}, '2000');

// function that will start the game and give dialouge to the player

function startGame () {
    alert("Captain: ......... Can you hear me.....zzzzt.. soldier?")
    alert("Captain: You've should be reaching hostiles in.... zzzzt.... minutes. Pay attention to your radar which will alert ..... zzzzzt.... of hostiles.")
    alert(`Radar: Hello soldier welcome to the USS Alien Anhilator it seems that there are ${enemies.length} hostiles and we are rapidly approaching them.`)
    alert('Radar: An enemy has reached battle range!')
    enemyimg.style.backgroundImage = "url('/images/enemy.gif')"

// start battle sequence

    setTimeout(() => {
        if (confirm('Do you want to attack?')) {
            battle(enemies) 

// else when player runs from fight
        }else {
            alert('Captain: Ok... so much for being Earths only defense... You have doomed us all')
            alert('You lose')
            replay()  
        }   
    }, '300')
}

// battle function set to enemies 0 due to our use of shift and unshift

function battle (enemies) {
    ourAttack(enemies[0])
}

//function to hold code for situations that could happen after the first battle

function newBattle () {

    //code for creating an upgrade

    if (enemies.length === half){
        setTimeout(() => {
        alert("Captain: The aliens seem to be planning a large attack, we have time to install an upgrade to the ship while they plan... but we only have time for one... Its up to you soldier will you recharge your shields or upgrade your firepower?")
            if (confirm('Hit OK to return to 20 HP, and CANCEL to increase your FIREPOWER by 2')){
                spaceship.Hull = 20
                updateS()
            } else {
                spaceship.Firepower = 7
                updateS()
            }   
        }, '500')
        
        setTimeout(() => {
            alert('.....After receiving an upgrade you return to the battle in space')
            alert('Captian: Great decision soldier... We hope the upgrade will aid you in your battle')
        }, '800')
    }

//code for if their are still enemies alive to continue or retreat

    if (enemies.length != 0) {
        updateE(enemies[0]) 
        setTimeout(() => {
            if (confirm(`Radar: The fight is not over! There are still ${enemies.length} hostiles on my detection system. Will we continue attacking or retreat?`)) {
            enemyimg.style.backgroundImage ="url('/images/enemy.gif')"
                setTimeout(() => {
                    alert('Radar: Affirmative lets continue our assualt')
                    battle(enemies) //beginning the battle sequence again on new enemy0
                }, '500')
            } else {
                alert('You make a hasty retreat and have doomed earth to fight without you.')
                alert('Captian: SOLDIER DO NOT RETR ....zzzzt..... THE ENEMIES ARE CLOSING IN .....ZZZZT.... WHAT IS THAT IN THE SK.............')
                alert('You lose.')
                replay()
            }
        }, '800')
    } else {
        enemyimg.style.backgroundImage =''
        setTimeout(() => {
        alert("Radar: No more enemies spotted... ")
        alert("Captain: Great Work soldier... you've .....zzzzt..... defeated all the aliens. The president is here ...zzzzzt... come on home he has some gifts he wants to give to our hero. Home Base over and out")
        alert('You defeated all the invdaers and return to earth as a hero who saved his home!')
        alert('You Win!  GG EZ')
        replay()
        }, '500')
    }
}

// Player's attack function

function ourAttack (invader) {
    if(Math.random() < spaceship.Accuracy){
        invader.Hull -= spaceship.Firepower
        updateE(invader) 
//code for if the enemy is defeated with the attack        
        if (invader.Hull <= 0) {
            invader.Hull = 0
            updateE(invader)
            enemyimg.classList.add('shake')
                setTimeout(() => {
                    alert(`Radar: Direct hit. You dealt ${spaceship.Firepower} damage. You defeated the enemy`)
                        enemies.shift()
                        enemyimg.style.backgroundImage =''
                        newBattle()
                }, '800')
            setTimeout(() => enemyimg.classList.remove('shake'), '750')
        }  else {
//code for if the enemy survives the attack
            enemyimg.classList.add('shake')
                setTimeout (() => {
                    alert(`Radar: Direct hit, you dealt ${spaceship.Firepower} damage`)
                    enemyAttack(invader)
            }, '800')
            setTimeout(() => enemyimg.classList.remove('shake'), '750')
        }
//code for missed attack  
    } else {
        setTimeout (() => {
            alert('You missed!')
            enemyAttack(invader)
        }, '800')
    }
}

// Enemy's attack function
function enemyAttack (invader) {
    if (Math.random() < invader.Accuracy) {
        spaceship.Hull -= invader.Firepower
        updateS()
//code for if enemy defeats the player
        if (spaceship.Hull <= 0) {
            spaceship.Hull = 0
            updateS()
            playerimg.classList.add('shake')
            setTimeout(() => {
                alert(`Radar: Direct hit, enemy dealt ${invader.Firepower} damage to your shields`)
                alert("Radar: Shields are fully depleted... zzzzt ... systems faili..... zzzzzt .... self destru ......zzzzt ...... in 20 secon.... zzzzt.... ")
                alert("Captain: SOLDIER!! CAN YOU HEAR ME .....zzzzzt..... WHATS GOING O.... zzzzt..... SOLDIER RESPON.... zzzzzt....")
                alert("As you wait for your final moments you contemplate what you could have done better... what could have changed.... if only you had one more chance... what would you have done differently... Slowly everything fades to black")
                alert("You Lose")
                replay()
            }, '800')
            setTimeout(() => playerimg.classList.remove('shake'), '750')
//code for if player survives hit
            }else {
                playerimg.classList.add('shake')
                setTimeout (() => {
                    alert(`Radar: Direct hit, enemy dealt ${invader.Firepower} damage to your shields`)
                    ourAttack(invader)
                }, '800')
        setTimeout(() => playerimg.classList.remove('shake'), '750')
            }
//code for if enemy misses
    } else {
        setTimeout (() => {
            alert('Enemy missed!')
            ourAttack(invader)
        }, '800')
    }
}

// function to update enemy stats

function updateE (invader) {
    enemyStats.innerHTML = `Hull: ${invader.Hull}<br> Firepower: ${invader.Firepower}<br> Accuracy: ${Math.round(10*invader.Accuracy)/10}<br>`
}

// function to update player stats

function updateS () {
    stats.innerHTML = `Hull: ${spaceship.Hull}<br> Firepower: ${spaceship.Firepower}<br> Accuracy: ${spaceship.Accuracy}<br>`
}

//random integer for health and firepower

function integer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//random decimal for firepower

function decimal() {
    return Math.random() * (.8 - .6) + .6;
}

//replay function that holds code for if the player wins or loses and wants to play again.

function replay() {
    if (confirm('Would you like to try to defend earth again?')){
        location.reload()
    } else {
        alert('Thanks for playing we hope you enjoyed! Your window will now close.')
        window.close() 
    }
}



///////////////////////////////////Future updates for portfolio////////////////////////////////////////////////
// 1. create boss ship with an array of hp being the weapon nodes. maybe a seperate battle function to battle the boss?
// put boss in enemy array because of unshift in line 17 it will always be the last battle


// 2. selecting between story mode and endless mode
// using if else statements to seperate the code into two types of gamemodes where when an enemy is defeated a new enemy is shifted into the array
// also adding periodic chances to upgrade the ship... maybe find a way to increase the difficulty of enemies as you progress

//3. adding more transitions and css for a more responsive design
//lasers that attack the enemy, a new gif for the boss battle, enemy stats and names updating, transition for if enemy is defeated

//4. missles upgrade that was mentioned in the bonus
//avialble at the beginning of story mode and as a periodic upgrade in endless mode?

//5. instead of using alerts and confirms, having a text box with img of captain and radar speaking to the player
//adding a text box to the bottom of the pages empty space to give updates as to whats happening on screen instead of using alert and confirm.