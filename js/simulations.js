
/**
 * Interactive Simulations
 * Educational simulations converted from React to vanilla JS
 */

import { DOM, Animation, Format } from './utils.js';
import { Toast } from './components.js';
import appState from './state.js';

// Base Simulation class
class Simulation {
  constructor(container, options = {}) {
    this.container = container;
    this.options = { ...this.defaultOptions, ...options };
    this.currentStep = 0;
    this.data = {};
    this.init();
  }

  get defaultOptions() {
    return {
      showProgress: true,
      allowSkip: false,
      saveProgress: true
    };
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    // Override in subclasses
  }

  bindEvents() {
    // Override in subclasses
  }

  nextStep() {
    this.currentStep++;
    this.render();
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  }

  complete() {
    if (this.options.saveProgress) {
      this.saveProgress();
    }
    this.onComplete();
  }

  saveProgress() {
    const progress = appState.getState('progress') || {};
    const simulationKey = this.constructor.name;
    progress.simulations = progress.simulations || {};
    progress.simulations[simulationKey] = {
      completed: true,
      data: this.data,
      timestamp: Date.now()
    };
    appState.setState('progress', progress);
  }

  onComplete() {
    new Toast('Simulation completed successfully!', 'success');
  }
}

// Bitcoin Mining Simulation
export class MiningSimulation extends Simulation {
  get defaultOptions() {
    return {
      ...super.defaultOptions,
      difficulty: 1,
      hashRate: 1000,
      blockReward: 6.25
    };
  }

  init() {
    this.miners = [];
    this.blocks = [];
    this.isRunning = false;
    super.init();
  }

  render() {
    this.container.innerHTML = `
      <div class="simulation-container mining-sim">
        <div class="sim-header">
          <h3>Bitcoin Mining Simulation</h3>
          <div class="sim-controls">
            <button class="btn btn-primary" id="start-mining">
              ${this.isRunning ? 'Stop Mining' : 'Start Mining'}
            </button>
            <button class="btn btn-secondary" id="add-miner">Add Miner</button>
          </div>
        </div>
        
        <div class="sim-stats">
          <div class="stat-card">
            <label>Network Hash Rate</label>
            <span>${Format.number(this.getTotalHashRate())} H/s</span>
          </div>
          <div class="stat-card">
            <label>Difficulty</label>
            <span>${this.options.difficulty}</span>
          </div>
          <div class="stat-card">
            <label>Blocks Mined</label>
            <span>${this.blocks.length}</span>
          </div>
        </div>
        
        <div class="miners-grid">
          ${this.renderMiners()}
        </div>
        
        <div class="blockchain-view">
          <h4>Blockchain</h4>
          <div class="blocks-container">
            ${this.renderBlocks()}
          </div>
        </div>
      </div>
    `;
  }

