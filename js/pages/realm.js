
/**
 * Individual Realm Page
 * Shows missions and content for a specific realm
 */

import { DOM, Animation } from '../utils.js';
import appState from '../state.js';

export default class RealmPage {
  constructor(container, realmId) {
    this.container = container;
    this.realmId = parseInt(realmId);
    this.realm = null;
    this.missions = [];
    this.init();
  }

  init() {
    this.loadRealmData();
    this.render();
    this.bindEvents();
  }

  loadRealmData() {
    // Realm data - in a real app this would come from an API
    const realms = {
      1: {
        id: 1,
        title: "The Origins",
        description: "Discover the history of money and why Bitcoin was created",
        icon: "🏛️",
        color: "#f59e0b",
        missions: [
          {
            id: 1,
            title: "The Story of Money",
            description: "Learn about the evolution of money throughout history",
            type: "educational",
            completed: false
          },
          {
            id: 2,
            title: "Barter System Challenge",
            description: "Experience the limitations of bartering firsthand",
            type: "simulation",
            completed: false
          },
          {
            id: 3,
            title: "Currency Timeline",
            description: "Build an interactive timeline of monetary systems",
            type: "interactive",
            completed: false
          },
          {
            id: 4,
            title: "Inflation Simulator",
            description: "Understand how inflation affects purchasing power",
            type: "simulation",
            completed: false
          },
          {
            id: 5,
            title: "The Need for Bitcoin",
            description: "Explore the problems Bitcoin aims to solve",
            type: "educational",
            completed: false
          }
        ]
      },
      2: {
        id: 2,
        title: "The Central Citadel",
        description: "Learn about Bitcoin basics, wallets, and transactions",
        icon: "🏰",
        color: "#8b5cf6",
        missions: [
          {
            id: 1,
            title: "What is Bitcoin?",
            description: "Understanding the basics of Bitcoin",
            type: "educational",
            completed: false
          },
          {
            id: 2,
            title: "Digital Wallets",
            description: "Learn about Bitcoin wallets and key management",
            type: "educational",
            completed: false
          },
          {
            id: 3,
            title: "Your First Transaction",
            description: "Simulate sending and receiving Bitcoin",
            type: "simulation",
            completed: false
          },
          {
            id: 4,
            title: "Privacy vs Transparency",
            description: "Explore Bitcoin's transparent blockchain",
            type: "educational",
            completed: false
          },
          {
            id: 5,
            title: "Self-Custody Simulator",
            description: "Practice managing your own Bitcoin keys",
            type: "simulation",
            completed: false
          },
          {
            id: 6,
            title: "Lightning Network Basics",
            description: "Learn about Bitcoin's second layer",
            type: "educational",
            completed: false
          }
        ]
      }
      // Add more realms as needed
    };

    this.realm = realms[this.realmId] || realms[1];
    this.missions = this.realm.missions || [];
    
    // Load progress
    const progress = appState.getState('progress') || {};
    const realmProgress = progress.realms?.[this.realmId] || {};
    
    this.missions.forEach(mission => {
      mission.completed = realmProgress.completedMissions?.includes(mission.id) || false;
    });
  }

