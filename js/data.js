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
        pdCode: "KAHOOT2026"
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
        pdCode: "GCLASS2026"
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
        pdCode: "NEARPOD2026"
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
        pdCode: "FLIPGRID2026"
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
        pdCode: "PADLET2026"
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
        pdCode: "QUIZLET2026"
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
        pdCode: "SEESAW2026"
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
        pdCode: "EDPUZZLE2026"
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
        pdCode: "CANVA2026"
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
        pdCode: "GIMKIT2026"
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
        pdCode: "BOOKCREATOR2026"
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
        pdCode: "CLASSCRAFT2026"
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
        pdCode: "SCREENCAST2026"
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
        pdCode: "WAKELET2026"
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
        pdCode: "MENTIMETER2026"
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
        pdCode: "SCRATCH2026"
    }
];

// Sample teacher data
let teachers = [
    {
        id: 1,
        name: "Ms. Johnson",
        ownedCards: [1, 2, 5, 10],
        wins: 5,
        losses: 2
    },
    {
        id: 2,
        name: "Mr. Smith",
        ownedCards: [2, 3, 6, 8, 12],
        wins: 3,
        losses: 4
    },
    {
        id: 3,
        name: "Mrs. Garcia",
        ownedCards: [1, 4, 7, 9, 11, 15],
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
function addTeacher(name) {
    const newTeacher = {
        id: teachers.length + 1,
        name: name,
        ownedCards: [1, 2], // Start with 2 basic cards
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
        saveData();
        return true;
    }
    return false;
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

// Initialize data on load
loadData();
