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
    },
    // BOSS BATTLES - Extra challenging scenarios
    {
        id: 6,
        title: "🔥 BOSS BATTLE: WiFi is Down!",
        description: "EMERGENCY: The school WiFi has been down for 3 days. You need to teach a full day of lessons using ONLY offline-capable tools. Your students are getting restless and you need to maintain engagement and learning progress.",
        requirements: {
            studentCentered: 85,
            design: 95,           // Must be extremely well-designed for offline
            engage: 90,           // Keep students engaged without internet
            assess: 80,
            reflectRespond: 85
        },
        cardsNeeded: 4,
        isBossBattle: true,
        requireOffline: true      // Special constraint: only offline tools allowed
    },
    {
        id: 7,
        title: "🔥 BOSS BATTLE: Emergency Sub Plans",
        description: "You're out sick and need to create comprehensive sub plans at 6 AM that will work for ANY substitute teacher. Plans must be crystal clear, engaging, and allow students to work independently while maintaining rigor.",
        requirements: {
            studentCentered: 90,
            design: 100,          // Must be incredibly well-designed
            engage: 95,
            assess: 90,           // Sub needs to assess understanding
            reflectRespond: 80
        },
        cardsNeeded: 5,
        isBossBattle: true
    },
    {
        id: 8,
        title: "🔥 BOSS BATTLE: 1:1 Device Mandate",
        description: "URGENT: Your principal just mandated that every lesson must actively use technology for at least 70% of class time, starting tomorrow. Plan a full week of lessons that meet this requirement while maintaining pedagogical best practices.",
        requirements: {
            studentCentered: 85,
            design: 90,
            engage: 100,          // Must be highly engaging with tech
            assess: 90,
            reflectRespond: 85
        },
        cardsNeeded: 5,
        isBossBattle: true
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

        // Check for tool synergies and apply combo bonuses
        const appliedCombos = this.detectSynergies(cards, scores);

        // Store combo info for display later
        scores._combos = appliedCombos;

        return scores;
    }

    detectSynergies(cards, scores) {
        // Define synergy combinations
        const SYNERGIES = [
            {
                tools: ['Canva', 'Nearpod'],
                bonusStat: 'engage',
                amount: 10,
                name: 'Visual Engagement',
                description: 'Beautiful design + interactive delivery = captivated students'
            },
            {
                tools: ['Google Classroom', 'Wakelet'],
                bonusStat: 'design',
                amount: 8,
                name: 'Workflow Master',
                description: 'Seamless integration for organized content delivery'
            },
            {
                tools: ['Kahoot!', 'Gimkit'],
                bonusStat: 'assess',
                amount: 12,
                name: 'Assessment Arsenal',
                description: 'Multiple game-based assessment tools for deep understanding'
            },
            {
                tools: ['Flipgrid', 'Padlet'],
                bonusStat: 'studentCentered',
                amount: 10,
                name: 'Student Voice',
                description: 'Empowering students to share and collaborate authentically'
            },
            {
                tools: ['Edpuzzle', 'Screencastify'],
                bonusStat: 'design',
                amount: 8,
                name: 'Video Learning Suite',
                description: 'Create and enhance video content for asynchronous learning'
            },
            {
                tools: ['Seesaw', 'BookCreator'],
                bonusStat: 'reflectRespond',
                amount: 10,
                name: 'Portfolio Power',
                description: 'Document learning journey with reflection and creativity'
            },
            {
                tools: ['Quizlet', 'Kahoot!'],
                bonusStat: 'engage',
                amount: 8,
                name: 'Study & Play',
                description: 'Practice meets gamification for retention'
            },
            {
                tools: ['Mentimeter', 'Nearpod'],
                bonusStat: 'assess',
                amount: 9,
                name: 'Real-Time Feedback',
                description: 'Instant formative assessment to guide instruction'
            },
            {
                tools: ['Scratch', 'Classcraft'],
                bonusStat: 'engage',
                amount: 11,
                name: 'Gaming & Coding',
                description: 'Computational thinking meets classroom gamification'
            },
            {
                tools: ['Wakelet', 'Padlet'],
                bonusStat: 'design',
                amount: 7,
                name: 'Curation Combo',
                description: 'Organize and share resources beautifully'
            }
        ];

        const appliedCombos = [];
        const cardNames = cards.map(c => c.name);

        SYNERGIES.forEach(synergy => {
            if (synergy.tools.every(tool => cardNames.includes(tool))) {
                scores[synergy.bonusStat] += synergy.amount;
                appliedCombos.push(synergy);
                this.addLog(`✨ SYNERGY BONUS: ${synergy.name}! (+${synergy.amount} ${synergy.bonusStat})`);
                this.addLog(`   💡 ${synergy.description}`);
            }
        });

        return appliedCombos;
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

        // Check boss battle constraints
        if (this.scenario.requireOffline) {
            const onlineTools = this.teacher1Cards.filter(card => !card.offline);
            if (onlineTools.length > 0) {
                this.addLog(`⚠️ BOSS BATTLE FAILED: WiFi is down! These tools require internet: ${onlineTools.map(c => c.name).join(', ')}`);
                this.addLog(`💡 Hint: Only use tools marked as "Works Offline" for this challenge!`);
                return null;
            }
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
        let winner, loser, winnerFit, loserFit;
        if (teacher1Fit > teacher2Fit) {
            winner = this.teacher1;
            loser = this.teacher2;
            winnerFit = teacher1Fit;
            loserFit = teacher2Fit;
            this.addLog(`\n🏆 ${this.teacher1.name}'s lesson plan better aligns with the scenario requirements!`);
        } else if (teacher2Fit > teacher1Fit) {
            winner = this.teacher2;
            loser = this.teacher1;
            winnerFit = teacher2Fit;
            loserFit = teacher1Fit;
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

        // Show big visual results modal
        this.showResultsModal(winner, loser, winnerFit, loserFit, teacher1Fit, teacher2Fit);

        return winner;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showResultsModal(winner, loser, winnerFit, loserFit, teacher1Fit, teacher2Fit) {
        // Get the lesson scores for visualization
        const teacher1LessonScores = this.calculateLessonScore(this.teacher1Cards);
        const teacher2LessonScores = this.calculateLessonScore(this.teacher2Cards);

        // Create framework comparison bars
        const frameworkComponents = [
            { key: 'studentCentered', label: '👥 Student Centered', icon: '👥' },
            { key: 'design', label: '📐 Design', icon: '📐' },
            { key: 'engage', label: '🎯 Engage', icon: '🎯' },
            { key: 'assess', label: '📊 Assess', icon: '📊' },
            { key: 'reflectRespond', label: '🔄 Reflect & Respond', icon: '🔄' }
        ];

        let frameworkBarsHTML = '';
        frameworkComponents.forEach(comp => {
            const teacher1Score = teacher1LessonScores[comp.key];
            const teacher2Score = teacher2LessonScores[comp.key];
            const required = this.scenario.requirements[comp.key];

            frameworkBarsHTML += `
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="font-weight: bold; font-size: 0.9em;">${comp.icon} ${comp.label}</span>
                        <span style="font-size: 0.8em; color: #666;">Target: ${required}</span>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <div style="flex: 1;">
                            <div style="background: #e0e0e0; height: 24px; border-radius: 12px; overflow: hidden; position: relative;">
                                <div style="
                                    background: ${winner && winner.id === this.teacher1.id ? 'var(--success-color)' : '#3498db'};
                                    height: 100%;
                                    width: ${Math.min(100, (teacher1Score / 100) * 100)}%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: white;
                                    font-weight: bold;
                                    font-size: 0.8em;
                                    transition: width 0.5s ease;
                                ">${teacher1Score}</div>
                            </div>
                        </div>
                        <div style="width: 30px; text-align: center; font-weight: bold; color: #999;">vs</div>
                        <div style="flex: 1;">
                            <div style="background: #e0e0e0; height: 24px; border-radius: 12px; overflow: hidden; position: relative;">
                                <div style="
                                    background: ${winner && winner.id === this.teacher2.id ? 'var(--success-color)' : '#e74c3c'};
                                    height: 100%;
                                    width: ${Math.min(100, (teacher2Score / 100) * 100)}%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: white;
                                    font-weight: bold;
                                    font-size: 0.8em;
                                    transition: width 0.5s ease;
                                ">${teacher2Score}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Create modal overlay
        const modal = document.createElement('div');
        modal.id = 'results-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
            overflow-y: auto;
            padding: 20px;
        `;

        let resultsHTML;

        if (winner) {
            // Winner announced
            resultsHTML = `
                <div style="
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 800px;
                    width: 90%;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    text-align: center;
                    animation: slideIn 0.5s ease;
                    max-height: 90vh;
                    overflow-y: auto;
                ">
                    <div style="font-size: 5em; margin-bottom: 20px; animation: bounce 0.8s ease;">🏆</div>
                    <h2 style="color: var(--accent-color); font-size: 2.5em; margin-bottom: 10px;">
                        ${winner.name} Wins!
                    </h2>
                    <p style="font-size: 1.3em; color: #666; margin-bottom: 30px;">
                        Best Lesson Plan for the Scenario
                    </p>

                    <!-- Framework Comparison Bars -->
                    <div style="
                        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                        border-radius: 15px;
                        padding: 25px;
                        margin-bottom: 25px;
                        text-align: left;
                    ">
                        <h3 style="color: var(--dark-bg); margin-bottom: 20px; text-align: center;">📊 Framework Component Breakdown</h3>
                        <div style="display: flex; justify-content: space-around; margin-bottom: 20px; text-align: center;">
                            <div>
                                <div style="font-weight: bold; color: var(--secondary-color);">${this.teacher1.name}</div>
                                <div style="font-size: 1.5em; font-weight: bold; color: var(--success-color);">${teacher1Fit}%</div>
                            </div>
                            <div>
                                <div style="font-weight: bold; color: var(--secondary-color);">${this.teacher2.name}</div>
                                <div style="font-size: 1.5em; font-weight: bold; color: #e74c3c;">${teacher2Fit}%</div>
                            </div>
                        </div>
                        ${frameworkBarsHTML}
                        <div style="
                            background: white;
                            border-radius: 10px;
                            padding: 15px;
                            margin-top: 20px;
                            text-align: center;
                        ">
                            <div style="font-size: 1.2em; color: var(--accent-color); font-weight: bold;">
                                Margin of Victory: ${Math.abs(winnerFit - loserFit)}%
                            </div>
                        </div>
                    </div>

                    <!-- Updated Record -->
                    <div style="
                        background: var(--light-bg);
                        border-radius: 10px;
                        padding: 20px;
                        margin-bottom: 25px;
                    ">
                        <h4 style="color: var(--dark-bg); margin-bottom: 10px;">Updated Teaching Record</h4>
                        <div style="font-size: 1.1em;">
                            <strong>${winner.name}:</strong>
                            <span style="color: var(--success-color); font-weight: bold;">${winner.wins} Wins</span> -
                            <span style="color: #e74c3c; font-weight: bold;">${winner.losses} Losses</span>
                        </div>
                    </div>

                    <button onclick="document.getElementById('results-modal').remove(); location.reload();" style="
                        background: var(--accent-color);
                        color: white;
                        border: none;
                        padding: 15px 40px;
                        border-radius: 10px;
                        font-size: 1.2em;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.3)';"
                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)';">
                        🎯 New Challenge
                    </button>
                </div>
            `;
        } else {
            // Tie game
            resultsHTML = `
                <div style="
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 600px;
                    width: 90%;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    text-align: center;
                    animation: slideIn 0.5s ease;
                ">
                    <div style="font-size: 5em; margin-bottom: 20px;">🤝</div>
                    <h2 style="color: var(--secondary-color); font-size: 2.5em; margin-bottom: 10px;">
                        It's a Tie!
                    </h2>
                    <p style="font-size: 1.3em; color: #666; margin-bottom: 30px;">
                        Both lesson plans are equally aligned with the framework
                    </p>

                    <div style="
                        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                        border-radius: 15px;
                        padding: 25px;
                        margin-bottom: 25px;
                    ">
                        <h3 style="color: var(--dark-bg); margin-bottom: 20px;">Framework Alignment Score</h3>
                        <div style="
                            font-size: 3.5em;
                            font-weight: bold;
                            color: var(--secondary-color);
                            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                        ">
                            ${teacher1Fit}%
                        </div>
                        <div style="margin-top: 10px; font-size: 1.1em; color: #666;">
                            ${this.teacher1.name} and ${this.teacher2.name}
                        </div>
                    </div>

                    <button onclick="document.getElementById('results-modal').remove(); location.reload();" style="
                        background: var(--secondary-color);
                        color: white;
                        border: none;
                        padding: 15px 40px;
                        border-radius: 10px;
                        font-size: 1.2em;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.3)';"
                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)';">
                        🎯 New Challenge
                    </button>
                </div>
            `;
        }

        modal.innerHTML = resultsHTML;
        document.body.appendChild(modal);
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
    const bossBattleStyle = scenario.isBossBattle ?
        'background: linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%); border-left: 5px solid #ff0000; animation: pulse 2s ease-in-out infinite;' :
        'background: var(--light-bg); border-left: 5px solid var(--primary-color);';

    const constraintWarning = scenario.requireOffline ?
        '<div style="background: #fff3cd; border: 2px solid #ffc107; padding: 10px; border-radius: 8px; margin-top: 10px;"><strong>⚠️ SPECIAL CONSTRAINT:</strong> WiFi is down! You can ONLY use offline-capable tools.</div>' :
        '';

    document.getElementById('scenario-display').innerHTML = `
        <div style="${bossBattleStyle} padding: 20px; border-radius: 10px;">
            <h3 style="color: ${scenario.isBossBattle ? '#8b0000' : 'var(--accent-color)'}; margin-bottom: 10px;">${scenario.title}</h3>
            <p style="margin-bottom: 15px; ${scenario.isBossBattle ? 'font-weight: bold;' : ''}">${scenario.description}</p>
            <p style="font-weight: bold; color: var(--secondary-color);">
                Select ${scenario.cardsNeeded} tools to create the best lesson plan for this scenario.
            </p>
            ${constraintWarning}
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
