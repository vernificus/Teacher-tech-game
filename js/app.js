// Main application logic

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    // Load data from Google Sheets
    const sheetsLoaded = await initializeFromSheets();

    if (sheetsLoaded) {
        console.log('✅ Google Sheets data loaded successfully!');
    } else {
        console.log('⚠️ Using fallback data (Google Sheets unavailable)');
    }

    // Check if user is logged in
    const currentUser = getCurrentTeacher();

    if (currentUser) {
        showDashboard();
    } else {
        showLogin();
    }

    setupEventListeners();
    addRefreshButton();
}

function setupEventListeners() {
    // Login screen
    document.getElementById('add-teacher-btn').addEventListener('click', handleAddTeacher);

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    // Dashboard navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            switchView(view);
        });
    });

    // Earn cards functionality
    document.getElementById('redeem-pd-btn').addEventListener('click', handleRedeemPDCode);
    document.getElementById('submit-usage-btn').addEventListener('click', handleSubmitUsage);
    document.getElementById('submit-scenario-btn').addEventListener('click', handleSubmitScenario);

    // Leaderboard filter
    document.getElementById('department-filter').addEventListener('change', (e) => {
        renderLeaderboard(e.target.value);
    });
}

function showLogin() {
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('dashboard-screen').classList.remove('active');
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('current-teacher').textContent = 'Select Teacher';

    renderTeacherList();
}

function showDashboard() {
    const teacher = getCurrentTeacher();
    if (!teacher) {
        showLogin();
        return;
    }

    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('dashboard-screen').classList.add('active');
    document.getElementById('logout-btn').style.display = 'block';
    document.getElementById('current-teacher').textContent = teacher.name;

    // Show collection by default
    switchView('collection');
    populateToolSelect();
}

function renderTeacherList() {
    const teacherList = document.getElementById('teacher-list');
    teacherList.innerHTML = '';

    const allTeachers = teachers;
    allTeachers.forEach(teacher => {
        const teacherCard = document.createElement('div');
        teacherCard.className = 'teacher-card';
        teacherCard.innerHTML = `
            <h3>${teacher.name}</h3>
            <p class="card-count">${teacher.ownedCards.length} cards</p>
            <p style="font-size: 0.9em; color: #555;">
                W: ${teacher.wins} / L: ${teacher.losses}
            </p>
        `;
        teacherCard.addEventListener('click', () => {
            setCurrentTeacher(teacher);
            showDashboard();
        });
        teacherList.appendChild(teacherCard);
    });
}

function handleAddTeacher() {
    const name = prompt('Enter teacher name:');
    if (!name || !name.trim()) return;

    const gradeLevel = prompt('Enter grade level (e.g., "3rd Grade", "5th Grade", "8th Grade"):');
    if (!gradeLevel || !gradeLevel.trim()) return;

    const department = prompt('Enter department (e.g., "Elementary", "Middle School", "High School"):');
    if (!department || !department.trim()) return;

    const newTeacher = addTeacher(name.trim(), gradeLevel.trim(), department.trim());
    setCurrentTeacher(newTeacher);
    showDashboard();
}

function handleLogout() {
    logout();
    showLogin();
}

function switchView(viewName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        }
    });

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    const activeView = document.getElementById(`${viewName}-view`);
    if (activeView) {
        activeView.classList.add('active');
    }

    // Load view-specific content
    switch(viewName) {
        case 'collection':
            renderCollection();
            break;
        case 'battle':
            renderOpponentList();
            break;
        case 'earn-cards':
            // Already populated on dashboard load
            break;
        case 'leaderboard':
            renderLeaderboard();
            break;
    }
}

function renderOpponentList() {
    const opponentList = document.getElementById('opponent-list');
    opponentList.innerHTML = '';

    const currentUser = getCurrentTeacher();
    const opponents = teachers.filter(t => t.id !== currentUser.id);

    if (opponents.length === 0) {
        opponentList.innerHTML = '<p style="text-align: center; color: #555;">No other teachers available. Create a lesson challenge!</p>';
        return;
    }

    opponents.forEach(opponent => {
        const opponentCard = document.createElement('div');
        opponentCard.className = 'opponent-card';
        opponentCard.innerHTML = `
            <h3>${opponent.name}</h3>
            <p>${opponent.ownedCards.length} tools</p>
            <p style="font-size: 0.9em; margin-top: 10px;">
                Record: ${opponent.wins}W - ${opponent.losses}L
            </p>
            <button class="btn btn-primary" style="margin-top: 15px; padding: 8px 16px; font-size: 0.9em;">
                Create Challenge!
            </button>
        `;

        opponentCard.addEventListener('click', () => {
            initiateChallenge(opponent);
        });

        opponentList.appendChild(opponentCard);
    });
}

