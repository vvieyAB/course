import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ThemeContainer, ThemeHeading, GradientButton } from '@/components/ui/theme';
import { NavBar } from '@/components/ui/nav-bar';

interface BitcoinProject {
  id: number;
  name: string;
  country: string;
  description: string;
  type: 'Exchange' | 'Payment' | 'Education' | 'Mining' | 'Remittance';
  coordinates: {
    x: number;  // percentage from left
    y: number;  // percentage from top
  };
  imageUrl?: string;
  website?: string;
}

// Sample Bitcoin projects across Africa
const bitcoinProjects: BitcoinProject[] = [
  {
    id: 1,
    name: "Quidax",
    country: "Nigeria",
    description: "A cryptocurrency exchange serving Nigeria and West Africa, enabling Bitcoin trading and remittances.",
    type: "Exchange",
    coordinates: { x: 47, y: 58 },
    imageUrl: "/projects/quidax.svg",
    website: "https://www.quidax.com"
  },
  {
    id: 2,
    name: "BitPesa / Chipper Cash",
    country: "Kenya",
    description: "A payment platform using Bitcoin and blockchain technology to enable faster and cheaper cross-border transfers.",
    type: "Payment",
    coordinates: { x: 60, y: 60 },
    imageUrl: "/projects/bitpesa.svg",
    website: "https://www.chippercash.com"
  },
  {
    id: 3,
    name: "Paxful",
    country: "South Africa",
    description: "A peer-to-peer Bitcoin marketplace with strong presence in South Africa, enabling direct Bitcoin trading.",
    type: "Exchange",
    coordinates: { x: 53, y: 88 },
    imageUrl: "/projects/paxful.svg",
    website: "https://paxful.com"
  },
  {
    id: 4,
    name: "Gridless",
    country: "Kenya",
    description: "Bitcoin mining company using renewable energy in rural Kenya, providing power to local communities.",
    type: "Mining",
    coordinates: { x: 63, y: 64 },
    imageUrl: "/projects/gridless.svg",
    website: "https://gridlesscompute.com"
  },
  {
    id: 5,
    name: "Bitcoin Ekasi",
    country: "South Africa",
    description: "A Bitcoin Beach-inspired project creating a circular Bitcoin economy in a South African township.",
    type: "Education",
    coordinates: { x: 55, y: 90 },
    imageUrl: "/projects/bitcoin-ekasi.svg",
    website: "https://bitcoinekasi.com"
  },
  {
    id: 6,
    name: "Akon City Crypto",
    country: "Senegal",
    description: "A cryptocurrency initiative tied to Akon City development, promoting Bitcoin and blockchain adoption.",
    type: "Education",
    coordinates: { x: 34, y: 55 },
    imageUrl: "/projects/akon-city.svg",
    website: "https://akoncity.com"
  },
  {
    id: 7,
    name: "Kotani Pay",
    country: "Kenya",
    description: "A fintech enabling crypto payments for mobile money users in Kenya and East Africa.",
    type: "Payment",
    coordinates: { x: 62, y: 62 },
    imageUrl: "/projects/kotani-pay.svg",
    website: "https://kotanipay.com"
  }
];

export default function AfricaMapPage() {
  const [, setLocation] = useLocation();
  const [selectedProject, setSelectedProject] = useState<BitcoinProject | null>(null);
  const [filter, setFilter] = useState<string>('All');
  
  const filteredProjects = filter === 'All' 
    ? bitcoinProjects 
    : bitcoinProjects.filter(project => project.type === filter);
  
  const handleProjectClick = (project: BitcoinProject) => {
    setSelectedProject(project);
  };
  
  const handleClose = () => {
    setSelectedProject(null);
  };
  
  const projectTypeColors: Record<string, string> = {
    'Exchange': 'bg-blue-500/70',
    'Payment': 'bg-green-500/70',
    'Education': 'bg-yellow-500/70',
    'Mining': 'bg-red-500/70',
    'Remittance': 'bg-purple-500/70',
    'All': 'bg-primary/70'
  };
  
  return (
    <ThemeContainer className="bg-gradient-to-b from-red-900/80 to-red-950 min-h-screen">
      <NavBar />
      
      {/* Header with back button */}
      <header className="container mx-auto px-4 py-4">
        <button 
          onClick={() => setLocation('/realm/5')} 
          className="flex items-center text-red-200 hover:text-primary transition-colors"
        >
          <span className="mr-1">←</span> Back to Ubuntu Village
        </button>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <ThemeHeading className="mb-4 text-center">Bitcoin Projects Across Africa</ThemeHeading>
             
        <p className="text-lightText/90 max-w-3xl mx-auto text-center mb-8">
          Explore the growing Bitcoin ecosystem across the African continent. 
          Click on a marker to learn more about each project and how they're 
          using Bitcoin technology to create positive change.
        </p>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['All', 'Exchange', 'Payment', 'Education', 'Mining', 'Remittance'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === type 
                  ? `${projectTypeColors[type]} text-white` 
                  : 'bg-darkBg/50 text-lightText/80 hover:bg-darkBg'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        
        {/* Map Container */}
        <div className="relative mx-auto max-w-5xl mb-12 border border-red-500/20 rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-[4/3] relative">
            {/* Africa Map SVG or Image */}
            <img 
              src="/africa-map.svg" 
              alt="Map of Africa" 
              className="w-full h-full object-contain"
            />
            
            {/* Project Markers */}
            {filteredProjects.map(project => (
              <button 
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className={`absolute z-10 w-5 h-5 rounded-full ${projectTypeColors[project.type]} border-2 border-white transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform`}
                style={{ 
                  left: `${project.coordinates.x}%`, 
                  top: `${project.coordinates.y}%` 
                }}
                title={project.name}
              />
            ))}
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-darkBg/90 backdrop-blur-sm p-3 rounded-lg border border-secondary/20">
            <h4 className="text-lightText/90 text-sm font-bold mb-2">Legend</h4>
            <div className="space-y-1">
              {Object.entries(projectTypeColors).filter(([key]) => key !== 'All').map(([type, color]) => (
                <div key={type} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${color} mr-2`} />
                  <span className="text-lightText/80 text-xs">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Project List - Mobile Friendly Alternative */}
        <div className="md:hidden mb-12">
          <h3 className="text-lightText/90 font-bold mb-4">Bitcoin Projects List</h3>
          <div className="space-y-3">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="bg-darkBg/50 border border-secondary/20 rounded-lg p-4 cursor-pointer hover:bg-darkBg/70"
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${projectTypeColors[project.type]} mr-3`} />
                  <h4 className="font-bold text-lightText/90">{project.name}</h4>
                </div>
                <div className="text-sm text-lightText/70 mt-1">{project.country}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-darkBg border border-red-500/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 text-white" 
                    style={{ backgroundColor: projectTypeColors[selectedProject.type].replace('/70', '') }}
                  >
                    {selectedProject.type}
                  </div>
                  <h2 className="text-2xl font-bold text-lightText">{selectedProject.name}</h2>
                  <p className="text-lightText/70">{selectedProject.country}</p>
                </div>
                <button 
                  onClick={handleClose}
                  className="text-lightText/50 hover:text-lightText p-1"
                >
                  ✕
                </button>
              </div>
              
              {selectedProject.imageUrl && (
                <div className="mb-4">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="mb-6">
                <p className="text-lightText/90 mb-4">{selectedProject.description}</p>
                
                {selectedProject.website && (
                  <a 
                    href={selectedProject.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
              
              <div className="flex justify-end">
                <GradientButton onClick={handleClose}>
                  Close
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeContainer>
  );
}