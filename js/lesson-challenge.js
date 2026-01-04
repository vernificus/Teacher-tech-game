// Lesson Planning Challenge System (formerly battle.js)
// Based on LCPS Instructional Framework

let currentChallenge = null;

// Teaching scenarios based on real classroom situations
const SCENARIOS = [
    {
        id: 1,
        title: "Teaching Seasons to Diverse Learners",
        description: "You have 25 minutes to teach why we have seasons. Your class has 18 level 2 EL students, 6 students with an IEP for reading or writing disabilities, and 23 students altogether.",
        requirements: {
            studentCentered: 90,  // High need for personalization
            design: 85,           // Must design for accessibility
            engage: 90,           // Short time requires high engagement
            assess: 75,           // Need to check understanding
            reflectRespond: 70    // Adjust based on diverse needs
        },
        cardsNeeded: 4
    },
    {
        id: 2,
        title: "Collaborative Problem-Solving in Math",
        description: "Design a 40-minute lesson where 5th graders work in small groups to solve multi-step fraction problems. You need to assess both individual understanding and group collaboration skills.",
        requirements: {
            studentCentered: 80,
            design: 85,
            engage: 85,
            assess: 95,           // High assessment need
            reflectRespond: 85
        },
        cardsNeeded: 4
    },
    {
        id: 3,
        title: "Differentiated Reading Comprehension",
        description: "Create a lesson where students at 5 different reading levels all engage with the same novel chapter. You need to provide choice in how they demonstrate understanding.",
        requirements: {
            studentCentered: 95,  // Very high personalization
            design: 90,
            engage: 80,
            assess: 85,
            reflectRespond: 90    // Monitor and adjust for each level
        },
        cardsNeeded: 5
    },
    {
        id: 4,
        title: "Interactive Science Investigation",
        description: "Plan a hands-on science lesson on ecosystems where students collect data, analyze patterns, and present findings. Time: 50 minutes.",
        requirements: {
            studentCentered: 75,
            design: 80,
            engage: 95,           // Highly interactive
            assess: 85,
            reflectRespond: 75
        },
        cardsNeeded: 3
    },
    {
        id: 5,
        title: "Student Voice & Choice Project",
        description: "Design a week-long project where students choose how to demonstrate mastery of a social studies unit. Must include formative checkpoints and peer feedback.",
        requirements: {
            studentCentered: 95,
            design: 90,
            engage: 90,
            assess: 85,
            reflectRespond: 95    // Continuous feedback loops
        },
        cardsNeeded: 5
    }
];

class LessonPlanningChallenge {
    constructor(teacher1, teacher2, scenario) {
        this.teacher1 = teacher1;
        this.teacher2 = teacher2;
        this.scenario = scenario;
        this.teacher1Cards = [];
        this.teacher2Cards = [];
        this.log = [];
    }

    addCard(teacherId, card) {
        if (teacherId === this.teacher1.id) {
            if (this.teacher1Cards.length < this.scenario.cardsNeeded) {
                this.teacher1Cards.push(card);
                return true;
            }
        }
        return false;
    }

    removeCard(teacherId, cardId) {
        if (teacherId === this.teacher1.id) {
            this.teacher1Cards = this.teacher1Cards.filter(c => c.id !== cardId);
        }
    }

