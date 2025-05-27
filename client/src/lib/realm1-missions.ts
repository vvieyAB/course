// Types for Mission Content
export interface MissionContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  objectives: string[];
  imagePath?: string;
  simulationType: 'barter' | 'timeline' | 'inflation' | 'quiz' | 'map' | 'reflection' | 
                  'roleplay' | 'privacy' | 'exclusion' | 'globalflow' | 'escape' |
                  'cryptography' | 'hash' | 'merkle' | 'consensus' | 'network' | 'code' | 'lightning' | 'lightning-network' |
                  'miningBasics' | 'miningConsensus' | 'energyUsage' | 'africanMining' | 'miningChallenge' | 'halving' |
                  'surveillance' | 'cbdc' | 'bitcoin' | 'selfcustody' | 'paymentprivacy';
  simulationData?: any;
  reflectionQuestion?: string;
  content?: string;
  questions?: any[];
}

// Types for Trader (Barter Web Challenge)
export interface Trader {
  id: number;
  name: string;
  has: string;
  wants: string;
}

// Types for Timeline Challenge
export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
}

// Types for Inflation Simulator
export interface BasicItem {
  id: string;
  name: string;
  initialPrice: number;
}

export interface Event {
  year: number;
  title: string;
  description: string;
  priceMultiplier: number;
}

