
/**
 * Progress Page
 * User progress tracking and achievements
 */

import { DOM, Animation, Format } from '../utils.js';
import appState from '../state.js';

export default class ProgressPage {
  constructor(container) {
    this.container = container;
    this.progress = null;
    this.achievements = [];
    this.init();
  }

  init() {
    this.loadProgress();
    this.loadAchievements();
    this.render();
    this.bindEvents();
    this.startAnimations();
  }

  loadProgress() {
    this.progress = appState.getState('progress') || {
      totalScore: 0,
      completedMissions: [],
      completedQuizzes: [],
      realms: {},
      achievements: [],
      timeSpent: 0,
      streak: 0,
      lastActivity: null
    };
  }

  loadAchievements() {
    this.achievements = [
      {
        id: 'first-steps',
        title: 'First Steps',
        description: 'Complete your first mission',
        icon: '👶',
        category: 'journey',
        requirement: 'Complete 1 mission',
        unlocked: this.progress.completedMissions.length >= 1,
        points: 50
      },
      {
        id: 'realm-explorer',
        title: 'Realm Explorer',
        description: 'Complete your first realm',
        icon: '🗺️',
        category: 'journey',
        requirement: 'Complete all missions in a realm',
        unlocked: this.hasCompletedRealm(),
        points: 200
      },
      {
        id: 'knowledge-seeker',
        title: 'Knowledge Seeker',
        description: 'Score 100% on 5 quizzes',
        icon: '🧠',
        category: 'mastery',
        requirement: 'Perfect scores on 5 quizzes',
        unlocked: this.progress.completedQuizzes?.length >= 5,
        points: 150
      },
      {
        id: 'simulation-master',
        title: 'Simulation Master',
        description: 'Complete 10 interactive simulations',
        icon: '🎮',
        category: 'mastery',
        requirement: 'Complete 10 simulations',
        unlocked: this.getCompletedSimulations() >= 10,
        points: 100
      },
      {
        id: 'bitcoin-basics',
        title: 'Bitcoin Basics',
        description: 'Master the fundamentals of Bitcoin',
        icon: '₿',
        category: 'knowledge',
        requirement: 'Complete Realms 1 & 2',
        unlocked: this.hasCompletedRealms([1, 2]),
        points: 300
      },
      {
        id: 'crypto-cryptographer',
        title: 'Crypto Cryptographer',
        description: 'Understand cryptographic foundations',
        icon: '🔐',
        category: 'knowledge',
        requirement: 'Complete Realm 3',
        unlocked: this.hasCompletedRealms([3]),
        points: 250
      },
      {
        id: 'mining-engineer',
        title: 'Mining Engineer',
        description: 'Master Bitcoin mining and consensus',
        icon: '⛏️',
        category: 'knowledge',
        requirement: 'Complete Realm 4',
        unlocked: this.hasCompletedRealms([4]),
        points: 250
      },
      {
        id: 'governance-guru',
        title: 'Governance Guru',
        description: 'Understand Bitcoin governance',
        icon: '🏛️',
        category: 'knowledge',
        requirement: 'Complete Realm 5',
        unlocked: this.hasCompletedRealms([5]),
        points: 250
      },
      {
        id: 'lightning-fast',
        title: 'Lightning Fast',
        description: 'Master the Lightning Network',
        icon: '⚡',
        category: 'knowledge',
        requirement: 'Complete Realm 6',
        unlocked: this.hasCompletedRealms([6]),
        points: 250
      },
      {
        id: 'bitcoin-master',
        title: 'Bitcoin Master',
        description: 'Complete the entire journey',
        icon: '👑',
        category: 'mastery',
        requirement: 'Complete all 7 realms',
        unlocked: this.hasCompletedRealms([1, 2, 3, 4, 5, 6, 7]),
        points: 500
      },
      {
        id: 'dedicated-learner',
        title: 'Dedicated Learner',
        description: 'Maintain a 7-day learning streak',
        icon: '🔥',
        category: 'engagement',
        requirement: '7-day streak',
        unlocked: this.progress.streak >= 7,
        points: 100
      },
      {
        id: 'time-invested',
        title: 'Time Invested',
        description: 'Spend 10+ hours learning',
        icon: '⏰',
        category: 'engagement',
        requirement: '10 hours total time',
        unlocked: this.progress.timeSpent >= 36000000, // 10 hours in milliseconds
        points: 150
      }
    ];
  }

