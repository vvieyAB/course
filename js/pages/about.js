
/**
 * About Page
 * Information about the Bitcoin Learning Journey
 */

import { DOM, Animation } from '../utils.js';

export default class AboutPage {
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
      <div class="about-page">
        <header class="about-header">
          <div class="hero-section">
            <h1>About Asha's Bitcoin Journey</h1>
            <p class="hero-subtitle">
              An immersive, story-driven educational experience that teaches Bitcoin 
              through African-inspired narratives and interactive learning.
            </p>
          </div>
        </header>

        <main class="about-content">
          <section class="mission-section">
            <div class="section-header">
              <h2>Our Mission</h2>
              <div class="mission-icon">🌍</div>
            </div>
            <div class="mission-content">
              <p>
                We believe that financial education should be accessible, engaging, and culturally relevant. 
                Through Asha's journey, we're creating a new paradigm for learning about Bitcoin that 
                honors African heritage while teaching cutting-edge technology.
              </p>
              
              <div class="mission-pillars">
                <div class="pillar">
                  <h3>🎭 Cultural Storytelling</h3>
                  <p>Learning through rich African narratives and traditional wisdom</p>
                </div>
                <div class="pillar">
                  <h3>🧪 Interactive Learning</h3>
                  <p>Hands-on simulations and engaging activities that make concepts stick</p>
                </div>
                <div class="pillar">
                  <h3>🌱 Progressive Growth</h3>
                  <p>Building knowledge step-by-step with clear milestones and achievements</p>
                </div>
                <div class="pillar">
                  <h3>🤝 Community Focus</h3>
                  <p>Understanding Bitcoin's potential for financial inclusion and empowerment</p>
                </div>
              </div>
            </div>
          </section>

          <section class="story-section">
            <div class="section-header">
              <h2>The Story Behind the Journey</h2>
            </div>
            <div class="story-content">
              <div class="story-text">
                <p>
                  Asha's Bitcoin Journey was born from a simple observation: traditional financial 
                  education often feels disconnected from people's lived experiences, especially 
                  in communities where oral tradition and storytelling remain powerful teaching tools.
                </p>
                <p>
                  By weaving Bitcoin education into African-inspired stories, we're not just teaching 
                  about technology – we're connecting learners to the deeper principles of value, 
                  exchange, and community that have guided African societies for millennia.
                </p>
                <p>
                  Each realm in Asha's journey represents both a technical aspect of Bitcoin and 
                  a fundamental human experience: the origins of value, the importance of privacy, 
                  the power of consensus, and the promise of financial sovereignty.
                </p>
              </div>
              <div class="story-visual">
                <img src="/public/assets/characters/asha.svg" alt="Asha" class="asha-illustration">
              </div>
            </div>
          </section>

          <section class="approach-section">
            <div class="section-header">
              <h2>Our Educational Approach</h2>
            </div>
            <div class="approach-grid">
              <div class="approach-item">
                <div class="approach-icon">📚</div>
                <h3>Story-First Learning</h3>
                <p>
                  Every concept is introduced through narrative, making abstract ideas 
                  concrete and memorable through character-driven experiences.
                </p>
              </div>
              
              <div class="approach-item">
                <div class="approach-icon">🎮</div>
                <h3>Interactive Simulations</h3>
                <p>
                  Complex Bitcoin concepts become tangible through hands-on simulations 
                  that let learners experiment and discover.
                </p>
              </div>
              
              <div class="approach-item">
                <div class="approach-icon">🏆</div>
                <h3>Achievement-Based Progress</h3>
                <p>
                  Clear milestones and rewards system that motivates continued learning 
                  and celebrates mastery of key concepts.
                </p>
              </div>
              
              <div class="approach-item">
                <div class="approach-icon">🔄</div>
                <h3>Adaptive Difficulty</h3>
                <p>
                  Content adjusts to learner pace and understanding, ensuring optimal 
                  challenge without overwhelming complexity.
                </p>
              </div>
              
