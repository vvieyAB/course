import React, { useState } from 'react';
import { ThemeHeading, GradientButton } from './theme';

interface ChallengeProps {
  challenge: {
    title: string;
    description: string;
    type: 'multiple-choice' | 'matching' | 'simulation';
    options?: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback?: string;
    }[];
    matchingPairs?: {
      left: string;
      right: string;
    }[];
    simulationSteps?: {
      instruction: string;
      inputType: 'text' | 'number' | 'select';
      options?: string[];
      correctValue: string;
      feedback: string;
    }[];
  };
  themeClasses: {
    bg: string;
    text: string;
    accent: string;
    cardBg: string;
  };
  onComplete: () => void;
}

export function Challenge({ challenge, themeClasses, onComplete }: ChallengeProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);
  const [matchingSelections, setMatchingSelections] = useState<Record<string, string>>({});
  const [simulationInputs, setSimulationInputs] = useState<string[]>([]);
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };
  
  const handleMatchingSelect = (leftItem: string, rightItem: string) => {
    setMatchingSelections(prev => ({
      ...prev,
      [leftItem]: rightItem
    }));
  };
  
  const handleSimulationInput = (stepIndex: number, value: string) => {
    const newInputs = [...simulationInputs];
    newInputs[stepIndex] = value;
    setSimulationInputs(newInputs);
  };
  
  const checkAnswer = () => {
    if (challenge.type === 'multiple-choice' && selectedOption && challenge.options) {
      const selectedOpt = challenge.options.find(opt => opt.id === selectedOption);
      if (selectedOpt) {
        setIsCorrect(selectedOpt.isCorrect);
        setFeedback(selectedOpt.feedback || (selectedOpt.isCorrect ? 'Correct! Good job.' : 'Not quite right. Try again.'));
      }
    } else if (challenge.type === 'matching' && challenge.matchingPairs) {
      const allCorrect = challenge.matchingPairs.every(pair => 
        matchingSelections[pair.left] === pair.right
      );
      setIsCorrect(allCorrect);
      setFeedback(allCorrect ? 'All matched correctly!' : 'Some matches are incorrect. Try again.');
    } else if (challenge.type === 'simulation' && challenge.simulationSteps) {
      const step = challenge.simulationSteps[currentStep];
      const isStepCorrect = simulationInputs[currentStep] === step.correctValue;
      setIsCorrect(isStepCorrect);
      setFeedback(isStepCorrect ? 'Correct!' : step.feedback);
      
      if (isStepCorrect && currentStep < challenge.simulationSteps.length - 1) {
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setIsCorrect(null);
          setFeedback('');
        }, 1500);
      }
    }
  };
  
  const handleContinue = () => {
    if (isCorrect) {
      onComplete();
    } else {
      // Reset for retry
      setSelectedOption(null);
      setIsCorrect(null);
      setFeedback('');
    }
  };
  
  return (
    <div className={`${themeClasses.cardBg} border ${themeClasses.accent}/20 rounded-lg p-6`}>
      <div className="mb-6">
        <ThemeHeading level={2} className="mb-3">Challenge</ThemeHeading>
        <h3 className={`${themeClasses.text} font-bold text-xl mb-3`}>{challenge.title}</h3>
        <p className="text-lightText/90 mb-6">{challenge.description}</p>
      </div>
      
      <div className="bg-darkBg/30 rounded-lg p-4 mb-6">
        {/* Multiple Choice Challenge */}
        {challenge.type === 'multiple-choice' && challenge.options && (
          <div className="space-y-3">
            {challenge.options.map(option => (
              <div 
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedOption === option.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-secondary/20 hover:border-secondary/40'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                    selectedOption === option.id ? 'border-primary' : 'border-secondary/40'
                  }`}>
                    {selectedOption === option.id && (
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="text-lightText/90">{option.text}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Matching Challenge */}
        {challenge.type === 'matching' && challenge.matchingPairs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className={`${themeClasses.text} font-bold mb-2`}>Item</h4>
              {challenge.matchingPairs.map((pair, idx) => (
                <div key={idx} className="p-3 bg-darkBg/50 rounded-lg border border-secondary/20">
                  {pair.left}
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <h4 className={`${themeClasses.text} font-bold mb-2`}>Match with</h4>
              {challenge.matchingPairs.map((pair, idx) => (
                <select
                  key={idx}
                  value={matchingSelections[pair.left] || ''}
                  onChange={(e) => handleMatchingSelect(pair.left, e.target.value)}
                  className="w-full p-3 bg-darkBg/50 rounded-lg border border-secondary/20 text-lightText/90"
                >
                  <option value="">Select a match</option>
                  {challenge.matchingPairs?.map((p, i) => (
                    <option key={i} value={p.right}>{p.right}</option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        )}
        
        {/* Simulation Challenge */}
        {challenge.type === 'simulation' && challenge.simulationSteps && (
          <div className="space-y-4">
            <div className="p-4 bg-darkBg/50 rounded-lg border border-secondary/20">
              <h4 className={`${themeClasses.text} font-bold mb-2`}>Step {currentStep + 1} of {challenge.simulationSteps.length}</h4>
              <p className="text-lightText/90 mb-4">{challenge.simulationSteps[currentStep].instruction}</p>
              
              {challenge.simulationSteps[currentStep].inputType === 'text' && (
                <input
                  type="text"
                  value={simulationInputs[currentStep] || ''}
                  onChange={(e) => handleSimulationInput(currentStep, e.target.value)}
                  className="w-full p-3 bg-darkBg/70 rounded-lg border border-secondary/20 text-lightText/90"
                  placeholder="Enter your answer"
                />
              )}
              
              {challenge.simulationSteps[currentStep].inputType === 'number' && (
                <input
                  type="number"
                  value={simulationInputs[currentStep] || ''}
                  onChange={(e) => handleSimulationInput(currentStep, e.target.value)}
                  className="w-full p-3 bg-darkBg/70 rounded-lg border border-secondary/20 text-lightText/90"
                  placeholder="Enter a number"
                />
              )}
              
              {challenge.simulationSteps[currentStep].inputType === 'select' && (
                <select
                  value={simulationInputs[currentStep] || ''}
                  onChange={(e) => handleSimulationInput(currentStep, e.target.value)}
                  className="w-full p-3 bg-darkBg/70 rounded-lg border border-secondary/20 text-lightText/90"
                >
                  <option value="">Select an option</option>
                  {challenge.simulationSteps[currentStep].options?.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="flex items-center">
              <div className="w-full bg-gray-800 rounded-full h-1.5 mr-3">
                <div 
                  className="bg-primary h-1.5 rounded-full" 
                  style={{ width: `${((currentStep + 1) / challenge.simulationSteps.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-lightText/60">
                {Math.round(((currentStep + 1) / challenge.simulationSteps.length) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Feedback Area */}
      {isCorrect !== null && (
        <div className={`mb-6 p-4 rounded-lg ${
          isCorrect ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'
        }`}>
          <p className={isCorrect ? 'text-green-300' : 'text-red-300'}>
            {feedback}
          </p>
        </div>
      )}
      
      <div className="flex justify-between">
        <button 
          onClick={() => onComplete()} 
          className="text-lightText/60 hover:text-lightText/90"
        >
          Skip Challenge
        </button>
        
        {isCorrect === null ? (
          <GradientButton onClick={checkAnswer}>
            Check Answer
          </GradientButton>
        ) : (
          <GradientButton onClick={handleContinue}>
            {isCorrect 
              ? (challenge.type === 'simulation' && currentStep === (challenge.simulationSteps?.length || 0) - 1) || challenge.type !== 'simulation'
                ? 'Continue to Quiz' 
                : 'Next Step'
              : 'Try Again'
            }
          </GradientButton>
        )}
      </div>
    </div>
  );
}