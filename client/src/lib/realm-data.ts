// This file contains static data for the realms and missions
// In a production app, this would be retrieved from an API
import { getRealmName, getRealmDescription } from "./realm-utils";

// Standardized realm names and order:
// 1. Realm of Origins, 2. The Central Citadel, 3. The Forest of Sparks, 
// 4. The Mountain Forge, 5. The Council of Forks, 6. The Ubuntu Village, 7. The Summit of Knowledge
export const RealmData = [
  {
    id: 1,
    name: getRealmName(1), // Realm of Origins
    description: "Discover the foundational stories of money at the grand trade festival. Learn about barter, early forms of value exchange, and the dawn of monetary systems.",
    focus: getRealmDescription(1), // Foundations of Money
    moduleNumber: 1,
    imageUrl: "/realms/origins.jpg",
    isLocked: false
  },
  {
    id: 2,
    name: getRealmName(2), // The Central Citadel
    description: "Explore the intricate systems of modern money, central banks, and the evolution of currencies from physical coins to digital tokens.",
    focus: getRealmDescription(2), // Governance
    moduleNumber: 2,
    imageUrl: "/realms/citadel.jpg",
    isLocked: false
  },
  {
    id: 3,
    name: getRealmName(3), // The Forest of Sparks
    description: "Venture into the blockchain frontier where cryptographic technology has revolutionized the concept of money and trust-based systems.",
    focus: getRealmDescription(3), // Bitcoin's Birth
    moduleNumber: 3,
    imageUrl: "/realms/sparks.jpg",
    isLocked: false
  },
  {
    id: 4,
    name: getRealmName(4), // The Mountain Forge
    description: "Master the fundamentals of Bitcoin mining and how proof-of-work secures the blockchain network.",
    focus: getRealmDescription(4), // Mining and Consensus
    moduleNumber: 4,
    imageUrl: "/realms/forge.jpg", 
    isLocked: false
  },
  {
    id: 5,
    name: getRealmName(5), // The Council of Forks
    description: "Glimpse into the governance of Bitcoin, exploring protocol upgrades, consensus changes, and the history of forks.",
    focus: getRealmDescription(5), // Bitcoin Governance and Forks
    moduleNumber: 5,
    imageUrl: "/realms/forks.jpg",
    isLocked: false
  },
  {
    id: 6,
    name: getRealmName(6), // The Ubuntu Village
    description: "Discover how Bitcoin weaves into African traditions of community and shared prosperity.",
    focus: getRealmDescription(6), // Bitcoin in Africa
    moduleNumber: 6,
    imageUrl: "/realms/ubuntu.jpg",
    isLocked: false
  },
  {
    id: 7,
    name: getRealmName(7), // The Summit of Knowledge
    description: "Complete your journey and demonstrate your mastery of Bitcoin concepts through comprehensive challenges.",
    focus: getRealmDescription(7), // Comprehensive Bitcoin Mastery
    moduleNumber: 7,
    imageUrl: "/realms/summit.jpg",
    isLocked: false
  }
];

