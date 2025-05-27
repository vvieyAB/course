import { useState } from 'react';
import { Code, Radio, Podcast, Lightbulb, DropletIcon, Cpu, Shapes, Globe, ArrowRight, Check } from 'lucide-react';

interface BuildersProps {
  onComplete: () => void;
}

interface BuilderProject {
  id: string;
  title: string;
  location: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  impact: string[];
  challenges: string[];
  quiz: {
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
  };
}

export default function Builders({ onComplete }: BuildersProps) {
  // Define the builder projects
  const builderProjects: BuilderProject[] = [
    {
      id: 'podcasts',
      title: 'Bitcoin Educators',
      location: 'Zambia',
      description: 'In Zambia, a group of Bitcoin enthusiasts launched a podcast network that produces educational content in local languages. These podcasts explain Bitcoin concepts in accessible terms, relating them to local experiences and needs. This grassroots education initiative has reached thousands of listeners across the country.',
      icon: <Podcast className="h-6 w-6" />,
      imageUrl: '/projects/zambia-podcast.jpg',
      impact: [
        'Increased Bitcoin literacy among local populations',
        'Created employment opportunities for content creators',
        'Connected Zambian Bitcoin users to the global community',
        'Reduced vulnerability to scams through better education'
      ],
      challenges: [
        'Limited internet access in rural areas',
        'Translating technical concepts into local languages',
        'Building trust in communities with limited financial education',
        'Sustaining the project through Bitcoin-based funding models'
      ],
      quiz: {
        question: "What is the primary value of Bitcoin podcasts in local languages?",
        options: [
          {
            id: 'accessibility',
            text: "They make Bitcoin knowledge accessible to people who don't speak English and relate concepts to local contexts",
            isCorrect: true
          },
          {
            id: 'entertainment',
            text: "They provide entertainment value more than educational value",
            isCorrect: false
          },
          {
            id: 'profit',
            text: "They primarily generate profit for the creators",
            isCorrect: false
          },
          {
            id: 'investment',
            text: "They focus exclusively on investment advice",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: 'mining',
      title: 'Hydro-Powered Mining',
      location: 'Democratic Republic of Congo',
      description: 'In the Congo, innovators are harnessing abundant hydroelectric power to mine Bitcoin sustainably. By utilizing excess capacity from small-scale hydro plants, these operations provide economic stability to regions with unreliable power grids, creating jobs while minimizing environmental impact.',
      icon: <DropletIcon className="h-6 w-6" />,
      imageUrl: '/projects/congo-mining.jpg',
      impact: [
        'Created sustainable energy-based employment',
        'Monetized previously wasted energy capacity',
        'Provided economic stability in volatile regions',
        'Demonstrated environmentally responsible mining practices'
      ],
      challenges: [
        'Securing mining equipment in remote locations',
        'Maintaining operations during political instability',
        'Building reliable internet connectivity',
        'Managing relationships with local communities and authorities'
      ],
      quiz: {
        question: "Why is hydroelectric power ideal for Bitcoin mining in Africa?",
        options: [
          {
            id: 'sustainable',
            text: "It harnesses renewable energy sources that are often underutilized, creating economic value without environmental harm",
            isCorrect: true
          },
          {
            id: 'cheap',
            text: "It's simply cheaper than any other power source",
            isCorrect: false
          },
          {
            id: 'easy',
            text: "It's easier to set up than solar power",
            isCorrect: false
          },
          {
            id: 'popular',
            text: "It's more popular among investors",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: 'education',
      title: 'Bitcoin Developer Hubs',
      location: 'Ghana and Nigeria',
      description: 'Technology hubs in Accra and Lagos have established specialized Bitcoin and blockchain education programs. These centers offer training in Bitcoin protocol development, application building, and entrepreneurship, fostering the next generation of African Bitcoin developers and startups.',
      icon: <Code className="h-6 w-6" />,
      imageUrl: '/projects/ghana-hub.jpg',
      impact: [
        'Trained hundreds of blockchain developers',
        'Launched several successful Bitcoin startups',
        'Created pathways to remote work opportunities',
        'Increased African representation in Bitcoin open source development'
      ],
      challenges: [
        'Limited access to funding for early-stage Bitcoin startups',
        'Brain drain as talented developers are recruited internationally',
        'Adapting rapidly evolving technical content to local contexts',
        'Balancing theoretical education with practical application development'
      ],
      quiz: {
        question: "What are education hubs in Ghana and Nigeria primarily developing?",
        options: [
          {
            id: 'talent',
            text: "Local technical talent who can build Bitcoin applications and contribute to the ecosystem",
            isCorrect: true
          },
          {
            id: 'hardware',
            text: "Mining hardware specifically designed for Africa",
            isCorrect: false
          },
          {
            id: 'marketing',
            text: "Marketing strategies to sell Bitcoin",
            isCorrect: false
          },
          {
            id: 'regulation',
            text: "Regulatory frameworks for governments",
            isCorrect: false
          }
        ]
      }
    }
  ];
  
  // Component state
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'info' | 'impact' | 'challenges' | 'quiz'>('info');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // Get current project
  const currentProject = builderProjects[currentProjectIndex];
  
  // Handle quiz answer selection
  const selectAnswer = (optionId: string) => {
    if (isCorrect !== null) return;
    setSelectedOption(optionId);
  };
  
  // Submit answer
  const submitAnswer = () => {
    if (!selectedOption) return;
    
    const option = currentProject.quiz.options.find(opt => opt.id === selectedOption);
    if (!option) return;
    
    setIsCorrect(option.isCorrect);
    
    if (option.isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };
  
  // Move to next project
  const nextProject = () => {
    if (currentProjectIndex < builderProjects.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
      setViewMode('info');
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      // All projects completed
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
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
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Project {currentProjectIndex + 1} of {builderProjects.length}</span>
          <span>{Math.round((currentProjectIndex / builderProjects.length) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-rose-600 transition-all duration-300"
            style={{ width: `${(currentProjectIndex / builderProjects.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Project navigation bar */}
      <div className="flex items-center space-x-2 pb-3 overflow-x-auto">
        {builderProjects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => {
              setCurrentProjectIndex(index);
              setViewMode('info');
              setSelectedOption(null);
              setIsCorrect(null);
            }}
            className={`flex items-center px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              index === currentProjectIndex
                ? 'bg-rose-900/30 text-rose-400 border border-rose-800'
                : 'bg-gray-800/50 text-gray-400 border border-gray-800 hover:bg-gray-800'
            }`}
          >
            {project.icon}
            <span className="ml-2 text-sm font-medium">{project.title}</span>
          </button>
        ))}
      </div>
      
      {/* Project content */}
      <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 bg-gray-900/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-rose-900/30 p-2 rounded-lg mr-3">
                {currentProject.icon}
              </div>
              <div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-400">{currentProject.location}</span>
                </div>
                <h3 className="text-xl font-semibold text-rose-400">{currentProject.title}</h3>
              </div>
            </div>
            
            <div className="flex space-x-1">
              <button
                onClick={() => setViewMode('info')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  viewMode === 'info'
                    ? 'bg-rose-900/40 text-rose-300'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Info
              </button>
              <button
                onClick={() => setViewMode('impact')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  viewMode === 'impact'
                    ? 'bg-rose-900/40 text-rose-300'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Impact
              </button>
              <button
                onClick={() => setViewMode('challenges')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  viewMode === 'challenges'
                    ? 'bg-rose-900/40 text-rose-300'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Challenges
              </button>
              <button
                onClick={() => setViewMode('quiz')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  viewMode === 'quiz'
                    ? 'bg-rose-900/40 text-rose-300'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Quiz
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          {/* Info View */}
          {viewMode === 'info' && (
            <div>
              <p className="text-gray-300 mb-6">{currentProject.description}</p>
              
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <Shapes className="h-12 w-12 text-gray-600" />
                <span className="ml-2 text-gray-500">Project image placeholder</span>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setViewMode('impact')}
                  className="flex items-center text-sm text-rose-400 hover:text-rose-300"
                >
                  See Impact <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
          
          {/* Impact View */}
          {viewMode === 'impact' && (
            <div>
              <h4 className="text-lg font-medium text-rose-400 mb-4">Project Impact</h4>
              
              <ul className="space-y-3 mb-6">
                {currentProject.impact.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-green-900/30 p-1 rounded-full mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setViewMode('challenges')}
                  className="flex items-center text-sm text-rose-400 hover:text-rose-300"
                >
                  See Challenges <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
          
          {/* Challenges View */}
          {viewMode === 'challenges' && (
            <div>
              <h4 className="text-lg font-medium text-rose-400 mb-4">Project Challenges</h4>
              
              <ul className="space-y-3 mb-6">
                {currentProject.challenges.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-amber-900/30 p-1 rounded-full mr-3 mt-0.5">
                      <Lightbulb className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setViewMode('quiz')}
                  className="flex items-center text-sm text-rose-400 hover:text-rose-300"
                >
                  Knowledge Check <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
          
          {/* Quiz View */}
          {viewMode === 'quiz' && (
            <div>
              <h4 className="text-lg font-medium text-rose-400 mb-4">Knowledge Check</h4>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 mb-6">
                <p className="text-gray-300 text-sm mb-0">{currentProject.quiz.question}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {currentProject.quiz.options.map((option) => {
                  let optionClass = '';
                  
                  if (isCorrect !== null) {
                    if (option.isCorrect) {
                      optionClass = 'border-green-500 bg-green-900/20';
                    } else if (selectedOption === option.id) {
                      optionClass = 'border-red-500 bg-red-900/20';
                    } else {
                      optionClass = 'border-gray-700 bg-black/30';
                    }
                  } else {
                    optionClass = selectedOption === option.id
                      ? 'border-rose-500 bg-rose-900/20'
                      : 'border-gray-700 bg-black/30 hover:border-gray-600';
                  }
                  
                  return (
                    <div
                      key={option.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${optionClass}`}
                      onClick={() => selectAnswer(option.id)}
                    >
                      <div className="flex items-start">
                        <Radio 
                          className={`h-5 w-5 mr-3 flex-shrink-0 ${
                            selectedOption === option.id
                              ? 'text-rose-400'
                              : 'text-gray-500'
                          }`}
                        />
                        <span className="text-gray-300">{option.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {isCorrect === null ? (
                <div className="flex justify-center">
                  <button
                    onClick={submitAnswer}
                    disabled={!selectedOption}
                    className={`px-5 py-2 rounded-lg transition-colors ${
                      !selectedOption
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-rose-600 text-white hover:bg-rose-700'
                    }`}
                  >
                    Submit Answer
                  </button>
                </div>
              ) : (
                <div>
                  <div className={`p-4 rounded-lg mb-6 ${
                    isCorrect
                      ? 'bg-green-900/20 border border-green-700'
                      : 'bg-red-900/20 border border-red-700'
                  }`}>
                    <p className={`font-medium mb-1 ${
                      isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isCorrect ? 'Correct!' : 'Not quite right.'}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {isCorrect
                        ? `You understand the key value of ${currentProject.title} in ${currentProject.location}.`
                        : `The correct answer highlights the primary impact of ${currentProject.title} in ${currentProject.location}.`}
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={nextProject}
                      className="px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center"
                    >
                      {currentProjectIndex < builderProjects.length - 1 ? (
                        <>Next Project <ArrowRight className="ml-2 h-4 w-4" /></>
                      ) : (
                        <>Complete Learning</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Completion message */}
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Learning Complete!</h3>
          <p className="text-gray-300">
            You've learned about Bitcoin builders across Africa. You correctly answered {correctAnswers} out of {builderProjects.length} questions.
          </p>
        </div>
      )}
    </div>
  );
}