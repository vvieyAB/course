export interface RealmTheme {
  id: number;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    backgroundLight: string;
    cardBackground?: string;
    textDark: string;
    textLight: string;
    accent1?: string;
    accent2?: string;
    primaryAccent?: string;
    darkText?: string;
    secondaryAccent?: string;
    softContrast?: string;
    gradientStart?: string;
    gradientEnd?: string;
  };
  patterns?: {
    adinkra?: string;
    code?: string;
  };
  gradients?: {
    sunset?: string;
    sand?: string;
    blue?: string;
    glow?: string;
    radial?: string;
    aurora?: string;
  };
  shadows?: {
    card?: string;
    button?: string;
    glow?: string;
  };
  animations?: {
    glow?: string;
  };
  borderRadius?: {
    small?: string;
    default?: string;
    large?: string;
    full?: string;
  };
  patternClass?: string;
  backgroundTexture?: string;
}

// Realm of Origins Theme - Trade Festival at Sunset
export const originTheme: RealmTheme = {
  id: 1,
  name: "Realm of Origins",
  colors: {
    primary: "#EE720B", // Main orange accent
    secondary: "#FFC567", // Secondary/golden accent
    background: "#3E1E00", // Deep brown background
    backgroundLight: "#70350A", // Lighter brown
    cardBackground: "#FBF4D2", // Cream/parchment background for cards
    textDark: "#3E1E00", // Dark text color
    textLight: "#FBF4D2", // Light text color
    accent1: "#EB5A00", // Additional accent
    accent2: "#DB9D47", // Additional accent
    primaryAccent: "#EE720B",    // Sunset Orange
    darkText: "#3A2E00",         // Deep Earth Brown
    secondaryAccent: "#B34700",  // Terracotta Clay Red
    softContrast: "#31456A",     // Muted Indigo / Night Sky Blue
    gradientStart: "#B34700",    // Terracotta gradient start
    gradientEnd: "#EE720B",      // Sunset Orange gradient end
  },
  patterns: {
    // CSS pattern for use in backgrounds
    adinkra: `repeating-linear-gradient(
      45deg,
      rgba(238, 114, 11, 0.1),
      rgba(238, 114, 11, 0.1) 10px,
      rgba(238, 114, 11, 0.2) 10px,
      rgba(238, 114, 11, 0.2) 20px
    )`,
  },
  // Gradients for use in components
  gradients: {
    sunset: "linear-gradient(to right, #EE720B, #FFC567)",
    sand: "linear-gradient(to bottom, #FBF4D2, #F7E8A4)",
  },
  shadows: {
    // Shadow styles
    card: "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
    button: "0 2px 4px rgba(238, 114, 11, 0.3)",
  },
  // Animation properties
  animations: {
    glow: "pulse 2s infinite",
  },
  // Border radius styles
  borderRadius: {
    small: "0.375rem",
    default: "0.5rem",
    large: "1rem",
    full: "9999px",
  },
  patternClass: "origins-pattern",
  backgroundTexture: "url('/textures/woven-pattern.svg')"
};

// Central Citadel Theme
export const centralbankTheme: RealmTheme = {
  id: 2,
  name: "The Central Citadel",
  colors: {
    primary: "#00589B",
    secondary: "#0076CE",
    background: "#00243F",
    backgroundLight: "#003660",
    cardBackground: "#F0F7FF",
    textDark: "#002C4E",
    textLight: "#F0F7FF",
    accent1: "#0076CE",
    accent2: "#00A6ED",
    gradientStart: "#00243F",
    gradientEnd: "#003E70"
  },
  gradients: {
    sunset: "linear-gradient(to right, #00589B, #0076CE)",
    sand: "linear-gradient(to bottom, #F0F7FF, #D6E9FF)",
    blue: "linear-gradient(to right, #0076CE, #00A6ED)"
  },
  shadows: {
    card: "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
    button: "0 2px 4px rgba(0, 89, 155, 0.3)"
  },
  patternClass: "centralbank-pattern",
  backgroundTexture: "url('/textures/marble-pattern.svg')"
};

// Aliases for themed components that reference the themes by different names
export const citadelTheme = centralbankTheme;

