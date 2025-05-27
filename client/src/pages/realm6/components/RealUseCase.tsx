import { useState } from 'react';
import { Globe, ArrowRight, Check, X, Wallet, School, Home, ShoppingCart, Users } from 'lucide-react';

interface RealUseCaseProps {
  onComplete: () => void;
}

interface UseCase {
  id: string;
  country: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  challenge: {
    scenario: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  };
}

export default function RealUseCase({ onComplete }: RealUseCaseProps) {
  // Define the use cases
  const useCases: UseCase[] = [
    {
      id: 'remittances',
      country: 'Nigeria',
      title: 'Remittances Without Borders',
      description: 'In Nigeria, families are using Bitcoin to send money home quickly and cheaply, avoiding the high fees and delays of traditional remittance services. This is particularly important in a country where remittances make up a significant portion of GDP and where many families rely on money sent from relatives working abroad.',
      icon: <Wallet className="h-6 w-6" />,
      challenge: {
        scenario: 'Adebayo lives in Nigeria but his sister Folake works in the United States. She needs to send $200 USD to help with their mother\'s medical bills. Traditional remittance services charge 7-10% and take 3-5 days. What Bitcoin solution would be most appropriate?',
        options: [
          {
            id: 'lightning',
            text: 'Use Lightning Network for an instant, low-fee transfer',
            isCorrect: true,
            feedback: 'Great choice! The Lightning Network allows for near-instant transfers with fees of just a few cents, regardless of the amount being sent. This would allow Folake to send the money immediately, ensuring it arrives when needed for medical care.'
          },
          {
            id: 'exchange',
            text: 'Transfer through a centralized exchange',
            isCorrect: false,
            feedback: 'While using a centralized exchange can work, it often requires both parties to have accounts, complete KYC processes, and may involve withdrawal fees. The Lightning Network provides a more direct and often faster solution for this use case.'
          },
          {
            id: 'wait',
            text: 'Use on-chain Bitcoin transaction and wait for confirmations',
            isCorrect: false,
            feedback: 'On-chain Bitcoin transactions can take 10-60 minutes to confirm and currently have higher fees than Lightning. For a time-sensitive medical situation, the Lightning Network would be more appropriate.'
          }
        ]
      }
    },
    {
      id: 'education',
      country: 'South Africa',
      title: 'Education Fund Pool',
      description: 'In South Africa, community members are pooling Bitcoin to finance education for local youth. These community funds operate with minimal overhead costs compared to traditional organizations, ensuring more resources go directly to students. Bitcoin\'s transparency also allows donors to track how funds are being used.',
      icon: <School className="h-6 w-6" />,
      challenge: {
        scenario: 'A township outside Cape Town wants to create a Bitcoin-based education fund where community members can contribute to scholarships. They need a solution that maximizes transparency and minimizes administrative costs. What approach would you recommend?',
        options: [
          {
            id: 'multisig',
            text: 'Create a multisignature wallet requiring approval from multiple community leaders',
            isCorrect: true,
            feedback: 'Excellent! A multisignature wallet ensures that funds can only be disbursed when multiple designated community leaders approve the transaction. This creates accountability and prevents any single person from controlling the funds, while the public nature of the blockchain allows for transparency in how funds are spent.'
          },
          {
            id: 'individual',
            text: 'Have one respected community leader manage the funds from their personal wallet',
            isCorrect: false,
            feedback: 'This approach lacks the necessary checks and balances for a community fund. If the community leader becomes unavailable or is compromised, the entire fund could be at risk. A multisignature solution provides better security and governance.'
          },
          {
            id: 'bank',
            text: 'Convert Bitcoin to local currency and store in a traditional bank account',
            isCorrect: false,
            feedback: 'Converting to local currency would incur unnecessary exchange fees and lose the benefits of Bitcoin\'s borderless nature. It would also add banking fees and potentially restrict access to the funds. Keeping the fund in Bitcoin with proper controls maintains its value and accessibility.'
          }
        ]
      }
    },
    {
      id: 'farming',
      country: 'Zimbabwe',
      title: 'Farming Cooperative Resilience',
      description: 'In rural Zimbabwe, farmers are forming cooperatives that use Bitcoin to pool resources, purchase better equipment, and sell directly to buyers without intermediaries. This approach creates a more resilient agricultural economy and protects farmers from the extreme inflation that has affected the Zimbabwean dollar in recent years.',
      icon: <Users className="h-6 w-6" />,
      challenge: {
        scenario: 'A farming cooperative in Zimbabwe wants to purchase shared equipment and sell their produce directly to international buyers. They need a solution that protects them from local currency inflation and doesn\'t require each farmer to have a bank account. How should they proceed?',
        options: [
          {
            id: 'savings',
            text: 'Create a shared Bitcoin savings fund for equipment and accept Bitcoin payments for produce exports',
            isCorrect: true,
            feedback: 'Perfect! By creating a shared Bitcoin fund, the cooperative can preserve value despite local inflation. Accepting Bitcoin for exports allows them to sell directly to international buyers without expensive currency conversion or international wire transfers. This approach empowers even unbanked farmers to participate in the global economy.'
          },
          {
            id: 'usd',
            text: 'Use US dollars for all transactions within the cooperative',
            isCorrect: false,
            feedback: 'While using US dollars would provide some protection against local inflation, it comes with challenges: physical dollars can be stolen, banking regulations might limit access, and international transfers would still be expensive and slow. Bitcoin offers better security, ownership, and ease of international transactions.'
          },
          {
            id: 'mobile',
            text: 'Use local mobile money exclusively for all cooperative activities',
            isCorrect: false,
            feedback: 'Mobile money is convenient locally but doesn\'t solve the inflation problem and doesn\'t easily connect to international markets. It typically has lower transaction limits and still ties the cooperative to the local banking system. Bitcoin provides a more global, inflation-resistant solution.'
          }
        ]
      }
    }
  ];
  
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'info' | 'challenge' | 'feedback'>('info');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // Get current case
  const currentCase = useCases[currentCaseIndex];
  
  // Handle selecting an option
  const handleSelectOption = (optionId: string) => {
    if (viewMode !== 'challenge') return;
    setSelectedOption(optionId);
  };
  
  // Submit answer
  const submitAnswer = () => {
    if (!selectedOption) return;
    
    const option = currentCase.challenge.options.find(opt => opt.id === selectedOption);
    if (option?.isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setViewMode('feedback');
  };
  
  // Go to next case or complete
  const handleNext = () => {
    if (currentCaseIndex < useCases.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
      setViewMode('info');
      setSelectedOption(null);
    } else {
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
  };
  
  // Start challenge
  const startChallenge = () => {
    setViewMode('challenge');
  };
  
  // Theme colors
  const ubuntuTheme = {
    colors: {
      primary: '#e11d48', // rose-600
      secondary: '#fb7185', // rose-400
      background: '#0f172a', // slate-900
      backgroundLight: '#1e293b', // slate-800
      success: '#15803d', // green-700
      textDark: '#881337', // rose-900
      textLight: '#ffe4e6', // rose-50
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Case Study {currentCaseIndex + 1} of {useCases.length}</span>
          <span>{Math.round((currentCaseIndex / useCases.length) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-rose-600 transition-all duration-300"
            style={{ width: `${(currentCaseIndex / useCases.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Case study content */}
      <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 bg-gray-900/70">
          <div className="flex items-center">
            <div className="bg-rose-900/30 p-2 rounded-lg mr-3">
              {currentCase.icon}
            </div>
            <div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-400">{currentCase.country}</span>
              </div>
              <h3 className="text-xl font-semibold text-rose-400">{currentCase.title}</h3>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          {viewMode === 'info' && (
            <>
              <p className="text-gray-300 mb-6">{currentCase.description}</p>
              
              <div className="flex justify-center">
                <button
                  onClick={startChallenge}
                  className="px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center"
                >
                  Explore Challenge <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </>
          )}
          
          {viewMode === 'challenge' && (
            <>
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-rose-400 mb-2">Scenario</h4>
                <p className="text-gray-300 text-sm">{currentCase.challenge.scenario}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {currentCase.challenge.options.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedOption === option.id
                        ? 'border-rose-500 bg-rose-900/20'
                        : 'border-gray-700 bg-black/30 hover:border-gray-600'
                    }`}
                    onClick={() => handleSelectOption(option.id)}
                  >
                    <div className="flex items-start">
                      <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                        selectedOption === option.id
                          ? 'bg-rose-500 text-white'
                          : 'border border-gray-600'
                      }`}>
                        {selectedOption === option.id && <Check className="h-3 w-3" />}
                      </div>
                      
                      <span className="text-gray-300">{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={submitAnswer}
                  disabled={!selectedOption}
                  className={`px-5 py-2 rounded-lg transition-colors ${
                    !selectedOption
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-rose-600 text-white hover:bg-rose-700'
                  }`}
                >
                  Submit Answer
                </button>
              </div>
            </>
          )}
          
          {viewMode === 'feedback' && (
            <>
              <div className="mb-6">
                {currentCase.challenge.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const feedbackColor = isSelected
                    ? option.isCorrect
                      ? 'bg-green-900/20 border-green-700'
                      : 'bg-red-900/20 border-red-700'
                    : option.isCorrect
                      ? 'bg-green-900/10 border-green-800/50'
                      : 'bg-gray-900/50 border-gray-800';
                  
                  return (
                    <div
                      key={option.id}
                      className={`p-4 border rounded-lg mb-3 ${feedbackColor}`}
                    >
                      <div className="flex items-start">
                        <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                          option.isCorrect
                            ? 'bg-green-500 text-white'
                            : isSelected
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-700 text-gray-300'
                        }`}>
                          {option.isCorrect ? (
                            <Check className="h-3 w-3" />
                          ) : isSelected ? (
                            <X className="h-3 w-3" />
                          ) : null}
                        </div>
                        
                        <div>
                          <div className="text-gray-300">{option.text}</div>
                          
                          {isSelected && (
                            <div className="mt-3 text-sm bg-black/30 p-3 rounded-lg">
                              {option.feedback}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center"
                >
                  {currentCaseIndex < useCases.length - 1 ? (
                    <>Next Case Study <ArrowRight className="ml-2 h-4 w-4" /></>
                  ) : (
                    <>Complete Learning</>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Completion message */}
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Learning Complete!</h3>
          <p className="text-gray-300">
            You've learned about real Bitcoin use cases across Africa. You correctly solved {correctAnswers} out of {useCases.length} challenges.
          </p>
        </div>
      )}
    </div>
  );
}