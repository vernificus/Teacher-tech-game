// Data management for the Teacher Tech Card Battle Game

// Sample card data - replace with your 16 cards
const ALL_CARDS = [
    {
        id: 1,
        name: "Kahoot!",
        type: "Assessment",
        icon: "🎯",
        power: 85,
        defense: 70,
        speed: 90,
        description: "Create interactive quizzes and engage students with game-based learning. Great for formative assessment and review.",
        pdCode: "KAHOOT2026",
        resourceLink: "https://kahoot.com/schools/how-it-works/",
        offline: false
    },
    {
        id: 2,
        name: "Google Classroom",
        type: "LMS",
        icon: "📚",
        power: 90,
        defense: 95,
        speed: 75,
        description: "Organize assignments, boost collaboration, and streamline classroom management.",
        pdCode: "GCLASS2026",
        resourceLink: "https://edu.google.com/intl/ALL_us/workspace-for-education/classroom/",
        offline: true
    },
    {
        id: 3,
        name: "Nearpod",
        type: "Interactive",
        icon: "📱",
        power: 80,
        defense: 75,
        speed: 85,
        description: "Create interactive lessons with virtual reality and gamification to engage students.",
        pdCode: "NEARPOD2026",
        resourceLink: "https://nearpod.com/educators",
        offline: false
    },
    {
        id: 4,
        name: "Flipgrid",
        type: "Video",
        icon: "🎥",
        power: 75,
        defense: 70,
        speed: 80,
        description: "Empower student voice through video discussions and social learning.",
        pdCode: "FLIPGRID2026",
        resourceLink: "https://info.flip.com/en-us.html",
        offline: false
    },
    {
        id: 5,
        name: "Padlet",
        type: "Collaboration",
        icon: "📝",
        power: 70,
        defense: 80,
        speed: 85,
        description: "Digital bulletin board for collaborative brainstorming and sharing ideas.",
        pdCode: "PADLET2026",
        resourceLink: "https://padlet.com/about",
        offline: false
    },
    {
        id: 6,
        name: "Quizlet",
        type: "Study",
        icon: "🎴",
        power: 75,
        defense: 75,
        speed: 80,
        description: "Create digital flashcards and study sets to help students master content.",
        pdCode: "QUIZLET2026",
        resourceLink: "https://quizlet.com/features",
        offline: true
    },
    {
        id: 7,
        name: "Seesaw",
        type: "Portfolio",
        icon: "🎨",
        power: 85,
        defense: 80,
        speed: 70,
        description: "Student-driven digital portfolios that empower students to showcase learning.",
        pdCode: "SEESAW2026",
        resourceLink: "https://web.seesaw.me/",
        offline: false
    },
    {
        id: 8,
        name: "Edpuzzle",
        type: "Video",
        icon: "▶️",
        power: 80,
        defense: 75,
        speed: 75,
        description: "Make any video your lesson with interactive questions and analytics.",
        pdCode: "EDPUZZLE2026",
        resourceLink: "https://edpuzzle.com/",
        offline: false
    },
    {
        id: 9,
        name: "Canva",
        type: "Design",
        icon: "🎨",
        power: 85,
        defense: 70,
        speed: 80,
        description: "Create stunning visual content and presentations with easy-to-use design tools.",
        pdCode: "CANVA2026",
        resourceLink: "https://www.canva.com/education/",
        offline: true
    },
    {
        id: 10,
        name: "Gimkit",
        type: "Game",
        icon: "🎮",
        power: 90,
        defense: 65,
        speed: 95,
        description: "Live learning game where students earn virtual currency by answering questions.",
        pdCode: "GIMKIT2026",
        resourceLink: "https://www.gimkit.com/",
        offline: false
    },
    {
        id: 11,
        name: "BookCreator",
        type: "Creativity",
        icon: "📖",
        power: 75,
        defense: 80,
        speed: 70,
        description: "Create and publish digital books with text, images, audio and video.",
        pdCode: "BOOKCREATOR2026",
        resourceLink: "https://bookcreator.com/",
        offline: true
    },
    {
        id: 12,
        name: "Classcraft",
        type: "Gamification",
        icon: "⚔️",
        power: 80,
        defense: 85,
        speed: 75,
        description: "Transform classroom management with role-playing game mechanics.",
        pdCode: "CLASSCRAFT2026",
        resourceLink: "https://www.classcraft.com/",
        offline: false
    },
    {
        id: 13,
        name: "Screencastify",
        type: "Recording",
        icon: "🎬",
        power: 70,
        defense: 75,
        speed: 85,
        description: "Create video tutorials and screencasts directly from your browser.",
        pdCode: "SCREENCAST2026",
        resourceLink: "https://www.screencastify.com/",
        offline: true
    },
    {
        id: 14,
        name: "Wakelet",
        type: "Curation",
        icon: "🗂️",
        power: 75,
        defense: 80,
        speed: 80,
        description: "Curate and organize digital content into beautiful collections.",
        pdCode: "WAKELET2026",
        resourceLink: "https://wakelet.com/",
        offline: false
    },
    {
        id: 15,
        name: "Mentimeter",
        type: "Polling",
        icon: "📊",
        power: 80,
        defense: 70,
        speed: 90,
        description: "Create interactive presentations with live polls and quizzes.",
        pdCode: "MENTIMETER2026",
        resourceLink: "https://www.mentimeter.com/",
        offline: false
    },
    {
        id: 16,
        name: "Scratch",
        type: "Coding",
        icon: "💻",
        power: 85,
        defense: 80,
        speed: 70,
        description: "Teach coding and computational thinking with block-based programming.",
        pdCode: "SCRATCH2026",
        resourceLink: "https://scratch.mit.edu/educators",
        offline: true
    }
];

