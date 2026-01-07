// Google Sheets Integration Module
// Automatically syncs card and teacher data from Google Sheets

const SHEET_CONFIG = {
    spreadsheetId: '1KjM4zML5RhyDEsCPNyLFiBhLZa9p8iV7Jv6UYc6fLMY',
    // CSV export URL for public sheets (no API key needed!)
    csvUrl: 'https://docs.google.com/spreadsheets/d/1KjM4zML5RhyDEsCPNyLFiBhLZa9p8iV7Jv6UYc6fLMY/export?format=csv',
    cacheTimeout: 5 * 60 * 1000 // 5 minutes
};

// Card stats assignments based on LCPS Instructional Framework
// Framework components: Student Centered, Design, Engage, Assess, Reflect & Respond
const TOOL_STATS = {
    'Schoology': {
        type: 'LMS', icon: '📚', image: 'images/cards/schoology.png',
        studentCentered: 75, design: 80, engage: 70, assess: 90, reflectRespond: 85,
        description: 'Learning management system for organizing assignments, communication, and tracking student progress'
    },
    'Magma Math': {
        type: 'Math', icon: '🔢', image: 'images/cards/magma-math.png',
        studentCentered: 90, design: 75, engage: 85, assess: 95, reflectRespond: 90,
        description: 'Adaptive math practice that personalizes to each student with real-time formative assessment'
    },
    'Kiddom Math': {
        type: 'Math', icon: '➕', image: 'images/cards/kiddom-math.png',
        studentCentered: 80, design: 85, engage: 75, assess: 90, reflectRespond: 80,
        description: 'Standards-aligned math curriculum with customizable assessments and data tracking'
    },
    'DiscoveryED': {
        type: 'Content', icon: '🔬', image: 'images/cards/discoveryed.png',
        studentCentered: 70, design: 85, engage: 80, assess: 70, reflectRespond: 65,
        description: 'High-quality digital curriculum resources and educational videos across content areas'
    },
    'Lexia': {
        type: 'Literacy', icon: '📖', image: 'images/cards/lexia.png',
        studentCentered: 95, design: 80, engage: 85, assess: 95, reflectRespond: 90,
        description: 'Adaptive literacy instruction that personalizes pathways and provides detailed progress monitoring'
    },
    'Adobe Express': {
        type: 'Design', icon: '🎨', image: 'images/cards/adobe-express.png',
        studentCentered: 80, design: 90, engage: 85, assess: 60, reflectRespond: 70,
        description: 'Creative design tool enabling students to express learning through graphics, videos, and multimedia'
    },
    'Canva': {
        type: 'Design', icon: '🖼️', image: 'images/cards/canva.png',
        studentCentered: 85, design: 90, engage: 90, assess: 65, reflectRespond: 70,
        description: 'Intuitive design platform for creating visual content and demonstrating understanding creatively'
    },
    'Performance Matters': {
        type: 'Assessment', icon: '📊', image: 'images/cards/performance-matters.png',
        studentCentered: 75, design: 85, engage: 60, assess: 95, reflectRespond: 95,
        description: 'Comprehensive assessment and data analysis platform for tracking student growth and informing instruction'
    },
    'Phoenix Gradebook': {
        type: 'Grading', icon: '📝', image: 'images/cards/phoenix-gradebook.png',
        studentCentered: 70, design: 75, engage: 60, assess: 85, reflectRespond: 90,
        description: 'Student information and gradebook system for tracking progress and communicating with families'
    },
    'Nearpod': {
        type: 'Interactive', icon: '📱', image: 'images/cards/nearpod.png',
        studentCentered: 85, design: 85, engage: 95, assess: 90, reflectRespond: 85,
        description: 'Interactive lesson platform with real-time engagement, formative assessment, and virtual experiences'
    },
    'Brainpop': {
        type: 'Content', icon: '🧠', image: 'images/cards/brainpop.png',
        studentCentered: 75, design: 80, engage: 85, assess: 80, reflectRespond: 70,
        description: 'Animated educational videos with quizzes and activities that make complex concepts accessible'
    },
    'Wixie': {
        type: 'Creativity', icon: '✨', image: 'images/cards/wixie.png',
        studentCentered: 85, design: 90, engage: 90, assess: 70, reflectRespond: 75,
        description: 'Creative platform for digital storytelling, student voice, and demonstrating learning through creation'
    },
    'Blooket': {
        type: 'Game', icon: '🎮', image: 'images/cards/blooket.png',
        studentCentered: 80, design: 75, engage: 95, assess: 85, reflectRespond: 80,
        description: 'Game-based learning platform that motivates students through competition and immediate feedback'
    },
    'Newsela': {
        type: 'Literacy', icon: '📰', image: 'images/cards/newsela.png',
        studentCentered: 90, design: 85, engage: 80, assess: 85, reflectRespond: 80,
        description: 'Leveled reading content across subjects, providing differentiated texts and comprehension tracking'
    },
    'WeVideo': {
        type: 'Video', icon: '🎬', image: 'images/cards/wevideo.png',
        studentCentered: 85, design: 85, engage: 90, assess: 70, reflectRespond: 75,
        description: 'Cloud-based video creation enabling students to demonstrate learning through multimedia storytelling'
    },
    'Ozobot': {
        type: 'Coding', icon: '🤖', image: 'images/cards/ozobot.png',
        studentCentered: 85, design: 80, engage: 95, assess: 75, reflectRespond: 80,
        description: 'Hands-on programmable robot for teaching coding and computational thinking through play'
    },
    'Gemini': {
        type: 'AI', icon: '💎', image: 'images/cards/gemini.png',
        studentCentered: 85, design: 90, engage: 85, assess: 75, reflectRespond: 85,
        description: 'AI assistant for research, brainstorming, and content creation to support personalized learning'
    },
    'Copilot': {
        type: 'AI', icon: '🚀', image: 'images/cards/copilot.png',
        studentCentered: 85, design: 90, engage: 85, assess: 75, reflectRespond: 85,
        description: 'AI-powered assistant for writing, coding, and problem-solving to scaffold student learning'
    },
    'Student Choice': {
        type: 'Flexible', icon: '⭐', image: 'images/cards/student-choice.png',
        studentCentered: 95, design: 85, engage: 90, assess: 70, reflectRespond: 80,
        description: 'Empowers students to select tools that best match their learning preferences and needs'
    }
};