  render() {
    this.container.innerHTML = `
      <div class="realm-page" style="--realm-color: ${this.realm.color}">
        <div class="realm-header">
          <div class="realm-banner">
            <div class="realm-icon-large">${this.realm.icon}</div>
            <div class="realm-info">
              <h1>${this.realm.title}</h1>
              <p>${this.realm.description}</p>
              <div class="realm-progress-summary">
                <span class="completed-missions">${this.getCompletedCount()}/${this.missions.length}</span>
                <span class="progress-label">missions completed</span>
              </div>
            </div>
          </div>
          
          <div class="realm-navigation">
            <button class="btn btn-secondary" id="back-to-realms">
              ← Back to Realms
            </button>
            <div class="realm-actions">
              <button class="btn btn-primary" id="continue-learning">
                ${this.getCompletedCount() === 0 ? 'Start Learning' : 'Continue'}
              </button>
            </div>
          </div>
        </div>

        <div class="missions-container">
          <h2>Missions</h2>
          <div class="missions-grid">
            ${this.renderMissions()}
          </div>
        </div>

        <div class="realm-stats">
          <h3>Your Progress</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">${this.getCompletedCount()}</div>
              <div class="stat-label">Completed</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">${this.missions.length - this.getCompletedCount()}</div>
              <div class="stat-label">Remaining</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">${Math.round((this.getCompletedCount() / this.missions.length) * 100)}%</div>
              <div class="stat-label">Progress</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderMissions() {
    return this.missions.map((mission, index) => {
      const isLocked = index > 0 && !this.missions[index - 1].completed;
      const typeIcon = this.getMissionTypeIcon(mission.type);
      
      return `
        <div class="mission-card ${mission.completed ? 'completed' : ''} ${isLocked ? 'locked' : ''}" 
             data-mission="${mission.id}">
          <div class="mission-header">
            <div class="mission-type-icon">${typeIcon}</div>
            <div class="mission-status">
              ${mission.completed ? '✅' : isLocked ? '🔒' : '📋'}
            </div>
          </div>
          
          <div class="mission-content">
            <h3>${mission.title}</h3>
            <p>${mission.description}</p>
            
            <div class="mission-meta">
              <span class="mission-type">${this.formatMissionType(mission.type)}</span>
            </div>
          </div>
          
          <div class="mission-actions">
            ${this.renderMissionAction(mission, isLocked)}
          </div>
        </div>
      `;
    }).join('');
  }

  getMissionTypeIcon(type) {
    const icons = {
      educational: '📚',
      simulation: '🧪',
      interactive: '🎮',
      quiz: '❓',
      challenge: '🏆'
    };
    return icons[type] || '📋';
  }

  formatMissionType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  renderMissionAction(mission, isLocked) {
    if (isLocked) {
      return '<button class="btn btn-secondary" disabled>Locked</button>';
    }
    
    if (mission.completed) {
      return '<button class="btn btn-primary mission-start" data-mission="' + mission.id + '">Review</button>';
    }
    
    return '<button class="btn btn-primary mission-start" data-mission="' + mission.id + '">Start</button>';
  }

  bindEvents() {
    // Back to realms button
    const backBtn = DOM.$('#back-to-realms', this.container);
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.hash = '#/realms';
      });
    }

    // Continue learning button
    const continueBtn = DOM.$('#continue-learning', this.container);
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        const nextMission = this.getNextMission();
        if (nextMission) {
          this.startMission(nextMission.id);
        }
      });
    }

    // Mission cards
    const missionCards = DOM.$$('.mission-card', this.container);
    missionCards.forEach(card => {
      card.addEventListener('click', () => {
        const missionId = parseInt(card.dataset.mission);
        const mission = this.missions.find(m => m.id === missionId);
        const index = this.missions.findIndex(m => m.id === missionId);
        const isLocked = index > 0 && !this.missions[index - 1].completed;
        
        if (!isLocked) {
          this.startMission(missionId);
        } else {
          this.showLockedMissionDialog(mission);
        }
      });
    });

    // Mission start buttons
    const startButtons = DOM.$$('.mission-start', this.container);
    startButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const missionId = parseInt(btn.dataset.mission);
        this.startMission(missionId);
      });
    });
  }

  getCompletedCount() {
    return this.missions.filter(mission => mission.completed).length;
  }

  getNextMission() {
    return this.missions.find(mission => !mission.completed);
  }

  startMission(missionId) {
    // Navigate to mission page
    window.location.hash = `#/realm/${this.realmId}/mission/${missionId}`;
  }

  showLockedMissionDialog(mission) {
    import('../components.js').then(({ Modal }) => {
      const modalContent = DOM.create('div', { className: 'locked-mission-modal' }, `
        <h3>Mission Locked</h3>
        <p>Complete the previous mission to unlock <strong>${mission.title}</strong>.</p>
        <div class="modal-actions">
          <button class="btn btn-primary close-modal">Understood</button>
        </div>
      `);

      const modal = new Modal(modalContent);
      modal.open();

      modalContent.querySelector('.close-modal').addEventListener('click', () => {
        modal.close();
      });
    });
  }
}
export default class RealmPage {
    constructor() {
        this.currentRealmId = null;
        this.realmData = null;
    }

