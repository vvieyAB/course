/**
 * Realms Page
 * Overview of all learning realms/sections
 */

import { DOM, Animation } from '../utils.js';
import appState from '../state.js';

export default class RealmsPage {
  constructor(container) {
    this.container = container;
    this.realms = [
            {
                id: 1,
                title: 'Origins',
                subtitle: 'The Foundation of Value',
                description: 'Discover the roots of money and trade in ancient African kingdoms. Learn about barter systems, the evolution of currency, and the challenges of traditional money.',
                color: '#8B4513',
                gradient: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
                missions: 3,
                completed: false,
                icon: '🌍',
                difficulty: 'Beginner',
                estimatedTime: '45 minutes',
                concepts: ['Barter Systems', 'Currency Evolution', 'Value Exchange', 'Trade Networks'],
                culturalFocus: 'Ancient African Trade Routes'
            },
            {
                id: 2,
                title: 'The Citadel',
                subtitle: 'Surveillance and Control',
                description: 'Experience the dystopian world of financial surveillance where every transaction is monitored and controlled. Understand the importance of financial privacy.',
                color: '#4A90E2',
                gradient: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
                missions: 4,
                completed: false,
                icon: '🏰',
                difficulty: 'Intermediate',
                estimatedTime: '60 minutes',
                concepts: ['Financial Surveillance', 'CBDCs', 'Privacy Rights', 'Social Credit'],
                culturalFocus: 'Modern Control Systems'
            },
            {
                id: 3,
                title: 'Cryptography',
                subtitle: 'The Art of Secrets',
                description: 'Learn the mathematical foundations that make Bitcoin secure. Explore hashing, digital signatures, and cryptographic proofs.',
                color: '#9B59B6',
                gradient: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
                missions: 5,
                completed: false,
                icon: '🔐',
                difficulty: 'Intermediate',
                estimatedTime: '75 minutes',
                concepts: ['Hash Functions', 'Digital Signatures', 'Merkle Trees', 'Cryptographic Proofs'],
                culturalFocus: 'Ancient Secret Keeping'
            },
            {
                id: 4,
                title: 'The Network',
                subtitle: 'Consensus and Mining',
                description: 'Understand how Bitcoin achieves consensus without central authority. Learn about mining, energy use, and network security.',
                color: '#E67E22',
                gradient: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
                missions: 6,
                completed: false,
                icon: '⛏️',
                difficulty: 'Advanced',
                estimatedTime: '90 minutes',
                concepts: ['Proof of Work', 'Mining Economics', 'Energy Use', 'Network Security'],
                culturalFocus: 'Community Consensus'
            },
            {
                id: 5,
                title: 'Governance',
                subtitle: 'Decentralized Decision Making',
                description: 'Explore how Bitcoin evolves through decentralized governance. Learn about BIPs, forks, and community consensus.',
                color: '#27AE60',
                gradient: 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)',
                missions: 4,
                completed: false,
                icon: '🏛️',
                difficulty: 'Advanced',
                estimatedTime: '70 minutes',
                concepts: ['BIPs', 'Soft Forks', 'Hard Forks', 'Community Governance'],
                culturalFocus: 'Traditional Council Systems'
            },
            {
                id: 6,
                title: 'Lightning',
                subtitle: 'The Payment Layer',
                description: 'Discover Bitcoin\'s second layer solutions. Learn about the Lightning Network and its role in everyday transactions.',
                color: '#F39C12',
                gradient: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)',
                missions: 5,
                completed: false,
                icon: '⚡',
                difficulty: 'Advanced',
                estimatedTime: '80 minutes',
                concepts: ['Payment Channels', 'Lightning Network', 'Instant Payments', 'Scalability'],
                culturalFocus: 'Fast Communication Networks'
            },
            {
                id: 7,
                title: 'Mastery',
                subtitle: 'The Complete Journey',
                description: 'Test your comprehensive understanding of Bitcoin. Complete advanced challenges and earn your certification.',
                color: '#8E44AD',
                gradient: 'linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)',
                missions: 3,
                completed: false,
                icon: '👑',
                difficulty: 'Expert',
                estimatedTime: '120 minutes',
                concepts: ['Integration', 'Real-world Application', 'Teaching Others', 'Mastery'],
                culturalFocus: 'Wisdom and Leadership'
            }
        ];

    this.init();
  }

  init() {
    this.loadProgress();
    this.render();
    this.bindEvents();
  }

  loadProgress() {
    const progress = appState.getState('progress') || {};
    this.realms.forEach(realm => {
      const realmProgress = progress.realms?.[realm.id] || {};
      realm.completed = realmProgress.completed || 0;
    });
  }

  render() {
    this.container.innerHTML = `
      <div class="realms-page">
        <div class="page-header">
          <h1>Learning Realms</h1>
          <p>Choose your path through the Bitcoin learning journey. Each realm builds upon the previous one.</p>
        </div>

        <div class="progress-overview">
          <div class="overall-progress">
            <h3>Your Progress</h3>
            <div class="progress-stats">
              <div class="stat">
                <span class="stat-number">${this.getTotalCompleted()}</span>
                <span class="stat-label">Missions Completed</span>
              </div>
              <div class="stat">
                <span class="stat-number">${this.getCompletedRealms()}</span>
                <span class="stat-label">Realms Mastered</span>
              </div>
              <div class="stat">
                <span class="stat-number">${this.getOverallProgress()}%</span>
                <span class="stat-label">Overall Progress</span>
              </div>
            </div>
          </div>
        </div>

        <div class="realms-grid">
          ${this.renderRealms()}
        </div>

        <div class="learning-path">
          <h3>Recommended Learning Path</h3>
          <div class="path-visualization">
            ${this.renderLearningPath()}
          </div>
        </div>
      </div>
    `;
  }

  renderRealms() {
    return this.realms.map(realm => {
      const progressPercent = (realm.completed / realm.missions) * 100;
      const isUnlocked = this.isRealmUnlocked(realm.id);
      const isCompleted = realm.completed === realm.missions;

      return `
        <div class="realm-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}" 
             data-realm="${realm.id}" 
             style="--realm-color: ${realm.color}">

          <div class="realm-header">
            <div class="realm-icon">${realm.icon}</div>
            <div class="realm-status">
              ${!isUnlocked ? '🔒' : isCompleted ? '✅' : '📚'}
            </div>
          </div>

          <div class="realm-content">
            <h3 class="realm-title">${realm.title}</h3>
            <p class="realm-description">${realm.description}</p>

            <div class="realm-meta">
              <span class="difficulty difficulty-${realm.difficulty.toLowerCase()}">${realm.difficulty}</span>
              <span class="mission-count">${realm.missions} missions</span>
            </div>

            <div class="realm-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercent}%"></div>
              </div>
              <span class="progress-text">${realm.completed}/${realm.missions} completed</span>
            </div>
          </div>

          <div class="realm-actions">
            ${this.renderRealmAction(realm, isUnlocked, isCompleted)}
          </div>
        </div>
      `;
    }).join('');
  }

  renderRealmAction(realm, isUnlocked, isCompleted) {
    if (!isUnlocked) {
      return `<button class="btn btn-secondary" disabled>Locked</button>`;
    }

    if (isCompleted) {
      return `<button class="btn btn-primary realm-enter" data-realm="${realm.id}">Review</button>`;
    }

    if (realm.completed > 0) {
      return `<button class="btn btn-primary realm-enter" data-realm="${realm.id}">Continue</button>`;
    }

    return `<button class="btn btn-primary realm-enter" data-realm="${realm.id}">Start</button>`;
  }

  renderLearningPath() {
    return this.realms.map((realm, index) => {
      const isUnlocked = this.isRealmUnlocked(realm.id);
      const isCompleted = realm.completed === realm.missions;
      const isCurrent = isUnlocked && !isCompleted && (index === 0 || this.realms[index - 1].completed === this.realms[index - 1].missions);

      return `
        <div class="path-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${!isUnlocked ? 'locked' : ''}">
          <div class="path-icon">${realm.icon}</div>
          <div class="path-label">${realm.title}</div>
          ${index < this.realms.length - 1 ? '<div class="path-connector"></div>' : ''}
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    // Realm card clicks
    const realmCards = DOM.$$('.realm-card', this.container);
    realmCards.forEach(card => {
      card.addEventListener('click', () => {
        const realmId = parseInt(card.dataset.realm);
        const realm = this.realms.find(r => r.id === realmId);

        if (this.isRealmUnlocked(realmId)) {
          this.navigateToRealm(realmId);
        } else {
          this.showLockedRealmDialog(realm);
        }
      });
    });

    // Enter realm buttons
    const enterButtons = DOM.$$('.realm-enter', this.container);
    enterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const realmId = parseInt(btn.dataset.realm);
        this.navigateToRealm(realmId);
      });
    });
  }

  isRealmUnlocked(realmId) {
    if (realmId === 1) return true; // First realm always unlocked

    const previousRealm = this.realms.find(r => r.id === realmId - 1);
    return previousRealm && previousRealm.completed === previousRealm.missions;
  }

  navigateToRealm(realmId) {
    appState.setState('currentPage', 'realm');
    appState.setState('currentRealm', realmId);
    window.location.hash = `#/realm/${realmId}`;
  }

  showLockedRealmDialog(realm) {
    // Create and show modal explaining unlock requirements
    const modal = DOM.create('div', { className: 'modal-content' }, `
      <h3>Realm Locked</h3>
      <p>Complete the previous realm to unlock <strong>${realm.title}</strong>.</p>
      <div class="modal-actions">
        <button class="btn btn-primary close-modal">Understood</button>
      </div>
    `);

    import('../components.js').then(({ Modal }) => {
      const modalInstance = new Modal(modal);
      modalInstance.open();

      modal.querySelector('.close-modal').addEventListener('click', () => {
        modalInstance.close();
      });
    });
  }

  getTotalCompleted() {
    return this.realms.reduce((total, realm) => total + realm.completed, 0);
  }

  getCompletedRealms() {
    return this.realms.filter(realm => realm.completed === realm.missions).length;
  }

  getOverallProgress() {
    const totalMissions = this.realms.reduce((total, realm) => total + realm.missions, 0);
    const completedMissions = this.getTotalCompleted();
    return Math.round((completedMissions / totalMissions) * 100);
  }

  renderRealmCard(realm) {
        const completedMissions = this.getCompletedMissions(realm.id);
        const progressPercentage = (completedMissions / realm.missions) * 100;
        const isLocked = this.isRealmLocked(realm.id);

        return `
            <div class="realm-card ${realm.completed ? 'completed' : ''} ${isLocked ? 'locked' : ''}" 
                 data-realm-id="${realm.id}"
                 style="background: ${realm.gradient}; border-radius: var(--border-radius-lg);">

                ${isLocked ? '<div class="lock-overlay"><span class="lock-icon">🔒</span></div>' : ''}

                <div class="realm-card-inner">
                    <div class="realm-header">
                        <div class="realm-icon-container">
                            <div class="realm-icon">${realm.icon}</div>
                            <div class="difficulty-badge">${realm.difficulty}</div>
                        </div>
                        <div class="realm-title-section">
                            <h3 class="realm-title">${realm.title}</h3>
                            <p class="realm-subtitle">${realm.subtitle}</p>
                        </div>
                        <div class="realm-status">
                            ${realm.completed ? '<span class="status-badge completed">✓ Complete</span>' : 
                              completedMissions > 0 ? '<span class="status-badge in-progress">In Progress</span>' : 
                              '<span class="status-badge not-started">Not Started</span>'}
                        </div>
                    </div>

                    <div class="realm-content">
                        <p class="realm-description">${realm.description}</p>

                        <div class="realm-meta">
                            <div class="meta-item">
                                <span class="meta-label">Time:</span>
                                <span class="meta-value">${realm.estimatedTime}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Focus:</span>
                                <span class="meta-value">${realm.culturalFocus}</span>
                            </div>
                        </div>

                        <div class="realm-concepts">
                            <h4>Key Concepts:</h4>
                            <div class="concept-tags">
                                ${realm.concepts.map(concept => 
                                    `<span class="concept-tag">${concept}</span>`
                                ).join('')}
                            </div>
                        </div>

                        <div class="realm-progress">
                            <div class="progress-info">
                                <span>Progress: ${completedMissions}/${realm.missions} missions</span>
                                <span class="progress-percentage">${Math.round(progressPercentage)}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                            </div>
                        </div>

                        <div class="realm-actions">
                            ${!isLocked ? `
                                <button class="primary-button" onclick="window.location.hash = '#/realm/${realm.id}'">
                                    ${completedMissions === 0 ? 'Start Journey' : 'Continue Learning'}
                                </button>
                                <button class="secondary-button" onclick="this.showRealmDetails(${realm.id})">
                                    ${completedMissions > 0 ? 'View Progress' : 'Preview'}
                                </button>
                            ` : `
                                <button class="disabled-button" disabled>
                                    Complete Previous Realm to Unlock
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    isRealmLocked(realmId) {
        if (realmId === 1) return false; // First realm is always unlocked

        const state = window.AppState?.getState();
        const completedMissions = state?.progress?.completedMissions || [];

        // Check if previous realm is completed
        const previousRealmMissions = this.realms.find(r => r.id === realmId - 1)?.missions || 0;
        const previousRealmCompleted = completedMissions.filter(mission => 
            mission.startsWith(`${realmId - 1}-`)
        ).length >= previousRealmMissions;

        return !previousRealmCompleted;
    }

    showRealmDetails(realmId) {
        const realm = this.realms.find(r => r.id === realmId);
        if (!realm) return;

        const modal = document.createElement('div');
        modal.className = 'realm-detail-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <div class="realm-detail-header" style="background: ${realm.gradient};">
                        <div class="realm-icon-large">${realm.icon}</div>
                        <h2>${realm.title}</h2>
                        <p>${realm.subtitle}</p>
                    </div>

                    <div class="realm-detail-body">
                        <div class="detail-section">
                            <h3>About This Realm</h3>
                            <p>${realm.description}</p>
                        </div>

                        <div class="detail-section">
                            <h3>Learning Objectives</h3>
                            <ul>
                                ${realm.concepts.map(concept => `<li>${concept}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="detail-section">
                            <h3>Cultural Context</h3>
                            <p>${realm.culturalFocus}</p>
                        </div>

                        <div class="detail-section">
                            <h3>Mission Progress</h3>
                            <div class="mission-list">
                                ${this.renderMissionProgress(realm.id, realm.missions)}
                            </div>
                        </div>

                        <div class="modal-actions">
                            <button class="primary-button" onclick="window.location.hash = '#/realm/${realm.id}'; this.closest('.realm-detail-modal').remove();">
                                ${this.getCompletedMissions(realm.id) === 0 ? 'Start Learning' : 'Continue Journey'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-modal')) {
                modal.remove();
            }
        });
    }

    renderMissionProgress(realmId, totalMissions) {
        const state = window.AppState?.getState();
        const completedMissions = state?.progress?.completedMissions || [];

        let html = '';
        for (let i = 1; i <= totalMissions; i++) {
            const missionKey = `${realmId}-${i}`;
            const isCompleted = completedMissions.includes(missionKey);

            html += `
                <div class="mission-progress-item ${isCompleted ? 'completed' : ''}">
                    <span class="mission-icon">${isCompleted ? '✅' : '⭕'}</span>
                    <span class="mission-title">Mission ${i}</span>
                    <span class="mission-status">${isCompleted ? 'Completed' : 'Not Started'}</span>
                </div>
            `;
        }

        return html;
    }
}