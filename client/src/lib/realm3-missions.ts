// Type Definitions
type MissionContent = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  objectives: string[];
  simulationType: 'cryptography' | 'hashing' | 'merkle' | 'network' | 'consensus' | 'scripting' | 'utxo' | 'scaling';
  simulationData: {
    coreConcepts: {
      [key: string]: {
        title: string;
        content: string[];
      };
    };
    advancedTopics: {
      [key: string]: {
        title: string;
        content: string[];
      };
    };
    securityConsiderations: string[];
    challenges: {
      title: string;
      tasks: string[];
    }[];
    expertResources: string[];
  };
};

// Mission Data
const realm3Missions: MissionContent[] = [
  {
    id: 1,
    title: "Cryptographic Foundations",
    subtitle: "Bitcoin's Security Primitives",
    description: "Explore the cryptographic underpinnings that make Bitcoin secure. Learn about public and private keys, digital signatures, and hashing functions.",
    objectives: [
      "Understand the concept of asymmetric cryptography",
      "Generate a Bitcoin private/public key pair",
      "Sign a message and verify the signature",
      "Comprehend the role of SHA-256 in Bitcoin"
    ],
    simulationType: "cryptography",
    simulationData: {
      coreConcepts: {
        keyGeneration: {
          title: "Public & Private Keys",
          content: [
            "Bitcoin uses elliptic curve cryptography (ECDSA) to create key pairs",
            "The private key is a randomly generated number (256 bits)",
            "The public key is derived from the private key through a one-way function",
            "Never share your private key with anyone"
          ]
        },
        digitalSignatures: {
          title: "Digital Signatures",
          content: [
            "Digital signatures prove ownership without revealing private keys",
            "They confirm the authenticity and integrity of transactions",
            "Signatures are created with private keys and verified with public keys",
            "Bitcoin transactions contain signatures that authorize spending"
          ]
        },
        hashFunctions: {
          title: "Cryptographic Hashing",
          content: [
            "Bitcoin uses SHA-256, a secure hashing algorithm",
            "Hashes convert data of any size to fixed-length outputs",
            "They are deterministic but impossible to reverse-engineer",
            "Even tiny input changes create completely different hash outputs"
          ]
        }
      },
      advancedTopics: {
        hdWallets: {
          title: "Hierarchical Deterministic Wallets",
          content: [
            "HD wallets generate keys from a single seed phrase",
            "They use derivation paths to create multiple addresses",
            "This enables better privacy and backup management",
            "BIP32, BIP39, and BIP44 define standards for HD wallets"
          ]
        },
        schnorrSignatures: {
          title: "Schnorr Signatures",
          content: [
            "Schnorr signatures are more efficient than ECDSA",
            "They enable key aggregation for multisignature transactions",
            "Implemented in Bitcoin via the Taproot upgrade",
            "They improve privacy and reduce transaction sizes"
          ]
        }
      },
      securityConsiderations: [
        "Private keys must be kept secure - loss means loss of funds",
        "Hardware wallets provide specialized security for key storage",
        "Social engineering is often more successful than breaking encryption",
        "Always verify receiving addresses before sending funds",
        "Never enter seed phrases or private keys on websites"
      ],
      challenges: [
        {
          title: "Create Your First Key Pair",
          tasks: [
            "Generate a Bitcoin private key",
            "Derive the corresponding public key",
            "Create a Bitcoin address from your public key",
            "Verify the relationship between these elements"
          ]
        },
        {
          title: "Sign and Verify",
          tasks: [
            "Create a message to sign",
            "Sign the message with your private key",
            "Verify the signature using your public key",
            "Try modifying the message and observe verification failure"
          ]
        }
      ],
      expertResources: [
        "Bitcoin Optech newsletter: https://bitcoinops.org/",
        "Bitcoin Developer Documentation: https://developer.bitcoin.org/",
        "Mastering Bitcoin by Andreas M. Antonopoulos",
        "Programming Bitcoin by Jimmy Song"
      ]
    }
  },
  {
    id: 2,
    title: "Blockchain Structure",
    subtitle: "Understanding Bitcoin's Timechain",
    description: "Dive into the architecture of Bitcoin's blockchain - a chain of cryptographically linked blocks containing transaction data that creates an immutable ledger.",
    objectives: [
      "Understand block structure and headers",
      "Visualize blockchain as a linked data structure",
      "Comprehend how blocks reference previous blocks",
      "Learn about Merkle trees and transaction verification"
    ],
    simulationType: "hashing",
    simulationData: {
      coreConcepts: {
        blockStructure: {
          title: "Block Anatomy",
          content: [
            "Each block contains a header and a list of transactions",
            "Block headers are 80 bytes and include metadata about the block",
            "The genesis block is the first block in the Bitcoin blockchain",
            "Blocks are identified by their hash (block hash)"
          ]
        },
        blockHeaders: {
          title: "Block Headers",
          content: [
            "Version number: indicates which validation rules to follow",
            "Previous block hash: links to the preceding block",
            "Merkle root: represents all transactions in the block",
            "Timestamp: approximate creation time of the block",
            "nBits: encoded form of the current difficulty target",
            "Nonce: arbitrary number miners change to find valid block hash"
          ]
        },
        chainLinks: {
          title: "Blockchain Linkage",
          content: [
            "Each block references the previous block by including its hash",
            "This creates an unbroken chain back to the genesis block",
            "Modifying any block would require recalculating all subsequent blocks",
            "The longest valid chain represents the network consensus"
          ]
        }
      },
      advancedTopics: {
        merkleRoots: {
          title: "Merkle Trees",
          content: [
            "Merkle trees efficiently represent all transactions in a block",
            "They enable simplified payment verification (SPV)",
            "Transactions are hashed in pairs until a single root hash remains",
            "Merkle proofs verify transactions without downloading entire blocks"
          ]
        },
        immutability: {
          title: "Blockchain Immutability",
          content: [
            "Changing historical data requires enormous computational power",
            "Each additional confirmation exponentially increases security",
            "The energy required to modify blocks makes attacks economically unfeasible",
            "This immutability creates Bitcoin's trustless verification model"
          ]
        }
      },
      securityConsiderations: [
        "51% attacks could potentially rewrite recent blockchain history",
        "Transaction finality is probabilistic, not absolute",
        "Chain reorganizations can occur, so wait for multiple confirmations",
        "SPV wallets have weaker security guarantees than full nodes",
        "Consensus rules enforce the integrity of the blockchain"
      ],
      challenges: [
        {
          title: "Block Explorer Investigation",
          tasks: [
            "Examine a recent block using a block explorer",
            "Identify block height, hash, and previous block hash",
            "Count transactions and calculate total value transferred",
            "Inspect the Merkle root and nonce values"
          ]
        },
        {
          title: "Hash Linking Simulation",
          tasks: [
            "Create a basic blockchain data structure",
            "Link blocks together with previous block hashes",
            "Attempt to modify data in an earlier block",
            "Observe how modification breaks the chain"
          ]
        }
      ],
      expertResources: [
        "Bitcoin Whitepaper: https://bitcoin.org/bitcoin.pdf",
        "Block Explorer: https://mempool.space",
        "The Bitcoin Standard by Saifedean Ammous",
        "Bitcoin Wiki: https://en.bitcoin.it/wiki/Main_Page"
      ]
    }
  },
  {
    id: 3,
    title: "Proof of Work & Mining",
    subtitle: "Securing the Network through Computation",
    description: "Explore how miners compete to add blocks to the Bitcoin blockchain through the Proof of Work consensus mechanism, creating Bitcoin's security and issuance model.",
    objectives: [
      "Understand the Proof of Work consensus mechanism",
      "Visualize the mining process and difficulty adjustment",
      "Learn about block rewards and transaction fees",
      "Comprehend Bitcoin's controlled supply and halving events"
    ],
    simulationType: "consensus",
    simulationData: {
      coreConcepts: {
        proofOfWork: {
          title: "Proof of Work Fundamentals",
          content: [
            "Miners compete to find a hash that meets specific criteria",
            "The hash must be below a target value (difficulty)",
            "Finding a valid hash requires enormous computational work",
            "Verifying a valid hash is trivial, creating asymmetric work"
          ]
        },
        difficultyAdjustment: {
          title: "Difficulty Adjustment",
          content: [
            "Bitcoin adjusts mining difficulty every 2016 blocks (~2 weeks)",
            "Target: maintain 10-minute average block time",
            "Difficulty increases if blocks are found too quickly",
            "Difficulty decreases if blocks are found too slowly",
            "This self-regulation maintains Bitcoin's emission schedule"
          ]
        },
        blockRewards: {
          title: "Block Rewards & Fees",
          content: [
            "Miners receive two types of rewards: block subsidy and transaction fees",
            "Block subsidy is newly created Bitcoin (currently 6.25 BTC per block)",
            "Transaction fees are paid by users for transaction inclusion",
            "As block subsidy decreases, fees become more important for security"
          ]
        }
      },
      advancedTopics: {
        halving: {
          title: "Halving Events",
          content: [
            "Block subsidy cuts in half every 210,000 blocks (~4 years)",
            "Initial reward was 50 BTC, currently 6.25 BTC per block",
            "This creates a disinflationary supply schedule",
            "Maximum supply is capped at 21 million Bitcoin",
            "Final Bitcoin will be mined around the year 2140"
          ]
        },
        miningHardware: {
          title: "Mining Evolution",
          content: [
            "Mining evolved from CPUs to GPUs to FPGAs to ASICs",
            "ASICs (Application-Specific Integrated Circuits) dominate mining",
            "Hash rate is measured in hashes per second (H/s, KH/s, MH/s, TH/s, EH/s)",
            "Mining pools allow miners to share rewards and reduce variance",
            "Energy efficiency (joules per terahash) drives mining economics"
          ]
        }
      },
      securityConsiderations: [
        "Mining centralization threatens Bitcoin's censorship resistance",
        "Hash rate determines the cost of attacking the network",
        "Geographic distribution of miners impacts resilience",
        "Energy usage debates often miss nuances of energy markets",
        "Mining incentives align network security with profit-seeking"
      ],
      challenges: [
        {
          title: "Mine a Block (Simulation)",
          tasks: [
            "Adjust variables in the mining simulation",
            "Find a valid nonce that produces a hash below target",
            "Experience difficulty adjustment effects",
            "Calculate expected time to find a block at different hash rates"
          ]
        },
        {
          title: "Mining Economics",
          tasks: [
            "Calculate mining profitability with given parameters",
            "Analyze break-even electricity prices",
            "Predict impact of halving on mining operations",
            "Compare mining vs. buying Bitcoin directly"
          ]
        }
      ],
      expertResources: [
        "Hashrate Distribution: https://mempool.space/graphs/mining/hashrate-distribution",
        "Bitcoin Energy Consumption Index: https://ccaf.io/cbnsi/cbeci",
        "The Blocksize War by Jonathan Bier",
        "Grokking Bitcoin by Kalle Rosenbaum"
      ]
    }
  },
  {
    id: 4,
    title: "Transaction Mechanics",
    subtitle: "Understanding Bitcoin's UTXO Model",
    description: "Learn how Bitcoin transactions work, from the UTXO model to transaction fees, scriptability, and the mempool. Understand how Bitcoin maintains its accounting system.",
    objectives: [
      "Master the UTXO (Unspent Transaction Output) model",
      "Create and analyze Bitcoin transactions",
      "Understand transaction fees and the mempool",
      "Learn about transaction scripts and programmability"
    ],
    simulationType: "utxo",
    simulationData: {
      coreConcepts: {
        utxoModel: {
          title: "UTXO Model Basics",
          content: [
            "Bitcoin uses UTXOs (Unspent Transaction Outputs) instead of account balances",
            "Transactions consume UTXOs as inputs and create new UTXOs as outputs",
            "Your 'balance' is the sum of all UTXOs you can spend with your keys",
            "This design enables efficient verification and parallel processing"
          ]
        },
        transactionStructure: {
          title: "Transaction Structure",
          content: [
            "Transaction ID (TXID): hash of transaction data",
            "Inputs: references to previous UTXOs being spent",
            "Outputs: new UTXOs being created",
            "Each input includes a signature proving ownership",
            "Each output specifies an amount and recipient conditions"
          ]
        },
        transactionFees: {
          title: "Transaction Fees",
          content: [
            "Fees are the difference between input and output amounts",
            "Miners prioritize transactions with higher fees",
            "Fee rates are measured in satoshis per virtual byte (sat/vB)",
            "Fee estimation depends on mempool congestion",
            "Fee markets emerge during high demand periods"
          ]
        }
      },
      advancedTopics: {
        bitcoinScript: {
          title: "Bitcoin Script",
          content: [
            "Bitcoin uses a stack-based scripting language",
            "Scripts define the conditions for spending UTXOs",
            "Common script types: P2PKH, P2SH, P2WPKH, P2WSH, P2TR",
            "Scripts enable features like multisig, timelocks, and more",
            "Script execution is deterministic and constrained for security"
          ]
        },
        mempoolDynamics: {
          title: "Mempool Dynamics",
          content: [
            "The mempool holds unconfirmed transactions",
            "Each node maintains its own mempool with size limits",
            "Transactions compete for block space based on fee rates",
            "Replace-By-Fee (RBF) allows fee bumping before confirmation",
            "Child-Pays-For-Parent (CPFP) incentivizes confirming parent transactions"
          ]
        }
      },
      securityConsiderations: [
        "Zero-confirmation transactions are not secure",
        "Transaction malleability can change TXIDs before confirmation",
        "Fee sniping attacks target future block reward extraction",
        "Dust UTXOs can become economically unspendable",
        "Change address reuse compromises privacy"
      ],
      challenges: [
        {
          title: "Create a Transaction",
          tasks: [
            "Select UTXOs as inputs",
            "Specify output amounts and addresses",
            "Calculate appropriate fee based on transaction size",
            "Sign the transaction with your private key",
            "Broadcast the transaction to the Bitcoin network"
          ]
        },
        {
          title: "UTXO Management",
          tasks: [
            "Analyze coin selection algorithms",
            "Practice fee estimation during varying network conditions",
            "Implement change address management",
            "Consider privacy implications of transaction patterns"
          ]
        }
      ],
      expertResources: [
        "Mempool Observer: https://mempool.space",
        "Bitcoin Script Guide: https://en.bitcoin.it/wiki/Script",
        "Bitcoin Developer Guide: https://developer.bitcoin.org/",
        "Programming Bitcoin by Jimmy Song"
      ]
    }
  },
  {
    id: 5,
    title: "Network & Nodes",
    subtitle: "The Peer-to-Peer Bitcoin Network",
    description: "Explore the decentralized peer-to-peer network that powers Bitcoin, including node types, communication protocols, and ensuring network integrity.",
    objectives: [
      "Understand the peer-to-peer architecture of Bitcoin",
      "Differentiate between node types (full, light, pruned)",
      "Learn about network message propagation",
      "Comprehend Bitcoin's consensus rules enforcement"
    ],
    simulationType: "network",
    simulationData: {
      coreConcepts: {
        nodeTypes: {
          title: "Bitcoin Node Types",
          content: [
            "Full nodes: download and validate the entire blockchain",
            "Pruned nodes: validate everything but discard old blocks to save space",
            "Light clients (SPV): only download headers and relevant transactions",
            "Mining nodes: full nodes that also create new blocks",
            "Running a full node is the most trustless way to use Bitcoin"
          ]
        },
        peerDiscovery: {
          title: "Peer Discovery & Connectivity",
          content: [
            "Nodes find peers through DNS seeds and hardcoded addresses",
            "The P2P network uses a gossip protocol for message propagation",
            "Nodes typically maintain 8-125 connections to other peers",
            "Network is designed to be resilient to node failures and attacks",
            "Tor and other privacy networks can enhance connection privacy"
          ]
        },
        networkConsensus: {
          title: "Network Consensus",
          content: [
            "Nodes independently verify all transactions and blocks",
            "Consensus rules determine valid transactions and blocks",
            "Invalid transactions/blocks are rejected and not propagated",
            "The longest valid chain represents consensus",
            "'Nodes, not miners' enforce Bitcoin's rules"
          ]
        }
      },
      advancedTopics: {
        networkUpgrades: {
          title: "Network Upgrades",
          content: [
            "Soft forks: backward-compatible upgrades (e.g., SegWit, Taproot)",
            "Hard forks: non-backward-compatible changes requiring all nodes to upgrade",
            "Bitcoin Improvement Proposals (BIPs) document protocol changes",
            "User-activated upgrades demonstrate Bitcoin's governance model",
            "Social consensus precedes technical implementation"
          ]
        },
        networkAttacks: {
          title: "Network Resilience",
          content: [
            "Sybil attacks: flooding the network with malicious nodes",
            "Eclipse attacks: isolating nodes from honest peers",
            "DDoS attacks: overwhelming nodes with traffic",
            "BGP hijacking: redirecting network traffic at the routing level",
            "Countermeasures include connection diversity and authentication"
          ]
        }
      },
      securityConsiderations: [
        "Trusting third-party nodes compromises Bitcoin's trustless model",
        "Network partitions can cause temporary chain splits",
        "Privacy leakage occurs when connecting to public nodes",
        "Bandwidth and storage requirements increase over time",
        "Initial Block Download (IBD) represents a bootstrapping challenge"
      ],
      challenges: [
        {
          title: "Set Up Your Own Node",
          tasks: [
            "Choose between full, pruned, or lightning node",
            "Install Bitcoin Core or alternative implementation",
            "Configure for optimal security and performance",
            "Connect your wallet to your node",
            "Verify you're validating blocks independently"
          ]
        },
        {
          title: "Network Simulation",
          tasks: [
            "Visualize message propagation across the network",
            "Experience block propagation latency",
            "Simulate different network topologies",
            "Test network resilience to node failures"
          ]
        }
      ],
      expertResources: [
        "Bitcoin Core: https://bitcoincore.org/",
        "Alternative node implementations: BTCPay, Umbrel, myNode",
        "Bitcoin Optech Topics: https://bitcoinops.org/en/topics/",
        "Mastering Bitcoin by Andreas M. Antonopoulos"
      ]
    }
  },
  {
    id: 6,
    title: "Wallets & Key Management",
    subtitle: "Securing Your Bitcoin",
    description: "Master the fundamentals of Bitcoin wallets, key management, and best practices for secure Bitcoin storage and transactions.",
    objectives: [
      "Understand different wallet types and security models",
      "Learn proper backup and recovery procedures",
      "Implement best practices for key management",
      "Explore multisignature and advanced security techniques"
    ],
    simulationType: "cryptography",
    simulationData: {
      coreConcepts: {
        walletTypes: {
          title: "Wallet Types & Security Models",
          content: [
            "Hardware wallets: dedicated devices for key storage and signing",
            "Software wallets: desktop, mobile, and web applications",
            "Paper wallets: cold storage with physically printed keys",
            "Watch-only wallets: monitor balances without private keys",
            "Hot wallets (online) vs. Cold storage (offline)"
          ]
        },
        seedPhrases: {
          title: "Seed Phrases & Backups",
          content: [
            "Seed phrases (BIP39): human-readable backup of wallet entropy",
            "Typically 12 or 24 words from a standardized wordlist",
            "Can regenerate all keys and addresses in an HD wallet",
            "Should be stored securely offline, away from digital devices",
            "Consider physical durability, redundancy, and inheritance"
          ]
        },
        addressTypes: {
          title: "Address Types",
          content: [
            "Legacy (P2PKH): begins with '1'",
            "P2SH: begins with '3', often used for multisig",
            "Native SegWit (P2WPKH): begins with 'bc1q'",
            "Taproot (P2TR): begins with 'bc1p'",
            "Each address type has different fee structures and capabilities"
          ]
        }
      },
      advancedTopics: {
        multisignature: {
          title: "Multisignature Security",
          content: [
            "M-of-N setups require multiple signatures to authorize spending",
            "Distributes security across multiple keys/devices/locations",
            "Common configurations: 2-of-3, 3-of-5, 2-of-2",
            "Taproot enables more private and efficient multisig",
            "Collaborative custody models use multisig"
          ]
        },
        inheritance: {
          title: "Inheritance Planning",
          content: [
            "Dead man's switch mechanisms",
            "Shamir's Secret Sharing for distributed recovery",
            "Social recovery methods with trusted contacts",
            "Balance between security and inheritance accessibility",
            "Documentation protocols for heirs"
          ]
        }
      },
      securityConsiderations: [
        "Single points of failure in backup strategies",
        "Malware targeting seed phrases and private keys",
        "Physical security risks (theft, natural disasters)",
        "Supply chain attacks on hardware devices",
        "Social engineering targeting recovery processes"
      ],
      challenges: [
        {
          title: "Wallet Setup & Backup",
          tasks: [
            "Create a new wallet with proper entropy source",
            "Secure the seed phrase using best practices",
            "Test recovery procedure from seed phrase",
            "Implement address verification procedures",
            "Document security protocols for future reference"
          ]
        },
        {
          title: "Multi-device Security",
          tasks: [
            "Set up a multisignature wallet",
            "Distribute keys across different security domains",
            "Practice transaction signing with multiple devices",
            "Create and test recovery scenarios",
            "Evaluate security-convenience tradeoffs"
          ]
        }
      ],
      expertResources: [
        "Glacier Protocol: https://glacierprotocol.org/",
        "Casa security blog: https://blog.keys.casa/",
        "BTCsessions YouTube guides: https://www.youtube.com/c/BTCSessions",
        "Jameson Lopp's Bitcoin Security Guide: https://www.lopp.net/bitcoin-information/security.html"
      ]
    }
  },
  {
    id: 7,
    title: "Privacy & Fungibility",
    subtitle: "Maintaining Financial Privacy on the Bitcoin Network",
    description: "Understand the challenges and solutions for privacy in Bitcoin's transparent blockchain, including best practices and emerging technologies.",
    objectives: [
      "Learn about Bitcoin's privacy model and limitations",
      "Master techniques for improving transaction privacy",
      "Understand address reuse risks and chain analysis",
      "Explore emerging privacy enhancements like CoinJoin"
    ],
    simulationType: "network",
    simulationData: {
      coreConcepts: {
        transparentLedger: {
          title: "Blockchain Transparency",
          content: [
            "Bitcoin's blockchain is pseudonymous, not anonymous",
            "All transactions are publicly visible and permanently recorded",
            "Addresses are not directly tied to identities but can be linked",
            "Chain analysis can track fund flows between addresses",
            "Privacy requires deliberate techniques and practices"
          ]
        },
        addressReuse: {
          title: "Address Reuse Risks",
          content: [
            "Reusing addresses links your transactions together",
            "HD wallets generate new addresses to improve privacy",
            "Address reuse creates a transaction graph",
            "Privacy best practice: use each address only once",
            "Address clustering techniques used by surveillance companies"
          ]
        },
        utxoManagement: {
          title: "UTXO Privacy Management",
          content: [
            "Each UTXO has its own privacy history",
            "Combining UTXOs in transactions links their histories",
            "Coin selection algorithms impact privacy",
            "Large or round-number transactions stand out",
            "Transaction timing patterns can reveal information"
          ]
        }
      },
      advancedTopics: {
        coinJoinTechniques: {
          title: "CoinJoin & Collaborative Transactions",
          content: [
            "CoinJoin: multiple users combine transactions to obscure links",
            "Implementations: Wasabi, Samourai Whirlpool, JoinMarket",
            "Equal output amounts prevent input-output linking",
            "PayJoin (P2EP): collaborative transactions that break common heuristics",
            "Repeated mixing increases privacy but has diminishing returns"
          ]
        },
        lightningPrivacy: {
          title: "Lightning Network Privacy",
          content: [
            "Lightning offers improved privacy through off-chain transactions",
            "Onion routing hides payment paths from intermediary nodes",
            "Channel opening/closing transactions still visible on-chain",
            "Private channels not announced to the network",
            "Tradeoffs between privacy, liquidity, and routing success"
          ]
        }
      },
      securityConsiderations: [
        "KYC/AML regulations create privacy choke points",
        "Chain surveillance companies track blockchain activity",
        "Address reuse severely compromises privacy",
        "Transaction fingerprinting through unique patterns",
        "IP address leakage when broadcasting transactions"
      ],
      challenges: [
        {
          title: "Privacy Analysis",
          tasks: [
            "Analyze a bitcoin address on a block explorer",
            "Identify potential privacy leaks in transaction history",
            "Recognize clustering heuristics in action",
            "Calculate the privacy set size of different transactions",
            "Evaluate the effectiveness of privacy techniques used"
          ]
        },
        {
          title: "Implement Privacy Best Practices",
          tasks: [
            "Create a Bitcoin privacy checklist",
            "Properly label and manage UTXOs for privacy",
            "Practice coin control techniques",
            "Use Tor or VPN when connecting to Bitcoin network",
            "Evaluate tradeoffs between convenience and privacy"
          ]
        }
      ],
      expertResources: [
        "Bitcoin Privacy Wiki: https://en.bitcoin.it/wiki/Privacy",
        "Samourai Wallet Privacy Features: https://samouraiwallet.com/features",
        "JoinMarket Guide: https://github.com/JoinMarket-Org/joinmarket-clientserver",
        "6102bitcoin Privacy Guide: https://github.com/6102bitcoin/FAQ/blob/master/hodl-privacy.md"
      ]
    }
  },
  {
    id: 8,
    title: "Lightning Network",
    subtitle: "Bitcoin's Layer 2 Scaling Solution",
    description: "Explore the Lightning Network, Bitcoin's layer 2 scaling solution enabling instant micropayments, improved privacy, and enhanced scalability.",
    objectives: [
      "Understand Lightning Network fundamentals",
      "Learn to open, manage, and close payment channels",
      "Master routing payments through the Lightning Network",
      "Comprehend Lightning Network security and privacy features"
    ],
    simulationType: "scaling",
    simulationData: {
      coreConcepts: {
        paymentChannels: {
          title: "Payment Channels",
          content: [
            "Payment channels allow unlimited transactions between two parties",
            "Only channel opening and closing are recorded on-chain",
            "Channels use multisignature addresses and timelocks",
            "Balance updates happen off-chain through signed transactions",
            "Channels enable instant, nearly free Bitcoin transactions"
          ]
        },
        networkRouting: {
          title: "Network Routing",
          content: [
            "The Lightning Network is a network of payment channels",
            "Payments can route through multiple channels (multi-hop)",
            "Nodes discover routes through gossip protocol",
            "Onion routing ensures nodes only know immediate connections",
            "Routing fees incentivize channel operators"
          ]
        },
        channelManagement: {
          title: "Channel Management",
          content: [
            "Channel capacity affects payment size limits",
            "Inbound capacity allows receiving payments",
            "Outbound capacity allows sending payments",
            "Balanced channels maximize routing potential",
            "Channel rebalancing optimizes liquidity distribution"
          ]
        }
      },
      advancedTopics: {
        htlcMechanics: {
          title: "HTLCs & Atomic Swaps",
          content: [
            "HTLCs (Hash Time-Locked Contracts) enable trustless routing",
            "Payment secrets ensure secure multi-hop payments",
            "Atomic Multipath Payments (AMP) split larger payments",
            "Submarine swaps bridge on-chain and Lightning",
            "Channel factories can reduce on-chain footprint"
          ]
        },
        lightningPrivacy: {
          title: "Lightning Privacy Features",
          content: [
            "Payments are not recorded on public blockchain",
            "Onion routing hides payment paths",
            "Payments leave no permanent record",
            "Private channels don't broadcast to the network",
            "Trampoline routing reduces privacy leakage"
          ]
        }
      },
      securityConsiderations: [
        "Channel monitoring required to prevent theft",
        "Watchtowers can monitor channels for offline nodes",
        "Routing requires sufficient liquidity in the correct direction",
        "Force-closing channels can result in higher fees",
        "Lightning still requires occasional on-chain transactions"
      ],
      challenges: [
        {
          title: "Set Up a Lightning Node",
          tasks: [
            "Install Lightning Network node software",
            "Connect to Bitcoin full node",
            "Fund node with Bitcoin",
            "Open channels with strategic peers",
            "Send and receive Lightning payments"
          ]
        },
        {
          title: "Lightning Network Navigation",
          tasks: [
            "Analyze network topology and route options",
            "Practice channel rebalancing techniques",
            "Optimize for low routing fees",
            "Implement backup and recovery procedures",
            "Use Lightning for micropayments and applications"
          ]
        }
      ],
      expertResources: [
        "Lightning Network RFC: https://github.com/lightning/bolts",
        "Lightning Labs documentation: https://docs.lightning.engineering/",
        "LND Developer docs: https://dev.lightning.community/",
        "Mastering the Lightning Network by Andreas M. Antonopoulos and René Pickhardt"
      ]
    }
  }
];

