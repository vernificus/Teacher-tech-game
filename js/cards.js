// Card rendering and display functions

function createCardElement(card, isOwned = true, size = 'normal') {
    const cardDiv = document.createElement('div');
    cardDiv.className = `tech-card ${!isOwned ? 'locked' : ''} ${size === 'mini' ? 'mini-card' : ''}`;
    cardDiv.dataset.cardId = card.id;

    if (size === 'mini') {
        cardDiv.innerHTML = `
            <div>${card.icon}</div>
            <div style="font-size: 0.7em; margin-top: 5px;">${card.name}</div>
        `;
    } else {
        cardDiv.innerHTML = `
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

    modalContent.innerHTML = `
        <h2 style="color: var(--dark-bg); margin-bottom: 20px;">${card.icon} ${card.name}</h2>
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
        <div style="background: var(--light-bg); padding: 10px; border-radius: 8px;">
            <strong>PD Code:</strong> <code style="background: white; padding: 5px 10px; border-radius: 5px;">${card.pdCode}</code>
        </div>
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
        const cardElement = createCardElement(card, isOwned);
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