// Sample teacher data
let teachers = [
    {
        id: 1,
        name: "Ms. Johnson",
        gradeLevel: "3rd Grade",
        department: "Elementary",
        ownedCards: [1, 2, 5, 10],
        cardMastery: { 1: 2, 2: 1, 5: 1, 10: 2 }, // cardId: masteryLevel (1=Basic, 2=Certified, 3=Master)
        wins: 5,
        losses: 2
    },
    {
        id: 2,
        name: "Mr. Smith",
        gradeLevel: "5th Grade",
        department: "Elementary",
        ownedCards: [2, 3, 6, 8, 12],
        cardMastery: { 2: 1, 3: 2, 6: 1, 8: 1, 12: 1 },
        wins: 3,
        losses: 4
    },
    {
        id: 3,
        name: "Mrs. Garcia",
        gradeLevel: "8th Grade",
        department: "Middle School",
        ownedCards: [1, 4, 7, 9, 11, 15],
        cardMastery: { 1: 2, 4: 2, 7: 3, 9: 2, 11: 1, 15: 1 },
        wins: 7,
        losses: 1
    }
];

// Current user
let currentTeacher = null;

// Local storage functions
function saveData() {
    localStorage.setItem('teachers', JSON.stringify(teachers));
    if (currentTeacher) {
        localStorage.setItem('currentTeacher', JSON.stringify(currentTeacher));
    }
}

function loadData() {
    const savedTeachers = localStorage.getItem('teachers');
    if (savedTeachers) {
        teachers = JSON.parse(savedTeachers);
    }

    const savedCurrentTeacher = localStorage.getItem('currentTeacher');
    if (savedCurrentTeacher) {
        currentTeacher = JSON.parse(savedCurrentTeacher);
    }
}

// Teacher management
function addTeacher(name, gradeLevel = 'N/A', department = 'Other') {
    const newTeacher = {
        id: teachers.length + 1,
        name: name,
        gradeLevel: gradeLevel,
        department: department,
        ownedCards: [1, 2], // Start with 2 basic cards
        cardMastery: { 1: 1, 2: 1 }, // Start at Basic level
        wins: 0,
        losses: 0
    };
    teachers.push(newTeacher);
    saveData();
    return newTeacher;
}

function getTeacher(id) {
    return teachers.find(t => t.id === id);
}

function getCurrentTeacher() {
    return currentTeacher;
}

function setCurrentTeacher(teacher) {
    currentTeacher = teacher;
    saveData();
}

function logout() {
    currentTeacher = null;
    localStorage.removeItem('currentTeacher');
}