// Core Component IDs
const MISSION_COMPONENTS = {
  ROOT: 'realm3-missions-container',
  MISSION_CARD: (id) => `mission-card-${id}`,
  SIMULATION_VIEW: (type) => `simulation-${type}-view`,
  CHALLENGE_BLOCK: (missionId, challengeIdx) => 
    `challenge-${missionId}-${challengeIdx}`,
  EXPERT_RESOURCES: (missionId) => `expert-resources-${missionId}`
};

import React, { useState, useEffect, useRef, ReactElement } from 'react';

// Main App Component
const BitcoinEducationApp = () => {
  const [missionSystem, setMissionSystem] = useState({
    missions: realm3Missions,
    currentMission: 1,
    progress: {},
    uiState: {
      activeSimulation: null,
      expertMode: false,
    }
  });

  useEffect(() => {
    // Initialize progress tracking for each mission
    const initialProgress = {};
    realm3Missions.forEach(mission => {
      initialProgress[mission.id] = {
        challengesCompleted: 0,
        conceptsMastered: []
      };
    });

    setMissionSystem(prev => ({
      ...prev,
      progress: initialProgress
    }));
  }, []);

  const handleMissionSelect = (missionId) => {
    setMissionSystem(prev => ({
      ...prev,
      currentMission: missionId,
      uiState: {
        ...prev.uiState,
        activeSimulation: null
      }
    }));
  };

  const handleActivateSimulation = (simulationType) => {
    setMissionSystem(prev => ({
      ...prev,
      uiState: {
        ...prev.uiState,
        activeSimulation: simulationType
      }
    }));
  };

  const handleCompleteChallenge = (missionId, challengeIdx) => {
    setMissionSystem(prev => {
      const updatedProgress = {
        ...prev.progress,
        [missionId]: {
          ...prev.progress[missionId],
          challengesCompleted: challengeIdx + 1
        }
      };

      return {
        ...prev,
        progress: updatedProgress
      };
    });
  };

  const toggleExpertMode = () => {
    setMissionSystem(prev => ({
      ...prev,
      uiState: {
        ...prev.uiState,
        expertMode: !prev.uiState.expertMode
      }
    }));
  };

  const currentMissionData = realm3Missions.find(
    mission => mission.id === missionSystem.currentMission
  );

  return (
    <div id={MISSION_COMPONENTS.ROOT} className="bitcoin-education-app">
      <BitcoinHeader 
        expertMode={missionSystem.uiState.expertMode} 
        toggleExpertMode={toggleExpertMode} 
      />

      <MissionSelector 
        missions={realm3Missions} 
        currentMission={missionSystem.currentMission}
        progress={missionSystem.progress}
        onSelectMission={handleMissionSelect} 
      />

      {currentMissionData && (
        <MissionDetails 
          mission={currentMissionData}
          progress={missionSystem.progress[currentMissionData.id]}
          expertMode={missionSystem.uiState.expertMode}
          onActivateSimulation={handleActivateSimulation}
          onCompleteChallenge={handleCompleteChallenge}
        />
      )}

      {missionSystem.uiState.activeSimulation && (
        <SimulationView 
          simulationType={missionSystem.uiState.activeSimulation}
          missionData={currentMissionData}
          expertMode={missionSystem.uiState.expertMode}
        />
      )}

      <WalletIntegration />
      <BitcoinFooter />
    </div>
  );
}

