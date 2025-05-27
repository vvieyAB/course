import { useState, useEffect } from 'react';
import { Check, X, MapPin, ArrowRight, Globe, AlertTriangle, Award } from 'lucide-react';

interface KnowledgeProps {
  onComplete: () => void;
}

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  selectedOption: string | null;
  isCorrect: boolean | null;
}

interface MapRegion {
  id: string;
  name: string;
  description: string;
  useCases: string[];
  coordinates: {
    x: number;
    y: number;
  };
  isActive: boolean;
  isExplored: boolean;
}

export default function Knowledge({ onComplete }: KnowledgeProps) {
  // Quiz questions
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q1',
      text: "Which of these is the most impactful use case for Bitcoin in Nigeria?",
      options: [
        {
          id: 'q1-a',
          text: "Remittances and cross-border payments",
          isCorrect: true
        },
        {
          id: 'q1-b',
          text: "Bitcoin mining",
          isCorrect: false
        },
        {
          id: 'q1-c',
          text: "Paying government taxes",
          isCorrect: false
        },
        {
          id: 'q1-d',
          text: "Purchasing luxury goods",
          isCorrect: false
        }
      ],
      explanation: "Nigeria has one of the largest remittance markets in Africa, with a large diaspora sending money home. Bitcoin provides a faster and cheaper alternative to traditional remittance services that often charge 7-10% in fees.",
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'q2',
      text: "How does the Lightning Network help content creators in Africa?",
      options: [
        {
          id: 'q2-a',
          text: "It allows them to receive micropayments directly from fans worldwide without high fees",
          isCorrect: true
        },
        {
          id: 'q2-b',
          text: "It helps them create digital content faster",
          isCorrect: false
        },
        {
          id: 'q2-c',
          text: "It gives them access to government grants",
          isCorrect: false
        },
        {
          id: 'q2-d',
          text: "It provides them with free web hosting",
          isCorrect: false
        }
      ],
      explanation: "The Lightning Network enables instant micropayments (even just a few cents) with minimal fees, allowing creators to receive direct support from fans globally without losing significant amounts to payment processors or platforms.",
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'q3',
      text: "What makes Machankura unique among Bitcoin wallets?",
      options: [
        {
          id: 'q3-a',
          text: "It works on basic feature phones without internet via USSD codes",
          isCorrect: true
        },
        {
          id: 'q3-b',
          text: "It offers the lowest fees of any Bitcoin wallet",
          isCorrect: false
        },
        {
          id: 'q3-c',
          text: "It's the only wallet developed by an African team",
          isCorrect: false
        },
        {
          id: 'q3-d',
          text: "It has the highest security rating",
          isCorrect: false
        }
      ],
      explanation: "Machankura makes Bitcoin accessible to the unbanked and those without smartphones by allowing transactions through USSD codes on basic feature phones. This innovation is particularly important in Africa where smartphone and internet penetration is still growing.",
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'q4',
      text: "What role do education hubs in Ghana and Nigeria play in the Bitcoin ecosystem?",
      options: [
        {
          id: 'q4-a',
          text: "They train local developers who can build Bitcoin applications and contribute to open source projects",
          isCorrect: true
        },
        {
          id: 'q4-b',
          text: "They exclusively focus on teaching Bitcoin trading strategies",
          isCorrect: false
        },
        {
          id: 'q4-c',
          text: "They primarily help people buy and sell Bitcoin",
          isCorrect: false
        },
        {
          id: 'q4-d',
          text: "They only provide general computer literacy training",
          isCorrect: false
        }
      ],
      explanation: "Education hubs in West Africa are building technical capacity by training developers who can create local Bitcoin solutions, contribute to global open source projects, and build startups addressing African needs, ensuring Africans aren't just users but creators in the ecosystem.",
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'q5',
      text: "What is the essence of Ubuntu in the context of Bitcoin adoption in Africa?",
      options: [
        {
          id: 'q5-a',
          text: "The philosophy that financial empowerment is achieved through community collaboration and shared progress",
          isCorrect: true
        },
        {
          id: 'q5-b',
          text: "A specific type of mining operation in South Africa",
          isCorrect: false
        },
        {
          id: 'q5-c',
          text: "A popular Linux operating system used to run Bitcoin nodes",
          isCorrect: false
        },
        {
          id: 'q5-d',
          text: "The name of a Bitcoin exchange in Zimbabwe",
          isCorrect: false
        }
      ],
      explanation: "Ubuntu—meaning 'I am because we are'—reflects how Bitcoin is being adopted in Africa not just as individual financial tools but as community-based solutions. Examples include farming co-ops pooling resources for equipment, community education funds, and knowledge-sharing networks.",
      selectedOption: null,
      isCorrect: null
    }
  ]);
  
  // Map regions
  const [mapRegions, setMapRegions] = useState<MapRegion[]>([
    {
      id: 'west',
      name: 'West Africa',
      description: 'West African countries like Nigeria and Ghana are leading Bitcoin adoption with vibrant trading, remittance usage, and education initiatives.',
      useCases: [
        'Remittances from diaspora',
        'Protection against currency devaluation',
        'Developer education hubs',
        'Cross-border trade payments'
      ],
      coordinates: {
        x: 20,
        y: 40
      },
      isActive: false,
      isExplored: false
    },
    {
      id: 'east',
      name: 'East Africa',
      description: 'East African countries like Kenya are integrating Bitcoin with mobile money systems and using it for cross-border trade.',
      useCases: [
        'Integration with mobile money',
        'Merchant payments',
        'Tourism industry adoption',
        'Tech startup funding'
      ],
      coordinates: {
        x: 60,
        y: 45
      },
      isActive: false,
      isExplored: false
    },
    {
      id: 'south',
      name: 'Southern Africa',
      description: 'Southern African countries like South Africa and Zimbabwe see Bitcoin use for savings, community projects, and as protection against inflation.',
      useCases: [
        'Hedge against inflation (Zimbabwe)',
        'Community education funds',
        'Freelancer payments',
        'Investment and savings'
      ],
      coordinates: {
        x: 50,
        y: 75
      },
      isActive: false,
      isExplored: false
    },
    {
      id: 'central',
      name: 'Central Africa',
      description: 'In Central African countries like the Democratic Republic of Congo, Bitcoin mining powered by hydroelectric energy is creating sustainable development opportunities.',
      useCases: [
        'Hydroelectric Bitcoin mining',
        'Natural resource payment transparency',
        'Refugee financial services',
        'Cross-border trade'
      ],
      coordinates: {
        x: 45,
        y: 45
      },
      isActive: false,
      isExplored: false
    },
    {
      id: 'north',
      name: 'North Africa',
      description: 'North African countries are seeing growing Bitcoin adoption for freelance work payments and international remittances.',
      useCases: [
        'Remote work payments',
        'Freelancer income',
        'Tourism industry',
        'Tech entrepreneurship'
      ],
      coordinates: {
        x: 40,
        y: 20
      },
      isActive: false,
      isExplored: false
    }
  ]);
  
  // Component state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [viewMode, setViewMode] = useState<'quiz' | 'map'>('quiz');
  const [allRegionsExplored, setAllRegionsExplored] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Get current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Handle selecting an answer
  const selectAnswer = (questionIndex: number, optionId: string) => {
    const question = questions[questionIndex];
    const option = question.options.find(opt => opt.id === optionId);
    
    if (!option) return;
    
    setQuestions(prev => 
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score
      const correctCount = questions.filter(q => q.isCorrect).length;
      setScore(correctCount);
      setQuizCompleted(true);
    }
  };
  
  // Handle activating a map region
  const activateRegion = (regionId: string) => {
    setMapRegions(prev => 
      prev.map(region => ({
        ...region,
        isActive: region.id === regionId,
        isExplored: region.id === regionId ? true : region.isExplored
      }))
    );
  };
  
  // Check if all regions have been explored
  useEffect(() => {
    if (mapRegions.every(region => region.isExplored)) {
      setAllRegionsExplored(true);
    }
  }, [mapRegions]);
  
  // Switch to map view after quiz completion
  const switchToMap = () => {
    setViewMode('map');
  };
  
  // Complete the challenge
  const completeChallenge = () => {
    setCompleted(true);
    setTimeout(onComplete, 2000);
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
      {/* View mode tabs */}
      <div className="flex border-b border-gray-800">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            viewMode === 'quiz'
              ? 'text-rose-400 border-b-2 border-rose-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setViewMode('quiz')}
        >
          Knowledge Quiz
        </button>
        
        <button
          className={`px-4 py-2 font-medium text-sm ${
            viewMode === 'map'
              ? 'text-rose-400 border-b-2 border-rose-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setViewMode('map')}
          disabled={!quizCompleted}
        >
          Africa Bitcoin Map
        </button>
      </div>
      
      {/* Quiz View */}
      {viewMode === 'quiz' && !quizCompleted && (
        <div className="space-y-6">
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestionIndex) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-600 transition-all duration-300"
                style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
            <h3 className="text-lg font-medium text-rose-400 mb-4">
              {currentQuestion.text}
            </h3>
            
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    currentQuestion.selectedOption === option.id
                      ? option.isCorrect
                        ? 'border-green-500 bg-green-900/20'
                        : 'border-red-500 bg-red-900/20'
                      : 'border-gray-700 bg-black/30 hover:border-gray-600'
                  }`}
                  onClick={() => !currentQuestion.selectedOption && selectAnswer(currentQuestionIndex, option.id)}
                >
                  <div className="flex items-start">
                    <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      currentQuestion.selectedOption === option.id
                        ? option.isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'border border-gray-600'
                    }`}>
                      {currentQuestion.selectedOption === option.id && (
                        option.isCorrect
                          ? <Check className="h-3 w-3" />
                          : <X className="h-3 w-3" />
                      )}
                    </div>
                    
                    <span className="text-gray-300">{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {currentQuestion.selectedOption !== null && (
              <div className={`p-4 rounded-lg mb-6 ${
                currentQuestion.isCorrect
                  ? 'bg-green-900/20 border border-green-700'
                  : 'bg-red-900/20 border border-red-700'
              }`}>
                <p className="text-sm text-gray-300">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
            
            <div className="flex justify-center">
              <button
                onClick={nextQuestion}
                disabled={currentQuestion.selectedOption === null}
                className={`px-5 py-2 rounded-lg transition-colors ${
                  currentQuestion.selectedOption === null
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Quiz Results */}
      {viewMode === 'quiz' && quizCompleted && (
        <div className="space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 text-center">
            <div className="inline-block p-4 bg-rose-900/30 rounded-full mb-4">
              <Award className="h-10 w-10 text-rose-400" />
            </div>
            
            <h3 className="text-xl font-medium text-rose-400 mb-4">Quiz Results</h3>
            
            <div className="text-5xl font-bold mb-4" style={{ color: score >= 4 ? '#10b981' : '#f43f5e' }}>
              {score}/{questions.length}
            </div>
            
            <p className="text-gray-300 mb-6">
              {score >= 4 
                ? "Excellent! You have a strong understanding of Bitcoin's applications across Africa."
                : "Good effort! You've learned about some Bitcoin applications in Africa, but there's more to explore."}
            </p>
            
            <button
              onClick={switchToMap}
              className="px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center mx-auto"
            >
              Explore Bitcoin in Africa <Globe className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          {/* Quiz Review Summary */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
            <h3 className="text-lg font-medium text-rose-400 mb-4">Knowledge Review</h3>
            
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div 
                  key={question.id}
                  className={`p-3 border rounded-lg ${
                    question.isCorrect
                      ? 'border-green-700 bg-green-900/10'
                      : 'border-red-700 bg-red-900/10'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full mr-2 ${
                      question.isCorrect
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-red-900/30 text-red-400'
                    }`}>
                      {question.isCorrect
                        ? <Check className="h-4 w-4" />
                        : <X className="h-4 w-4" />
                      }
                    </div>
                    <div className="text-sm text-gray-300">
                      {question.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Map View */}
      {viewMode === 'map' && (
        <div className="space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
            <h3 className="text-lg font-medium text-rose-400 mb-4">
              Bitcoin Across Africa
            </h3>
            
            <p className="text-gray-300 mb-6">
              Explore how Bitcoin is being used in different regions of Africa. Click on a region to learn more.
            </p>
            
            {/* Map visualization */}
            <div className="aspect-[4/3] bg-gray-800 rounded-lg border border-gray-700 mb-4 relative">
              {/* Map image representation */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                <Globe className="h-12 w-12" />
              </div>
              
              {/* Region markers */}
              {mapRegions.map((region) => (
                <button
                  key={region.id}
                  className={`absolute p-2 rounded-full transition-all ${
                    region.isActive
                      ? 'bg-rose-600 text-white transform scale-125'
                      : region.isExplored
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                  style={{ 
                    left: `${region.coordinates.x}%`, 
                    top: `${region.coordinates.y}%`,
                    transform: region.isActive ? 'scale(1.25)' : 'scale(1)'
                  }}
                  onClick={() => activateRegion(region.id)}
                >
                  <MapPin className="h-4 w-4" />
                </button>
              ))}
            </div>
            
            {/* Selected region information */}
            {mapRegions.find(r => r.isActive) && (
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-rose-400 mb-2">
                  {mapRegions.find(r => r.isActive)?.name}
                </h4>
                
                <p className="text-sm text-gray-300 mb-4">
                  {mapRegions.find(r => r.isActive)?.description}
                </p>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Key Use Cases:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {mapRegions.find(r => r.isActive)?.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-3 w-3 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Regions explored count */}
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Regions Explored: {mapRegions.filter(r => r.isExplored).length}/{mapRegions.length}
              </div>
              
              {allRegionsExplored && (
                <button
                  onClick={completeChallenge}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  Complete Challenge <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          {allRegionsExplored ? (
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-400 mb-1">All Regions Explored!</h4>
                  <p className="text-sm text-gray-300">
                    You've explored how Bitcoin is being used across different regions of Africa.
                    Click "Complete Challenge" to finish this mission.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-400 mb-1">Continue Exploring</h4>
                  <p className="text-sm text-gray-300">
                    Click on each region of Africa to learn how Bitcoin is being used there.
                    You need to explore all regions to complete this challenge.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Completion message */}
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Knowledge Mission Complete!</h3>
          <p className="text-gray-300">
            You've successfully demonstrated your understanding of Bitcoin's practical applications across
            Africa and explored how different regions are utilizing this technology in unique ways.
          </p>
        </div>
      )}
    </div>
  );
}