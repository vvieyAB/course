import { useState, useEffect } from 'react';
import { AlertTriangle, Info, ChevronRight, ChevronDown, ArrowRight, Calendar, Users } from 'lucide-react';

interface FailedForksSimulatorProps {
  onComplete: () => void;
}

interface FailedFork {
  id: string;
  name: string;
  year: number;
  description: string;
  context: string;
  reasons: string[];
  stakeholders: {
    developers: string;
    miners: string;
    users: string;
    businesses: string;
  };
  lessons: string[];
  consequences: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export default function FailedForksSimulator({ onComplete }: FailedForksSimulatorProps) {
  // Data for failed forks
  const [forks] = useState<FailedFork[]>([
    {
      id: 'segwit2x',
      name: 'SegWit2x (NYA)',
      year: 2017,
      description: "SegWit2x was a proposed hard fork to increase Bitcoin's block size from 1MB to 2MB, following the activation of SegWit. It was part of the 'New York Agreement' signed by major Bitcoin businesses and miners.",
      context: "In May 2017, a group of Bitcoin businesses and miners representing about 83% of the network's hash power met in New York to find a compromise in the scaling debate. They agreed to implement SegWit first, followed by a hard fork to increase the block size to 2MB within six months. This became known as the New York Agreement (NYA).",
      reasons: [
        "Lack of developer support: Most Bitcoin Core developers opposed the hard fork, believing it was unnecessary and too rushed",
        "Community resistance: Much of the Bitcoin user community rejected an agreement made behind closed doors by large businesses",
        "Lack of replay protection: The proposal initially lacked proper replay protection, creating risk for users' funds",
        "Technical concerns: The timeline was considered too aggressive for the testing needed for a safe hard fork",
        "Philosophical disagreements: Many believed the initiative undermined Bitcoin's decentralized governance model"
      ],
      stakeholders: {
        developers: "Most Bitcoin Core developers opposed SegWit2x, with only a small team working on its implementation.",
        miners: "Initially, miners representing over 80% of hash power supported the proposal, but many withdrew support as opposition grew.",
        users: "Most vocal users on forums and social media opposed the hard fork, seeing it as a corporate takeover attempt.",
        businesses: "Major businesses like Coinbase, Bitpay, and several large miners initially supported the agreement but many later reversed position."
      },
      lessons: [
        "Closed-door agreements by a subset of stakeholders cannot override broader community consensus",
        "Technical consensus among developers is crucial for protocol changes",
        "Hard forks require extensive preparation, testing, and community buy-in",
        "Bitcoin's governance prioritizes conservative change and resistance to centralized decision-making"
      ],
      consequences: "The SegWit2x proposal was abandoned just days before its planned activation in November 2017. This demonstrated that even with substantial mining support, protocol changes cannot be forced without broader community consensus. It reinforced Bitcoin's resistance to centralized decision-making.",
      questions: [
        {
          question: "What was the main reason SegWit2x failed?",
          options: [
            "It was technically impossible to implement",
            "It lacked consensus from the broader Bitcoin community and developers",
            "The SEC ruled it illegal",
            "Miners didn't have the technical capability to support it"
          ],
          correctIndex: 1,
          explanation: "Despite having support from many large businesses and miners, SegWit2x failed because it couldn't achieve broad consensus from the wider Bitcoin community, especially developers. This demonstrated that Bitcoin's governance cannot be controlled by a small group of powerful stakeholders."
        },
        {
          question: "What key lesson about Bitcoin governance did the failure of SegWit2x teach?",
          options: [
            "Bitcoin governance is ultimately controlled by miners",
            "Protocol changes must come from the Bitcoin Foundation",
            "Closed-door agreements by industry leaders cannot override community consensus",
            "Technical changes should be implemented by executive decision"
          ],
          correctIndex: 2,
          explanation: "The failure of SegWit2x demonstrated that even when powerful business and mining interests agree on a change, they cannot force it through without broader community consensus. Bitcoin's governance is resistant to top-down decision making."
        }
      ]
    },
    {
      id: 'nofork',
      name: 'UASF (BIP 148) Without Miner Support',
      year: 2017,
      description: "While the User Activated Soft Fork (UASF) for SegWit activation was successful, it's worth examining what would have happened if it had failed to gain sufficient support - a potential failed fork scenario that was narrowly avoided.",
      context: "In 2017, SegWit activation was stalled due to lack of miner signaling. BIP 148 proposed a User Activated Soft Fork (UASF) where nodes would reject blocks that didn't signal for SegWit after August 1, 2017. This created the risk of a chain split if a significant portion of miners didn't support it.",
      reasons: [
        "It didn't fail, but was a high-risk approach that could have caused a chain split",
        "Success required either overwhelming user adoption or sufficient miner support",
        "Without adequate hash power, UASF nodes would have followed a minority chain vulnerable to attacks",
        "Economic majority support was essential but difficult to measure beforehand",
        "Required coordination from users, exchanges, and businesses to minimize disruption"
      ],
      stakeholders: {
        developers: "Some Bitcoin Core developers supported the UASF approach, while others considered it too risky and preferred other activation methods.",
        miners: "Initially most miners opposed forced SegWit activation, but the UASF threat ultimately led to BIP91, which gained miner support and avoided a split.",
        users: "A vocal group of users strongly supported UASF, running BIP148 nodes and pressuring businesses to support it.",
        businesses: "Exchanges and services were cautious, as they would need to manage multiple coins if a chain split occurred."
      },
      lessons: [
        "User-activated forks can influence the network even without majority hash power initially",
        "The threat of a chain split can motivate compromise solutions",
        "Economic consensus can sometimes override mining power in Bitcoin governance",
        "Game theory plays a crucial role in Bitcoin's governance mechanisms"
      ],
      consequences: "The UASF didn't fail - it actually succeeded in forcing the activation of SegWit without a chain split. The mere threat of UASF led to miners adopting BIP91, which activated SegWit in a way compatible with BIP148, preventing a contentious split. This demonstrated users' power in Bitcoin's governance system.",
      questions: [
        {
          question: "What potential risk did the UASF (BIP 148) approach carry?",
          options: [
            "It might have caused a permanent chain split if miner support remained low",
            "It would have immediately crashed the Bitcoin price",
            "It violated international regulations",
            "It would have prevented Lightning Network development"
          ],
          correctIndex: 0,
          explanation: "The UASF approach risked creating a chain split if insufficient mining power supported it. This could have resulted in two competing Bitcoin chains, with the UASF chain potentially vulnerable to attacks if it had significantly less hash power."
        },
        {
          question: "Why is the UASF considered an important event in Bitcoin governance?",
          options: [
            "It was the first time developers took complete control of the protocol",
            "It demonstrated users' ability to influence protocol rules, even without miner support",
            "It established the Bitcoin Foundation as the governing body",
            "It gave miners veto power over all future protocol changes"
          ],
          correctIndex: 1,
          explanation: "The UASF demonstrated that users running full nodes have significant power in Bitcoin's governance system. Even without initial miner support, user pressure can influence protocol rules, reinforcing Bitcoin's decentralized governance model."
        }
      ]
    },
    {
      id: 'bitcoingold',
      name: 'Bitcoin Gold',
      year: 2017,
      description: "Bitcoin Gold was a hard fork of Bitcoin that changed the mining algorithm from SHA-256 to Equihash, with the goal of making mining more accessible to individuals with general-purpose hardware instead of specialized ASICs.",
      context: "Bitcoin Gold (BTG) forked from Bitcoin in October 2017, during a period when several Bitcoin forks were launched. Its stated goal was to 'make Bitcoin decentralized again' by using a mining algorithm resistant to ASICs, allowing people to mine with GPUs.",
      reasons: [
        "Controversy over the premine: The developers mined 100,000 BTG before public release",
        "Security vulnerabilities: BTG suffered a major 51% attack in May 2018, with attackers stealing millions from exchanges",
        "Limited developer team: The project had a small development team with limited resources",
        "Lack of market differentiation: It competed with many other Bitcoin forks and GPU-minable cryptocurrencies",
        "Minimal ecosystem support: Few major exchanges, wallets, and services supported the fork"
      ],
      stakeholders: {
        developers: "A small team led by Jack Liao (CEO of mining equipment manufacturer LightningASIC) created Bitcoin Gold with limited ongoing development resources.",
        miners: "The initial mining community consisted primarily of GPU miners, but interest waned as profitability decreased relative to other GPU-minable coins.",
        users: "Few Bitcoin users claimed their BTG or actively used the network beyond initial speculation.",
        businesses: "Limited business adoption, with many exchanges listing BTG but few merchants accepting it. Several exchanges delisted it after security incidents."
      },
      lessons: [
        "Technical decentralization alone doesn't guarantee success",
        "Security is compromised when hash power is easily obtainable or rentable",
        "Forks need strong developer communities and ongoing support to thrive",
        "Changing a single property of Bitcoin (mining algorithm) without broader innovation has limited appeal"
      ],
      consequences: "While Bitcoin Gold still exists, it failed to achieve significant adoption or fulfill its vision of democratizing Bitcoin mining. It suffered a 51% attack in 2018 where attackers stole over $18 million from exchanges through double-spending. This highlighted the security risks of proof-of-work cryptocurrencies with relatively low hash power.",
      questions: [
        {
          question: "What was Bitcoin Gold's main vulnerability that led to its 51% attack?",
          options: [
            "Software bugs in its codebase",
            "Insufficient hash rate and the use of a rental market accessible algorithm",
            "Lack of replay protection",
            "Poor exchange implementations"
          ],
          correctIndex: 1,
          explanation: "Bitcoin Gold's Equihash algorithm could be mined with rentable GPUs, making it relatively cheap to acquire enough hash power for an attack. The low overall network hash rate compared to Bitcoin made a 51% attack economically feasible, which attackers exploited to double-spend coins on exchanges."
        },
        {
          question: "What does Bitcoin Gold's failure teach us about cryptocurrency forks?",
          options: [
            "Forks should never change the mining algorithm",
            "All Bitcoin forks eventually fail",
            "Technical changes alone aren't enough; sustainable development and security are essential",
            "Only corporate-backed forks can succeed"
          ],
          correctIndex: 2,
          explanation: "Bitcoin Gold's trajectory shows that simply changing one technical parameter (mining algorithm) isn't enough for success. Sustainable cryptocurrency networks require ongoing development resources, strong security, and genuine market differentiation - not just technical modifications to the original Bitcoin code."
        }
      ]
    }
  ]);

  // State for tracking user progress and quiz responses
  const [currentForkIndex, setCurrentForkIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    context: true,
    reasons: false,
    stakeholders: false,
    lessons: false,
    consequences: false,
    quiz: false
  });
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);
  
  // Current fork for convenience
  const currentFork = forks[currentForkIndex];
  
  // Toggle expanded sections
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  // Handle quiz answer selection
  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    if (quizSubmitted[`${currentFork.id}-${questionIndex}`]) return;
    
    setQuizAnswers({
      ...quizAnswers,
      [`${currentFork.id}-${questionIndex}`]: answerIndex
    });
  };
  
  // Submit quiz answers for current fork
  const submitQuiz = () => {
    // Mark all questions for current fork as submitted
    const newQuizSubmitted = { ...quizSubmitted };
    currentFork.questions.forEach((_, index) => {
      newQuizSubmitted[`${currentFork.id}-${index}`] = true;
    });
    
    setQuizSubmitted(newQuizSubmitted);
  };
  
  // Check if all questions for current fork have been answered
  const allQuestionsAnswered = () => {
    return currentFork.questions.every((_, index) => 
      quizAnswers[`${currentFork.id}-${index}`] !== undefined
    );
  };
  
  // Check if all questions for current fork have been submitted
  const allQuestionsSubmitted = () => {
    return currentFork.questions.every((_, index) => 
      quizSubmitted[`${currentFork.id}-${index}`]
    );
  };
  
  // Calculate score for current fork
  const calculateScore = () => {
    let correctCount = 0;
    
    currentFork.questions.forEach((question, index) => {
      if (quizAnswers[`${currentFork.id}-${index}`] === question.correctIndex) {
        correctCount++;
      }
    });
    
    return correctCount;
  };
  
  // Move to next fork
  const nextFork = () => {
    if (currentForkIndex < forks.length - 1) {
      setCurrentForkIndex(currentForkIndex + 1);
      setExpandedSections({
        context: true,
        reasons: false,
        stakeholders: false,
        lessons: false,
        consequences: false,
        quiz: false
      });
    } else {
      // All forks completed
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
  };
  
  // Check if user can proceed to next fork
  const canProceedToNextFork = () => {
    // User must at least complete the quiz for current fork
    return allQuestionsSubmitted() && calculateScore() > 0;
  };

  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-amber-900/30">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amber-500 mb-1">Learning from Failures: Bitcoin's Forgotten Forks</h2>
        <p className="text-sm text-gray-400 mb-4">Exploring Bitcoin's abandoned and failed forks to understand governance challenges</p>
        
        {/* Progress indicators */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            {forks.map((fork, index) => (
              <div 
                key={fork.id}
                className={`w-2 h-2 rounded-full ${
                  index < currentForkIndex 
                    ? 'bg-green-500' 
                    : index === currentForkIndex 
                      ? 'bg-amber-500' 
                      : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <div className="text-xs text-gray-400">
            {currentForkIndex + 1} of {forks.length}
          </div>
        </div>
        
        {/* Fork header */}
        <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-medium text-amber-400">{currentFork.name}</h3>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-400">{currentFork.year}</span>
              </div>
            </div>
            {currentFork.id === 'nofork' && (
              <div className="bg-amber-900/30 px-2 py-1 text-xs text-amber-400 rounded-md">
                Hypothetical Scenario
              </div>
            )}
          </div>
          <p className="mt-3 text-gray-300 text-sm">
            {currentFork.description}
          </p>
        </div>
        
        {/* Context section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-4 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('context')}
          >
            <span className="font-medium text-amber-300">Historical Context</span>
            {expandedSections.context ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.context && (
            <div className="p-4">
              <p className="text-gray-300 text-sm">
                {currentFork.context}
              </p>
            </div>
          )}
        </div>
        
        {/* Reasons for failure section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-4 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('reasons')}
          >
            <span className="font-medium text-amber-300">Reasons for Failure</span>
            {expandedSections.reasons ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.reasons && (
            <div className="p-4">
              <div className="space-y-2">
                {currentFork.reasons.map((reason, index) => (
                  <div key={index} className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-sm text-gray-300">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Stakeholders section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-4 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('stakeholders')}
          >
            <span className="font-medium text-amber-300">Stakeholder Perspectives</span>
            {expandedSections.stakeholders ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.stakeholders && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 border border-gray-800 rounded-lg p-3">
                  <h4 className="font-medium text-blue-400 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Developers
                  </h4>
                  <p className="text-sm text-gray-300">
                    {currentFork.stakeholders.developers}
                  </p>
                </div>
                
                <div className="bg-black/30 border border-gray-800 rounded-lg p-3">
                  <h4 className="font-medium text-purple-400 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Miners
                  </h4>
                  <p className="text-sm text-gray-300">
                    {currentFork.stakeholders.miners}
                  </p>
                </div>
                
                <div className="bg-black/30 border border-gray-800 rounded-lg p-3">
                  <h4 className="font-medium text-green-400 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </h4>
                  <p className="text-sm text-gray-300">
                    {currentFork.stakeholders.users}
                  </p>
                </div>
                
                <div className="bg-black/30 border border-gray-800 rounded-lg p-3">
                  <h4 className="font-medium text-red-400 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Businesses
                  </h4>
                  <p className="text-sm text-gray-300">
                    {currentFork.stakeholders.businesses}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Lessons section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-4 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('lessons')}
          >
            <span className="font-medium text-amber-300">Key Lessons</span>
            {expandedSections.lessons ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.lessons && (
            <div className="p-4">
              <ul className="list-disc ml-5 space-y-2">
                {currentFork.lessons.map((lesson, index) => (
                  <li key={index} className="text-sm text-gray-300">{lesson}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Consequences section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-4 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('consequences')}
          >
            <span className="font-medium text-amber-300">Long-term Consequences</span>
            {expandedSections.consequences ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.consequences && (
            <div className="p-4">
              <p className="text-sm text-gray-300">
                {currentFork.consequences}
              </p>
            </div>
          )}
        </div>
        
        {/* Quiz section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-4 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('quiz')}
          >
            <span className="font-medium text-amber-300">Knowledge Check</span>
            {expandedSections.quiz ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.quiz && (
            <div className="p-4">
              <p className="text-sm text-gray-400 mb-4">
                Test your understanding of the {currentFork.name} case study:
              </p>
              
              <div className="space-y-6">
                {currentFork.questions.map((question, qIndex) => (
                  <div key={qIndex} className="bg-black/30 border border-gray-800 rounded-lg p-4">
                    <h4 className="font-medium text-gray-200 mb-3">{qIndex + 1}. {question.question}</h4>
                    
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, oIndex) => {
                        const questionKey = `${currentFork.id}-${qIndex}`;
                        const isSelected = quizAnswers[questionKey] === oIndex;
                        const isSubmitted = quizSubmitted[questionKey];
                        const isCorrect = oIndex === question.correctIndex;
                        
                        return (
                          <div 
                            key={oIndex}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              isSubmitted
                                ? isCorrect
                                  ? 'border-green-500 bg-green-900/20'
                                  : isSelected
                                    ? 'border-red-500 bg-red-900/20'
                                    : 'border-gray-700 bg-black/30'
                                : isSelected
                                  ? 'border-amber-500 bg-amber-900/20'
                                  : 'border-gray-700 bg-black/30 hover:border-gray-600'
                            }`}
                            onClick={() => selectAnswer(qIndex, oIndex)}
                          >
                            <div className="flex items-center">
                              <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center ${
                                isSubmitted
                                  ? isCorrect
                                    ? 'bg-green-500 text-black'
                                    : isSelected
                                      ? 'bg-red-500 text-black'
                                      : 'border border-gray-600'
                                  : isSelected
                                    ? 'bg-amber-500 text-black'
                                    : 'border border-gray-600'
                              }`}>
                                {isSubmitted && isCorrect && <div className="h-3 w-3 bg-black rounded-full"></div>}
                                {isSubmitted && isSelected && !isCorrect && <div className="h-3 w-3 bg-black rounded-full"></div>}
                                {!isSubmitted && isSelected && <div className="h-2 w-2 bg-black rounded-full"></div>}
                              </div>
                              
                              <span className="text-gray-300">{option}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {quizSubmitted[`${currentFork.id}-${qIndex}`] && (
                      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-300">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {!allQuestionsSubmitted() && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={submitQuiz}
                    disabled={!allQuestionsAnswered()}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      !allQuestionsAnswered()
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    Submit Answers
                  </button>
                </div>
              )}
              
              {allQuestionsSubmitted() && (
                <div className="mt-6 p-4 bg-amber-900/20 border border-amber-800/30 rounded-lg text-center">
                  <h4 className="font-medium text-amber-400 mb-2">Quiz Result</h4>
                  <p className="text-gray-300">
                    You scored {calculateScore()}/{currentFork.questions.length}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-center">
          <button
            onClick={nextFork}
            disabled={!canProceedToNextFork()}
            className={`px-6 py-2 rounded-lg font-medium flex items-center ${
              !canProceedToNextFork()
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {currentForkIndex < forks.length - 1 ? (
              <>Next Case Study <ArrowRight className="ml-2 h-4 w-4" /></>
            ) : (
              <>Complete Challenge</>
            )}
          </button>
        </div>
      </div>
      
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! By studying these failed or forgotten forks, you've gained valuable insights into 
            Bitcoin's governance challenges, stakeholder dynamics, and the complex balance of technical and 
            social consensus required for successful protocol evolution.
          </p>
        </div>
      )}
    </div>
  );
}