              <div class="approach-item">
                <div class="approach-icon">🌐</div>
                <h3>Cultural Context</h3>
                <p>
                  Bitcoin concepts are taught through the lens of African culture, 
                  trade history, and traditional approaches to value and exchange.
                </p>
              </div>
              
              <div class="approach-item">
                <div class="approach-icon">🤝</div>
                <h3>Community Connection</h3>
                <p>
                  Emphasis on Bitcoin's potential for community empowerment and 
                  financial inclusion in developing economies.
                </p>
              </div>
            </div>
          </section>

          <section class="impact-section">
            <div class="section-header">
              <h2>Our Impact</h2>
            </div>
            <div class="impact-stats">
              <div class="stat-card">
                <div class="stat-number" id="learners-count">12,847</div>
                <div class="stat-label">Active Learners</div>
                <div class="stat-description">People actively learning Bitcoin through Asha's journey</div>
              </div>
              
              <div class="stat-card">
                <div class="stat-number">54</div>
                <div class="stat-label">Countries</div>
                <div class="stat-description">Learners from around the world, with strong African representation</div>
              </div>
              
              <div class="stat-card">
                <div class="stat-number">96%</div>
                <div class="stat-label">Completion Rate</div>
                <div class="stat-description">Of learners who complete Realm 1 continue to Realm 2</div>
              </div>
              
              <div class="stat-card">
                <div class="stat-number">4.9/5</div>
                <div class="stat-label">User Rating</div>
                <div class="stat-description">Average rating from learner feedback and reviews</div>
              </div>
            </div>
          </section>

          <section class="testimonials-section">
            <div class="section-header">
              <h2>What Learners Say</h2>
            </div>
            <div class="testimonials-grid">
              <div class="testimonial-card">
                <div class="testimonial-content">
                  <p>
                    "This is the first time I've understood Bitcoin in a way that feels 
                    connected to my culture and experience. Asha's story made everything click."
                  </p>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">KA</div>
                  <div class="author-info">
                    <strong>Kwame Asante</strong>
                    <span>Software Developer, Ghana</span>
                  </div>
                </div>
              </div>
              
              <div class="testimonial-card">
                <div class="testimonial-content">
                  <p>
                    "The simulations are incredible. I actually felt like I was mining Bitcoin 
                    and understood the energy and security trade-offs for the first time."
                  </p>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">SM</div>
                  <div class="author-info">
                    <strong>Sarah Mwangi</strong>
                    <span>Economics Student, Kenya</span>
                  </div>
                </div>
              </div>
              
              <div class="testimonial-card">
                <div class="testimonial-content">
                  <p>
                    "As an educator, I'm impressed by how this platform makes complex 
                    concepts accessible while respecting our African heritage."
                  </p>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">IT</div>
                  <div class="author-info">
                    <strong>Ibrahim Tanko</strong>
                    <span>Teacher, Nigeria</span>
                  </div>
                </div>
              </div>
              
              <div class="testimonial-card">
                <div class="testimonial-content">
                  <p>
                    "The progressive learning approach helped me go from complete beginner 
                    to confidently explaining Bitcoin to my family and friends."
                  </p>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">ZN</div>
                  <div class="author-info">
                    <strong>Zara Ndiaye</strong>
                    <span>Entrepreneur, Senegal</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="team-section">
            <div class="section-header">
              <h2>Our Team</h2>
            </div>
            <div class="team-content">
              <p>
                Asha's Bitcoin Journey is created by a diverse team of educators, developers, 
                and Bitcoin advocates from across Africa and the diaspora. We're united by 
                a shared belief in the power of culturally-relevant education and Bitcoin's 
                potential for financial inclusion.
              </p>
              
