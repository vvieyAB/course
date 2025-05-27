import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ThemeContainer, ThemeHeading, GradientButton, OutlineButton } from '@/components/ui/theme';
import { ShareButton } from '@/components/ui/share-button';
import { NavBar } from '@/components/ui/nav-bar';
import { INITIAL_REALMS } from '@/lib/constants';
import { RealmData } from '@/lib/realm-data';

// Mock user badges data
interface Badge {
  id: number;
  name: string;
  description: string;
  realmId: number;
  dateEarned: string;
  imageUrl: string;
  isEarned: boolean;
}

// Mock certificate data
interface Certificate {
  id: number;
  name: string;
  description: string;
  dateEarned: string;
  imageUrl: string;
  isEarned: boolean;
}

const userBadges: Badge[] = [
  {
    id: 1,
    name: "Money Historian",
    description: "Completed all lessons about the history and evolution of money",
    realmId: 1,
    dateEarned: "2025-03-15",
    imageUrl: "/badges/money-historian.svg",
    isEarned: true
  },
  {
    id: 2,
    name: "Crypto Defender",
    description: "Successfully understood and applied cryptography principles",
    realmId: 2,
    dateEarned: "2025-03-18",
    imageUrl: "/badges/crypto-defender.svg",
    isEarned: true
  },
  {
    id: 3,
    name: "Bitcoin Beginner",
    description: "Mastered the core concepts of Bitcoin",
    realmId: 2,
    dateEarned: "2025-03-20",
    imageUrl: "/badges/bitcoin-beginner.svg",
    isEarned: true
  },
  {
    id: 4,
    name: "Wallet Wizard",
    description: "Set up and secured Bitcoin wallets correctly",
    realmId: 2,
    dateEarned: "",
    imageUrl: "/badges/wallet-wizard.svg",
    isEarned: false
  },
  {
    id: 5,
    name: "Transaction Expert",
    description: "Understands how Bitcoin transactions work",
    realmId: 2,
    dateEarned: "",
    imageUrl: "/badges/transaction-expert.svg",
    isEarned: false
  },
  {
    id: 6,
    name: "Network Guardian",
    description: "Comprehends the Bitcoin network and consensus mechanisms",
    realmId: 3,
    dateEarned: "",
    imageUrl: "/badges/network-guardian.svg",
    isEarned: false
  },
  {
    id: 7,
    name: "Sustainable Miner",
    description: "Understands Bitcoin mining and energy considerations",
    realmId: 2,
    dateEarned: "",
    imageUrl: "/badges/sustainable-miner.svg",
    isEarned: false
  },
  {
    id: 8,
    name: "Lightning Master",
    description: "Successfully learned about Lightning Network and scaling",
    realmId: 2,
    dateEarned: "",
    imageUrl: "/badges/lightning-master.svg",
    isEarned: false
  },
  {
    id: 9,
    name: "Bitcoin Guardian",
    description: "Knows how to secure Bitcoin and avoid common risks",
    realmId: 3,
    dateEarned: "",
    imageUrl: "/badges/bitcoin-guardian.svg",
    isEarned: false
  },
  {
    id: 10,
    name: "Decentralization Defender",
    description: "Understands Bitcoin governance and decentralization",
    realmId: 4,
    dateEarned: "",
    imageUrl: "/badges/decentralization-defender.svg",
    isEarned: false
  },
  {
    id: 11,
    name: "Bitcoin Ambassador",
    description: "Learned about real-world Bitcoin applications in Africa",
    realmId: 5,
    dateEarned: "",
    imageUrl: "/badges/bitcoin-ambassador.svg",
    isEarned: false
  }
];

const certificates: Certificate[] = [
  {
    id: 1,
    name: "Bitcoin Fundamentals Certificate",
    description: "Completed Realms 1 & 2: Origins and Forest of Sparks",
    dateEarned: "2025-03-22",
    imageUrl: "/certificates/bitcoin-fundamentals.svg",
    isEarned: true
  },
  {
    id: 2,
    name: "Bitcoin Security & Sovereignty Certificate",
    description: "Completed Realm 3: The Central Citadel",
    dateEarned: "",
    imageUrl: "/certificates/bitcoin-security.svg",
    isEarned: false
  },
  {
    id: 3,
    name: "Bitcoin Governance Certificate",
    description: "Completed Realm 4: Council of Forks",
    dateEarned: "",
    imageUrl: "/certificates/bitcoin-governance.svg",
    isEarned: false
  },
  {
    id: 4,
    name: "Bitcoin in Africa Certificate",
    description: "Completed Realm 5: Ubuntu Village",
    dateEarned: "",
    imageUrl: "/certificates/bitcoin-africa.svg",
    isEarned: false
  },
  {
    id: 5,
    name: "Bitcoin Quest Master Certificate",
    description: "Completed all realms and earned all badges in Asha's Journey",
    dateEarned: "",
    imageUrl: "/certificates/bitcoin-master.svg",
    isEarned: false
  }
];

