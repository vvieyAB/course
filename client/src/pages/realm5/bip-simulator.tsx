import { useState, useEffect } from 'react';
import { FileText, Check, AlertTriangle, Info, HelpCircle, User, Users, Code } from 'lucide-react';

interface BipSimulatorProps {
  onComplete: () => void;
}

interface BipSection {
  id: string;
  name: string;
  description: string;
  options: string[];
  correctIndex: number | null;
  selectedIndex: number | null;
}

interface BipStatus {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export default function BipSimulator({ onComplete }: BipSimulatorProps) {
  // BIP sections with different options to choose from
  const [bipSections, setBipSections] = useState<BipSection[]>([
    {
      id: 'preamble',
      name: 'Preamble',
      description: 'Basic information about the proposal',
      options: [
        'BIP: XXX\nTitle: Lightning Payment Optimization\nAuthor: Asha <asha@bitcoin.org>\nStatus: Draft\nType: Standards Track\nCategory: Lightning\nCreated: 2023-05-01',
        'PROPOSAL: Lightning Payment Optimization\nBY: Asha\nDATE: Today\nUrgency: High',
        'BITCOIN UPGRADE: Faster Lightning Payments\nCREATOR: Asha\nIMPORTANCE: Critical for adoption',
      ],
      correctIndex: 0,
      selectedIndex: null
    },
    {
      id: 'abstract',
      name: 'Abstract',
      description: 'Brief summary of the proposal',
      options: [
        'This proposal aims to make Bitcoin transactions faster by changing the consensus rules to allow for larger blocks.',
        'This BIP proposes optimizations to the Lightning Network protocol to reduce payment routing latency and improve success rates for multi-hop payments.',
        'Lightning Network needs to be faster to compete with traditional payment systems. This proposal will fix that by making nodes process payments quicker.'
      ],
      correctIndex: 1,
      selectedIndex: null
    },
    {
      id: 'motivation',
      name: 'Motivation',
      description: 'Why this change is needed',
      options: [
        'Traditional payment systems are faster than Bitcoin, and we need to catch up to gain adoption.',
        'The Lightning Network sometimes fails to route payments through multiple hops due to outdated channel information and latency issues, leading to poor user experience.',
        'Faster payments are better payments. Lightning Network should be instant, but sometimes it takes seconds or even fails. This is unacceptable for a modern payment system.'
      ],
      correctIndex: 1,
      selectedIndex: null
    },
    {
      id: 'specification',
      name: 'Specification',
      description: 'Technical details of the implementation',
      options: [
        'Make all Lightning Network nodes process payments faster by using more CPU power.',
        'Nodes should cache routing information and prioritize payment forwarding to speed up the network. This is a suggestion that node operators can choose to implement.',
        'This BIP introduces three specific protocol changes: 1) Proactive channel state synchronization, 2) Parallel payment path finding, and 3) Channel state commitment optimization. Each is detailed below with pseudocode and message format specifications...'
      ],
      correctIndex: 2,
      selectedIndex: null
    },
    {
      id: 'backwards-compatibility',
      name: 'Backward Compatibility',
      description: 'How this affects existing systems',
      options: [
        'All node operators must upgrade to support this change.',
        'This proposal is not backward compatible with older Lightning implementations.',
        'This enhancement is backward compatible with existing Lightning implementations. Nodes that implement these changes can interact seamlessly with those that don\'t, though optimal performance requires adoption by both ends of a payment route.'
      ],
      correctIndex: 2,
      selectedIndex: null
    }
  ]);
  
  // BIP status flow
  const [bipStatuses, setBipStatuses] = useState<BipStatus[]>([
    { id: 'draft', name: 'Draft', description: 'Initial proposal created', isActive: true },
    { id: 'submitted', name: 'Submitted', description: 'Shared with the community', isActive: false },
    { id: 'discussion', name: 'Discussion', description: 'Community feedback and debate', isActive: false },
    { id: 'updated', name: 'Updated', description: 'Revised based on feedback', isActive: false },
    { id: 'accepted', name: 'Accepted', description: 'Consensus reached', isActive: false },
    { id: 'implementation', name: 'Implementation', description: 'Code development', isActive: false },
    { id: 'activation', name: 'Activation', description: 'Deployed to the network', isActive: false }
  ]);

  // Game progress state
  const [step, setStep] = useState<'selection' | 'process' | 'feedback'>('selection');
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [feedbackMessages, setFeedbackMessages] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Check if all sections have selections
  const allSectionsSelected = bipSections.every(section => section.selectedIndex !== null);
  
  // Calculate score based on correct selections
  const calculateScore = () => {
    return bipSections.filter(section => 
      section.selectedIndex === section.correctIndex
    ).length;
  };
  
