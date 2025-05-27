import { useState } from 'react';
import { Wallet, Smartphone, ArrowRight, Check, X, Shield, ShieldOff, Zap, Smartphone as Phone, MessageSquare } from 'lucide-react';

interface ToolsProps {
  onComplete: () => void;
}

interface WalletInfo {
  id: string;
  name: string;
  description: string;
  type: 'custodial' | 'non-custodial';
  features: string[];
  lightning: boolean;
  offlineSupport: boolean;
  localCurrency: boolean;
  icon: React.ReactNode;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  context: string;
  bestWallet: string;
  options: {
    id: string;
    walletId: string;
    explanation: string;
    isCorrect: boolean;
  }[];
}

export default function Tools({ onComplete }: ToolsProps) {
  // Define the wallet information
  const wallets: WalletInfo[] = [
    {
      id: 'phoenix',
      name: 'Phoenix',
      description: 'A non-custodial Lightning Network wallet designed for simplicity and security. Phoenix automatically manages Lightning channels for users while keeping them in control of their own funds.',
      type: 'non-custodial',
      features: [
        'Automatic channel management',
        'Intuitive user interface',
        'Support for LNURL and Lightning Address',
        'Minimal setup requirements',
        'Low fees for lightning transactions'
      ],
      lightning: true,
      offlineSupport: false,
      localCurrency: false,
      icon: <Zap className="h-6 w-6" />
    },
    {
      id: 'muun',
      name: 'Muun',
      description: 'A self-custodial wallet that combines the security of on-chain Bitcoin with the convenience of Lightning Network. Muun uses a unique security model that eliminates the need for channels while still keeping users in control of their funds.',
      type: 'non-custodial',
      features: [
        'Both on-chain and Lightning support',
        'No channel management required',
        'Multi-signature security',
        'Recovery system without seed phrases',
        'Clean, simple interface'
      ],
      lightning: true,
      offlineSupport: false,
      localCurrency: false,
      icon: <Wallet className="h-6 w-6" />
    },
    {
      id: 'wallet-of-satoshi',
      name: 'Wallet of Satoshi',
      description: 'A custodial Lightning wallet focused on simplicity and ease of use. While the company holds users\' funds, it offers the most straightforward experience for beginners and those wanting quick, simple transactions without technical complexity.',
      type: 'custodial',
      features: [
        'Extremely simple interface',
        'Instant setup with no recovery phrases',
        'No channel management',
        'In-app currency conversion',
        'Support for Lightning Address'
      ],
      lightning: true,
      offlineSupport: false,
      localCurrency: true,
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      id: 'bitnob',
      name: 'Bitnob',
      description: 'A wallet service tailored for African users that offers both Bitcoin saving and spending. Bitnob allows users to hold both Bitcoin and local currencies, with a focus on savings, remittances, and bill payments.',
      type: 'custodial',
      features: [
        'Bitcoin and USD savings accounts',
        'Bill payments in local currencies',
        'Automated saving plans',
        'Cross-border payments',
        'Integration with local payment systems'
      ],
      lightning: true,
      offlineSupport: false,
      localCurrency: true,
      icon: <Wallet className="h-6 w-6" />
    },
    {
      id: 'machankura',
      name: 'Machankura',
      description: 'An innovative service enabling Bitcoin transactions via USSD codes, making Bitcoin accessible to users with basic feature phones and without internet access. Users interact via text menus to send, receive, and check balances.',
      type: 'custodial',
      features: [
        'Works on basic feature phones',
        'No internet connection required',
        'USSD-based interface',
        'Lightning Network support',
        'Works with existing phone numbers'
      ],
      lightning: true,
      offlineSupport: true,
      localCurrency: false,
      icon: <MessageSquare className="h-6 w-6" />
    }
  ];
  
  // Define scenarios for the toolbox challenge
  const scenarios: Scenario[] = [
    {
      id: 'remote',
      title: 'Rural Farmer',
      description: 'Samuel lives in a rural area with limited internet access and uses a basic feature phone. He needs to receive payments for his crops from buyers in the city.',
      context: 'Samuel has no smartphone or regular internet connection, but he wants to use Bitcoin to avoid middlemen taking large percentages of his sales.',
      bestWallet: 'machankura',
      options: [
        {
          id: 'option1',
          walletId: 'phoenix',
          explanation: 'Phoenix requires a smartphone and internet connection, which Samuel doesn\'t have.',
          isCorrect: false
        },
        {
          id: 'option2',
          walletId: 'machankura',
          explanation: 'Machankura is perfect for Samuel as it works on feature phones via USSD codes without requiring internet access. He can receive payments using only his basic phone.',
          isCorrect: true
        },
        {
          id: 'option3',
          walletId: 'wallet-of-satoshi',
          explanation: 'Wallet of Satoshi requires a smartphone and internet connection, which Samuel doesn\'t have.',
          isCorrect: false
        }
      ]
    },
    {
      id: 'security',
      title: 'Tech Professional',
      description: 'Amara is a software developer from Nigeria who values security and self-sovereignty. She wants to use Bitcoin for long-term savings and occasional transactions.',
      context: 'As a tech-savvy user, Amara understands the importance of controlling her own private keys and doesn\'t want to trust third parties with her savings.',
      bestWallet: 'muun',
      options: [
        {
          id: 'option1',
          walletId: 'muun',
          explanation: 'Muun is ideal for Amara because it\'s non-custodial, giving her full control of her funds. It also offers a good balance of security and usability with its unique recovery system and support for both on-chain and Lightning transactions.',
          isCorrect: true
        },
        {
          id: 'option2',
          walletId: 'bitnob',
          explanation: 'While Bitnob offers good features for savings, it\'s custodial, meaning Amara would not have full control of her private keys, which doesn\'t align with her priority for self-sovereignty.',
          isCorrect: false
        },
        {
          id: 'option3',
          walletId: 'wallet-of-satoshi',
          explanation: 'Wallet of Satoshi is custodial, which means Amara would not control her private keys, making it unsuitable for her security requirements.',
          isCorrect: false
        }
      ]
    },
    {
      id: 'remittance',
      title: 'Small Business Owner',
      description: 'David runs a small shop in Kenya and needs to pay suppliers in both local currency and internationally. He wants a solution that integrates well with his existing financial setup.',
      context: 'David needs flexibility to handle both local and international payments, and wants to minimize exchange fees when dealing with multiple currencies.',
      bestWallet: 'bitnob',
      options: [
        {
          id: 'option1',
          walletId: 'bitnob',
          explanation: 'Bitnob is perfect for David as it supports both Bitcoin and local currencies, allowing him to pay local suppliers in local currency and international suppliers in Bitcoin while minimizing exchange fees.',
          isCorrect: true
        },
        {
          id: 'option2',
          walletId: 'phoenix',
          explanation: 'While Phoenix offers good Lightning support, it doesn\'t have the local currency integration that David needs for his business operations.',
          isCorrect: false
        },
        {
          id: 'option3',
          walletId: 'machankura',
          explanation: 'Machankura is designed for basic feature phones and while useful for certain scenarios, it lacks the business features and local currency support that David needs.',
          isCorrect: false
        }
      ]
    }
  ];
  
  // Component state
  const [activeWalletId, setActiveWalletId] = useState<string | null>('phoenix');
  const [viewMode, setViewMode] = useState<'wallets' | 'scenarios'>('wallets');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  // Helper functions
  const getActiveWallet = () => wallets.find(w => w.id === activeWalletId) || wallets[0];
  const getCurrentScenario = () => scenarios[currentScenarioIndex];
  const getWalletById = (id: string) => wallets.find(w => w.id === id);
  
  // Handle selecting a wallet
  const handleSelectWallet = (walletId: string) => {
    setActiveWalletId(walletId);
  };
  
  // Handle starting the scenarios challenge
  const startScenarios = () => {
    setViewMode('scenarios');
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
  };
  
  // Handle selecting a scenario option
  const selectOption = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };
  
  // Handle submitting an answer
  const submitAnswer = () => {
    if (!selectedOption) return;
    
    const scenario = getCurrentScenario();
    const selectedScenarioOption = scenario.options.find(opt => opt.id === selectedOption);
    
    if (selectedScenarioOption?.isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setShowFeedback(true);
  };
  
  // Handle moving to next scenario
  const nextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // All scenarios completed
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
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
      {viewMode === 'wallets' && (
        <>
          {/* Wallet selector */}
          <div className="flex flex-wrap gap-2 pb-3 border-b border-gray-800">
            {wallets.map(wallet => (
              <button
                key={wallet.id}
                onClick={() => handleSelectWallet(wallet.id)}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeWalletId === wallet.id
                    ? 'bg-rose-900/30 text-rose-400 border border-rose-800'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-800 hover:bg-gray-800'
                }`}
              >
                {wallet.icon}
                <span className="ml-2">{wallet.name}</span>
              </button>
            ))}
          </div>
          
          {/* Wallet details */}
          {activeWalletId && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Wallet info */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-5">
                  <div className="flex items-start">
                    <div className="bg-rose-900/30 p-3 rounded-lg mr-4">
                      {getActiveWallet().icon}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-rose-400 mb-1">{getActiveWallet().name}</h3>
                      <div className="flex items-center">
                        {getActiveWallet().type === 'non-custodial' ? (
                          <div className="flex items-center text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full">
                            <Shield className="h-3 w-3 mr-1" />
                            Non-custodial
                          </div>
                        ) : (
                          <div className="flex items-center text-xs bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded-full">
                            <ShieldOff className="h-3 w-3 mr-1" />
                            Custodial
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-gray-300">
                    {getActiveWallet().description}
                  </p>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-5">
                  <h4 className="font-medium text-rose-400 mb-3">Key Features</h4>
                  
                  <ul className="space-y-2">
                    {getActiveWallet().features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Right column - Compatibility */}
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-5">
                  <h4 className="font-medium text-rose-400 mb-3">Compatibility</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Lightning Network</span>
                      {getActiveWallet().lightning ? (
                        <div className="flex items-center text-green-400">
                          <Check className="h-4 w-4 mr-1" />
                          Supported
                        </div>
                      ) : (
                        <div className="flex items-center text-red-400">
                          <X className="h-4 w-4 mr-1" />
                          Not Supported
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Offline Use</span>
                      {getActiveWallet().offlineSupport ? (
                        <div className="flex items-center text-green-400">
                          <Check className="h-4 w-4 mr-1" />
                          Supported
                        </div>
                      ) : (
                        <div className="flex items-center text-red-400">
                          <X className="h-4 w-4 mr-1" />
                          Not Supported
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Local Currency</span>
                      {getActiveWallet().localCurrency ? (
                        <div className="flex items-center text-green-400">
                          <Check className="h-4 w-4 mr-1" />
                          Supported
                        </div>
                      ) : (
                        <div className="flex items-center text-red-400">
                          <X className="h-4 w-4 mr-1" />
                          Not Supported
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-5">
                  <h4 className="font-medium text-rose-400 mb-3">Security</h4>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-300 mb-1">Who Controls Your Keys?</h5>
                    <p className="text-sm text-gray-400">
                      {getActiveWallet().type === 'non-custodial'
                        ? 'You control your private keys, which means you have full ownership of your bitcoin.'
                        : 'The service provider controls your private keys, which means you trust them to secure and manage your bitcoin.'}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-300 mb-1">Best For</h5>
                    <p className="text-sm text-gray-400">
                      {getActiveWallet().type === 'non-custodial'
                        ? 'Users who prioritize security and financial sovereignty.'
                        : 'Users who prioritize convenience and ease of use over absolute control.'}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={startScenarios}
                  className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center"
                >
                  Try Scenarios Challenge <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
      
      {viewMode === 'scenarios' && (
        <>
          {/* Progress indicator */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Scenario {currentScenarioIndex + 1} of {scenarios.length}</span>
              <span>{Math.round((currentScenarioIndex / scenarios.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-600 transition-all duration-300"
                style={{ width: `${(currentScenarioIndex / scenarios.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Scenario card */}
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-800 bg-gray-900/70">
              <h3 className="text-xl font-semibold text-rose-400">{getCurrentScenario().title}</h3>
            </div>
            
            <div className="p-5">
              <p className="text-gray-300 mb-4">{getCurrentScenario().description}</p>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-amber-400 mb-2">Context</h4>
                <p className="text-sm text-gray-300">{getCurrentScenario().context}</p>
              </div>
              
              <h4 className="font-medium text-rose-400 mb-3">Choose the best wallet for this scenario:</h4>
              
              <div className="space-y-4 mb-6">
                {getCurrentScenario().options.map((option) => {
                  const wallet = getWalletById(option.walletId);
                  if (!wallet) return null;
                  
                  let optionClass = '';
                  
                  if (showFeedback) {
                    if (option.isCorrect) {
                      optionClass = 'border-green-500 bg-green-900/20';
                    } else if (selectedOption === option.id) {
                      optionClass = 'border-red-500 bg-red-900/20';
                    } else {
                      optionClass = 'border-gray-700 bg-black/30';
                    }
                  } else {
                    optionClass = selectedOption === option.id
                      ? 'border-rose-500 bg-rose-900/20'
                      : 'border-gray-700 bg-black/30 hover:border-gray-600';
                  }
                  
                  return (
                    <div
                      key={option.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${optionClass}`}
                      onClick={() => selectOption(option.id)}
                    >
                      <div className="flex items-start">
                        <div className="bg-gray-800 p-2 rounded-lg mr-3">
                          {wallet.icon}
                        </div>
                        
                        <div>
                          <div className="font-medium text-gray-300">{wallet.name}</div>
                          <div className="flex items-center mt-1 text-xs">
                            {wallet.type === 'non-custodial' ? (
                              <div className="flex items-center bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full">
                                <Shield className="h-3 w-3 mr-1" />
                                Non-custodial
                              </div>
                            ) : (
                              <div className="flex items-center bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded-full">
                                <ShieldOff className="h-3 w-3 mr-1" />
                                Custodial
                              </div>
                            )}
                          </div>
                          
                          {showFeedback && (selectedOption === option.id || option.isCorrect) && (
                            <div className="mt-3 text-sm bg-black/30 p-3 rounded-lg">
                              {option.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {!showFeedback ? (
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
              ) : (
                <div className="flex justify-center">
                  <button
                    onClick={nextScenario}
                    className="px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center"
                  >
                    {currentScenarioIndex < scenarios.length - 1 ? (
                      <>Next Scenario <ArrowRight className="ml-2 h-4 w-4" /></>
                    ) : (
                      <>Complete Challenge</>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={() => setViewMode('wallets')}
              className="text-gray-400 hover:text-gray-300"
            >
              Return to Wallet Explorer
            </button>
          </div>
        </>
      )}
      
      {/* Completion message */}
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            You've learned about Bitcoin wallet options for African users and matched them to real-world scenarios.
            You correctly solved {correctAnswers} out of {scenarios.length} scenarios.
          </p>
        </div>
      )}
    </div>
  );
}