// Forest of Sparks Theme
export const cryptographyTheme: RealmTheme = {
  id: 3,
  name: "The Forest of Sparks",
  colors: {
    primary: "#1A8F60",
    secondary: "#46D1A2",
    background: "#0D3D29",
    backgroundLight: "#134935",
    cardBackground: "#F0FFF9",
    textDark: "#0D3D29",
    textLight: "#F0FFF9",
    accent1: "#46D1A2",
    accent2: "#16FFBD",
    gradientStart: "#0D3D29",
    gradientEnd: "#165E40"
  },
  patterns: {
    adinkra: `repeating-linear-gradient(
      45deg,
      rgba(26, 143, 96, 0.1),
      rgba(26, 143, 96, 0.1) 10px,
      rgba(26, 143, 96, 0.2) 10px,
      rgba(26, 143, 96, 0.2) 20px
    )`,
    code: `url('/textures/code-pattern.svg')` // Adding the code pattern
  },
  gradients: {
    glow: "linear-gradient(to right, #1A8F60, #46D1A2)",
    blue: "linear-gradient(to bottom, #46D1A2, #16FFBD)",
    radial: "radial-gradient(circle, rgba(13, 61, 41, 0.0) 0%, rgba(13, 61, 41, 0.8) 80%)",
    aurora: "linear-gradient(to bottom right, rgba(6, 214, 160, 0.7), rgba(17, 138, 178, 0.5))",
  },
  shadows: {
    card: "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
    button: "0 2px 4px rgba(26, 143, 96, 0.3)",
    glow: "0 0 20px rgba(6, 214, 160, 0.7)" // Glowing effect for hover
  },
  animations: {
    glow: "pulse 2s infinite",
  },
  patternClass: "crypto-pattern",
  backgroundTexture: "url('/textures/binary-pattern.svg')"
};

// Alias for Realm 3 components
export const bioluminescentTheme = cryptographyTheme;

// Mountain Forge Theme
export const miningTheme: RealmTheme = {
  id: 4,
  name: "The Mountain Forge",
  colors: {
    primary: "#936C00",
    secondary: "#FFD966",
    background: "#3A2A00",
    backgroundLight: "#553D00",
    cardBackground: "#FFF9E5",
    textDark: "#3A2A00",
    textLight: "#FFF9E5",
    accent1: "#FFD966",
    accent2: "#FFC700",
    gradientStart: "#3A2A00",
    gradientEnd: "#725400"
  },
  patternClass: "mining-pattern",
  backgroundTexture: "url('/textures/forge-pattern.svg')"
};

// Council of Forks Theme
export const governanceTheme: RealmTheme = {
  id: 5,
  name: "The Council of Forks",
  colors: {
    primary: "#8C3494",
    secondary: "#C461CC",
    background: "#42184A",
    backgroundLight: "#5D2066",
    cardBackground: "#FCF0FD",
    textDark: "#42184A",
    textLight: "#FCF0FD",
    accent1: "#C461CC",
    accent2: "#FF73FF",
    gradientStart: "#42184A",
    gradientEnd: "#6C3078"
  },
  patternClass: "governance-pattern",
  backgroundTexture: "url('/textures/branch-pattern.svg')"
};

// Ubuntu Village Theme
export const utilityTheme: RealmTheme = {
  id: 6,
  name: "The Ubuntu Village",
  colors: {
    primary: "#D0330D",
    secondary: "#FF6D4D",
    background: "#541400",
    backgroundLight: "#7A1E00",
    cardBackground: "#FFF0EC",
    textDark: "#541400",
    textLight: "#FFF0EC",
    accent1: "#FF6D4D",
    accent2: "#FF9B85",
    gradientStart: "#541400",
    gradientEnd: "#A32D00"
  },
  patternClass: "utility-pattern",
  backgroundTexture: "url('/textures/village-pattern.svg')"
};

// Summit of Knowledge Theme
export const mastersTheme: RealmTheme = {
  id: 7,
  name: "The Summit of Knowledge",
  colors: {
    primary: "#3266CC",
    secondary: "#6695F2",
    background: "#122C59",
    backgroundLight: "#193F80",
    cardBackground: "#ECF3FF",
    textDark: "#122C59",
    textLight: "#ECF3FF",
    accent1: "#6695F2",
    accent2: "#99BDFF",
    gradientStart: "#122C59",
    gradientEnd: "#2652A3"
  },
  patternClass: "masters-pattern",
  backgroundTexture: "url('/textures/summit-pattern.svg')"
};

export const getRealmTheme = (realmId: number): RealmTheme => {
  switch (realmId) {
    case 1: return originTheme;
    case 2: return centralbankTheme;
    case 3: return cryptographyTheme;
    case 4: return miningTheme;
    case 5: return governanceTheme;
    case 6: return utilityTheme;
    case 7: return mastersTheme;
    default: return originTheme;
  }
};