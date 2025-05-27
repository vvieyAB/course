import React from 'react';

interface Mission {
  id: number;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  contentType: 'comprehensive' | 'practical' | 'technical' | 'final' | 'certificate';
  simulationType?: string;
  quizData?: {
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
  content: string;
  unlocked: boolean;
  completed: boolean;
}

export const realm7Missions: Mission[] = [
  {
    id: 1,
    title: "Comprehensive Review",
    subtitle: "Your Bitcoin Journey So Far",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "Your journey through Bitcoin's realms has equipped you with diverse knowledge. Now, solidify your understanding through comprehensive review and practical application."
      ),
      React.createElement("h3", { className: "text-lg font-semibold mt-6 mb-2" }, "You'll Review:"),
      React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
        React.createElement("li", null, "The evolution of money and Bitcoin's role"),
        React.createElement("li", null, "Privacy, security, and financial sovereignty"),
        React.createElement("li", null, "Cryptographic foundations"),
        React.createElement("li", null, "Mining and consensus mechanisms"),
        React.createElement("li", null, "Protocol governance and upgrades"),
        React.createElement("li", null, "Real-world applications in Africa")
      )
    ),
    simulationType: "comprehensive",
    quizData: {
      questions: [
        {
          question: "What are the three core functions of money?",
          options: [
            "Medium of exchange, store of value, unit of account",
            "Spending, saving, borrowing",
            "Gold, silver, copper",
            "Mining, trading, holding"
          ],
          correctAnswer: 0
        },
        {
          question: "Which cryptographic primitive enables Bitcoin transaction signatures?",
          options: [
            "SHA-256",
            "ECDSA",
            "AES",
            "RSA"
          ],
          correctAnswer: 1
        }
      ]
    },
    content: `
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0; text-align: center;">Your Complete Bitcoin Journey</h2>
        
        <p style="margin-bottom: 16px;">Congratulations on reaching the Summit of Knowledge! This comprehensive review will help consolidate your understanding of Bitcoin's foundational concepts, technical aspects, and real-world implications that you've explored throughout your journey.</p>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
          <p style="font-size: 18px; font-weight: bold; margin: 0; color: #67e8f9;">Bitcoin is a revolutionary technology that combines cryptography, distributed systems, economics, and game theory to create a secure, censorship-resistant monetary network</p>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">Realm 1: The Origins of Money</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Key Concepts</h3>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>The evolution from barter to commodity and fiat money</li>
              <li>Money's essential functions: medium of exchange, store of value, unit of account</li>
              <li>The properties of sound money: durability, portability, divisibility, fungibility, scarcity</li>
              <li>Historical examples of money from different African cultures</li>
              <li>How hyperinflation destroys value and undermines financial systems</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Bitcoin's Relevance</h3>
            <p style="margin-bottom: 0;">Bitcoin addresses the historical challenges of money by providing:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Digital scarcity through a fixed supply of 21 million</li>
              <li>Perfect divisibility down to 1/100,000,000 (one satoshi)</li>
              <li>Borderless transferability without permission</li>
              <li>Resistance to censorship and confiscation</li>
              <li>Protection against arbitrary inflation and debasement</li>
            </ul>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <p style="margin: 0; font-style: italic;">Bitcoin represents the first successful implementation of digital scarcity without requiring trust in a central authority, solving the "double-spending problem" that prevented previous digital money systems from working.</p>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">Realm 2: The Central Citadel</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Key Concepts</h3>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Centralized vs. decentralized financial systems</li>
              <li>Privacy concerns in traditional financial infrastructure</li>
              <li>How surveillance capitalism commoditizes personal data</li>
              <li>Central Bank Digital Currencies (CBDCs) and their implications</li>
              <li>The balance between convenience and sovereignty</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Bitcoin's Relevance</h3>
            <p style="margin-bottom: 0;">Bitcoin offers an alternative to centralized control through:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Permissionless participation in a global network</li>
              <li>Pseudonymous transactions that increase privacy</li>
              <li>Self-custody options that eliminate counterparty risk</li>
              <li>Resistance to arbitrary rules and restrictions</li>
              <li>Protection against financial censorship and monitoring</li>
            </ul>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <p style="margin: 0; font-style: italic;">The importance of Bitcoin's decentralization cannot be overstated - it creates a financial system where rules are enforced by mathematics and consensus rather than by corruptible institutions.</p>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">Realm 3: The Forest of Sparks</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Key Concepts</h3>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Bitcoin's origin with Satoshi Nakamoto's 2008 whitepaper</li>
              <li>The cypherpunk movement and digital privacy advocates</li>
              <li>Previous digital currency attempts (DigiCash, e-gold, etc.)</li>
              <li>Cryptographic primitives: hash functions and digital signatures</li>
              <li>The blockchain as a chronological, immutable ledger</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Technical Foundation</h3>
            <p style="margin-bottom: 0;">Bitcoin's technical innovation combines:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>SHA-256 hash functions to create unique digital fingerprints</li>
              <li>Public-key cryptography for secure ownership verification</li>
              <li>Digital signatures to prove transaction authorization</li>
              <li>Distributed ledger technology for transparent record-keeping</li>
              <li>Peer-to-peer network architecture for direct value transfer</li>
            </ul>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <p style="margin: 0; font-style: italic;">Bitcoin represents the synthesis of decades of cryptographic research and experimentation - it didn't emerge from nowhere but built upon a foundation of prior work in digital currency and distributed systems.</p>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">Realm 4: The Mountain Forge</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Key Concepts</h3>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Mining as the process of transaction validation and block creation</li>
              <li>Proof-of-Work (PoW) as Bitcoin's consensus mechanism</li>
              <li>The halving schedule and controlled supply issuance</li>
              <li>Difficulty adjustment to maintain consistent block times</li>
              <li>Energy consumption and incentive alignment</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Security Model</h3>
            <p style="margin-bottom: 0;">Bitcoin's security derives from:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Economic incentives that make honesty more profitable than cheating</li>
              <li>Computational work that makes attacking the network prohibitively expensive</li>
              <li>Decentralized validation by thousands of independent nodes</li>
              <li>The difficulty adjustment mechanism that maintains security regardless of hash rate</li>
              <li>Game theory that aligns miners' profit motives with network security</li>
            </ul>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <p style="margin: 0; font-style: italic;">Mining transforms electricity into security, creating an immutable history that becomes exponentially more difficult to change as time passes - this is Bitcoin's key innovation for establishing trust without authorities.</p>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">Realm 5: The Council of Forks</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Key Concepts</h3>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Bitcoin's governance model through distributed consensus</li>
              <li>Soft forks vs. hard forks as mechanism for protocol upgrades</li>
              <li>Bitcoin Improvement Proposals (BIPs) process</li>
              <li>The balance of power between developers, miners, users, and businesses</li>
              <li>Historical upgrades and the conservative approach to changes</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Governance in Practice</h3>
            <p style="margin-bottom: 0;">Bitcoin's resilience comes from:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>The requirement for broad consensus before implementing changes</li>
              <li>The ability for users to reject unwanted changes by not upgrading</li>
              <li>The focus on backward compatibility to prevent network fragmentation</li>
              <li>Open development processes with multiple independent reviewers</li>
              <li>The principle of "rough consensus" requiring substantial agreement</li>
            </ul>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <p style="margin: 0; font-style: italic;">Bitcoin's governance might seem slow and conservative, but this resistance to change is a feature, not a bug - it ensures that only thoroughly vetted improvements with broad support are implemented.</p>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">Realm 6: The Ubuntu Village</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Key Concepts</h3>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Real-world Bitcoin applications across Africa</li>
              <li>Bitcoin's role in facilitating low-cost remittances</li>
              <li>Protection against currency devaluation and inflation</li>
              <li>Financial inclusion for the unbanked and underbanked</li>
              <li>The Lightning Network for fast, low-fee transactions</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Impact in Africa</h3>
            <p style="margin-bottom: 0;">Bitcoin is making a difference through:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Enabling cross-border payments without traditional banking infrastructure</li>
              <li>Providing an alternative to unstable local currencies</li>
              <li>Creating entrepreneurial opportunities in Bitcoin services</li>
              <li>Facilitating direct international trade without intermediaries</li>
              <li>Supporting community projects and educational initiatives</li>
            </ul>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <p style="margin: 0; font-style: italic;">The principles of Ubuntu - "I am because we are" - align with Bitcoin's network effects, where the system becomes stronger and more valuable as more people participate in it.</p>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.07); border-radius: 8px; padding: 20px;">
        <h2 style="color: #22d3ee; margin-top: 0; text-align: center;">Bringing It All Together</h2>
        
        <p style="margin-bottom: 16px;">Bitcoin represents a synthesis of multiple disciplines and addresses challenges that have persisted throughout monetary history. Its lasting impact comes from combining:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 16px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; margin-bottom: 8px;">📜</div>
            <h3 style="color: #67e8f9; margin: 0 0 8px 0;">Historical Context</h3>
            <p style="margin: 0; font-size: 14px;">Bitcoin addresses the shortcomings of previous monetary systems, from commodity money to fiat currencies</p>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; margin-bottom: 8px;">🔐</div>
            <h3 style="color: #67e8f9; margin: 0 0 8px 0;">Technical Innovation</h3>
            <p style="margin: 0; font-size: 14px;">A revolutionary combination of cryptography, distributed systems, and economic incentives</p>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; margin-bottom: 8px;">⚖️</div>
            <h3 style="color: #67e8f9; margin: 0 0 8px 0;">Governance Innovation</h3>
            <p style="margin: 0; font-size: 14px;">A new model for reaching consensus without central authorities or formal governance structures</p>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; margin-bottom: 8px;">🌍</div>
            <h3 style="color: #67e8f9; margin: 0 0 8px 0;">Global Impact</h3>
            <p style="margin: 0; font-size: 14px;">Practical solutions to real-world problems of financial access, sovereignty, and inclusion</p>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px; text-align: center;">
          <p style="margin: 0; font-style: italic;">Understanding Bitcoin holistically requires appreciating both its technological foundation and its economic, social, and political implications. No single perspective captures its full significance.</p>
        </div>
      </div>
    `,
    contentType: 'comprehensive',
    unlocked: true,
    completed: false
  },
  {
    id: 2,
    title: "Practical Challenges",
    subtitle: "Apply Your Knowledge",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "Put your knowledge into action through real-world scenarios and practical problem-solving."
      )
    ),
    simulationType: "practical",
    quizData: {
      questions: [
        {
          question: "When setting up a Bitcoin node, which network port should be open?",
          options: [
            "8333",
            "3000",
            "80",
            "443"
          ],
          correctAnswer: 0
        },
        {
          question: "What is the recommended backup strategy for a seed phrase?",
          options: [
            "Store a digital copy on multiple cloud services",
            "Store physical copies in multiple secure locations",
            "Memorize it and don't write it down",
            "Share different parts with trusted family members via email"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of these is NOT a recommended practice for a merchant accepting Bitcoin?",
          options: [
            "Using a dedicated device for transactions",
            "Creating a new address for each customer",
            "Storing the majority of funds in cold storage",
            "Keeping private keys on the point-of-sale computer"
          ],
          correctAnswer: 3
        }
      ]
    },
    content: `
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0; text-align: center;">Practical Bitcoin Challenges</h2>
        
        <p style="margin-bottom: 16px;">These practical challenges will test your ability to apply Bitcoin knowledge to real-world scenarios. Each challenge simulates situations you might encounter when using, implementing, or advising on Bitcoin solutions in African contexts.</p>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
          <p style="font-size: 18px; font-weight: bold; margin: 0; color: #67e8f9;">Knowledge becomes valuable when applied to practical real-world challenges</p>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0;">Challenge 1: Business Bitcoin Implementation</h2>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Scenario: Small Business in Ghana</h3>
          <p style="margin-bottom: 10px;">You are consulting for "Accra Artisans," a collective of 15 craftspeople in Ghana who sell handmade goods both locally and to international tourists. They want to start accepting Bitcoin to:</p>
          <ul style="margin-bottom: 0; padding-left: 20px;">
            <li>Reduce transaction fees on international sales</li>
            <li>Protect against cedi inflation</li>
            <li>Attract tech-savvy tourists</li>
            <li>Enable direct online sales to international customers</li>
          </ul>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Your Task: Design a Complete Solution</h3>
            <p style="margin-bottom: 0;">Create a comprehensive Bitcoin implementation that addresses:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Wallet infrastructure (types, backup procedures, security)</li>
              <li>Payment processing workflow</li>
              <li>Staff training requirements</li>
              <li>Risk management strategies</li>
              <li>Optional: Lightning Network integration</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Implementation Guide</h3>
            <p style="margin-bottom: 0;">Your comprehensive solution should include:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li><strong>Hot wallet</strong>: BTCPay Server self-hosted payment processor for daily transactions (under $1,000)</li>
              <li><strong>Cold storage</strong>: Hardware wallet (Trezor/Ledger) with 2-of-3 multisig for business reserves</li>
              <li><strong>Backup protocol</strong>: Seed phrases stored in fireproof, waterproof containers in separate secure locations</li>
              <li><strong>Security policies</strong>: Defined transaction limits, approval workflows, and regular security audits</li>
            </ul>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <h4 style="margin-top: 0; color: #67e8f9;">Practical Considerations:</h4>
          <ul style="margin-bottom: 0; padding-left: 20px;">
            <li><strong>Internet reliability</strong>: Implement offline transaction signing capabilities for periods of network instability</li>
            <li><strong>Exchange rate volatility</strong>: Set up automatic partial conversion to stablecoins or local currency to manage cash flow</li>
            <li><strong>Customer experience</strong>: Create visual guides for tourists explaining the Bitcoin payment process</li>
            <li><strong>Local regulations</strong>: Ensure compliance with Ghana's developing cryptocurrency regulations</li>
          </ul>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0;">Challenge 2: Mining Operation Analysis</h2>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Scenario: Ugandan Hydroelectric Opportunity</h3>
          <p style="margin-bottom: 10px;">A consortium of investors is evaluating the feasibility of establishing a Bitcoin mining operation using excess capacity from a small hydroelectric dam on the Victoria Nile in Uganda. You've been contracted to analyze the viability and design an optimal operation.</p>
          <p style="margin-bottom: 0;"><strong>Key parameters:</strong></p>
          <ul style="margin-bottom: 0; padding-left: 20px;">
            <li>Available power capacity: 1 MW</li>
            <li>Electricity cost: $0.04/kWh</li>
            <li>Current Bitcoin price: $40,000</li>
            <li>Network hashrate: 400 EH/s</li>
            <li>Latest ASIC efficiency: 27 J/TH</li>
          </ul>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Your Task: Comprehensive Analysis</h3>
            <ol style="margin-bottom: 0; padding-left: 20px;">
              <li>Calculate maximum hashrate achievable with available power</li>
              <li>Estimate daily Bitcoin revenue at current difficulty</li>
              <li>Determine operational expenses (power, staffing, maintenance)</li>
              <li>Project ROI timeline for mining equipment</li>
              <li>Assess sustainability benefits vs. traditional mining</li>
              <li>Identify local economic benefits</li>
            </ol>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Detailed Calculations</h3>
            <p style="margin-bottom: 10px;"><strong>Hashrate from 1 MW with 27 J/TH miners:</strong></p>
            <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-bottom: 10px; font-family: monospace;">
              Power (W) / Efficiency (J/TH) = Hashrate (TH/s)<br>
              1,000,000 W / 27 J/TH = 37,037 TH/s (37.04 PH/s)
            </div>
            
            <p style="margin-bottom: 10px;"><strong>Expected daily Bitcoin production:</strong></p>
            <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-bottom: 10px; font-family: monospace;">
              Your hashrate / Network hashrate × 144 blocks × 6.25 BTC<br>
              37.04 PH/s / 400 EH/s × 144 × 6.25 = 0.0856 BTC/day
            </div>
            
            <p style="margin-bottom: 10px;"><strong>Daily revenue at $40,000 per BTC:</strong></p>
            <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; font-family: monospace;">
              0.0856 BTC × $40,000 = $3,424/day
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Operational Considerations</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Daily Expenses</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Electricity: 1 MW × 24h × $0.04/kWh = $960/day</li>
                <li>Staff: $200/day (4 local technicians in rotating shifts)</li>
                <li>Maintenance: $100/day (averaged)</li>
                <li>Internet connectivity: $50/day</li>
                <li><strong>Total daily expenses: $1,310</strong></li>
              </ul>
            </div>
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Profitability</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Daily revenue: $3,424</li>
                <li>Daily expenses: $1,310</li>
                <li><strong>Daily profit: $2,114</strong></li>
                <li>Monthly profit: ~$63,420</li>
                <li>Equipment cost (100 miners): ~$500,000</li>
                <li><strong>ROI period: ~7.9 months</strong></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <h4 style="margin-top: 0; color: #67e8f9;">Local Impact Assessment</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            <div>
              <h5 style="margin-top: 0; font-size: 15px;">Economic Benefits</h5>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Creation of 12 technical jobs (including security)</li>
                <li>Knowledge transfer and technical training</li>
                <li>Improved internet infrastructure benefiting nearby communities</li>
                <li>Utilization of otherwise wasted energy capacity</li>
              </ul>
            </div>
            <div>
              <h5 style="margin-top: 0; font-size: 15px;">Sustainability Advantages</h5>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Zero-carbon mining compared to fossil fuel alternatives</li>
                <li>No intermittency issues (unlike solar or wind power)</li>
                <li>Monetization of renewable energy in remote area</li>
                <li>Heat recovery potential for agricultural applications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0;">Challenge 3: Community Bitcoin Banking</h2>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Scenario: Rural Community in Tanzania</h3>
          <p style="margin-bottom: 10px;">A rural farming community of approximately 2,000 people in Tanzania faces significant challenges with traditional banking:</p>
          <ul style="margin-bottom: 10px; padding-left: 20px;">
            <li>Nearest bank branch is 50 km away</li>
            <li>High remittance fees from family members working in cities</li>
            <li>Limited smartphone penetration (~30% of adults)</li>
            <li>Intermittent 3G connectivity</li>
            <li>Frequent community trading and lending</li>
          </ul>
          <p style="margin-bottom: 0;">The community leaders have approached you to design a Bitcoin-based solution to improve financial access and reduce costs.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Your Task: Community Banking System</h3>
            <p style="margin-bottom: 0;">Design a community-based Bitcoin banking system that:</p>
            <ol style="margin-bottom: 0; padding-left: 20px;">
              <li>Functions with limited connectivity</li>
              <li>Is accessible to non-smartphone users</li>
              <li>Includes appropriate security measures</li>
              <li>Can scale to neighboring communities</li>
              <li>Builds local technical capacity</li>
              <li>Creates sustainable operational model</li>
            </ol>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Implementation Framework</h3>
            <div style="margin-bottom: 0;">
              <p style="margin-bottom: 8px;"><strong>Physical Infrastructure:</strong></p>
              <ul style="margin-bottom: 8px; padding-left: 20px;">
                <li>Solar-powered community Bitcoin center with satellite internet</li>
                <li>Local full node with Lightning capabilities</li>
                <li>Mesh network extending connectivity to key community areas</li>
                <li>Community terminals at local shops and meeting places</li>
              </ul>
              
              <p style="margin-bottom: 8px;"><strong>Access Methods:</strong></p>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>USSD-based transactions for feature phones</li>
                <li>Paper wallets with community support for custody</li>
                <li>Bitcoin vouchers for simple value transfer</li>
                <li>Community representatives for assisted transactions</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Security & Governance Model</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Security Framework</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Community multisig wallet (5-of-9) with trusted members</li>
                <li>Physical security protocols for equipment</li>
                <li>Tiered access system based on transaction sizes</li>
                <li>Regular key rotation and security audits</li>
                <li>Backup node in nearest town with reliable power</li>
              </ul>
            </div>
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Community Governance</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Elected committee overseeing operations</li>
                <li>Transparent fee structure (0.5% for maintenance)</li>
                <li>Regular community updates and training</li>
                <li>Dispute resolution process with community elders</li>
                <li>Record-keeping system for non-blockchain transactions</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <h4 style="margin-top: 0; color: #67e8f9;">Sustainability & Scaling Plan</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            <div>
              <h5 style="margin-top: 0; font-size: 15px;">Economic Model</h5>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Initial equipment funded by NGO grant</li>
                <li>Ongoing costs covered by minimal transaction fees</li>
                <li>Technical support provided by trained local youth</li>
                <li>Additional services (charging, printing) for revenue</li>
                <li>Community contribution system for larger expenses</li>
              </ul>
            </div>
            <div>
              <h5 style="margin-top: 0; font-size: 15px;">Expansion Strategy</h5>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Knowledge transfer program to neighboring villages</li>
                <li>Standardized setup kit for new communities</li>
                <li>Inter-community mesh network to expand coverage</li>
                <li>Regional support team development</li>
                <li>Documentation of successes and lessons learned</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0; text-align: center;">Practical Application Strategy</h2>
        
        <p style="margin-bottom: 16px;">These challenges represent the types of real-world problems that require a holistic approach to Bitcoin implementation. When tackling practical Bitcoin challenges in Africa, remember these key principles:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 16px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center; border-top: 4px solid #22d3ee;">
            <div style="font-size: 28px; margin-bottom: 8px;">🔌</div>
            <h3 style="color: #67e8f9; margin: 0 0 8px 0;">Work With Infrastructure Limitations</h3>
            <p style="margin: 0; font-size: 14px;">Design solutions that function with intermittent power and connectivity while planning for infrastructure improvements</p>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center; border-top: 4px solid #22d3ee;">
            <div style="font-size: 28px; margin-bottom: 8px;">🤝</div>
            <h3 style="color: #67e8f9; margin: 0 0 8px 0;">Respect Local Systems</h3>
            <p style="margin: 0; font-size: 14px;">Integrate with existing community structures and governance models rather than imposing unfamiliar systems</p>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center; border-top: 4px solid #22d3ee;">
            <div style="font-size: 28px; margin-bottom: 8px;">📚</div>
            <h3 style="color: #67e8f9; margin: 0 0 8px 0;">Build Knowledge Transfer</h3>
            <p style="margin: 0; font-size: 14px;">Focus on education and skills development to ensure long-term sustainability without external support</p>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center; border-top: 4px solid #22d3ee;">
            <div style="font-size: 28px; margin-bottom: 8px;">🛡️</div>
            <h3 style="color: #67e8f9; margin: 0 0 8px 0;">Layer Security Appropriately</h3>
            <p style="margin: 0; font-size: 14px;">Balance sophisticated security measures with practical usability based on risk assessment and local needs</p>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 20px; text-align: center;">
          <p style="margin: 0; font-style: italic; font-weight: bold;">The most successful Bitcoin implementations in Africa blend technological innovation with cultural sensitivity and practical adaptations to local contexts.</p>
        </div>
      </div>
    `,
    contentType: 'practical',
    unlocked: true,
    completed: false
  },
  {
    id: 3,
    title: "Technical Mastery",
    subtitle: "Diving Deeper",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "Master the technical intricacies of Bitcoin's protocol and network architecture."
      )
    ),
    simulationType: "technical",
    quizData: {
      questions: [
        {
          question: "What is the maximum size of Bitcoin's witness data in a block?",
          options: [
            "1 MB",
            "2 MB",
            "4 MB",
            "8 MB"
          ],
          correctAnswer: 2
        },
        {
          question: "Which opcode was re-enabled by the Taproot upgrade?",
          options: [
            "OP_CAT",
            "OP_CHECKTEMPLATEVERIFY",
            "OP_CHECKSIGFROMSTACK",
            "OP_CHECKSIGADD"
          ],
          correctAnswer: 3
        },
        {
          question: "What is the role of nLockTime in a Bitcoin transaction?",
          options: [
            "It prevents the transaction from being mined until a specified height or time",
            "It determines how long the transaction remains in the mempool",
            "It sets the mining priority for the transaction",
            "It verifies that inputs are from the correct block height"
          ],
          correctAnswer: 0
        }
      ]
    },
    content: `
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0; text-align: center;">Bitcoin Technical Mastery</h2>
        
        <p style="margin-bottom: 16px;">This module explores the deeper technical aspects of Bitcoin's protocol, network architecture, and cryptographic foundations. Understanding these components is essential for advanced implementation, development, and security analysis.</p>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
          <p style="font-size: 18px; font-weight: bold; margin: 0; color: #67e8f9;">Bitcoin's elegance lies in how its technical components work together to create a secure, decentralized system</p>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0;">Transaction Structure & UTXO Model</h2>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Transaction Anatomy</h3>
          
          <pre style="background-color: rgba(0, 0, 0, 0.2); border-radius: 6px; padding: 12px; margin: 12px 0; overflow-x: auto; font-family: monospace; font-size: 14px; color: #e0e0e0;">
{
  "version": 2,
  "locktime": 0,
  "vin": [
    {
      "txid": "7957a35fe64f80d234d76d83a2a8f1a0d8149a41d81de548f0a65a8a999f6f18",
      "vout": 0,
      "scriptSig": "...",  // Input script
      "sequence": 4294967295,
      "witness": "..."     // Segregated witness data
    }
  ],
  "vout": [
    {
      "value": 0.01500000,
      "scriptPubKey": "..." // Output script (locking script)
    },
    {
      "value": 0.13500000,
      "scriptPubKey": "..." // Output script (change address)
    }
  ]
}</pre>
          
          <p style="margin-bottom: 0;">Every Bitcoin transaction consists of these essential components:</p>
          <ul style="margin-bottom: 0; padding-left: 20px;">
            <li><strong>Version</strong>: Transaction format version number</li>
            <li><strong>Inputs</strong>: References to previous transaction outputs being spent</li>
            <li><strong>Outputs</strong>: New UTXOs created by this transaction</li>
            <li><strong>Locktime</strong>: Earliest time or block height when transaction can be included in a block</li>
            <li><strong>Witness data</strong>: Segregated signature data (for SegWit transactions)</li>
          </ul>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">UTXO Model Deep Dive</h3>
            <p style="margin-bottom: 10px;">Unlike account-based systems, Bitcoin uses the Unspent Transaction Output (UTXO) model:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>All bitcoins exist as UTXOs - discrete "coins" with specific values</li>
              <li>Each UTXO is fully spent in a transaction; change creates new UTXOs</li>
              <li>Wallets track all UTXOs controlled by the user's keys</li>
              <li>Transaction fees are the difference between input and output values</li>
              <li>UTXOs can only be spent once (prevents double-spending)</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">UTXO Advantages & Implications</h3>
            <div style="margin-bottom: 0;">
              <p style="margin-bottom: 8px;"><strong>Privacy benefits:</strong></p>
              <ul style="margin-bottom: 8px; padding-left: 20px;">
                <li>New addresses can be used for each transaction</li>
                <li>Coin selection algorithms can enhance privacy</li>
                <li>Multiple inputs don't reveal they share an owner</li>
              </ul>
              
              <p style="margin-bottom: 8px;"><strong>Scalability properties:</strong></p>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Parallel validation of independent transactions</li>
                <li>Simplified Payment Verification (SPV) for light clients</li>
                <li>UTXO set represents current state of all spendable coins</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <h4 style="margin-top: 0; color: #67e8f9;">Transaction Verification Process</h4>
          <ol style="margin-bottom: 0; padding-left: 20px;">
            <li>Verify transaction syntax and structure are valid</li>
            <li>Confirm inputs reference valid, unspent UTXOs</li>
            <li>Verify total input value ≥ total output value</li>
            <li>Execute scriptSig + scriptPubKey to validate spending authorization</li>
            <li>Check transaction size and signature operations are within limits</li>
            <li>Add to mempool if valid and propagate to network</li>
          </ol>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0;">Bitcoin Script & Smart Contracts</h2>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Script: Bitcoin's Programming Language</h3>
          <p style="margin-bottom: 10px;">Bitcoin Script is a simple, stack-based, Forth-like language with deliberate limitations:</p>
          <ul style="margin-bottom: 10px; padding-left: 20px;">
            <li>Non-Turing complete (no loops) to prevent denial-of-service attacks</li>
            <li>Stack-based execution model pushing/popping values</li>
            <li>Limited set of operations focused on cryptographic verification</li>
            <li>Designed for deterministic validation with no side effects</li>
            <li>Stateless execution with no storage between executions</li>
          </ul>
          <p style="margin-bottom: 0;">Script consists of scriptSig (unlocking script) in the input and scriptPubKey (locking script) in the output, which are concatenated and executed.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Common Script Types</h3>
            <p style="margin-bottom: 8px;"><strong>P2PKH (Pay to Public Key Hash):</strong></p>
            <pre style="background-color: rgba(0, 0, 0, 0.2); border-radius: 4px; padding: 8px; margin-bottom: 12px; overflow-x: auto; font-family: monospace; font-size: 13px; color: #e0e0e0;">
scriptPubKey: OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
scriptSig: <signature> <pubKey></pre>
            
            <p style="margin-bottom: 8px;"><strong>P2SH (Pay to Script Hash):</strong></p>
            <pre style="background-color: rgba(0, 0, 0, 0.2); border-radius: 4px; padding: 8px; margin-bottom: 12px; overflow-x: auto; font-family: monospace; font-size: 13px; color: #e0e0e0;">
scriptPubKey: OP_HASH160 <scriptHash> OP_EQUAL
scriptSig: <inputs> <redeemScript></pre>
            
            <p style="margin-bottom: 8px;"><strong>P2WPKH (Pay to Witness Public Key Hash):</strong></p>
            <pre style="background-color: rgba(0, 0, 0, 0.2); border-radius: 4px; padding: 8px; margin-bottom: 0; overflow-x: auto; font-family: monospace; font-size: 13px; color: #e0e0e0;">
scriptPubKey: 0 <pubKeyHash>
witness: <signature> <pubKey></pre>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Advanced Contract Types</h3>
            <p style="margin-bottom: 8px;"><strong>Multisignature:</strong></p>
            <pre style="background-color: rgba(0, 0, 0, 0.2); border-radius: 4px; padding: 8px; margin-bottom: 12px; overflow-x: auto; font-family: monospace; font-size: 13px; color: #e0e0e0;">
OP_m <pubKey1> <pubKey2> ... <pubKeyn> OP_n OP_CHECKMULTISIG</pre>
            <p style="margin-bottom: 12px; font-size: 13px;">Requires m of n signatures to spend (e.g., 2-of-3)</p>
            
            <p style="margin-bottom: 8px;"><strong>Timelock (CLTV):</strong></p>
            <pre style="background-color: rgba(0, 0, 0, 0.2); border-radius: 4px; padding: 8px; margin-bottom: 12px; overflow-x: auto; font-family: monospace; font-size: 13px; color: #e0e0e0;">
<locktime> OP_CHECKLOCKTIMEVERIFY OP_DROP
<regular script></pre>
            <p style="margin-bottom: 12px; font-size: 13px;">Cannot be spent until specified block height/time</p>
            
            <p style="margin-bottom: 8px;"><strong>Hash Time-Locked Contract (HTLC):</strong></p>
            <pre style="background-color: rgba(0, 0, 0, 0.2); border-radius: 4px; padding: 8px; margin-bottom: 0; overflow-x: auto; font-family: monospace; font-size: 13px; color: #e0e0e0;">
OP_IF
  OP_HASH160 <hashValue> OP_EQUALVERIFY <pubKey1> OP_CHECKSIG
OP_ELSE
  <locktime> OP_CHECKLOCKTIMEVERIFY OP_DROP <pubKey2> OP_CHECKSIG
OP_ENDIF</pre>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Taproot & Current Script Capabilities</h3>
          <p style="margin-bottom: 10px;">The Taproot upgrade (activated November 2021) significantly enhanced Bitcoin's scripting capabilities:</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Key Technical Improvements</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Schnorr signatures for improved cryptography</li>
                <li>MAST (Merkelized Alternative Script Trees) for complex conditions</li>
                <li>Pay-to-Taproot (P2TR) output type</li>
                <li>Signature aggregation for multi-signature efficiency</li>
                <li>Script path spending with hidden conditions</li>
              </ul>
            </div>
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">New Capabilities</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>More efficient and private multi-signature setups</li>
                <li>Complex conditional scripts with better privacy</li>
                <li>Key/script path spending flexibility</li>
                <li>Reduced transaction sizes and fees</li>
                <li>New opcode: OP_CHECKSIGADD for signature verification</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <h4 style="margin-top: 0; color: #67e8f9;">Security Implications of Script Design</h4>
          <p style="margin-bottom: 8px;">Bitcoin's script design prioritizes secure execution:</p>
          <ul style="margin-bottom: 0; padding-left: 20px;">
            <li><strong>Deterministic execution</strong>: Same script always produces same result on all nodes</li>
            <li><strong>Resource limits</strong>: Maximum script size, operation count, and stack size</li>
            <li><strong>No state persistence</strong>: Each execution is independent, preventing complex attacks</li>
            <li><strong>Intentional limitations</strong>: No loops or dynamic jumps to prevent denial-of-service attacks</li>
            <li><strong>Conservative upgrades</strong>: New capabilities added cautiously after thorough review</li>
          </ul>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0;">Network Architecture & Node Types</h2>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">P2P Network Design</h3>
          <p style="margin-bottom: 10px;">Bitcoin's peer-to-peer network is designed to be:</p>
          <ul style="margin-bottom: 10px; padding-left: 20px;">
            <li><strong>Resilient</strong>: No central points of failure</li>
            <li><strong>Open</strong>: Anyone can join and participate</li>
            <li><strong>Private</strong>: No authentication required</li>
            <li><strong>Pseudonymous</strong>: No identity tied to network activity</li>
            <li><strong>Synchronous</strong>: All nodes work toward consistent state</li>
          </ul>
          <p style="margin-bottom: 0;">The network uses a "gossiping" protocol where each node connects to multiple peers (typically 8-125 outbound connections) and relays valid transactions and blocks to all its connections.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Node Types & Responsibilities</h3>
            <div style="margin-bottom: 0;">
              <p style="margin-bottom: 8px;"><strong>Full Nodes:</strong></p>
              <ul style="margin-bottom: 12px; padding-left: 20px;">
                <li>Store complete blockchain history (~500GB+)</li>
                <li>Independently verify all transactions and blocks</li>
                <li>Enforce consensus rules</li>
                <li>Relay transactions and blocks to peers</li>
                <li>Serve blockchain data to other nodes</li>
              </ul>
              
              <p style="margin-bottom: 8px;"><strong>Pruned Nodes:</strong></p>
              <ul style="margin-bottom: 12px; padding-left: 20px;">
                <li>Initially download and verify entire blockchain</li>
                <li>Discard old block data to save space</li>
                <li>Maintain only recent blocks (typically 550+ blocks)</li>
                <li>Function identically to full nodes for consensus</li>
                <li>Cannot serve historical blocks to other nodes</li>
              </ul>
              
              <p style="margin-bottom: 8px;"><strong>Light Clients (SPV):</strong></p>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Download only block headers (~80 bytes per block)</li>
                <li>Verify proof-of-work in headers</li>
                <li>Request filtered blocks or transactions affecting their addresses</li>
                <li>Trust full nodes for transaction validation</li>
                <li>Suitable for mobile and resource-constrained devices</li>
              </ul>
            </div>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Specialized Node Functions</h3>
            <div style="margin-bottom: 0;">
              <p style="margin-bottom: 8px;"><strong>Mining Nodes:</strong></p>
              <ul style="margin-bottom: 12px; padding-left: 20px;">
                <li>Collect and validate transactions for block creation</li>
                <li>Perform proof-of-work computation</li>
                <li>Create candidate blocks with coinbase transaction</li>
                <li>Broadcast newly mined blocks</li>
                <li>Often operate in pools to share resources</li>
              </ul>
              
              <p style="margin-bottom: 8px;"><strong>Lightning Network Nodes:</strong></p>
              <ul style="margin-bottom: 12px; padding-left: 20px;">
                <li>Maintain payment channels with peers</li>
                <li>Route payments through channel network</li>
                <li>Monitor blockchain for channel transactions</li>
                <li>Execute HTLCs for conditional payments</li>
                <li>Provide liquidity for Lightning payments</li>
              </ul>
              
              <p style="margin-bottom: 8px;"><strong>Archival Nodes:</strong></p>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Store complete blockchain with transaction index</li>
                <li>Maintain UTXO set for efficient verification</li>
                <li>Often provide API access to blockchain data</li>
                <li>Support blockchain explorers and analysis tools</li>
                <li>Require significant storage resources (~1TB+)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Network Protocol & Communication</h3>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Message Types</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li><strong>INV</strong>: Inventory announcement of blocks/transactions</li>
                <li><strong>GETDATA</strong>: Request for transaction/block data</li>
                <li><strong>BLOCK</strong>: Complete block data</li>
                <li><strong>TX</strong>: Complete transaction data</li>
                <li><strong>ADDR</strong>: Peer addresses for network discovery</li>
                <li><strong>PING/PONG</strong>: Connection maintenance</li>
                <li><strong>MEMPOOL</strong>: Request for mempool transactions</li>
              </ul>
            </div>
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Connection Management</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Node discovery via DNS seeds and hardcoded addresses</li>
                <li>Connection establishment with version handshake</li>
                <li>Address propagation to share peer information</li>
                <li>Connection pruning based on performance and behavior</li>
                <li>Outbound connection preference for diversity</li>
                <li>Eviction policies to manage resource usage</li>
                <li>Connection monitoring for health and reliability</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <h4 style="margin-top: 0; color: #67e8f9;">Network Security Considerations</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            <div>
              <h5 style="margin-top: 0; font-size: 15px;">Attack Vectors</h5>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Sybil attacks (fake node flooding)</li>
                <li>Eclipse attacks (isolating specific nodes)</li>
                <li>Transaction malleability (modifying txids)</li>
                <li>Denial-of-service attacks</li>
                <li>Timing attacks for transaction source inference</li>
              </ul>
            </div>
            <div>
              <h5 style="margin-top: 0; font-size: 15px;">Mitigations</h5>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Random peer selection for connections</li>
                <li>Transaction and block validation</li>
                <li>Rate limiting for resource-intensive requests</li>
                <li>Address bucketing for IP diversity</li>
                <li>Compact block relay to reduce bandwidth</li>
                <li>Tor and I2P support for enhanced privacy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0;">Cryptographic Foundations</h2>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Core Cryptographic Primitives</h3>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Cryptographic Hash Functions</h4>
              <p style="margin-bottom: 8px;">Bitcoin uses SHA-256 and RIPEMD-160 with these properties:</p>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li><strong>One-way function</strong>: Infeasible to reverse</li>
                <li><strong>Deterministic</strong>: Same input always produces same output</li>
                <li><strong>Avalanche effect</strong>: Small input changes cause large output changes</li>
                <li><strong>Collision resistance</strong>: Extremely unlikely to find two inputs with same hash</li>
                <li><strong>Fixed output size</strong>: Always produces 256-bit (SHA-256) output</li>
              </ul>
            </div>
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Public Key Cryptography</h4>
              <p style="margin-bottom: 8px;">Bitcoin uses Elliptic Curve Digital Signature Algorithm (ECDSA) with secp256k1 curve for:</p>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li><strong>Key pairs</strong>: Private keys generate corresponding public keys</li>
                <li><strong>Digital signatures</strong>: Prove ownership without revealing private key</li>
                <li><strong>Signature verification</strong>: Anyone can verify with public key</li>
                <li><strong>Non-repudiation</strong>: Signatures cannot be forged without private key</li>
                <li><strong>Mathematical security</strong>: Based on discrete logarithm problem</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Keys & Addresses</h3>
            <p style="margin-bottom: 10px;">The key generation and address derivation process:</p>
            
            <ol style="margin-bottom: 0; padding-left: 20px;">
              <li><strong>Private Key</strong>: Random 256-bit number (32 bytes)</li>
              <li><strong>Public Key</strong>: Derived from private key using elliptic curve multiplication</li>
              <li><strong>Public Key Hash</strong>: SHA-256 then RIPEMD-160 of public key (20 bytes)</li>
              <li><strong>Address</strong>: Encoded hash with version byte and checksum</li>
            </ol>
            
            <p style="margin-top: 12px; margin-bottom: 8px;">Common address formats:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li><strong>Legacy (P2PKH)</strong>: 1... (Base58Check encoded)</li>
              <li><strong>P2SH</strong>: 3... (Base58Check encoded)</li>
              <li><strong>Segwit v0</strong>: bc1q... (Bech32 encoded)</li>
              <li><strong>Taproot (P2TR)</strong>: bc1p... (Bech32m encoded)</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Recent Cryptographic Advances</h3>
            
            <div style="margin-bottom: 0;">
              <p style="margin-bottom: 8px;"><strong>Schnorr Signatures:</strong></p>
              <ul style="margin-bottom: 12px; padding-left: 20px;">
                <li>Implemented in Taproot upgrade (2021)</li>
                <li>Simpler, more efficient than ECDSA</li>
                <li>Linear signature aggregation for multisig efficiency</li>
                <li>Enhanced privacy by making complex transactions look simple</li>
                <li>Batch verification for improved validation speed</li>
              </ul>
              
              <p style="margin-bottom: 8px;"><strong>MAST (Merkelized Alternative Script Trees):</strong></p>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Script conditions organized in Merkle trees</li>
                <li>Only reveal executed script path, not all conditions</li>
                <li>Improved privacy for complex smart contracts</li>
                <li>Reduced transaction size for conditional scripts</li>
                <li>Key/script path spending flexibility</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">HD Wallets & Key Management</h3>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">BIP-32: Hierarchical Deterministic Wallets</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Generate entire tree of key pairs from single seed</li>
                <li>Master private key creates derived child keys</li>
                <li>Structured key derivation with paths (m/44'/0'/0'/0/0)</li>
                <li>Public derivation enables watch-only wallets</li>
                <li>Hardened derivation prevents compromise of parent from child</li>
              </ul>
            </div>
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">BIP-39: Mnemonic Seed Phrases</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Convert random entropy to human-readable words</li>
                <li>Typically 12 or 24 words from standardized wordlist</li>
                <li>Checksum verification to detect mistakes</li>
                <li>Optional passphrase for additional security</li>
                <li>PBKDF2 key stretching for brute-force resistance</li>
                <li>International wordlists for multiple languages</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <h4 style="margin-top: 0; color: #67e8f9;">Quantum Resistance Considerations</h4>
          <p style="margin-bottom: 8px;">Bitcoin's cryptographic foundations and potential quantum vulnerabilities:</p>
          <ul style="margin-bottom: 0; padding-left: 20px;">
            <li>Public keys are vulnerable to quantum algorithms like Shor's algorithm</li>
            <li>Hashed public keys (P2PKH, P2WPKH) provide one-time quantum resistance until first spend</li>
            <li>Address reuse significantly increases quantum vulnerability</li>
            <li>SHA-256 remains resistant to known quantum attacks</li>
            <li>Future upgrades could implement post-quantum cryptography</li>
            <li>Transition strategies being researched for quantum-resistant signatures</li>
          </ul>
        </div>
      </div>
      
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; max-height: 80vh; overflow-y: auto;">
        <h2 style="color: #22d3ee; margin-top: 0; text-align: center;">Layer 2 & Scaling Solutions</h2>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">The Lightning Network Architecture</h3>
          <p style="margin-bottom: 10px;">The Lightning Network operates as a second-layer protocol on top of Bitcoin, enabling:</p>
          <ul style="margin-bottom: 10px; padding-left: 20px;">
            <li>Near-instant payments</li>
            <li>Near-zero fees</li>
            <li>Scalability to millions of transactions per second</li>
            <li>Enhanced privacy through routing</li>
            <li>Micropayments (sub-satoshi precision)</li>
          </ul>
          <p style="margin-bottom: 0;">Lightning achieves this through payment channels - Bitcoin transactions with special properties that allow unlimited off-chain payments between participants without requiring on-chain transactions for every payment.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Lightning Technical Components</h3>
            
            <div style="margin-bottom: 0;">
              <p style="margin-bottom: 8px;"><strong>Payment Channels:</strong></p>
              <ul style="margin-bottom: 12px; padding-left: 20px;">
                <li>Bidirectional channels with 2-of-2 multisig</li>
                <li>Commitment transactions with timelocks</li>
                <li>Revocation mechanisms to prevent cheating</li>
                <li>On-chain channel opening and closing</li>
                <li>Off-chain state updates without broadcasting</li>
              </ul>
              
              <p style="margin-bottom: 8px;"><strong>Routing Protocol:</strong></p>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Source-based routing with onion encryption</li>
                <li>Gossip protocol for channel discovery</li>
                <li>Path finding algorithms for optimal routes</li>
                <li>Hash Time-Locked Contracts (HTLCs) for atomic payments</li>
                <li>Multi-hop payments across channels</li>
              </ul>
            </div>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #22d3ee;">
            <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Recent Lightning Developments</h3>
            
            <div style="margin-bottom: 0;">
              <p style="margin-bottom: 8px;"><strong>Channel Factories:</strong></p>
              <ul style="margin-bottom: 12px; padding-left: 20px;">
                <li>Multiple channels from single on-chain transaction</li>
                <li>Reduced channel opening costs</li>
                <li>Improved capital efficiency</li>
              </ul>
              
              <p style="margin-bottom: 8px;"><strong>Splicing:</strong></p>
              <ul style="margin-bottom: 12px; padding-left: 20px;">
                <li>Add or remove funds from existing channels</li>
                <li>No disruption to channel operations</li>
                <li>Improved channel liquidity management</li>
              </ul>
              
              <p style="margin-bottom: 8px;"><strong>Simplified Commitments:</strong></p>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Eltoo protocol for simpler channel updates</li>
                <li>Reduces complexity of penalty mechanism</li>
                <li>Enables more complex channel relationships</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #22d3ee;">
          <h3 style="color: #67e8f9; margin-top: 0; font-size: 18px;">Other Scaling Approaches</h3>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Sidechains</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Separate blockchains with two-way pegs to Bitcoin</li>
                <li>Liquid Network for faster settlements and confidential transactions</li>
                <li>RSK for smart contract functionality</li>
                <li>Different consensus mechanisms possible</li>
                <li>Potential for different feature sets and trade-offs</li>
              </ul>
            </div>
            <div>
              <h4 style="margin-top: 0; font-size: 16px; color: #67e8f9;">Layer 3+ Solutions</h4>
              <ul style="margin-bottom: 0; padding-left: 20px;">
                <li>Applications built on Lightning (not directly on Bitcoin)</li>
                <li>Specialized payment protocols for specific use cases</li>
                <li>Federated services for enhanced functionality</li>
                <li>Cross-network interoperability layers</li>
                <li>Specialized Lightning Service Providers (LSPs)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px; text-align: center;">
          <p style="margin: 0; font-style: italic; font-weight: bold;">The future of Bitcoin scaling involves a complementary approach: conservative base layer optimizations for security and settlement, with multiple layers above for specialized functionality and enhanced scale.</p>
        </div>
      </div>
    `,
    contentType: 'technical',
    unlocked: true,
    completed: false
  },
  
  {
    id: 4,
    title: "The Final Challenge",
    subtitle: "Bitcoin Mastery Exam",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "Test your comprehensive Bitcoin knowledge across four key categories."
      )
    ),
    simulationType: "final",
    quizValidation: {
      basic: {
        minScore: 15,
        comment: "Keep studying the basics! Review Realms 1-3 for foundational concepts."
      },
      intermediate: {
        minScore: 50,
        comment: "Good progress! You're understanding Bitcoin's core concepts."
      },
      advanced: {
        minScore: 75,
        comment: "Excellent work! You have a strong grasp of Bitcoin."
      },
      expert: {
        minScore: 90,
        comment: "Outstanding! You've achieved true Bitcoin mastery."
      }
    },
    content: `
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0; text-align: center;">Bitcoin Mastery Challenge</h2>
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
          <p style="font-size: 18px; font-weight: bold; margin: 0; color: #67e8f9;">84 Questions · 4 Categories</p>
        </div>
        <div id="scoreboard" style="display: none; background-color: rgba(0, 0, 0, 0.2); padding: 12px; border-radius: 8px; margin-top: 16px;">
          <p style="margin: 0; color: #67e8f9;">
            Score: <span id="score">0</span>/84 · 
            Accuracy: <span id="accuracy">0</span>% · 
            Level: <span id="level">Novice</span>
          </p>
          <p id="feedback" style="margin-top: 8px; color: #67e8f9;"></p>
        </div>
      </div>

      <script>
        let totalScore = 0;
        const results = {};
        
        function validateAnswer(qId, answer) {
          const result = fetch('/api/validate-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ questionId: qId, answer })
          }).then(res => res.json());
          
          updateScore(result.isCorrect);
          showFeedback();
          return result.isCorrect;
        }

        function updateScore(isCorrect) {
          if (isCorrect) totalScore++;
          const total = Object.keys(results).length;
          const accuracy = total ? Math.round((totalScore/total) * 100) : 0;
          
          document.getElementById('score').textContent = totalScore;
          document.getElementById('accuracy').textContent = accuracy;
          document.getElementById('level').textContent = 
            accuracy >= 90 ? '₿ Expert' :
            accuracy >= 75 ? 'Advanced' :
            accuracy >= 50 ? 'Intermediate' : 'Novice';
            
          showQuizFeedback(accuracy);
        }

        function showQuizFeedback(accuracy) {
          const feedback = document.getElementById('feedback');
          if (accuracy >= 90) {
            feedback.textContent = "Outstanding! You've achieved true Bitcoin mastery.";
          } else if (accuracy >= 75) {
            feedback.textContent = "Excellent work! You have a strong grasp of Bitcoin.";
          } else if (accuracy >= 50) {
            feedback.textContent = "Good progress! You're understanding Bitcoin's core concepts.";
          } else {
            feedback.textContent = "Keep studying the basics! Review Realms 1-3 for foundational concepts.";
          }
        }
      </script>

      <!-- Basic Questions -->
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">🔰 Basic Questions (21)</h2>
        <!-- Add questions without answers -->
        ${Array.from({length:21}, (_, i) => `
          <div class="question-container" style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="font-weight: bold; color: #67e8f9;">${i+1}. ${getBasicQuestion(i)}</p>
            ${getQuestionInput(i, 'basic')}
            <button onclick="submitAnswer('basic-${i}')" style="background:#22d3ee;color:black;border:none;padding:8px 16px;border-radius:4px;margin-top:8px;cursor:pointer;">Submit</button>
          </div>
        `).join('')}
      </div>

      <!-- Other categories follow similar pattern -->
      <!-- Non-Technical Questions -->
      <!-- Technical Questions -->
      <!-- Comprehensive Questions -->
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0; text-align: center;">Bitcoin Mastery Challenge</h2>
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
          <p style="font-size: 18px; font-weight: bold; margin: 0; color: #67e8f9;">84 Questions · 4 Categories</p>
        </div>
        <div id="scoreboard" style="display: none; background-color: rgba(0, 0, 0, 0.2); padding: 12px; border-radius: 8px; margin-top: 16px;">
          <p style="margin: 0; color: #67e8f9;">
            Score: <span id="score">0</span>/84 • 
            Accuracy: <span id="accuracy">0</span>% • 
            Level: <span id="level">Novice</span>
          </p>
        </div>
      </div>
  
      <script>
        let totalScore = 0;
        const results = {};
        const correctAnswers = {
          'basic-0':'b','basic-1':'c','basic-2':'c','basic-3':'b','basic-4':'b',
          'basic-5':'b','basic-6':'false','basic-7':'c','basic-8':'c','basic-9':'c',
          'basic-10':'c','basic-11':'c','basic-12':'holdondearlife','basic-13':'decentralized',
          'basic-14':'c','basic-15':'c','basic-16':'b','basic-17':'c','basic-18':'b',
          'basic-19':'b','basic-20':'false','nontech-0':'b','nontech-1':'decreaseinmoneyspurchasingpowerovertime',
          'nontech-2':'b','nontech-3':'networkprotocol','nontech-4':'b','nontech-5':'false',
          'nontech-6':'gold','nontech-7':'anyonecanuseitwithoutapproval','nontech-8':'b',
          'nontech-9':'avoidfeescurrencydepreciationoraccesslimitations','nontech-10':'moneyyoucontrolwithoutthirdpartyapproval',
          'nontech-11':'yes','nontech-12':'4years','nontech-13':'transactionscannotbeblockedorreversedbyauthorities',
          'nontech-14':'b','nontech-15':'doesntrequirebankaccount','nontech-16':'controlprivatekeystocontrolbitcoin',
          'nontech-17':'goldmining','nontech-18':'b','nontech-19':'bankaccountnumbertoreceivefunds',
          'nontech-20':'financialsurveillanceandcurrencycontrol','tech-0':'proofofwork',
          'tech-1':'10minutes','tech-2':'sha256','tech-3':'50btc','tech-4':'1mb','tech-5':'unspenttransactionoutput',
          'tech-6':'waitingareaforunconfirmedtransactions','tech-7':'blockrewardhalves','tech-8':'bitcoinscript',
          'tech-9':'false','tech-10':'separatessignaturedatatoreduceblocksize','tech-11':'a',
          'tech-12':'computerenforcingprotocolrules','tech-13':'6','tech-14':'recalibrateminingdifficultyevery2016blocks',
          'tech-15':'firstblockinblockchain','tech-16':'spendingsamebitcointwice','tech-17':'storedataonchain',
          'tech-18':'enablefastercheapertransactions','tech-19':'simplifiedpaymentverificationwallet',
          'tech-20':'ecdsa','comp-0':'financialfreedomcensorshipresistanceeconomicinclusion',
          'comp-1':'bitcoindecentralizedborderlessmpesacentralizedbuteasieronboarding','comp-2':'fixedsupplyschedulewithperiodicreductions',
          'comp-3':'internetaccessregulationeducationvolatility','comp-4':'lowerfeesbuttechnicalcomplexityandvolatility',
          'comp-5':'threatensmonetarycontrolenablescapitalflight','comp-6':'bip32hdwalletsbip39mnemonicsbip141segwit',
          'comp-7':'smallamountshardwarewallettseedphrasesecurity','comp-8':'incentivizeshonestparticipationthroughrewards',
          'comp-9':'offchaininstantmicropaymentswithlowerfees','comp-10':'energyusevsbankingsystemrenewablemining',
          'comp-11':'inflationresistsavingsoutsidebanking','comp-12':'financialselfsovereigntyescapefrominflation',
          'comp-13':'pseudonymitycoinjointaprootlightning','comp-14':'bitcoinekrasibitcoincowriesbuiltwithbitcoin',
          'comp-15':'transparentledgerimmutabletransactionsnocentralcontrol','comp-16':'nigerianairacrisisexample',
          'comp-17':'cleartaxesantifraudpreserveselfcustody','comp-18':'threattomonetarymonopolypotentialpaymentally',
          'comp-19':'modernversionoftraditionalvaluestorage','comp-20':'cryptographyopensourceeducationuxdesign'
        };
  
        function normalizeAnswer(answer) {
          return answer.toLowerCase().replace(/[^a-z0-9]/g,'');
        }
  
        function validateAnswer(qId,inputType) {
          const userAnswer = inputType === 'select' 
            ? document.getElementById(qId).value 
            : normalizeAnswer(document.getElementById(qId).value);
          const isCorrect = normalizeAnswer(userAnswer) === correctAnswers[qId];
          document.getElementById('q-container-'+qId).style.borderColor = isCorrect ? '#10b981' : '#ef4444';
          results[qId] = isCorrect;
          totalScore = Object.values(results).filter(v=>v).length;
          const completed = Object.keys(results).length;
          const accuracy = completed ? Math.round((totalScore/completed)*100) : 0;
          document.getElementById('score').textContent = totalScore;
          document.getElementById('accuracy').textContent = accuracy;
          document.getElementById('level').textContent = 
            accuracy >=90?'₿ Expert':accuracy >=70?'Advanced':accuracy >=50?'Intermediate':'Novice';
          document.getElementById('scoreboard').style.display='block';
        }
      </script>
  
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">🔰 Basic Questions (21)</h2>
        ${Array.from({length:21},(_,i)=>`
          <div id="q-container-basic-${i}" style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 16px; border-left: 4px solid #22d3ee;">
            <p style="font-weight: bold; color: #67e8f9;">${i+1}. ${{ 
              0:"What is Bitcoin? (a) Social media (b) Digital currency (c) Messaging app (d) Gold trading company",
              1:"Bitcoin inventor? (a) Vitalik (b) Elon Musk (c) Satoshi (d) Hal Finney",
              2:"Launch year? (a) 2005 (b) 2008 (c) 2009 (d) 2011",
              3:"Controlled by governments? (a) Yes (b) No",
              4:"Max supply? (a) 10M (b) 21M (c) 100M (d) Infinite",
              5:"Transactions stored on: (a) Server (b) Blockchain (c) USB (d) Cloud",
              6:"Reversible transactions? True/False",
              7:"Smallest unit? (a) Bit (b) Byte (c) Satoshi (d) Microcoin",
              8:"Not a use case: (a) Store of value (b) Payments (c) Physical delivery (d) Censorship-resistant savings",
              9:"Transaction verifiers: (a) Governors (b) Validators (c) Miners (d) Brokers",
              10:"Bitcoin similar to: (a) Credit cards (b) Email (c) Digital gold (d) Fiat",
              11:"Offline storage: (a) Mobile (b) Laptop (c) Hardware wallet (d) Paper",
              12:"HODL meaning:",
              13:"Bitcoin operates on ______ network",
              14:"Wallet purpose: (a) Coin purse (b) Buy BTC (c) Store keys",
              15:"First proposed via: (a) TED Talk (b) Blog (c) Whitepaper",
              16:"Popular wallet: (a) TikTok (b) BlueWallet (c) CashBank",
              17:"Anonymous? (a) Yes (b) No (c) Partially",
              18:"Protects from: (a) Hackers (b) Inflation (c) Taxes",
              19:"Check price: (a) YouTube (b) Exchanges (c) Blockchain explorers",
              20:"Only cryptocurrency? True/False"
            }[i]}</p>
            ${i<12||i===14||i===15||i===16||i===17||i===18||i===19?`
              <select id="basic-${i}" style="background:rgba(34,211,238,0.1);border:1px solid #22d3ee;color:white;padding:8px;border-radius:4px;margin-top:8px;width:100%;">
                <option value="">Select</option>${['a','b','c','d'].map(o=>`<option>${o}</option>`).join('')}
              </select>`:
              `<input id="basic-${i}" style="background:rgba(34,211,238,0.1);border:1px solid #22d3ee;color:white;padding:8px;border-radius:4px;margin-top:8px;width:100%;" placeholder="Answer">`}
            <button onclick="validateAnswer('basic-${i}',${i<12||i>13?'select':'text'})" style="background:#22d3ee;color:black;border:none;padding:8px 16px;border-radius:4px;margin-top:8px;cursor:pointer;">Check</button>
          </div>`).join('')}
      </div>
  
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">💡 Non-Technical Questions (21)</h2>
        ${Array.from({length:21},(_,i)=>`
          <div id="q-container-nontech-${i}" style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 16px; border-left: 4px solid #22d3ee;">
            <p style="font-weight: bold; color: #67e8f9;">${i+1}. ${{ 
              0:"Bitcoin solves: (a) Slow internet (b) Financial censorship/inflation",
              1:"Define inflation:",
              2:"Bitcoin value from: (a) Gold (b) Scarcity/trust",
              3:"Supply control:",
              4:"Bitcoin legal tender 2021: (a) Nigeria (b) El Salvador",
              5:"Need bank for Bitcoin? True/False",
              6:"Compared metal:",
              7:"Permissionless meaning:",
              8:"Fiat risk: (a) Transparency (b) Central inflation",
              9:"Africa prefers Bitcoin because:",
              10:"Sovereign money:",
              11:"Supports free speech?",
              12:"Halving frequency:",
              13:"Censorship-resistant:",
              14:"Adoption higher in: (a) Wealthy (b) Inflation countries",
              15:"Helps unbanked:",
              16:"Not your keys phrase:",
              17:"Mining mimics:",
              18:"Limited supply: (a) USD (b) BTC",
              19:"Public address:",
              20:"Challenges government:"
            }[i]}</p>
            ${i===0||i===2||i===4||i===8||i===14||i===18?`
              <select id="nontech-${i}" style="background:rgba(34,211,238,0.1);border:1px solid #22d3ee;color:white;padding:8px;border-radius:4px;margin-top:8px;width:100%;">
                <option value="">Select</option>${['a','b','c','d'].slice(0,i===0?2:i===14?2:4).map(o=>`<option>${o}</option>`).join('')}
              </select>`:
              `<input id="nontech-${i}" style="background:rgba(34,211,238,0.1);border:1px solid #22d3ee;color:white;padding:8px;border-radius:4px;margin-top:8px;width:100%;" placeholder="Answer">`}
            <button onclick="validateAnswer('nontech-${i}',${i===0||i===2||i===4||i===8||i===14||i===18?'select':'text'})" style="background:#22d3ee;color:black;border:none;padding:8px 16px;border-radius:4px;margin-top:8px;cursor:pointer;">Check</button>
          </div>`).join('')}
      </div>
  
      <div style="background-color: rgba(34, 211, 238, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">⚙️ Technical Questions (21)</h2>
        ${Array.from({length:21},(_,i)=>`
          <div id="q-container-tech-${i}" style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 16px; border-left: 4px solid #22d3ee;">
            <p style="font-weight: bold; color: #67e8f9;">${i+1}. ${{ 
              0:"Consensus algorithm:",
              1:"Average block time:",
              2:"Hashing function:",
              3:"Initial block reward:",
              4:"Block size limit:",
              5:"UTXO meaning:",
              6:"Mempool purpose:",
              7:"Halving event:",
              8:"Scripting language:",
              9:"Turing-complete? True/False",
              10:"SegWit purpose:",
              11:"Address prefixes: (a) 1,3,bc1 (b) bc1 only",
              12:"Node definition:",
              13:"Confirmations recommended:",
              14:"Difficulty adjustment:",
              15:"Genesis block:",
              16:"Double spend:",
              17:"OP_RETURN use:",
              18:"Lightning Network:",
              19:"SPV wallet:",
              20:"Signature type:"
            }[i]}</p>
            <input id="tech-${i}" style="background:rgba(34,211,238,0.1);border:1px solid #22d3ee;color:white;padding:8px;border-radius:4px;margin-top:8px;width:100%;" placeholder="Answer">
            <button onclick="validateAnswer('tech-${i}','text')" style="background:#22d3ee;color:black;border:none;padding:8px 16px;border-radius:4px;margin-top:8px;cursor:pointer;">Check</button>
          </div>`).join('')}
      </div>
  
      <div style="background-color: rgba(34, 211, 238, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #22d3ee; margin-top: 0;">🧠 Comprehensive Questions (21)</h2>
        ${Array.from({length:21},(_,i)=>`
          <div id="q-container-comp-${i}" style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 16px; border-left: 4px solid #22d3ee;">
            <p style="font-weight: bold; color: #67e8f9;">${i+1}. ${{ 
              0:"How Bitcoin supports human rights:",
              1:"Compare Bitcoin & Fiat:",
              2:"Halving policy vs inflation:",
              3:"Bitcoin adoption threats in Africa:",
              4:"Remittances use & risks:",
              5:"Government fears:",
              6:"Three BIPs:",
              7:"Secure onboarding:",
              8:"Game theory in mining:",
              9:"Lightning vs on-chain:",
              10:"Environmental impact:",
              11:"Saving concept in Africa:",
              12:"Bitcoin as hope:",
              13:"Privacy concerns & solutions:",
              14:"African Bitcoin projects:",
              15:"Corruption resistance:",
              16:"Currency collapse example:",
              17:"Smart regulation:",
              18:"Central banks relation:",
              19:"Money history in Africa:",
              20:"Development skills needed:"
            }[i]}</p>
            <input id="comp-${i}" style="background:rgba(34,211,238,0.1);border:1px solid #22d3ee;color:white;padding:8px;border-radius:4px;margin-top:8px;width:100%;" placeholder="Answer">
            <button onclick="validateAnswer('comp-${i}','text')" style="background:#22d3ee;color:black;border:none;padding:8px 16px;border-radius:4px;margin-top:8px;cursor:pointer;">Check</button>
          </div>`).join('')}
      </div>
    `,
    contentType: 'final',
    unlocked: true,
    completed: false
  },
    
  {
    id: 5,
    title: "Journey's End",
    subtitle: "Your Bitcoin Certification",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "Receive your certification and reflect on your Bitcoin journey."
      )
    ),
    simulationType: "certificate",
    content: `
      <div class="certification-content space-y-6">
        <section class="achievement-summary">
          <h3 class="text-xl font-bold mb-4">Your Bitcoin Journey Achievement</h3>

          <div class="achievements-grid grid grid-cols-2 gap-4">
            <div class="achievement-card p-4 bg-gray-800 rounded-lg">
              <h4 class="font-semibold">Knowledge Mastery</h4>
              <ul class="list-disc pl-5">
                <li>Monetary history and principles</li>
                <li>Technical protocol understanding</li>
                <li>Security and privacy concepts</li>
              </ul>
            </div>

            <div class="achievement-card p-4 bg-gray-800 rounded-lg">
              <h4 class="font-semibold">Practical Skills</h4>
              <ul class="list-disc pl-5">
                <li>Wallet management</li>
                <li>Network participation</li>
                <li>Community education</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="certification-details mt-8">
          <h3 class="text-xl font-bold mb-4">Certification Details</h3>
          <p>This certification validates your comprehensive understanding of:</p>
          <ul class="list-disc pl-5">
            <li>Bitcoin's technical architecture</li>
            <li>Economic principles and implications</li>
            <li>Real-world applications and impact</li>
            <li>Security best practices</li>
            <li>Future development potential</li>
          </ul>
        </section>
      </div>
    `,
    contentType: 'certificate',
    unlocked: true,
    completed: false
  }
];