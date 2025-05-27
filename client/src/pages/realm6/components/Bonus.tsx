import { useState } from 'react';
import { GraduationCap, Store, ArrowRight, Check, Users, Heart, ChevronDown, ChevronUp, Sparkles, FileCode, Lightbulb, Globe } from 'lucide-react';

interface BonusProps {
  onComplete: () => void;
}

interface ProjectType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
  skillsNeeded: {
    technical: string[];
    nontechnical: string[];
  };
  impact: string[];
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  icon: React.ReactNode;
  background: string;
  selected: boolean;
}

export default function Bonus({ onComplete }: BonusProps) {
  // Project types
  const projectTypes: ProjectType[] = [
    {
      id: 'education',
      title: 'Education Workshops',
      description: 'Create a series of workshops to teach Bitcoin basics to community members. These workshops will focus on practical skills like setting up wallets, securing private keys, and making transactions safely.',
      icon: <GraduationCap className="h-6 w-6" />,
      examples: [
        'Basic Bitcoin literacy program for local merchants',
        'Youth-focused Bitcoin coding workshops',
        'Lightning Network transaction practice sessions',
        'Security and self-custody training'
      ],
      skillsNeeded: {
        technical: ['Bitcoin knowledge', 'Teaching ability', 'Demonstration skills'],
        nontechnical: ['Communication', 'Patience', 'Community organizing']
      },
      impact: [
        'Increased financial literacy in the community',
        'Reduced vulnerability to scams and fraud',
        'Development of local experts who can support others',
        'Creation of a knowledgeable user base for further Bitcoin adoption'
      ]
    },
    {
      id: 'farming',
      title: 'Farming Co-op',
      description: 'Develop a cooperative for farmers to pool resources, share equipment, and sell products using Bitcoin. The co-op would help farmers access broader markets and protect their earnings from inflation.',
      icon: <Lightbulb className="h-6 w-6" />,
      examples: [
        'Equipment sharing system with Bitcoin-based accounting',
        'Direct-to-consumer marketplace for agricultural products',
        'Bitcoin savings program for seasonal income smoothing',
        'Group purchasing of supplies at wholesale prices'
      ],
      skillsNeeded: {
        technical: ['Bitcoin wallet management', 'Basic accounting', 'Supply chain knowledge'],
        nontechnical: ['Community leadership', 'Conflict resolution', 'Agricultural expertise']
      },
      impact: [
        'Increased farmer bargaining power and income',
        'Protection of earnings against inflation',
        'More efficient use of resources through sharing',
        'Direct access to international markets and buyers'
      ]
    },
    {
      id: 'payments',
      title: 'Market Payment System',
      description: 'Implement a Bitcoin-based payment system for local markets and merchants. This would reduce the need for cash, lower transaction costs, and enable merchants to accept payments from customers worldwide.',
      icon: <Store className="h-6 w-6" />,
      examples: [
        'QR code payment posters for market stalls',
        'Lightning Network point-of-sale system',
        'Merchant training and support network',
        'Local exchange service for Bitcoin/local currency conversion'
      ],
      skillsNeeded: {
        technical: ['Lightning Network knowledge', 'Point-of-sale setup', 'Basic merchant support'],
        nontechnical: ['Merchant relations', 'Customer education', 'Local market knowledge']
      },
      impact: [
        'Reduced cash robbery risk for merchants',
        'Lower transaction fees compared to credit cards or mobile money',
        'Access to international customer base',
        'Increased financial inclusion for unbanked merchants'
      ]
    },
    {
      id: 'creative',
      title: 'Creative Platform',
      description: 'Establish a platform for local artists, musicians, and creators to showcase and sell their work directly to a global audience using Bitcoin. This would eliminate intermediaries and provide creators with full ownership of their content.',
      icon: <Heart className="h-6 w-6" />,
      examples: [
        'Digital art marketplace with Bitcoin payments',
        'Music streaming platform with Lightning Network tips',
        'Online gallery for traditional crafts and art',
        'Virtual performance space with pay-per-view options'
      ],
      skillsNeeded: {
        technical: ['Web development', 'Digital content hosting', 'Payment integration'],
        nontechnical: ['Artist relations', 'Curation', 'Marketing', 'Community building']
      },
      impact: [
        'Direct support for local artists and cultural preservation',
        'Global audience reach for previously local-only creators',
        'Higher percentage of sales going directly to creators',
        'New income streams for the creative economy'
      ]
    }
  ];
  
  // Team members
  const teamMembers: TeamMember[] = [
    {
      id: 'technical',
      name: 'Kwame',
      role: 'Technical Lead',
      skills: ['Programming', 'Bitcoin protocol knowledge', 'System architecture'],
      icon: <FileCode className="h-6 w-6" />,
      background: 'Computer science graduate with experience building web applications and a passion for Bitcoin technology.',
      selected: false
    },
    {
      id: 'community',
      name: 'Amara',
      role: 'Community Organizer',
      skills: ['Leadership', 'Event planning', 'Public speaking', 'Networking'],
      icon: <Users className="h-6 w-6" />,
      background: 'Natural community leader with strong connections throughout the village and experience organizing local initiatives.',
      selected: false
    },
    {
      id: 'educator',
      name: 'Jabari',
      role: 'Educator',
      skills: ['Teaching', 'Curriculum development', 'Simplifying complex concepts'],
      icon: <GraduationCap className="h-6 w-6" />,
      background: 'Former teacher with a gift for explaining technical concepts in accessible ways to people of all ages and backgrounds.',
      selected: false
    },
    {
      id: 'business',
      name: 'Zola',
      role: 'Business Developer',
      skills: ['Market analysis', 'Financial planning', 'Partnership building'],
      icon: <Store className="h-6 w-6" />,
      background: 'Small business owner with strong connections to local merchants and understanding of the regional economy.',
      selected: false
    },
    {
      id: 'creative',
      name: 'Nia',
      role: 'Creative Director',
      skills: ['Design', 'Content creation', 'Storytelling', 'User experience'],
      icon: <Heart className="h-6 w-6" />,
      background: 'Artist and designer who understands how to create engaging experiences and communicate ideas visually.',
      selected: false
    },
    {
      id: 'international',
      name: 'Daniel',
      role: 'International Connector',
      skills: ['Multiple languages', 'Cross-cultural communication', 'Global network'],
      icon: <Globe className="h-6 w-6" />,
      background: 'Well-traveled individual with connections to Bitcoin communities worldwide and experience bridging cultural differences.',
      selected: false
    }
  ];
  
  // Component state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [teamRoster, setTeamRoster] = useState<TeamMember[]>(teamMembers);
  const [projectPitch, setProjectPitch] = useState('');
  const [showTeamSection, setShowTeamSection] = useState(false);
  const [showImpactSection, setShowImpactSection] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Get selected project
  const getSelectedProject = () => selectedProjectId ? projectTypes.find(p => p.id === selectedProjectId) : null;
  
  // Handle project selection
  const selectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    // Reset team selection when project changes
    setTeamRoster(prev => prev.map(member => ({ ...member, selected: false })));
    
    // Generate a default project pitch
    const project = projectTypes.find(p => p.id === projectId);
    if (project) {
      setProjectPitch(`A ${project.title} that empowers our community through Bitcoin by ${project.description.toLowerCase().split('.')[0]}.`);
    }
  };
  
  // Toggle team member selection
  const toggleTeamMember = (memberId: string) => {
    setTeamRoster(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, selected: !member.selected } 
          : member
      )
    );
  };
  
  // Handle pitch change
  const handlePitchChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProjectPitch(e.target.value);
  };
  
  // Check if form is complete
  const isFormComplete = () => {
    return (
      selectedProjectId !== null &&
      projectPitch.trim().length > 0 &&
      teamRoster.filter(member => member.selected).length >= 2
    );
  };
  
  // Complete the project
  const completeProject = () => {
    setCompleted(true);
    setTimeout(onComplete, 2000);
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
      <div className="bg-rose-900/20 border border-rose-800 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Sparkles className="h-5 w-5 text-rose-400 mr-3 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-rose-400 mb-1">The Seed of Tomorrow</h3>
            <p className="text-sm text-gray-300">
              Asha wants to plant a Bitcoin "seed" in her village by developing a community project.
              Help her design a project that embodies the spirit of Ubuntu: "I am because we are."
            </p>
          </div>
        </div>
      </div>
      
      {/* Project selection */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
        <h3 className="text-lg font-medium text-rose-400 mb-4">Choose Your Project</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {projectTypes.map((project) => (
            <div
              key={project.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedProjectId === project.id
                  ? 'border-rose-500 bg-rose-900/20'
                  : 'border-gray-700 bg-black/30 hover:border-gray-600'
              }`}
              onClick={() => selectProject(project.id)}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-lg mr-3 ${
                  selectedProjectId === project.id
                    ? 'bg-rose-900/50 text-rose-300'
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {project.icon}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-200">{project.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedProjectId && (
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-rose-400">Project Examples</h4>
            </div>
            
            <ul className="mt-3 space-y-2">
              {getSelectedProject()?.examples.map((example, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{example}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Project pitch */}
      {selectedProjectId && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
          <h3 className="text-lg font-medium text-rose-400 mb-4">Craft Your Pitch</h3>
          
          <p className="text-sm text-gray-300 mb-4">
            Write a one-sentence pitch that explains your project's purpose and value to the community.
          </p>
          
          <textarea
            value={projectPitch}
            onChange={handlePitchChange}
            placeholder="Our project will..."
            className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-lg text-gray-300 focus:border-rose-500 focus:outline-none"
            rows={3}
          />
          
          <div className="mt-2 flex justify-end">
            <div className="text-xs text-gray-500">
              {projectPitch.length}/150 characters
            </div>
          </div>
        </div>
      )}
      
      {/* Team selection */}
      {selectedProjectId && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowTeamSection(!showTeamSection)}
          >
            <h3 className="text-lg font-medium text-rose-400">Build Your Team</h3>
            {showTeamSection ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
          
          {showTeamSection && (
            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-4">
                Select at least 2 team members with complementary skills to help bring your project to life.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {teamRoster.map((member) => (
                  <div
                    key={member.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      member.selected
                        ? 'border-green-500 bg-green-900/20'
                        : 'border-gray-700 bg-black/30 hover:border-gray-600'
                    }`}
                    onClick={() => toggleTeamMember(member.id)}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg mr-3 ${
                        member.selected
                          ? 'bg-green-900/50 text-green-300'
                          : 'bg-gray-800 text-gray-400'
                      }`}>
                        {member.icon}
                      </div>
                      
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-200">{member.name}</h4>
                          {member.selected && (
                            <div className="ml-2 bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded-full">
                              Selected
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{member.role}</p>
                        
                        <div className="mt-2">
                          <div className="text-xs text-gray-500">Skills:</div>
                          <div className="flex flex-wrap mt-1 gap-1">
                            {member.skills.map((skill, index) => (
                              <span 
                                key={index}
                                className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-sm text-gray-400 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Team members selected: {teamRoster.filter(m => m.selected).length} 
                {teamRoster.filter(m => m.selected).length < 2 && (
                  <span className="ml-1 text-rose-400">(minimum 2 required)</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Project impact */}
      {selectedProjectId && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowImpactSection(!showImpactSection)}
          >
            <h3 className="text-lg font-medium text-rose-400">Potential Impact</h3>
            {showImpactSection ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
          
          {showImpactSection && (
            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-4">
                Here's how your project could impact the community:
              </p>
              
              <ul className="space-y-2">
                {getSelectedProject()?.impact.map((impact, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{impact}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 p-3 bg-rose-900/20 border border-rose-800 rounded-lg">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-rose-400">Ubuntu Principle: </span>
                  This project embodies the spirit of Ubuntu by creating shared value and strengthening 
                  community bonds through collaborative Bitcoin adoption.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Submit button */}
      <div className="flex justify-center">
        <button
          onClick={completeProject}
          disabled={!isFormComplete()}
          className={`px-6 py-2 rounded-lg transition-colors ${
            !isFormComplete()
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-rose-600 text-white hover:bg-rose-700'
          }`}
        >
          Plant Your Bitcoin Seed
        </button>
      </div>
      
      {/* Completion message */}
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center mt-6">
          <h3 className="text-green-400 text-lg font-medium mb-2">Project Designed!</h3>
          <p className="text-gray-300">
            Congratulations! You've designed a Bitcoin project that embodies the Ubuntu spirit 
            of community collaboration and shared growth. This seed you've planted has the potential 
            to transform your village through the power of Bitcoin.
          </p>
        </div>
      )}
    </div>
  );
}