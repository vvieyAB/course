import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check, X, BookOpen, Coins, Shield, Key, Cpu, Users, Globe, RefreshCw, ArrowRight, Map } from 'lucide-react';
import { getRealmName } from '@/lib/realm-utils';

interface ComprehensiveReviewProps {
  onComplete: () => void;
}

interface RealmQuestion {
  id: string;
  text: string;
  realm: number;
  topic: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  selectedOption: string | null;
  isCorrect: boolean | null;
}

export default function ComprehensiveReview({ onComplete }: ComprehensiveReviewProps) {
  // Questions covering all 6 previous realms
  const [questions, setQuestions] = useState<RealmQuestion[]>([
    // Realm of Origins - Origins of Money
    {
      id: 'r1q1',
      text: "Which property of money addresses the issue of 'coincidence of wants' in a barter system?",
      realm: 1,
      topic: "Money Properties",
      options: [
        {
          id: 'r1q1a',
          text: "Medium of exchange",
          isCorrect: true
        },
        {
          id: 'r1q1b',
          text: "Store of value",
          isCorrect: false
        },
        {
          id: 'r1q1c',
          text: "Unit of account",
          isCorrect: false
        },
        {
          id: 'r1q1d',
          text: "Divisibility",
          isCorrect: false
        }
      ],
      explanation: "The 'medium of exchange' property allows people to trade indirectly using money instead of requiring a direct coincidence of wants between two parties as in barter systems. This was a key concept explored in Realm 1 on the origins of money.",
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'r1q2',
      text: "What historical element does Bitcoin incorporate that echoes shell money or Rai stones?",
      realm: 1,
      topic: "Historical Money",
      options: [
        {
          id: 'r1q2a',
          text: "Public ledger of ownership",
          isCorrect: true
        },
        {
          id: 'r1q2b',
          text: "Physical coins",
          isCorrect: false
        },
        {
          id: 'r1q2c',
          text: "Government backing",
          isCorrect: false
        },
        {
          id: 'r1q2d',
          text: "Valuable gemstones",
          isCorrect: false
        }
      ],
      explanation: `Like large Rai stones that couldn't be physically moved but whose ownership was publicly tracked, Bitcoin uses a public ledger (the blockchain) to track ownership without requiring physical movement of assets. This parallel to historical monetary systems was discussed in ${getRealmName(1)}.`,
      selectedOption: null,
      isCorrect: null
    },
    
    // The Central Citadel - Surveillance and Privacy
    {
      id: 'r2q1',
      text: "What technology is used in Realm 2's Surveillance City to monitor financial transactions?",
      realm: 2,
      topic: "Financial Surveillance",
      options: [
        {
          id: 'r2q1a',
          text: "Centralized digital payment systems with complete transaction history",
          isCorrect: true
        },
        {
          id: 'r2q1b',
          text: "Physical cash with serial number tracking",
          isCorrect: false
        },
        {
          id: 'r2q1c',
          text: "Anonymous cryptocurrency tokens",
          isCorrect: false
        },
        {
          id: 'r2q1d',
          text: "Gold-backed digital certificates",
          isCorrect: false
        }
      ],
      explanation: `In ${getRealmName(2)}, we explored how centralized digital payment systems create comprehensive data profiles on users by tracking, storing, and analyzing every transaction, allowing for unprecedented levels of financial surveillance.`,
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'r2q2',
      text: "Which Bitcoin privacy practice helps break the link between your identity and transactions?",
      realm: 2,
      topic: "Bitcoin Privacy",
      options: [
        {
          id: 'r2q2a',
          text: "Using a new address for each transaction",
          isCorrect: true
        },
        {
          id: 'r2q2b',
          text: "Always using the same address",
          isCorrect: false
        },
        {
          id: 'r2q2c',
          text: "Publishing your transaction history",
          isCorrect: false
        },
        {
          id: 'r2q2d',
          text: "Using your real name in transactions",
          isCorrect: false
        }
      ],
      explanation: `Using a new address for each transaction is a key privacy practice in Bitcoin that makes it harder to link your identity to your full transaction history. This technique, called address rotation, was a privacy strategy covered in ${getRealmName(2)}.`,
      selectedOption: null,
      isCorrect: null
    },
    
    // The Forest of Sparks - Cryptography
    {
      id: 'r3q1',
      text: "In the context of Bitcoin, what does a hash function do?",
      realm: 3,
      topic: "Cryptographic Primitives",
      options: [
        {
          id: 'r3q1a',
          text: "Converts data of any size into a fixed-length output that can't be reversed",
          isCorrect: true
        },
        {
          id: 'r3q1b',
          text: "Encrypts messages so only authorized parties can read them",
          isCorrect: false
        },
        {
          id: 'r3q1c',
          text: "Stores private keys securely",
          isCorrect: false
        },
        {
          id: 'r3q1d',
          text: "Signs transactions to prove ownership",
          isCorrect: false
        }
      ],
      explanation: `Hash functions in Bitcoin transform any input data into a fixed-length output (hash) in a way that can't be reversed. This property is fundamental to Bitcoin's proof-of-work system, transaction IDs, and block linking, as we explored in ${getRealmName(3)}.`,
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'r3q2',
      text: "Which cryptographic technology allows you to prove you have a private key without revealing it?",
      realm: 3,
      topic: "Digital Signatures",
      options: [
        {
          id: 'r3q2a',
          text: "Digital signatures",
          isCorrect: true
        },
        {
          id: 'r3q2b',
          text: "Symmetric encryption",
          isCorrect: false
        },
        {
          id: 'r3q2c',
          text: "Hash functions",
          isCorrect: false
        },
        {
          id: 'r3q2d',
          text: "Random number generation",
          isCorrect: false
        }
      ],
      explanation: `Digital signatures allow you to prove ownership of a private key by creating a signature that can be verified with your public key, without ever revealing the private key itself. This is how Bitcoin transactions prove proper authorization, as covered in ${getRealmName(3)}.`,
      selectedOption: null,
      isCorrect: null
    },
    
    // The Mountain Forge - Mining and Consensus
    {
      id: 'r4q1',
      text: "What is the primary purpose of Bitcoin mining?",
      realm: 4,
      topic: "Mining",
      options: [
        {
          id: 'r4q1a',
          text: "To secure the network and process transactions in a decentralized way",
          isCorrect: true
        },
        {
          id: 'r4q1b',
          text: "To create new bitcoins as quickly as possible",
          isCorrect: false
        },
        {
          id: 'r4q1c',
          text: "To maximize profits for mining companies",
          isCorrect: false
        },
        {
          id: 'r4q1d',
          text: "To collect transaction fees from users",
          isCorrect: false
        }
      ],
      explanation: `While mining does create new bitcoins and miners do earn fees, its primary purpose is to secure the Bitcoin network through decentralized consensus and transaction processing, preventing double-spending and ensuring the integrity of the blockchain, as we learned in ${getRealmName(4)}.`,
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'r4q2',
      text: "What happens during a Bitcoin 'halving' event?",
      realm: 4,
      topic: "Bitcoin Economics",
      options: [
        {
          id: 'r4q2a',
          text: "The block reward for miners is cut in half",
          isCorrect: true
        },
        {
          id: 'r4q2b',
          text: "The total supply of Bitcoin is cut in half",
          isCorrect: false
        },
        {
          id: 'r4q2c',
          text: "The transaction fees are cut in half",
          isCorrect: false
        },
        {
          id: 'r4q2d',
          text: "The block size is cut in half",
          isCorrect: false
        }
      ],
      explanation: `Approximately every four years, the reward miners receive for finding a block is cut in half. This 'halving' mechanism gradually reduces the rate of new bitcoin creation, creating Bitcoin's disinflationary supply schedule with a hard cap of 21 million coins, as explored in ${getRealmName(4)}.`,
      selectedOption: null,
      isCorrect: null
    },
    
    // The Council of Forks - Governance
    {
      id: 'r5q1',
      text: "Which method is used to implement major changes to the Bitcoin protocol?",
      realm: 5,
      topic: "Protocol Governance",
      options: [
        {
          id: 'r5q1a',
          text: "Bitcoin Improvement Proposals (BIPs) with community consensus",
          isCorrect: true
        },
        {
          id: 'r5q1b',
          text: "Majority vote by the largest mining companies",
          isCorrect: false
        },
        {
          id: 'r5q1c',
          text: "Executive decisions by the Bitcoin Foundation",
          isCorrect: false
        },
        {
          id: 'r5q1d',
          text: "Automated protocol updates every six months",
          isCorrect: false
        }
      ],
      explanation: `Changes to Bitcoin are proposed through Bitcoin Improvement Proposals (BIPs), which are technical documents that anyone can submit. These proposals require broad community consensus to be implemented, reflecting Bitcoin's decentralized governance model that we studied in ${getRealmName(5)}.`,
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'r5q2',
      text: "What occurred during the 'Block Size War' discussed in Realm 5?",
      realm: 5,
      topic: "Bitcoin History",
      options: [
        {
          id: 'r5q2a',
          text: "A contentious disagreement about scaling Bitcoin that led to a community split",
          isCorrect: true
        },
        {
          id: 'r5q2b',
          text: "A coordinated attack on the Bitcoin network",
          isCorrect: false
        },
        {
          id: 'r5q2c',
          text: "A battle between mining pools for market dominance",
          isCorrect: false
        },
        {
          id: 'r5q2d',
          text: "A software bug that caused inconsistent block sizes",
          isCorrect: false
        }
      ],
      explanation: `The Block Size War was a pivotal governance conflict in Bitcoin's history where different visions for scaling the network led to a contentious split in the community. This example of Bitcoin's governance challenges and resolution mechanisms was a key case study in ${getRealmName(5)}.`,
      selectedOption: null,
      isCorrect: null
    },
    
    // The Ubuntu Village - Applications
    {
      id: 'r6q1',
      text: "What makes the Lightning Network important for Bitcoin users in Africa?",
      realm: 6,
      topic: "Lightning Network",
      options: [
        {
          id: 'r6q1a',
          text: "It enables instant, low-fee micropayments suitable for everyday transactions and remittances",
          isCorrect: true
        },
        {
          id: 'r6q1b',
          text: "It provides better mining opportunities for African miners",
          isCorrect: false
        },
        {
          id: 'r6q1c',
          text: "It allows for easier exchange of Bitcoin for local currencies",
          isCorrect: false
        },
        {
          id: 'r6q1d',
          text: "It provides stronger privacy than regular Bitcoin transactions",
          isCorrect: false
        }
      ],
      explanation: `The Lightning Network enables instant, low-fee micropayments, making Bitcoin practical for everyday use and remittances in African countries where traditional financial infrastructure may be limited and transaction costs matter greatly. This was a key application we explored in ${getRealmName(6)}.`,
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'r6q2',
      text: "What innovative technology does Machankura use to make Bitcoin accessible in regions with limited technology?",
      realm: 6,
      topic: "Financial Inclusion",
      options: [
        {
          id: 'r6q2a',
          text: "USSD codes that allow Bitcoin transactions on basic feature phones without internet",
          isCorrect: true
        },
        {
          id: 'r6q2b',
          text: "Satellite-based Bitcoin nodes for remote areas",
          isCorrect: false
        },
        {
          id: 'r6q2c',
          text: "Physical Bitcoin tokens exchangeable for digital Bitcoin",
          isCorrect: false
        },
        {
          id: 'r6q2d',
          text: "Solar-powered Bitcoin ATMs in rural villages",
          isCorrect: false
        }
      ],
      explanation: `Machankura uses USSD codes to enable Bitcoin transactions on basic feature phones without requiring internet access or smartphones. This innovation makes Bitcoin accessible to millions in Africa who lack internet access or smartphones, as we discovered in ${getRealmName(6)}.`,
      selectedOption: null,
      isCorrect: null
    }
  ]);
  
  // Component state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentRealmFilter, setCurrentRealmFilter] = useState<number | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [showingSummary, setShowingSummary] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Apply realm filter when it changes
  useEffect(() => {
    if (currentRealmFilter === null) {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(questions.filter(q => q.realm === currentRealmFilter));
    }
    setCurrentQuestionIndex(0);
  }, [currentRealmFilter, questions]);
  
  // Get current question
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  // Handle selecting an answer
  const selectAnswer = (questionId: string, optionId: string) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        const selectedOption = q.options.find(o => o.id === optionId);
        return {
          ...q,
          selectedOption: optionId,
          isCorrect: selectedOption ? selectedOption.isCorrect : false
        };
      }
      return q;
    });
    
    setQuestions(updatedQuestions);
    
    // Update filtered questions too
    if (currentRealmFilter === null) {
      setFilteredQuestions(updatedQuestions);
    } else {
      setFilteredQuestions(updatedQuestions.filter(q => q.realm === currentRealmFilter));
    }
  };
  
  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowingSummary(true);
    }
  };
  
  // Calculate stats for summary
  const calculateStats = () => {
    const totalAnswered = questions.filter(q => q.selectedOption !== null).length;
    const totalCorrect = questions.filter(q => q.isCorrect === true).length;
    const percentCorrect = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    
    const realmStats = [1, 2, 3, 4, 5, 6].map(realm => {
      const realmQuestions = questions.filter(q => q.realm === realm);
      const realmAnswered = realmQuestions.filter(q => q.selectedOption !== null).length;
      const realmCorrect = realmQuestions.filter(q => q.isCorrect === true).length;
      const realmPercent = realmAnswered > 0 ? Math.round((realmCorrect / realmAnswered) * 100) : 0;
      
      return {
        realm,
        total: realmQuestions.length,
        answered: realmAnswered,
        correct: realmCorrect,
        percent: realmPercent
      };
    });
    
    return {
      total: questions.length,
      answered: totalAnswered,
      correct: totalCorrect,
      percent: percentCorrect,
      realmStats
    };
  };
  
  // Get realm icon
  const getRealmIcon = (realm: number) => {
    switch (realm) {
      case 1: // Realm of Origins
        return <Coins className="h-5 w-5" />;
      case 2: // The Central Citadel
        return <Shield className="h-5 w-5" />;
      case 3: // The Forest of Sparks
        return <Key className="h-5 w-5" />;
      case 4: // The Mountain Forge
        return <Cpu className="h-5 w-5" />;
      case 5: // The Council of Forks
        return <Users className="h-5 w-5" />;
      case 6: // The Ubuntu Village
        return <Globe className="h-5 w-5" />;
      default: // The Summit of Knowledge
        return <BookOpen className="h-5 w-5" />;
    }
  };
  
  // Using getRealmName from imported utility
  
  // Complete the review
  const completeReview = () => {
    setCompleted(true);
    setTimeout(onComplete, 2000);
  };
  
  // Reset the review
  const resetReview = () => {
    setQuestions(questions.map(q => ({
      ...q,
      selectedOption: null,
      isCorrect: null
    })));
    setCurrentQuestionIndex(0);
    setShowingSummary(false);
  };
  
  return (
    <div className="space-y-6">
      {/* Realm selector */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-800 pb-4">
        <button
          onClick={() => setCurrentRealmFilter(null)}
          className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors ${
            currentRealmFilter === null
              ? 'bg-purple-900/30 text-purple-400 border border-purple-800'
              : 'bg-gray-800/50 text-gray-400 border border-gray-800 hover:bg-gray-800'
          }`}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          All Realms
        </button>
        
        {[1, 2, 3, 4, 5, 6].map(realm => (
          <button
            key={realm}
            onClick={() => setCurrentRealmFilter(realm)}
            className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors ${
              currentRealmFilter === realm
                ? 'bg-purple-900/30 text-purple-400 border border-purple-800'
                : 'bg-gray-800/50 text-gray-400 border border-gray-800 hover:bg-gray-800'
            }`}
          >
            {getRealmIcon(realm)}
            <span className="ml-2">{getRealmName(realm)}</span>
          </button>
        ))}
      </div>
      
      {/* Progress bar */}
      {!showingSummary && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Question {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
            <span>{Math.round(((currentQuestionIndex) / filteredQuestions.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${(currentQuestionIndex / filteredQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Question card */}
      {!showingSummary && currentQuestion && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-800 bg-gray-900/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`
                  p-2 rounded-lg mr-3
                  ${currentQuestion.realm === 1 ? 'bg-yellow-900/30 text-yellow-400' : ''}
                  ${currentQuestion.realm === 2 ? 'bg-blue-900/30 text-blue-400' : ''}
                  ${currentQuestion.realm === 3 ? 'bg-green-900/30 text-green-400' : ''}
                  ${currentQuestion.realm === 4 ? 'bg-red-900/30 text-red-400' : ''}
                  ${currentQuestion.realm === 5 ? 'bg-cyan-900/30 text-cyan-400' : ''}
                  ${currentQuestion.realm === 6 ? 'bg-rose-900/30 text-rose-400' : ''}
                `}>
                  {getRealmIcon(currentQuestion.realm)}
                </div>
                <div>
                  <div className="text-sm text-gray-400">{getRealmName(currentQuestion.realm)}</div>
                  <div className="text-sm font-medium text-gray-300">{currentQuestion.topic}</div>
                </div>
              </div>
              
              <div className="flex">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`p-1 rounded ${
                    currentQuestionIndex === 0
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === filteredQuestions.length - 1 && !currentQuestion.selectedOption}
                  className={`p-1 rounded ${
                    currentQuestionIndex === filteredQuestions.length - 1 && !currentQuestion.selectedOption
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-200 mb-6">
              {currentQuestion.text}
            </h3>
            
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option) => {
                let optionClass = '';
                
                if (currentQuestion.selectedOption !== null) {
                  if (option.isCorrect) {
                    optionClass = 'border-green-500 bg-green-900/20';
                  } else if (currentQuestion.selectedOption === option.id) {
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
                    onClick={() => !currentQuestion.selectedOption && selectAnswer(currentQuestion.id, option.id)}
                  >
                    <div className="flex items-start">
                      <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                        currentQuestion.selectedOption === option.id
                          ? option.isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : option.isCorrect && currentQuestion.selectedOption !== null
                            ? 'bg-green-500 text-white'
                            : 'border border-gray-600'
                      }`}>
                        {currentQuestion.selectedOption !== null && (
                          option.isCorrect
                            ? <Check className="h-3 w-3" />
                            : currentQuestion.selectedOption === option.id
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
            
            {currentQuestion.selectedOption !== null && (
              <div className={`p-4 rounded-lg mb-6 ${
                currentQuestion.isCorrect
                  ? 'bg-green-900/20 border border-green-700'
                  : 'bg-red-900/20 border border-red-700'
              }`}>
                <p className={`font-medium mb-1 ${
                  currentQuestion.isCorrect ? 'text-green-400' : 'text-red-400'
                }`}>
                  {currentQuestion.isCorrect ? 'Correct!' : 'Not quite right.'}
                </p>
                <p className="text-sm text-gray-300">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <ChevronLeft className="h-5 w-5 inline mr-1" />
                Previous
              </button>
              
              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === filteredQuestions.length - 1 && !currentQuestion.selectedOption}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentQuestion.selectedOption
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentQuestionIndex < filteredQuestions.length - 1 ? 'Next' : 'View Summary'}
                <ChevronRight className="h-5 w-5 inline ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Summary view */}
      {showingSummary && (
        <div className="space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
            <h3 className="text-xl font-medium text-purple-400 mb-4">Your Comprehensive Review</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-300 mb-3">Overall Performance</h4>
                
                <div className="text-center py-4">
                  <div className="text-5xl font-bold mb-2" style={{ 
                    color: calculateStats().percent >= 80 
                      ? '#10b981' 
                      : calculateStats().percent >= 60 
                        ? '#f59e0b' 
                        : '#ef4444' 
                  }}>
                    {calculateStats().percent}%
                  </div>
                  <div className="text-sm text-gray-400">
                    {calculateStats().correct} correct out of {calculateStats().answered} answered
                  </div>
                </div>
                
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${calculateStats().percent}%`,
                      backgroundColor: calculateStats().percent >= 80 
                        ? '#10b981' 
                        : calculateStats().percent >= 60 
                          ? '#f59e0b' 
                          : '#ef4444'
                    }}
                  ></div>
                </div>
                
                <div className="text-center">
                  {calculateStats().percent >= 80 ? (
                    <p className="text-green-400">Excellent! You have a strong grasp of Bitcoin concepts.</p>
                  ) : calculateStats().percent >= 60 ? (
                    <p className="text-yellow-400">Good work! You have a solid understanding with some areas to review.</p>
                  ) : (
                    <p className="text-red-400">You might benefit from reviewing some key concepts again.</p>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-300 mb-3">Performance by Realm</h4>
                
                <div className="space-y-3">
                  {calculateStats().realmStats.map((stat) => (
                    <div key={stat.realm} className="flex items-center">
                      <div className={`
                        p-1.5 rounded mr-3
                        ${stat.realm === 1 ? 'bg-yellow-900/30 text-yellow-400' : ''}
                        ${stat.realm === 2 ? 'bg-blue-900/30 text-blue-400' : ''}
                        ${stat.realm === 3 ? 'bg-green-900/30 text-green-400' : ''}
                        ${stat.realm === 4 ? 'bg-red-900/30 text-red-400' : ''}
                        ${stat.realm === 5 ? 'bg-cyan-900/30 text-cyan-400' : ''}
                        ${stat.realm === 6 ? 'bg-rose-900/30 text-rose-400' : ''}
                      `}>
                        {getRealmIcon(stat.realm)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-300">{getRealmName(stat.realm)}</span>
                          <span className="text-sm text-gray-400">
                            {stat.correct}/{stat.answered} ({stat.answered > 0 ? stat.percent : 0}%)
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all duration-300"
                            style={{ 
                              width: `${stat.answered > 0 ? stat.percent : 0}%`,
                              backgroundColor: stat.percent >= 80 
                                ? '#10b981' 
                                : stat.percent >= 60 
                                  ? '#f59e0b' 
                                  : '#ef4444'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentRealmFilter(
                    calculateStats().realmStats.sort((a, b) => a.percent - b.percent)[0].realm
                  )}
                  className="mt-4 w-full px-3 py-2 text-sm bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                >
                  Focus on Your Weakest Realm
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-300">Your Bitcoin Journey</h4>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                <p className="text-gray-300 mb-4">
                  You've reviewed key concepts from all six realms of your Bitcoin journey - from the Realm of Origins through The Ubuntu Village. Your knowledge spans from the foundations of money to real-world applications of Bitcoin technology.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="px-2 py-1 bg-yellow-900/20 text-yellow-400 text-xs rounded-full">Money History</div>
                  <div className="px-2 py-1 bg-blue-900/20 text-blue-400 text-xs rounded-full">Privacy</div>
                  <div className="px-2 py-1 bg-green-900/20 text-green-400 text-xs rounded-full">Cryptography</div>
                  <div className="px-2 py-1 bg-red-900/20 text-red-400 text-xs rounded-full">Mining</div>
                  <div className="px-2 py-1 bg-cyan-900/20 text-cyan-400 text-xs rounded-full">Governance</div>
                  <div className="px-2 py-1 bg-rose-900/20 text-rose-400 text-xs rounded-full">Applications</div>
                </div>
                
                <p className="text-gray-400 text-sm">
                  This comprehensive review has prepared you for the more advanced challenges that lie ahead in this final realm.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={resetReview}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Restart Review
              </button>
              
              <button
                onClick={completeReview}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                Continue Journey
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Completion message */}
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Review Complete!</h3>
          <p className="text-gray-300">
            You've successfully reviewed the key concepts from all previous realms, from
            the Realm of Origins to The Ubuntu Village. This foundation will help you
            tackle the challenges ahead in The Summit of Knowledge!
          </p>
        </div>
      )}
    </div>
  );
}