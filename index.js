let player = {
    name: "Bala",
    chips: 200
}
let playerCards = []
let dealerCards = []
let playerSum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEL = document.getElementById("message-el")
let sumEL = document.getElementById("sum-el") 
let cardsEL = document.getElementById("cards-el")
let playerEL = document.getElementById("player-el")
let dealerSumEL = document.getElementById("dealer-sum-el")
document.getElementById("new-game").style.display = "none"


playerEL.textContent = player.name + ": $" + player.chips
document.getElementById("new-card").disabled = true;
document.getElementById("surrender").disabled = true;
document.getElementById("show-cards").disabled = true;


function getRandomCard() {
    let randomCard = Math.floor( Math.random() * 13 ) + 1
    if ([11, 12, 13].includes(randomCard)) {
        randomCard = 10
    } else if (randomCard === 1) {
        randomCard = 11
    } 
    return randomCard
}

function startGame() {
    playerCards = []
    if ( player.chips > 0) {
        sumEL.textContent = "Sum: "
        isAlive = true
        hasBlackJack = false
        let firstPlayerCard = getRandomCard()
        let secondPlayerCard = getRandomCard()
        let firstDealerCard = getRandomCard()
        let secondDealerCard = getRandomCard()
        dealerSum = firstDealerCard + secondDealerCard
        playerSum = firstPlayerCard + secondPlayerCard
        playerCards.push(firstPlayerCard, secondPlayerCard)
        dealerCards.push(firstDealerCard, secondDealerCard)
        document.getElementById("start-game").disabled = true;
        document.getElementById("new-card").disabled = false;
        document.getElementById("surrender").disabled = false;
        document.getElementById("show-cards").disabled = false;
        dealerSumEL.textContent = ""
        renderGame()
    } else {
        document.getElementById("start-game").disabled = true;
        messageEL.textContent = "You are out of chips! Can't play anymore!";
        document.getElementById('new-game').style.display = 'flex'
    }
}

function renderGame() {
    if ( dealerSum === 21 ) {
        message = "Dealer got Blackjack, you're out of the game!"
        isAlive = false
        player.chips -= 20
        playerEL.textContent = player.name + ": $" + player.chips;
        dealerSumEL.textContent = "Dealer Sum:" + dealerSum
        document.getElementById("start-game").disabled = false;
        document.getElementById("new-card").disabled = true;
        document.getElementById("surrender").disabled = true;
        document.getElementById("show-cards").disabled = true;
        messageEL.textContent = message
        sumEL.textContent = "Sum: " + playerSum
        cardsEL.textContent = "Cards: "
        for ( let i = 0; i < playerCards.length; i++) {
            cardsEL.textContent += playerCards[i] + " "
        }
    } else {
        if (playerSum <= 20) {
            message = "Do you want to draw a new card?"
        } else if (playerSum === 21) {
            message = "You've got Blackjack!"
            hasBlackJack = true
            player.chips += 40
            playerEL.textContent = player.name + ": $" + player.chips
            document.getElementById("start-game").disabled = false;
            document.getElementById("new-card").disabled = true;
            document.getElementById("surrender").disabled = true;
            document.getElementById("show-cards").disabled = true;
        } else {
            message = "You're out of the game!"
            isAlive = false
            player.chips -= 40
            playerEL.textContent = player.name + ": $" + player.chips;
            document.getElementById("start-game").disabled = false;
            document.getElementById("new-card").disabled = true;
            document.getElementById("surrender").disabled = true;
            document.getElementById("show-cards").disabled = true;
        }
        messageEL.textContent = message
        sumEL.textContent = "Sum: " + playerSum
        cardsEL.textContent = "Cards: "
        for ( let i = 0; i < playerCards.length; i++) {
            cardsEL.textContent += playerCards[i] + " "
        }
    }
}

function newCard() {
    if ( isAlive === true && hasBlackJack === false) {
        let cardDrawn = getRandomCard()
        playerSum += cardDrawn
        playerCards.push(cardDrawn)
        renderGame()
    }
}

function surrender() {
    if ( isAlive === true && hasBlackJack === false) {
        message = "You've forfieted the game!"
        isAlive = false
        player.chips -= 10
        playerEL.textContent = player.name + ": $" + player.chips;
        dealerSumEL.textContent = "Dealer Sum: " + dealerSum
        document.getElementById("start-game").disabled = false;
        document.getElementById("new-card").disabled = true;
        document.getElementById("surrender").disabled = true;
        document.getElementById("show-cards").disabled = true;
        messageEL.textContent = message
    }
}

function showCards() {
    if ( isAlive === true && hasBlackJack === false) {
        if( (playerSum < dealerSum) && (dealerSum < 21) ){
            message = "You've lost the game!"
            isAlive = false
            player.chips -= 20
            document.getElementById("start-game").disabled = false;
            document.getElementById("new-card").disabled = true;
            document.getElementById("surrender").disabled = true;
            document.getElementById("show-cards").disabled = true;
        } else if ( (dealerSum < playerSum) && (playerSum < 21) ) {
            message = "You've won the game!"
            hasBlackJack = true
            player.chips += 20
            document.getElementById("start-game").disabled = false;
            document.getElementById("new-card").disabled = true;
            document.getElementById("surrender").disabled = true;
            document.getElementById("show-cards").disabled = true;
        } else if ( dealerSum === playerSum ) {
            message = "It's tie!"
            hasBlackJack = true
            document.getElementById("start-game").disabled = false;
            document.getElementById("new-card").disabled = true;
            document.getElementById("surrender").disabled = true;
            document.getElementById("show-cards").disabled = true;
        }
        messageEL.textContent = message
        sumEL.textContent = "Sum: " + playerSum
        dealerSumEL.textContent = "Dealer Sum: " + dealerSum
        playerEL.textContent = player.name + ": $" + player.chips;
        cardsEL.textContent = "Cards: "
        for ( let i = 0; i < playerCards.length; i++) {
            cardsEL.textContent += playerCards[i] + " "
        }
    }
}

function newGame() {
    sumEL.textContent = "Sum: "
    isAlive = true
    hasBlackJack = false
    document.getElementById("start-game").disabled = false;
    document.getElementById("new-card").disabled = true;
    document.getElementById("surrender").disabled = true;
    document.getElementById("show-cards").disabled = true;
    sumEL.textContent = "Sum: "
    dealerCards = []
    playerCards = []
    dealerSum = 0
    playerSum = 0
    messageEL.textContent = "Want to play a round?"
    player.chips = 200;
    cardsEL.textContent = "Cards: "
    playerEL.textContent = player.name + ": $" + player.chips;
    dealerSumEL.textContent = ""
    document.getElementById('new-game').style.display = 'none'
}