export const missionData = [
  // Realm 1: Realm of Origins Missions
  {
    id: 101,
    title: "The Grand Bazaar",
    description: "Join Asha at the festive market to discover how people traded before money existed.",
    realmId: 1,
    imageUrl: "/missions/bazaar.jpg",
    duration: 15, // minutes
    points: 50
  },
  {
    id: 102,
    title: "Value & Exchange",
    description: "Learn why some items became valuable while others didn't in early trading systems.",
    realmId: 1,
    imageUrl: "/missions/value.jpg",
    duration: 20,
    points: 75
  },
  {
    id: 103,
    title: "First Coins",
    description: "Discover how the first standardized coins transformed trade and commerce forever.",
    realmId: 1,
    imageUrl: "/missions/coins.jpg",
    duration: 15,
    points: 50
  },
  {
    id: 104,
    title: "Money & Culture",
    description: "Explore how monetary practices reflected cultural values and social structures.",
    realmId: 1,
    imageUrl: "/missions/culture.jpg",
    duration: 25,
    points: 100
  },
  
  // Realm 2: The Central Citadel Missions
  {
    id: 201,
    title: "Banks & Trust",
    description: "Explore how banks became the guardians of money and developed systems of trust.",
    realmId: 2,
    imageUrl: "/missions/banks.jpg",
    duration: 20,
    points: 75
  },
  {
    id: 202,
    title: "Paper Money",
    description: "Discover how paper currency revolutionized the portability and usability of money.",
    realmId: 2,
    imageUrl: "/missions/paper.jpg",
    duration: 15,
    points: 50
  },
  {
    id: 203,
    title: "Digital Dollars",
    description: "Follow the transition of money from physical to digital in modern banking systems.",
    realmId: 2,
    imageUrl: "/missions/digital.jpg",
    duration: 20,
    points: 75
  },
  {
    id: 204,
    title: "Central Authority",
    description: "Learn about central banks and how they control monetary policy and currency.",
    realmId: 2,
    imageUrl: "/missions/central.jpg",
    duration: 25,
    points: 100
  },
  
  // Realm 3: The Forest of Sparks Missions
  {
    id: 301,
    title: "Cryptography Basics",
    description: "Understand the fundamentals of cryptography that power modern digital currencies.",
    realmId: 3,
    imageUrl: "/missions/crypto-basics.jpg",
    duration: 20,
    points: 75
  },
  {
    id: 302,
    title: "Blockchain 101",
    description: "Explore the revolutionary distributed ledger technology behind cryptocurrencies.",
    realmId: 3,
    imageUrl: "/missions/blockchain.jpg",
    duration: 25,
    points: 100
  },
  {
    id: 303,
    title: "Digital Wallets",
    description: "Learn how to securely store and manage digital assets with cryptocurrency wallets.",
    realmId: 3,
    imageUrl: "/missions/wallets.jpg",
    duration: 15,
    points: 50
  },
  {
    id: 304,
    title: "Crypto Economy",
    description: "Discover the emerging ecosystem of decentralized applications and services.",
    realmId: 3,
    imageUrl: "/missions/crypto-economy.jpg",
    duration: 20,
    points: 75
  },
  
  // Realm 4: The Mountain Forge Missions
  {
    id: 401,
    title: "Satoshi's Vision",
    description: "Uncover the origin story of Bitcoin and the mysterious creator behind it.",
    realmId: 4,
    imageUrl: "/missions/satoshi.jpg",
    duration: 15,
    points: 50
  },
  {
    id: 402,
    title: "Mining & Consensus",
    description: "Understand how Bitcoin mining secures the network through proof-of-work.",
    realmId: 4,
    imageUrl: "/missions/mining.jpg",
    duration: 25,
    points: 100
  },
  {
    id: 403,
    title: "Bitcoin Transactions",
    description: "Learn how Bitcoin transactions work and how they differ from traditional payments.",
    realmId: 4,
    imageUrl: "/missions/transactions.jpg",
    duration: 20,
    points: 75
  },
  {
    id: 404,
    title: "Bitcoin Economics",
    description: "Explore the economic principles that govern Bitcoin's supply and demand.",
    realmId: 4,
    imageUrl: "/missions/economics.jpg",
    duration: 20,
    points: 75
  },
  
  // Realm 5: The Council of Forks Missions
  {
    id: 501,
    title: "Global Impact",
    description: "Examine how cryptocurrency is reshaping global finance and empowering communities.",
    realmId: 5,
    imageUrl: "/missions/global.jpg",
    duration: 25,
    points: 100
  },
  {
    id: 502,
    title: "Lightning Network",
    description: "Discover how layer-2 solutions are addressing Bitcoin's scalability challenges.",
    realmId: 5,
    imageUrl: "/missions/lightning.jpg",
    duration: 20,
    points: 75
  },
  {
    id: 503,
    title: "Decentralized Finance",
    description: "Explore the innovative world of DeFi and how it's reimagining financial services.",
    realmId: 5,
    imageUrl: "/missions/defi.jpg",
    duration: 25,
    points: 100
  },
  {
    id: 504,
    title: "Digital Future",
    description: "Glimpse into the future where digital currencies and traditional finance converge.",
    realmId: 5,
    imageUrl: "/missions/future.jpg",
    duration: 20,
    points: 75
  },
  
  // Realm 6: The Ubuntu Village Missions
  {
    id: 601,
    title: "African Bitcoin Economy",
    description: "Discover how Bitcoin is being adopted across different African countries and communities.",
    realmId: 6,
    imageUrl: "/missions/africa-bitcoin.jpg",
    duration: 20,
    points: 75
  },
  
  // Realm 7: The Summit of Knowledge Missions
  {
    id: 701,
    title: "Comprehensive Review",
    description: "Test your knowledge across all realms with a comprehensive assessment.",
    realmId: 7,
    imageUrl: "/missions/review.jpg",
    duration: 30,
    points: 150
  }
];