function renderLeaderboard(departmentFilter = 'all') {
    const { byCards, byWinRate } = getLeaderboardData(departmentFilter);
    const departmentStats = getDepartmentStats();

    // Render cards leaderboard
    const cardsLeaderboard = document.getElementById('cards-leaderboard');
    cardsLeaderboard.innerHTML = '';

    if (byCards.length === 0) {
        cardsLeaderboard.innerHTML = '<p style="color: #999;">No teachers in this department yet.</p>';
    } else {
        byCards.slice(0, 10).forEach((teacher, index) => {
            const isMentorStatus = isMentor(teacher);
            const mentorBadge = isMentorStatus ? ' <span style="background: var(--primary-color); color: var(--dark-bg); padding: 2px 8px; border-radius: 5px; font-size: 0.8em; font-weight: bold;">🌟 MENTOR</span>' : '';

            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; padding: 12px; margin-bottom: 8px; background: white; border-radius: 8px; border-left: 4px solid var(--secondary-color);';
            row.innerHTML = `
                <div>
                    <span style="font-weight: bold; margin-right: 10px; color: var(--accent-color);">#${index + 1}</span>
                    <span style="font-weight: bold;">${teacher.name}</span>
                    ${mentorBadge}
                    <span style="margin-left: 10px; color: #666; font-size: 0.9em;">${teacher.gradeLevel || ''}</span>
                </div>
                <div style="font-weight: bold; color: var(--secondary-color);">
                    ${teacher.ownedCards.length} / ${getAllCards().length} tools
                </div>
            `;
            cardsLeaderboard.appendChild(row);
        });
    }

    // Render wins leaderboard
    const winsLeaderboard = document.getElementById('wins-leaderboard');
    winsLeaderboard.innerHTML = '';

    if (byWinRate.length === 0) {
        winsLeaderboard.innerHTML = '<p style="color: #999;">No battle records yet.</p>';
    } else {
        byWinRate.slice(0, 10).forEach((teacher, index) => {
            const winRate = ((teacher.wins / (teacher.wins + teacher.losses)) * 100).toFixed(1);
            const isMentorStatus = isMentor(teacher);
            const mentorBadge = isMentorStatus ? ' <span style="background: var(--primary-color); color: var(--dark-bg); padding: 2px 8px; border-radius: 5px; font-size: 0.8em; font-weight: bold;">🌟 MENTOR</span>' : '';

            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; padding: 12px; margin-bottom: 8px; background: white; border-radius: 8px; border-left: 4px solid var(--success-color);';
            row.innerHTML = `
                <div>
                    <span style="font-weight: bold; margin-right: 10px; color: var(--accent-color);">#${index + 1}</span>
                    <span style="font-weight: bold;">${teacher.name}</span>
                    ${mentorBadge}
                    <span style="margin-left: 10px; color: #666; font-size: 0.9em;">${teacher.gradeLevel || ''}</span>
                </div>
                <div>
                    <span style="font-weight: bold; color: var(--success-color);">${winRate}%</span>
                    <span style="margin-left: 10px; color: #666; font-size: 0.9em;">(${teacher.wins}W-${teacher.losses}L)</span>
                </div>
            `;
            winsLeaderboard.appendChild(row);
        });
    }

    // Render department stats
    const departmentStatsDiv = document.getElementById('department-stats');
    departmentStatsDiv.innerHTML = '';

    Object.keys(departmentStats).forEach(dept => {
        const stats = departmentStats[dept];
        const row = document.createElement('div');
        row.style.cssText = 'padding: 15px; margin-bottom: 10px; background: white; border-radius: 8px;';
        row.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div>
                    <h4 style="color: var(--dark-bg); margin-bottom: 5px;">${dept}</h4>
                    <p style="color: #666; font-size: 0.9em;">${stats.teachers.length} teachers</p>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.3em; font-weight: bold; color: var(--secondary-color);">${stats.percentComplete}%</div>
                    <div style="font-size: 0.9em; color: #666;">Tools Collected</div>
                </div>
            </div>
            <div style="background: var(--light-bg); height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="background: var(--secondary-color); height: 100%; width: ${stats.percentComplete}%; transition: width 0.5s ease;"></div>
            </div>
            <div style="margin-top: 8px; font-size: 0.9em; color: #666;">
                Total Wins: ${stats.totalWins}
            </div>
        `;
        departmentStatsDiv.appendChild(row);
    });
}

function populateToolSelect() {
    const toolSelect = document.getElementById('tool-select');
    toolSelect.innerHTML = '<option value="">Select a tool you used</option>';

    getAllCards().forEach(card => {
        const option = document.createElement('option');
        option.value = card.id;
        option.textContent = `${card.icon} ${card.name}`;
        toolSelect.appendChild(option);
    });
}

function handleRedeemPDCode() {
    const codeInput = document.getElementById('pd-code');
    const code = codeInput.value.trim();

    if (!code) {
        alert('Please enter a PD code');
        return;
    }

    const success = redeemPDCode(code);
    if (success) {
        const card = getAllCards().find(c => c.pdCode === code.toUpperCase());
        alert(`🎉 Success! You earned the ${card.name} card!`);
        codeInput.value = '';
        renderCollection();
        // Update current teacher to reflect new card
        setCurrentTeacher(getTeacher(getCurrentTeacher().id));
    } else {
        alert('❌ Invalid code or card already owned');
    }
}

function handleSubmitUsage() {
    const toolSelect = document.getElementById('tool-select');
    const usageDate = document.getElementById('usage-date');
    const usageNotes = document.getElementById('usage-notes');

    const cardId = parseInt(toolSelect.value);
    const date = usageDate.value;
    const notes = usageNotes.value.trim();

    if (!cardId) {
        alert('Please select a tool');
        return;
    }

    if (!date) {
        alert('Please select a date');
        return;
    }

    if (!notes) {
        alert('Please describe how you used the tool');
        return;
    }

    const currentUser = getCurrentTeacher();
    const success = addCardToTeacher(currentUser.id, cardId);

    if (success) {
        const card = getCard(cardId);
        alert(`🎉 Great job! You earned the ${card.name} card for using it with your students!`);

        // Clear form
        toolSelect.value = '';
        usageDate.value = '';
        usageNotes.value = '';

        renderCollection();
        // Update current teacher to reflect new card
        setCurrentTeacher(getTeacher(getCurrentTeacher().id));
    } else {
        alert('You already have this card!');
    }
}

function handleSubmitScenario() {
    const titleInput = document.getElementById('scenario-title');
    const descriptionInput = document.getElementById('scenario-description');

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title) {
        alert('Please enter a scenario title');
        return;
    }

    if (!description) {
        alert('Please describe the scenario');
        return;
    }

    const currentUser = getCurrentTeacher();

    // In a real implementation, this would save to Google Sheets or a database
    // For now, just show a success message
    alert(`🎉 Thank you for submitting your scenario!\n\n"${title}"\n\nYour scenario has been submitted for review. Once approved by the instructional coach, it will be added to the Lesson Challenge rotation and you'll be credited as the author!`);

    // Clear form
    titleInput.value = '';
    descriptionInput.value = '';

    // Log to console for demo purposes
    console.log('Scenario Submission:', {
        teacher: currentUser.name,
        title,
        description,
        timestamp: new Date().toISOString()
    });
}

// Add refresh button to sync with Google Sheets
function addRefreshButton() {
    const header = document.querySelector('.main-header .user-info');

    const refreshBtn = document.createElement('button');
    refreshBtn.id = 'refresh-sheets-btn';
    refreshBtn.className = 'btn btn-secondary';
    refreshBtn.innerHTML = '🔄 Sync';
    refreshBtn.title = 'Refresh data from Google Sheets';
    refreshBtn.style.cssText = 'padding: 8px 16px; font-size: 0.9em;';

    refreshBtn.addEventListener('click', async () => {
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '⏳ Syncing...';

        const success = await refreshFromSheets();

        if (success) {
            alert('✅ Data synced from Google Sheets!');
            // Refresh current view
            const currentUser = getCurrentTeacher();
            if (currentUser) {
                // Update current teacher reference
                setCurrentTeacher(getTeacher(currentUser.id));
                showDashboard();
            } else {
                showLogin();
            }
        } else {
            alert('❌ Failed to sync. Using cached data.');
        }

        refreshBtn.disabled = false;
        refreshBtn.innerHTML = '🔄 Sync';
    });

    // Insert before logout button
    const logoutBtn = document.getElementById('logout-btn');
    header.insertBefore(refreshBtn, logoutBtn);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeCardModal();
    }
});
