// Card rendering and display functions

function createCardElement(card, isOwned = true, size = 'normal', masteryLevel = 1) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `tech-card ${!isOwned ? 'locked' : ''} ${size === 'mini' ? 'mini-card' : ''} ${isOwned && masteryLevel > 1 ? `mastery-${masteryLevel}` : ''}`;
    cardDiv.dataset.cardId = card.id;

    // Add rarity attribute for visual effects
    if (card.rarity) {
        cardDiv.dataset.rarity = card.rarity;
    }

    if (size === 'mini') {
        // Mini card - use image if available, fallback to icon
        const imageDisplay = card.image ?
            `<img src="${card.image}" alt="${card.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
             <div style="display: none; font-size: 2em;">${card.icon}</div>` :
            `<div style="font-size: 2em;">${card.icon}</div>`;

        cardDiv.innerHTML = `
            ${imageDisplay}
            <div style="font-size: 0.7em; margin-top: 5px;">${card.name}</div>
        `;
    } else {
        // Full card - use image if available, fallback to icon
        const imageDisplay = card.image ?
            `<img src="${card.image}" alt="${card.name}" class="card-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div class="card-icon-fallback" style="display: none;">${card.icon}</div>` :
            `<div class="card-icon-fallback">${card.icon}</div>`;

        const masteryBadge = isOwned ? `<div class="card-mastery-badge">${getMasteryLabel(masteryLevel)}</div>` : '';

        cardDiv.innerHTML = `
            ${masteryBadge}
            <div class="card-header">
                <span class="card-name">${card.name}</span>
                <span class="card-type">${card.type}</span>
            </div>
            <div class="card-image">
                ${imageDisplay}
            </div>
            <div class="card-stats">
                <div class="stat-row">
                    <span class="stat-label">👥 Student Centered:</span>
                    <span class="stat-value">${card.studentCentered}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">📐 Design:</span>
                    <span class="stat-value">${card.design}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">🎯 Engage:</span>
                    <span class="stat-value">${card.engage}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">📊 Assess:</span>
                    <span class="stat-value">${card.assess}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">🔄 Reflect & Respond:</span>
                    <span class="stat-value">${card.reflectRespond}</span>
                </div>
            </div>
            <div class="card-description">
                ${isOwned ? card.description : '🔒 Locked - Earn this card to unlock!'}
            </div>
        `;
    }

    if (isOwned && size === 'normal') {
        cardDiv.addEventListener('click', () => showCardModal(card));
    }

    return cardDiv;
}