export default function BadgesPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'badges' | 'certificates'>('badges');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  
  // Get badge counts
  const earnedBadges = userBadges.filter(badge => badge.isEarned);
  const totalBadges = userBadges.length;
  const badgePercentage = Math.round((earnedBadges.length / totalBadges) * 100);
  
  const earnedCertificates = certificates.filter(cert => cert.isEarned);
  
  const handleViewCertificate = (certificate: Certificate) => {
    if (certificate.isEarned) {
      setSelectedCertificate(certificate);
    }
  };
  
  const handleCloseCertificate = () => {
    setSelectedCertificate(null);
  };
  
  return (
    <ThemeContainer className="bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
      <NavBar />
      
      {/* Header with back button */}
      <header className="container mx-auto px-4 py-4">
        <button 
          onClick={() => setLocation('/')} 
          className="flex items-center text-secondary hover:text-primary"
        >
          <span className="mr-1">←</span> Back to Journey
        </button>
      </header>
      
      <div className="container mx-auto px-4 py-6">
      <ThemeHeading className="mb-2 text-center" >Your Achievements</ThemeHeading>
        <p className="text-lightText/80 max-w-2xl mx-auto text-center mb-8">
          Track your progress through Asha's journey with these badges and certificates.
          Each represents knowledge and skills gained along the way.
        </p>
        
        {/* Progress Summary */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-darkBg/50 border border-secondary/20 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-darkBg/70 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{earnedBadges.length}</div>
                <div className="text-sm text-lightText/70">Badges Earned</div>
              </div>
              <div className="bg-darkBg/70 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{totalBadges - earnedBadges.length}</div>
                <div className="text-sm text-lightText/70">Badges to Earn</div>
              </div>
              <div className="bg-darkBg/70 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{earnedCertificates.length}</div>
                <div className="text-sm text-lightText/70">Certificates Earned</div>
              </div>
            </div>
            
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-lightText/70">Overall Progress</span>
              <span className="text-primary font-medium">{badgePercentage}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${badgePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex border-b border-secondary/20">
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'badges' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-lightText/60 hover:text-lightText/90'
              }`}
            >
              Badges
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'certificates' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-lightText/60 hover:text-lightText/90'
              }`}
            >
              Certificates
            </button>
          </div>
        </div>
        
        {/* Badge Grid */}
        {activeTab === 'badges' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
              {userBadges.map(badge => {
                const realm = INITIAL_REALMS.find(r => r.id === badge.realmId);
                
                return (
                  <div 
                    key={badge.id}
                    className={`bg-darkBg/50 border border-secondary/20 rounded-lg p-4 text-center ${
                      !badge.isEarned && 'opacity-50'
                    }`}
                  >
                    <div className="w-20 h-20 mx-auto mb-3">
                      <img 
                        src={badge.imageUrl || '/placeholder-badge.svg'} 
                        alt={badge.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-lightText mb-1">{badge.name}</h3>
                    <p className="text-xs text-lightText/60 mb-2 line-clamp-2" title={badge.description}>
                      {badge.description}
                    </p>
                    <div className="text-xs text-primary">
                      {realm?.name}
                    </div>
                    {badge.isEarned && (
                      <>
                        <div className="mt-2 text-xs text-green-400">
                          Earned on {new Date(badge.dateEarned).toLocaleDateString()}
                        </div>
                        <div className="mt-3">
                          <ShareButton 
                            title={`I earned the ${badge.name} badge!`}
                            text={`I'm learning Bitcoin with Bitcoin Quest and just earned the ${badge.name} badge!`}
                            hashtags={['BitcoinQuest', 'LearnBitcoin']}
                            variant="icon-only"
                            size="sm"
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Certificates Grid */}
        {activeTab === 'certificates' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {certificates.map(certificate => (
                <div 
                  key={certificate.id}
                  className={`bg-darkBg/50 border border-secondary/20 rounded-lg overflow-hidden ${
                    !certificate.isEarned && 'opacity-50'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={certificate.imageUrl || '/placeholder-certificate.svg'} 
                      alt={certificate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lightText text-lg mb-2">{certificate.name}</h3>
                    <p className="text-sm text-lightText/70 mb-3">
                      {certificate.description}
                    </p>
                    
                    {certificate.isEarned ? (
                      <>
                        <div className="text-xs text-green-400 mb-3">
                          Earned on {new Date(certificate.dateEarned).toLocaleDateString()}
                        </div>
                        <GradientButton 
                          onClick={() => handleViewCertificate(certificate)}
                          className="w-full"
                        >
                          View Certificate
                        </GradientButton>
                      </>
                    ) : (
                      <OutlineButton 
                        className="w-full opacity-70 cursor-not-allowed"
                        disabled
                      >
                        Not Yet Earned
                      </OutlineButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-darkBg border border-secondary/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-lightText">{selectedCertificate.name}</h2>
                <button 
                  onClick={handleCloseCertificate}
                  className="text-lightText/50 hover:text-lightText p-1"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <div className="border border-primary/30 rounded-lg overflow-hidden">
                  <img 
                    src={selectedCertificate.imageUrl || '/placeholder-certificate.svg'} 
                    alt={selectedCertificate.name}
                    className="w-full object-contain"
                  />
                </div>
              </div>
              
              <div className="mb-6 text-center">
                <p className="text-sm text-lightText/70 mb-2">
                  {selectedCertificate.description}
                </p>
                <p className="text-xs text-green-400">
                  Earned on {new Date(selectedCertificate.dateEarned).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex flex-wrap justify-between gap-3">
                <ShareButton 
                  title={`I earned the ${selectedCertificate.name}!`}
                  text={`I just completed Bitcoin Quest training and earned the ${selectedCertificate.name}. Join me on this learning journey!`}
                  hashtags={['BitcoinQuest', 'BitcoinCertificate', 'BitcoinEducation']}
                />
                
                <div className="flex gap-3">
                  <OutlineButton onClick={handleCloseCertificate}>
                    Close
                  </OutlineButton>
                  <GradientButton>
                    Download PDF
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeContainer>
  );
}