import React from 'react';

interface LessonCardProps {
  lesson: {
    title: string;
    content: string;
    imageUrl?: string;
    hasTable?: boolean;
    table?: {
      headers: string[];
      rows: string[][];
    };
  };
  themeClasses: {
    bg: string;
    text: string;
    accent: string;
    cardBg: string;
  };
}

export function LessonCard({ lesson, themeClasses }: LessonCardProps) {
  return (
    <div className={`${themeClasses.cardBg} border ${themeClasses.accent}/20 rounded-lg overflow-hidden`}>
      <div className="p-6">
        <h2 className={`${themeClasses.text} font-bold text-xl mb-4`}>{lesson.title}</h2>
        
        {lesson.imageUrl && (
          <div className="mb-4">
            <img 
              src={lesson.imageUrl} 
              alt={lesson.title}
              className="w-full rounded-lg object-cover max-h-64"
            />
          </div>
        )}
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lightText/90">{lesson.content}</p>
          
          {lesson.hasTable && lesson.table && (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-darkBg/70 border-b border-secondary/20">
                    {lesson.table.headers.map((header, index) => (
                      <th 
                        key={index} 
                        className="px-4 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lesson.table.rows.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? 'bg-darkBg/30' : 'bg-darkBg/10'}
                    >
                      {row.map((cell, cellIndex) => (
                        <td 
                          key={cellIndex}
                          className="px-4 py-3 text-sm text-lightText/80 border-b border-secondary/10"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}