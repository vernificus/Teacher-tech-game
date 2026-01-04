// Main application logic

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    const currentUser = getCurrentTeacher();

    if (currentUser) {
        showDashboard();
    } else {
        showLogin();
    }

    setupEventListeners();
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
    if (name && name.trim()) {
        const newTeacher = addTeacher(name.trim());
        setCurrentTeacher(newTeacher);
        showDashboard();
    }
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
    }
}

function renderOpponentList() {
    const opponentList = document.getElementById('opponent-list');
    opponentList.innerHTML = '';

    const currentUser = getCurrentTeacher();
    const opponents = teachers.filter(t => t.id !== currentUser.id);

    if (opponents.length === 0) {
        opponentList.innerHTML = '<p style="text-align: center; color: #555;">No other teachers available. Add more teachers to battle!</p>';
        return;
    }

    opponents.forEach(opponent => {
        const opponentCard = document.createElement('div');
        opponentCard.className = 'opponent-card';
        opponentCard.innerHTML = `
            <h3>${opponent.name}</h3>
            <p>${opponent.ownedCards.length} cards</p>
            <p style="font-size: 0.9em; margin-top: 10px;">
                Record: ${opponent.wins}W - ${opponent.losses}L
            </p>
            <button class="btn btn-primary" style="margin-top: 15px; padding: 8px 16px; font-size: 0.9em;">
                Challenge!
            </button>
        `;

        opponentCard.addEventListener('click', () => {
            initiateBattle(opponent);
        });

        opponentList.appendChild(opponentCard);
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

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeCardModal();
    }
});