  // Handle section option selection
  const handleOptionSelect = (sectionId: string, optionIndex: number) => {
    setBipSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, selectedIndex: optionIndex } 
          : section
      )
    );
  };
  
  // Move to process stage
  const submitBip = () => {
    const score = calculateScore();
    let newFeedback: string[] = [];
    
    // Generate feedback based on selections
    bipSections.forEach(section => {
      if (section.selectedIndex === section.correctIndex) {
        newFeedback.push(`✓ Your ${section.name} section follows best practices.`);
      } else {
        if (section.id === 'preamble') {
          newFeedback.push(`⚠️ Your ${section.name} is missing standard BIP formatting. Check BIP-2 for the proper format.`);
        } else if (section.id === 'abstract') {
          newFeedback.push(`⚠️ Your ${section.name} should be concise and specific to the proposal's technical goals.`);
        } else if (section.id === 'motivation') {
          newFeedback.push(`⚠️ Your ${section.name} should focus on concrete problems the proposal solves, not general statements.`);
        } else if (section.id === 'specification') {
          newFeedback.push(`⚠️ Your ${section.name} lacks technical details and implementation specifics needed for developers.`);
        } else if (section.id === 'backwards-compatibility') {
          newFeedback.push(`⚠️ Your ${section.name} assessment is incorrect. Consider how this affects existing implementations.`);
        }
      }
    });
    
    setFeedbackMessages(newFeedback);
    
    // Only proceed to process stage if score is high enough
    if (score >= 3) {
      setStep('process');
      // Update statuses
      updateStatus('submitted');
      setTimeout(() => updateStatus('discussion'), 1500);
    } else {
      setStep('feedback');
    }
  };
  
  // Update BIP status in the process flow
  const updateStatus = (statusId: string) => {
    setBipStatuses(prevStatuses => {
      const newStatuses = [...prevStatuses];
      const statusIndex = newStatuses.findIndex(status => status.id === statusId);
      
      if (statusIndex !== -1) {
        for (let i = 0; i < newStatuses.length; i++) {
          newStatuses[i].isActive = i <= statusIndex;
        }
        setCurrentStatusIndex(statusIndex);
      }
      
      return newStatuses;
    });
  };
  
  // Process BIP through the status flow
  useEffect(() => {
    // Only run on process stage
    if (step !== 'process') return;
    
    // Set timers for automatic progression
    const timers: NodeJS.Timeout[] = [];
    
    if (currentStatusIndex === 1) { // After submission
      timers.push(setTimeout(() => {
        setFeedbackMessages(prev => [
          ...prev, 
          "Your BIP has generated significant discussion on the mailing list. Some developers are concerned about the protocol complexity."
        ]);
      }, 2000));
    }
    
    if (currentStatusIndex === 2) { // During discussion
      timers.push(setTimeout(() => {
        setFeedbackMessages(prev => [
          ...prev, 
          "Based on feedback, you should revise the specification to address concerns about implementation complexity."
        ]);
        updateStatus('updated');
      }, 3000));
    }
    
    if (currentStatusIndex === 3) { // After updates
      timers.push(setTimeout(() => {
        setFeedbackMessages(prev => [
          ...prev, 
          "Your revised proposal has reached rough consensus after addressing the major concerns!"
        ]);
        updateStatus('accepted');
      }, 3000));
    }
    
    if (currentStatusIndex === 4) { // After acceptance
      timers.push(setTimeout(() => {
        updateStatus('implementation');
      }, 2000));
    }
    
    if (currentStatusIndex === 5) { // During implementation
      timers.push(setTimeout(() => {
        setFeedbackMessages(prev => [
          ...prev, 
          "Developers have implemented your proposed changes in multiple Lightning Network node implementations."
        ]);
        updateStatus('activation');
      }, 3000));
    }
    
    if (currentStatusIndex === 6) { // Final stage
      timers.push(setTimeout(() => {
        setFeedbackMessages(prev => [
          ...prev, 
          "Congratulations! Your BIP for Lightning Payment Optimization has been successfully activated on the network."
        ]);
        setCompleted(true);
        setTimeout(onComplete, 2000);
      }, 2000));
    }
    
    // Cleanup timers
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [currentStatusIndex, step, onComplete]);
  
  // Handle revision after feedback
  const handleRevise = () => {
    setStep('selection');
    setFeedbackMessages([]);
  };
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-amber-900/30">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-amber-500">BIP Proposal Simulator</h2>
          
          <button 
            onClick={() => setShowInfo(!showInfo)} 
            className="text-xs p-2 bg-amber-900/20 rounded-full hover:bg-amber-900/30"
          >
            <Info className="h-4 w-4 text-amber-400" />
          </button>
        </div>
        
        {showInfo && (
          <div className="mb-4 bg-amber-900/10 border border-amber-900/30 rounded-lg p-4 text-sm">
            <h3 className="font-medium text-amber-400 mb-2">What is a BIP?</h3>
            <p className="text-gray-300 mb-2">
              A Bitcoin Improvement Proposal (BIP) is a formal document proposing changes to the Bitcoin protocol.
              BIPs provide a standardized way to suggest new features, collect community input, and document design decisions.
            </p>
            <p className="text-gray-300">
              BIPs follow a standard format and process, from Draft to Final status, ensuring thorough review and consensus 
              before implementation. Anyone can propose a BIP, but gaining community acceptance requires technical merit and clear communication.
            </p>
          </div>
        )}
        
        <p className="text-gray-300 mb-4">
          Help Asha draft a BIP for Lightning Network payment optimization. Choose the most appropriate content 
          for each section of the proposal to create a clear, technical, and well-structured document that follows BIP standards.
        </p>
        
        {step === 'selection' && (
          <>
            <div className="space-y-6 mb-6">
              {bipSections.map((section) => (
                <div key={section.id} className="bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-amber-400 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        {section.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{section.description}</p>
                    </div>
                    
                    <button 
                      onClick={() => setShowHint(!showHint)} 
                      className="text-amber-400 hover:text-amber-300"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {section.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          section.selectedIndex === index
                            ? 'border-amber-500 bg-amber-900/20'
                            : 'border-gray-700 bg-black/30 hover:border-gray-600'
                        }`}
                        onClick={() => handleOptionSelect(section.id, index)}
                      >
                        <div className="flex items-start">
                          <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center ${
                            section.selectedIndex === index
                              ? 'bg-amber-500 text-black'
                              : 'border border-gray-600'
                          }`}>
                            {section.selectedIndex === index && <Check className="h-3 w-3" />}
                          </div>
                          
                          <div className="whitespace-pre-wrap text-sm text-gray-300 flex-grow">
                            {option}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {showHint && (
                    <div className="px-4 pb-4">
                      <div className="bg-amber-900/10 border border-amber-900/30 rounded-lg p-3">
                        <p className="text-sm text-amber-200">
                          <span className="font-medium">Hint: </span>
                          {section.id === 'preamble' && "BIPs follow a specific format with fields like BIP number, title, author, status, type, and creation date."}
                          {section.id === 'abstract' && "The abstract should be concise and clear about what the proposal aims to achieve technically."}
                          {section.id === 'motivation' && "Focus on specific problems this proposal solves, with concrete examples rather than generalizations."}
                          {section.id === 'specification' && "Technical details are crucial - include specific protocol changes, message formats or algorithms."}
                          {section.id === 'backwards-compatibility' && "Consider how existing implementations will interact with nodes that adopt your proposal."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={submitBip}
                disabled={!allSectionsSelected}
                className={`px-6 py-2 rounded-lg font-medium flex items-center ${
                  !allSectionsSelected
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
              >
                Submit BIP
              </button>
            </div>
          </>
        )}
        
        {step === 'process' && (
          <div className="space-y-6">
            <div className="relative">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${(currentStatusIndex + 1) / bipStatuses.length * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-4 flex justify-between">
                {bipStatuses.map((status, index) => (
                  <div key={status.id} className="flex flex-col items-center" style={{ width: '14%' }}>
                    <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${
                      status.isActive
                        ? 'bg-amber-500 text-black'
                        : 'bg-gray-800 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className={`text-xs text-center font-medium ${
                      status.isActive ? 'text-amber-400' : 'text-gray-500'
                    }`}>
                      {status.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-amber-400 mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Community Feedback
              </h3>
              
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {feedbackMessages.map((message, index) => (
                  <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                    <p className="text-sm text-gray-300">{message}</p>
                  </div>
                ))}
                
                {/* Show animation when waiting for feedback */}
                {currentStatusIndex < 6 && !feedbackMessages.some(msg => msg.includes("Congratulations")) && (
                  <div className="flex items-center space-x-2 text-gray-400 text-sm py-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-300"></div>
                    <span>Waiting for community response...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {step === 'feedback' && (
          <div className="space-y-4">
            <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-400 mb-2">Your BIP Needs Revision</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Your proposal has some issues that need to be addressed before it can move forward in the BIP process. 
                    Review the feedback below and make revisions to improve your proposal.
                  </p>
                  
                  <div className="space-y-2">
                    {feedbackMessages.map((message, index) => (
                      <p key={index} className="text-sm text-gray-300">{message}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleRevise}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Revise Proposal
              </button>
            </div>
          </div>
        )}
      </div>
      
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! You've successfully navigated the BIP process from draft to activation. 
            Your proposal for Lightning Network payment optimization has been implemented and is now 
            helping improve Bitcoin's payment experience for users around the world.
          </p>
        </div>
      )}
    </div>
  );
}