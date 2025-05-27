import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// The Central Citadel - Realm 2 Home Page
export default function Realm2Home() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Handler to navigate to missions
  const handleStartMission = (missionId: number) => {
    setLocation(`/realm/2/mission/${missionId}`);
  };

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Item animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-medium text-purple-500">Loading The Central Citadel...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8" 
         style={{
           background: "linear-gradient(to bottom, #000000, #1a001a)",
           backgroundImage: "url('/realms/citadel.jpg')",
           backgroundSize: "cover",
           backgroundPosition: "center",
           backgroundAttachment: "fixed",
           backgroundBlendMode: "overlay"
         }}>
      
      <div className="max-w-5xl mx-auto">
        <div className="backdrop-blur-md bg-black/60 rounded-xl p-6 mb-8 border border-purple-900/50">
          <h1 className="text-4xl font-bold text-purple-500 mb-2">The Central Citadel</h1>
          <p className="text-xl text-purple-200 mb-6">Realm 2: Where Privacy Meets Control</p>
          
          <p className="text-gray-300 mb-4">
            Welcome to The Central Citadel, a walled city-state where every transaction is monitored, every purchase is tracked, 
            and financial freedom is just an illusion.
          </p>
          
          <p className="text-gray-300 mb-4">
            In this realm, Asha will discover how centralized monetary control creates a surveillance system where privacy becomes a luxury, 
            and why Bitcoin offers an alternative approach to financial sovereignty.
          </p>
          
          <div className="flex space-x-4 mt-8">
            <button 
              onClick={() => setLocation('/map')}
              className="px-5 py-2 bg-transparent border border-purple-600 text-purple-400 rounded-md hover:bg-purple-900/30 transition-colors"
            >
              Return to Map
            </button>
            <button 
              onClick={() => handleStartMission(1)}
              className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Begin Journey
            </button>
          </div>
        </div>
        
        {/* Mission cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div 
            variants={itemVariants}
            className="backdrop-blur-md bg-black/60 rounded-xl p-5 border border-purple-900/50 hover:border-purple-500/70 transition-all cursor-pointer"
            onClick={() => handleStartMission(1)}
          >
            <div className="h-40 rounded-lg bg-gradient-to-br from-purple-700 to-purple-900 mb-4 flex items-center justify-center">
              <span className="text-5xl">👁️</span>
            </div>
            <h3 className="text-xl font-medium text-purple-400 mb-2">The Citadel's Shadows</h3>
            <p className="text-gray-400">Learn how centralized monetary systems enable surveillance and financial control.</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="backdrop-blur-md bg-black/60 rounded-xl p-5 border border-purple-900/50 hover:border-purple-500/70 transition-all cursor-pointer"
            onClick={() => handleStartMission(2)}
          >
            <div className="h-40 rounded-lg bg-gradient-to-br from-purple-700 to-purple-900 mb-4 flex items-center justify-center">
              <span className="text-5xl">🔐</span>
            </div>
            <h3 className="text-xl font-medium text-purple-400 mb-2">Privacy vs Control</h3>
            <p className="text-gray-400">Explore the balance between financial transparency and personal privacy.</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="backdrop-blur-md bg-black/60 rounded-xl p-5 border border-purple-900/50 hover:border-purple-500/70 transition-all cursor-pointer"
            onClick={() => handleStartMission(3)}
          >
            <div className="h-40 rounded-lg bg-gradient-to-br from-purple-700 to-purple-900 mb-4 flex items-center justify-center">
              <span className="text-5xl">💸</span>
            </div>
            <h3 className="text-xl font-medium text-purple-400 mb-2">CBDCs and Privacy</h3>
            <p className="text-gray-400">Understand how Central Bank Digital Currencies might affect financial privacy.</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="backdrop-blur-md bg-black/60 rounded-xl p-5 border border-purple-900/50 hover:border-purple-500/70 transition-all cursor-pointer"
            onClick={() => handleStartMission(4)}
          >
            <div className="h-40 rounded-lg bg-gradient-to-br from-purple-700 to-purple-900 mb-4 flex items-center justify-center">
              <span className="text-5xl">🔍</span>
            </div>
            <h3 className="text-xl font-medium text-purple-400 mb-2">Bitcoin's Transparency</h3>
            <p className="text-gray-400">Discover how Bitcoin balances transparency with pseudonymity.</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="backdrop-blur-md bg-black/60 rounded-xl p-5 border border-purple-900/50 hover:border-purple-500/70 transition-all cursor-pointer"
            onClick={() => handleStartMission(5)}
          >
            <div className="h-40 rounded-lg bg-gradient-to-br from-purple-700 to-purple-900 mb-4 flex items-center justify-center">
              <span className="text-5xl">⚡</span>
            </div>
            <h3 className="text-xl font-medium text-purple-400 mb-2">Lightning Network</h3>
            <p className="text-gray-400">Learn how Bitcoin's Layer 2 solutions enhance privacy and transaction efficiency.</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="backdrop-blur-md bg-black/60 rounded-xl p-5 border border-purple-900/50 hover:border-purple-500/70 transition-all cursor-pointer"
            onClick={() => handleStartMission(6)}
          >
            <div className="h-40 rounded-lg bg-gradient-to-br from-purple-700 to-purple-900 mb-4 flex items-center justify-center">
              <span className="text-5xl">🛡️</span>
            </div>
            <h3 className="text-xl font-medium text-purple-400 mb-2">Self-Custody</h3>
            <p className="text-gray-400">Explore why "not your keys, not your coins" matters for financial sovereignty.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}