// Types for Quiz Challenge
export interface Question {
  id: number;
  text: string;
  answers: {
    id: number;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  explanation?: string;
}

// Types for Trade Route Map
export interface City {
  id: string;
  name: string;
  position: {
    x: number; // percentage from left
    y: number; // percentage from top
  };
}

export interface Route {
  id: number;
  from: string; // city id
  to: string; // city id
  goods: string;
  value: number;
}

// Mission Data for Realm of Origins (Realm 1) - Foundations of Money
export const realm1Missions: MissionContent[] = [
  {
    id: 101,
    title: "The First Exchange",
    subtitle: "Understanding Barter Systems",
    description: "Before coins or paper money existed, people traded goods directly with each other—this practice is called bartering.\n\nIn this mission, you'll explore the ancient practice of bartering, the earliest form of economic exchange before the invention of money. Across Africa, communities developed sophisticated barter networks, exchanging valuable goods like salt from the Sahara, gold from West Africa, textiles from Ethiopia, and copper from Central Africa.\n\nBartering works well when both parties want what the other has. However, barter systems had major limitations. Imagine you have fish but need tools - if the toolmaker doesn't want fish, you're stuck! This 'double coincidence of wants' problem made trade inefficient.\n\nAdditionally, how do you divide a cow if you only need a small amount of grain? These challenges eventually led societies to develop intermediate commodities that everyone accepted - the first forms of money.\n\nFor example, if you had extra beans but needed new sandals, and the sandal maker only wanted fish, you would need to find someone with fish who wanted your beans, then take that fish to the sandal maker. This complexity is why people eventually created things that everyone would accept in trade.",
    objectives: [
      "Understand the basic concept of barter",
      "Identify the limitations of direct exchange",
      "Complete a series of trades in the barter web challenge",
      "Reflect on the inefficiencies of barter systems"
    ],
    imagePath: "/assets/barter-system.jpg",
    simulationType: "barter",
    simulationData: {
      traders: [
        { id: 1, name: "Nomba", has: "salt block", wants: "iron tools" },
        { id: 2, name: "Kwesi", has: "iron tools", wants: "woven basket" },
        { id: 3, name: "Ama", has: "woven basket", wants: "yams" },
        { id: 4, name: "Kofi", has: "yams", wants: "fish" },
        { id: 5, name: "Adwoa", has: "fish", wants: "clay pot" },
        { id: 6, name: "Yaw", has: "leather goods", wants: "seeds" },
        { id: 7, name: "Akua", has: "seeds", wants: "leather goods" },
      ]
    },
    reflectionQuestion: "How did it feel trying to navigate multiple trades to get what you wanted? What challenges might people face in a pure barter economy?"
  },
  {
    id: 102,
    title: "Evolution of Money",
    subtitle: "From Shells to Metal Coins",
    description: "After people realized the problems with direct bartering, they began using special items that everyone valued. Cowrie shells were one of Africa's first forms of money because they were scarce, durable, and couldn't be easily copied. Across Africa, from the great kingdoms of West Africa to the coastal settlements of East Africa, these tiny shells facilitated trade for centuries.\n\nThis mission traces the fascinating journey of how money evolved from commodity money like shells and beads to the first standardized metal coins. You will understand why certain items became widely accepted as forms of value exchange.\n\nMoney needed to be something everyone agreed had value. It couldn't be something too common, or it would be worthless. It couldn't spoil quickly like food. And it needed to be easy to carry. Over time, people realized metals like gold and silver made excellent money—they were rare, didn't rust or decay, could be divided into smaller pieces, and could be verified as real by their weight and appearance.\n\nWith standardized pieces of metal, marked to guarantee their value, trade could happen more easily across vast distances, even between people who didn't speak the same language.",
    objectives: [
      "Identify different forms of commodity money",
      "Arrange key monetary innovations in chronological order",
      "Understand why metals became preferred for coinage",
      "Learn about the properties that make good money"
    ],
    simulationType: "timeline",
    simulationData: {
      events: [
        {
          id: 1,
          year: "9000 BCE",
          title: "Cattle as Wealth",
          description: "Early livestock becomes one of the first forms of wealth and trade medium."
        },
        {
          id: 2,
          year: "1200 BCE",
          title: "Cowrie Shells",
          description: "Cowrie shells become widely used as currency across Africa, Asia and Oceania."
        },
        {
          id: 3,
          year: "1000 BCE",
          title: "Metal Tool Money",
          description: "Bronze and copper tools and weapon shapes used as proto-currency."
        },
        {
          id: 4,
          year: "700 BCE",
          title: "First Official Coins",
          description: "Lydians in modern-day Turkey create the first standardized metal coins stamped with images."
        },
        {
          id: 5,
          year: "500 BCE",
          title: "Greek Silver Drachma",
          description: "Standardized silver coins spread throughout the Mediterranean world."
        },
        {
          id: 6,
          year: "118 BCE",
          title: "Chinese Paper Money",
          description: "First experimentation with paper notes as a representation of value in China."
        }
      ]
    },
    reflectionQuestion: "Why do you think humans moved from bartering to using commodity money and then coins? What properties made some forms of money more successful than others?"
  },
  {
    id: 103,
    title: "The Value of Money",
    subtitle: "Understanding Inflation Over Time",
    description: "Money's value isn't always constant. Throughout history, bread and other basic goods once cost a fraction of today's prices. This is inflation—when money loses value over time, causing prices to rise. Imagine if your savings today only bought half as much food next year—that's the danger of inflation.\n\nThis mission will show you how the value of money can change over time through inflation. You'll experience how prices of everyday items have increased throughout history and learn what causes these changes.\n\nMoney is supposed to store value over time. But when too much money is created, each unit becomes worth less. Think of it like this: if only 10 special shells existed in a village, each would be valuable. But if suddenly 1,000 identical shells were discovered, each shell would become less special—less valuable.\n\nHistorical examples of hyperinflation, like in Zimbabwe, show extreme cases where prices doubled daily at one point, forcing people to carry billions of Zimbabwe dollars just to buy bread. When money fails like this, people lose trust in it. Several African nations experienced this when their governments printed too much money.",
    objectives: [
      "Understand the basic concept of inflation",
      "See how historical events can trigger rapid price changes",
      "Learn how inflation affects purchasing power",
      "Compare price changes across different types of goods"
    ],
    simulationType: "inflation",
    simulationData: {
      basicItems: [
        { id: "bread", name: "Loaf of Bread", initialPrice: 0.07 },
        { id: "milk", name: "Gallon of Milk", initialPrice: 0.32 },
        { id: "rent", name: "Monthly Rent", initialPrice: 18 },
        { id: "wages", name: "Weekly Wages", initialPrice: 12 }
      ],
      events: [
        {
          year: 1914,
          title: "World War I Begins",
          description: "The onset of global conflict causes supply disruptions and price increases.",
          priceMultiplier: 1.15
        },
        {
          year: 1929,
          title: "Great Depression",
          description: "Economic collapse causes deflation as money becomes scarce.",
          priceMultiplier: 0.75
        },
        {
          year: 1945,
          title: "Post-War Economy",
          description: "End of WWII and return to normal production causes prices to stabilize.",
          priceMultiplier: 1.05
        },
        {
          year: 1971,
          title: "End of Gold Standard",
          description: "US dollar is no longer backed by gold, allowing greater monetary expansion.",
          priceMultiplier: 1.12
        },
        {
          year: 1980,
          title: "Oil Crisis Inflation",
          description: "Energy shortages and monetary policy lead to high inflation.",
          priceMultiplier: 1.14
        }
      ]
    },
    reflectionQuestion: "How might your savings be affected during periods of high inflation? Why might a currency with a fixed supply be resistant to inflation?"
  },
  {
    id: 104,
    title: "Money Properties",
    subtitle: "What Makes Good Money?",
    description: "Not all forms of money are created equal. Some work better than others based on their inherent properties.\n\nGood money needs specific qualities to function well. Consider salt as money—it was valuable, but it could dissolve in rain or humidity! Gold doesn't have that problem—it's durable. But what if you need to make a small purchase with a large gold bar? That's why divisibility matters.\n\nThis mission tests your knowledge about the key properties that make good money. Different forms of money throughout history have succeeded or failed based on these essential characteristics.\n\nA simple way to remember the qualities of good money is with the acronym 'DUPSVF': Durable (doesn't break down), Uniform (each piece is the same), Portable (easy to carry), Scarce (limited supply), Verifiable (can't be counterfeited), and Fungible (interchangeable units).\n\nThroughout history, people discovered these properties through trial and error. Cowrie shells worked in Africa because they were naturally scarce and hard to counterfeit. Salt worked until humidity affected it. Paper money works only if people trust that it's limited and backed by something valuable.",
    objectives: [
      "Identify the six key properties of sound money",
      "Understand why each property matters",
      "Compare different forms of money based on these properties",
      "Learn how Bitcoin relates to traditional money properties"
    ],
    simulationType: "quiz",
    simulationData: {
      questions: [
        {
          id: 1,
          text: "Which of these is NOT one of the key properties of good money?",
          answers: [
            { id: 1, text: "Divisibility - can be split into smaller units", isCorrect: false },
            { id: 2, text: "Centralization - controlled by a single authority", isCorrect: true, explanation: "Good money doesn't need to be centralized. In fact, decentralization can be beneficial as it prevents manipulation by a single authority." },
            { id: 3, text: "Durability - doesn't degrade over time", isCorrect: false },
            { id: 4, text: "Portability - easy to carry and transport", isCorrect: false }
          ],
          explanation: "Good money should be durable, portable, divisible, fungible (interchangeable), scarce, and verifiable. Centralization is not a necessary property and can sometimes be detrimental."
        },
        {
          id: 2,
          text: "Why did cowrie shells work well as money in many ancient societies?",
          answers: [
            { id: 1, text: "They had magical properties that gave them value", isCorrect: false },
            { id: 2, text: "They were easy to counterfeit", isCorrect: false },
            { id: 3, text: "They were naturally scarce and difficult to find in many regions", isCorrect: true, explanation: "Cowrie shells were not native to many regions where they were used as currency, making them naturally scarce. Their distinctive appearance also made them difficult to counterfeit." },
            { id: 4, text: "They could be eaten in times of famine", isCorrect: false }
          ]
        },
        {
          id: 3,
          text: "Why is divisibility an important property of money?",
          answers: [
            { id: 1, text: "It allows money to be hidden in different places", isCorrect: false },
            { id: 2, text: "It enables precise pricing and payment for different values", isCorrect: true, explanation: "Divisibility allows for payments of exact amounts and enables pricing at various levels, from very inexpensive to very expensive items." },
            { id: 3, text: "It makes money easier to carry", isCorrect: false },
            { id: 4, text: "It prevents money from being damaged", isCorrect: false }
          ]
        },
        {
          id: 4,
          text: "What does 'fungibility' mean when discussing money?",
          answers: [
            { id: 1, text: "Money should be resistant to fungi and mold", isCorrect: false },
            { id: 2, text: "Each unit should grow in value over time", isCorrect: false },
            { id: 3, text: "Each unit should be interchangeable with any other unit of the same value", isCorrect: true, explanation: "Fungibility means that each unit of currency is interchangeable with any other unit of the same value. For example, any $10 bill is worth the same as any other $10 bill." },
            { id: 4, text: "Money should be able to fulfill multiple functions", isCorrect: false }
          ]
        },
        {
          id: 5,
          text: "Why did gold become widely used as money throughout history?",
          answers: [
            { id: 1, text: "It was the most common metal on Earth", isCorrect: false },
            { id: 2, text: "It fulfilled many properties of good money: durable, portable, divisible, scarce, and verifiable", isCorrect: true, explanation: "Gold is durable (doesn't corrode), reasonably portable, can be divided into smaller units, is naturally scarce, and its purity can be tested (verified)." },
            { id: 3, text: "It could be created easily by alchemists", isCorrect: false },
            { id: 4, text: "It had the best technological applications", isCorrect: false }
          ]
        }
      ]
    }
  },
  {
    id: 105,
    title: "Ancient Trade Routes",
    subtitle: "How Money Facilitates Trade",
    description: "One of the greatest achievements of money was how it connected entire continents through trade networks.\n\nThe famous gold route stretched from Mali across the Sahara. Without standardized money, traders would need to carry heavy goods everywhere they went. But with gold coins and cowrie shells, a merchant from Timbuktu could travel to Egypt carrying only a small pouch of currency.\n\nThis mission lets you explore ancient African trade routes and see how the introduction of standardized forms of money facilitated trade across vast distances. You'll navigate through historical trading posts and make strategic decisions to maximize your trading success.\n\nAfrica had some of the world's most sophisticated trade networks. The kingdom of Mali became extraordinarily wealthy through gold trade. The East African coastal cities like Kilwa grew prosperous as trading hubs connecting Africa to Asia. All of this was possible because money solved the 'double coincidence of wants' problem we saw with barter.\n\nConsider this practical example: a trader carrying salt from the Sahara could sell it for cowrie shells in one market, then use those shells to buy ivory in another, and finally exchange that for textiles elsewhere. Money made this chain of trade possible without needing direct exchanges.",
    objectives: [
      "Learn about major African trade routes",
      "Understand how money solved the coincidence of wants problem",
      "Experience how money increased trade efficiency",
      "Discover important trade goods of ancient Africa"
    ],
    simulationType: "map",
    simulationData: {
      cities: [
        {
          id: "timbuktu",
          name: "Timbuktu",
          position: { x: 25, y: 40 }
        },
        {
          id: "gao",
          name: "Gao",
          position: { x: 35, y: 42 }
        },
        {
          id: "zagwe",
          name: "Zagwe",
          position: { x: 70, y: 50 }
        },
        {
          id: "kilwa",
          name: "Kilwa",
          position: { x: 75, y: 75 }
        },
        {
          id: "mapungubwe",
          name: "Mapungubwe",
          position: { x: 65, y: 85 }
        },
        {
          id: "ghana",
          name: "Ghana Empire",
          position: { x: 15, y: 30 }
        },
        {
          id: "mali",
          name: "Mali",
          position: { x: 20, y: 35 }
        }
      ],
      routes: [
        {
          id: 1,
          from: "timbuktu",
          to: "gao",
          goods: "Salt",
          value: 10
        },
        {
          id: 2,
          from: "timbuktu",
          to: "mali",
          goods: "Gold",
          value: 25
        },
        {
          id: 3,
          from: "gao",
          to: "zagwe",
          goods: "Textiles",
          value: 15
        },
        {
          id: 4,
          from: "zagwe",
          to: "kilwa",
          goods: "Ivory",
          value: 30
        },
        {
          id: 5,
          from: "kilwa",
          to: "mapungubwe",
          goods: "Porcelain",
          value: 20
        },
        {
          id: 6,
          from: "mapungubwe",
          to: "timbuktu",
          goods: "Copper",
          value: 25
        },
        {
          id: 7,
          from: "ghana",
          to: "timbuktu",
          goods: "Kola Nuts",
          value: 15
        },
        {
          id: 8,
          from: "mali",
          to: "ghana",
          goods: "Manuscripts",
          value: 20
        }
      ]
    },
    reflectionQuestion: "How did standardized forms of money change trade compared to barter? What advantages did traders gain when they could use gold, cowrie shells, or other forms of money instead of direct goods exchange?"
  },
  {
    id: 106,
    title: "Ubuntu Economics",
    subtitle: "Trust-Based Systems Beyond Money",
    description: "Money isn't the only way communities organize their resources. In Africa, a profound economic system developed based on Ubuntu.\n\nUbuntu means 'I am because we are'—a philosophy that recognizes our interconnectedness. In many African communities, economic decisions weren't just about profit, but about collective wellbeing.\n\nThis mission explores how African societies developed sophisticated economic systems based on trust and communal values rather than relying solely on currency. You'll discover the philosophy of Ubuntu and its applications in community resource management throughout African history.\n\nIn traditional Ubuntu economics, families help build each other's homes without payment. They know when they need help, others will come to their aid too. This creates resilience—if your crops fail, the community ensures you don't starve. If you need labor for a big project, the community provides it. These systems existed alongside trade and money, creating a balanced approach to economics.\n\nModern economics often ignores these systems, but they've sustained communities for centuries, especially during hardships when money systems collapsed.",
    objectives: [
      "Understand the philosophy of Ubuntu in economic contexts",
      "Learn about gift economies and labor exchange systems in African societies",
      "Explore communal resource management traditions",
      "Compare trust-based and currency-based economies",
      "Discover how Ubuntu principles continue to influence modern alternative economies"
    ],
    simulationType: "reflection",
    reflectionQuestion: "How did trust-based economic systems like Ubuntu provide resilience for communities? In what ways might these principles be valuable in today's economic systems?"
  },
  {
    id: 107,
    title: "African Currency Evolution",
    subtitle: "From Cowrie Shells to Colonial Coins",
    description: "This final mission examines how Africa's monetary systems evolved through the ages.\n\nBefore European colonization, African kingdoms had sophisticated currency systems. The Akan people of West Africa used carefully weighed gold dust for trade. In Central Africa, copper crosses served as currency. These weren't primitive—they were perfectly adapted to local conditions.\n\nExplore the rich history of money and currency systems throughout African history. Learn how different cultures and communities developed unique monetary systems and how these evolved over time in response to local conditions and external forces.\n\nColonization disrupted these systems. European powers imposed their currencies, often to facilitate resource extraction and tax collection. This fundamentally changed economic relationships.\n\nWhen African nations gained independence, creating their own currencies became a symbol of sovereignty. However, many faced challenges of inflation and instability. Today, innovations like mobile money are creating new possibilities for African monetary systems, building on both traditional values and modern technology.",
    objectives: [
      "Understand African barter systems and early trading practices",
      "Learn about indigenous commodity currencies like cowrie shells and gold dust",
      "Examine the impact of colonization on African monetary systems",
      "Explore historical inflation events and their social impacts",
      "Discover the monetary innovations of historic African empires",
      "Consider the role of community and trust in value systems"
    ],
    simulationType: "reflection",
    reflectionQuestion: "How did traditional African monetary systems incorporate both economic and cultural values? What lessons can we learn from these systems in today's digital age?"
  }
];