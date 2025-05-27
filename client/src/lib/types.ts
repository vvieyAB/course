export interface User {
  id: number;
  userId: string;
  username: string;
  email?: string;
  progress: Progress;
  rewards: Rewards;
}

export interface Progress {
  currentRealm: number;
  completedRealms: number[];
  chain: {
    progress: number;
    lastUpdated: string;
  };
}

export interface Rewards {
  badges: Badge[];
  tokens: number;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  earned: string; // ISO date string
}

export interface Realm {
  id: number;
  name: string;
  description: string;
  moduleNumber: number;
  imageUrl: string;
  isLocked: boolean;
}
