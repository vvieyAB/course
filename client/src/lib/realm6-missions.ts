import React from 'react';

interface Mission {
  id: number;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  contentType: 'realUseCase' | 'lightningNetwork' | 'builders' | 'tools' | 'knowledge' | 'bonus';
  content?: string; // Detailed educational content in HTML/Markdown format
  unlocked: boolean;
  completed: boolean;
}

export const realm6Missions: Mission[] = [
  {
    id: 1,
    title: "Real Use Cases in Africa",
    subtitle: "Everyday Bitcoiners",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "Bitcoin is transforming lives across Africa. This mission explores how Bitcoin is used in various countries, highlighting real-world applications beyond price speculation."
      ),
      React.createElement("p", null, 
        "You'll discover how Bitcoin is being used for remittances, business payments, savings, education funding, and by farming co-ops in different regions of Africa."
      ),
      
      // Map and application cards
      React.createElement("div", { className: "bg-rose-900/30 p-4 rounded-xl my-4 border border-rose-600/30" },
        React.createElement("h3", { className: "text-lg font-semibold mb-3 text-rose-300" }, "Bitcoin Applications Across Africa"),
        
        // Visual cards layout
        React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
          // Remittances
          React.createElement("div", { className: "bg-rose-800/20 p-4 rounded-lg border-l-4 border-rose-500" },
            React.createElement("h4", { className: "font-medium text-rose-300 mb-2" }, "Remittances: Nigeria"),
            React.createElement("div", { className: "flex items-center justify-between" },
              React.createElement("div", null,
                React.createElement("div", { className: "text-xs mb-1" }, "Traditional Fee: 7-10%"),
                React.createElement("div", { className: "text-xs mb-1" }, "Bitcoin Fee: <1%"),
                React.createElement("div", { className: "text-xs" }, "Annual Flow: $17B+")
              ),
              React.createElement("div", { className: "w-12 h-12 rounded-full bg-rose-700/40 flex items-center justify-center" }, "🔄")
            )
          ),
          
          // Business Payments
          React.createElement("div", { className: "bg-rose-800/20 p-4 rounded-lg border-l-4 border-rose-500" },
            React.createElement("h4", { className: "font-medium text-rose-300 mb-2" }, "Business: Kenya"),
            React.createElement("div", { className: "flex items-center justify-between" },
              React.createElement("div", null,
                React.createElement("div", { className: "text-xs mb-1" }, "Instant settlements"),
                React.createElement("div", { className: "text-xs mb-1" }, "No chargebacks"),
                React.createElement("div", { className: "text-xs" }, "QR code payments")
              ),
              React.createElement("div", { className: "w-12 h-12 rounded-full bg-rose-700/40 flex items-center justify-center" }, "💼")
            )
          ),
          
          // Savings
          React.createElement("div", { className: "bg-rose-800/20 p-4 rounded-lg border-l-4 border-rose-500" },
            React.createElement("h4", { className: "font-medium text-rose-300 mb-2" }, "Savings: Zambia"),
            React.createElement("div", { className: "flex items-center justify-between" },
              React.createElement("div", null,
                React.createElement("div", { className: "text-xs mb-1" }, "Inflation hedge"),
                React.createElement("div", { className: "text-xs mb-1" }, "Community savings pools"),
                React.createElement("div", { className: "text-xs" }, "Value preservation")
              ),
              React.createElement("div", { className: "w-12 h-12 rounded-full bg-rose-700/40 flex items-center justify-center" }, "💰")
            )
          ),
          
          // Education
          React.createElement("div", { className: "bg-rose-800/20 p-4 rounded-lg border-l-4 border-rose-500" },
            React.createElement("h4", { className: "font-medium text-rose-300 mb-2" }, "Education: South Africa"),
            React.createElement("div", { className: "flex items-center justify-between" },
              React.createElement("div", null,
                React.createElement("div", { className: "text-xs mb-1" }, "Scholarship funding"),
                React.createElement("div", { className: "text-xs mb-1" }, "Learn-to-earn programs"),
                React.createElement("div", { className: "text-xs" }, "Tuition payments")
              ),
              React.createElement("div", { className: "w-12 h-12 rounded-full bg-rose-700/40 flex items-center justify-center" }, "🎓")
            )
          )
        ),
        
        // Map visual indicator (simplified representation)
        React.createElement("div", { className: "mt-4 p-3 rounded-lg bg-rose-900/20 text-center text-sm" },
          "Bitcoin adoption is growing across the continent with different use cases emerging in each region"
        )
      ),
      
      // Challenges section
      React.createElement("div", { className: "my-5" },
        React.createElement("h4", { className: "text-base font-medium text-rose-300 mb-2" }, "Implementation Challenges"),
        React.createElement("div", { className: "flex flex-wrap gap-2" },
          React.createElement("span", { className: "px-3 py-1 bg-rose-900/40 rounded-full text-xs" }, "Internet Access"),
          React.createElement("span", { className: "px-3 py-1 bg-rose-900/40 rounded-full text-xs" }, "Technical Education"),
          React.createElement("span", { className: "px-3 py-1 bg-rose-900/40 rounded-full text-xs" }, "Regulatory Uncertainty"),
          React.createElement("span", { className: "px-3 py-1 bg-rose-900/40 rounded-full text-xs" }, "Price Volatility"),
          React.createElement("span", { className: "px-3 py-1 bg-rose-900/40 rounded-full text-xs" }, "Access to Exchange"),
          React.createElement("span", { className: "px-3 py-1 bg-rose-900/40 rounded-full text-xs" }, "Mobile Phone Availability")
        )
      ),
      
      React.createElement("h3", { className: "text-lg font-semibold mt-6 mb-2" }, "Key Use Cases You'll Explore:"),
      React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
        React.createElement("li", null, "Remittances: Low-cost and rapid international money transfers"),
        React.createElement("li", null, "Business Payments: Secure and efficient transactions for merchants"),
        React.createElement("li", null, "Savings: Protection against inflation and currency devaluation"),
        React.createElement("li", null, "Education Funding: Community pools for student support"),
        React.createElement("li", null, "Farming Co-ops: Collaboration and investment in agricultural communities")
      ),
      React.createElement("p", { className: "mt-4" },
        "Through interactive challenges and quizzes, you'll understand the real-world impact of Bitcoin in African communities and how it exemplifies the spirit of Ubuntu—the belief in a universal bond of sharing that connects all humanity."
      )
    ),
    simulationType: "bitcoin",
    simulationPath: "/bitcoin-in-africa",
    quizPath: "/africa-quiz",
    content: `
      <div style="background-color: rgba(225, 29, 72, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #e11d48; margin-top: 0; text-align: center;">Bitcoin in Africa: Real-world Applications</h2>
        
        <p style="margin-bottom: 16px;">Across the African continent, Bitcoin is being adopted for practical, everyday use. Far from being just a speculative asset, Bitcoin is providing real solutions to long-standing financial challenges facing millions of Africans.</p>
        
        <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
          <p style="font-size: 18px; font-weight: bold; margin: 0; color: #fb7185;">Bitcoin is addressing real financial needs in Africa through practical applications that improve lives</p>
        </div>
      </div>
      
      <div style="background-color: rgba(225, 29, 72, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #e11d48; margin-top: 0;">Remittances: Connecting Families</h2>
        
        <p style="margin-bottom: 16px;">Africa receives over $90 billion in remittances annually, with traditional services charging 7-10% in fees. Bitcoin is dramatically changing this landscape:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #e11d48;">
            <h3 style="color: #fb7185; margin-top: 0; font-size: 18px;">Nigeria Case Study</h3>
            <p style="margin-bottom: 8px;">Nigeria receives over $17 billion in annual remittances from its diaspora. Many Nigerians now use Bitcoin to:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Send money home with fees under 1%</li>
              <li>Avoid currency controls and restrictions</li>
              <li>Complete transfers in minutes instead of days</li>
              <li>Reach family members without bank accounts</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #e11d48;">
            <h3 style="color: #fb7185; margin-top: 0; font-size: 18px;">How It Works</h3>
            <p style="margin-bottom: 0;">A typical Bitcoin remittance flow:</p>
            <ol style="margin-bottom: 0; padding-left: 20px;">
              <li>Sender buys Bitcoin using their local currency</li>
              <li>Bitcoin is transferred directly to recipient's wallet</li>
              <li>Recipient can keep the Bitcoin or exchange for local currency</li>
              <li>The entire process often takes less than an hour</li>
            </ol>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px;">
          <p style="margin: 0; font-style: italic;">Did you know? If all African remittances switched to Bitcoin, the continent would save approximately $9 billion annually in fees alone.</p>
        </div>
      </div>
      
      <div style="background-color: rgba(225, 29, 72, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #e11d48; margin-top: 0;">Business Applications</h2>
        
        <p style="margin-bottom: 16px;">African businesses face numerous challenges with traditional payment systems, including high fees, long settlement times, and limited access to global markets. Bitcoin is providing solutions:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; margin-bottom: 8px;">⚡</div>
            <h3 style="color: #fb7185; margin: 0 0 8px 0;">Instant Settlement</h3>
            <p style="margin: 0; font-size: 14px;">No waiting days for payments to clear; transactions confirm in minutes</p>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; margin-bottom: 8px;">🔒</div>
            <h3 style="color: #fb7185; margin: 0 0 8px 0;">No Chargebacks</h3>
            <p style="margin: 0; font-size: 14px;">Once confirmed, Bitcoin transactions cannot be reversed, protecting merchants</p>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; margin-bottom: 8px;">🌐</div>
            <h3 style="color: #fb7185; margin: 0 0 8px 0;">Global Reach</h3>
            <p style="margin: 0; font-size: 14px;">Accept payments from anywhere in the world without currency conversion issues</p>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; margin-bottom: 8px;">📱</div>
            <h3 style="color: #fb7185; margin: 0 0 8px 0;">Mobile Integration</h3>
            <p style="margin: 0; font-size: 14px;">Works seamlessly with Africa's high mobile penetration rates</p>
          </div>
        </div>
      </div>
      
      <div style="background-color: rgba(225, 29, 72, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #e11d48; margin-top: 0;">Savings and Wealth Preservation</h2>
        
        <p style="margin-bottom: 16px;">Many African currencies suffer from high inflation and devaluation. Bitcoin offers an alternative store of value:</p>
        
        <div style="display: flex; flex-wrap: wrap; gap: 20px;">
          <div style="flex: 1; min-width: 250px; background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px;">
            <h3 style="color: #fb7185; margin-top: 0; font-size: 18px;">Inflation Protection</h3>
            <p style="margin-bottom: 0;">Annual inflation rates in some African countries:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Zimbabwe: Experienced hyperinflation multiple times</li>
              <li>Sudan: Over 300% in recent years</li>
              <li>Nigeria: Consistently above 15%</li>
              <li>Ghana: Often exceeding 20%</li>
            </ul>
            <p style="margin-top: 8px; margin-bottom: 0;">Bitcoin's fixed supply of 21 million provides protection against currency devaluation.</p>
          </div>
          
          <div style="flex: 1; min-width: 250px; background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px;">
            <h3 style="color: #fb7185; margin-top: 0; font-size: 18px;">Banking the Unbanked</h3>
            <p style="margin-bottom: 8px;">With over 60% of sub-Saharan Africa unbanked but 80%+ having mobile phones, Bitcoin provides:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Financial services without requiring bank accounts</li>
              <li>Ability to save small amounts (micropayments)</li>
              <li>Control over funds without third-party permissions</li>
              <li>Accessibility through simple feature phones in some cases</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div style="background-color: rgba(225, 29, 72, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #e11d48; margin-top: 0; text-align: center;">Community Success Stories</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 16px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #e11d48;">
            <h3 style="color: #fb7185; margin-top: 0; font-size: 18px;">Farming Cooperatives</h3>
            <p style="margin-bottom: 0;">In Uganda, small-scale farmers have formed cooperatives that use Bitcoin to:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Receive direct payments from international buyers</li>
              <li>Eliminate multiple middlemen taking cuts</li>
              <li>Create transparent supply chains</li>
              <li>Increase farmer earnings by 20-40%</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #e11d48;">
            <h3 style="color: #fb7185; margin-top: 0; font-size: 18px;">Educational Initiatives</h3>
            <p style="margin-bottom: 0;">Bitcoin-funded education projects in Tanzania have:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Provided scholarships to over 500 students</li>
              <li>Built facilities in remote areas</li>
              <li>Created sustainable funding mechanisms</li>
              <li>Taught financial literacy alongside traditional subjects</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px; border-left: 4px solid #e11d48;">
            <h3 style="color: #fb7185; margin-top: 0; font-size: 18px;">Entrepreneurship</h3>
            <p style="margin-bottom: 0;">Bitcoin is fostering entrepreneurship by:</p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Enabling African developers to receive international payments</li>
              <li>Creating local Bitcoin exchanges and services</li>
              <li>Building Bitcoin education businesses</li>
              <li>Developing Africa-specific Bitcoin wallet solutions</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div style="background-color: rgba(225, 29, 72, 0.07); border-radius: 8px; padding: 20px;">
        <h2 style="color: #e11d48; margin-top: 0;">Challenges and Solutions</h2>
        
        <p style="margin-bottom: 16px;">Despite its benefits, Bitcoin adoption in Africa faces several challenges:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-top: 16px;">
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px;">
            <h3 style="color: #fb7185; margin-top: 0;">Infrastructure Limitations</h3>
            <p style="margin-bottom: 8px;"><strong>Challenge:</strong> Unreliable internet access and electricity in many regions.</p>
            <p style="margin-bottom: 0;"><strong>Solutions:</strong></p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Offline transaction solutions using SMS</li>
              <li>Solar-powered Bitcoin nodes</li>
              <li>Mesh networks for connectivity in remote areas</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px;">
            <h3 style="color: #fb7185; margin-top: 0;">Regulatory Uncertainty</h3>
            <p style="margin-bottom: 8px;"><strong>Challenge:</strong> Inconsistent or restrictive regulations across different countries.</p>
            <p style="margin-bottom: 0;"><strong>Solutions:</strong></p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Industry associations educating policymakers</li>
              <li>Peer-to-peer trading models avoiding regulatory obstacles</li>
              <li>Focus on countries with progressive regulatory stances</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(0, 0, 0, 0.15); border-radius: 8px; padding: 16px;">
            <h3 style="color: #fb7185; margin-top: 0;">Education Gap</h3>
            <p style="margin-bottom: 8px;"><strong>Challenge:</strong> Limited understanding of Bitcoin and how to use it securely.</p>
            <p style="margin-bottom: 0;"><strong>Solutions:</strong></p>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li>Community-led education initiatives</li>
              <li>Simplified, localized wallet interfaces</li>
              <li>Bitcoin educational content in local languages</li>
              <li>Hands-on training through Bitcoin meetups</li>
            </ul>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 12px; margin-top: 16px; text-align: center;">
          <p style="margin: 0; font-style: italic;">Bitcoin's impact in Africa demonstrates how technology designed for freedom and inclusion can transform lives when applied to real-world challenges.</p>
        </div>
      </div>
    `,
    contentType: 'realUseCase',
    unlocked: true,
    completed: false
  },
  {
    id: 2,
    title: "Sending Value Without Borders",
    subtitle: "Lightning Network Power",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "The Lightning Network is revolutionizing how Africans send and receive money, enabling near-instant, low-cost transactions across borders. This mission explores how this second-layer solution makes Bitcoin practical for everyday use."
      ),
      React.createElement("p", null, 
        "Unlike traditional mobile money systems, which are often limited by national boundaries, Lightning Network connections transcend borders, creating a seamless payment network throughout Africa and beyond."
      ),
      React.createElement("p", null, 
        "You'll learn how Lightning is being used for cross-country payments, supporting content creators through microtips, purchasing mobile airtime, and other practical applications."
      ),
      React.createElement("h3", { className: "text-lg font-semibold mt-6 mb-2" }, "Key Lightning Concepts:"),
      React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
        React.createElement("li", null, "Speed and Cost: Near-instant transactions with minimal fees"),
        React.createElement("li", null, "Payment Channels: How Lightning maintains Bitcoin's security while scaling"),
        React.createElement("li", null, "Routing: How payments find their way across the network"),
        React.createElement("li", null, "Use Cases: Real examples from across Africa"),
        React.createElement("li", null, "Mobile Integration: How Lightning works on basic smartphones")
      ),
      React.createElement("p", { className: "mt-4" },
        "Through interactive challenges, you'll experience the power of Lightning first-hand and understand why it's especially valuable in regions with fragmented payment systems and cross-border needs."
      )
    ),
    contentType: 'lightningNetwork',
    unlocked: true,
    completed: false
  },
  {
    id: 3,
    title: "Building With Bitcoin",
    subtitle: "Builders, Coders, Creators",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "Africa is home to a growing community of innovators and builders who are creating impactful Bitcoin solutions. This mission highlights their work and inspires you to see yourself as a potential contributor to the ecosystem."
      ),
      React.createElement("p", null, 
        "From educational podcasts in Zambia to sustainable mining operations using hydroelectric power in Congo, and blockchain education hubs in Ghana and Nigeria, Africans are not just using Bitcoin—they're actively shaping its future."
      ),
      React.createElement("p", null, 
        "This mission will introduce you to these builders and their projects, showing the diverse ways people contribute to the Bitcoin ecosystem in Africa."
      ),
      React.createElement("h3", { className: "text-lg font-semibold mt-6 mb-2" }, "African Bitcoin Initiatives:"),
      React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
        React.createElement("li", null, "Educational Content: Podcasts and resources that spread knowledge"),
        React.createElement("li", null, "Renewable Mining: Sustainable approaches to Bitcoin mining"),
        React.createElement("li", null, "Developer Hubs: Communities fostering technical skills"),
        React.createElement("li", null, "Entrepreneur Networks: Support systems for Bitcoin startups"),
        React.createElement("li", null, "Open Source Projects: African contributions to Bitcoin software")
      ),
      React.createElement("p", { className: "mt-4" },
        "By learning about these initiatives, you'll be inspired to think about how you might contribute to the Bitcoin ecosystem, regardless of your background or skill set."
      )
    ),
    contentType: 'builders',
    unlocked: true,
    completed: false
  },
  {
    id: 4,
    title: "Everyday Bitcoin Tools",
    subtitle: "Apps and Wallets That Work",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "This mission explores the practical tools that Africans are using to engage with Bitcoin effectively in their daily lives. You'll learn about various wallet options and how to choose the right one for different needs."
      ),
      React.createElement("p", null, 
        "From convenient mobile wallets like Phoenix, Muun, and Wallet of Satoshi to services like Bitnob that offer local currency options and Machankura's innovative SMS-based solution for users without internet access, you'll discover tools designed for African contexts."
      ),
      React.createElement("p", null, 
        "Understanding the difference between custodial wallets (where a company holds your Bitcoin) and non-custodial wallets (where you control your own keys) is crucial for making informed choices about security and convenience."
      ),
      React.createElement("h3", { className: "text-lg font-semibold mt-6 mb-2" }, "Key Wallet Types:"),
      React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
        React.createElement("li", null, "Mobile Wallets: Convenient solutions for smartphones"),
        React.createElement("li", null, "Lightning Wallets: Specialized for fast, low-cost transactions"),
        React.createElement("li", null, "Feature Phone Solutions: Options for basic phones"),
        React.createElement("li", null, "Hybrid Wallets: Offering both Bitcoin and local currency features"),
        React.createElement("li", null, "Educational Resources: Tools that help users learn while using")
      ),
      React.createElement("p", { className: "mt-4" },
        "Through practical exercises, you'll learn to match different wallet types to various real-world scenarios, building confidence in using Bitcoin tools effectively."
      )
    ),
    contentType: 'tools',
    unlocked: true,
    completed: false
  },
  {
    id: 5,
    title: "Knowledge Test",
    subtitle: "Africa Rising",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "This mission will test your understanding of Bitcoin's practical applications in Africa, the Lightning Network's benefits, and the tools available for everyday use."
      ),
      React.createElement("p", null, 
        "Through a comprehensive quiz and interactive map challenge, you'll reinforce your knowledge of key concepts and envision how Bitcoin adoption might continue to spread across the continent."
      ),
      React.createElement("p", null, 
        "By plotting your own Bitcoin adoption journey across Africa, you'll develop a sense of agency and possibility, identifying projects and initiatives you might want to join or create."
      ),
      React.createElement("h3", { className: "text-lg font-semibold mt-6 mb-2" }, "Key Topics Covered:"),
      React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
        React.createElement("li", null, "Bitcoin use cases across different African countries"),
        React.createElement("li", null, "Lightning Network functionality and benefits"),
        React.createElement("li", null, "Wallet options and their appropriate use cases"),
        React.createElement("li", null, "Ways to contribute to the Bitcoin ecosystem"),
        React.createElement("li", null, "The Ubuntu philosophy in the context of Bitcoin adoption")
      ),
      React.createElement("p", { className: "mt-4" },
        "This mission serves as a comprehensive review of the realm, preparing you for the final bonus mission where you'll apply your knowledge creatively."
      )
    ),
    contentType: 'knowledge',
    unlocked: true,
    completed: false
  },
  {
    id: 6,
    title: "The Seed of Tomorrow",
    subtitle: "Bonus Mission",
    description: React.createElement("div", { className: "space-y-4" },
      React.createElement("p", null, 
        "In this final mission, you'll help Asha develop a Bitcoin project for her village, applying everything you've learned about Bitcoin's practical applications in Africa."
      ),
      React.createElement("p", null, 
        "You can choose from various focus areas: education workshops, farming co-ops, local payment systems, or platforms for creative work. Each option explores different ways Bitcoin can address community needs."
      ),
      React.createElement("p", null, 
        "This mission embodies the spirit of Ubuntu—\"I thrive because we build together\"—encouraging you to think about how Bitcoin enables collective empowerment and community growth."
      ),
      React.createElement("h3", { className: "text-lg font-semibold mt-6 mb-2" }, "Project Areas:"),
      React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
        React.createElement("li", null, "Education: Workshops and resources to teach Bitcoin basics"),
        React.createElement("li", null, "Farming: Co-ops that use Bitcoin for transactions and investment"),
        React.createElement("li", null, "Commerce: Local payment systems for markets and businesses"),
        React.createElement("li", null, "Creative Economy: Platforms for artists to receive Bitcoin for their work"),
        React.createElement("li", null, "Community Savings: Bitcoin-based group saving initiatives")
      ),
      React.createElement("p", { className: "mt-4" },
        "By creating a project pitch and assembling a team with diverse skills, you'll gain practical insights into how Bitcoin projects come to life and how they can benefit entire communities."
      )
    ),
    contentType: 'bonus',
    unlocked: true,
    completed: false
  }
];