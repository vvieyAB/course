import { Realm } from "./types";
import { getRealmName, getRealmDescription } from "./realm-utils";

export const DEFAULT_AVATAR = "A";

export const BACKPACK_ITEMS = [
  {
    id: "wallet",
    name: "Wallet",
    icon: "fa-wallet",
    href: "#wallet"
  },
  {
    id: "glossary",
    name: "Glossary",
    icon: "fa-book",
    href: "#glossary"
  },
  {
    id: "bookmarks",
    name: "Bookmarks",
    icon: "fa-bookmark",
    href: "#bookmarks"
  },
  {
    id: "settings",
    name: "Settings",
    icon: "fa-cog",
    href: "#settings"
  }
];

// Generate realm entries using the centralized utility functions
// Aligned with standardized realm names: 
// 1. Realm of Origins, 2. The Central Citadel, 3. The Forest of Sparks, 
// 4. The Mountain Forge, 5. The Council of Forks, 6. The Ubuntu Village, 7. The Summit of Knowledge
export const INITIAL_REALMS: Realm[] = [
  {
    id: 1,
    name: getRealmName(1),
    description: "Discover how money began and evolved from shells to bills in this foundational chapter.",
    moduleNumber: 1,
    imageUrl: "/realm-origins.svg",
    isLocked: false
  },
  {
    id: 2,
    name: getRealmName(2),
    description: "Explore the towers of power where monetary decisions echo through the lands.",
    moduleNumber: 2, // Using consistent moduleNumber matching realm number
    imageUrl: "/realm-citadel.svg",
    isLocked: true
  },
  {
    id: 3,
    name: getRealmName(3),
    description: "Enter the mystical forest where the spark of Bitcoin was first ignited.",
    moduleNumber: 3, // Using consistent moduleNumber matching realm number
    imageUrl: "/realm-forest.svg",
    isLocked: true
  },
  {
    id: 4,
    name: getRealmName(4),
    description: "Delve into the depths where miners create new blocks through proof of work.",
    moduleNumber: 4, // Using consistent moduleNumber matching realm number
    imageUrl: "/realm-forge.svg",
    isLocked: true
  },
  {
    id: 5,
    name: getRealmName(5),
    description: "Witness the debates that shape the path of digital currencies at the Council.",
    moduleNumber: 5, // Using consistent moduleNumber matching realm number
    imageUrl: "/realm-forks.svg",
    isLocked: true
  },
  {
    id: 6,
    name: getRealmName(6),
    description: "Discover how Bitcoin weaves into African traditions of community and shared prosperity.",
    moduleNumber: 6, // Using consistent moduleNumber matching realm number
    imageUrl: "/realm-ubuntu.svg",
    isLocked: true
  },
  {
    id: 7,
    name: getRealmName(7),
    description: "Complete your journey and demonstrate your mastery of Bitcoin concepts.",
    moduleNumber: 7, // Using consistent moduleNumber matching realm number
    imageUrl: "/realm-summit.svg",
    isLocked: true
  }
];

// Rewards for completing each realm, aligned with the standardized naming
export const REWARDS = [
  {
    id: 1,
    name: "Origins Explorer",
    description: `Completed ${getRealmName(1)}`,
    imageUrl: "https://images.unsplash.com/photo-1609726494499-27d3e942456c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    isEarned: true
  },
  {
    id: 2,
    name: "Citadel Guardian",
    description: `Completed ${getRealmName(2)}`,
    imageUrl: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    isEarned: true
  },
  {
    id: 3,
    name: "Spark Finder",
    description: `Completed ${getRealmName(3)}`,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    isEarned: false
  },
  {
    id: 4,
    name: "Mountain Forger",
    description: `Completed ${getRealmName(4)}`,
    imageUrl: "",
    isEarned: false
  },
  {
    id: 5,
    name: "Fork Mediator",
    description: `Completed ${getRealmName(5)}`,
    imageUrl: "",
    isEarned: false
  },
  {
    id: 6,
    name: "Community Builder",
    description: `Completed ${getRealmName(6)}`,
    imageUrl: "",
    isEarned: false
  },
  {
    id: 7,
    name: "Knowledge Master",
    description: `Completed ${getRealmName(7)}`,
    imageUrl: "",
    isEarned: false
  }
];