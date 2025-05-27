import React, { useState } from 'react';
import { AlertCircle, Check, ChevronRight } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface ScenarioFeedback {
  correct: string;
  incorrect: string;
}

interface QuizScenario {
  id: number;
  title: string;
  description: string;
  question: string;
  options: QuizOption[];
  feedback: ScenarioFeedback;
  reflectionPrompt: string;
}

interface ScenarioQuizEngineProps {
  scenarios: QuizScenario[];
  designChallenge: string;
  onComplete?: () => void;
}

export function ScenarioQuizEngine({ 
  scenarios, 
  designChallenge,
  onComplete 
}: ScenarioQuizEngineProps) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userReflections, setUserReflections] = useState<Record<number, string>>({});
  const [designReflection, setDesignReflection] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const currentScenario = scenarios[currentScenarioIndex];
  const progress = ((currentScenarioIndex) / scenarios.length) * 100;
  
  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };
  
  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswered) return;
    
    const selectedOptionObj = currentScenario.options.find(opt => opt.id === selectedOption);
    
    if (selectedOptionObj?.isCorrect) {
      setScore(score + 1);
    }
    
    setIsAnswered(true);
  };
  
  const handleNextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const handleReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserReflections({
      ...userReflections,
      [currentScenario.id]: e.target.value
    });
  };
  
  const handleDesignReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesignReflection(e.target.value);
  };
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };
  
  const isOptionCorrect = (optionId: string) => {
    if (!isAnswered) return false;
    return currentScenario.options.find(opt => opt.id === optionId)?.isCorrect || false;
  };
  
  const selectedOptionCorrect = () => {
    if (!selectedOption || !isAnswered) return false;
    return currentScenario.options.find(opt => opt.id === selectedOption)?.isCorrect || false;
  };
  
  if (quizCompleted) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-amber-50">
          <h2 className="text-2xl font-bold text-amber-800 mb-2">
            Knowledge Test Results
          </h2>
          
          <div className="text-center py-6">
            <div className="text-4xl font-bold text-amber-600 mb-2">
              {score} / {scenarios.length}
            </div>
            <p className="text-gray-700 mb-8">
              {score === scenarios.length 
                ? 'Perfect score! You have a strong understanding of fiat currency risks and alternatives.'
                : score > scenarios.length / 2
                ? 'Good job! You understand many key concepts about monetary freedom.'
                : 'There\'s more to learn about monetary sovereignty and freedom.'}
            </p>
            
            {/* Design challenge reflection */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="font-semibold text-amber-800 mb-4">
                Design Challenge
              </h3>
              <p className="text-gray-700 mb-4">
                {designChallenge}
              </p>
              <textarea
                className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[100px]"
                placeholder="Your thoughts on designing a monetary system that can't be weaponized..."
                value={designReflection}
                onChange={handleDesignReflectionChange}
              ></textarea>
            </div>
            
            {/* Answers review */}
            <div className="text-left">
              <h3 className="font-semibold text-amber-800 mb-4">
                Review Your Answers
              </h3>
              
              <div className="space-y-6">
                {scenarios.map((scenario, index) => (
                  <div key={scenario.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-amber-700 mb-2">
                      {index + 1}. {scenario.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">{scenario.question}</p>
                    
                    <div className="pl-4 border-l-2 border-amber-200">
                      <p className="text-sm text-amber-800 font-medium">Correct Answer:</p>
                      <p className="text-gray-700">
                        {scenario.options.find(opt => opt.isCorrect)?.text}
                      </p>
                    </div>
                    
                    {userReflections[scenario.id] && (
                      <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                        <p className="text-sm text-amber-800 font-medium">Your Reflection:</p>
                        <p className="text-gray-700 text-sm">{userReflections[scenario.id]}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <button
              className="mt-8 py-3 px-6 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              onClick={handleComplete}
            >
              Complete Knowledge Test
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-amber-50">
        <h2 className="text-2xl font-bold text-amber-800 mb-2">
          Knowledge Test: Fiat vs Freedom
        </h2>
        <p className="text-amber-700 mb-2">
          Apply your understanding of monetary systems to real-world scenarios.
        </p>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
          <div 
            className="h-full bg-amber-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Scenario */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="p-4 bg-amber-100 rounded-lg border-l-4 border-amber-500 mb-4">
            <h3 className="font-semibold text-amber-800 mb-1">
              Scenario {currentScenarioIndex + 1}: {currentScenario.title}
            </h3>
            <p className="text-gray-700 text-sm">
              {currentScenario.description}
            </p>
          </div>
          
          <div className="font-medium text-gray-800 mb-4">
            {currentScenario.question}
          </div>
          
          {/* Answer options */}
          <div className="space-y-3 mb-6">
            {currentScenario.options.map(option => (
              <div
                key={option.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  isAnswered
                    ? isOptionCorrect(option.id)
                      ? 'border-green-500 bg-green-50'
                      : selectedOption === option.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 opacity-70'
                    : selectedOption === option.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <div className="flex">
                  {isAnswered && isOptionCorrect(option.id) && (
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{option.text}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Feedback after answering */}
          {isAnswered && (
            <div 
              className={`p-4 rounded-lg mb-4 ${
                selectedOptionCorrect() ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <div className="flex">
                {selectedOptionCorrect() ? (
                  <Check size={18} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                ) : (
                  <AlertCircle size={18} className="text-red-600 mr-2 flex-shrink-0 mt-1" />
                )}
                <div>
                  <p className={selectedOptionCorrect() ? 'text-green-800' : 'text-red-800'}>
                    {selectedOptionCorrect() 
                      ? currentScenario.feedback.correct
                      : currentScenario.feedback.incorrect}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Reflection textarea */}
          {isAnswered && (
            <div className="mb-4">
              <h4 className="font-medium text-amber-700 mb-2">Reflection</h4>
              <p className="text-gray-600 text-sm mb-3">
                {currentScenario.reflectionPrompt}
              </p>
              <textarea
                className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="Share your thoughts..."
                value={userReflections[currentScenario.id] || ''}
                onChange={handleReflectionChange}
                rows={3}
              ></textarea>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex justify-center">
            {!isAnswered ? (
              <button
                className={`py-3 px-6 rounded-lg font-semibold transition-colors ${
                  selectedOption
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleSubmitAnswer}
                disabled={!selectedOption}
              >
                Submit Answer
              </button>
            ) : (
              <button
                className="py-3 px-6 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                onClick={handleNextScenario}
              >
                {currentScenarioIndex < scenarios.length - 1 ? (
                  <>
                    Next Scenario <ChevronRight size={18} className="inline ml-1" />
                  </>
                ) : (
                  'See Results'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}