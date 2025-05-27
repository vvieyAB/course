import React, { useState } from 'react';
import { Check, Wallet, Lightbulb, ArrowRight, Shield, Zap, Coins, MessageSquare, ChevronDown, ChevronUp, Globe, X } from 'lucide-react';
import { getRealmName } from '@/lib/realm-utils';

interface PracticalChallengesProps {
  onComplete: () => void;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  realm: number;
  icon: React.ReactNode;
  scenario: string;
  tasks: {
    id: string;
    description: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
    selectedOption: string | null;
  }[];
  isCompleted: boolean;
  isExpanded: boolean;
}

export default function PracticalChallenges({ onComplete }: PracticalChallengesProps) {
  // Define challenges that span content from all previous realms
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'wallet',
      title: 'Wallet Security Scenario',
      description: 'Apply best practices for securing Bitcoin wallets across different contexts.',
      realm: 1,
      icon: <Wallet className="h-6 w-6" />,
      scenario: 'Maria is a small business owner who needs to manage both personal savings and business transactions with Bitcoin. She wants to create a secure setup that balances security with convenience.',
      tasks: [
        {
          id: 'wallet-1',
          description: 'For long-term Bitcoin savings that Maria rarely needs to access, which storage method should she use?',
          options: [
            {
              id: 'wallet-1a',
              text: 'Cold storage hardware wallet with a securely stored recovery seed phrase',
              isCorrect: true,
              explanation: 'Hardware wallets provide strong security for long-term savings by keeping private keys offline. The recovery seed phrase should be securely stored, ideally in multiple locations to prevent single points of failure.'
            },
            {
              id: 'wallet-1b',
              text: 'Mobile wallet on her smartphone',
              isCorrect: false,
              explanation: 'While convenient, mobile wallets are hot wallets connected to the internet, making them vulnerable to online attacks and thus unsuitable for large, long-term savings.'
            },
            {
              id: 'wallet-1c',
              text: 'Exchange account with 2FA enabled',
              isCorrect: false,
              explanation: 'Exchange accounts are controlled by third parties ("not your keys, not your coins") and could be subject to hacks, freezes, or company failures, making them inappropriate for long-term savings.'
            },
            {
              id: 'wallet-1d',
              text: 'Paper wallet generated online',
              isCorrect: false,
              explanation: 'Online-generated paper wallets have security vulnerabilities, including potential exposure of private keys during the generation process or printing.'
            }
          ],
          selectedOption: null
        },
        {
          id: 'wallet-2',
          description: 'For day-to-day business transactions, what would be the most practical approach?',
          options: [
            {
              id: 'wallet-2a',
              text: 'A Lightning Network wallet with limited funds for fast, low-fee transactions',
              isCorrect: true,
              explanation: 'A Lightning wallet provides the speed and low fees needed for frequent business transactions. Keeping limited funds minimizes risk while maintaining practical usability for day-to-day operations.'
            },
            {
              id: 'wallet-2b',
              text: 'Moving funds from cold storage for each transaction',
              isCorrect: false,
              explanation: "This is impractical for frequent business operations, as it's time-consuming and increases security risks through repeated exposure of the cold storage device."
            },
            {
              id: 'wallet-2c',
              text: 'Keeping all business funds on an exchange',
              isCorrect: false,
              explanation: 'Keeping all business funds on an exchange creates significant counterparty risk and lacks the control needed for business operations.'
            },
            {
              id: 'wallet-2d',
              text: 'Using the same hardware wallet for all transactions',
              isCorrect: false,
              explanation: 'While secure, using a hardware wallet for frequent transactions is cumbersome for business operations and increases wear on the device.'
            }
          ],
          selectedOption: null
        },
        {
          id: 'wallet-3',
          description: "If Maria's phone with her hot wallet is lost or stolen, which of these is NOT a necessary security step?",
          options: [
            {
              id: 'wallet-3a',
              text: 'Immediately buying more Bitcoin to replace what was in the hot wallet',
              isCorrect: true,
              explanation: 'This is not a security step. If Maria has her recovery phrase, she should recover her wallet first to see if funds are still there. Security steps should be taken before considering replacement of funds.'
            },
            {
              id: 'wallet-3b',
              text: 'Using her backup seed phrase to recover the wallet on a new device',
              isCorrect: false,
              explanation: 'This is a critical security step to regain access to her funds and ensure they can be moved to safety if necessary.'
            },
            {
              id: 'wallet-3c',
              text: 'Checking transaction history to verify if any unauthorized transactions occurred',
              isCorrect: false,
              explanation: 'This is an important security step to determine if the wallet was compromised and funds were moved.'
            },
            {
              id: 'wallet-3d',
              text: 'If the wallet was PIN-protected, transferring funds to a new wallet as a precaution',
              isCorrect: false,
              explanation: "Even with PIN protection, it's a good security practice to move funds to a entirely new wallet if physical security was compromised."
            }
          ],
          selectedOption: null
        }
      ],
      isCompleted: false,
      isExpanded: true
    },
    {
      id: 'privacy',
      title: 'Privacy Practices',
      description: 'Implement effective privacy measures for different Bitcoin usage scenarios.',
      realm: 2,
      icon: <Shield className="h-6 w-6" />,
      scenario: 'Ahmed is a journalist who needs to receive Bitcoin donations for his work in a region where financial surveillance is common. He needs to maintain privacy while still being able to receive funds from supporters.',
      tasks: [
        {
          id: 'privacy-1',
          description: "Which approach would best protect Ahmed's privacy when receiving Bitcoin donations?",
          options: [
            {
              id: 'privacy-1a',
              text: 'Using a unique Bitcoin address for each donor and never reusing addresses',
              isCorrect: true,
              explanation: 'Using unique addresses for each donor prevents blockchain analysis from linking all donations together. Address reuse is one of the biggest privacy vulnerabilities in Bitcoin transactions.'
            },
            {
              id: 'privacy-1b',
              text: 'Using a single static Bitcoin address for all donations',
              isCorrect: false,
              explanation: 'A single static address would make it easy for surveillance to track all incoming donations and their total value, severely compromising privacy.'
            },
            {
              id: 'privacy-1c',
              text: 'Only accepting donations through a centralized exchange account',
              isCorrect: false,
              explanation: 'Centralized exchanges typically require KYC and maintain detailed records of all transactions, making them poor choices for privacy-sensitive situations.'
            },
            {
              id: 'privacy-1d',
              text: 'Publishing his extended public key (xpub) on his website',
              isCorrect: false,
              explanation: 'Publishing an xpub would link all generated addresses to a single source, allowing anyone to track all donations and spending patterns.'
            }
          ],
          selectedOption: null
        },
        {
          id: 'privacy-2',
          description: 'When Ahmed needs to convert some Bitcoin to local currency, which method would best preserve his privacy?',
          options: [
            {
              id: 'privacy-2a',
              text: 'Using a peer-to-peer exchange with no KYC requirements',
              isCorrect: true,
              explanation: "P2P exchanges with no KYC requirements allow for more private transactions between individuals without centralized record-keeping, maintaining the separation between Ahmed's identity and his Bitcoin activity."
            },
            {
              id: 'privacy-2b',
              text: 'Withdrawing to his bank account through a major exchange',
              isCorrect: false,
              explanation: "Major exchanges implement strict KYC/AML procedures and would create a clear link between Ahmed's identity and his Bitcoin holdings, compromising privacy."
            },
            {
              id: 'privacy-2c',
              text: 'Asking a friend to sell the Bitcoin through their verified exchange account',
              isCorrect: false,
              explanation: 'This could put both Ahmed and his friend at legal risk, potentially involving his friend in money laundering concerns while still creating transaction records.'
            },
            {
              id: 'privacy-2d',
              text: 'Converting all Bitcoin at once to minimize the number of transactions',
              isCorrect: false,
              explanation: 'Large, one-time transactions are more likely to attract attention and scrutiny than smaller, regular transactions, potentially compromising privacy.'
            }
          ],
          selectedOption: null
        },
        {
          id: 'privacy-3',
          description: 'Which network connection method would provide the best privacy when using Bitcoin?',
          options: [
            {
              id: 'privacy-3a',
              text: 'Connecting through Tor or a VPN when making Bitcoin transactions',
              isCorrect: true,
              explanation: "Tor or VPNs mask IP addresses, preventing the linking of Bitcoin transactions to Ahmed's physical location or internet identity, adding a crucial layer of network privacy."
            },
            {
              id: 'privacy-3b',
              text: 'Using public WiFi at a local café with his regular browser',
              isCorrect: false,
              explanation: 'Public WiFi without additional privacy protection still exposes his IP address and potential device identifiers, while potentially introducing additional security risks.'
            },
            {
              id: 'privacy-3c',
              text: 'Connecting through his home ISP during off-peak hours',
              isCorrect: false,
              explanation: "The timing of internet usage doesn't provide privacy protection, as his home ISP would still have records linking his identity to Bitcoin-related activity."
            },
            {
              id: 'privacy-3d',
              text: 'Using his mobile data plan for all Bitcoin transactions',
              isCorrect: false,
              explanation: "Mobile data connections are still linked to his identity through his service provider and don't provide meaningful privacy protection."
            }
          ],
          selectedOption: null
        }
      ],
      isCompleted: false,
      isExpanded: false
    },
    {
      id: 'mining',
      title: 'Mining Economics',
      description: 'Analyze mining profitability and strategic considerations.',
      realm: 4,
      icon: <Coins className="h-6 w-6" />,
      scenario: "Wei is considering investing in a small Bitcoin mining operation using excess renewable energy from her family's hydroelectric generator. She needs to understand the economics and technical considerations.",
      tasks: [
        {
          id: 'mining-1',
          description: 'Given the approaching Bitcoin halving event, which factor would be MOST important for Wei to consider for long-term profitability?',
          options: [
            {
              id: 'mining-1a',
              text: 'Energy efficiency (hash rate per watt) of the mining equipment',
              isCorrect: true,
              explanation: 'After a halving, mining rewards are cut in half, making energy efficiency the most critical factor for long-term profitability. More efficient equipment will remain profitable longer as rewards decrease.'
            },
            {
              id: 'mining-1b',
              text: 'Initial purchase price of the mining equipment',
              isCorrect: false,
              explanation: 'While important, the initial price is a one-time cost. Long-term profitability after halvings depends more on ongoing operational efficiency than upfront costs.'
            },
            {
              id: 'mining-1c',
              text: 'Current Bitcoin price',
              isCorrect: false,
              explanation: 'Current price is a short-term consideration that fluctuates constantly. Long-term mining operations need to account for price volatility and reduced rewards.'
            },
            {
              id: 'mining-1d',
              text: 'Maximum hash rate of the mining equipment',
              isCorrect: false,
              explanation: "Hash rate alone doesn't account for energy consumption. After a halving, less efficient equipment with high hash rates may become unprofitable due to electricity costs."
            }
          ],
          selectedOption: null
        },
        {
          id: 'mining-2',
          description: 'For a small mining operation with renewable energy, which mining pool strategy would be most appropriate?',
          options: [
            {
              id: 'mining-2a',
              text: 'Joining a mid-sized pool with consistent payouts and low fees',
              isCorrect: true,
              explanation: 'A mid-sized pool provides a good balance of regular rewards while avoiding excessive centralization. With renewable energy providing cost advantages, consistent modest returns from a reliable pool make the most sense.'
            },
            {
              id: 'mining-2b',
              text: 'Solo mining to keep all rewards when a block is found',
              isCorrect: false,
              explanation: 'For a small operation, solo mining would likely result in extremely infrequent rewards (possibly years between blocks), making it impractical despite keeping the full reward when successful.'
            },
            {
              id: 'mining-2c',
              text: 'Switching between different pools daily to maximize short-term profitability',
              isCorrect: false,
              explanation: 'Frequent switching creates operational overhead and potential downtime. The marginal gains from chasing slightly higher short-term pool returns are typically outweighed by consistency.'
            },
            {
              id: 'mining-2d',
              text: 'Always joining the largest pool to ensure the most consistent returns',
              isCorrect: false,
              explanation: "While large pools do provide consistent returns, exclusively supporting the largest pool contributes to mining centralization, which poses risks to Bitcoin's security and decentralization."
            }
          ],
          selectedOption: null
        },
        {
          id: 'mining-3',
          description: "Which cooling solution would be most appropriate for Wei's small hydroelectric-powered mining operation?",
          options: [
            {
              id: 'mining-3a',
              text: 'Using the natural water source for immersion cooling or heat exchange',
              isCorrect: true,
              explanation: 'Using the available water resource for cooling creates a synergy with the hydroelectric generation, maximizing the benefit of the location and potentially improving mining efficiency while minimizing environmental impact.'
            },
            {
              id: 'mining-3b',
              text: 'Installing high-powered air conditioning units',
              isCorrect: false,
              explanation: 'Air conditioning requires significant electricity that would reduce the net energy available for mining, negating some of the advantage of having renewable energy.'
            },
            {
              id: 'mining-3c',
              text: 'Running miners at reduced power to avoid cooling requirements',
              isCorrect: false,
              explanation: 'Modern ASICs are designed to run at optimal efficiency at full power with proper cooling. Running at reduced power to manage heat is generally less efficient overall.'
            },
            {
              id: 'mining-3d',
              text: 'Operating miners only during cooler night hours',
              isCorrect: false,
              explanation: 'Running only at night would leave half of the potential mining time unused, significantly reducing returns while still requiring the same capital investment in equipment.'
            }
          ],
          selectedOption: null
        }
      ],
      isCompleted: false,
      isExpanded: false
    },
    {
      id: 'lightning',
      title: 'Lightning Network Strategy',
      description: 'Develop strategies for effective Lightning Network usage.',
      realm: 6,
      icon: <Zap className="h-6 w-6" />,
      scenario: 'Carlos runs a small online business selling digital products globally. He wants to implement Lightning Network payments to reduce fees and enable micropayments for smaller items.',
      tasks: [
        {
          id: 'lightning-1',
          description: "For Carlos's business, what would be the best approach to set up Lightning Network channels?",
          options: [
            {
              id: 'lightning-1a',
              text: 'Opening several channels with well-connected, reliable nodes with good uptime',
              isCorrect: true,
              explanation: "Multiple channels with reliable, well-connected nodes provides redundancy and good routing options, ensuring Carlos's business can reliably receive payments even if some channels have issues."
            },
            {
              id: 'lightning-1b',
              text: 'Opening a single large channel with the largest Lightning service provider',
              isCorrect: false,
              explanation: 'A single channel creates a single point of failure. If that channel has issues or the node goes offline, Carlos would temporarily lose the ability to receive payments.'
            },
            {
              id: 'lightning-1c',
              text: 'Opening many small channels with brand new nodes to support network growth',
              isCorrect: false,
              explanation: 'While supportive of the network, new nodes often have poor connectivity and reliability, potentially causing payment failures and a poor customer experience.'
            },
            {
              id: 'lightning-1d',
              text: 'Only accepting Lightning payments through a custodial service',
              isCorrect: false,
              explanation: 'Custodial services introduce counterparty risk and reduce the self-sovereignty benefits of Lightning, essentially recreating the traditional financial model Carlos is trying to avoid.'
            }
          ],
          selectedOption: null
        },
        {
          id: 'lightning-2',
          description: "Which liquidity management strategy would be most appropriate for Carlos's business?",
          options: [
            {
              id: 'lightning-2a',
              text: 'Balancing inbound and outbound liquidity by regularly rebalancing channels or making payments',
              isCorrect: true,
              explanation: 'Regular rebalancing ensures Carlos always has sufficient inbound liquidity to receive customer payments, while maintaining outbound liquidity for operational expenses, creating a sustainable Lightning operation.'
            },
            {
              id: 'lightning-2b',
              text: 'Focusing only on maximizing inbound liquidity for receiving payments',
              isCorrect: false,
              explanation: 'Without outbound liquidity, Carlos would struggle to pay suppliers or rebalance channels, eventually leading to all channels being full of incoming payments with no capacity to receive more.'
            },
            {
              id: 'lightning-2c',
              text: 'Closing and reopening new channels whenever existing ones fill up',
              isCorrect: false,
              explanation: 'Constantly closing and opening channels is inefficient, expensive (due to on-chain fees), and disrupts payment capabilities during the process.'
            },
            {
              id: 'lightning-2d',
              text: 'Converting all received Lightning payments to on-chain Bitcoin immediately',
              isCorrect: false,
              explanation: 'Immediately converting to on-chain would negate many benefits of Lightning, incurring unnecessary fees and reducing the ability to make fast, low-fee outgoing payments when needed.'
            }
          ],
          selectedOption: null
        },
        {
          id: 'lightning-3',
          description: 'Which approach should Carlos take regarding Lightning Network payment failures?',
          options: [
            {
              id: 'lightning-3a',
              text: 'Implement automatic retries through different routes and clear error messages for customers',
              isCorrect: true,
              explanation: 'Automatic retries through alternative routes maximize success rates while transparent error messages create a better customer experience when issues do occur, balancing technical capabilities with user experience.'
            },
            {
              id: 'lightning-3b',
              text: 'Only accept payments during business hours when he can manually assist customers',
              isCorrect: false,
              explanation: 'Limiting payment times would severely restrict a global online business and miss the 24/7 advantage of cryptocurrency payments.'
            },
            {
              id: 'lightning-3c',
              text: 'Fall back to on-chain payments for any Lightning failure',
              isCorrect: false,
              explanation: 'Automatically falling back to on-chain would create higher fees for small purchases and slower confirmation times, negating the primary benefits of Lightning for micropayments.'
            },
            {
              id: 'lightning-3d',
              text: 'Implement a 24-hour waiting period before attempting to resolve failed payments',
              isCorrect: false,
              explanation: 'Long waiting periods for resolution would create a poor customer experience and potentially lost sales, particularly for digital products where immediate delivery is expected.'
            }
          ],
          selectedOption: null
        }
      ],
      isCompleted: false,
      isExpanded: false
    },
    {
      id: 'governance',
      title: 'Protocol Upgrade Analysis',
      description: 'Evaluate proposed Bitcoin protocol changes and their implications.',
      realm: 5,
      icon: <MessageSquare className="h-6 w-6" />,
      scenario: 'As a member of a Bitcoin development discussion group, you need to evaluate several proposed protocol changes in terms of their technical merit, backwards compatibility, and community consensus.',
      tasks: [
        {
          id: 'governance-1',
          description: 'Which approach to Bitcoin protocol upgrades has historically been most successful?',
          options: [
            {
              id: 'governance-1a',
              text: 'Soft forks implemented with broad community consensus',
              isCorrect: true,
              explanation: "Soft forks maintain backward compatibility and minimize chain splits while allowing protocol improvements. When implemented with broad community consensus, they've been the most successful approach to Bitcoin upgrades, as demonstrated by upgrades like SegWit."
            },
            {
              id: 'governance-1b',
              text: 'Hard forks that create competing chains',
              isCorrect: false,
              explanation: 'Hard forks that create competing chains fragment the ecosystem, dilute network effects, and create market confusion. They generally represent a failure to achieve consensus rather than a successful upgrade path.'
            },
            {
              id: 'governance-1c',
              text: 'Emergency changes pushed by core developers',
              isCorrect: false,
              explanation: "Emergency changes without proper review and consensus building have high risk and undermine Bitcoin's decentralized governance model, potentially introducing bugs or security vulnerabilities."
            },
            {
              id: 'governance-1d',
              text: 'User-activated forks that bypass miner approval',
              isCorrect: false,
              explanation: 'While sometimes necessary as a last resort, user-activated forks that bypass miner consensus increase the risk of chain splits and should not be the default approach to protocol upgrades.'
            }
          ],
          selectedOption: null
        },
        {
          id: 'governance-2',
          description: 'A proposed change would add a new transaction type that might make certain older wallets unable to recognize some transactions. How should this best be implemented?',
          options: [
            {
              id: 'governance-2a',
              text: 'As a soft fork where old nodes see the new transaction type as valid but with fewer features',
              isCorrect: true,
              explanation: 'This approach maintains backward compatibility while enabling new functionality. Old nodes continue operating on the same chain, simply with reduced features for newer transaction types - the same approach used successfully for upgrades like SegWit.'
            },
            {
              id: 'governance-2b',
              text: 'As a hard fork with a specific activation date when all users must upgrade',
              isCorrect: false,
              explanation: "Mandatory upgrade deadlines risk splitting the network if significant portions of users don't upgrade in time, potentially creating two competing chains and fragmenting the ecosystem."
            },
            {
              id: 'governance-2c',
              text: 'By creating a completely new cryptocurrency with the desired feature',
              isCorrect: false,
              explanation: 'Creating an entirely new cryptocurrency for each new feature would fragment the ecosystem, dilute network effects, and undermine the value proposition of a stable, secure monetary system.'
            },
            {
              id: 'governance-2d',
              text: 'Through a miner-activated upgrade requiring 95% hash power support for one day',
              isCorrect: false,
              explanation: "A very short signaling period with a high threshold could be gamed or blocked by a small minority of miners, and doesn't allow sufficient time for community evaluation and consensus building."
            }
          ],
          selectedOption: null
        },
        {
          id: 'governance-3',
          description: 'Which consideration should be given highest priority when evaluating a proposed protocol change?',
          options: [
            {
              id: 'governance-3a',
              text: 'Security implications and potential for unintended consequences',
              isCorrect: true,
              explanation: "Security is Bitcoin's foundational value proposition. Changes that might introduce vulnerabilities or have unforeseen consequences could undermine the entire system, making this consideration paramount in protocol development."
            },
            {
              id: 'governance-3b',
              text: 'Speed of transaction processing',
              isCorrect: false,
              explanation: 'While performance is important, it should never be prioritized over security or decentralization in base layer protocol changes. Speed optimizations are better suited for second-layer solutions like Lightning.'
            },
            {
              id: 'governance-3c',
              text: 'Adding new features requested by businesses',
              isCorrect: false,
              explanation: "Bitcoin's value comes from its stability, security, and neutrality - not from constantly adding new features to satisfy specific business use cases, which are better built as layers on top of the protocol."
            },
            {
              id: 'governance-3d',
              text: 'Making development easier for application builders',
              isCorrect: false,
              explanation: "While developer experience is valuable, it's a secondary consideration compared to the security and integrity of the protocol itself, especially for base layer changes."
            }
          ],
          selectedOption: null
        }
      ],
      isCompleted: false,
      isExpanded: false
    },
    {
      id: 'adoption',
      title: 'Global Adoption Strategy',
      description: 'Design practical Bitcoin adoption approaches for different global contexts.',
      realm: 6,
      icon: <Globe className="h-6 w-6" />,
      scenario: "You're advising a non-profit organization that wants to promote Bitcoin adoption in regions with limited banking access, unstable currencies, and varied technology infrastructure.",
      tasks: [
        {
          id: 'adoption-1',
          description: 'In areas with limited internet connectivity, which Bitcoin solution would be most practical for everyday transactions?',
          options: [
            {
              id: 'adoption-1a',
              text: 'SMS or USSD-based wallet systems that can function on basic feature phones',
              isCorrect: true,
              explanation: 'SMS/USSD solutions work on basic phones without smartphones or reliable internet, making them accessible to the widest population in regions with limited connectivity, as demonstrated by services like Machankura in Africa.'
            },
            {
              id: 'adoption-1b',
              text: 'Full node implementations that validate the entire blockchain',
              isCorrect: false,
              explanation: 'Full nodes require significant bandwidth, storage, and consistent internet connectivity, making them impractical for everyday use in areas with limited connectivity.'
            },
            {
              id: 'adoption-1c',
              text: 'Lightning Network implementations requiring constant online status',
              isCorrect: false,
              explanation: 'Standard Lightning wallets require reliable internet connections to monitor channel states, making them challenging to use in areas with intermittent connectivity.'
            },
            {
              id: 'adoption-1d',
              text: 'Hardware wallets with complex setup procedures',
              isCorrect: false,
              explanation: 'Hardware wallets, while secure, require technical knowledge and companion devices (like computers or smartphones), making them unsuitable as a primary solution for widespread adoption in technically limited areas.'
            }
          ],
          selectedOption: null
        },
        {
          id: 'adoption-2',
          description: 'Which educational approach would be most effective for Bitcoin adoption in communities with limited technical literacy?',
          options: [
            {
              id: 'adoption-2a',
              text: 'Practical workshops focused on specific use cases relevant to local needs',
              isCorrect: true,
              explanation: 'Practical, hands-on training focused on solving real local problems (like remittances or inflation protection) creates immediate value and builds skills through relevant application, rather than abstract concepts.'
            },
            {
              id: 'adoption-2b',
              text: 'Detailed technical explanations of blockchain technology and cryptography',
              isCorrect: false,
              explanation: "Highly technical explanations create barriers to entry and aren't necessary for basic Bitcoin use, potentially intimidating users with limited technical background."
            },
            {
              id: 'adoption-2c',
              text: 'Investment-focused seminars highlighting price potential',
              isCorrect: false,
              explanation: "Emphasizing speculative price action can promote a gambling mindset rather than understanding Bitcoin's fundamental utility, potentially leading to financial harm during volatility."
            },
            {
              id: 'adoption-2d',
              text: 'Online-only courses requiring extensive reading',
              isCorrect: false,
              explanation: 'Online text-heavy courses assume internet access, devices, and learning preferences that may not match the reality of communities with limited technical literacy.'
            }
          ],
          selectedOption: null
        },
        {
          id: 'adoption-3',
          description: 'What approach would best address the "chicken and egg" problem of adoption where users need places to spend Bitcoin and merchants need customers with Bitcoin?',
          options: [
            {
              id: 'adoption-3a',
              text: 'Creating local Bitcoin circular economies starting with essential services',
              isCorrect: true,
              explanation: 'Building circular economies where local merchants and consumers both use Bitcoin creates self-reinforcing adoption. Starting with essential services (food, transportation) ensures regular use rather than occasional novelty transactions.'
            },
            {
              id: 'adoption-3b',
              text: 'Focusing exclusively on Bitcoin as a savings technology',
              isCorrect: false,
              explanation: "While valuable, treating Bitcoin only as savings ignores its payment utility and doesn't solve the merchant adoption problem or create the network effects needed for a circular economy."
            },
            {
              id: 'adoption-3c',
              text: 'Lobbying for government mandates requiring Bitcoin acceptance',
              isCorrect: false,
              explanation: "Top-down mandates typically create resistance and don't address the underlying education and infrastructure needs. They can also backfire if implementation is rushed."
            },
            {
              id: 'adoption-3d',
              text: 'Focusing only on remittance use cases',
              isCorrect: false,
              explanation: "While remittances are an important use case, they typically involve immediate conversion to local currency rather than creating local Bitcoin circulation and merchant adoption."
            }
          ],
          selectedOption: null
        }
      ],
      isCompleted: false,
      isExpanded: false
    }
  ]);
  
  // State tracking for overall completion
  const [completedCount, setCompletedCount] = useState(0);
  const [showingCongratulations, setShowingCongratulations] = useState(false);
  
  // Handle selecting an answer
  const selectOption = (challengeId: string, taskId: string, optionId: string) => {
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => {
        if (challenge.id !== challengeId) return challenge;
        
        const updatedTasks = challenge.tasks.map(task => {
          if (task.id !== taskId) return task;
          return { ...task, selectedOption: optionId };
        });
        
        // Check if all tasks have selected options
        const allTasksCompleted = updatedTasks.every(task => task.selectedOption !== null);
        
        return {
          ...challenge,
          tasks: updatedTasks,
          isCompleted: allTasksCompleted
        };
      })
    );
  };
  
  // Toggle challenge expansion
  const toggleChallenge = (challengeId: string) => {
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => 
        challenge.id === challengeId
          ? { ...challenge, isExpanded: !challenge.isExpanded }
          : challenge
      )
    );
  };
  
  // Check if all challenges are completed
  React.useEffect(() => {
    const completed = challenges.filter(c => c.isCompleted).length;
    setCompletedCount(completed);
    
    if (completed === challenges.length) {
      setShowingCongratulations(true);
    }
  }, [challenges]);
  
  // Using getRealmName from imported utility
  
  // Complete all challenges and proceed
  const completeAllChallenges = () => {
    setTimeout(onComplete, 2000);
  };
  
  // Get feedback for a task
  const getOptionFeedback = (challengeId: string, taskId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return null;
    
    const task = challenge.tasks.find(t => t.id === taskId);
    if (!task || !task.selectedOption) return null;
    
    const selectedOption = task.options.find(o => o.id === task.selectedOption);
    if (!selectedOption) return null;
    
    return {
      isCorrect: selectedOption.isCorrect,
      explanation: selectedOption.explanation
    };
  };
  
  // Calculate challenge score
  const getChallengeScore = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return { correct: 0, total: 0 };
    
    const total = challenge.tasks.length;
    const correct = challenge.tasks.reduce((count, task) => {
      if (!task.selectedOption) return count;
      const selectedOption = task.options.find(o => o.id === task.selectedOption);
      return selectedOption?.isCorrect ? count + 1 : count;
    }, 0);
    
    return { correct, total };
  };
  
  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Challenges completed: {completedCount} of {challenges.length}</span>
          <span>{Math.round((completedCount / challenges.length) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-600 transition-all duration-300"
            style={{ width: `${(completedCount / challenges.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Challenges */}
      <div className="space-y-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
            <div 
              className="p-4 border-b border-gray-800 bg-gray-900/70 cursor-pointer"
              onClick={() => toggleChallenge(challenge.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`
                    p-2 rounded-lg mr-3
                    ${challenge.realm === 1 ? 'bg-yellow-900/30 text-yellow-400' : ''}
                    ${challenge.realm === 2 ? 'bg-blue-900/30 text-blue-400' : ''}
                    ${challenge.realm === 3 ? 'bg-green-900/30 text-green-400' : ''}
                    ${challenge.realm === 4 ? 'bg-red-900/30 text-red-400' : ''}
                    ${challenge.realm === 5 ? 'bg-cyan-900/30 text-cyan-400' : ''}
                    ${challenge.realm === 6 ? 'bg-rose-900/30 text-rose-400' : ''}
                  `}>
                    {challenge.icon}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-200">{challenge.title}</h3>
                      <div className="ml-2 text-xs text-gray-500">
                        ({getRealmName(challenge.realm)})
                      </div>
                      {challenge.isCompleted && (
                        <div className="ml-3 bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded-full">
                          Completed
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{challenge.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {challenge.isCompleted && (
                    <div className="mr-3 text-sm">
                      <span className="text-green-400">{getChallengeScore(challenge.id).correct}</span>
                      <span className="text-gray-500">/{getChallengeScore(challenge.id).total}</span>
                    </div>
                  )}
                  {challenge.isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            
            {challenge.isExpanded && (
              <div className="p-5">
                <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-300 mb-2">Scenario:</h4>
                  <p className="text-sm text-gray-400">{challenge.scenario}</p>
                </div>
                
                <div className="space-y-8 mb-6">
                  {challenge.tasks.map((task, taskIndex) => (
                    <div key={task.id} className="space-y-4">
                      <h4 className="font-medium text-gray-300">
                        Task {taskIndex + 1}: {task.description}
                      </h4>
                      
                      <div className="space-y-3">
                        {task.options.map((option) => {
                          let optionClass = '';
                          
                          if (task.selectedOption !== null) {
                            if (option.isCorrect) {
                              optionClass = 'border-green-500 bg-green-900/20';
                            } else if (task.selectedOption === option.id) {
                              optionClass = 'border-red-500 bg-red-900/20';
                            } else {
                              optionClass = 'border-gray-700 bg-black/30';
                            }
                          } else {
                            optionClass = 'border-gray-700 bg-black/30 hover:border-gray-600';
                          }
                          
                          return (
                            <div
                              key={option.id}
                              className={`p-4 border rounded-lg cursor-pointer transition-all ${optionClass}`}
                              onClick={() => !task.selectedOption && selectOption(challenge.id, task.id, option.id)}
                            >
                              <div className="flex items-start">
                                <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                                  task.selectedOption === option.id
                                    ? option.isCorrect
                                      ? 'bg-green-500 text-white'
                                      : 'bg-red-500 text-white'
                                    : option.isCorrect && task.selectedOption !== null
                                      ? 'bg-green-500 text-white'
                                      : 'border border-gray-600'
                                }`}>
                                  {task.selectedOption !== null && (
                                    option.isCorrect
                                      ? <Check className="h-3 w-3" />
                                      : task.selectedOption === option.id
                                        ? <X className="h-3 w-3" />
                                        : null
                                  )}
                                </div>
                                
                                <span className="text-gray-300">{option.text}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {task.selectedOption && (
                        <div className={`p-4 rounded-lg ${
                          getOptionFeedback(challenge.id, task.id)?.isCorrect
                            ? 'bg-green-900/20 border border-green-700'
                            : 'bg-red-900/20 border border-red-700'
                        }`}>
                          <p className="text-sm text-gray-300">
                            {getOptionFeedback(challenge.id, task.id)?.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {challenge.isCompleted && (
                  <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-300">Challenge Results</h4>
                      <div>
                        <span className="text-green-400 font-medium">{getChallengeScore(challenge.id).correct}</span>
                        <span className="text-gray-400">/{getChallengeScore(challenge.id).total} correct</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      {getChallengeScore(challenge.id).correct === getChallengeScore(challenge.id).total ? (
                        <p className="text-green-400 text-sm">Perfect! You've mastered this challenge.</p>
                      ) : getChallengeScore(challenge.id).correct >= getChallengeScore(challenge.id).total / 2 ? (
                        <p className="text-yellow-400 text-sm">Good work! You understand the key concepts.</p>
                      ) : (
                        <p className="text-red-400 text-sm">You might want to review this area again.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Congratulations section */}
      {showingCongratulations && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-5 text-center">
          <div className="inline-block bg-green-900/30 p-3 rounded-full mb-4">
            <Lightbulb className="h-8 w-8 text-green-400" />
          </div>
          
          <h3 className="text-xl font-medium text-green-400 mb-2">All Challenges Completed!</h3>
          
          <p className="text-gray-300 mb-6">
            Congratulations! You've successfully completed all practical challenges, demonstrating your
            ability to apply Bitcoin knowledge from all realms - from the Realm of Origins through 
            The Ubuntu Village - to real-world scenarios.
          </p>
          
          <button
            onClick={completeAllChallenges}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center mx-auto"
          >
            Continue Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}