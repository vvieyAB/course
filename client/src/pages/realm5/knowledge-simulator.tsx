import { useState, useEffect } from 'react';
import { BookOpen, Check, X, Info, Lightbulb, ArrowRight, ChevronRight, ChevronLeft, Award } from 'lucide-react';

interface KnowledgeSimulatorProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  text: string;
  explanation: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  selectedOption: string | null;
  isCorrect: boolean | null;
}

export default function KnowledgeSimulator({ onComplete }: KnowledgeSimulatorProps) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "What is the primary purpose of Bitcoin's governance model?",
      explanation: "Bitcoin's governance model is designed to prevent any single entity from controlling the protocol. By distributing decision-making power across developers, miners, node operators, and users, Bitcoin prevents capture by governments, corporations, or other centralized entities.",
      options: [
        { id: '1a', text: "To make changes quickly and efficiently", isCorrect: false },
        { id: '1b', text: "To prevent any single entity from controlling the protocol", isCorrect: true },
        { id: '1c', text: "To maximize profits for miners", isCorrect: false },
        { id: '1d', text: "To make Bitcoin more user-friendly", isCorrect: false }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 2,
      text: "Which stakeholder group can directly force changes to the Bitcoin protocol?",
      explanation: "No single group can force changes to Bitcoin. Developers can propose and code changes, miners can signal support, node operators can choose which software to run, and users signal through economic activity. Each group has influence but none has absolute control.",
      options: [
        { id: '2a', text: "Bitcoin Core developers", isCorrect: false },
        { id: '2b', text: "Large mining pools", isCorrect: false },
        { id: '2c', text: "Node operators", isCorrect: false },
        { id: '2d', text: "None of the above", isCorrect: true }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 3,
      text: "What is the Bitcoin Improvement Proposal (BIP) process primarily used for?",
      explanation: "The BIP process provides a standardized way to propose, document, and track changes to Bitcoin. It helps organize ideas, facilitate technical discussions, and document decisions for the community.",
      options: [
        { id: '3a', text: "To vote on changes to the Bitcoin protocol", isCorrect: false },
        { id: '3b', text: "To standardize the process of proposing and documenting changes", isCorrect: true },
        { id: '3c', text: "To force controversial changes through community resistance", isCorrect: false },
        { id: '3d', text: "To give developers final authority on all changes", isCorrect: false }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 4,
      text: "Which of these best describes how consensus is reached in Bitcoin?",
      explanation: "Bitcoin uses 'rough consensus' where general agreement is sought without formal voting. Proposals gain momentum through informal discussion, technical review, and signaling from various stakeholders, with an emphasis on avoiding contentious changes.",
      options: [
        { id: '4a', text: "Simple majority vote by all Bitcoin holders", isCorrect: false },
        { id: '4b', text: "Decision by the Bitcoin Foundation", isCorrect: false },
        { id: '4c', text: "Rough consensus among stakeholders without formal voting", isCorrect: true },
        { id: '4d', text: "Majority vote by miners only", isCorrect: false }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 5,
      text: "What role do regular Bitcoin users play in governance?",
      explanation: "Users ultimately determine Bitcoin's value and direction through economic choices - which coins they buy, hold, and transact with. Their collective economic activity has significant influence over the direction of the protocol.",
      options: [
        { id: '5a', text: "No formal role in governance", isCorrect: false },
        { id: '5b', text: "They vote directly on all protocol changes", isCorrect: false },
        { id: '5c', text: "They influence governance through economic activity and choice of software", isCorrect: true },
        { id: '5d', text: "They can only participate by becoming miners", isCorrect: false }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 6,
      text: "What happened when there was significant disagreement about scaling Bitcoin in 2017?",
      explanation: "When the community couldn't reach consensus on how to scale Bitcoin, it resulted in a hard fork creating Bitcoin Cash (BCH) with larger blocks. This demonstrates how governance disputes can lead to chain splits when agreement cannot be reached.",
      options: [
        { id: '6a', text: "The developers made the final decision", isCorrect: false },
        { id: '6b', text: "A vote was held among all Bitcoin owners", isCorrect: false },
        { id: '6c', text: "A hard fork occurred creating Bitcoin Cash", isCorrect: true },
        { id: '6d', text: "The United Nations mediated a solution", isCorrect: false }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 7,
      text: "Why does Bitcoin development tend to be conservative and slow-moving?",
      explanation: "Bitcoin's focus on security and decentralization makes developers extremely cautious about changes. With billions of dollars at stake and no central authority to reverse mistakes, changes need extensive review and testing to prevent catastrophic failures.",
      options: [
        { id: '7a', text: "Lack of funding for development", isCorrect: false },
        { id: '7b', text: "Too few developers working on the code", isCorrect: false },
        { id: '7c', text: "Focus on security and avoiding catastrophic failures", isCorrect: true },
        { id: '7d', text: "Regulatory restrictions on development", isCorrect: false }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 8,
      text: "What is 'UASF' in Bitcoin governance?",
      explanation: "User Activated Soft Fork (UASF) is a method where node operators coordinate to enforce new consensus rules regardless of miner support. It represents users exercising power in Bitcoin's governance system, as demonstrated during the SegWit activation.",
      options: [
        { id: '8a', text: "Universal Agreement for Secure Forks", isCorrect: false },
        { id: '8b', text: "User Activated Soft Fork", isCorrect: true },
        { id: '8c', text: "Unified Address Sending Format", isCorrect: false },
        { id: '8d', text: "Ultimate Authority of Satoshi Followers", isCorrect: false }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 9,
      text: "How does Bitcoin's governance model contribute to its security?",
      explanation: "By making changes difficult and requiring broad consensus, Bitcoin's governance model prevents hasty changes that could introduce vulnerabilities. It also prevents capture by special interests that might compromise security for other benefits.",
      options: [
        { id: '9a', text: "It doesn't - governance and security are unrelated", isCorrect: false },
        { id: '9b', text: "By allowing quick security patches", isCorrect: false },
        { id: '9c', text: "By requiring broad consensus for changes, preventing hasty or malicious modifications", isCorrect: true },
        { id: '9d', text: "By centralizing control with security experts", isCorrect: false }
      ],
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 10,
      text: "What lesson can be learned from the failure of SegWit2x in 2017?",
      explanation: "SegWit2x attempted to implement changes based on an agreement among industry leaders without broad community consensus. Its failure demonstrated that even powerful stakeholders cannot force changes without genuine community support in Bitcoin's governance system.",
      options: [
        { id: '10a', text: "That miners ultimately control Bitcoin", isCorrect: false },
        { id: '10b', text: "That agreements among industry leaders cannot override broad community consensus", isCorrect: true },
        { id: '10c', text: "That technical changes should never be attempted", isCorrect: false },
        { id: '10d', text: "That Bitcoin governance works best with a leader", isCorrect: false }
      ],
      selectedOption: null,
      isCorrect: null
    }
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [challengeComplete, setChallengeComplete] = useState(false);
  
  // Current question for convenience
  const currentQuestion = questions[currentQuestionIndex];
  
  // Select an answer for the current question
  const selectAnswer = (optionId: string) => {
    if (reviewMode) return;
    
    // Find if the selected option is correct
    const selectedOption = currentQuestion.options.find(opt => opt.id === optionId);
    const isCorrect = selectedOption?.isCorrect || false;
    
    // Update questions array
    setQuestions(prevQuestions => 
      prevQuestions.map(q => 
        q.id === currentQuestion.id 
          ? { ...q, selectedOption: optionId, isCorrect }
          : q
      )
    );
    
    // Show explanation after selection
    setShowExplanation(true);
  };
  
  // Move to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      // Calculate final score
      const correctCount = questions.filter(q => q.isCorrect).length;
      setScore(correctCount);
      setQuizCompleted(true);
    }
  };
  
  // Go to previous question (in review mode)
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Complete the challenge
  const finishChallenge = () => {
    setChallengeComplete(true);
    setTimeout(onComplete, 2000);
  };
  
  // Start review mode
  const startReview = () => {
    setReviewMode(true);
    setCurrentQuestionIndex(0);
  };
  
  // Calculate if all questions have been answered
  const allQuestionsAnswered = questions.every(q => q.selectedOption !== null);
  
  // Calculate progress percentage
  const progressPercentage = Math.round(
    (questions.filter(q => q.selectedOption !== null).length / questions.length) * 100
  );
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-amber-900/30">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amber-500 mb-2">Bitcoin Governance Knowledge Challenge</h2>
        
        <p className="text-gray-300 mb-4">
          Test your understanding of Bitcoin's governance system, protocol evolution, and consensus mechanisms.
        </p>
        
        {!quizCompleted ? (
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{progressPercentage}% Complete</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-600 transition-all"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Question card */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
              <h3 className="text-lg font-medium text-amber-300 mb-4 flex items-start">
                <BookOpen className="h-5 w-5 mr-3 flex-shrink-0 mt-1" />
                <span>{currentQuestion.text}</span>
              </h3>
              
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => selectAnswer(option.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all flex items-start ${
                      reviewMode 
                        ? option.isCorrect
                          ? 'border-green-500 bg-green-900/20'
                          : currentQuestion.selectedOption === option.id
                            ? 'border-red-500 bg-red-900/20'
                            : 'border-gray-700 bg-black/30'
                        : currentQuestion.selectedOption === option.id
                          ? showExplanation
                            ? option.isCorrect
                              ? 'border-green-500 bg-green-900/20'
                              : 'border-red-500 bg-red-900/20'
                            : 'border-amber-500 bg-amber-900/20'
                          : 'border-gray-700 bg-black/30 hover:border-gray-600'
                    }`}
                  >
                    <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      reviewMode
                        ? option.isCorrect
                          ? 'bg-green-500 text-black'
                          : currentQuestion.selectedOption === option.id
                            ? 'bg-red-500 text-black'
                            : 'border border-gray-600'
                        : currentQuestion.selectedOption === option.id
                          ? showExplanation
                            ? option.isCorrect
                              ? 'bg-green-500 text-black'
                              : 'bg-red-500 text-black'
                            : 'bg-amber-500 text-black'
                          : 'border border-gray-600'
                    }`}>
                      {(reviewMode && option.isCorrect) || 
                       (showExplanation && currentQuestion.selectedOption === option.id && option.isCorrect) ? (
                        <Check className="h-3 w-3" />
                      ) : (reviewMode && currentQuestion.selectedOption === option.id && !option.isCorrect) ||
                         (showExplanation && currentQuestion.selectedOption === option.id && !option.isCorrect) ? (
                        <X className="h-3 w-3" />
                      ) : currentQuestion.selectedOption === option.id ? (
                        <div className="h-2 w-2 bg-black rounded-full"></div>
                      ) : null}
                    </div>
                    
                    <span className="text-gray-300">{option.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Explanation box */}
              {(showExplanation || reviewMode) && (
                <div className={`p-4 rounded-lg mb-4 ${
                  currentQuestion.isCorrect ? 'bg-green-900/20 border border-green-700' : 'bg-amber-900/20 border border-amber-700'
                }`}>
                  <div className="flex items-start">
                    <Lightbulb className={`h-5 w-5 mr-2 flex-shrink-0 mt-0.5 ${
                      currentQuestion.isCorrect ? 'text-green-400' : 'text-amber-400'
                    }`} />
                    <div>
                      <h4 className={`font-medium mb-1 ${
                        currentQuestion.isCorrect ? 'text-green-400' : 'text-amber-400'
                      }`}>
                        {currentQuestion.isCorrect ? 'Correct!' : 'Not quite right'}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="flex justify-between">
                {reviewMode && (
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                      currentQuestionIndex === 0
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                  </button>
                )}
                
                {!reviewMode && (
                  <div></div> // Empty div for flex spacing when not in review mode
                )}
                
                <button
                  onClick={nextQuestion}
                  disabled={!currentQuestion.selectedOption && !reviewMode}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                    !currentQuestion.selectedOption && !reviewMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
                  ) : (
                    <>Finish Quiz</>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Quiz completed screen
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-amber-900/30 rounded-full mb-4">
                <Award className="h-10 w-10 text-amber-400" />
              </div>
              
              <h3 className="text-xl font-bold text-amber-400 mb-2">
                Challenge Complete!
              </h3>
              
              <p className="text-gray-300">
                You scored {score} out of {questions.length} correct answers
              </p>
              
              <div className="w-full max-w-xs mx-auto mt-4 mb-6">
                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all"
                    style={{ 
                      width: `${(score / questions.length) * 100}%`,
                      backgroundColor: score >= 7 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444'
                    }}
                  ></div>
                </div>
              </div>
              
              {score >= 7 ? (
                <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg mb-6">
                  <p className="text-green-400 font-medium">Excellent work!</p>
                  <p className="text-gray-300 text-sm">
                    You have a strong understanding of Bitcoin's governance model and how the protocol evolves.
                  </p>
                </div>
              ) : score >= 5 ? (
                <div className="p-4 bg-amber-900/20 border border-amber-700 rounded-lg mb-6">
                  <p className="text-amber-400 font-medium">Good effort!</p>
                  <p className="text-gray-300 text-sm">
                    You have a decent grasp of Bitcoin governance concepts, but there's still more to learn.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg mb-6">
                  <p className="text-red-400 font-medium">Keep learning!</p>
                  <p className="text-gray-300 text-sm">
                    Bitcoin governance can be complex. Consider reviewing the material again to strengthen your understanding.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={startReview}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Review Answers
              </button>
              
              <button
                onClick={finishChallenge}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Complete Challenge
              </button>
            </div>
          </div>
        )}
      </div>
      
      {challengeComplete && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Knowledge Challenge Complete!</h3>
          <p className="text-gray-300">
            Well done! You've developed a solid understanding of Bitcoin's governance model, 
            how changes are proposed and implemented, and the roles different stakeholders play 
            in the evolution of the protocol.
          </p>
        </div>
      )}
    </div>
  );
}