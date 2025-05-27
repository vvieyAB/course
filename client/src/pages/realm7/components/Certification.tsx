import React, { useState, useEffect } from 'react';
import { Award, Bitcoin, Book, BookOpen, Check, Coins, Download, Globe, Hexagon, Key, Lock, Map, Shield, User, Zap } from 'lucide-react';

interface CertificationProps {
  onComplete: () => void;
}

export default function Certification({ onComplete }: CertificationProps) {
  const [username, setUsername] = useState('Asha');
  const [certificateDate, setCertificateDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCertificateReady, setIsCertificateReady] = useState(false);
  const [realmCompletionDates, setRealmCompletionDates] = useState([
    new Date(2024, 0, 15),
    new Date(2024, 1, 2),
    new Date(2024, 1, 20),
    new Date(2024, 2, 7),
    new Date(2024, 2, 25),
    new Date(2024, 3, 10),
    new Date(),
  ]);
  
  // Format the certificate date on component mount
  useEffect(() => {
    const now = new Date();
    setCertificateDate(now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);
  
  // Generate certificate
  const generateCertificate = () => {
    setIsGenerating(true);
    
    // Simulate certificate generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsCertificateReady(true);
    }, 2000);
  };
  
  // Complete the certification process
  const completeCertification = () => {
    setTimeout(onComplete, 1000);
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const realmDetails = [
    {
      name: "Realm of Origins",
      description: "Foundations of Money",
      icon: <Coins className="h-5 w-5" />,
      skills: [
        "Understanding of money's historical evolution",
        "Knowledge of Bitcoin's monetary properties",
        "Recognition of sound money characteristics",
      ]
    },
    {
      name: "The Central Citadel",
      description: "Governance",
      icon: <Shield className="h-5 w-5" />,
      skills: [
        "Awareness of financial surveillance mechanisms",
        "Understanding of privacy-preserving techniques",
        "Knowledge of Bitcoin's privacy model",
      ]
    },
    {
      name: "The Forest of Sparks",
      description: "Bitcoin's Birth",
      icon: <Key className="h-5 w-5" />,
      skills: [
        "Understanding of cryptographic primitives",
        "Knowledge of digital signatures and verification",
        "Appreciation of trustless systems design",
      ]
    },
    {
      name: "The Mountain Forge",
      description: "Mining and Consensus",
      icon: <Zap className="h-5 w-5" />,
      skills: [
        "Understanding of Proof-of-Work mining",
        "Knowledge of Bitcoin's consensus mechanisms",
        "Awareness of mining economics and incentives",
      ]
    },
    {
      name: "The Council of Forks",
      description: "Governance",
      icon: <Hexagon className="h-5 w-5" />,
      skills: [
        "Understanding of Bitcoin's governance model",
        "Knowledge of protocol upgrade mechanisms",
        "Awareness of Bitcoin's development process",
      ]
    },
    {
      name: "The Ubuntu Village",
      description: "Bitcoin in Africa",
      icon: <Globe className="h-5 w-5" />,
      skills: [
        "Understanding of Bitcoin's global impact",
        "Knowledge of Lightning Network and scaling",
        "Awareness of adoption strategies and challenges",
      ]
    },
    {
      name: "The Summit of Knowledge",
      description: "Comprehensive Bitcoin Mastery",
      icon: <BookOpen className="h-5 w-5" />,
      skills: [
        "Integration of concepts from all realms",
        "Application of Bitcoin knowledge to real-world scenarios",
        "Ability to evaluate and develop comprehensive Bitcoin solutions",
      ]
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <div className="text-center mb-8">
          <div className="inline-block bg-purple-900/30 p-4 rounded-full mb-4">
            <Award className="h-10 w-10 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-purple-400 mb-2">Bitcoin Journey Certification</h3>
          <p className="text-gray-300">
            Congratulations on completing your Bitcoin educational journey with Asha!
            This certification recognizes your comprehensive understanding of Bitcoin's
            technology, economics, and potential.
          </p>
        </div>
        
        <div className="mb-8">
          <h4 className="font-medium text-gray-300 mb-4 border-b border-gray-800 pb-2">Your Journey Summary</h4>
          
          <div className="space-y-4">
            {realmDetails.map((realm, index) => (
              <div key={index} className="flex items-start">
                <div className={`p-2 rounded-lg mr-3 bg-gray-800/80 text-gray-400`}>
                  {realm.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h5 className="font-medium text-gray-200">{realm.name}</h5>
                      <p className="text-sm text-gray-400">{realm.description}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Completed: {formatDate(realmCompletionDates[index])}
                    </div>
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    {realm.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-start text-xs text-gray-300">
                        <Check className="h-3.5 w-3.5 text-green-400 mr-1.5 flex-shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="font-medium text-gray-300 mb-4 border-b border-gray-800 pb-2">Certification</h4>
          
          <p className="text-gray-300 mb-4">
            This certificate acknowledges your successful completion of Bitcoin Quest: Asha's Journey Through the Realms of Money,
            a comprehensive Bitcoin education program covering monetary history, technology, economics, and applications.
          </p>
          
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 text-center mb-6">
            {!isCertificateReady ? (
              <div className="p-6">
                <h3 className="text-xl font-medium text-purple-400 mb-4">Generate Your Certificate</h3>
                <p className="text-gray-300 mb-6">
                  Your personalized Bitcoin journey certificate is ready to be generated.
                </p>
                
                <div className="max-w-xs mx-auto mb-6">
                  <label className="block text-gray-400 text-sm mb-2 text-left">Your Name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-300 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                
                <button
                  onClick={generateCertificate}
                  disabled={isGenerating || username.trim() === ''}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    isGenerating || username.trim() === ''
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isGenerating ? 'Generating...' : 'Generate Certificate'}
                </button>
              </div>
            ) : (
              <div className="certificate-container p-8 border-4 border-purple-700 rounded-lg bg-gray-950 relative overflow-hidden">
                <div className="certificate-background absolute inset-0 opacity-5">
                  <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
                    {Array(100).fill(0).map((_, i) => (
                      <div key={i} className="flex items-center justify-center">
                        <Bitcoin className="h-6 w-6 text-purple-500" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex justify-center mb-6">
                    <Award className="h-16 w-16 text-yellow-500" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-purple-400 mb-2">CERTIFICATE OF COMPLETION</h2>
                  <p className="text-gray-400 mb-6">Bitcoin Quest: Asha's Journey Through the Realms of Money</p>
                  
                  <h3 className="text-xl text-gray-300 mb-4">This certifies that</h3>
                  <p className="text-2xl font-bold text-yellow-400 mb-4">{username}</p>
                  
                  <p className="text-gray-300 mb-6">
                    has successfully completed all seven realms of the Bitcoin educational journey,
                    demonstrating comprehensive knowledge of Bitcoin's technology, economics, and applications.
                  </p>
                  
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-left">
                      <p className="text-gray-400 text-sm">Date Issued</p>
                      <p className="text-gray-300">{certificateDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Certificate ID</p>
                      <p className="text-gray-300">BTC-{Math.floor(Math.random() * 900000) + 100000}</p>
                    </div>
                  </div>
                  
                  <button
                    className="flex items-center mx-auto px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Your Bitcoin journey doesn't end here. Continue exploring, learning, and contributing to the Bitcoin ecosystem!
            </p>
            
            <button
              onClick={completeCertification}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Complete Your Journey
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h4 className="font-medium text-gray-300 mb-4 border-b border-gray-800 pb-2">Continue Your Bitcoin Education</h4>
        
        <p className="text-gray-300 mb-4">
          While you've completed this structured educational journey, Bitcoin learning is a lifelong pursuit.
          Here are some resources to continue expanding your knowledge:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-900/70 border border-gray-800 rounded-lg">
            <div className="flex items-center mb-2">
              <Book className="h-5 w-5 text-purple-400 mr-2" />
              <h5 className="font-medium text-gray-200">Reading Resources</h5>
            </div>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>"The Bitcoin Standard" by Saifedean Ammous</li>
              <li>"Mastering Bitcoin" by Andreas Antonopoulos</li>
              <li>"The Bullish Case for Bitcoin" by Vijay Boyapati</li>
              <li>"The Little Bitcoin Book" by Various Authors</li>
              <li>Bitcoin Whitepaper by Satoshi Nakamoto</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-900/70 border border-gray-800 rounded-lg">
            <div className="flex items-center mb-2">
              <User className="h-5 w-5 text-purple-400 mr-2" />
              <h5 className="font-medium text-gray-200">Community Engagement</h5>
            </div>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>Contribute to open-source Bitcoin projects</li>
              <li>Join Bitcoin developer mailing lists</li>
              <li>Participate in Bitcoin meetups and conferences</li>
              <li>Run a Bitcoin node to support the network</li>
              <li>Educate others about what you've learned</li>
            </ul>
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-sm mt-8">
          "Education is not the filling of a pail, but the lighting of a fire." <br />
          May your Bitcoin journey continue to illuminate new paths of discovery.
        </p>
      </div>
    </div>
  );
}