let sheetsDataCache = null;
let lastFetchTime = 0;

// Parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length > 0) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            data.push(row);
        }
    }

    return { headers, data };
}

// Properly parse CSV line handling quoted values
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

// Fetch data from Google Sheets
async function fetchSheetData() {
    try {
        // Check cache
        const now = Date.now();
        if (sheetsDataCache && (now - lastFetchTime) < SHEET_CONFIG.cacheTimeout) {
            console.log('Using cached sheet data');
            return sheetsDataCache;
        }

        console.log('Fetching fresh data from Google Sheets...');
        const response = await fetch(SHEET_CONFIG.csvUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.status}`);
        }

        const csvText = await response.text();
        const parsed = parseCSV(csvText);

        // Cache the result
        sheetsDataCache = parsed;
        lastFetchTime = now;

        console.log('Sheet data loaded successfully!');
        return parsed;

    } catch (error) {
        console.error('Error fetching sheet data:', error);
        // Return cached data if available, otherwise throw
        if (sheetsDataCache) {
            console.log('Using stale cached data due to fetch error');
            return sheetsDataCache;
        }
        throw error;
    }
}

// Convert sheet data to game format
async function loadDataFromSheets() {
    try {
        const sheetData = await fetchSheetData();
        const { headers, data } = sheetData;

        // Extract tool names (skip first 3 columns: Staff Name, Title, Grade Level/Specialty)
        const toolHeaders = headers.slice(3);

        // Create cards from tools
        const cards = [];
        toolHeaders.forEach((toolName, index) => {
            const stats = TOOL_STATS[toolName] || {
                type: 'Technology',
                icon: '💻',
                image: null,
                studentCentered: 75,
                design: 75,
                engage: 75,
                assess: 75,
                reflectRespond: 75,
                description: `Educational technology tool: ${toolName}`
            };

            cards.push({
                id: index + 1,
                name: toolName,
                type: stats.type,
                icon: stats.icon,
                image: stats.image,
                studentCentered: stats.studentCentered,
                design: stats.design,
                engage: stats.engage,
                assess: stats.assess,
                reflectRespond: stats.reflectRespond,
                description: stats.description,
                pdCode: toolName.toUpperCase().replace(/\s+/g, '') + '2026'
            });
        });

        // Create teachers from staff data
        const teachers = [];
        data.forEach((row, index) => {
            const staffName = row[headers[0]] || '';
            const title = row[headers[1]] || '';

            // Skip empty rows
            if (!staffName) return;

            const fullName = staffName.trim();

            // Find which cards (tools) this teacher has access to
            const ownedCards = [];
            toolHeaders.forEach((toolName, toolIndex) => {
                const value = row[toolName];
                // Check if value is TRUE or true
                if (value && (value.toUpperCase() === 'TRUE' || value === '1')) {
                    ownedCards.push(toolIndex + 1); // Card IDs start at 1
                }
            });

            // Only include teachers who have at least one card
            if (ownedCards.length > 0) {
                teachers.push({
                    id: index + 1,
                    name: fullName,
                    ownedCards: ownedCards,
                    wins: 0,
                    losses: 0
                });
            }
        });

        console.log(`Loaded ${cards.length} cards and ${teachers.length} teachers from Google Sheets`);

        return { cards, teachers };

    } catch (error) {
        console.error('Failed to load data from sheets:', error);
        // Return fallback data
        return null;
    }
}

// Initialize with Google Sheets data
async function initializeFromSheets() {
    const loadingIndicator = showLoadingIndicator();

    try {
        const sheetData = await loadDataFromSheets();

        if (sheetData) {
            // Update global data
            ALL_CARDS.length = 0;
            ALL_CARDS.push(...sheetData.cards);

            // Merge with existing localStorage teachers, but prioritize sheet data
            const localTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
            const mergedTeachers = mergeTeachers(sheetData.teachers, localTeachers);

            teachers.length = 0;
            teachers.push(...mergedTeachers);

            hideLoadingIndicator(loadingIndicator);
            return true;
        } else {
            hideLoadingIndicator(loadingIndicator);
            return false;
        }

    } catch (error) {
        console.error('Error initializing from sheets:', error);
        hideLoadingIndicator(loadingIndicator);
        return false;
    }
}

// Merge sheet teachers with local data (preserve wins/losses)
function mergeTeachers(sheetTeachers, localTeachers) {
    const merged = [];

    sheetTeachers.forEach(sheetTeacher => {
        // Find matching local teacher by name
        const localMatch = localTeachers.find(lt => lt.name === sheetTeacher.name);

        if (localMatch) {
            // Merge: use sheet cards, but keep local wins/losses
            merged.push({
                ...sheetTeacher,
                wins: localMatch.wins || 0,
                losses: localMatch.losses || 0
            });
        } else {
            // New teacher from sheet
            merged.push(sheetTeacher);
        }
    });

    return merged;
}

// Loading indicator functions
function showLoadingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'sheets-loading';
    indicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px 50px;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
    `;
    indicator.innerHTML = `
        <h3 style="color: var(--dark-bg); margin-bottom: 15px;">Loading from Google Sheets...</h3>
        <div style="color: var(--secondary-color);">⚡ Syncing your technology tools and teachers ⚡</div>
    `;
    document.body.appendChild(indicator);
    return indicator;
}

function hideLoadingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
    }
}

// Refresh data from sheets
async function refreshFromSheets() {
    // Force cache refresh
    sheetsDataCache = null;
    return await initializeFromSheets();
}
