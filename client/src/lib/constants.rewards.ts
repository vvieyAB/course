import { getRealmName } from './realm-utils';

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
    name: "Spark Finder",
    description: `Completed ${getRealmName(2)}`,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    isEarned: true
  },
  {
    id: 3,
    name: "Central Banker",
    description: `Completed ${getRealmName(3)}`,
    imageUrl: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    isEarned: false
  },
  {
    id: 4,
    name: "Mountain Explorer",
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