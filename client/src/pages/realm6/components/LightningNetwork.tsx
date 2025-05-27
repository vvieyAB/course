import { useState, useEffect } from 'react';
import { Zap, ArrowRight, Clock, DollarSign, Router, ShieldCheck, AlertTriangle, Check } from 'lucide-react';

interface LightningNetworkProps {
  onComplete: () => void;
}

interface PaymentStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  complete: boolean;
}

interface PaymentComparison {
  method: string;
  speed: string;
  cost: string;
  privacy: number; // 1-5
  security: number; // 1-5
  borderless: number; // 1-5
}

interface Quiz {
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  selectedOption: string | null;
  isCorrect: boolean | null;
}

export default function LightningNetwork({ onComplete }: LightningNetworkProps) {
  // Lightning Network step-by-step demonstration
  const [paymentSteps, setPaymentSteps] = useState<PaymentStep[]>([
    {
      id: 'channel',
      title: 'Payment Channel Creation',
      description: 'Alice and Bob open a Lightning channel by committing funds to a special Bitcoin transaction. This creates a secure payment corridor between them.',
      icon: <ShieldCheck className="h-6 w-6" />,
      complete: false
    },
    {
      id: 'routing',
      title: 'Finding a Route',
      description: 'To pay someone they\'re not directly connected to, Lightning finds a path across multiple channels. For example, Alice → Bob → Charlie → David.',
      icon: <Router className="h-6 w-6" />,
      complete: false
    },
    {
      id: 'invoice',
      title: 'Invoice Creation',
      description: 'The recipient creates an invoice with a payment hash, amount, and expiry time. This ensures they\'ll receive exactly what was requested.',
      icon: <DollarSign className="h-6 w-6" />,
      complete: false
    },
    {
      id: 'transfer',
      title: 'Instant Transfer',
      description: 'The payment moves through the network in milliseconds, with each node forwarding it to the next. No mining or block confirmations are needed.',
      icon: <Zap className="h-6 w-6" />,
      complete: false
    },
    {
      id: 'settlement',
      title: 'Secure Settlement',
      description: 'The payment is settled instantly using cryptographic proofs, ensuring funds can only be claimed by the intended recipient.',
      icon: <Clock className="h-6 w-6" />,
      complete: false
    }
  ]);
  
  // Comparison between Lightning and other payment methods
  const comparisons: PaymentComparison[] = [
    {
      method: 'Lightning Network',
      speed: 'Instant (milliseconds)',
      cost: 'Near zero (<1¢)',
      privacy: 5,
      security: 5,
      borderless: 5
    },
    {
      method: 'On-chain Bitcoin',
      speed: '10-60 minutes',
      cost: '$1-10 (variable)',
      privacy: 3,
      security: 5,
      borderless: 5
    },
    {
      method: 'Mobile Money',
      speed: 'Minutes',
      cost: '1-5% of amount',
      privacy: 2,
      security: 3,
      borderless: 1
    },
    {
      method: 'Bank Transfer',
      speed: '1-5 days (international)',
      cost: '3-7% of amount',
      privacy: 1,
      security: 4,
      borderless: 2
    },
    {
      method: 'Western Union',
      speed: 'Hours to days',
      cost: '5-10% of amount',
      privacy: 2,
      security: 3,
      borderless: 4
    }
  ];
  
  // Quiz questions
  const [quizQuestions, setQuizQuestions] = useState<Quiz[]>([
    {
      question: "What is the Lightning Network?",
      options: [
        {
          id: 'layer2',
          text: "A layer-2 protocol built on top of Bitcoin for fast, low-cost payments",
          isCorrect: true
        },
        {
          id: 'sidechain',
          text: "A completely separate blockchain from Bitcoin",
          isCorrect: false
        },
        {
          id: 'exchange',
          text: "A centralized exchange for trading Bitcoin",
          isCorrect: false
        },
        {
          id: 'app',
          text: "A mobile app for buying Bitcoin",
          isCorrect: false
        }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      question: "Why is the Lightning Network particularly useful in Africa?",
      options: [
        {
          id: 'fees',
          text: "It enables micropayments with minimal fees, making small transactions economical",
          isCorrect: true
        },
        {
          id: 'mining',
          text: "It allows Africans to mine Bitcoin more efficiently",
          isCorrect: false
        },
        {
          id: 'internet',
          text: "It works without an internet connection",
          isCorrect: false
        },
        {
          id: 'government',
          text: "It's approved by all African governments",
          isCorrect: false
        }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      question: "How does the Lightning Network enable fast Bitcoin transactions?",
      options: [
        {
          id: 'channels',
          text: "By creating payment channels where transactions happen off-chain, only settling to the Bitcoin blockchain when channels are closed",
          isCorrect: true
        },
        {
          id: 'miners',
          text: "By paying miners for faster confirmations",
          isCorrect: false
        },
        {
          id: 'blockchain',
          text: "By creating a faster blockchain than Bitcoin",
          isCorrect: false
        },
        {
          id: 'centralized',
          text: "By using a centralized ledger for all transactions",
          isCorrect: false
        }
      ],
      selectedOption: null,
      isCorrect: null
    }
  ]);
  
  // Component state
  const [currentStep, setCurrentStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [viewMode, setViewMode] = useState<'demo' | 'compare' | 'quiz'>('demo');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  // Demo animation
  useEffect(() => {
    if (viewMode !== 'demo' || currentStep >= paymentSteps.length) return;
    
    const timer = setTimeout(() => {
      setAnimating(true);
      
      setTimeout(() => {
        setPaymentSteps(prev => 
          prev.map((step, idx) => 
            idx === currentStep ? { ...step, complete: true } : step
          )
        );
        
        setAnimating(false);
        
        setTimeout(() => {
          if (currentStep < paymentSteps.length - 1) {
            setCurrentStep(currentStep + 1);
          }
        }, 500);
      }, 1000);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentStep, paymentSteps.length, viewMode]);
  
  // Handle quiz answer selection
  const selectAnswer = (questionIndex: number, optionId: string) => {
    if (quizCompleted) return;
    
    const question = quizQuestions[questionIndex];
    const option = question.options.find(opt => opt.id === optionId);
    
    if (!option) return;
    
    setQuizQuestions(prev => 
      prev.map((q, idx) => 
        idx === questionIndex 
          ? { 
              ...q, 
              selectedOption: optionId, 
              isCorrect: option.isCorrect 
            } 
          : q
      )
    );
  };
  
  // Handle next question
  const nextQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      // Quiz completed
      const correctAnswers = quizQuestions.filter(q => q.isCorrect).length;
      setScore(correctAnswers);
      setQuizCompleted(true);
    }
  };
  
  // Complete the lesson
  const completeLesson = () => {
    setCompleted(true);
    setTimeout(onComplete, 2000);
  };
  
  // Get rating stars
  const getRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, idx) => (
      <span 
        key={idx} 
        className={`${idx < rating ? 'text-rose-400' : 'text-gray-600'}`}
      >
        ★
      </span>
    ));
  };
  
  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            viewMode === 'demo'
              ? 'text-rose-400 border-b-2 border-rose-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setViewMode('demo')}
        >
          How It Works
        </button>
        
        <button
          className={`px-4 py-2 font-medium text-sm ${
            viewMode === 'compare'
              ? 'text-rose-400 border-b-2 border-rose-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setViewMode('compare')}
        >
          Comparison
        </button>
        
        <button
          className={`px-4 py-2 font-medium text-sm ${
            viewMode === 'quiz'
              ? 'text-rose-400 border-b-2 border-rose-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setViewMode('quiz')}
        >
          Knowledge Check
        </button>
      </div>
      
      {/* Demo View */}
      {viewMode === 'demo' && (
        <div className="space-y-6">
          <p className="text-gray-300">
            The Lightning Network makes Bitcoin transactions nearly instant and almost free. 
            See how it works step by step:
          </p>
          
          <div className="space-y-4">
            {paymentSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`p-4 border rounded-lg transition-all ${
                  currentStep === index && animating
                    ? 'border-rose-500 bg-rose-900/30'
                    : step.complete
                      ? 'border-green-500 bg-green-900/10'
                      : 'border-gray-800 bg-gray-900/50'
                }`}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    currentStep === index && animating
                      ? 'bg-rose-900/50 text-rose-300'
                      : step.complete
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-gray-800 text-gray-500'
                  }`}>
                    {step.icon}
                  </div>
                  
                  <div>
                    <h3 className={`font-medium mb-1 ${
                      currentStep === index && animating
                        ? 'text-rose-400'
                        : step.complete
                          ? 'text-green-400'
                          : 'text-gray-300'
                    }`}>
                      {index + 1}. {step.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {paymentSteps.every(step => step.complete) && (
            <div className="flex justify-center">
              <button
                onClick={() => setViewMode('compare')}
                className="px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center"
              >
                Compare with Other Methods <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Comparison View */}
      {viewMode === 'compare' && (
        <div className="space-y-6">
          <p className="text-gray-300 mb-4">
            See how Lightning Network compares to other payment methods used in Africa:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900/50 border border-gray-800 rounded-lg">
              <thead>
                <tr className="bg-black/30">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Speed</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cost</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Privacy</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Security</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Borderless</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {comparisons.map((comparison, index) => (
                  <tr 
                    key={comparison.method}
                    className={index === 0 ? 'bg-rose-900/20' : 'hover:bg-black/20'}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className={index === 0 ? 'font-medium text-rose-400' : 'text-gray-300'}>
                        {comparison.method}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                      {comparison.speed}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                      {comparison.cost}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {getRatingStars(comparison.privacy)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {getRatingStars(comparison.security)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {getRatingStars(comparison.borderless)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setViewMode('quiz')}
              className="px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center"
            >
              Test Your Knowledge <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Quiz View */}
      {viewMode === 'quiz' && !quizCompleted && (
        <div className="space-y-6">
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
              <span>{Math.round(((currentQuizIndex) / quizQuestions.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-600 transition-all duration-300"
                style={{ width: `${(currentQuizIndex / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
            <h3 className="text-lg font-medium text-rose-400 mb-4">
              {quizQuestions[currentQuizIndex].question}
            </h3>
            
            <div className="space-y-3 mb-6">
              {quizQuestions[currentQuizIndex].options.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    quizQuestions[currentQuizIndex].selectedOption === option.id
                      ? 'border-rose-500 bg-rose-900/20'
                      : 'border-gray-700 bg-black/30 hover:border-gray-600'
                  }`}
                  onClick={() => selectAnswer(currentQuizIndex, option.id)}
                >
                  <div className="flex items-start">
                    <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      quizQuestions[currentQuizIndex].selectedOption === option.id
                        ? 'bg-rose-500 text-white'
                        : 'border border-gray-600'
                    }`}>
                      {quizQuestions[currentQuizIndex].selectedOption === option.id && (
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    
                    <span className="text-gray-300">{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={nextQuestion}
                disabled={quizQuestions[currentQuizIndex].selectedOption === null}
                className={`px-5 py-2 rounded-lg transition-colors ${
                  quizQuestions[currentQuizIndex].selectedOption === null
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
              >
                {currentQuizIndex < quizQuestions.length - 1 ? 'Next Question' : 'Submit Answers'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Quiz Results */}
      {viewMode === 'quiz' && quizCompleted && (
        <div className="space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 text-center">
            <h3 className="text-xl font-medium text-rose-400 mb-4">Quiz Results</h3>
            
            <div className="text-5xl font-bold mb-4" style={{ color: score >= 2 ? '#10b981' : '#f43f5e' }}>
              {score}/{quizQuestions.length}
            </div>
            
            <p className="text-gray-300 mb-6">
              {score >= 2 
                ? "Great job! You have a good understanding of the Lightning Network and its benefits for African users."
                : "You might need to review the material. The Lightning Network is a powerful tool for enabling fast, low-cost transactions across Africa."}
            </p>
            
            <button
              onClick={completeLesson}
              className="px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Complete Lesson
            </button>
          </div>
          
          {/* Quiz Review */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
            <h3 className="text-lg font-medium text-rose-400 mb-4">Review Your Answers</h3>
            
            <div className="space-y-6">
              {quizQuestions.map((question, qIndex) => (
                <div key={qIndex} className="border-b border-gray-800 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                  <h4 className="font-medium text-gray-300 mb-2">
                    {qIndex + 1}. {question.question}
                  </h4>
                  
                  <div className="space-y-2 pl-4">
                    {question.options.map((option) => {
                      let optionClass = 'text-gray-400';
                      let iconComponent = null;
                      
                      if (option.isCorrect) {
                        optionClass = 'text-green-400';
                        iconComponent = <Check className="h-4 w-4 text-green-400 mr-2" />;
                      } else if (question.selectedOption === option.id) {
                        optionClass = 'text-red-400';
                        iconComponent = <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />;
                      }
                      
                      return (
                        <div key={option.id} className={`flex items-start ${optionClass}`}>
                          {iconComponent}
                          <span>{option.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Completion message */}
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Learning Complete!</h3>
          <p className="text-gray-300">
            You've learned about the Lightning Network and how it enables fast, low-cost Bitcoin transactions across Africa.
          </p>
        </div>
      )}
    </div>
  );
}