import { useState } from 'react';
import { Question } from '@/lib/realm1-missions';

interface QuizChallengeProps {
  questions: Question[];
  onComplete?: () => void;
}

export function QuizChallenge({ questions = [], onComplete }: QuizChallengeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Calculate progress
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return; // Prevent changing answer when explanation is shown

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex,
    });
  };

  // Check if answer is correct
  const checkAnswer = () => {
    const selectedAnswerIndex = selectedAnswers[currentQuestionIndex];
    const isCorrect = currentQuestion.answers[selectedAnswerIndex].isCorrect;

    setShowExplanation(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  // Go to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      // Quiz complete
      setIsComplete(true);
    }
  };

  // Calculate final score percentage
  const scorePercentage = (score / questions.length) * 100;

  // Handle quiz completion
  const handleComplete = () => {
    if (onComplete) onComplete();
  };

  if (isComplete) {
    return (
      <div className="bg-amber-50 bg-opacity-40 rounded-xl p-6">
        <h3 className="text-center text-xl font-semibold text-amber-900 mb-2">
          Quiz Results
        </h3>

        <div className="mb-6 text-center">
          <div className="inline-block rounded-full overflow-hidden p-2 bg-white mb-4">
            <div 
              className={`rounded-full p-8 ${
                scorePercentage >= 80 
                  ? 'bg-green-100' 
                  : scorePercentage >= 60 
                    ? 'bg-amber-100' 
                    : 'bg-red-100'
              }`}
            >
              <div className="text-5xl font-bold mb-1">
                {score}/{questions.length}
              </div>
              <div className="text-xl">
                {scorePercentage}%
              </div>
            </div>
          </div>

          <div className="font-semibold text-lg mb-1">
            {scorePercentage >= 80 
              ? 'Great job!' 
              : scorePercentage >= 60 
                ? 'Good effort!' 
                : 'Keep learning!'}
          </div>
          <p className="text-gray-700">
            {scorePercentage >= 80 
              ? 'You have a solid understanding of this topic.' 
              : scorePercentage >= 60 
                ? 'You\'re on the right track, but could use some more practice.' 
                : 'This topic might need a bit more study.'}
          </p>
        </div>

        {/* Answer review */}
        <div className="mb-6">
          <h4 className="font-semibold text-amber-900 mb-3">Your Answers:</h4>
          <div className="bg-white rounded-lg p-4 space-y-4">
            {questions.map((question, index) => {
              const selectedAnswerIndex = selectedAnswers[index] ?? -1;
              const selectedAnswer = selectedAnswerIndex !== -1 
                ? question.answers[selectedAnswerIndex] 
                : null;
              const correctAnswerIndex = question.answers.findIndex(a => a.isCorrect);
              const isCorrect = selectedAnswer?.isCorrect ?? false;

              return (
                <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="font-medium mb-1">{index + 1}. {question.text}</div>
                  <div className={`${isCorrect ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    {isCorrect ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    {selectedAnswer 
                      ? `You selected: ${selectedAnswer.text}` 
                      : 'You did not answer this question.'}
                  </div>
                  {!isCorrect && (
                    <div className="text-green-700 text-sm mt-1">
                      Correct answer: {question.answers[correctAnswerIndex].text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <button
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            onClick={handleComplete}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return <div>No quiz questions available</div>;
  }

  return (
    <div className="bg-amber-50 bg-opacity-40 rounded-xl p-6">
      <h3 className="text-center text-xl font-semibold text-amber-900 mb-2">
        Knowledge Check
      </h3>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-amber-800 mb-1">
          <div>Question {currentQuestionIndex + 1} of {questions.length}</div>
          <div>Score: {score}/{currentQuestionIndex}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-amber-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="font-semibold text-lg mb-4">{currentQuestion.text}</div>
        <div className="space-y-3">
          {currentQuestion.answers.map((answer, index) => (
            <div 
              key={index} 
              className={`p-3 border rounded-lg cursor-pointer ${
                selectedAnswers[currentQuestionIndex] === index
                  ? showExplanation
                    ? answer.isCorrect
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-amber-100 border-amber-500'
                  : showExplanation && answer.isCorrect
                    ? 'bg-green-100 border-green-500'
                    : 'bg-white border-gray-300 hover:bg-amber-50'
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? showExplanation
                        ? answer.isCorrect
                          ? 'border-green-600 bg-green-600 text-white'
                          : 'border-red-600 bg-red-600 text-white'
                        : 'border-amber-600 bg-amber-600 text-white'
                      : showExplanation && answer.isCorrect
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-400'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className={`${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'font-medium'
                      : ''
                  }`}>
                    {answer.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`mb-6 p-4 rounded-lg ${
          currentQuestion.answers[selectedAnswers[currentQuestionIndex]].isCorrect
            ? 'bg-green-100'
            : 'bg-red-100'
        }`}>
          <div className={`font-semibold mb-1 ${
            currentQuestion.answers[selectedAnswers[currentQuestionIndex]].isCorrect
              ? 'text-green-800'
              : 'text-red-800'
          }`}>
            {currentQuestion.answers[selectedAnswers[currentQuestionIndex]].isCorrect
              ? 'Correct!'
              : 'Incorrect!'}
          </div>
          <p className="text-gray-700">
            {currentQuestion.answers[selectedAnswers[currentQuestionIndex]].explanation || currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!showExplanation ? (
          <button
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            onClick={checkAnswer}
            disabled={selectedAnswers[currentQuestionIndex] === undefined}
          >
            Check Answer
          </button>
        ) : (
          <button
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            onClick={nextQuestion}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}