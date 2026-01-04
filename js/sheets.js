// Google Sheets Integration Module
// Automatically syncs card and teacher data from Google Sheets

const SHEET_CONFIG = {
    spreadsheetId: '1KjM4zML5RhyDEsCPNyLFiBhLZa9p8iV7Jv6UYc6fLMY',
    // CSV export URL for public sheets (no API key needed!)
    csvUrl: 'https://docs.google.com/spreadsheets/d/1KjM4zML5RhyDEsCPNyLFiBhLZa9p8iV7Jv6UYc6fLMY/export?format=csv',
    cacheTimeout: 5 * 60 * 1000 // 5 minutes
};

// Card stats assignments for each tool
const TOOL_STATS = {
    'Schoology': { type: 'LMS', icon: '📚', power: 85, defense: 90, speed: 70, description: 'Learning management system for assignments and communication' },
    'Magma Math': { type: 'Math', icon: '🔢', power: 80, defense: 75, speed: 85, description: 'Adaptive math practice and assessment platform' },
    'Kiddom Math': { type: 'Math', icon: '➕', power: 75, defense: 80, speed: 80, description: 'Standards-aligned math curriculum and assessments' },
    'DiscoveryED': { type: 'Content', icon: '🔬', power: 85, defense: 80, speed: 75, description: 'Digital curriculum resources and educational videos' },
    'Lexia': { type: 'Literacy', icon: '📖', power: 90, defense: 85, speed: 70, description: 'Adaptive literacy instruction and assessment' },
    'Adobe Express': { type: 'Design', icon: '🎨', power: 85, defense: 70, speed: 90, description: 'Creative design tool for graphics and videos' },
    'Canva': { type: 'Design', icon: '🖼️', power: 85, defense: 70, speed: 85, description: 'Easy-to-use design platform for visual content' },
    'Performance Matters': { type: 'Assessment', icon: '📊', power: 90, defense: 85, speed: 75, description: 'Assessment and data analysis platform' },
    'Phoenix Gradebook': { type: 'Grading', icon: '📝', power: 80, defense: 90, speed: 70, description: 'Student information and gradebook system' },
    'Nearpod': { type: 'Interactive', icon: '📱', power: 85, defense: 75, speed: 90, description: 'Interactive lessons with real-time engagement' },
    'Brainpop': { type: 'Content', icon: '🧠', power: 80, defense: 80, speed: 85, description: 'Animated educational videos and quizzes' },
    'Wixie': { type: 'Creativity', icon: '✨', power: 75, defense: 75, speed: 85, description: 'Creative platform for digital storytelling' },
    'Blooket': { type: 'Game', icon: '🎮', power: 90, defense: 65, speed: 95, description: 'Game-based learning and review platform' },
    'Newsela': { type: 'Literacy', icon: '📰', power: 85, defense: 80, speed: 80, description: 'Leveled reading content across subjects' },
    'WeVideo': { type: 'Video', icon: '🎬', power: 75, defense: 70, speed: 85, description: 'Cloud-based video creation and editing' },
    'Ozobot': { type: 'Coding', icon: '🤖', power: 80, defense: 75, speed: 90, description: 'Programmable robot for coding education' },
    'Gemini': { type: 'AI', icon: '💎', power: 95, defense: 70, speed: 95, description: 'AI assistant for research and content creation' },
    'Copilot': { type: 'AI', icon: '🚀', power: 95, defense: 70, speed: 95, description: 'AI-powered coding and writing assistant' },
    'Student Choice': { type: 'Flexible', icon: '⭐', power: 70, defense: 70, speed: 90, description: 'Student-selected technology tools and platforms' }
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

        // Extract tool names (skip first 2 columns: Last Name, First Name)
        const toolHeaders = headers.slice(2);

        // Create cards from tools
        const cards = [];
        toolHeaders.forEach((toolName, index) => {
            const stats = TOOL_STATS[toolName] || {
                type: 'Technology',
                icon: '💻',
                power: 75,
                defense: 75,
                speed: 75,
                description: `Educational technology tool: ${toolName}`
            };

            cards.push({
                id: index + 1,
                name: toolName,
                type: stats.type,
                icon: stats.icon,
                power: stats.power,
                defense: stats.defense,
                speed: stats.speed,
                description: stats.description,
                pdCode: toolName.toUpperCase().replace(/\s+/g, '') + '2026'
            });
        });

        // Create teachers from staff data
        const teachers = [];
        data.forEach((row, index) => {
            const lastName = row[headers[0]] || '';
            const firstName = row[headers[1]] || '';

            // Skip empty rows
            if (!lastName && !firstName) return;

            const fullName = `${firstName} ${lastName}`.trim();

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