// Card management
function getCard(id) {
    return ALL_CARDS.find(c => c.id === id);
}

function getAllCards() {
    return ALL_CARDS;
}

function getTeacherCards(teacher) {
    return teacher.ownedCards.map(id => getCard(id));
}

function addCardToTeacher(teacherId, cardId) {
    const teacher = getTeacher(teacherId);
    if (teacher && !teacher.ownedCards.includes(cardId)) {
        teacher.ownedCards.push(cardId);
        // Initialize card mastery if not exists
        if (!teacher.cardMastery) {
            teacher.cardMastery = {};
        }
        teacher.cardMastery[cardId] = 1; // Start at Basic level
        saveData();
        return true;
    }
    return false;
}

// Card mastery management
function getCardMastery(teacher, cardId) {
    if (!teacher.cardMastery) return 1; // Default to Basic
    return teacher.cardMastery[cardId] || 1;
}

function evolveCard(teacherId, cardId) {
    const teacher = getTeacher(teacherId);
    if (teacher && hasCard(teacher, cardId)) {
        if (!teacher.cardMastery) {
            teacher.cardMastery = {};
        }
        const currentLevel = teacher.cardMastery[cardId] || 1;
        if (currentLevel < 3) {
            teacher.cardMastery[cardId] = currentLevel + 1;
            saveData();
            return true;
        }
    }
    return false;
}

function getMasteryLabel(level) {
    const labels = {
        1: '⭐ Basic',
        2: '⭐⭐ Certified',
        3: '⭐⭐⭐ Master'
    };
    return labels[level] || labels[1];
}

function hasCard(teacher, cardId) {
    return teacher.ownedCards.includes(cardId);
}

function redeemPDCode(code) {
    const card = ALL_CARDS.find(c => c.pdCode === code.toUpperCase());
    if (card && currentTeacher) {
        return addCardToTeacher(currentTeacher.id, card.id);
    }
    return false;
}

// Battle management
function recordBattleResult(winnerId, loserId) {
    const winner = getTeacher(winnerId);
    const loser = getTeacher(loserId);

    if (winner && loser) {
        winner.wins++;
        loser.losses++;
        saveData();
    }
}

// Leaderboard functions
function getLeaderboardData(departmentFilter = 'all') {
    let filteredTeachers = teachers;

    if (departmentFilter !== 'all') {
        filteredTeachers = teachers.filter(t => t.department === departmentFilter);
    }

    // Sort by cards collected
    const byCards = [...filteredTeachers].sort((a, b) => b.ownedCards.length - a.ownedCards.length);

    // Sort by win rate
    const byWinRate = [...filteredTeachers]
        .filter(t => (t.wins + t.losses) > 0)
        .sort((a, b) => {
            const winRateA = a.wins / (a.wins + a.losses);
            const winRateB = b.wins / (b.wins + b.losses);
            return winRateB - winRateA;
        });

    return {
        byCards,
        byWinRate
    };
}

function getDepartmentStats() {
    const departments = {};
    const totalCards = ALL_CARDS.length;

    teachers.forEach(teacher => {
        const dept = teacher.department || 'Other';
        if (!departments[dept]) {
            departments[dept] = {
                teachers: [],
                totalCards: 0,
                avgCards: 0,
                totalWins: 0
            };
        }
        departments[dept].teachers.push(teacher);
        departments[dept].totalCards += teacher.ownedCards.length;
        departments[dept].totalWins += teacher.wins;
    });

    // Calculate averages
    Object.keys(departments).forEach(dept => {
        const stats = departments[dept];
        stats.avgCards = Math.round(stats.totalCards / stats.teachers.length);
        stats.percentComplete = Math.round((stats.avgCards / totalCards) * 100);
    });

    return departments;
}

function isMentor(teacher) {
    // A teacher is a mentor if they have:
    // - At least 5 wins
    // - At least 60% win rate (if they have played battles)
    // - At least 10 cards collected
    const totalGames = teacher.wins + teacher.losses;
    const winRate = totalGames > 0 ? teacher.wins / totalGames : 0;

    return teacher.wins >= 5 &&
           winRate >= 0.6 &&
           teacher.ownedCards.length >= 10;
}

// Initialize data on load
loadData();
