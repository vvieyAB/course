import { useState } from 'react';

interface ReflectionExerciseProps {
  question: string;
  onComplete?: () => void;
}

export function ReflectionExercise({ question, onComplete }: ReflectionExerciseProps) {
  const [reflection, setReflection] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const minReflectionLength = 50;
  
  // Handle reflection change
  const handleReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReflection(e.target.value);
  };
  
  // Submit the reflection
  const submitReflection = () => {
    if (reflection.length >= minReflectionLength) {
      setIsSubmitted(true);
    }
  };
  
  // Complete the exercise
  const completeExercise = () => {
    if (onComplete) onComplete();
  };
  
  return (
    <div className="bg-amber-50 bg-opacity-40 rounded-xl p-6">
      <h3 className="text-center text-xl font-semibold text-amber-900 mb-2">
        Reflection Exercise
      </h3>
      
      <div className="mb-6 p-4 bg-amber-100 border-l-4 border-amber-600 rounded-r-lg">
        <p className="text-amber-900">{question}</p>
      </div>
      
      {!isSubmitted ? (
        <div>
          <div className="mb-4">
            <textarea
              className="w-full h-48 p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Type your reflection here..."
              value={reflection}
              onChange={handleReflectionChange}
            ></textarea>
            <div className="text-sm text-gray-600 mt-1">
              Minimum {minReflectionLength} characters. Currently: {reflection.length} 
              {reflection.length < minReflectionLength && reflection.length > 0 && (
                <span className="text-amber-600"> (need {minReflectionLength - reflection.length} more)</span>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              className={`px-6 py-2 rounded-lg transition-colors ${
                reflection.length >= minReflectionLength
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={submitReflection}
              disabled={reflection.length < minReflectionLength}
            >
              Submit Reflection
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-white rounded-lg p-4 mb-6 border border-amber-200">
            <h4 className="font-medium text-amber-900 mb-2">Your Reflection:</h4>
            <div className="prose prose-amber max-w-none">
              <p className="whitespace-pre-wrap">{reflection}</p>
            </div>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg mb-6 border-l-4 border-green-600">
            <h4 className="font-bold text-green-800 mb-1">Great job!</h4>
            <p className="text-green-700">
              Taking time to reflect on your learning helps solidify your understanding and connect concepts to your personal experience.
            </p>
          </div>
          
          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              onClick={completeExercise}
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
}