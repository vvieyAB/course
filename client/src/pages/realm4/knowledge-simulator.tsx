import { useState, useEffect } from 'react';
import { Brain, Check, X, Award, Clock, AlertTriangle, Info } from 'lucide-react';

interface KnowledgeSimulatorProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'mining' | 'economics' | 'energy' | 'security' | 'technical';
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function KnowledgeSimulator({ onComplete }: KnowledgeSimulatorProps) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "What is the primary purpose of Bitcoin mining?",
      options: [
        "To make money for miners",
        "To validate transactions and secure the network",
        "To increase the total supply of bitcoins",
        "To reduce transaction fees"
      ],
      correctIndex: 1,
      explanation: "Bitcoin mining serves to validate and confirm transactions by including them in blocks. This process secures the network by making it computationally expensive to attack, while also distributing new bitcoins according to a predetermined schedule.",
      category: 'mining',
      difficulty: 'easy'
    },
    {
      id: 2,
      text: "What happens to the mining reward approximately every four years?",
      options: [
        "It doubles",
        "It increases based on inflation",
        "It is halved",
        "It remains constant"
      ],
      correctIndex: 2,
      explanation: "Every 210,000 blocks (approximately four years), the block reward for Bitcoin miners is cut in half in an event known as 'the halving'. This reduces the rate at which new bitcoins are created and ensures Bitcoin's limited supply of 21 million coins.",
      category: 'economics',
      difficulty: 'easy'
    },
    {
      id: 3,
      text: "What is the maximum number of bitcoins that will ever exist?",
      options: [
        "21 million",
        "100 million",
        "1 billion",
        "Unlimited"
      ],
      correctIndex: 0,
      explanation: "Bitcoin has a fixed supply cap of 21 million coins. This scarcity is enforced by the protocol and creates a deflationary monetary policy, unlike traditional currencies which can be printed without limit.",
      category: 'economics',
      difficulty: 'easy'
    },
    {
      id: 4,
      text: "What is a 'nonce' in Bitcoin mining?",
      options: [
        "A special private key",
        "A unique identifier for each transaction",
        "A random number miners change to find valid blocks",
        "The hash of the previous block"
      ],
      correctIndex: 2,
      explanation: "A nonce (number used once) is a variable that miners repeatedly change to try different inputs to the hash function. The goal is to find a nonce that, when combined with the block data, produces a hash that meets the difficulty target.",
      category: 'technical',
      difficulty: 'medium'
    },
    {
      id: 5,
      text: "How do Bitcoin miners prevent double-spending?",
      options: [
        "By requiring government ID for all transactions",
        "By confirming transactions in blocks and establishing consensus on transaction history",
        "By limiting the number of transactions each address can make",
        "By only allowing spending after a 24-hour waiting period"
      ],
      correctIndex: 1,
      explanation: "Miners prevent double-spending by confirming transactions in blocks and establishing consensus on transaction history. Once a transaction is included in a block, and additional blocks are built on top of it, it becomes increasingly difficult to reverse or double-spend the coins.",
      category: 'security',
      difficulty: 'medium'
    },
    {
      id: 6,
      text: "Why are renewable energy sources increasingly important for Bitcoin mining?",
      options: [
        "Because Bitcoin only works with renewable energy",
        "Because mining is illegal with non-renewable energy",
        "Because renewable energy can be more cost-effective and improves mining profitability",
        "Because Bitcoin's code requires renewable energy sources"
      ],
      correctIndex: 2,
      explanation: "Renewable energy sources are increasingly important for Bitcoin mining because they can be more cost-effective, enhancing mining profitability. Miners naturally seek the cheapest power sources to maximize profits, and in many regions, renewables offer the lowest cost. This economic incentive drives miners toward more sustainable energy usage.",
      category: 'energy',
      difficulty: 'medium'
    },
    {
      id: 7,
      text: "What happens to mining difficulty when more miners join the network?",
      options: [
        "It decreases to accommodate more miners",
        "It increases to maintain a consistent block time",
        "It remains the same regardless of miners",
        "It fluctuates randomly to prevent predictability"
      ],
      correctIndex: 1,
      explanation: "When more miners join the network, the mining difficulty increases to maintain a consistent block time of approximately 10 minutes. This automatic adjustment occurs every 2,016 blocks (about two weeks) and ensures that blocks aren't found too quickly or too slowly, regardless of total mining power.",
      category: 'mining',
      difficulty: 'medium'
    },
    {
      id: 8,
      text: "How does Bitcoin mining support energy grid stability?",
      options: [
        "By supplying energy to the grid",
        "By acting as a flexible energy consumer that can adjust usage based on grid conditions",
        "By reducing overall energy consumption",
        "By replacing traditional energy sources"
      ],
      correctIndex: 1,
      explanation: "Bitcoin mining can support grid stability by acting as a flexible energy consumer. Miners can ramp up when excess energy is available (preventing curtailment) and shut down during peak demand periods. This flexibility helps balance the grid, particularly with intermittent renewable sources like wind and solar.",
      category: 'energy',
      difficulty: 'hard'
    },
    {
      id: 9,
      text: "What economic opportunities does Bitcoin mining present for African countries?",
      options: [
        "Only revenue from selling mined bitcoins",
        "Only reduction in currency inflation",
        "Multiple benefits including monetizing stranded energy resources, job creation, and infrastructure development",
        "Only tax revenue from mining companies"
      ],
      correctIndex: 2,
      explanation: "Bitcoin mining presents multiple economic opportunities for African countries, including monetizing underutilized energy resources (like excess hydro or stranded natural gas), creating jobs in both mining operations and supporting services, developing energy and internet infrastructure, attracting foreign investment, and providing a source of tax revenue.",
      category: 'economics',
      difficulty: 'hard'
    },
    {
      id: 10,
      text: "What is the relationship between Bitcoin's hashrate and its security?",
      options: [
        "They are unrelated",
        "Higher hashrate decreases security",
        "Higher hashrate increases security by making attacks more expensive",
        "Security only depends on the number of nodes, not hashrate"
      ],
      correctIndex: 2,
      explanation: "A higher hashrate increases Bitcoin's security by making attacks more expensive and difficult to execute. To successfully attack the network (e.g., with a 51% attack), an attacker would need to control more than half of the total computational power, which becomes increasingly costly as the hashrate grows.",
      category: 'security',
      difficulty: 'hard'
    }
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30); // seconds per question
  const [quizComplete, setQuizComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  
  // Timer countdown
  useEffect(() => {
    if (!timerActive || quizComplete) return;
    
    if (timeRemaining <= 0) {
      // Time's up for this question
      handleAnswer(-1); // -1 indicates timeout
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRemaining, timerActive, quizComplete]);
  
  // Reset timer when moving to next question
  useEffect(() => {
    if (!answered) {
      setTimeRemaining(30);
      setTimerActive(true);
    }
  }, [currentQuestionIndex, answered]);
  
  // Handle option selection
  const selectOption = (index: number) => {
    if (answered) return;
    
    setSelectedOption(index);
  };
  
  // Handle submitting an answer
  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setTimerActive(false);
    setAnswered(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
    
    // Check if answer is correct (or was a timeout)
    if (index === currentQuestion.correctIndex) {
      isCorrect = true;
      setScore(score + 1);
    }
    
    // Update question to show result
    setQuestions(prev => 
      prev.map((q, idx) => 
        idx === currentQuestionIndex 
          ? { ...q, answered: true, selectedOption: index, correct: isCorrect } 
          : q
      )
    );
    
    // If index is -1, it was a timeout and we automatically set selectedOption to -1
    if (index === -1) {
      setSelectedOption(-1);
    }
  };
  
  // Move to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      // Quiz completed
      setQuizComplete(true);
      
      // Check if score is high enough to pass
      if (score >= 7) { // 70% passing score
        setTimeout(onComplete, 2000);
      }
    }
  };
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-orange-900/30">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Mining Knowledge Test</h2>
        <p className="text-gray-300 mb-6">
          Test your understanding of Bitcoin mining concepts, from technical details to economic implications.
          Answer at least 7 out of 10 questions correctly to pass.
        </p>
        
        {!quizComplete ? (
          <>
            {/* Quiz progress */}
            <div className="bg-gray-900 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-400">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-orange-400" />
                  <span className={`text-sm ${
                    timeRemaining < 10 ? 'text-red-400' : 'text-gray-300'
                  }`}>
                    {timeRemaining}s
                  </span>
                </div>
              </div>
              
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <div>Current Score: {score}/{currentQuestionIndex + (answered ? 1 : 0)}</div>
                <div>Passing Score: 7/10</div>
              </div>
            </div>
            
            {/* Current question */}
            <div className="bg-gray-900 p-6 rounded-lg mb-6">
              <div className="flex items-start">
                <div className="bg-orange-900/30 p-1.5 rounded-lg mr-4 flex-shrink-0">
                  <Brain className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-medium text-gray-100">{currentQuestion.text}</h3>
                    <div className="ml-4 flex-shrink-0">
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        currentQuestion.difficulty === 'easy'
                          ? 'bg-green-900/30 text-green-400'
                          : currentQuestion.difficulty === 'medium'
                            ? 'bg-orange-900/30 text-orange-400'
                            : 'bg-red-900/30 text-red-400'
                      }`}>
                        {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-6">
                    Category: {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedOption === idx
                        ? 'border-orange-500 bg-orange-900/30'
                        : answered && idx === currentQuestion.correctIndex
                          ? 'border-green-500 bg-green-900/30'
                          : answered && idx === selectedOption
                            ? 'border-red-500 bg-red-900/30'
                            : 'border-gray-800 bg-black/30 hover:border-gray-700'
                    }`}
                    onClick={() => selectOption(idx)}
                  >
                    <div className="flex items-center">
                      <div className={`h-5 w-5 mr-3 rounded-full flex items-center justify-center ${
                        selectedOption === idx
                          ? 'bg-orange-500 text-black'
                          : answered && idx === currentQuestion.correctIndex
                            ? 'bg-green-500 text-black'
                            : answered && idx === selectedOption
                              ? 'bg-red-500 text-black'
                              : 'bg-gray-800 text-gray-500'
                      }`}>
                        {selectedOption === idx && !answered && (
                          <div className="h-2 w-2 bg-black rounded-full"></div>
                        )}
                        {answered && idx === currentQuestion.correctIndex && (
                          <Check className="h-3 w-3" />
                        )}
                        {answered && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                          <X className="h-3 w-3" />
                        )}
                      </div>
                      <span className={`${
                        answered && idx === currentQuestion.correctIndex
                          ? 'text-green-300 font-medium'
                          : answered && idx === selectedOption && idx !== currentQuestion.correctIndex
                            ? 'text-red-300'
                            : 'text-gray-300'
                      }`}>
                        {option}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {answered && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="text-orange-400 underline text-sm hover:text-orange-300"
                  >
                    {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                  </button>
                  
                  {showExplanation && (
                    <div className="mt-4 p-4 bg-black/40 border border-gray-800 rounded-lg">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-300">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Navigation controls */}
            <div className="flex justify-between">
              <div>
                {selectedOption === -1 && (
                  <div className="flex items-center text-red-400">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Time's up!</span>
                  </div>
                )}
              </div>
              
              <div>
                {!answered ? (
                  <button
                    onClick={() => handleAnswer(selectedOption !== null ? selectedOption : -1)}
                    disabled={selectedOption === null}
                    className={`px-6 py-2 rounded-md font-medium ${
                      selectedOption === null
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          // Quiz results
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex justify-center mb-6">
              <div className={`h-24 w-24 rounded-full flex items-center justify-center ${
                score >= 7 
                  ? 'bg-green-900/30 text-green-400 border-2 border-green-500'
                  : 'bg-red-900/30 text-red-400 border-2 border-red-500'
              }`}>
                {score >= 7 ? (
                  <Award className="h-12 w-12" />
                ) : (
                  <X className="h-12 w-12" />
                )}
              </div>
            </div>
            
            <h3 className={`text-2xl font-bold text-center mb-4 ${
              score >= 7 ? 'text-green-400' : 'text-red-400'
            }`}>
              {score >= 7 ? 'Challenge Complete!' : 'Challenge Incomplete'}
            </h3>
            
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-200">{score}/{questions.length}</div>
              <p className="text-gray-400 mt-1">
                {score >= 7 
                  ? "Congratulations! You've demonstrated a solid understanding of Bitcoin mining concepts."
                  : 'You need to score at least 7/10 to pass. Try again after reviewing the material.'}
              </p>
            </div>
            
            {/* Category breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-black/30 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Performance by Category</h4>
                <div className="space-y-2">
                  {(['mining', 'economics', 'energy', 'security', 'technical'] as const).map(category => {
                    const categoryQuestions = questions.filter(q => q.category === category);
                    const categoryCorrect = categoryQuestions.filter((q: any) => q.correct).length;
                    
                    return (
                      <div key={category}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
                          <span className="text-gray-300">
                            {categoryCorrect}/{categoryQuestions.length}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${categoryCorrect === categoryQuestions.length ? 'bg-green-500' : 'bg-orange-500'}`}
                            style={{ width: `${(categoryCorrect / categoryQuestions.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-black/30 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Performance by Difficulty</h4>
                <div className="space-y-2">
                  {(['easy', 'medium', 'hard'] as const).map(difficulty => {
                    const difficultyQuestions = questions.filter(q => q.difficulty === difficulty);
                    const difficultyCorrect = difficultyQuestions.filter((q: any) => q.correct).length;
                    
                    return (
                      <div key={difficulty}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                          </span>
                          <span className="text-gray-300">
                            {difficultyCorrect}/{difficultyQuestions.length}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              difficulty === 'easy' 
                                ? 'bg-green-500' 
                                : difficulty === 'medium' 
                                  ? 'bg-orange-500' 
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${(difficultyCorrect / difficultyQuestions.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {score < 7 && (
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setQuizComplete(false);
                    setCurrentQuestionIndex(0);
                    setSelectedOption(null);
                    setAnswered(false);
                    setShowExplanation(false);
                    setScore(0);
                    setTimeRemaining(30);
                    setTimerActive(true);
                    
                    // Reset question status
                    setQuestions(questions.map(q => ({
                      ...q,
                      answered: undefined,
                      selectedOption: undefined,
                      correct: undefined
                    })));
                  }}
                  className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {quizComplete && score >= 7 && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! You've demonstrated a solid understanding of Bitcoin mining concepts, from
            the technical details of how mining works to the broader economic implications. This knowledge
            forms the foundation for understanding Bitcoin's security model and its role in the global economy.
          </p>
        </div>
      )}
    </div>
  );
}