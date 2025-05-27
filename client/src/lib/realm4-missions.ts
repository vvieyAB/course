import React from 'react';

export interface MissionContent {
  id: number;
  title: string;
  subtitle?: string;
  simulationType: 'mining' | 'consensus' | 'energy' | 'africa' | 'knowledge' | 'halving';
  content: React.ReactNode;
  completionMessage?: string;
}

// Helper function to create content more easily
const createContent = (elements: React.ReactNode[]): React.ReactNode => {
  return React.createElement(React.Fragment, null, ...elements);
};

export const realm4Missions: MissionContent[] = [
  {
    id: 1,
    title: "The Power of Proof-of-Work",
    subtitle: "Understanding Bitcoin's Consensus Mechanism",
    simulationType: "mining",
    content: createContent([
      React.createElement('p', { className: "mb-4", key: "intro" },
        "Welcome to The Mountain Forge, where the elemental power of mining transforms energy into digital security. " +
        "Here, in this realm, you'll discover how Bitcoin's proof-of-work system secures the network through computational effort."
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "what-is-mining" }, "What is Mining?"),
      React.createElement('p', { className: "mb-4", key: "mining-desc" },
        "Bitcoin mining is the process by which new bitcoins are created and transactions are added to the blockchain. " +
        "Miners use specialized computers to solve complex mathematical puzzles, competing to find a valid solution faster than others."
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "why-mining" }, "Why Mining Matters"),
      React.createElement('p', { className: "mb-4", key: "mining-matters" }, "Mining serves several crucial functions:"),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "mining-functions" }, [
        React.createElement('li', { key: "function1" }, "It secures the network by making it computationally expensive to attack"),
        React.createElement('li', { key: "function2" }, "It processes and validates transactions"),
        React.createElement('li', { key: "function3" }, "It distributes new bitcoins according to a predictable, predetermined schedule"),
        React.createElement('li', { key: "function4" }, "It achieves consensus without requiring trust in any central authority")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "process" }, "The Mining Process"),
      React.createElement('p', { className: "mb-4", key: "process-intro" }, "At its core, mining involves:"),
      React.createElement('ol', { className: "list-decimal ml-6 mb-4 space-y-2", key: "process-steps" }, [
        React.createElement('li', { key: "step1" }, "Collecting pending transactions from the mempool"),
        React.createElement('li', { key: "step2" }, "Assembling these transactions into a block"),
        React.createElement('li', { key: "step3" }, "Creating a cryptographic puzzle based on this block"),
        React.createElement('li', { key: "step4" }, "Solving the puzzle by finding a value (nonce) that produces a hash with specific characteristics"),
        React.createElement('li', { key: "step5" }, "Broadcasting the solution to the network")
      ]),
      React.createElement('p', { className: "mb-4", key: "pow-explain" },
        "This \"proof-of-work\" is difficult to produce but easy to verify, creating an unforgeable record of transaction history."
      ),
      React.createElement('div', { className: "bg-orange-900/20 border border-orange-800/30 rounded-lg p-4 mb-4", key: "challenge-box" }, [
        React.createElement('h4', { className: "text-lg font-semibold mb-2 text-orange-400", key: "challenge-title" }, "Ready for the Challenge?"),
        React.createElement('p', { key: "challenge-desc" },
          "In the following simulation, you'll experience the mining process firsthand. You'll adjust mining parameters, " +
          "find valid blocks, and understand how difficulty adjustments maintain Bitcoin's steady heartbeat of one block " +
          "approximately every 10 minutes."
        )
      ])
    ]),
    completionMessage: "Congratulations! You've successfully experienced the mining process and understand how proof-of-work secures the Bitcoin network."
  },
  {
    id: 2,
    title: "Securing the Chain",
    subtitle: "How Miners Achieve Consensus",
    simulationType: "consensus",
    content: createContent([
      React.createElement('p', { className: "mb-4", key: "intro" },
        "The Mountain Forge's fire burns brightest when many miners work together. In this mission, you'll discover " +
        "how Bitcoin nodes reach agreement on which transactions are valid and prevent double-spending attacks."
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "double-spend" }, "The Double-Spending Problem"),
      React.createElement('p', { className: "mb-4", key: "double-spend-desc" },
        "Digital information is easily copied. Before Bitcoin, this created a fundamental problem for digital money: " +
        "how do you prevent someone from spending the same digital coins multiple times? This is known as the \"double-spending problem.\""
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "consensus" }, "Distributed Consensus"),
      React.createElement('p', { className: "mb-4", key: "consensus-desc" },
        "Bitcoin solves this through distributed consensus—a system where thousands of independent nodes around the world " +
        "agree on the order and validity of transactions without requiring a central authority."
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "how-consensus" }, "How Consensus Works"),
      React.createElement('ol', { className: "list-decimal ml-6 mb-4 space-y-2", key: "consensus-steps" }, [
        React.createElement('li', { key: "step1" }, "Each node independently validates transactions according to Bitcoin's rules"),
        React.createElement('li', { key: "step2" }, "When a miner successfully mines a block, they broadcast it to all nodes"),
        React.createElement('li', { key: "step3" }, "Each node verifies that all transactions in the block are valid"),
        React.createElement('li', { key: "step4" }, "Nodes accept the block if it's valid and add it to their copy of the blockchain"),
        React.createElement('li', { key: "step5" }, "Miners then begin working on the next block, building on top of the longest valid chain")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "security" }, "Network Security"),
      React.createElement('p', { className: "mb-4", key: "security-intro" }, "This system makes Bitcoin extremely resistant to attacks:"),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "security-points" }, [
        React.createElement('li', { key: "point1" }, "To alter a transaction, an attacker would need to redo the proof-of-work for that block and all subsequent blocks"),
        React.createElement('li', { key: "point2" }, "As the chain grows longer, it becomes exponentially more difficult to modify previous transactions"),
        React.createElement('li', { key: "point3" }, "With honest nodes controlling the majority of mining power, the honest chain will always outpace any attacker")
      ]),
      React.createElement('div', { className: "bg-orange-900/20 border border-orange-800/30 rounded-lg p-4 mb-4", key: "challenge-box" }, [
        React.createElement('h4', { className: "text-lg font-semibold mb-2 text-orange-400", key: "challenge-title" }, "Your Challenge"),
        React.createElement('p', { key: "challenge-desc" },
          "In the following simulation, you'll observe how Bitcoin nodes reach consensus and prevent double-spending. " +
          "You'll be able to interact with nodes, identify valid and invalid transactions, and see how the network " +
          "responds to potential attacks."
        )
      ])
    ]),
    completionMessage: "Excellent work! You now understand how Bitcoin achieves consensus across a distributed network and prevents double-spending."
  },
  {
    id: 3,
    title: "Mining and Energy",
    subtitle: "The Relationship Between Bitcoin and Power Consumption",
    simulationType: "energy",
    content: createContent([
      React.createElement('p', { className: "mb-4", key: "intro" },
        "In the Mountain Forge, energy transforms into security. This mission explores the relationship between Bitcoin mining " +
        "and energy consumption, including the growing trend toward renewable energy sources."
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "energy-security" }, "Energy and Security"),
      React.createElement('p', { className: "mb-4", key: "energy-security-desc" },
        "Bitcoin's security comes from the energy invested in mining. This is not a bug but a feature—by requiring " +
        "real-world resources (energy) to validate transactions, Bitcoin creates a system that can't be easily attacked or corrupted."
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "economics" }, "Mining Economics"),
      React.createElement('p', { className: "mb-4", key: "economics-intro" },
        "Miners are incentivized to find the cheapest energy sources to maximize profits. This has several important consequences:"
      ),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "economics-points" }, [
        React.createElement('li', { key: "point1" }, "Miners often utilize energy that would otherwise be wasted (stranded energy)"),
        React.createElement('li', { key: "point2" }, "They gravitate toward regions with excess energy capacity"),
        React.createElement('li', { key: "point3" }, "Increasingly, miners are using renewable energy sources due to their falling costs"),
        React.createElement('li', { key: "point4" }, "Mining can stabilize power grids by providing flexible demand")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "renewable" }, "The Renewable Shift"),
      React.createElement('p', { className: "mb-4", key: "renewable-intro" },
        "While Bitcoin mining does consume energy, the industry is rapidly shifting toward renewable sources:"
      ),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "renewable-points" }, [
        React.createElement('li', { key: "point1" }, "Hydroelectric power is ideal for mining due to its low cost and reliability"),
        React.createElement('li', { key: "point2" }, "Solar and wind energy, when available, provide zero marginal cost electricity"),
        React.createElement('li', { key: "point3" }, "Excess renewable energy that would otherwise be curtailed can be monetized through mining")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "grid" }, "Grid Stability"),
      React.createElement('p', { className: "mb-4", key: "grid-intro" }, "Bitcoin miners can actually help stabilize power grids:"),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "grid-points" }, [
        React.createElement('li', { key: "point1" }, "They can quickly reduce consumption during peak demand periods"),
        React.createElement('li', { key: "point2" }, "They can increase consumption during periods of excess supply"),
        React.createElement('li', { key: "point3" }, "This flexibility helps balance the intermittent nature of many renewable energy sources")
      ]),
      React.createElement('div', { className: "bg-orange-900/20 border border-orange-800/30 rounded-lg p-4 mb-4", key: "challenge-box" }, [
        React.createElement('h4', { className: "text-lg font-semibold mb-2 text-orange-400", key: "challenge-title" }, "Your Challenge"),
        React.createElement('p', { key: "challenge-desc" },
          "In this simulation, you'll manage a Bitcoin mining operation and make decisions about energy sources. " +
          "You'll balance profitability with environmental considerations and discover how different energy sources " +
          "affect your operation's economics."
        )
      ])
    ]),
    completionMessage: "Great job! You've gained insights into the complex relationship between Bitcoin mining and energy consumption."
  },
  {
    id: 4,
    title: "Mining in Africa",
    subtitle: "Economic Opportunities Through Bitcoin",
    simulationType: "africa",
    content: createContent([
      React.createElement('p', { className: "mb-4", key: "intro" },
        "As we continue our journey through the Mountain Forge, we'll explore how Bitcoin mining creates new economic " +
        "opportunities, particularly in regions with abundant energy resources but limited infrastructure, like many parts of Africa."
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "potential" }, "Africa's Energy Potential"),
      React.createElement('p', { className: "mb-4", key: "potential-intro" }, "Africa has enormous untapped energy resources:"),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "potential-points" }, [
        React.createElement('li', { key: "point1" }, "Over 40% of global solar potential"),
        React.createElement('li', { key: "point2" }, "Vast hydroelectric capacity, much of it undeveloped"),
        React.createElement('li', { key: "point3" }, "Significant natural gas reserves, often flared rather than utilized"),
        React.createElement('li', { key: "point4" }, "Geothermal resources in East African countries")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "challenges" }, "The Development Challenge"),
      React.createElement('p', { className: "mb-4", key: "challenges-intro" },
        "Despite this potential, many African countries face challenges in energy development:"
      ),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "challenges-points" }, [
        React.createElement('li', { key: "point1" }, "Limited capital for large infrastructure projects"),
        React.createElement('li', { key: "point2" }, "Insufficient demand in remote areas to justify grid extension"),
        React.createElement('li', { key: "point3" }, "Difficulties attracting foreign investment"),
        React.createElement('li', { key: "point4" }, "Challenges in monetizing energy resources")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "driver" }, "Mining as an Economic Driver"),
      React.createElement('p', { className: "mb-4", key: "driver-intro" },
        "Bitcoin mining offers unique advantages for African energy development:"
      ),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "driver-points" }, [
        React.createElement('li', { key: "point1" }, "It provides immediate, location-independent demand for electricity"),
        React.createElement('li', { key: "point2" }, "It can generate revenue from otherwise stranded or underutilized energy resources"),
        React.createElement('li', { key: "point3" }, "Mining revenue can fund infrastructure development that benefits local communities"),
        React.createElement('li', { key: "point4" }, "It creates jobs and skills training in both direct operations and supporting services")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "examples" }, "Real-World Examples"),
      React.createElement('p', { className: "mb-4", key: "examples-intro" },
        "Several African countries are beginning to explore Bitcoin mining:"
      ),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "examples-points" }, [
        React.createElement('li', { key: "point1" }, "Kenya is using geothermal energy for Bitcoin mining"),
        React.createElement('li', { key: "point2" }, "Malawi has mining operations powered by hydroelectric sources"),
        React.createElement('li', { key: "point3" }, "Nigeria and Ghana are exploring using flared natural gas for mining"),
        React.createElement('li', { key: "point4" }, "Morocco and Egypt are developing solar-powered mining operations")
      ]),
      React.createElement('div', { className: "bg-orange-900/20 border border-orange-800/30 rounded-lg p-4 mb-4", key: "challenge-box" }, [
        React.createElement('h4', { className: "text-lg font-semibold mb-2 text-orange-400", key: "challenge-title" }, "Your Challenge"),
        React.createElement('p', { key: "challenge-desc" },
          "In this simulation, you'll analyze different African countries and their energy potentials, then develop a Bitcoin " +
          "mining strategy that maximizes both economic benefits and local development. Consider factors like energy sources, " +
          "infrastructure, regulatory environment, and community impact."
        )
      ])
    ]),
    completionMessage: "Wonderful! You've discovered how Bitcoin mining can help develop Africa's abundant energy resources and create economic opportunities."
  },
  {
    id: 5,
    title: "The Bitcoin Halving",
    subtitle: "Monetary Policy Set in Code",
    simulationType: "halving",
    content: createContent([
      React.createElement('p', { className: "mb-4", key: "intro" },
        "The Mountain Forge's fire burns steadily, but every four years, a remarkable event occurs: the Bitcoin halving. " +
        "This mission explores how Bitcoin's supply schedule works and why it's crucial to Bitcoin's monetary policy."
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "what-is" }, "What is the Halving?"),
      React.createElement('p', { className: "mb-4", key: "what-is-desc" },
        "Approximately every four years (or every 210,000 blocks), the reward that miners receive for successfully " +
        "mining a block is cut in half. This event is known as \"the halving\" and is coded directly into Bitcoin's protocol."
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "supply" }, "Bitcoin's Supply Schedule"),
      React.createElement('p', { className: "mb-4", key: "supply-intro" },
        "Bitcoin was designed with a finite supply and a predictable issuance schedule:"
      ),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "supply-points" }, [
        React.createElement('li', { key: "point1" }, "The initial block reward was 50 bitcoins per block"),
        React.createElement('li', { key: "point2" }, "This reward halves approximately every four years"),
        React.createElement('li', { key: "point3" }, "The current block reward is 6.25 bitcoins (as of 2023)"),
        React.createElement('li', { key: "point4" }, "The next halving will reduce this to 3.125 bitcoins per block"),
        React.createElement('li', { key: "point5" }, "This process continues until all 21 million bitcoins are mined (around the year 2140)")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "economics" }, "Economic Implications"),
      React.createElement('p', { className: "mb-4", key: "economics-intro" }, "The halving has significant economic implications:"),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "economics-points" }, [
        React.createElement('li', { key: "point1" }, "It creates a predictable, decreasing rate of new supply"),
        React.createElement('li', { key: "point2" }, "It leads to Bitcoin's disinflationary nature, with inflation dropping over time"),
        React.createElement('li', { key: "point3" }, "It contrasts sharply with fiat currencies, which typically have unlimited and unpredictable issuance"),
        React.createElement('li', { key: "point4" }, "It may contribute to price appreciation if demand remains constant or increases while supply growth slows")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "impact" }, "Impact on Miners"),
      React.createElement('p', { className: "mb-4", key: "impact-intro" }, "For miners, the halving creates challenges and opportunities:"),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "impact-points" }, [
        React.createElement('li', { key: "point1" }, "Mining revenue from new coins is cut in half overnight"),
        React.createElement('li', { key: "point2" }, "Less efficient miners may become unprofitable and shut down"),
        React.createElement('li', { key: "point3" }, "Historically, Bitcoin's price has increased significantly in the 12-18 months following each halving"),
        React.createElement('li', { key: "point4" }, "Transaction fees become increasingly important as block rewards diminish")
      ]),
      React.createElement('div', { className: "bg-orange-900/20 border border-orange-800/30 rounded-lg p-4 mb-4", key: "challenge-box" }, [
        React.createElement('h4', { className: "text-lg font-semibold mb-2 text-orange-400", key: "challenge-title" }, "Your Challenge"),
        React.createElement('p', { key: "challenge-desc" },
          "In this simulation, you'll experience the impact of Bitcoin halvings on mining economics and the broader market. " +
          "You'll develop strategies to adapt to changing reward structures and observe how halvings affect Bitcoin's supply " +
          "and potential value."
        )
      ])
    ]),
    completionMessage: "Excellent! You now understand how Bitcoin's halving mechanism creates a predictable monetary policy and affects mining economics."
  },
  {
    id: 6,
    title: "Mastering Mining Concepts",
    subtitle: "Test Your Knowledge",
    simulationType: "knowledge",
    content: createContent([
      React.createElement('p', { className: "mb-4", key: "intro" },
        "You've journeyed through the Mountain Forge and learned about Bitcoin mining from multiple perspectives. " +
        "Now it's time to test your knowledge and prove your mastery of these concepts."
      ),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "ecosystem" }, "The Mining Ecosystem"),
      React.createElement('p', { className: "mb-4", key: "ecosystem-intro" }, "Bitcoin mining is a complex ecosystem that combines:"),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "ecosystem-points" }, [
        React.createElement('li', { key: "point1" }, "Technical elements: hashing, proof-of-work, difficulty adjustments"),
        React.createElement('li', { key: "point2" }, "Economic principles: game theory, incentives, supply and demand"),
        React.createElement('li', { key: "point3" }, "Energy considerations: consumption, sources, grid effects"),
        React.createElement('li', { key: "point4" }, "Security mechanisms: distributed consensus, attack resistance"),
        React.createElement('li', { key: "point5" }, "Global impacts: economic development, financial inclusion, monetary policy")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "principles" }, "Key Principles"),
      React.createElement('p', { className: "mb-4", key: "principles-intro" },
        "As you prepare for your knowledge challenge, remember these key principles:"
      ),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "principles-points" }, [
        React.createElement('li', { key: "point1" }, "Mining transforms physical energy into digital security"),
        React.createElement('li', { key: "point2" }, "The difficulty adjustment maintains Bitcoin's steady block time"),
        React.createElement('li', { key: "point3" }, "The halving schedule creates a predictable monetary policy"),
        React.createElement('li', { key: "point4" }, "Miners are incentivized to seek the cheapest energy sources"),
        React.createElement('li', { key: "point5" }, "Mining enables consensus without requiring trust in any central authority")
      ]),
      React.createElement('h3', { className: "text-xl font-semibold mb-2 text-orange-400", key: "significance" }, "Real-World Significance"),
      React.createElement('p', { className: "mb-4", key: "significance-intro" },
        "Understanding mining helps you grasp why Bitcoin represents a fundamental innovation:"
      ),
      React.createElement('ul', { className: "list-disc ml-6 mb-4 space-y-2", key: "significance-points" }, [
        React.createElement('li', { key: "point1" }, "It solves the double-spending problem without requiring trust"),
        React.createElement('li', { key: "point2" }, "It creates digital scarcity through proof-of-work"),
        React.createElement('li', { key: "point3" }, "It establishes a monetary system with predictable issuance and fixed supply"),
        React.createElement('li', { key: "point4" }, "It provides economic opportunity and energy monetization globally")
      ]),
      React.createElement('div', { className: "bg-orange-900/20 border border-orange-800/30 rounded-lg p-4 mb-4", key: "challenge-box" }, [
        React.createElement('h4', { className: "text-lg font-semibold mb-2 text-orange-400", key: "challenge-title" }, "Your Challenge"),
        React.createElement('p', { key: "challenge-desc" },
          "In this final challenge, you'll answer a series of questions about Bitcoin mining, its economic implications, " +
          "energy considerations, and technical aspects. Demonstrate your understanding of how mining secures the network, " +
          "distributes new bitcoins, and creates a trustless consensus system."
        )
      ])
    ]),
    completionMessage: "Congratulations! You've proven your knowledge of Bitcoin mining concepts and completed your journey through the Mountain Forge."
  }
];