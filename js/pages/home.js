/**
 * Home Page
 * Main landing page for the Bitcoin Learning Journey
 */

import { DOM, Animation } from '../utils.js';

export default class HomePage {
  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.startAnimations();
  }

  render() {
    this.container.innerHTML = `
      <div class="home-page">
        <section class="hero-section">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">
                <span class="highlight">Asha's</span> Bitcoin Journey
              </h1>
              <p class="hero-subtitle">
                Discover Bitcoin through African-inspired storytelling, interactive simulations, 
                and hands-on learning experiences.
              </p>
              <div class="hero-actions">
                <button class="btn btn-primary btn-large" id="start-journey">
                  Begin Your Journey
                </button>
                <button class="btn btn-secondary btn-large" id="learn-more">
                  Learn More
                </button>
              </div>
            </div>
            <div class="hero-visual">
              <img src="/public/assets/characters/asha.svg" alt="Asha" class="hero-character">
              <div class="floating-elements">
                <div class="float-item bitcoin">₿</div>
                <div class="float-item book">📚</div>
                <div class="float-item globe">🌍</div>
              </div>
            </div>
          </div>
        </section>

        <section class="features-section">
          <div class="section-header">
            <h2>Why Learn Bitcoin with Asha?</h2>
            <p>Experience Bitcoin education like never before</p>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🎭</div>
              <h3>Story-Driven Learning</h3>
              <p>Follow Asha through seven realms of Bitcoin knowledge, each with unique challenges and discoveries.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">🌍</div>
              <h3>African Heritage</h3>
              <p>Learn through the lens of African culture, trade history, and traditional wisdom about value and exchange.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">🧪</div>
              <h3>Interactive Simulations</h3>
              <p>Experience Bitcoin concepts through hands-on simulations, from mining to transactions to governance.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">🏆</div>
              <h3>Progressive Mastery</h3>
              <p>Build knowledge step-by-step with achievements, badges, and a comprehensive progress tracking system.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">🔧</div>
              <h3>Practical Skills</h3>
              <p>Learn real-world Bitcoin skills including wallet management, transaction creation, and security practices.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">🤝</div>
              <h3>Community Focus</h3>
              <p>Understand Bitcoin's impact on communities and its potential for financial inclusion and empowerment.</p>
            </div>
          </div>
        </section>

        <section class="journey-preview">
          <div class="section-header">
            <h2>Your Learning Path</h2>
            <p>Seven realms of discovery await you</p>
          </div>

          <div class="realms-preview">
            <div class="realm-preview" data-realm="1">
              <div class="realm-icon">🏛️</div>
              <h3>Origins & Value</h3>
              <p>Discover the history of money and Bitcoin's revolutionary approach to value</p>
            </div>

            <div class="realm-preview" data-realm="2">
              <div class="realm-icon">🏰</div>
              <h3>Privacy & Control</h3>
              <p>Understand financial privacy and the power of self-custody</p>
            </div>

            <div class="realm-preview" data-realm="3">
              <div class="realm-icon">🌳</div>
              <h3>Technical Foundations</h3>
              <p>Learn about cryptography, hashing, and blockchain technology</p>
            </div>

            <div class="realm-preview" data-realm="4">
              <div class="realm-icon">⛰️</div>
              <h3>Mining & Consensus</h3>
              <p>Understand how Bitcoin maintains security and agreement</p>
            </div>

            <div class="realm-preview" data-realm="5">
              <div class="realm-icon">🏛️</div>
              <h3>Governance & Evolution</h3>
              <p>Discover how Bitcoin adapts and improves over time</p>
            </div>

            <div class="realm-preview" data-realm="6">
              <div class="realm-icon">🏗️</div>
              <h3>Building & Innovation</h3>
              <p>Explore the ecosystem of tools and applications built on Bitcoin</p>
            </div>

            <div class="realm-preview" data-realm="7">
              <div class="realm-icon">🎓</div>
              <h3>Mastery & Future</h3>
              <p>Synthesize your knowledge and prepare for the Bitcoin future</p>
            </div>
          </div>
        </section>

        <section class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number" id="total-learners">12,847</div>
              <div class="stat-label">Learners Worldwide</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">7</div>
              <div class="stat-label">Learning Realms</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">Interactive Missions</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">25+</div>
              <div class="stat-label">Simulations</div>
            </div>
          </div>
        </section>

        <section class="testimonials-section">
          <div class="section-header">
            <h2>What Learners Say</h2>
          </div>

          <div class="testimonials-grid">
            <div class="testimonial-card">
              <p>"This is the most engaging way I've learned about Bitcoin. Asha's story made complex concepts easy to understand."</p>
              <div class="testimonial-author">
                <strong>Kwame A.</strong>
                <span>Ghana</span>
              </div>
            </div>

            <div class="testimonial-card">
              <p>"The simulations helped me understand Bitcoin mining and transactions in a way textbooks never could."</p>
              <div class="testimonial-author">
                <strong>Sarah M.</strong>
                <span>Kenya</span>
              </div>
            </div>

            <div class="testimonial-card">
              <p>"Finally, Bitcoin education that respects our African heritage while teaching cutting-edge technology."</p>
              <div class="testimonial-author">
                <strong>Ibrahim T.</strong>
                <span>Nigeria</span>
              </div>
            </div>
          </div>
        </section>

        <section class="cta-section">
          <div class="cta-content">
            <h2>Ready to Begin Your Bitcoin Journey?</h2>
            <p>Join thousands of learners discovering Bitcoin through Asha's eyes</p>
            <button class="btn btn-primary btn-large" id="start-journey-cta">
              Start Learning Now
            </button>
          </div>
        </section>
      </div>
    `;
  }

  bindEvents() {
    // Start journey buttons
    const startJourneyBtns = DOM.$$('#start-journey, #start-journey-cta', this.container);
    startJourneyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.startJourney();
      });
    });

    // Learn more button
    const learnMoreBtn = DOM.$('#learn-more', this.container);
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', () => {
        window.location.hash = '#/about';
      });
    }

    // Realm preview cards
    const realmPreviews = DOM.$$('.realm-preview', this.container);
    realmPreviews.forEach(preview => {
      preview.addEventListener('click', () => {
        const realmId = preview.dataset.realm;
        window.location.hash = `#/realm/${realmId}`;
      });

      // Add hover effects
      preview.addEventListener('mouseenter', () => {
        Animation.scaleUp(preview, 1.05);
      });

      preview.addEventListener('mouseleave', () => {
        Animation.scaleUp(preview, 1);
      });
    });

    // Feature cards hover effects
    const featureCards = DOM.$$('.feature-card', this.container);
    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        Animation.slideUp(card, -5);
      });

      card.addEventListener('mouseleave', () => {
        Animation.slideUp(card, 0);
      });
    });
  }

  startAnimations() {
    // Animate floating elements
    this.animateFloatingElements();

    // Animate stats counter
    this.animateStatsCounter();

    // Stagger animate feature cards
    this.staggerAnimateFeatures();
  }

  animateFloatingElements() {
    const floatingElements = DOM.$$('.float-item', this.container);

    floatingElements.forEach((element, index) => {
      const delay = index * 1000;
      const duration = 3000 + (index * 500);

      setInterval(() => {
        Animation.float(element, 10, duration);
      }, duration + delay);
    });
  }

  animateStatsCounter() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.countUpStats();
          observer.unobserve(entry.target);
        }
      });
    });

    const statsSection = DOM.$('.stats-section', this.container);
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  countUpStats() {
    const totalLearnersEl = DOM.$('#total-learners', this.container);
    if (totalLearnersEl) {
      Animation.countUp(totalLearnersEl, 0, 12847, 2000);
    }
  }

  staggerAnimateFeatures() {
    const featureCards = DOM.$$('.feature-card', this.container);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          featureCards.forEach((card, index) => {
            setTimeout(() => {
              Animation.fadeInUp(card);
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    });

    const featuresSection = DOM.$('.features-section', this.container);
    if (featuresSection) {
      observer.observe(featuresSection);
    }
  }

  startJourney() {
    // Check if user has already started
    const progress = JSON.parse(localStorage.getItem('bitcoinJourneyProgress') || '{}');

    if (progress.currentRealm) {
      // Continue from where they left off
      window.location.hash = `#/realm/${progress.currentRealm}`;
    } else {
      // Start from the beginning
      window.location.hash = '#/realm/1';
    }
  }

    addFeatureInteractions() {
        const features = document.querySelectorAll('.feature-card');
        features.forEach(feature => {
            feature.addEventListener('click', () => {
                const featureType = feature.dataset.feature;
                this.showFeatureModal(featureType);
            });
        });
    }

    showFeatureModal(featureType) {
        const modalContent = this.getFeatureModalContent(featureType);
        const modal = document.createElement('div');
        modal.className = 'feature-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                ${modalContent}
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                modal.remove();
            }
        });
    }

    getFeatureModalContent(featureType) {
        const content = {
            story: `
                <h3>🌍 Immersive Storytelling</h3>
                <p>Journey with Asha through different realms, each representing key aspects of Bitcoin and financial freedom.</p>
                <ul>
                    <li>Rich African cultural narratives</li>
                    <li>Character-driven learning experience</li>
                    <li>Progressive story that unfolds with your learning</li>
                </ul>
            `,
            interactive: `
                <h3>🎮 Interactive Simulations</h3>
                <p>Learn by doing with hands-on simulations that make complex concepts clear.</p>
                <ul>
                    <li>Bitcoin mining simulations</li>
                    <li>Lightning Network demonstrations</li>
                    <li>Privacy and security scenarios</li>
                    <li>Economic model explorations</li>
                </ul>
            `,
            adaptive: `
                <h3>🎯 Adaptive Learning</h3>
                <p>The journey adapts to your pace and learning style.</p>
                <ul>
                    <li>Personalized content recommendations</li>
                    <li>Difficulty adjustment based on progress</li>
                    <li>Multiple learning paths</li>
                </ul>
            `,
            community: `
                <h3>👥 Community Learning</h3>
                <p>Connect with other learners and share your journey.</p>
                <ul>
                    <li>Discussion forums for each realm</li>
                    <li>Peer learning opportunities</li>
                    <li>Mentorship programs</li>
                </ul>
            `
        };

        return content[featureType] || '<p>Feature information coming soon...</p>';
    }

    addRealmHoverEffects() {
        const realmCards = document.querySelectorAll('.realm-card');
        realmCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'var(--shadow-medium)';
            });
        });
    }

    addQuickStartTour() {
        const tourButton = document.getElementById('start-tour');
        if (tourButton) {
            tourButton.addEventListener('click', () => {
                this.startGuidedTour();
            });
        }
    }

    startGuidedTour() {
        const tourSteps = [
            {
                element: '.hero-section',
                title: 'Welcome to Your Journey',
                content: 'This is where your Bitcoin learning adventure begins with Asha as your guide.'
            },
            {
                element: '.stats-section',
                title: 'Track Your Progress',
                content: 'Monitor your learning journey with these progress indicators.'
            },
            {
                element: '.features-section',
                title: 'Learning Features',
                content: 'Discover the different ways you can learn about Bitcoin.'
            },
            {
                element: '.realms-preview',
                title: 'Explore Realms',
                content: 'Each realm teaches different aspects of Bitcoin through African-inspired stories.'
            }
        ];

        this.showTourStep(0, tourSteps);
    }

    showTourStep(stepIndex, steps) {
        if (stepIndex >= steps.length) return;

        const step = steps[stepIndex];
        const element = document.querySelector(step.element);

        if (!element) {
            this.showTourStep(stepIndex + 1, steps);
            return;
        }

        const rect = element.getBoundingClientRect();
        const tooltip = document.createElement('div');
        tooltip.className = 'tour-tooltip';
        tooltip.innerHTML = `
            <div class="tour-content">
                <h4>${step.title}</h4>
                <p>${step.content}</p>
                <div class="tour-navigation">
                    <button class="tour-prev" ${stepIndex === 0 ? 'disabled' : ''}>Previous</button>
                    <span class="tour-progress">${stepIndex + 1} of ${steps.length}</span>
                    <button class="tour-next">${stepIndex === steps.length - 1 ? 'Finish' : 'Next'}</button>
                </div>
            </div>
        `;

        tooltip.style.position = 'fixed';
        tooltip.style.top = `${rect.bottom + 10}px`;
        tooltip.style.left = `${rect.left}px`;
        tooltip.style.zIndex = '10000';

        document.body.appendChild(tooltip);

        // Add highlight to target element
        element.style.position = 'relative';
        element.style.zIndex = '9999';
        element.style.boxShadow = '0 0 0 4px var(--accent-color)';

        // Event listeners for navigation
        tooltip.querySelector('.tour-prev').addEventListener('click', () => {
            this.cleanupTourStep(element, tooltip);
            this.showTourStep(stepIndex - 1, steps);
        });

        tooltip.querySelector('.tour-next').addEventListener('click', () => {
            this.cleanupTourStep(element, tooltip);
            if (stepIndex === steps.length - 1) {
                this.completeTour();
            } else {
                this.showTourStep(stepIndex + 1, steps);
            }
        });

        // Click outside to close
        const closeHandler = (e) => {
            if (!tooltip.contains(e.target)) {
                this.cleanupTourStep(element, tooltip);
                document.removeEventListener('click', closeHandler);
            }
        };

        setTimeout(() => {
            document.addEventListener('click', closeHandler);
        }, 100);
    }

    cleanupTourStep(element, tooltip) {
        element.style.position = '';
        element.style.zIndex = '';
        element.style.boxShadow = '';
        tooltip.remove();
    }

    completeTour() {
        // Show completion message
        const completion = document.createElement('div');
        completion.className = 'tour-completion';
        completion.innerHTML = `
            <div class="completion-content">
                <h3>🎉 Tour Complete!</h3>
                <p>You're ready to begin your Bitcoin learning journey. Start with Realm 1: Origins!</p>
                <button onclick="window.location.hash = '#/realm/1'">Start Learning</button>
            </div>
        `;

        document.body.appendChild(completion);

        setTimeout(() => {
            completion.remove();
        }, 5000);
    }

    addRecentActivity() {
        const state = window.AppState?.getState() || {};
        const recentMissions = state.progress?.completedMissions?.slice(-3) || [];

        if (recentMissions.length > 0) {
            const activitySection = document.createElement('section');
            activitySection.className = 'recent-activity';
            activitySection.innerHTML = `
                <h2>Recent Activity</h2>
                <div class="activity-list">
                    ${recentMissions.map(mission => `
                        <div class="activity-item">
                            <span class="activity-icon">✅</span>
                            <span class="activity-text">Completed Mission ${mission}</span>
                            <span class="activity-time">Recently</span>
                        </div>
                    `).join('')}
                </div>
            `;

            const pageContent = document.querySelector('.page-content');
            pageContent.appendChild(activitySection);
        }
    }

    addDailyChallenge() {
        const challenges = [
            "Learn about the double-spending problem",
            "Explore how mining secures the network",
            "Understand Lightning Network benefits",
            "Discover Bitcoin's inflation schedule",
            "Learn about digital signatures"
        ];

        const today = new Date().getDay();
        const dailyChallenge = challenges[today % challenges.length];

        const challengeSection = document.createElement('section');
        challengeSection.className = 'daily-challenge';
        challengeSection.innerHTML = `
            <h2>Daily Challenge</h2>
            <div class="challenge-card">
                <div class="challenge-icon">🎯</div>
                <div class="challenge-content">
                    <h3>Today's Focus</h3>
                    <p>${dailyChallenge}</p>
                    <button class="challenge-button">Accept Challenge</button>
                </div>
            </div>
        `;

        const pageContent = document.querySelector('.page-content');
        pageContent.appendChild(challengeSection);

        challengeSection.querySelector('.challenge-button').addEventListener('click', () => {
            window.location.hash = '#/realms';
        });
    }

    animateStatsOnScroll() {
        const statsCards = document.querySelectorAll('.stat-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const value = card.querySelector('.stat-value');
                    const targetValue = parseInt(value.textContent);

                    this.animateCounter(value, 0, targetValue, 1000);
                }
            });
        });

        statsCards.forEach(card => observer.observe(card));
    }

    animateCounter(element, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = start + (range * this.easeOutExpo(progress));
            element.textContent = Math.floor(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = end;
            }
        };

        requestAnimationFrame(animate);
    }

    easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    unmount() {
        // Clean up event listeners
        const statsCards = document.querySelectorAll('.stat-card');
        statsCards.forEach(card => {
            card.removeEventListener('mouseenter', () => {});
            card.removeEventListener('mouseleave', () => {});
        });

        // Clean up modals and tours
        const modals = document.querySelectorAll('.feature-modal, .tour-tooltip, .tour-completion');
        modals.forEach(modal => modal.remove());
    }
}