// Header Component
const BitcoinHeader = ({ expertMode, toggleExpertMode }) => {
  return (
    <header className="bitcoin-header">
      <h1>Bitcoin Education Realm</h1>
      <div className="header-controls">
        <button onClick={toggleExpertMode}>
          {expertMode ? "Switch to Basic Mode" : "Switch to Expert Mode"}
        </button>
      </div>
    </header>
  );
};

// Mission Selector Component
const MissionSelector = ({ missions, currentMission, progress, onSelectMission }) => {
  return (
    <div className="mission-selector">
      <h2>Bitcoin Learning Missions</h2>
      <div className="mission-grid">
        {missions.map(mission => (
          <div 
            key={mission.id} 
            id={MISSION_COMPONENTS.MISSION_CARD(mission.id)}
            className={`mission-card ${mission.id === currentMission ? 'active' : ''}`}
            onClick={() => onSelectMission(mission.id)}
          >
            <h3>{mission.title}</h3>
            <p>{mission.subtitle}</p>
            <div className="mission-progress">
              {progress[mission.id] && (
                <div className="progress-bar" 
                  style={{ width: `${(progress[mission.id].challengesCompleted / mission.simulationData.challenges.length) * 100}%` }}>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mission Details Component
const MissionDetails = ({ mission, progress, expertMode, onActivateSimulation, onCompleteChallenge }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="mission-details">
      <h2>{mission.title}: {mission.subtitle}</h2>

      <div className="mission-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}>Overview</button>
        <button 
          className={activeTab === 'concepts' ? 'active' : ''} 
          onClick={() => setActiveTab('concepts')}>Core Concepts</button>
        <button 
          className={activeTab === 'challenges' ? 'active' : ''} 
          onClick={() => setActiveTab('challenges')}>Challenges</button>
        {expertMode && (
          <button 
            className={activeTab === 'advanced' ? 'active' : ''} 
            onClick={() => setActiveTab('advanced')}>Advanced Topics</button>
        )}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="mission-overview">
            <p>{mission.description}</p>
            <h3>Learning Objectives</h3>
            <ul>
              {mission.objectives.map((objective, idx) => (
                <li key={idx}>{objective}</li>
              ))}
            </ul>
            <button 
              className="simulation-button"
              onClick={() => onActivateSimulation(mission.simulationType)}
            >
              Launch Interactive Simulation
            </button>
          </div>
        )}

        {activeTab === 'concepts' && (
          <div className="core-concepts">
            {Object.entries(mission.simulationData.coreConcepts).map(([key, concept]) => (
              <div key={key} className="concept-card">
                <h3>{concept.title}</h3>
                <ul>
                  {concept.content.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="security-considerations">
              <h3>Security Considerations</h3>
              <ul>
                {mission.simulationData.securityConsiderations.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="mission-challenges">
            {mission.simulationData.challenges.map((challenge, idx) => (
              <div 
                key={idx} 
                id={MISSION_COMPONENTS.CHALLENGE_BLOCK(mission.id, idx)}
                className={`challenge-block ${progress && progress.challengesCompleted > idx ? 'completed' : ''}`}
              >
                <h3>{challenge.title}</h3>
                <ol>
                  {challenge.tasks.map((task, taskIdx) => (
                    <li key={taskIdx}>{task}</li>
                  ))}
                </ol>
                <button 
                  onClick={() => onCompleteChallenge(mission.id, idx)}
                  disabled={progress && progress.challengesCompleted > idx}
                >
                  {progress && progress.challengesCompleted > idx ? 'Completed' : 'Mark as Complete'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'advanced' && expertMode && (
          <div className="advanced-topics">
            {Object.entries(mission.simulationData.advancedTopics).map(([key, topic]) => (
              <div key={key} className="advanced-topic-card">
                <h3>{topic.title}</h3>
                <ul>
                  {topic.content.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="expert-resources" id={MISSION_COMPONENTS.EXPERT_RESOURCES(mission.id)}>
              <h3>Expert Resources</h3>
              <ul>
                {mission.simulationData.expertResources.map((resource, idx) => (
                  <li key={idx}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Dynamic Simulation Components
const SimulationView = ({ simulationType, missionData, expertMode }) => {
  const simulationId = MISSION_COMPONENTS.SIMULATION_VIEW(simulationType);

  // Render appropriate simulation based on type
  const renderSimulation = () => {
    switch(simulationType) {
      case 'cryptography':
        return <CryptographySimulation missionData={missionData} expertMode={expertMode} />;
      case 'hashing':
        return <HashingSimulation missionData={missionData} expertMode={expertMode} />;
      case 'merkle':
        return <MerkleTreeSimulation missionData={missionData} expertMode={expertMode} />;
      case 'network':
        return <NetworkSimulation missionData={missionData} expertMode={expertMode} />;
      case 'consensus':
        return <ConsensusSimulation missionData={missionData} expertMode={expertMode} />;
      case 'scripting':
        return <ScriptingSimulation missionData={missionData} expertMode={expertMode} />;
      case 'utxo':
        return <UTXOSimulation missionData={missionData} expertMode={expertMode} />;
      case 'scaling':
        return <ScalingSimulation missionData={missionData} expertMode={expertMode} />;
      default:
        return <div>Simulation type not found</div>;
    }
  };

  return (
    <div id={simulationId} className="simulation-view">
      <h2>{missionData.title} Simulation</h2>
      <div className="simulation-container">
        {renderSimulation()}
      </div>
    </div>
  );
};

// Cryptography Simulation Component
const CryptographySimulation = ({ missionData, expertMode }) => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [verified, setVerified] = useState(null);

  // Simplified simulation functions
  const generateKeyPair = () => {
    // Simulate key generation
    const newPrivKey = Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)).join('');
    setPrivateKey(newPrivKey);

    // Derive "public key" (simplified for simulation)
    const newPubKey = sha256Simulate(newPrivKey).substring(0, 66);
    setPublicKey(newPubKey);

    // Generate address
    const newAddress = 'bc1q' + sha256Simulate(newPubKey).substring(0, 38);
    setAddress(newAddress);
  };

  const signMessage = () => {
    if (!privateKey || !message) return;

    // Simplified signature simulation
    const newSignature = sha256Simulate(privateKey + message);
    setSignature(newSignature);
  };

  const verifySignature = () => {
    if (!signature || !message || !publicKey) return;

    // Simulate verification (in real Bitcoin, more complex)
    const expectedSig = sha256Simulate(privateKey + message);
    setVerified(signature === expectedSig);
  };

  // Simple SHA-256 simulator for demo purposes
  const sha256Simulate = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    // Convert to hex string and ensure it's 64 chars
    let hexHash = Math.abs(hash).toString(16);
    while (hexHash.length < 64) hexHash = '0' + hexHash;
    return hexHash;
  };

  return (
    <div className="cryptography-simulation">
      <div className="simulation-controls">
        <h3>Key Generation</h3>
        <button onClick={generateKeyPair}>Generate New Key Pair</button>

        <div className="key-display">
          <div>
            <h4>Private Key (keep secret!)</h4>
            <div className="key-box">{privateKey || 'Generate keys first'}</div>
          </div>

          <div>
            <h4>Public Key</h4>
            <div className="key-box">{publicKey || 'Generate keys first'}</div>
          </div>

          <div>
            <h4>Bitcoin Address</h4>
            <div className="key-box">{address || 'Generate keys first'}</div>
          </div>
        </div>

        <h3>Digital Signatures</h3>
        <div className="signature-section">
          <div>
            <label>Message to Sign:</label>
            <textarea 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a message to sign"
            />
          </div>

          <button onClick={signMessage} disabled={!privateKey || !message}>
            Sign Message
          </button>

          <div>
            <h4>Signature</h4>
            <div className="signature-box">{signature || 'Sign a message first'}</div>
          </div>

          <button onClick={verifySignature} disabled={!signature || !publicKey || !message}>
            Verify Signature
          </button>

          {verified !== null && (
            <div className={`verification-result ${verified ? 'valid' : 'invalid'}`}>
              Signature is {verified ? 'Valid' : 'Invalid'}
            </div>
          )}
        </div>
      </div>

      {expertMode && (
        <div className="expert-explanation">
          <h3>How Bitcoin Cryptography Works</h3>
          <p>In real Bitcoin, ECDSA on the secp256k1 curve is used for digital signatures. Private keys are 256-bit random numbers, and public keys are points on the elliptic curve. Addresses are derived through multiple hashing operations on the public key.</p>
          <p>Digital signatures prove ownership of Bitcoin without revealing the private key. Each transaction input contains a signature that proves the owner authorized the spending of those coins.</p>
        </div>
      )}
    </div>
  );
};

// Hashing Simulation Component
const HashingSimulation = ({ missionData, expertMode }) => {
  const [blockData, setBlockData] = useState({
    prevBlockHash: '0000000000000000000a562accf1818fed0d2d624828ed47edc7f4e2193738e',
    merkleRoot: '8e97dba943ec9aafd5582e7b6c8511a16a1f5f5e57ec5660bbf6adc4943d0c95',
    timestamp: Date.now(),
    nonce: 0,
    difficulty: 3 // Number of leading zeros required
  });

  const [blockHash, setBlockHash] = useState('');
  const [mining, setMining] = useState(false);
  const miningRef = useRef(false);

  useEffect(() => {
    calculateBlockHash();
  }, [blockData]);

  const calculateBlockHash = () => {
    const blockHeader = `${blockData.prevBlockHash}${blockData.merkleRoot}${blockData.timestamp}${blockData.nonce}`;
    const hash = sha256Simplified(blockHeader);
    setBlockHash(hash);
    return hash;
  };

  const mineBlock = async () => {
    if (mining) return;

    setMining(true);
    miningRef.current = true;

    let currentNonce = blockData.nonce;
    const targetPrefix = '0'.repeat(blockData.difficulty);

    // Mining loop
    while (miningRef.current) {
      const newBlockData = {
        ...blockData,
        nonce: currentNonce
      };

      setBlockData(newBlockData);

      const hash = sha256Simplified(
        `${newBlockData.prevBlockHash}${newBlockData.merkleRoot}${newBlockData.timestamp}${currentNonce}`
      );

      if (hash.startsWith(targetPrefix)) {
        // Found a valid hash
        setBlockHash(hash);
        miningRef.current = false;
        break;
      }

      currentNonce++;

      // Allow UI to update
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    setMining(false);
  };

  const stopMining = () => {
    miningRef.current = false;
    setMining(false);
  };

  // Very simplified SHA-256 function for demonstration
  const sha256Simplified = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    // Convert to hex string
    let hexHash = Math.abs(hash).toString(16);
    while (hexHash.length < 64) hexHash = '0' + hexHash;
    return hexHash;
  };

  const isValidHash = blockHash.startsWith('0'.repeat(blockData.difficulty));

  return (
    <div className="hashing-simulation">
      <h3>Bitcoin Block Mining Simulation</h3>

      <div className="block-structure">
        <div className="block-field">
          <label>Previous Block Hash:</label>
          <input 
            type="text" 
            value={blockData.prevBlockHash}
            onChange={(e) => setBlockData({...blockData, prevBlockHash: e.target.value})}
            readOnly={mining}
          />
        </div>

        <div className="block-field">
          <label>Merkle Root:</label>
          <input 
            type="text" 
            value={blockData.merkleRoot}
            onChange={(e) => setBlockData({...blockData, merkleRoot: e.target.value})}
            readOnly={mining}
          />
        </div>

        <div className="block-field">
          <label>Timestamp:</label>
          <input 
            type="number" 
            value={blockData.timestamp}
            onChange={(e) => setBlockData({...blockData, timestamp: parseInt(e.target.value)})}
            readOnly={mining}
          />
        </div>

        <div className="block-field">
          <label>Nonce:</label>
          <input 
            type="number" 
            value={blockData.nonce}
            onChange={(e) => setBlockData({...blockData, nonce: parseInt(e.target.value)})}
          />
        </div>

        <div className="block-field">
          <label>Difficulty (leading zeros):</label>
          <input 
            type="number" 
            value={blockData.difficulty}
            onChange={(e) => setBlockData({...blockData, difficulty: parseInt(e.target.value)})}
            min="1"
            max="5"
            readOnly={mining}
          />
        </div>
      </div>

      <div className="block-hash">
        <h4>Block Hash:</h4>
        <div className={`hash-display ${isValidHash ? 'valid-hash' : 'invalid-hash'}`}>
          {blockHash}
        </div>
        <div className="hash-status">
          {isValidHash ? 'Valid hash! Block would be accepted.' : 'Invalid hash - keep mining to find a valid hash.'}
        </div>
      </div>

      <div className="mining-controls">
        {!mining ? (
          <button onClick={mineBlock}>Start Mining</button>
        ) : (
          <button onClick={stopMining}>Stop Mining</button>
        )}
        <button onClick={() => setBlockData({...blockData, nonce: 0})}>Reset Nonce</button>
      </div>

      {expertMode && (
        <div className="expert-explanation">
          <h3>How Proof of Work Mining Works</h3>
          <p>Bitcoin miners compete to find a block hash that's below a target value (has a certain number of leading zeros). The only way to find such a hash is through brute force, trying different nonce values. This is called Proof of Work.</p>
          <p>Every ~2 weeks, Bitcoin adjusts the difficulty (target threshold) to maintain a 10-minute average block time.</p>
          <p>Real Bitcoin mining is done with specialized ASIC hardware capable of trillions of hash calculations per second.</p>
        </div>
      )}
    </div>
  );
};

// Network Simulation Component
const NetworkSimulation = ({ missionData, expertMode }) => {
  const [nodes, setNodes] = useState([
    { id: 1, type: 'full', connections: [2, 3, 4], blockHeight: 785000, peers: 8 },
    { id: 2, type: 'full', connections: [1, 3, 5], blockHeight: 785000, peers: 12 },
    { id: 3, type: 'mining', connections: [1, 2, 4, 5], blockHeight: 785000, peers: 15 },
    { id: 4, type: 'pruned', connections: [1, 3, 6], blockHeight: 785000, peers: 6 },
    { id: 5, type: 'full', connections: [2, 3, 7], blockHeight: 785000, peers: 10 },
    { id: 6, type: 'light', connections: [4, 7], blockHeight: 784998, peers: 3 },
    { id: 7, type: 'light', connections: [5, 6], blockHeight: 784999, peers: 4 }
  ]);

  const [newBlock, setNewBlock] = useState(null);
  const [propagationStep, setPropagationStep] = useState(0);
  const [propagationComplete, setPropagationComplete] = useState(false);

  const startBlockPropagation = () => {
    // Create a new block at the mining node (id: 3)
    setNewBlock({
      height: 785001,
      hash: '000000000000000000015da18b7f41d4dbbff78c106c0f54cc6c3d53f1676cf2',
      transactions: 2548,
      size: '1.2 MB',
      miner: 'Node 3'
    });

    setPropagationStep(1);
    setPropagationComplete(false);
  };

  const continueBlockPropagation = () => {
    if (propagationStep >= 3) {
      // Update all nodes to have the new block height
      setNodes(nodes.map(node => {
        if (node.type !== 'light') {
          return {...node, blockHeight: 785001};
        } else {
          // Light nodes get updates slower
          return {...node, blockHeight: 785000};
        }
      }));

      setPropagationComplete(true);
      return;
    }

    setPropagationStep(propagationStep + 1);
  };

  const resetSimulation = () => {
    setNodes(nodes.map(node => ({
      ...node,
      blockHeight: node.type === 'light' ? 784998 + Math.floor(Math.random() * 2) : 785000
    })));

    setNewBlock(null);
    setPropagationStep(0);
    setPropagationComplete(false);
  };

  // Determine which nodes have received the block at current step
  const getNodesWithNewBlock = () => {
    if (!newBlock) return [];

    switch(propagationStep) {
      case 1:
        return [3]; // Only mining node
      case 2: 
        return [1, 2, 3, 4, 5]; // Direct connections
      case 3:
        return [1, 2, 3, 4, 5, 6, 7]; // All nodes
      default:
        return [];
    }
  };

  const nodesWithBlock = getNodesWithNewBlock();

  return (
    <div className="network-simulation">
      <h3>Bitcoin Network Propagation Simulation</h3>

      <div className="network-visualization">
        <svg width="600" height="400" viewBox="0 0 600 400">
          {/* Draw connections between nodes */}
          {nodes.map(node => 
            node.connections.map(connId => {
              const connectedNode = nodes.find(n => n.id === connId);
              // Position nodes in a semi-circle
              const nodeX = 300 + 200 * Math.cos(node.id * Math.PI / 4);
              const nodeY = 200 + 150 * Math.sin(node.id * Math.PI / 4);
              const connX = 300 + 200 * Math.cos(connId * Math.PI / 4);
              const connY = 200 + 150 * Math.sin(connId * Math.PI / 4);

              return (
                <line 
                  key={`conn-${node.id}-${connId}`}
                  x1={nodeX} 
                  y1={nodeY} 
                  x2={connX} 
                  y2={connY} 
                  stroke="#999" 
                  strokeWidth="2"
                />
              );
            })
          )}

          {/* Draw nodes */}
          {nodes.map(node => {
            // Position nodes in a semi-circle
            const nodeX = 300 + 200 * Math.cos(node.id * Math.PI / 4);
            const nodeY = 200 + 150 * Math.sin(node.id * Math.PI / 4);
            const hasNewBlock = nodesWithBlock.includes(node.id);

            // Node type colors
            const nodeColors = {
              'full': '#4CAF50',
              'mining': '#FFC107',
              'pruned': '#2196F3',
              'light': '#9E9E9E'
            };

            return (
              <g key={`node-${node.id}`}>
                <circle 
                  cx={nodeX} 
                  cy={nodeY} 
                  r="25" 
                  fill={hasNewBlock ? '#FF5722' : nodeColors[node.type]} 
                  stroke="#333"
                  strokeWidth="2"
                />
                <text x={nodeX} y={nodeY} textAnchor="middle" dy=".3em" fill="white">
                  {node.id}
                </text>
                <text x={nodeX} y={nodeY + 40} textAnchor="middle" fontSize="12">
                  {node.type} node
                </text>
                <text x={nodeX} y={nodeY + 55} textAnchor="middle" fontSize="10">
                  Block: {node.blockHeight}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="network-controls">
        {!newBlock && (
          <button onClick={startBlockPropagation}>Mine New Block</button>
        )}

        {newBlock && !propagationComplete && (
          <button onClick={continueBlockPropagation}>
            Continue Propagation (Step {propagationStep}/3)
          </button>
        )}

        {propagationComplete && (
          <button onClick={resetSimulation}>Reset Simulation</button>
        )}
      </div>

      {newBlock && (
        <div className="block-info">
          <h4>New Block Information</h4>
          <p>Height: {newBlock.height}</p>
          <p>Hash: {newBlock.hash.substring(0, 16)}...</p>
          <p>Transactions: {newBlock.transactions}</p>
          <p>Size: {newBlock.size}</p>
          <p>Mined by: {newBlock.miner}</p>
          <p>Propagation Status: {
            propagationComplete 
              ? 'Complete - All nodes received the block' 
              : `Step ${propagationStep}/3 - ${nodesWithBlock.length} nodes have the block`
          }</p>
        </div>
      )}

      <div className="node-legend">
        <div><span className="legend-color" style={{backgroundColor: '#4CAF50'}}></span> Full Node</div>
        <div><span className="legend-color" style={{backgroundColor: '#FFC107'}}></span> Mining Node</div>
        <div><span className="legend-color" style={{backgroundColor: '#2196F3'}}></span> Pruned Node</div>
        <div><span className="legend-color" style={{backgroundColor: '#9E9E9E'}}></span> Light Client</div>
        <div><span className="legend-color" style={{backgroundColor: '#FF5722'}}></span> Has New Block</div>
      </div>

      {expertMode && (
        <div className="expert-explanation">
          <h3>Network Propagation Details</h3>
          <p>In the real Bitcoin network, blocks propagate through a gossip protocol. Each node forwards new valid blocks to its peers, who then validate the block before forwarding it further.</p>
          <p>Network latency impacts propagation time, which is why geographic distribution of hashrate is important. Blocks typically reach most network nodes within 1-10 seconds.</p>
          <p>The Compact Block protocol (BIP 152) reduces bandwidth requirements by only transmitting block headers and transaction IDs when peers likely already have the transactions in their mempool.</p>
        </div>
      )}
    </div>
  );
};

// Merkle Tree Simulation
const MerkleTreeSimulation = ({ missionData, expertMode }) => {
  // Implementation similar to HashingSimulation but focused on Merkle trees
  return (
    <div className="merkle-simulation">
      <h3>Merkle Tree Simulation</h3>
      <p>Merkle trees efficiently represent transactions in a block, enabling simplified payment verification (SPV).</p>
      {/* Implementation would be similar to other simulations */}
    </div>
  );
};

// Consensus Simulation
const ConsensusSimulation = ({ missionData, expertMode }) => {
  const [hashRate, setHashRate] = useState(250); // In TH/s
  const [difficulty, setDifficulty] = useState(53e12); // Current Bitcoin difficulty
  const [blocks, setBlocks] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [timeScale, setTimeScale] = useState(10); // 1 sec = 10 mins
  const simulationRef = useRef(null);

  useEffect(() => {
    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, []);

  const startSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setBlocks([]);

    // Calculate expected block time based on hash rate and difficulty
    const expectedSolsPerSec = hashRate * 1e12 / difficulty;
    const expectedBlockTimeMs = (1 / expectedSolsPerSec) * 1000;

    // Scale down time for simulation
    const simulationInterval = expectedBlockTimeMs / timeScale;

    let blockHeight = 785000;

    simulationRef.current = setInterval(() => {
      // Random variation in finding blocks (poisson distribution)
      const randomFactor = -Math.log(Math.random());

      const newBlock = {
        height: blockHeight++,
        timestamp: Date.now(),
        miner: `Miner ${Math.floor(Math.random() * 5) + 1}`,
        transactionCount: Math.floor(Math.random() * 2000) + 1000,
        randomFactor: randomFactor.toFixed(2)
      };

      setBlocks(prevBlocks => [...prevBlocks, newBlock]);

      // Every 6 blocks, adjust difficulty
      if (blocks.length > 0 && blocks.length % 6 === 0) {
        adjustDifficulty();
      }

    }, simulationInterval);
  };

  const stopSimulation = () => {
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
      simulationRef.current = null;
    }
    setIsSimulating(false);
  };

  const adjustDifficulty = () => {
    // In real Bitcoin, difficulty adjusts every 2016 blocks
    // Here we do a simplified adjustment based on recent blocks
    if (blocks.length < 3) return;

    const targetBlockTime = 10 * 60 * 1000 / timeScale; // 10 minutes in ms, scaled

    // Calculate average time between recent blocks
    let timeSum = 0;
    for (let i = 1; i < Math.min(blocks.length, 6); i++) {
      timeSum += blocks[blocks.length - i].timestamp - blocks[blocks.length - i - 1].timestamp;
    }

    const avgBlockTime = timeSum / Math.min(blocks.length - 1, 5);

    // Adjust difficulty proportionally
    const difficultyChange = targetBlockTime / avgBlockTime;

    // Limit adjustment to 300% in either direction
    const cappedChange = Math.max(0.25, Math.min(4, difficultyChange));

    setDifficulty(prevDifficulty => prevDifficulty * cappedChange);
  };

  const formatTimeDiff = (current, previous) => {
    if (!previous) return "Genesis";
    const diffMs = current - previous;
    return `${(diffMs / 1000).toFixed(1)}s (${(diffMs / 1000 * timeScale / 60).toFixed(1)} mins real)`;
  };

  return (
    <div className="consensus-simulation">
      <h3>Bitcoin Mining & Difficulty Adjustment Simulation</h3>

      <div className="simulation-controls">
        <div className="control-group">
          <label>Hash Rate (TH/s):</label>
          <input 
            type="range" 
            min="10" 
            max="1000" 
            value={hashRate} 
            onChange={(e) => setHashRate(Number(e.target.value))}
            disabled={isSimulating}
          />
          <span>{hashRate} TH/s</span>
        </div>

        <div className="control-group">
          <label>Difficulty:</label>
          <input 
            type="number" 
            value={difficulty.toExponential(2)} 
            onChange={(e) => setDifficulty(Number(e.target.value))}
            disabled={isSimulating}
          />
        </div>

        <div className="control-group">
          <label>Time Scale (1 sec = X mins):</label>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={timeScale} 
            onChange={(e) => setTimeScale(Number(e.target.value))}
            disabled={isSimulating}
          />
          <span>{timeScale}x</span>
        </div>

        <div className="simulation-buttons">
          {!isSimulating ? (
            <button onClick={startSimulation}>Start Mining Simulation</button>
          ) : (
            <button onClick={stopSimulation}>Stop Simulation</button>
          )}
        </div>
      </div>

      <div className="mining-stats">
        <p>Expected Block Time: {((1 / ((hashRate * 1e12) / difficulty)) * 60).toFixed(2)} minutes</p>
        <p>Current Mining Difficulty: {difficulty.toExponential(2)}</p>
        <p>Network Hash Rate: {hashRate} TH/s</p>
        <p>Blocks Mined: {blocks.length}</p>
      </div>

      <div className="blocks-container">
        <h4>Recently Mined Blocks</h4>
        <div className="blocks-list">
          {blocks.slice().reverse().slice(0, 10).map((block, idx) => (
            <div key={idx} className="block-item">
              <div className="block-height">#{block.height}</div>
              <div className="block-details">
                <span>Miner: {block.miner}</span>
                <span>Transactions: {block.transactionCount}</span>
                <span>Time Since Last: {formatTimeDiff(
                  block.timestamp, 
                  idx < blocks.length - 1 ? blocks[blocks.length - idx - 2].timestamp : null
                )}</span>
                <span>Random Factor: {block.randomFactor}x</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {expertMode && (
        <div className="expert-explanation">
          <h3>Mining Difficulty Adjustments</h3>
          <p>Bitcoin adjusts mining difficulty every 2016 blocks (~2 weeks) to maintain a 10-minute average block time. The adjustment is proportional to the ratio between actual time taken and the target time (2016 blocks * 10 minutes).</p>
          <p>This simulation uses a simplified model with more frequent adjustments to demonstrate the feedback mechanism. In real Bitcoin, the maximum difficulty change is capped at 4x in either direction.</p>
          <p>Mining follows a Poisson process, meaning block times vary randomly around the average. This is why we simulate random variation in block discovery.</p>
        </div>
      )}
    </div>
  );
};

// UTXO Simulation
const UTXOSimulation = ({ missionData, expertMode }) => {
  const [utxos, setUtxos] = useState([
    { id: 'utxo1', value: 0.5, address: 'bc1q...a4f2', confirmations: 23 },
    { id: 'utxo2', value: 1.2, address: 'bc1q...a4f2', confirmations: 12 },
    { id: 'utxo3', value: 0.07, address: 'bc1q...a4f2', confirmations: 6 }
  ]);

  const [selectedUtxos, setSelectedUtxos] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState('bc1q...x7p9');
  const [sendAmount, setSendAmount] = useState(0.8);
  const [feeRate, setFeeRate] = useState(10); // sats/vB
  const [transaction, setTransaction] = useState(null);

  const toggleUtxoSelection = (utxoId) => {
    if (selectedUtxos.includes(utxoId)) {
      setSelectedUtxos(selectedUtxos.filter(id => id !== utxoId));
    } else {
      setSelectedUtxos([...selectedUtxos, utxoId]);
    }
  };

  const createTransaction = () => {
    // Get selected UTXOs
    const inputs = utxos.filter(utxo => selectedUtxos.includes(utxo.id));
    const totalInput = inputs.reduce((sum, utxo) => sum + utxo.value, 0);

    // Calculate tx size (simplified)
    const inputSize = inputs.length * 68;  // ~68 bytes per input
    const outputSize = 2 * 34;  // 2 outputs ~34 bytes each
    const txOverhead = 10;  // tx version, locktime, etc.
    const estimatedSize = inputSize + outputSize + txOverhead;

    // Calculate fee
    const estimatedFee = (estimatedSize * feeRate) / 100000000; // Convert sats to BTC

    // Calculate change
    const changeAmount = totalInput - sendAmount - estimatedFee;

    // Validate transaction
    if (changeAmount < 0) {
      alert('Insufficient funds! Select more UTXOs or reduce amount/fee.');
      return;
    }

    if (changeAmount > 0 && changeAmount < 0.00001) {
      alert('Change amount too small! This would create dust UTXO.');
      return;
    }

    // Create transaction
    const newTx = {
      txid: 'tx_' + Date.now().toString(16),
      inputs: inputs,
      outputs: [
        { address: recipientAddress, value: sendAmount },
        { address: 'bc1q...a4f2', value: changeAmount }
      ],
      fee: estimatedFee,
      size: estimatedSize,
      status: 'unconfirmed'
    };

    setTransaction(newTx);
  };

  const broadcastTransaction = () => {
    if (!transaction) return;

    // Remove spent UTXOs
    const updatedUtxos = utxos.filter(utxo => !selectedUtxos.includes(utxo.id));

    // Add change output as new UTXO
    if (transaction.outputs[1].value > 0) {
      updatedUtxos.push({
        id: 'change_' + Date.now().toString(16),
        value: transaction.outputs[1].value,
        address: 'bc1q...a4f2',
        confirmations: 0
      });
    }

    setUtxos(updatedUtxos);
    setSelectedUtxos([]);
    setTransaction({...transaction, status: 'confirming'});

    // Simulate confirmation after delay
    setTimeout(() => {
      setUtxos(prevUtxos => 
        prevUtxos.map(utxo => ({
          ...utxo,
          confirmations: utxo.confirmations + 1
        }))
      );
      setTransaction(null);
    }, 5000);
  };

  const resetSimulation = () => {
    setUtxos([
      { id: 'utxo1', value: 0.5, address: 'bc1q...a4f2', confirmations: 23 },
      { id: 'utxo2', value: 1.2, address: 'bc1q...a4f2', confirmations: 12 },
      { id: 'utxo3', value: 0.07, address: 'bc1q...a4f2', confirmations: 6 }
    ]);
    setSelectedUtxos([]);
    setTransaction(null);
  };

  const totalBalance = utxos.reduce((sum, utxo) => sum + utxo.value, 0);
  const selectedBalance = utxos
    .filter(utxo => selectedUtxos.includes(utxo.id))
    .reduce((sum, utxo) => sum + utxo.value, 0);

  return (
    <div className="utxo-simulation">
      <h3>Bitcoin UTXO and Transaction Simulation</h3>

      <div className="wallet-info">
        <div className="balance-info">
          <h4>Your Wallet</h4>
          <p>Total Balance: {totalBalance.toFixed(8)} BTC</p>
          <p>Selected: {selectedBalance.toFixed(8)} BTC</p>
        </div>

        <div className="utxo-list">
          <h4>Your UTXOs (Spendable Coins)</h4>
          {utxos.map(utxo => (
            <div 
              key={utxo.id} 
              className={`utxo-item ${selectedUtxos.includes(utxo.id) ? 'selected' : ''}`}
              onClick={() => toggleUtxoSelection(utxo.id)}
            >
              <div className="utxo-value">{utxo.value.toFixed(8)} BTC</div>
              <div className="utxo-details">
                <span>ID: {utxo.id}</span>
                <span>Address: {utxo.address}</span>
                <span>Confirmations: {utxo.confirmations}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="transaction-builder">
        <h4>Create Transaction</h4>

        <div className="tx-input">
          <label>Recipient Address:</label>
          <input 
            type="text" 
            value={recipientAddress} 
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>

        <div className="tx-input">
          <label>Amount to Send (BTC):</label>
          <input 
            type="number" 
            value={sendAmount} 
            onChange={(e) => setSendAmount(Number(e.target.value))}
            step="0.01"
            min="0.00001"
          />
        </div>

        <div className="tx-input">
          <label>Fee Rate (sats/vB):</label>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={feeRate} 
            onChange={(e) => setFeeRate(Number(e.target.value))}
          />
          <span>{feeRate} sats/vB</span>
        </div>

        <div className="tx-buttons">
          <button 
            onClick={createTransaction}
            disabled={selectedUtxos.length === 0}
          >
            Create Transaction
          </button>

          <button onClick={resetSimulation}>
            Reset Simulation
          </button>
        </div>
      </div>

      {transaction && (
        <div className="transaction-preview">
          <h4>Transaction Preview</h4>

          <div className="tx-details">
            <p>TXID: {transaction.txid}</p>
            <p>Status: {transaction.status}</p>
            <p>Size: {transaction.size} vBytes</p>
            <p>Fee: {transaction.fee.toFixed(8)} BTC ({feeRate} sats/vB)</p>
          </div>

          <div className="tx-io">
            <div className="tx-inputs">
              <h5>Inputs</h5>
              {transaction.inputs.map((input, idx) => (
                <div key={idx} className="tx-input-item">
                  {input.value.toFixed(8)} BTC from {input.address}
                </div>
              ))}
              <div className="tx-total">Total: {transaction.inputs.reduce((sum, input) => sum + input.value, 0).toFixed(8)} BTC</div>
            </div>

            <div className="tx-outputs">
              <h5>Outputs</h5>
              {transaction.outputs.map((output, idx) => (
                <div key={idx} className="tx-output-item">
                  {output.value.toFixed(8)} BTC to {output.address} {idx === 1 ? '(change)' : ''}
                </div>
              ))}
              <div className="tx-fee-item">
                Fee: {transaction.fee.toFixed(8)} BTC
              </div>
            </div>
          </div>

          <button 
            onClick={broadcastTransaction}
            className="broadcast-button"
          >
            Broadcast Transaction
          </button>
        </div>
      )}

      {expertMode && (
        <div className="expert-explanation">
          <h3>UTXO Model Details</h3>
          <p>Bitcoin transactions consume existing UTXOs as inputs and create new UTXOs as outputs. This differs from an account-based model (like Ethereum) where balances are stored directly.</p>
          <p>UTXO selection strategies impact privacy, fees, and wallet performance. Common strategies include:</p>
          <ul>
            <li>Branch and Bound (BnB): optimize for minimizing fee</li>
            <li>Single Random Draw (SRD): select random UTXOs until amount is satisfied</li>
            <li>Consolidation: combine many small UTXOs during low-fee periods</li>
          </ul>
          <p>Transaction size is primarily determined by the number of inputs, not the BTC amount being transferred.</p>
        </div>
      )}
    </div>
  );
};

// Scripting Simulation
const ScriptingSimulation = ({ missionData, expertMode }) => {
  // Implementation focused on Bitcoin script operations
  return (
    <div className="scripting-simulation">
      <h3>Bitcoin Script Simulation</h3>
      <p>Bitcoin uses a stack-based scripting language to define spending conditions.</p>
      {/* Implementation would be similar to other simulations */}
    </div>
  );
};

// Scaling Simulation
const ScalingSimulation = ({ missionData, expertMode }) => {
  const [channels, setChannels] = useState([
    { id: 'chan1', from: 'Your Node', to: 'Alice', capacity: 0.02, balance: 0.015 },
    { id: 'chan2', from: 'Your Node', to: 'Bob', capacity: 0.05, balance: 0.025 },
    { id: 'chan3', from: 'Alice', to: 'Charlie', capacity: 0.03, balance: 0.02 },
    { id: 'chan4', from: 'Bob', to: 'Dave', capacity: 0.04, balance: 0.03 },
    { id: 'chan5', from: 'Charlie', to: 'Dave', capacity: 0.025, balance: 0.01 }
  ]);

  const [recipient, setRecipient] = useState('Dave');
  const [amount, setAmount] = useState(0.005);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentRoute, setPaymentRoute] = useState([]);
  const [showLightningNetwork, setShowLightningNetwork] = useState(true);

  const findRoute = () => {
    let possibleRoutes = [];

    // Direct route
    const directChannel = channels.find(
      c => (c.from === 'Your Node' && c.to === recipient) || 
           (c.to === 'Your Node' && c.from === recipient)
    );

    if (directChannel) {
      const outbound = directChannel.from === 'Your Node' ? directChannel.balance : directChannel.capacity - directChannel.balance;
      if (outbound >= amount) {
        possibleRoutes.push({
          path: [directChannel.id],
          route: ['Your Node', recipient],
          capacity: outbound,
          fee: 0
        });
      }
    }

    // Two-hop routes
    channels.forEach(chan1 => {
      if (chan1.from === 'Your Node' || chan1.to === 'Your Node') {
        const intermediary = chan1.from === 'Your Node' ? chan1.to : chan1.from;

        channels.forEach(chan2 => {
          if ((chan2.from === intermediary && chan2.to === recipient) ||
              (chan2.to === intermediary && chan2.from === recipient)) {

            const outbound1 = chan1.from === 'Your Node' ? chan1.balance : chan1.capacity - chan1.balance;
            const outbound2 = chan2.from === intermediary ? chan2.balance : chan2.capacity - chan2.balance;

            if (outbound1 >= amount && outbound2 >= amount) {
              possibleRoutes.push({
                path: [chan1.id, chan2.id],
                route: ['Your Node', intermediary, recipient],
                capacity: Math.min(outbound1, outbound2),
                fee: amount * 0.001 // Simple fee calculation
              });
            }
          }
        });
      }
    });

    // Sort by lowest fee
    possibleRoutes.sort((a, b) => a.fee - b.fee);

    if (possibleRoutes.length > 0) {
      setPaymentRoute(possibleRoutes[0].route);
      return possibleRoutes[0];
    }

    return null;
  };

  const sendPayment = () => {
    const route = findRoute();

    if (!route) {
      setPaymentStatus('failed');
      setPaymentRoute([]);
      return;
    }

    setPaymentStatus('routing');

    // Simulate payment routing
    setTimeout(() => {
      // Update channel balances
      if (route.path.length === 1) {
        // Direct payment
        setChannels(channels.map(chan => {
          if (chan.id === route.path[0]) {
            if (chan.from === 'Your Node') {
              return {...chan, balance: chan.balance - amount};
            } else {
              return {...chan, balance: chan.balance + amount};
            }
          }
          return chan;
        }));
      } else {
        // Multi-hop payment
        setChannels(channels.map(chan => {
          if (chan.id === route.path[0]) {
            if (chan.from === 'Your Node') {
              return {...chan, balance: chan.balance - amount};
            } else {
              return {...chan, balance: chan.balance + amount};
            }
          }
          if (chan.id === route.path[1]) {
            if (chan.from === route.route[1]) {
              return {...chan, balance: chan.balance - amount};
            } else {
              return {...chan, balance: chan.balance + amount};
            }
          }
          return chan;
        }));
      }

      setPaymentStatus('success');
    }, 2000);
  };

  const resetSimulation = () => {
    setChannels([
      { id: 'chan1', from: 'Your Node', to: 'Alice', capacity: 0.02, balance: 0.015 },
      { id: 'chan2', from: 'Your Node', to: 'Bob', capacity: 0.05, balance: 0.025 },
      { id: 'chan3', from: 'Alice', to: 'Charlie', capacity: 0.03, balance: 0.02 },
      { id: 'chan4', from: 'Bob', to: 'Dave', capacity: 0.04, balance: 0.03 },
      { id: 'chan5', from: 'Charlie', to: 'Dave', capacity: 0.025, balance: 0.01 }
    ]);
    setPaymentStatus(null);
    setPaymentRoute([]);
  };

  const openNewChannel = () => {
    const newChannel = {
      id: 'chan' + (channels.length + 1),
      from: 'Your Node',
      to: recipient,
      capacity: 0.03,
      balance: 0.03 // All funds on your side initially
    };

    setChannels([...channels, newChannel]);
  };

  return (
    <div className="scaling-simulation">
      <h3>Lightning Network Simulation</h3>

      <div className="tab-buttons">
        <button 
          className={showLightningNetwork ? 'active' : ''}
          onClick={() => setShowLightningNetwork(true)}
        >
          Lightning Network
        </button>
        <button 
          className={!showLightningNetwork ? 'active' : ''}
          onClick={() => setShowLightningNetwork(false)}
        >
          Scaling Trilemma
        </button>
      </div>

      {showLightningNetwork ? (
        <>
          <div className="lightning-network-viz">
            <svg width="600" height="400" viewBox="0 0 600 400">
              {/* Center node positions */}
              {(() => {
                const nodePositions = {
                  'Your Node': { x: 300, y: 200 },
                  'Alice': { x: 150, y: 100 },
                  'Bob': { x: 450, y: 100 },
                  'Charlie': { x: 150, y: 300 },
                  'Dave': { x: 450, y: 300 }
                };

                // Draw channels
                return channels.map(channel => {
                  const fromPos = nodePositions[channel.from];
                  const toPos = nodePositions[channel.to];

                  // Calculate if this channel is part of the active route
                  const isActiveRoute = paymentRoute && 
                    paymentRoute.indexOf(channel.from) !== -1 && 
                    paymentRoute.indexOf(channel.to) !== -1 &&
                    Math.abs(paymentRoute.indexOf(channel.from) - paymentRoute.indexOf(channel.to)) === 1;

                  return (
                    <g key={channel.id}>
                      <line 
                        x1={fromPos.x} 
                        y1={fromPos.y} 
                        x2={toPos.x} 
                        y2={toPos.y} 
                        stroke={isActiveRoute ? "#ff9800" : "#aaa"} 
                        strokeWidth={isActiveRoute ? "4" : "2"} 
                      />
                      <rect 
                        x={(fromPos.x + toPos.x) / 2 - 25} 
                        y={(fromPos.y + toPos.y) / 2 - 10} 
                        width="50" 
                        height="20" 
                        rx="5" 
                        fill="#fff" 
                        stroke="#333"
                      />
                      <text 
                        x={(fromPos.x + toPos.x) / 2} 
                        y={(fromPos.y + toPos.y) / 2 + 5} 
                        textAnchor="middle" 
                        fontSize="10"
                      >
                        {channel.capacity.toFixed(3)} BTC
                      </text>
                    </g>
                  );
                });
              })()}

              {/* Draw nodes */}
              {(() => {
                const nodePositions = {
                  'Your Node': { x: 300, y: 200 },
                  'Alice': { x: 150, y: 100 },
                  'Bob': { x: 450, y: 100 },
                  'Charlie': { x: 150, y: 300 },
                  'Dave': { x: 450, y: 300 }
                };

                return Object.entries(nodePositions).map(([nodeName, pos]) => (
                  <g key={nodeName}>
                    <circle 
                      cx={pos.x} 
                      cy={pos.y} 
                      r="25" 
                      fill={nodeName === 'Your Node' ? "#4CAF50" : 
                            nodeName === recipient ? "#2196F3" : "#9e9e9e"} 
                      stroke="#333"
                    />
                    <text 
                      x={pos.x} 
                      y={pos.y} 
                      textAnchor="middle" 
                      dy="5" 
                      fill="#fff"
                    >
                      {nodeName === 'Your Node' ? 'You' : nodeName}
                    </text>
                  </g>
                ));
              })()}

              {/* Payment animation */}
              {paymentStatus === 'routing' && paymentRoute.length > 0 && (() => {
                const nodePositions = {
                  'Your Node': { x: 300, y: 200 },
                  'Alice': { x: 150, y: 100 },
                  'Bob': { x: 450, y: 100 },
                  'Charlie': { x: 150, y: 300 },
                  'Dave': { x: 450, y: 300 }
                };

                // Create animations between each hop
                return paymentRoute.slice(0, -1).map((node, idx) => {
                  const fromPos = nodePositions[node];
                  const toPos = nodePositions[paymentRoute[idx + 1]];

                  return (
                    <circle 
                      key={`anim-${idx}`}
                      cx={fromPos.x} 
                      cy={fromPos.y} 
                      r="8" 
                      fill="#ff9800"
                    >
                      <animate 
                        attributeName="cx" 
                        from={fromPos.x} 
                        to={toPos.x} 
                        dur="1s" 
                        begin={`${idx * 0.5}s`}
                        fill="freeze" 
                      />
                      <animate 
                        attributeName="cy" 
                        from={fromPos.y} 
                        to={toPos.y} 
                        dur="1s" 
                        begin={`${idx * 0.5}s`}
                        fill="freeze" 
                      />
                    </circle>
                  );
                });
              })()}
            </svg>
          </div>

          <div className="payment-controls">
            <div className="control-group">
              <label>Recipient:</label>
              <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                <option value="Alice">Alice</option>
                <option value="Bob">Bob</option>
                <option value="Charlie">Charlie</option>
                <option value="Dave">Dave</option>
              </select>
            </div>

            <div className="control-group">
              <label>Amount (BTC):</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))}
                step="0.001"
                min="0.001"
                max="0.05"
              />
            </div>

            <div className="payment-buttons">
              <button 
                onClick={sendPayment}
                disabled={paymentStatus === 'routing'}
              >
                Send Lightning Payment
              </button>

              <button onClick={openNewChannel}>
                Open Direct Channel
              </button>

              <button onClick={resetSimulation}>
                Reset Simulation
              </button>
            </div>
          </div>

          {paymentStatus && (
            <div className={`payment-status ${paymentStatus}`}>
              {paymentStatus === 'routing' && 'Routing payment...'}
              {paymentStatus === 'success' && 'Payment successful! Channels updated.'}
              {paymentStatus === 'failed' && 'Payment failed. No route with sufficient capacity found.'}
            </div>
          )}

          <div className="channel-list">
            <h4>Your Lightning Channels</h4>
            {channels
              .filter(chan => chan.from === 'Your Node' || chan.to === 'Your Node')
              .map(chan => {
                const remotePeer = chan.from === 'Your Node' ? chan.to : chan.from;
                const localBalance = chan.from === 'Your Node' ? chan.balance : chan.capacity - chan.balance;
                const remoteBalance = chan.capacity - localBalance;

                return (
                  <div key={chan.id} className="channel-item">
                    <div className="channel-header">
                      <span>Channel with {remotePeer}</span>
                      <span>Capacity: {chan.capacity.toFixed(5)} BTC</span>
                    </div>
                    <div className="balance-bar">
                      <div 
                        className="local-balance" 
                        style={{ width: `${(localBalance / chan.capacity) * 100}%` }}
                      >
                        {localBalance.toFixed(5)}
                      </div>
                      <div 
                        className="remote-balance"
                        style={{ width: `${(remoteBalance / chan.capacity) * 100}%` }}
                      >
                        {remoteBalance.toFixed(5)}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div className="scaling-trilemma">
          <h3>The Blockchain Scaling Trilemma</h3>

          <div className="trilemma-diagram">
            <svg width="500" height="400" viewBox="0 0 500 400">
              {/* Triangle */}
              <polygon 
                points="250,50 50,350 450,350" 
                fill="none" 
                stroke="#333" 
                strokeWidth="2"
              />

              {/* Vertices */}
              <circle cx="250" cy="50" r="40" fill="#4CAF50" />
              <circle cx="50" cy="350" r="40" fill="#2196F3" />
              <circle cx="450" cy="350" r="40" fill="#FFC107" />

              {/* Labels */}
              <text x="250" y="60" textAnchor="middle" fill="white" fontWeight="bold">Decentralization</text>
              <text x="50" y="355" textAnchor="middle" fill="white" fontWeight="bold">Security</text>
              <text x="450" y="355" textAnchor="middle" fill="white" fontWeight="bold">Scalability</text>

              {/* Layer positions */}
              <circle cx="250" cy="200" r="25" fill="#E91E63" />
              <text x="250" y="205" textAnchor="middle" fill="white" fontWeight="bold">L1</text>

              <circle cx="300" cy="275" r="25" fill="#9C27B0" />
              <text x="300" y="280" textAnchor="middle" fill="white" fontWeight="bold">L2</text>

              {/* Arrows from L1 to L2 */}
              <path d="M265,215 L285,260" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Arrow marker definition */}
              <defs>
                <marker 
                  id="arrow" 
                  viewBox="0 0 10 10" 
                  refX="5" 
                  refY="5"
                  markerWidth="6" 
                  markerHeight="6"
                  orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="scaling-explanation">
            <p>The Blockchain Trilemma states that blockchains must trade off between:</p>

            <div className="trilemma-points">
              <div className="trilemma-point">
                <h4>Decentralization</h4>
                <p>The system operates through a distributed network of participants with no central points of control or failure.</p>
              </div>

              <div className="trilemma-point">
                <h4>Security</h4>
                <p>The blockchain is resistant to attacks and maintains data integrity through economic incentives and cryptography.</p>
              </div>

              <div className="trilemma-point">
                <h4>Scalability</h4>
                <p>The ability to process a high throughput of transactions quickly and at low cost.</p>
              </div>
            </div>

            <div className="layers-explanation">
              <h4>Bitcoin's Layered Scaling Approach</h4>
              <p><strong>Layer 1 (Bitcoin Base Chain):</strong> Optimizes for security and decentralization at the expense of scalability. Processes ~7 transactions per second with 10-minute block times.</p>
              <p><strong>Layer 2 (Lightning Network):</strong> Built on top of Layer 1, optimizes for scalability while leveraging Layer 1's security. Enables millions of transactions per second with near-instant settlement.</p>
            </div>
          </div>
        </div>
      )}

      {expertMode && (
        <div className="expert-explanation">
          <h3>Lightning Network Technical Details</h3>
          <p>The Lightning Network is a second-layer protocol built on top of Bitcoin that uses payment channels to enable fast, low-fee transactions without requiring on-chain confirmations for every payment.</p>
          <p>Key technical components include:</p>
          <ul>
            <li><strong>HTLCs (Hash Time-Locked Contracts)</strong>: Allow conditional payments across multiple channels</li>
            <li><strong>Onion Routing</strong>: Provides privacy by hiding payment paths from intermediary nodes</li>
            <li><strong>Watchtowers</strong>: Third-party services that monitor channels for fraud when users are offline</li>
            <li><strong>Channel Factories</strong>: Allow multiple channels to be opened with a single on-chain transaction</li>
          </ul>
          <p>Lightning's most important innovations are its ability to route payments across a network of channels and its use of Bitcoin's scripting language to enforce channel state off-chain.</p>
        </div>
      )}
    </div>
  );
};

// Wallet Integration Component
const WalletIntegration = () => {
  const [walletStep, setWalletStep] = useState(0);
  const [wallet, setWallet] = useState('');
  const [seed, setSeed] = useState('');
  const [completedSteps, setCompletedSteps] = useState({});

  const wallets = [
    { name: 'Blue Wallet', type: 'mobile', features: ['Lightning', 'Multisig', 'Hardware Support'] },
    { name: 'Muun', type: 'mobile', features: ['Simplified', 'Self-custody', 'No seed phrase'] },
    { name: 'Sparrow', type: 'desktop', features: ['Advanced', 'UTXO Control', 'Hardware Support'] },
    { name: 'Bitcoin Core', type: 'desktop', features: ['Full Node', 'Maximum Security', 'Technical'] },
    { name: 'Cold Card', type: 'hardware', features: ['Airgapped', 'Advanced Security', 'PSBT'] }
  ];

  const steps = [
    'Select a Bitcoin wallet',
    'Install the wallet software',
    'Create a new wallet',
    'Secure your recovery seed',
    'Verify your backup',
    'Receive your first Bitcoin',
    'Send a test transaction'
  ];

  const handleWalletSelect = (walletName) => {
    setWallet(walletName);
    setWalletStep(1);
  };

  const markStepComplete = (step) => {
    setCompletedSteps({...completedSteps, [step]: true});
    setWalletStep(step + 1);
  };

  const generateSeedPhrase = () => {
    const wordlist = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
      'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
      'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual'
    ];

    const seedWords = Array.from({ length: 12 }, () => 
      wordlist[Math.floor(Math.random() * wordlist.length)]);

    setSeed(seedWords.join(' '));
    return seedWords.join(' ');
  };

  return (
    <div className="wallet-integration">
            <h2>Practical Exercise: Set Up Your Bitcoin Wallet</h2>

      <div className="wallet-steps">
        <div className="step-indicators">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`step-indicator ${idx === walletStep ? 'active' : ''} ${completedSteps[idx] ? 'completed' : ''}`}
            >
              <div className="step-number">{idx + 1}</div>
              <div className="step-label">{step}</div>
            </div>
          ))}
        </div>

        <div className="step-content">
          {walletStep === 0 && (
            <div className="wallet-selection">
              <h3>Select a Bitcoin Wallet</h3>
              <p>Choose a wallet that matches your needs and security requirements:</p>

              <div className="wallet-options">
                {wallets.map((w, idx) => (
                  <div key={idx} className="wallet-card" onClick={() => handleWalletSelect(w.name)}>
                    <h4>{w.name}</h4>
                    <div className="wallet-type">{w.type}</div>
                    <ul>
                      {w.features.map((feature, fidx) => (
                        <li key={fidx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {walletStep === 1 && (
            <div className="wallet-installation">
              <h3>Install {wallet}</h3>
              <p>Follow these steps to install your chosen wallet:</p>

              <ol>
                <li>Visit the official website or app store for {wallet}</li>
                <li>Download the wallet from the official source only</li>
                <li>Verify the download if possible (check signatures)</li>
                <li>Complete the installation process</li>
              </ol>

              <div className="security-warning">
                <p><strong>Security Note:</strong> Always download wallet software from official sources only. Verify downloads when possible.</p>
              </div>

              <div className="step-buttons">
                <button onClick={() => setWalletStep(0)}>Back</button>
                <button onClick={() => markStepComplete(1)}>I've Installed the Wallet</button>
              </div>
            </div>
          )}

          {walletStep === 2 && (
            <div className="wallet-creation">
              <h3>Create a New Wallet</h3>
              <p>Now that you've installed {wallet}, create a new wallet:</p>

              <ol>
                <li>Open the wallet application</li>
                <li>Select "Create New Wallet" option</li>
                <li>Follow the wallet's setup wizard</li>
                <li>When prompted for a password, create a strong, unique password</li>
              </ol>

              <div className="security-warning">
                <p><strong>Security Note:</strong> Use a password manager to generate and store a strong password. Never reuse passwords.</p>
              </div>

              <div className="step-buttons">
                <button onClick={() => setWalletStep(1)}>Back</button>
                <button onClick={() => markStepComplete(2)}>I've Created a Wallet</button>
              </div>
            </div>
          )}

          {walletStep === 3 && (
            <div className="seed-backup">
              <h3>Secure Your Recovery Seed</h3>
              <p>Your wallet has generated a recovery seed phrase. This is the MOST IMPORTANT step:</p>

              <div className="seed-simulation">
                <p>For simulation purposes, here's a sample seed phrase:</p>
                <div className="seed-display">
                  {seed || generateSeedPhrase()}
                </div>
                <button onClick={generateSeedPhrase}>Generate Another Sample</button>
              </div>

              <div className="backup-instructions">
                <h4>How to Secure Your Seed:</h4>
                <ol>
                  <li>Write down your actual seed phrase on paper (not the sample above)</li>
                  <li>Double-check each word for accuracy</li>
                  <li>Store in a secure, water and fire-resistant location</li>
                  <li>Consider making a duplicate backup stored in a different location</li>
                  <li>NEVER store your seed phrase digitally or take a photo of it</li>
                </ol>
              </div>

              <div className="security-warning critical">
                <p><strong>CRITICAL:</strong> Anyone with access to your seed phrase has complete control of your Bitcoin. Never share it with anyone. The seed phrase above is just a sample - secure your actual seed phrase from your wallet.</p>
              </div>

              <div className="step-buttons">
                <button onClick={() => setWalletStep(2)}>Back</button>
                <button onClick={() => markStepComplete(3)}>I've Secured My Seed Phrase</button>
              </div>
            </div>
          )}

          {walletStep === 4 && (
            <div className="backup-verification">
              <h3>Verify Your Backup</h3>
              <p>To ensure you've correctly recorded your seed phrase, verify your backup:</p>

              <ol>
                <li>Some wallets have a verification step in the setup process</li>
                <li>If not, consider temporarily entering a few words from your backup to verify</li>
                <li>For hardware wallets, you might need to enter the entire phrase</li>
              </ol>

              <div className="verification-tips">
                <h4>Tips:</h4>
                <ul>
                  <li>Verify in a private location away from cameras</li>
                  <li>Consider a "dry run" recovery to fully test your backup</li>
                  <li>Understand the difference between seed phrases and wallet passwords</li>
                </ul>
              </div>

              <div className="step-buttons">
                <button onClick={() => setWalletStep(3)}>Back</button>
                <button onClick={() => markStepComplete(4)}>I've Verified My Backup</button>
              </div>
            </div>
          )}

          {walletStep === 5 && (
            <div className="receive-bitcoin">
              <h3>Receive Your First Bitcoin</h3>
              <p>Now that your wallet is set up and secured, you can receive Bitcoin:</p>

              <div className="receive-instructions">
                <ol>
                  <li>In your wallet, find the "Receive" section</li>
                  <li>Generate a new Bitcoin address</li>
                  <li>Your wallet will display an address and QR code</li>
                  <li>Share this address with whoever is sending you Bitcoin</li>
                  <li>For this exercise, you can use a Bitcoin testnet faucet if you don't want to use real Bitcoin</li>
                </ol>
              </div>

              <div className="address-example">
                <h4>Example Address (for demonstration only):</h4>
                <div className="address-display">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</div>
              </div>

              <div className="security-tips">
                <h4>Security Tips:</h4>
                <ul>
                  <li>Always verify the first and last few characters of addresses when copying</li>
                  <li>Generate a new address for each transaction for better privacy</li>
                  <li>Small "test" transactions are recommended before large transfers</li>
                </ul>
              </div>

              <div className="step-buttons">
                <button onClick={() => setWalletStep(4)}>Back</button>
                <button onClick={() => markStepComplete(5)}>I've Received Bitcoin</button>
              </div>
            </div>
          )}

          {walletStep === 6 && (
            <div className="send-transaction">
              <h3>Send a Test Transaction</h3>
              <p>Finally, practice sending a small amount of Bitcoin:</p>

              <div className="send-instructions">
                <ol>
                  <li>In your wallet, find the "Send" function</li>
                  <li>Enter a receiving address (can be another of your own addresses)</li>
                  <li>Enter a small amount to send</li>
                  <li>Select an appropriate fee based on urgency</li>
                  <li>Review all details carefully before confirming</li>
                  <li>Track the transaction status in your wallet</li>
                </ol>
              </div>

              <div className="fee-guidance">
                <h4>Fee Selection Guidance:</h4>
                <ul>
                  <li>High Priority: 25+ sat/vB (confirmation within 1-2 blocks)</li>
                  <li>Medium Priority: 10-20 sat/vB (confirmation within a few blocks)</li>
                  <li>Low Priority: 1-5 sat/vB (confirmation may take hours or days)</li>
                </ul>
                <p>Check current mempool conditions for accurate fee estimates: <a href="https://mempool.space">mempool.space</a></p>
              </div>

              <div className="step-buttons">
                <button onClick={() => setWalletStep(5)}>Back</button>
                <button onClick={() => markStepComplete(6)}>I've Sent a Transaction</button>
              </div>
            </div>
          )}

          {walletStep === 7 && (
            <div className="completion">
              <h3>🎉 Congratulations!</h3>
              <p>You've successfully set up a Bitcoin wallet and completed your first transactions.</p>

              <div className="next-steps">
                <h4>Next Steps in Your Bitcoin Journey:</h4>
                <ul>
                  <li>Consider secure storage options (hardware wallets for larger amounts)</li>
                  <li>Learn about public key reuse and privacy best practices</li>
                  <li>Understand transaction fees and mempool dynamics</li>
                  <li>Practice regular wallet backups and verification</li>
                  <li>Create a plan for inheritance or emergency access</li>
                </ul>
              </div>

              <div className="security-checklist">
                <h4>Security Checklist:</h4>
                <div className="checklist-items">
                  <div className="checklist-item">
                    <input type="checkbox" id="check1" />
                    <label htmlFor="check1">Seed phrase is backed up on paper (not digital)</label>
                  </div>
                  <div className="checklist-item">
                    <input type="checkbox" id="check2" />
                    <label htmlFor="check2">Seed backup is stored in a secure, private location</label>
                  </div>
                  <div className="checklist-item">
                    <input type="checkbox" id="check3" />
                    <label htmlFor="check3">Wallet is protected with a strong password</label>
                  </div>
                  <div className="checklist-item">
                    <input type="checkbox" id="check4" />
                    <label htmlFor="check4">Device running wallet software is secure</label>
                  </div>
                  <div className="checklist-item">
                    <input type="checkbox" id="check5" />
                    <label htmlFor="check5">I have a plan for how heirs can access my Bitcoin</label>
                  </div>
                </div>
              </div>

              <div className="step-buttons">
                <button onClick={() => setWalletStep(6)}>Back</button>
                <button onClick={() => setWalletStep(0)}>Start Over</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Footer Component
const BitcoinFooter = () => {
  return (
    <footer className="bitcoin-footer">
      <h3>Bitcoin Education Resources</h3>
      <div className="resource-links">
        <div className="resource-category">
          <h4>Documentation</h4>
          <ul>
            <li>Bitcoin Whitepaper</li>
            <li>Bitcoin.org Documentation</li>
            <li>Bitcoin Developer Guide</li>
            <li>Bitcoin Improvement Proposals (BIPs)</li>
          </ul>
        </div>

        <div className="resource-category">
          <h4>Books</h4>
          <ul>
            <li>Mastering Bitcoin</li>
            <li>The Bitcoin Standard</li>
            <li>Programming Bitcoin</li>
            <li>Grokking Bitcoin</li>
          </ul>
        </div>

        <div className="resource-category">
          <h4>Tools</h4>
          <ul>
            <li>Block Explorers</li>
            <li>Mempool Visualization</li>
            <li>Fee Estimators</li>
            <li>Test Networks (Testnet, Signet)</li>
          </ul>
        </div>
      </div>

      <p>This is an educational simulation for learning purposes only. Always verify information and use caution when using real Bitcoin.</p>
    </footer>
  );
};

export default BitcoinEducationApp;