// Battle system logic

let currentBattle = null;

class Battle {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.player1Card = null;
        this.player2Card = null;
        this.turn = 0;
        this.log = [];
    }

    setPlayer1Card(card) {
        this.player1Card = card;
    }

    setPlayer2Card(card) {
        this.player2Card = card;
        // Auto-select for AI opponent
    }

    addLog(message) {
        this.log.push(message);
        const battleMessages = document.getElementById('battle-messages');
        if (battleMessages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'battle-message';
            messageDiv.textContent = message;
            battleMessages.appendChild(messageDiv);
            battleMessages.scrollTop = battleMessages.scrollHeight;
        }
    }

    calculateDamage(attacker, defender) {
        // Pokemon-style damage calculation with some randomness
        const baseDamage = attacker.power;
        const defense = defender.defense;
        const speedBonus = attacker.speed > defender.speed ? 1.2 : 1.0;
        const randomFactor = 0.85 + Math.random() * 0.3; // 85% to 115%

        const damage = Math.floor((baseDamage / defense) * 50 * speedBonus * randomFactor);
        return Math.max(damage, 10); // Minimum 10 damage
    }

    async simulateBattle() {
        if (!this.player1Card || !this.player2Card) {
            this.addLog("⚠️ Both players must select a card!");
            return null;
        }

        this.addLog("⚔️ Battle Start!");
        this.addLog(`${this.player1.name} uses ${this.player1Card.name}!`);
        this.addLog(`${this.player2.name} uses ${this.player2Card.name}!`);
        this.addLog("---");

        let player1HP = 100;
        let player2HP = 100;
        let round = 1;

        // Determine who goes first based on speed
        let firstAttacker, firstDefender, firstCard, secondCard;
        if (this.player1Card.speed >= this.player2Card.speed) {
            firstAttacker = this.player1;
            firstDefender = this.player2;
            firstCard = this.player1Card;
            secondCard = this.player2Card;
        } else {
            firstAttacker = this.player2;
            firstDefender = this.player1;
            firstCard = this.player2Card;
            secondCard = this.player1Card;
        }

        this.addLog(`⚡ ${firstCard.name} is faster and attacks first!`);
        await this.delay(1000);

        // Battle loop
        while (player1HP > 0 && player2HP > 0 && round <= 10) {
            this.addLog(`\n--- Round ${round} ---`);
            await this.delay(800);

            // First attacker's turn
            const damage1 = this.calculateDamage(firstCard, secondCard);
            if (firstAttacker.id === this.player1.id) {
                player2HP -= damage1;
                this.addLog(`${firstCard.name} attacks for ${damage1} damage!`);
                this.addLog(`${this.player2.name}'s HP: ${Math.max(0, player2HP)}/100`);
            } else {
                player1HP -= damage1;
                this.addLog(`${firstCard.name} attacks for ${damage1} damage!`);
                this.addLog(`${this.player1.name}'s HP: ${Math.max(0, player1HP)}/100`);
            }
            await this.delay(1000);

            if (player1HP <= 0 || player2HP <= 0) break;

            // Second attacker's turn
            const damage2 = this.calculateDamage(secondCard, firstCard);
            if (firstAttacker.id === this.player1.id) {
                player1HP -= damage2;
                this.addLog(`${secondCard.name} counters for ${damage2} damage!`);
                this.addLog(`${this.player1.name}'s HP: ${Math.max(0, player1HP)}/100`);
            } else {
                player2HP -= damage2;
                this.addLog(`${secondCard.name} counters for ${damage2} damage!`);
                this.addLog(`${this.player2.name}'s HP: ${Math.max(0, player2HP)}/100`);
            }
            await this.delay(1000);

            round++;
        }

        // Determine winner
        let winner, loser;
        if (player1HP > player2HP) {
            winner = this.player1;
            loser = this.player2;
        } else if (player2HP > player1HP) {
            winner = this.player2;
            loser = this.player1;
        } else {
            // Tie-breaker: higher total stats wins
            const p1Total = this.player1Card.power + this.player1Card.defense + this.player1Card.speed;
            const p2Total = this.player2Card.power + this.player2Card.defense + this.player2Card.speed;
            if (p1Total > p2Total) {
                winner = this.player1;
                loser = this.player2;
            } else {
                winner = this.player2;
                loser = this.player1;
            }
        }

        this.addLog("\n🏆 Battle Complete! 🏆");
        this.addLog(`${winner.name} wins the battle!`);
        await this.delay(500);

        // Record the result
        recordBattleResult(winner.id, loser.id);

        // Award a random card to winner if they don't have all cards
        const winnerTeacher = getTeacher(winner.id);
        const availableCards = getAllCards().filter(c => !hasCard(winnerTeacher, c.id));
        if (availableCards.length > 0) {
            const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
            addCardToTeacher(winner.id, randomCard.id);
            this.addLog(`\n🎁 ${winner.name} earned a new card: ${randomCard.name}!`);
        }

        return winner;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

function initiateBattle(opponent) {
    const player = getCurrentTeacher();
    if (!player) return;

    currentBattle = new Battle(player, opponent);

    // Show battle arena
    document.getElementById('opponent-list').style.display = 'none';
    document.getElementById('battle-arena').style.display = 'block';

    // Set player names
    document.getElementById('player1-name').textContent = player.name;
    document.getElementById('player2-name').textContent = opponent.name;

    // Clear previous battle
    document.getElementById('battle-messages').innerHTML = '';
    document.getElementById('player-card').innerHTML = '<p style="color: var(--primary-color);">Select a card below</p>';
    document.getElementById('opponent-card').innerHTML = '<p style="color: var(--primary-color);">Waiting...</p>';

    // Render player's deck
    renderDeck('player-deck', player, (card) => {
        currentBattle.setPlayer1Card(card);
        document.getElementById('player-card').innerHTML = createBattleCardDisplay(card);

        // Auto-select opponent's card
        const opponentCards = getTeacherCards(opponent);
        const randomOpponentCard = opponentCards[Math.floor(Math.random() * opponentCards.length)];
        currentBattle.setPlayer2Card(randomOpponentCard);
        document.getElementById('opponent-card').innerHTML = '<p style="color: var(--primary-color);">Card Selected!</p>';
    });

    // Setup battle button
    const startBtn = document.getElementById('start-battle-btn');
    startBtn.onclick = async () => {
        if (!currentBattle.player1Card || !currentBattle.player2Card) {
            alert("Please select a card first!");
            return;
        }

        startBtn.disabled = true;
        startBtn.textContent = "Battle in Progress...";

        // Reveal opponent's card
        document.getElementById('opponent-card').innerHTML = createBattleCardDisplay(currentBattle.player2Card);

        await currentBattle.simulateBattle();

        startBtn.disabled = false;
        startBtn.textContent = "Battle Again";

        // Refresh collection if we're the current user
        if (currentBattle.player1.id === getCurrentTeacher().id) {
            setCurrentTeacher(getTeacher(currentBattle.player1.id));
        }
    };

    // Setup back button
    document.getElementById('back-to-selection-btn').onclick = () => {
        document.getElementById('opponent-list').style.display = 'grid';
        document.getElementById('battle-arena').style.display = 'none';
        currentBattle = null;
    };
}
