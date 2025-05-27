import React, { useState } from 'react';
import { ArrowRight, Check, CheckCircle, ChevronDown, ChevronUp, Circle, Coins, CircleDollarSign, Hexagon, Key, Lock, Shield, Trophy, Wallet, X, Zap } from 'lucide-react';
import { getRealmName } from '@/lib/realm-utils';

interface FinalChallengeProps {
  onComplete: () => void;
}

interface ChallengePart {
  id: string;
  title: string;
  realm: number;
  description: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  selectedOption: string | null;
  isCompleted: boolean;
  isExpanded: boolean;
}

export default function FinalChallenge({ onComplete }: FinalChallengeProps) {
  // Scenario: Global Bitcoin Initiative
  const scenario = `
    You're part of a global Bitcoin initiative that aims to increase adoption in a region facing high inflation, limited banking access, and governmental restrictions on financial freedom. Your team needs to design a comprehensive Bitcoin solution addressing technical, economic, social, and privacy aspects.
  `;
  
  // Challenge parts covering content from all realms
  const [challengeParts, setChallengeParts] = useState<ChallengePart[]>([
    {
      id: 'monetary',
      title: 'Monetary Foundation',
      realm: 1,
      description: 'Design the monetary education approach for people with no prior Bitcoin knowledge in an inflationary economy.',
      question: "Which approach would be most effective for explaining Bitcoin's value proposition to people in a high-inflation economy with limited financial education?",
      options: [
        {
          id: 'monetary-a',
          text: "Focus on Bitcoin as a store of value with a fixed supply, comparing it to their experience with continually devaluing local currency",
          isCorrect: true,
          explanation: "Drawing parallels between Bitcoin's fixed supply and their direct experience with inflation creates an immediate, tangible understanding. People in high-inflation environments already understand the problem Bitcoin solves because they live it daily, so connecting Bitcoin's properties to their existing pain point is most effective."
        },
        {
          id: 'monetary-b',
          text: "Begin with detailed explanations of blockchain technology and distributed consensus mechanisms",
          isCorrect: false,
          explanation: "While the technical aspects are important eventually, starting with complex technical concepts doesn't address the immediate problem people in high-inflation environments face and may create unnecessary barriers to understanding the primary benefit."
        },
        {
          id: 'monetary-c',
          text: "Focus on Bitcoin's price appreciation potential and investment returns",
          isCorrect: false,
          explanation: "Emphasizing price speculation might attract short-term interest but doesn't build sustainable adoption or education. In high-inflation environments, the fundamental utility as a stable store of value is more relevant than potential investment gains."
        },
        {
          id: 'monetary-d',
          text: "Emphasize Bitcoin mining as a way to generate income",
          isCorrect: false,
          explanation: "Mining is capital-intensive and generally not accessible to most people in economically challenged regions. This approach distracts from Bitcoin's primary utility for people in inflationary environments: preserving purchasing power."
        }
      ],
      selectedOption: null,
      isCompleted: false,
      isExpanded: true
    },
    {
      id: 'privacy',
      title: 'Privacy Strategy',
      realm: 2,
      description: 'Develop a privacy approach for regions with financial surveillance and potential repercussions for Bitcoin users.',
      question: "In a region with government financial surveillance, which privacy approach creates the best balance of usability and protection?",
      options: [
        {
          id: 'privacy-a',
          text: "Using non-KYC Bitcoin sources, educating on address rotation, avoiding chain analysis heuristics, and connecting through Tor/VPNs",
          isCorrect: true,
          explanation: "This balanced approach implements multiple layers of privacy that work together - from acquisition privacy to network privacy - without requiring extremely technical knowledge. It creates meaningful protection while maintaining usability for regular people."
        },
        {
          id: 'privacy-b',
          text: "Making all Bitcoin transactions through a centralized exchange that's easily accessible",
          isCorrect: false,
          explanation: "Centralized exchanges typically implement KYC procedures and maintain detailed records that can be accessed by authorities. This approach provides essentially no privacy in a surveillance environment."
        },
        {
          id: 'privacy-c',
          text: "Using only advanced coin-join implementations that require extensive technical knowledge",
          isCorrect: false,
          explanation: "While technically strong, this approach creates significant barriers to adoption due to its complexity. Most users would struggle to implement it correctly, potentially creating worse privacy outcomes than a simpler but consistently applied approach."
        },
        {
          id: 'privacy-d',
          text: "Focusing exclusively on face-to-face cash trades for all Bitcoin",
          isCorrect: false,
          explanation: "While cash trades can increase acquisition privacy, this approach is impractical for regular use, limits access, and doesn't address on-chain privacy once the Bitcoin is acquired. It also doesn't scale for a broader adoption initiative."
        }
      ],
      selectedOption: null,
      isCompleted: false,
      isExpanded: false
    },
    {
      id: 'security',
      title: 'Security Model',
      realm: 3,
      description: 'Design a security approach suitable for users with varying technical knowledge and access to technology.',
      question: "Which Bitcoin security model would be most appropriate for a general population with varied technical literacy and limited access to specialized hardware?",
      options: [
        {
          id: 'security-a',
          text: "A tiered approach with simple mobile wallets for small amounts and basic transactions, combined with collaborative custody using multi-signature for larger savings",
          isCorrect: true,
          explanation: "This balanced approach acknowledges practical reality - people need simple solutions for everyday use while providing stronger security for larger amounts. Collaborative custody through multi-signature allows for security without requiring each individual to master complex technical concepts."
        },
        {
          id: 'security-b',
          text: "Requiring all users to run full nodes and use hardware wallets exclusively",
          isCorrect: false,
          explanation: "While technically ideal, this approach is impractical for populations with limited technical literacy or access to specialized hardware. The high barrier would severely limit adoption and likely lead to dangerous security shortcuts."
        },
        {
          id: 'security-c',
          text: "Using custodial services exclusively to simplify the user experience",
          isCorrect: false,
          explanation: "Full custodial solutions recreate the same trust problems of traditional banking, introduce single points of failure, and expose users to potential account freezes or confiscation in regions with government restrictions."
        },
        {
          id: 'security-d',
          text: "Focusing only on paper wallets generated online for all users",
          isCorrect: false,
          explanation: "Paper wallets have significant security vulnerabilities in their generation, storage, and use, particularly when created by users with limited technical knowledge. They're also impractical for regular transactional use."
        }
      ],
      selectedOption: null,
      isCompleted: false,
      isExpanded: false
    },
    {
      id: 'mining',
      title: 'Local Mining Strategy',
      realm: 4,
      description: "Evaluate the potential role of local Bitcoin mining in the region's Bitcoin adoption strategy.",
      question: "What approach to Bitcoin mining would be most beneficial for a developing region with some renewable energy resources but limited infrastructure?",
      options: [
        {
          id: 'mining-a',
          text: "Small-scale mining operations co-located with underutilized renewable energy sources, creating local employment and energy sector development",
          isCorrect: true,
          explanation: "This approach monetizes existing renewable resources that might otherwise be wasted, creates economic development through both energy infrastructure and Bitcoin mining jobs, and increases local participation in the network without requiring massive capital investment."
        },
        {
          id: 'mining-b',
          text: "Focusing exclusively on large-scale industrial mining operations with foreign investment",
          isCorrect: false,
          explanation: "While potentially profitable, large foreign-owned operations often extract value rather than build local capacity, may not employ many locals, and don't necessarily contribute to broader Bitcoin education or adoption in the region."
        },
        {
          id: 'mining-c',
          text: "Encouraging individuals to mine Bitcoin using personal computers and residential electricity",
          isCorrect: false,
          explanation: "Personal computer mining for Bitcoin has been economically infeasible for years due to specialized ASICs. This approach would waste electricity and hardware resources with zero chance of earning rewards, potentially harming adoption efforts."
        },
        {
          id: 'mining-d',
          text: "Avoiding mining entirely and focusing only on buying Bitcoin",
          isCorrect: false,
          explanation: "While purchasing Bitcoin is essential, completely ignoring potential mining opportunities misses chances for local wealth creation, energy sector development, and participation in network security that could benefit the region economically."
        }
      ],
      selectedOption: null,
      isCompleted: false,
      isExpanded: false
    },
    {
      id: 'scaling',
      title: 'Network Scaling',
      realm: 5,
      description: 'Choose the appropriate scaling approach for a region needing both censorship resistance and practical everyday transactions.',
      question: "What Bitcoin scaling approach would best serve a region needing both sovereign ownership and everyday payment functionality?",
      options: [
        {
          id: 'scaling-a',
          text: "A layered approach using on-chain transactions for final settlement and larger amounts, with Lightning Network for everyday small transactions and remittances",
          isCorrect: true,
          explanation: "This layered approach leverages the different strengths of each layer: the security and sovereignty of on-chain transactions when needed, and the speed and low fees of Lightning for everyday use. It creates a complete system balancing all requirements rather than sacrificing key needs."
        },
        {
          id: 'scaling-b',
          text: "Using only on-chain transactions with high fees to ensure maximum decentralization",
          isCorrect: false,
          explanation: "While on-chain transactions provide maximum security, exclusive reliance on them would make everyday payments impractical due to fees and confirmation times, severely limiting Bitcoin's utility in regular commerce and small transactions."
        },
        {
          id: 'scaling-c',
          text: "Using only centralized payment processors that batch Bitcoin transactions off-chain",
          isCorrect: false,
          explanation: "Centralized processors reintroduce the same trust issues, censorship vulnerabilities, and potential freezes that people in restricted regions are trying to avoid by using Bitcoin in the first place."
        },
        {
          id: 'scaling-d',
          text: "Promoting a Bitcoin fork with larger blocks and lower fees",
          isCorrect: false,
          explanation: "Forks typically have significantly weaker security guarantees, less developer support, smaller network effects, and often trade decentralization for throughput, compromising the core value proposition for vulnerable populations."
        }
      ],
      selectedOption: null,
      isCompleted: false,
      isExpanded: false
    },
    {
      id: 'adoption',
      title: 'Real-World Integration',
      realm: 6,
      description: 'Develop a strategy for integrating Bitcoin into the local economy and creating sustainable adoption.',
      question: "What approach would best create sustainable, organic Bitcoin adoption in a local economy?",
      options: [
        {
          id: 'adoption-a',
          text: "Building a circular economy by simultaneously onboarding both merchants and consumers, with initial focus on remittances, bill payments, and daily necessities",
          isCorrect: true,
          explanation: "A circular economy where Bitcoin stays within the community creates reinforcing network effects. Focusing on existing pain points (remittances, inflation protection) and essential services people already need provides immediate utility while building towards broader adoption."
        },
        {
          id: 'adoption-b',
          text: "Securing a government mandate requiring all businesses to accept Bitcoin",
          isCorrect: false,
          explanation: "Top-down mandates without organic demand or education often create resentment, technical issues, and immediate conversion to fiat. This approach doesn't build genuine understanding or create a sustainable Bitcoin economy."
        },
        {
          id: 'adoption-c',
          text: "Focusing exclusively on speculative investment and price appreciation",
          isCorrect: false,
          explanation: "Speculation-focused adoption is vulnerable to market cycles and doesn't create the infrastructure or understanding needed for Bitcoin's use as actual money. When price drops, this type of adoption typically disappears."
        },
        {
          id: 'adoption-d',
          text: "Directly subsidizing Bitcoin purchases to increase ownership",
          isCorrect: false,
          explanation: "Subsidies create artificial and unsustainable adoption patterns, often attracting people who sell immediately for the subsidy rather than users who understand Bitcoin's utility. When subsidies inevitably end, adoption typically collapses."
        }
      ],
      selectedOption: null,
      isCompleted: false,
      isExpanded: false
    }
  ]);
  
  // Component state
  const [currentStep, setCurrentStep] = useState(0);
  const [allPartsCompleted, setAllPartsCompleted] = useState(false);
  const [finalPlan, setFinalPlan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Calculate completion status
  React.useEffect(() => {
    const completed = challengeParts.every(part => part.isCompleted);
    setAllPartsCompleted(completed);
  }, [challengeParts]);
  
  // Toggle challenge part expansion
  const togglePart = (partId: string) => {
    setChallengeParts(prev => 
      prev.map(part => 
        part.id === partId
          ? { ...part, isExpanded: !part.isExpanded }
          : part
      )
    );
  };
  
  // Select an option for a challenge part
  const selectOption = (partId: string, optionId: string) => {
    setChallengeParts(prev => 
      prev.map(part => {
        if (part.id !== partId) return part;
        
        const selectedOption = part.options.find(opt => opt.id === optionId);
        const isCorrect = selectedOption?.isCorrect || false;
        
        return {
          ...part,
          selectedOption: optionId,
          isCompleted: true
        };
      })
    );
  };
  
  // Handle final plan input
  const handlePlanChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFinalPlan(e.target.value);
  };
  
  // Submit final challenge
  const submitChallenge = () => {
    setIsSubmitting(true);
    
    // Check if all correct options were selected
    const allCorrect = challengeParts.every(part => {
      const selectedOption = part.options.find(opt => opt.id === part.selectedOption);
      return selectedOption?.isCorrect;
    });
    
    setTimeout(() => {
      setIsSubmitting(false);
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }, 1500);
  };
  
  // Get correct count
  const getCorrectCount = () => {
    return challengeParts.reduce((count, part) => {
      const selectedOption = part.options.find(opt => opt.id === part.selectedOption);
      return selectedOption?.isCorrect ? count + 1 : count;
    }, 0);
  };
  
  // Get realm icon
  const getRealmIcon = (realm: number) => {
    switch (realm) {
      case 1: // Realm of Origins
        return <Coins className="h-5 w-5" />;
      case 2: // The Central Citadel
        return <Shield className="h-5 w-5" />;
      case 3: // The Forest of Sparks
        return <Lock className="h-5 w-5" />;
      case 4: // The Mountain Forge
        return <Zap className="h-5 w-5" />;
      case 5: // The Council of Forks
        return <Hexagon className="h-5 w-5" />;
      case 6: // The Ubuntu Village
        return <CircleDollarSign className="h-5 w-5" />;
      default: // The Summit of Knowledge
        return <Circle className="h-5 w-5" />;
    }
  };
  
  // Using getRealmName from imported utility
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
        <h3 className="text-xl font-semibold text-purple-400 mb-2">The Final Challenge</h3>
        
        <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-purple-400 mb-2">Scenario: Global Bitcoin Initiative</h4>
          <p className="text-gray-300 text-sm">{scenario}</p>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Challenge Progress</span>
            <span>{challengeParts.filter(p => p.isCompleted).length} of {challengeParts.length} parts completed</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${(challengeParts.filter(p => p.isCompleted).length / challengeParts.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {challengeParts.map((part, index) => (
            <div 
              key={part.id}
              className={`border rounded-lg overflow-hidden transition-all ${
                part.isCompleted 
                  ? 'border-green-700 bg-green-900/10' 
                  : 'border-gray-800 bg-gray-900/50'
              }`}
            >
              <div 
                className="p-4 cursor-pointer flex items-center justify-between"
                onClick={() => togglePart(part.id)}
              >
                <div className="flex items-center">
                  <div className={`
                    h-8 w-8 rounded-full flex items-center justify-center mr-3
                    ${part.isCompleted ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-400'}
                  `}>
                    {index + 1}
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-200">{part.title}</h4>
                      <div className="flex items-center ml-2 text-xs text-gray-500">
                        <span className="mr-1">{getRealmName(part.realm)}</span>
                        {getRealmIcon(part.realm)}
                      </div>
                      {part.isCompleted && (
                        <div className="ml-2 bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded-full">
                          Completed
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{part.description}</p>
                  </div>
                </div>
                
                <div>
                  {part.isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              {part.isExpanded && (
                <div className="p-5 border-t border-gray-800">
                  <h5 className="text-lg font-medium text-gray-300 mb-4">{part.question}</h5>
                  
                  <div className="space-y-3 mb-6">
                    {part.options.map((option) => {
                      let optionClass = '';
                      
                      if (part.selectedOption !== null) {
                        if (option.isCorrect) {
                          optionClass = 'border-green-500 bg-green-900/20';
                        } else if (part.selectedOption === option.id) {
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
                          onClick={() => !part.selectedOption && selectOption(part.id, option.id)}
                        >
                          <div className="flex items-start">
                            <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                              part.selectedOption === option.id
                                ? option.isCorrect
                                  ? 'bg-green-500 text-white'
                                  : 'bg-red-500 text-white'
                                : option.isCorrect && part.selectedOption !== null
                                  ? 'bg-green-500 text-white'
                                  : 'border border-gray-600'
                            }`}>
                              {part.selectedOption !== null && (
                                option.isCorrect
                                  ? <Check className="h-3 w-3" />
                                  : part.selectedOption === option.id
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
                  
                  {part.selectedOption && (
                    <div className={`p-4 rounded-lg mb-4 ${
                      part.options.find(o => o.id === part.selectedOption)?.isCorrect
                        ? 'bg-green-900/20 border border-green-700'
                        : 'bg-red-900/20 border border-red-700'
                    }`}>
                      <p className={`font-medium mb-1 ${
                        part.options.find(o => o.id === part.selectedOption)?.isCorrect
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {part.options.find(o => o.id === part.selectedOption)?.isCorrect
                          ? 'Good choice!'
                          : 'Not the optimal approach.'}
                      </p>
                      <p className="text-sm text-gray-300">
                        {part.options.find(o => o.id === part.selectedOption)?.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Final plan submission */}
        {allPartsCompleted && (
          <div className="mt-8 bg-gray-900/70 border border-gray-800 rounded-lg p-5">
            <h3 className="text-lg font-medium text-purple-400 mb-4">Your Complete Bitcoin Initiative Plan</h3>
            
            <p className="text-gray-300 mb-4">
              Based on your decisions in each area, create a cohesive plan that addresses how your Bitcoin initiative 
              will operate across all aspects: monetary education, privacy protection, security, network infrastructure, 
              scaling, and community adoption.
            </p>
            
            <textarea
              value={finalPlan}
              onChange={handlePlanChange}
              placeholder="Describe your comprehensive approach to Bitcoin adoption in this region..."
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 focus:border-purple-500 focus:outline-none"
              rows={6}
            />
            
            <div className="flex justify-center mt-6">
              <button
                onClick={submitChallenge}
                disabled={finalPlan.trim().length < 50 || isSubmitting}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
                  finalPlan.trim().length < 50 || isSubmitting
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>Complete Final Challenge <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Completion message */}
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-5 text-center">
          <div className="inline-block bg-green-900/30 p-3 rounded-full mb-4">
            <Trophy className="h-8 w-8 text-green-400" />
          </div>
          
          <h3 className="text-xl font-medium text-green-400 mb-2">Final Challenge Complete!</h3>
          
          <p className="text-gray-300 mb-4">
            Congratulations! You've successfully completed the final comprehensive challenge,
            demonstrating your ability to apply Bitcoin knowledge from all realms - from the
            Realm of Origins to The Ubuntu Village - to complex real-world problems.
          </p>
          
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 mb-6 inline-block">
            <div className="text-2xl font-bold text-purple-400">{getCorrectCount()}/{challengeParts.length}</div>
            <div className="text-sm text-gray-400">Optimal decisions selected</div>
          </div>
          
          <p className="text-gray-300">
            You're now ready to receive your Bitcoin journey certification!
          </p>
        </div>
      )}
    </div>
  );
}