  renderMiners() {
    return this.miners.map((miner, index) => `
      <div class="miner-card" data-miner="${index}">
        <h5>Miner ${index + 1}</h5>
        <div class="miner-stats">
          <div>Hash Rate: ${Format.number(miner.hashRate)} H/s</div>
          <div>Blocks Found: ${miner.blocksFound}</div>
          <div>Status: ${miner.mining ? 'Mining' : 'Idle'}</div>
        </div>
        <div class="miner-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${miner.progress}%"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderBlocks() {
    return this.blocks.map((block, index) => `
      <div class="block" data-block="${index}">
        <div class="block-header">Block ${block.height}</div>
        <div class="block-info">
          <div>Miner: ${block.miner}</div>
          <div>Timestamp: ${Format.date(block.timestamp)}</div>
          <div>Hash: ${block.hash.substring(0, 10)}...</div>
        </div>
      </div>
    `).join('');
  }

  bindEvents() {
    const startBtn = DOM.$('#start-mining', this.container);
    const addBtn = DOM.$('#add-miner', this.container);

    startBtn.addEventListener('click', () => this.toggleMining());
    addBtn.addEventListener('click', () => this.addMiner());
  }

  toggleMining() {
    this.isRunning = !this.isRunning;
    
    if (this.isRunning) {
      this.startMining();
    } else {
      this.stopMining();
    }
    
    this.render();
  }

  startMining() {
    this.miners.forEach(miner => {
      miner.mining = true;
      this.minePow(miner);
    });
  }

  stopMining() {
    this.miners.forEach(miner => {
      miner.mining = false;
      if (miner.interval) {
        clearInterval(miner.interval);
      }
    });
  }

  addMiner() {
    const miner = {
      id: this.miners.length,
      hashRate: 1000 + Math.random() * 9000,
      blocksFound: 0,
      mining: false,
      progress: 0,
      interval: null
    };
    
    this.miners.push(miner);
    this.render();
  }

  minePow(miner) {
    miner.interval = setInterval(() => {
      if (!miner.mining) return;
      
      miner.progress += (miner.hashRate / 100000) * 10;
      
      if (miner.progress >= 100) {
        this.foundBlock(miner);
        miner.progress = 0;
      }
      
      this.updateMinerDisplay(miner);
    }, 100);
  }

  foundBlock(miner) {
    const block = {
      height: this.blocks.length,
      miner: `Miner ${miner.id + 1}`,
      timestamp: Date.now(),
      hash: this.generateHash(),
      reward: this.options.blockReward
    };
    
    this.blocks.push(block);
    miner.blocksFound++;
    
    new Toast(`Block ${block.height} found by ${block.miner}!`, 'success', 3000);
    
    // Reset all miners
    this.miners.forEach(m => m.progress = 0);
    
    this.render();
  }

  updateMinerDisplay(miner) {
    const minerCard = DOM.$(`[data-miner="${miner.id}"]`, this.container);
    if (minerCard) {
      const progressBar = DOM.$('.progress-fill', minerCard);
      if (progressBar) {
        progressBar.style.width = `${miner.progress}%`;
      }
    }
  }

  getTotalHashRate() {
    return this.miners.reduce((total, miner) => total + miner.hashRate, 0);
  }

  generateHash() {
    return Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  }
}

// Lightning Network Simulation
export class LightningSimulation extends Simulation {
  init() {
    this.nodes = [];
    this.channels = [];
    this.payments = [];
    super.init();
    this.createInitialNetwork();
  }

  createInitialNetwork() {
    // Create initial nodes
    const nodeNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve'];
    nodeNames.forEach((name, index) => {
      this.nodes.push({
        id: index,
        name,
        x: 100 + (index * 150),
        y: 200 + Math.sin(index) * 50,
        balance: 1000000, // in satoshis
        channels: []
      });
    });

    // Create initial channels
    this.createChannel(0, 1, 500000); // Alice - Bob
    this.createChannel(1, 2, 300000); // Bob - Carol
    this.createChannel(2, 3, 400000); // Carol - Dave
    this.createChannel(0, 4, 200000); // Alice - Eve
    this.createChannel(4, 3, 350000); // Eve - Dave
  }

  render() {
    this.container.innerHTML = `
      <div class="simulation-container lightning-sim">
        <div class="sim-header">
          <h3>Lightning Network Simulation</h3>
          <div class="sim-controls">
            <select id="sender-select">
              ${this.nodes.map(node => `<option value="${node.id}">${node.name}</option>`).join('')}
            </select>
            <span>→</span>
            <select id="receiver-select">
              ${this.nodes.map(node => `<option value="${node.id}">${node.name}</option>`).join('')}
            </select>
            <input type="number" id="amount-input" placeholder="Amount (sats)" min="1000" max="100000">
            <button class="btn btn-primary" id="send-payment">Send Payment</button>
          </div>
        </div>
        
        <div class="network-visualization">
          <svg width="100%" height="400" class="network-svg">
            ${this.renderChannels()}
            ${this.renderNodes()}
          </svg>
        </div>
        
        <div class="payment-history">
          <h4>Payment History</h4>
          <div class="payments-list">
            ${this.renderPayments()}
          </div>
        </div>
      </div>
    `;
  }

  renderNodes() {
    return this.nodes.map(node => `
      <g class="node" data-node="${node.id}">
        <circle cx="${node.x}" cy="${node.y}" r="30" fill="#007acc" stroke="#fff" stroke-width="2"/>
        <text x="${node.x}" y="${node.y}" text-anchor="middle" dy="0.35em" fill="white" font-size="12">
          ${node.name}
        </text>
        <text x="${node.x}" y="${node.y + 50}" text-anchor="middle" font-size="10" fill="#666">
          ${Format.number(node.balance)} sats
        </text>
      </g>
    `).join('');
  }

  renderChannels() {
    return this.channels.map(channel => {
      const nodeA = this.nodes[channel.nodeA];
      const nodeB = this.nodes[channel.nodeB];
      return `
        <line x1="${nodeA.x}" y1="${nodeA.y}" x2="${nodeB.x}" y2="${nodeB.y}" 
              stroke="#007acc" stroke-width="3" opacity="0.6"/>
        <text x="${(nodeA.x + nodeB.x) / 2}" y="${(nodeA.y + nodeB.y) / 2 - 10}" 
              text-anchor="middle" font-size="10" fill="#333">
          ${Format.number(channel.capacity)} sats
        </text>
      `;
    }).join('');
  }

  renderPayments() {
    return this.payments.slice(-10).map(payment => `
      <div class="payment-item ${payment.status}">
        <span>${payment.sender} → ${payment.receiver}</span>
        <span>${Format.number(payment.amount)} sats</span>
        <span class="status">${payment.status}</span>
      </div>
    `).join('');
  }

  bindEvents() {
    const sendBtn = DOM.$('#send-payment', this.container);
    sendBtn.addEventListener('click', () => this.sendPayment());
  }

  sendPayment() {
    const senderSelect = DOM.$('#sender-select', this.container);
    const receiverSelect = DOM.$('#receiver-select', this.container);
    const amountInput = DOM.$('#amount-input', this.container);
    
    const senderId = parseInt(senderSelect.value);
    const receiverId = parseInt(receiverSelect.value);
    const amount = parseInt(amountInput.value);
    
    if (senderId === receiverId) {
      new Toast('Cannot send payment to yourself!', 'error');
      return;
    }
    
    if (!amount || amount < 1000) {
      new Toast('Amount must be at least 1000 satoshis', 'error');
      return;
    }
    
    const route = this.findRoute(senderId, receiverId, amount);
    
    if (route) {
      this.processPayment(senderId, receiverId, amount, route);
    } else {
      this.payments.push({
        sender: this.nodes[senderId].name,
        receiver: this.nodes[receiverId].name,
        amount,
        status: 'failed',
        timestamp: Date.now(),
        reason: 'No route found'
      });
      new Toast('Payment failed: No route found', 'error');
    }
    
    this.render();
  }

  findRoute(senderId, receiverId, amount) {
    // Simple pathfinding - in reality this would be more complex
    const visited = new Set();
    const queue = [[senderId]];
    
    while (queue.length > 0) {
      const path = queue.shift();
      const currentNode = path[path.length - 1];
      
      if (currentNode === receiverId) {
        return path;
      }
      
      if (visited.has(currentNode)) continue;
      visited.add(currentNode);
      
      const nodeChannels = this.channels.filter(channel => 
        (channel.nodeA === currentNode || channel.nodeB === currentNode) &&
        channel.capacity >= amount
      );
      
      nodeChannels.forEach(channel => {
        const nextNode = channel.nodeA === currentNode ? channel.nodeB : channel.nodeA;
        if (!visited.has(nextNode)) {
          queue.push([...path, nextNode]);
        }
      });
    }
    
    return null;
  }

  processPayment(senderId, receiverId, amount, route) {
    // Simulate payment processing
    this.payments.push({
      sender: this.nodes[senderId].name,
      receiver: this.nodes[receiverId].name,
      amount,
      status: 'success',
      timestamp: Date.now(),
      route: route.map(nodeId => this.nodes[nodeId].name).join(' → ')
    });
    
    new Toast(`Payment of ${Format.number(amount)} sats sent successfully!`, 'success');
  }

  createChannel(nodeAId, nodeBId, capacity) {
    this.channels.push({
      id: this.channels.length,
      nodeA: nodeAId,
      nodeB: nodeBId,
      capacity,
      balanceA: capacity / 2,
      balanceB: capacity / 2
    });
  }
}

// Privacy Simulation
export class PrivacySimulation extends Simulation {
  init() {
    this.scenarios = [
      {
        title: 'Traditional Banking',
        description: 'Using a traditional bank account',
        privacyLevel: 0,
        features: ['KYC Required', 'All transactions monitored', 'Government access', 'Third-party data sharing']
      },
      {
        title: 'Bitcoin (Basic Use)',
        description: 'Using Bitcoin with address reuse',
        privacyLevel: 3,
        features: ['Pseudonymous addresses', 'Public blockchain', 'Address clustering possible', 'IP tracking possible']
      },
      {
        title: 'Bitcoin (Best Practices)',
        description: 'Using Bitcoin with privacy techniques',
        privacyLevel: 7,
        features: ['New address per transaction', 'Tor network usage', 'CoinJoin mixing', 'Hardware wallet']
      },
      {
        title: 'Lightning Network',
        description: 'Using Lightning Network for payments',
        privacyLevel: 8,
        features: ['Off-chain transactions', 'Onion routing', 'Channel privacy', 'Amount obfuscation']
      }
    ];
    
    this.currentScenario = 0;
    super.init();
  }

  render() {
    this.container.innerHTML = `
      <div class="simulation-container privacy-sim">
        <div class="sim-header">
          <h3>Payment Privacy Comparison</h3>
          <div class="scenario-selector">
            ${this.scenarios.map((scenario, index) => `
              <button class="btn ${index === this.currentScenario ? 'btn-primary' : 'btn-secondary'}" 
                      data-scenario="${index}">
                ${scenario.title}
              </button>
            `).join('')}
          </div>
        </div>
        
        <div class="scenario-details">
          ${this.renderScenario(this.scenarios[this.currentScenario])}
        </div>
        
        <div class="privacy-comparison">
          <h4>Privacy Levels Comparison</h4>
          <div class="privacy-chart">
            ${this.renderPrivacyChart()}
          </div>
        </div>
      </div>
    `;
  }

  renderScenario(scenario) {
    return `
      <div class="scenario-card">
        <h4>${scenario.title}</h4>
        <p>${scenario.description}</p>
        
        <div class="privacy-meter">
          <label>Privacy Level: ${scenario.privacyLevel}/10</label>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${scenario.privacyLevel * 10}%; background: ${this.getPrivacyColor(scenario.privacyLevel)}"></div>
          </div>
        </div>
        
        <div class="features-list">
          <h5>Features:</h5>
          <ul>
            ${scenario.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  renderPrivacyChart() {
    return this.scenarios.map(scenario => `
      <div class="privacy-bar">
        <label>${scenario.title}</label>
        <div class="bar-container">
          <div class="bar" style="width: ${scenario.privacyLevel * 10}%; background: ${this.getPrivacyColor(scenario.privacyLevel)}"></div>
          <span class="bar-label">${scenario.privacyLevel}/10</span>
        </div>
      </div>
    `).join('');
  }

  bindEvents() {
    const scenarioButtons = DOM.$$('[data-scenario]', this.container);
    scenarioButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentScenario = parseInt(btn.dataset.scenario);
        this.render();
      });
    });
  }

  getPrivacyColor(level) {
    if (level <= 3) return '#ef4444';
    if (level <= 6) return '#f59e0b';
    return '#10b981';
  }
}

// Export all simulations
export {
  Simulation,
  MiningSimulation,
  LightningSimulation,
  PrivacySimulation
};

export default {
  Simulation,
  MiningSimulation,
  LightningSimulation,
  PrivacySimulation
};