    async render(realmId) {
        this.currentRealmId = parseInt(realmId);
        this.realmData = this.getRealmData(this.currentRealmId);
        
        if (!this.realmData) {
            return '<div class="error-message">Realm not found</div>';
        }

        return `
            <div class="page realm-page" data-realm="${this.currentRealmId}">
                <div class="realm-header">
                    <div class="realm-banner" style="background: linear-gradient(135deg, ${this.realmData.colors.primary}, ${this.realmData.colors.secondary});">
                        <div class="realm-info">
                            <h1 class="realm-title">${this.realmData.title}</h1>
                            <p class="realm-description">${this.realmData.description}</p>
                            <div class="realm-progress">
                                <span class="progress-text">Progress: ${this.getRealmProgress()}%</span>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${this.getRealmProgress()}%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="realm-avatar">
                            <img src="${this.realmData.image}" alt="${this.realmData.title}" />
                        </div>
                    </div>
                </div>

                <nav class="realm-nav">
                    <button class="nav-btn ${this.currentView === 'story' ? 'active' : ''}" data-view="story">
                        📖 Story
                    </button>
                    <button class="nav-btn ${this.currentView === 'missions' ? 'active' : ''}" data-view="missions">
                        🎯 Missions
                    </button>
                    <button class="nav-btn ${this.currentView === 'simulations' ? 'active' : ''}" data-view="simulations">
                        ⚡ Simulations
                    </button>
                </nav>

                <main class="realm-content">
                    <div id="realm-view-container">
                        ${this.renderCurrentView()}
                    </div>
                </main>
            </div>
        `;
    }

    renderCurrentView() {
        switch (this.currentView || 'story') {
            case 'story':
                return this.renderStoryView();
            case 'missions':
                return this.renderMissionsView();
            case 'simulations':
                return this.renderSimulationsView();
            default:
                return this.renderStoryView();
        }
    }

    renderStoryView() {
        return `
            <section class="story-view">
                <div class="story-content">
                    <h2>Chapter ${this.currentRealmId}: ${this.realmData.title}</h2>
                    <div class="story-text">
                        ${this.realmData.story}
                    </div>
                    <div class="story-actions">
                        <button class="btn btn-primary" onclick="window.realmPage.showView('missions')">
                            Begin Missions
                        </button>
                    </div>
                </div>
                <div class="story-illustration">
                    <img src="${this.realmData.storyImage || this.realmData.image}" alt="Story illustration" />
                </div>
            </section>
        `;
    }