  render() {
    this.container.innerHTML = `
      <div class="progress-page">
        <header class="progress-header">
          <h1>Your Learning Progress</h1>
          <p>Track your journey through the realms of Bitcoin knowledge</p>
        </header>

        <main class="progress-content">
          <section class="overview-section">
            <div class="progress-overview">
              <div class="overview-card total-progress">
                <h3>Overall Progress</h3>
                <div class="progress-circle" data-progress="${this.getOverallProgress()}">
                  <svg class="progress-ring" width="120" height="120">
                    <circle class="progress-ring-bg" cx="60" cy="60" r="54"></circle>
                    <circle class="progress-ring-fill" cx="60" cy="60" r="54" 
                            stroke-dasharray="339.292" 
                            stroke-dashoffset="${339.292 - (339.292 * this.getOverallProgress() / 100)}"></circle>
                  </svg>
                  <div class="progress-text">
                    <span class="progress-percentage">${this.getOverallProgress()}%</span>
                    <span class="progress-label">Complete</span>
                  </div>
                </div>
              </div>

              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-icon">🎯</div>
                  <div class="stat-content">
                    <div class="stat-number">${this.progress.completedMissions.length}</div>
                    <div class="stat-label">Missions Completed</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">⭐</div>
                  <div class="stat-content">
                    <div class="stat-number">${this.progress.totalScore}</div>
                    <div class="stat-label">Total Points</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">🏆</div>
                  <div class="stat-content">
                    <div class="stat-number">${this.getUnlockedAchievements().length}</div>
                    <div class="stat-label">Achievements</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">🔥</div>
                  <div class="stat-content">
                    <div class="stat-number">${this.progress.streak || 0}</div>
                    <div class="stat-label">Day Streak</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">⏰</div>
                  <div class="stat-content">
                    <div class="stat-number">${this.getTimeSpentFormatted()}</div>
                    <div class="stat-label">Time Invested</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">📚</div>
                  <div class="stat-content">
                    <div class="stat-number">${Object.keys(this.progress.realms || {}).length}</div>
                    <div class="stat-label">Realms Explored</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="realms-progress-section">
            <h2>Realm Progress</h2>
            <div class="realms-progress-grid">
              ${this.renderRealmsProgress()}
            </div>
          </section>

          <section class="achievements-section">
            <h2>Achievements</h2>
            <div class="achievements-filter">
              <button class="filter-btn active" data-filter="all">All</button>
              <button class="filter-btn" data-filter="journey">Journey</button>
              <button class="filter-btn" data-filter="mastery">Mastery</button>
              <button class="filter-btn" data-filter="knowledge">Knowledge</button>
              <button class="filter-btn" data-filter="engagement">Engagement</button>
            </div>
            <div class="achievements-grid" id="achievements-grid">
              ${this.renderAchievements()}
            </div>
          </section>

          <section class="recent-activity-section">
            <h2>Recent Activity</h2>
            <div class="activity-timeline">
              ${this.renderRecentActivity()}
            </div>
          </section>

          <section class="milestones-section">
            <h2>Upcoming Milestones</h2>
            <div class="milestones-list">
              ${this.renderUpcomingMilestones()}
            </div>
          </section>
        </main>
      </div>
    `;
  }

  renderRealmsProgress() {
    const realms = [
      { id: 1, title: 'Origins', icon: '🌍', totalMissions: 5 },
      { id: 2, title: 'The Citadel', icon: '🏰', totalMissions: 4 },
      { id: 3, title: 'Cryptography', icon: '🔐', totalMissions: 5 },
      { id: 4, title: 'The Network', icon: '⛏️', totalMissions: 6 },
      { id: 5, title: 'Governance', icon: '🏛️', totalMissions: 4 },
      { id: 6, title: 'Lightning', icon: '⚡', totalMissions: 5 },
      { id: 7, title: 'Mastery', icon: '👑', totalMissions: 3 }
    ];

    return realms.map(realm => {
      const completedMissions = this.getRealmProgress(realm.id);
      const progressPercent = (completedMissions / realm.totalMissions) * 100;
      const isCompleted = completedMissions === realm.totalMissions;
      const isUnlocked = this.isRealmUnlocked(realm.id);

      return `
        <div class="realm-progress-card ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}">
          <div class="realm-icon">${realm.icon}</div>
          <div class="realm-info">
            <h3>${realm.title}</h3>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <p>${completedMissions}/${realm.totalMissions} missions</p>
          </div>
          <div class="realm-status">
            ${isCompleted ? '✅' : !isUnlocked ? '🔒' : '📚'}
          </div>
        </div>
      `;
    }).join('');
  }

  renderAchievements() {
    return this.achievements.map(achievement => {
      const isUnlocked = achievement.unlocked;
      return `
        <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}" data-category="${achievement.category}">
          <div class="achievement-icon ${isUnlocked ? '' : 'grayscale'}">${achievement.icon}</div>
          <div class="achievement-content">
            <h3 class="achievement-title">${achievement.title}</h3>
            <p class="achievement-description">${achievement.description}</p>
            <div class="achievement-meta">
              <span class="achievement-requirement">${achievement.requirement}</span>
              <span class="achievement-points">+${achievement.points} pts</span>
            </div>
          </div>
          <div class="achievement-status">
            ${isUnlocked ? '🏆' : '🔒'}
          </div>
        </div>
      `;
    }).join('');
  }

