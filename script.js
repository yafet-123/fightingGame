// Grabs elements from the DOM and stores them into variables
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

const updateGame = (p1,p2,p1HealthDiv,p2HealthDiv, gameState) => {
    // update game by getting the data from props  
    p1HealthDiv.innerText = p1.health
    p2HealthDiv.innerText = p2.health
    // if p1 and p2 health less than 0 it is game over
    if (p1.health <= 0 || p2.health <= 0) {
        game.isOver = true;
        gameState = game.isOver
        result.innerText = game.declareWinner(game.isOver,p1,p2)
        return gameState
    } 
}

class Player {
    constructor(name, health, attackDamage) {
        this.name = name;
        this.health = health;
        this.attackDmg = attackDamage;
    }
    // strike take the player and his attack damage and enemy then it will multiply the player attack damage and with 
    // random amount and subtract from enemy health 
    strike (player, enemy, attackDmg) {
        let damageAmount = Math.ceil(Math.random() * attackDmg) 
        enemy.health -= damageAmount
        // update the game 
        updateGame(p1,p2,p1HealthDiv,p2HealthDiv,gameState)
        
        return `${player.name} attacks ${enemy.name} for ${damageAmount}` 
    }
    // heal is the same with the strike but it add health to the player
    heal (player) {
        let hpAmount = Math.ceil(Math.random() * 5)
        player.health += hpAmount
    
        updateGame(p1,p2,p1HealthDiv,p2HealthDiv,gameState)
        return `${player.name} heals for ${hpAmount} + HP!`
    }
}

class Game {
    constructor(p1HealthDiv,p2HealthDiv) {
        this.isOver = false;
        this.p1HealthDiv = p1HealthDiv
        this.p2HealthDiv = p2HealthDiv
    }
    

    declareWinner(isOver,p1, p2) {
        let message
        if (isOver == true && p1.health <= 0) {
            message = `${p2.name} WINS!`;
        } 
        else if(isOver == true && p2.health <= 0) {
            message = `${p1.name} WINS!`
        } 
    
        return message
    }
    
    // when we touch the reset button all the data will be resset
    reset(p1,p2) {
        p1.health = 100
        p2.health = 100
        this.isOver = false
        resultDiv.innerText = ''
        updateGame(p1,p2,p1HealthDiv,p2HealthDiv)
    }
    

    play(p1, p2) {
        this.reset(p1,p2);
        // we put ! to isOver to make true so that it can enter the loop
        while (!this.isOver) {
            p1.strike(p1,p2, p1.attackDmg)
            p2.heal(p2)
            p2.strike(p2,p1, p2.attackDmg);
            p1.heal(p1)
            updateGame(p1,p2,p1HealthDiv,p2HealthDiv);
        }
        return this.declareWinner(this.isOver,player1,player2);
    }
  
}
// before we do this we have to cretae player class that have the attribute of name , health and attackDamage 
let player1 = new Player('Lance', 100, 15)
let player2 = new Player('Qazi', 100, 15)

// before we do this we have to cretae game class that have the attribute of p1HealthDiv and p2HealthDiv 
let game = new Game(p1HealthDiv,p2HealthDiv);