    addLog(message) {
        this.log.push(message);
        const logContainer = document.getElementById('challenge-messages');
        if (logContainer) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'challenge-message';
            messageDiv.textContent = message;
            logContainer.appendChild(messageDiv);
            logContainer.scrollTop = logContainer.scrollHeight;
        }
    }

    calculateLessonScore(cards) {
        const scores = {
            studentCentered: 0,
            design: 0,
            engage: 0,
            assess: 0,
            reflectRespond: 0
        };

        // Average the stats from all selected cards
        cards.forEach(card => {
            scores.studentCentered += card.studentCentered;
            scores.design += card.design;
            scores.engage += card.engage;
            scores.assess += card.assess;
            scores.reflectRespond += card.reflectRespond;
        });

        const cardCount = cards.length;
        Object.keys(scores).forEach(key => {
            scores[key] = Math.round(scores[key] / cardCount);
        });

        return scores;
    }

    calculateFitScore(lessonScores, requirements) {
        let totalFit = 0;
        let maxPossible = 0;

        Object.keys(requirements).forEach(component => {
            const required = requirements[component];
            const provided = lessonScores[component];
            const componentFit = Math.max(0, 100 - Math.abs(required - provided));
            totalFit += componentFit * (required / 100); // Weight by requirement importance
            maxPossible += 100 * (required / 100);
        });

        return Math.round((totalFit / maxPossible) * 100);
    }

    async evaluateLesson() {
        if (this.teacher1Cards.length !== this.scenario.cardsNeeded) {
            this.addLog(`⚠️ Please select exactly ${this.scenario.cardsNeeded} tools for your lesson plan.`);
            return null;
        }

        // Auto-select cards for opponent
        const opponentCards = getTeacherCards(this.teacher2);
        this.teacher2Cards = [];
        for (let i = 0; i < this.scenario.cardsNeeded && i < opponentCards.length; i++) {
            this.teacher2Cards.push(opponentCards[i]);
        }

        this.addLog("📋 Evaluating lesson plans against the scenario requirements...");
        await this.delay(800);

        // Calculate scores for both lesson plans
        const teacher1LessonScores = this.calculateLessonScore(this.teacher1Cards);
        const teacher2LessonScores = this.calculateLessonScore(this.teacher2Cards);

        const teacher1Fit = this.calculateFitScore(teacher1LessonScores, this.scenario.requirements);
        const teacher2Fit = this.calculateFitScore(teacher2LessonScores, this.scenario.requirements);

        // Display teacher 1's plan
        this.addLog(`\n📚 ${this.teacher1.name}'s Lesson Plan:`);
        this.addLog(`Tools: ${this.teacher1Cards.map(c => c.name).join(', ')}`);
        await this.delay(500);

        this.addLog(`\n📊 Framework Alignment:`);
        this.addLog(`👥 Student Centered: ${teacher1LessonScores.studentCentered} (need: ${this.scenario.requirements.studentCentered})`);
        this.addLog(`📐 Design: ${teacher1LessonScores.design} (need: ${this.scenario.requirements.design})`);
        this.addLog(`🎯 Engage: ${teacher1LessonScores.engage} (need: ${this.scenario.requirements.engage})`);
        this.addLog(`📊 Assess: ${teacher1LessonScores.assess} (need: ${this.scenario.requirements.assess})`);
        this.addLog(`🔄 Reflect & Respond: ${teacher1LessonScores.reflectRespond} (need: ${this.scenario.requirements.reflectRespond})`);
        this.addLog(`\n✨ Overall Fit: ${teacher1Fit}%`);
        await this.delay(1000);

        // Display teacher 2's plan
        this.addLog(`\n📚 ${this.teacher2.name}'s Lesson Plan:`);
        this.addLog(`Tools: ${this.teacher2Cards.map(c => c.name).join(', ')}`);
        await this.delay(500);

        this.addLog(`\n📊 Framework Alignment:`);
        this.addLog(`👥 Student Centered: ${teacher2LessonScores.studentCentered} (need: ${this.scenario.requirements.studentCentered})`);
        this.addLog(`📐 Design: ${teacher2LessonScores.design} (need: ${this.scenario.requirements.design})`);
        this.addLog(`🎯 Engage: ${teacher2LessonScores.engage} (need: ${this.scenario.requirements.engage})`);
        this.addLog(`📊 Assess: ${teacher2LessonScores.assess} (need: ${this.scenario.requirements.assess})`);
        this.addLog(`🔄 Reflect & Respond: ${teacher2LessonScores.reflectRespond} (need: ${this.scenario.requirements.reflectRespond})`);
        this.addLog(`\n✨ Overall Fit: ${teacher2Fit}%`);
        await this.delay(1000);

        // Determine winner
        let winner, loser;
        if (teacher1Fit > teacher2Fit) {
            winner = this.teacher1;
            loser = this.teacher2;
            this.addLog(`\n🏆 ${this.teacher1.name}'s lesson plan better aligns with the scenario requirements!`);
        } else if (teacher2Fit > teacher1Fit) {
            winner = this.teacher2;
            loser = this.teacher1;
            this.addLog(`\n🏆 ${this.teacher2.name}'s lesson plan better aligns with the scenario requirements!`);
        } else {
            this.addLog(`\n🤝 Both lesson plans are equally aligned with the framework!`);
            winner = null;
        }

        await this.delay(500);

        // Record the result (NO card rewards)
        if (winner) {
            recordBattleResult(winner.id, loser.id);
            this.addLog(`\n📝 ${winner.name} earns a win in their teaching record!`);
        }

        return winner;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

function getRandomScenario() {
    return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

function initiateChallenge(opponent) {
    const teacher = getCurrentTeacher();
    if (!teacher) return;

    const scenario = getRandomScenario();
    currentChallenge = new LessonPlanningChallenge(teacher, opponent, scenario);

    // Show challenge arena
    document.getElementById('opponent-list').style.display = 'none';
    document.getElementById('challenge-arena').style.display = 'block';

    // Set teacher names
    document.getElementById('player1-name').textContent = teacher.name;
    document.getElementById('player2-name').textContent = opponent.name;

    // Display scenario
    document.getElementById('scenario-display').innerHTML = `
        <div style="background: var(--light-bg); padding: 20px; border-radius: 10px; border-left: 5px solid var(--primary-color);">
            <h3 style="color: var(--accent-color); margin-bottom: 10px;">📋 ${scenario.title}</h3>
            <p style="margin-bottom: 15px;">${scenario.description}</p>
            <p style="font-weight: bold; color: var(--secondary-color);">
                Select ${scenario.cardsNeeded} tools to create the best lesson plan for this scenario.
            </p>
        </div>
    `;

    // Clear previous challenge
    document.getElementById('challenge-messages').innerHTML = '';
    document.getElementById('selected-cards-display').innerHTML = '';

    // Render teacher's available cards
    renderChallengeDeck('teacher-deck', teacher);

    // Setup evaluate button
    const evaluateBtn = document.getElementById('evaluate-lesson-btn');
    evaluateBtn.onclick = async () => {
        evaluateBtn.disabled = true;
        evaluateBtn.textContent = "Evaluating...";

        await currentChallenge.evaluateLesson();

        evaluateBtn.disabled = false;
        evaluateBtn.textContent = "New Challenge";
        evaluateBtn.onclick = () => location.reload(); // Simple refresh for new challenge
    };

    // Setup back button
    document.getElementById('back-to-selection-btn').onclick = () => {
        document.getElementById('opponent-list').style.display = 'grid';
        document.getElementById('challenge-arena').style.display = 'none';
        currentChallenge = null;
    };
}

function renderChallengeDeck(containerId, teacher) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const cards = getTeacherCards(teacher);
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'mini-card';
        cardDiv.dataset.cardId = card.id;
        cardDiv.innerHTML = `
            <div>${card.icon}</div>
            <div style="font-size: 0.7em; margin-top: 5px;">${card.name}</div>
        `;

        cardDiv.addEventListener('click', () => {
            if (cardDiv.classList.contains('selected')) {
                // Deselect
                cardDiv.classList.remove('selected');
                currentChallenge.removeCard(teacher.id, card.id);
            } else {
                // Select if under limit
                if (currentChallenge.addCard(teacher.id, card)) {
                    cardDiv.classList.add('selected');
                } else {
                    alert(`You can only select ${currentChallenge.scenario.cardsNeeded} tools!`);
                }
            }
            updateSelectedCardsDisplay();
        });

        container.appendChild(cardDiv);
    });
}

function updateSelectedCardsDisplay() {
    const display = document.getElementById('selected-cards-display');
    display.innerHTML = '';

    if (currentChallenge.teacher1Cards.length === 0) {
        display.innerHTML = '<p style="color: #999;">Select tools from your deck below...</p>';
        return;
    }

    currentChallenge.teacher1Cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'selected-tool-card';
        cardDiv.innerHTML = `
            <div style="font-size: 2em;">${card.icon}</div>
            <div style="font-weight: bold; margin-top: 5px;">${card.name}</div>
            <div style="font-size: 0.8em; color: #666;">${card.type}</div>
        `;
        display.appendChild(cardDiv);
    });
}
