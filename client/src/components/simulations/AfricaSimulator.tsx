import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AfricaSimulatorProps {
  onComplete: () => void;
  theme?: any;
}

export default function AfricaSimulator() {
  const [scenario, setScenario] = useState(0);
  const scenarios = [
    {
      title: "Cross-Border Remittance",
      challenge: "Send money from South Africa to Zimbabwe",
      steps: ["Convert to Bitcoin", "Send to recipient wallet", "Convert to local currency"]
    },
    {
      title: "Local Business Payment",
      challenge: "Process payment at a Kenyan marketplace",
      steps: ["Generate QR code", "Receive Lightning payment", "Confirm transaction"]
    }
  ];

  return (
    <div className="bg-black/30 p-6 rounded-xl">
      <h3 className="text-2xl font-bold text-rose-500 mb-4">Interactive Bitcoin Simulator</h3>
      {scenarios.map((s, i) => (
        <motion.div 
          key={i}
          className="bg-black/20 p-4 rounded-lg mb-4 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => setScenario(i)}
        >
          <h4 className="text-lg font-semibold text-rose-400">{s.title}</h4>
          <p className="text-gray-300 mt-2">{s.challenge}</p>
        </motion.div>
      ))}
    </div>
  );
}