  renderRecentActivity() {
    const activities = this.getRecentActivities();
    
    if (activities.length === 0) {
      return `
        <div class="no-activity">
          <p>No recent activity. Start your learning journey!</p>
          <button class="btn btn-primary" onclick="window.location.hash = '#/realms'">
            Explore Realms
          </button>
        </div>
      `;
    }

    return activities.map(activity => `
      <div class="activity-item">
        <div class="activity-icon">${activity.icon}</div>
        <div class="activity-content">
          <h4>${activity.title}</h4>
          <p>${activity.description}</p>
          <span class="activity-time">${activity.timeAgo}</span>
        </div>
      </div>
    `).join('');
  }

  renderUpcomingMilestones() {
    const milestones = this.getUpcomingMilestones();
    
    if (milestones.length === 0) {
      return `
        <div class="no-milestones">
          <p>You're doing great! Keep learning to unlock new milestones.</p>
        </div>
      `;
    }

    return milestones.map(milestone => `
      <div class="milestone-item">
        <div class="milestone-icon">${milestone.icon}</div>
        <div class="milestone-content">
          <h4>${milestone.title}</h4>
          <p>${milestone.description}</p>
          <div class="milestone-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${milestone.progress}%"></div>
            </div>
            <span class="progress-text">${milestone.progressText}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  bindEvents() {
    // Achievement filter buttons
    const filterBtns = DOM.$$('.filter-btn', this.container);
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter achievements
        const filter = btn.dataset.filter;
        this.filterAchievements(filter);
      });
    });

    // Realm progress card clicks
    const realmCards = DOM.$$('.realm-progress-card', this.container);
    realmCards.forEach((card, index) => {
      const realmId = index + 1;
      card.addEventListener('click', () => {
        if (this.isRealmUnlocked(realmId)) {
          window.location.hash = `#/realm/${realmId}`;
        }
      });
    });
  }

  startAnimations() {
    // Animate progress circle
    this.animateProgressCircle();
    
    // Animate stats on scroll
    this.animateStatsOnScroll();
    
    // Stagger animate achievement cards
    this.staggerAnimateAchievements();
  }

  filterAchievements(category) {
    const achievementCards = DOM.$$('.achievement-card', this.container);
    
    achievementCards.forEach(card => {
      const cardCategory = card.dataset.category;
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        Animation.fadeIn(card);
      } else {
        Animation.fadeOut(card, () => {
          card.style.display = 'none';
        });
      }
    });
  }

  animateProgressCircle() {
    const progressRing = DOM.$('.progress-ring-fill', this.container);
    if (progressRing) {
      const progress = this.getOverallProgress();
      const circumference = 339.292;
      const offset = circumference - (circumference * progress / 100);
      
      progressRing.style.strokeDashoffset = circumference;
      
      setTimeout(() => {
        progressRing.style.transition = 'stroke-dashoffset 2s ease-in-out';
        progressRing.style.strokeDashoffset = offset;
      }, 500);
    }
  }

  animateStatsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = DOM.$$('.stat-number', entry.target);
          statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent) || 0;
            if (target > 0) {
              Animation.countUp(stat, 0, target, 1500);
            }
          });
          observer.unobserve(entry.target);
        }
      });
    });

    const statsGrid = DOM.$('.stats-grid', this.container);
    if (statsGrid) {
      observer.observe(statsGrid);
    }
  }

  staggerAnimateAchievements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const achievementCards = DOM.$$('.achievement-card', entry.target);
          achievementCards.forEach((card, index) => {
            setTimeout(() => {
              Animation.fadeInUp(card);
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    });

    const achievementsGrid = DOM.$('#achievements-grid', this.container);
    if (achievementsGrid) {
      observer.observe(achievementsGrid);
    }
  }

  // Helper methods
  getOverallProgress() {
    const totalMissions = 32; // Total across all realms
    const completed = this.progress.completedMissions.length;
    return Math.round((completed / totalMissions) * 100);
  }

  getRealmProgress(realmId) {
    return this.progress.completedMissions.filter(mission => 
      mission.startsWith(`${realmId}-`)
    ).length;
  }

  isRealmUnlocked(realmId) {
    if (realmId === 1) return true;
    const previousRealmMissions = [5, 4, 5, 6, 4, 5, 3]; // Missions per realm
    const previousTotal = previousRealmMissions.slice(0, realmId - 1).reduce((a, b) => a + b, 0);
    return this.progress.completedMissions.length >= previousTotal;
  }

  hasCompletedRealm() {
    const realms = [5, 4, 5, 6, 4, 5, 3]; // Missions per realm
    return realms.some((missions, index) => {
      const realmId = index + 1;
      return this.getRealmProgress(realmId) >= missions;
    });
  }

  hasCompletedRealms(realmIds) {
    const realms = [5, 4, 5, 6, 4, 5, 3]; // Missions per realm
    return realmIds.every(realmId => {
      const requiredMissions = realms[realmId - 1];
      return this.getRealmProgress(realmId) >= requiredMissions;
    });
  }

  getCompletedSimulations() {
    // Estimate based on completed missions (each mission has ~1 simulation)
    return this.progress.completedMissions.length;
  }

  getUnlockedAchievements() {
    return this.achievements.filter(a => a.unlocked);
  }

  getTimeSpentFormatted() {
    const timeSpent = this.progress.timeSpent || 0;
    const hours = Math.floor(timeSpent / 3600000);
    const minutes = Math.floor((timeSpent % 3600000) / 60000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  getRecentActivities() {
    const activities = [];
    
    // Add recent mission completions
    const recentMissions = this.progress.completedMissions.slice(-5);
    recentMissions.forEach(mission => {
      const [realmId, missionId] = mission.split('-');
      activities.push({
        icon: '✅',
        title: `Mission Completed`,
        description: `Completed Mission ${missionId} in Realm ${realmId}`,
        timeAgo: 'Recently'
      });
    });

    // Add achievement unlocks
    const recentAchievements = this.getUnlockedAchievements().slice(-3);
    recentAchievements.forEach(achievement => {
      activities.push({
        icon: '🏆',
        title: 'Achievement Unlocked',
        description: achievement.title,
        timeAgo: 'Recently'
      });
    });

    return activities.slice(0, 10);
  }

  getUpcomingMilestones() {
    const milestones = [];
    
    // Next realm completion
    const currentRealm = this.getCurrentRealm();
    if (currentRealm) {
      const progress = this.getRealmProgress(currentRealm.id);
      milestones.push({
        icon: currentRealm.icon,
        title: `Complete ${currentRealm.title}`,
        description: `Finish all missions in this realm`,
        progress: (progress / currentRealm.totalMissions) * 100,
        progressText: `${progress}/${currentRealm.totalMissions} missions`
      });
    }

    // Next achievement
    const nextAchievement = this.achievements.find(a => !a.unlocked);
    if (nextAchievement) {
      milestones.push({
        icon: nextAchievement.icon,
        title: nextAchievement.title,
        description: nextAchievement.requirement,
        progress: this.getAchievementProgress(nextAchievement),
        progressText: this.getAchievementProgressText(nextAchievement)
      });
    }

    return milestones;
  }

  getCurrentRealm() {
    const realms = [
      { id: 1, title: 'Origins', icon: '🌍', totalMissions: 5 },
      { id: 2, title: 'The Citadel', icon: '🏰', totalMissions: 4 },
      { id: 3, title: 'Cryptography', icon: '🔐', totalMissions: 5 },
      { id: 4, title: 'The Network', icon: '⛏️', totalMissions: 6 },
      { id: 5, title: 'Governance', icon: '🏛️', totalMissions: 4 },
      { id: 6, title: 'Lightning', icon: '⚡', totalMissions: 5 },
      { id: 7, title: 'Mastery', icon: '👑', totalMissions: 3 }
    ];

    return realms.find(realm => {
      const progress = this.getRealmProgress(realm.id);
      return progress < realm.totalMissions && this.isRealmUnlocked(realm.id);
    });
  }

  getAchievementProgress(achievement) {
    // Simple progress calculation for demo
    switch (achievement.id) {
      case 'first-steps':
        return Math.min((this.progress.completedMissions.length / 1) * 100, 100);
      case 'knowledge-seeker':
        return Math.min(((this.progress.completedQuizzes?.length || 0) / 5) * 100, 100);
      case 'dedicated-learner':
        return Math.min(((this.progress.streak || 0) / 7) * 100, 100);
      default:
        return 0;
    }
  }

  getAchievementProgressText(achievement) {
    switch (achievement.id) {
      case 'first-steps':
        return `${this.progress.completedMissions.length}/1 missions`;
      case 'knowledge-seeker':
        return `${this.progress.completedQuizzes?.length || 0}/5 quizzes`;
      case 'dedicated-learner':
        return `${this.progress.streak || 0}/7 days`;
      default:
        return 'Not started';
    }
  }

  unmount() {
    // Clean up observers and intervals
  }
}