    renderMissionsView() {
        const missions = this.realmData.missions || [];
        const completedMissions = this.getCompletedMissions();

        return `
            <section class="missions-view">
                <h2>Missions</h2>
                <div class="missions-grid">
                    ${missions.map((mission, index) => `
                        <div class="mission-card ${completedMissions.includes(`${this.currentRealmId}-${index + 1}`) ? 'completed' : ''} ${this.isMissionUnlocked(index) ? '' : 'locked'}">
                            <div class="mission-header">
                                <h3>${mission.title}</h3>
                                <div class="mission-status">
                                    ${completedMissions.includes(`${this.currentRealmId}-${index + 1}`) ? '✅' : this.isMissionUnlocked(index) ? '🔓' : '🔒'}
                                </div>
                            </div>
                            <p class="mission-description">${mission.description}</p>
                            <div class="mission-info">
                                <span class="mission-type">${mission.type}</span>
                                <span class="mission-duration">${mission.duration || '10-15 min'}</span>
                            </div>
                            ${this.isMissionUnlocked(index) ? `
                                <button class="btn btn-secondary mission-start-btn" onclick="window.realmPage.startMission(${index + 1})">
                                    ${completedMissions.includes(`${this.currentRealmId}-${index + 1}`) ? 'Review' : 'Start'} Mission
                                </button>
                            ` : `
                                <button class="btn btn-disabled" disabled>
                                    Complete previous missions to unlock
                                </button>
                            `}
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    renderSimulationsView() {
        const simulations = this.realmData.simulations || [];

        return `
            <section class="simulations-view">
                <h2>Interactive Simulations</h2>
                <div class="simulations-grid">
                    ${simulations.map((simulation, index) => `
                        <div class="simulation-card">
                            <div class="simulation-icon">${simulation.icon}</div>
                            <h3>${simulation.title}</h3>
                            <p>${simulation.description}</p>
                            <button class="btn btn-primary" onclick="window.simulations.start('${simulation.id}')">
                                Start Simulation
                            </button>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    async mount() {
        this.currentView = 'story';
        window.realmPage = this;
        this.addEventListeners();
    }

    addEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.showView(view);
            });
        });
    }

    showView(view) {
        this.currentView = view;
        const container = document.getElementById('realm-view-container');
        if (container) {
            container.innerHTML = this.renderCurrentView();
        }
        
        // Update navigation active state
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
    }

    startMission(missionId) {
        window.router.navigate(`/realm/${this.currentRealmId}/mission/${missionId}`);
    }

    getRealmData(realmId) {
        const realms = {
            1: {
                title: "Origins & Value",
                description: "Discover the roots of money and Bitcoin's revolutionary approach to value",
                colors: { primary: "#D4AF37", secondary: "#F4E4BC" },
                image: "/public/assets/realms/intro-1.svg",
                story: `
                    <p>In the bustling markets of Accra, Asha witnesses the daily struggle with currency fluctuations and limited financial access. She begins to question: what makes money valuable?</p>
                    <p>Join Asha as she explores the history of trade, from barter systems to modern currencies, and discovers how Bitcoin represents a return to sound money principles.</p>
                `,
                missions: [
                    {
                        title: "The Story of Money",
                        description: "Learn about the evolution of money from shells to digital currency",
                        type: "Educational",
                        duration: "15 min"
                    },
                    {
                        title: "Value Discovery",
                        description: "Explore what gives Bitcoin its value through interactive scenarios",
                        type: "Simulation",
                        duration: "20 min"
                    },
                    {
                        title: "African Trade Routes",
                        description: "Discover historical African trade networks and their lessons for Bitcoin",
                        type: "Interactive Map",
                        duration: "12 min"
                    }
                ],
                simulations: [
                    {
                        id: "barter-system",
                        title: "Barter Challenge",
                        description: "Experience the limitations of barter systems",
                        icon: "🔄"
                    },
                    {
                        id: "inflation-impact",
                        title: "Inflation Simulator",
                        description: "See how inflation affects purchasing power over time",
                        icon: "📈"
                    }
                ]
            },
            2: {
                title: "Privacy & Control",
                description: "Understand financial privacy and the power of self-custody",
                colors: { primary: "#2E8B57", secondary: "#90EE90" },
                image: "/public/assets/realms/intro-3.svg",
                story: `
                    <p>Asha learns about financial surveillance and discovers that privacy is not about hiding wrongdoing, but about maintaining human dignity and freedom.</p>
                    <p>Explore the importance of controlling your own money and how Bitcoin enables true financial sovereignty.</p>
                `,
                missions: [
                    {
                        title: "Privacy Fundamentals",
                        description: "Learn why financial privacy matters for everyone",
                        type: "Educational",
                        duration: "18 min"
                    },
                    {
                        title: "Self-Custody Basics",
                        description: "Master the principles of controlling your own Bitcoin",
                        type: "Practical",
                        duration: "25 min"
                    },
                    {
                        title: "Lightning Network",
                        description: "Explore Bitcoin's layer-2 scaling solution",
                        type: "Simulation",
                        duration: "22 min"
                    }
                ],
                simulations: [
                    {
                        id: "privacy-trade-offs",
                        title: "Privacy vs Convenience",
                        description: "Explore the balance between privacy and usability",
                        icon: "🔐"
                    },
                    {
                        id: "custody-scenarios",
                        title: "Custody Simulator",
                        description: "Practice different custody models and their trade-offs",
                        icon: "🏛️"
                    }
                ]
            }
            // Add more realms as needed...
        };

        return realms[realmId];
    }

    getRealmProgress() {
        const state = window.gameState || { progress: { completedMissions: [] } };
        const totalMissions = this.realmData.missions?.length || 0;
        const completedMissions = state.progress.completedMissions.filter(
            mission => mission.startsWith(`${this.currentRealmId}-`)
        ).length;
        
        return totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;
    }

    getCompletedMissions() {
        const state = window.gameState || { progress: { completedMissions: [] } };
        return state.progress.completedMissions;
    }

    isMissionUnlocked(missionIndex) {
        const completedMissions = this.getCompletedMissions();
        
        // First mission is always unlocked
        if (missionIndex === 0) return true;
        
        // Check if previous mission is completed
        const previousMissionId = `${this.currentRealmId}-${missionIndex}`;
        return completedMissions.includes(previousMissionId);
    }

    unmount() {
        window.realmPage = null;
    }
}
