
import React, { useState } from 'react';

export default function AfricaQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const questions = [
    {
      question: "What advantage does Bitcoin offer for cross-border remittances in Africa?",
      options: [
        "Lower fees than traditional services",
        "Faster transaction times",
        "No need for bank accounts",
        "All of the above"
      ],
      correct: 3
    },
    {
      question: "How does the Lightning Network benefit African merchants?",
      options: [
        "Instant settlement of payments",
        "Very low transaction fees",
        "Works well with mobile phones",
        "All of the above"
      ],
      correct: 3
    }
  ];

  return (
    <div className="bg-black/30 p-6 rounded-xl">
      <h3 className="text-2xl font-bold text-rose-500 mb-4">Knowledge Check</h3>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="bg-black/20 p-4 rounded-lg">
            <p className="text-gray-200 mb-3">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, j) => (
                <button
                  key={j}
                  className="w-full text-left p-2 rounded bg-rose-900/30 hover:bg-rose-900/50 transition-colors"
                  onClick={() => setCurrentQuestion(i + 1)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