function showCardModal(card) {
    const modal = document.getElementById('card-modal');
    const modalContent = document.getElementById('modal-card-detail');

    // Use image if available, fallback to icon
    const cardImage = card.image ?
        `<img src="${card.image}" alt="${card.name}" style="max-width: 250px; max-height: 350px; border-radius: 10px; margin-bottom: 20px;" onerror="this.style.display='none';">` :
        `<div style="font-size: 5em; margin-bottom: 20px;">${card.icon}</div>`;

    // Physical card metadata section (only if available)
    const physicalCardInfo = card.cardNumber ? `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px; border-radius: 8px; margin-bottom: 20px; color: white;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                <div>
                    <strong>Card #:</strong> ${card.cardNumber}
                </div>
                <div>
                    <strong>Rarity:</strong> ${card.rarity}
                </div>
                <div>
                    <strong>Ease of Use:</strong> ${card.easeOfUse}
                </div>
                <div>
                    <strong>Grade Level:</strong> ${card.gradeLevel}
                </div>
                <div>
                    <strong>Setup Time:</strong> ${card.setupTime}
                </div>
            </div>
        </div>
    ` : '';

    // Teacher tip section (only if available)
    const teacherTipSection = card.teacherTip ? `
        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <div style="display: flex; align-items: start; gap: 10px;">
                <div style="font-size: 1.5em;">💡</div>
                <div>
                    <strong style="color: #856404;">Teacher Tip:</strong>
                    <p style="margin-top: 5px; color: #856404;">${card.teacherTip}</p>
                </div>
            </div>
        </div>
    ` : '';

    // QR Code section (only if available)
    const qrCodeSection = card.qrCodeSVG ? `
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid var(--primary-color); text-align: center;">
            <h3 style="margin-bottom: 15px; color: var(--dark-bg);">📱 Scan to Learn More</h3>
            <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
                ${card.qrCodeSVG}
            </div>
            <p style="font-size: 0.9em; color: #666;">Scan with your phone to access resources</p>
        </div>
    ` : '';

    modalContent.innerHTML = `
        <div style="text-align: center;">
            ${cardImage}
        </div>
        <h2 style="color: var(--dark-bg); margin-bottom: 20px;">${card.icon} ${card.name}</h2>

        ${physicalCardInfo}
        ${teacherTipSection}

        <div class="card-stats" style="margin-bottom: 20px;">
            <div class="stat-row">
                <span class="stat-label">Type:</span>
                <span class="stat-value">${card.type}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">👥 Student Centered:</span>
                <span class="stat-value">${card.studentCentered}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">📐 Design:</span>
                <span class="stat-value">${card.design}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">🎯 Engage:</span>
                <span class="stat-value">${card.engage}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">📊 Assess:</span>
                <span class="stat-value">${card.assess}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">🔄 Reflect & Respond:</span>
                <span class="stat-value">${card.reflectRespond}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">📊 Framework Total:</span>
                <span class="stat-value">${card.studentCentered + card.design + card.engage + card.assess + card.reflectRespond}</span>
            </div>
        </div>

        <div style="margin-bottom: 15px;">
            <strong>Description:</strong>
            <p style="margin-top: 10px; color: #555;">${card.description}</p>
        </div>

        ${qrCodeSection}

        <div style="background: var(--light-bg); padding: 10px; border-radius: 8px; margin-bottom: 15px;">
            <strong>PD Code:</strong> <code style="background: white; padding: 5px 10px; border-radius: 5px;">${card.pdCode}</code>
        </div>
        ${card.resourceLink ? `
            <div style="margin-top: 15px;">
                <a href="${card.resourceLink}" target="_blank" rel="noopener noreferrer"
                   style="display: inline-block; background: var(--accent-color); color: white;
                          padding: 12px 24px; border-radius: 8px; text-decoration: none;
                          font-weight: bold; transition: all 0.3s ease;"
                   onmouseover="this.style.background='#cc0000'"
                   onmouseout="this.style.background='var(--accent-color)'">
                    📚 Learn How to Use This Tool
                </a>
                ${card.offline ? '<span style="margin-left: 10px; color: var(--success-color); font-weight: bold;">✅ Works Offline</span>' : ''}
            </div>
        ` : ''}
    `;

    modal.classList.add('active');
}

function closeCardModal() {
    const modal = document.getElementById('card-modal');
    modal.classList.remove('active');
}

function renderCollection() {
    const cardGrid = document.getElementById('card-grid');
    const cardsOwned = document.getElementById('cards-owned');
    const totalCards = document.getElementById('total-cards');

    cardGrid.innerHTML = '';

    const teacher = getCurrentTeacher();
    if (!teacher) return;

    const allCards = getAllCards();
    cardsOwned.textContent = teacher.ownedCards.length;
    totalCards.textContent = allCards.length;

    allCards.forEach(card => {
        const isOwned = hasCard(teacher, card.id);
        const masteryLevel = isOwned ? getCardMastery(teacher, card.id) : 1;
        const cardElement = createCardElement(card, isOwned, 'normal', masteryLevel);
        cardGrid.appendChild(cardElement);
    });
}

function renderDeck(containerId, teacher, onCardSelect) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const cards = getTeacherCards(teacher);
    cards.forEach(card => {
        const miniCard = createCardElement(card, true, 'mini');
        if (onCardSelect) {
            miniCard.addEventListener('click', () => {
                // Remove selected class from all cards
                container.querySelectorAll('.mini-card').forEach(c => {
                    c.classList.remove('selected');
                });
                // Add selected class to clicked card
                miniCard.classList.add('selected');
                onCardSelect(card);
            });
        }
        container.appendChild(miniCard);
    });
}

function createBattleCardDisplay(card) {
    return `
        <div class="tech-card" style="width: 100%; max-width: 250px; margin: 0 auto;">
            <div class="card-header">
                <span class="card-name">${card.name}</span>
                <span class="card-type">${card.type}</span>
            </div>
            <div class="card-image">
                ${card.icon}
            </div>
            <div class="card-stats">
                <div class="stat-row">
                    <span class="stat-label">👥 Student Centered:</span>
                    <span class="stat-value">${card.studentCentered}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">📐 Design:</span>
                    <span class="stat-value">${card.design}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">🎯 Engage:</span>
                    <span class="stat-value">${card.engage}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">📊 Assess:</span>
                    <span class="stat-value">${card.assess}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">🔄 Reflect & Respond:</span>
                    <span class="stat-value">${card.reflectRespond}</span>
                </div>
            </div>
        </div>
    `;
}

// Initialize modal close button
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('card-modal');
    const closeBtn = modal.querySelector('.close');

    closeBtn.addEventListener('click', closeCardModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCardModal();
        }
    });
});