              <div class="team-values">
                <div class="value-item">
                  <h4>🌍 Ubuntu Philosophy</h4>
                  <p>"I am because we are" - emphasizing community and interconnectedness</p>
                </div>
                <div class="value-item">
                  <h4>📚 Knowledge Sharing</h4>
                  <p>Making Bitcoin education accessible to everyone, regardless of background</p>
                </div>
                <div class="value-item">
                  <h4>🏗️ Building Bridges</h4>
                  <p>Connecting traditional wisdom with cutting-edge technology</p>
                </div>
                <div class="value-item">
                  <h4>🚀 Continuous Innovation</h4>
                  <p>Always improving our educational methods and content</p>
                </div>
              </div>
            </div>
          </section>

          <section class="future-section">
            <div class="section-header">
              <h2>The Future of Learning</h2>
            </div>
            <div class="future-content">
              <p>
                We're just getting started. Our roadmap includes expanding Asha's journey 
                with new realms, adding more languages (starting with Swahili, Yoruba, and Amharic), 
                and developing teacher resources for classroom use.
              </p>
              
              <div class="roadmap-items">
                <div class="roadmap-item">
                  <div class="roadmap-icon">🌐</div>
                  <h4>Multi-Language Support</h4>
                  <p>Bringing Bitcoin education to learners in their native languages</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-icon">🏫</div>
                  <h4>Educator Resources</h4>
                  <p>Tools and curricula for teachers to use in classrooms</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-icon">📱</div>
                  <h4>Mobile App</h4>
                  <p>Native mobile experience for learning on the go</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-icon">🤝</div>
                  <h4>Community Features</h4>
                  <p>Discussion forums, study groups, and peer learning</p>
                </div>
              </div>
            </div>
          </section>

          <section class="cta-section">
            <div class="cta-content">
              <h2>Ready to Begin Your Journey?</h2>
              <p>
                Join thousands of learners discovering Bitcoin through Asha's eyes. 
                Start your journey today and become part of the financial future.
              </p>
              <div class="cta-actions">
                <button class="btn btn-primary btn-large" id="start-journey">
                  Start Learning
                </button>
                <button class="btn btn-secondary btn-large" id="view-realms">
                  Explore Realms
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    `;
  }

  bindEvents() {
    // Start journey button
    const startJourneyBtn = DOM.$('#start-journey', this.container);
    if (startJourneyBtn) {
      startJourneyBtn.addEventListener('click', () => {
        window.location.hash = '#/realm/1';
      });
    }

    // View realms button
    const viewRealmsBtn = DOM.$('#view-realms', this.container);
    if (viewRealmsBtn) {
      viewRealmsBtn.addEventListener('click', () => {
        window.location.hash = '#/realms';
      });
    }

    // Add scroll-triggered animations
    this.setupScrollAnimations();
  }

  startAnimations() {
    // Animate stats counter
    this.animateStatsCounter();
    
    // Stagger animate approach items
    this.staggerAnimateItems();
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

    const statsSection = DOM.$('.impact-stats', this.container);
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  countUpStats() {
    const learnersEl = DOM.$('#learners-count', this.container);
    if (learnersEl) {
      Animation.countUp(learnersEl, 0, 12847, 2000);
    }
  }

  staggerAnimateItems() {
    const approachItems = DOM.$$('.approach-item', this.container);
    const roadmapItems = DOM.$$('.roadmap-item', this.container);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.classList.contains('approach-grid') ? approachItems : roadmapItems;
          items.forEach((item, index) => {
            setTimeout(() => {
              Animation.fadeInUp(item);
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    });

    const approachGrid = DOM.$('.approach-grid', this.container);
    const roadmapContainer = DOM.$('.roadmap-items', this.container);
    
    if (approachGrid) observer.observe(approachGrid);
    if (roadmapContainer) observer.observe(roadmapContainer);
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all major sections
    const sections = DOM.$$('section', this.container);
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  unmount() {
    // Clean up any intervals or observers if needed
  }
}
