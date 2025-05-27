import React, { useState } from 'react';
import { ThemeHeading, GradientButton, OutlineButton } from './theme';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

interface QuizProps {
  quiz: {
    title: string;
    description: string;
    questions: Question[];
  };
  themeClasses: {
    bg: string;
    text: string;
    accent: string;
    cardBg: string;
  };
  onComplete: () => void;
}

export function Quiz({ quiz, themeClasses, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  const handleOptionSelect = (questionId: number, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  const isAnswerCorrect = (questionId: number) => {
    const selectedOption = selectedOptions[questionId];
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question || !selectedOption) return false;
    
    return question.options.find(o => o.id === selectedOption)?.isCorrect || false;
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      const correctAnswers = quiz.questions.filter(q => isAnswerCorrect(q.id)).length;
      const scorePercentage = Math.round((correctAnswers / quiz.questions.length) * 100);
      setScore(scorePercentage);
      setShowResults(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitted(true);
  };
  
  return (
    <div className={`${themeClasses.cardBg} border ${themeClasses.accent}/20 rounded-lg p-6`}>
      {!showResults ? (
        <>
          <div className="mb-6">
            <ThemeHeading level={2} className="mb-3">Final Quiz</ThemeHeading>
            <h3 className={`${themeClasses.text} font-bold text-xl mb-3`}>{quiz.title}</h3>
            <p className="text-lightText/90 mb-6">{quiz.description}</p>
            
            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-800 rounded-full h-1.5 mr-3">
                <div 
                  className="bg-primary h-1.5 rounded-full" 
                  style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-lightText/60">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
            </div>
          </div>
          
          <div className="bg-darkBg/30 rounded-lg p-4 mb-6">
            <h4 className="text-lg font-medium text-lightText/90 mb-4">{currentQuestion.text}</h4>
            
            <div className="space-y-3">
              {currentQuestion.options.map(option => (
                <div 
                  key={option.id}
                  onClick={() => !isSubmitted && handleOptionSelect(currentQuestion.id, option.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    isSubmitted
                      ? option.isCorrect 
                        ? 'border-green-500 bg-green-900/20' 
                        : selectedOptions[currentQuestion.id] === option.id 
                          ? 'border-red-500 bg-red-900/20' 
                          : 'border-secondary/20'
                      : selectedOptions[currentQuestion.id] === option.id
                        ? 'border-primary bg-primary/10' 
                        : 'border-secondary/20 hover:border-secondary/40'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                      isSubmitted
                        ? option.isCorrect 
                          ? 'border-green-500' 
                          : selectedOptions[currentQuestion.id] === option.id 
                            ? 'border-red-500' 
                            : 'border-secondary/40'
                        : selectedOptions[currentQuestion.id] === option.id
                          ? 'border-primary' 
                          : 'border-secondary/40'
                    }`}>
                      {(isSubmitted && option.isCorrect) && (
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      )}
                      {(!isSubmitted && selectedOptions[currentQuestion.id] === option.id) && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-lightText/90">{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {isSubmitted && currentQuestion.explanation && (
              <div className="mt-4 p-3 bg-darkBg/50 rounded-lg border border-secondary/20">
                <h5 className="font-medium text-primary mb-1">Explanation:</h5>
                <p className="text-lightText/80 text-sm">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <OutlineButton 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Previous
            </OutlineButton>
            
            {isSubmitted ? (
              <GradientButton onClick={handleNext}>
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'View Results'}
              </GradientButton>
            ) : (
              <GradientButton onClick={handleSubmit}>
                Submit Answer
              </GradientButton>
            )}
          </div>
        </>
      ) : (
        // Quiz Results
        <div className="text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-4xl text-primary">
                {score >= 70 ? '🎉' : score >= 50 ? '👍' : '🔄'}
              </span>
            </div>
            <ThemeHeading level={2} className="mb-3">Quiz Complete!</ThemeHeading>
            <p className={`${themeClasses.text} text-lg mb-3`}>
              Your Score: <span className="font-bold text-primary">{score}%</span>
            </p>
            <p className="text-lightText/90 mb-6">
              {score >= 70 
                ? "Great job! You've mastered this material."
                : score >= 50 
                  ? "Good work! You're making progress."
                  : "Keep learning! Try reviewing the material again."}
            </p>
          </div>
          
          <div className="bg-darkBg/30 rounded-lg p-4 mb-6">
            <h4 className={`${themeClasses.text} font-bold mb-3`}>Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-darkBg/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{quiz.questions.length}</div>
                <div className="text-sm text-lightText/70">Total Questions</div>
              </div>
              <div className="bg-darkBg/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {quiz.questions.filter(q => isAnswerCorrect(q.id)).length}
                </div>
                <div className="text-sm text-lightText/70">Correct Answers</div>
              </div>
              <div className="bg-darkBg/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">
                  {quiz.questions.filter(q => !isAnswerCorrect(q.id)).length}
                </div>
                <div className="text-sm text-lightText/70">Incorrect Answers</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <GradientButton onClick={onComplete}>
              Complete Mission
            </GradientButton>
          </div>
        </div>
      )}
    </div>
  );
}