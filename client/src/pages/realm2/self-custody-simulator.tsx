import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, ShieldAlert, Key, Lock } from 'lucide-react';

interface SelfCustodySimulatorProps {
  onComplete: () => void;
}

export default function SelfCustodySimulator({ onComplete }: SelfCustodySimulatorProps) {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [showSeed, setShowSeed] = useState(false);
  const [keystoreType, setKeystoreType] = useState<'exchange' | 'software' | 'hardware'>('exchange');
  const [confirmedSeed, setConfirmedSeed] = useState(false);
  const [securityQuiz, setSecurityQuiz] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: ''
  });
  
  // Generate a random seed phrase on mount
  useEffect(() => {
    const wordlist = [
      "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
      "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
      "action", "actor", "actress", "actual", "adapt", "add", "addict", "address", "adjust", "admit",
      "adult", "advance", "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent"
    ];
    
    // Generate a random 12-word seed phrase
    const newSeed = Array(12).fill(0).map(() => {
      const randomIndex = Math.floor(Math.random() * wordlist.length);
      return wordlist[randomIndex];
    });
    
    setSeedPhrase(newSeed);
  }, []);
  
  // Handle quiz answers
  const handleQuizChange = (question: string, answer: string) => {
    setSecurityQuiz(prev => ({
      ...prev,
      [question]: answer
    }));
  };
  
  // Check if quiz is passed
  const isQuizPassed = () => {
    return securityQuiz.q1 === 'never' && securityQuiz.q2 === 'not-your-keys' && securityQuiz.q3 === 'backup';
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (step === 4 && !isQuizPassed()) {
      // Don't advance if quiz isn't passed
      return;
    }
    
    if (step < 5) {
      setStep(step + 1);
    } else if (!completed) {
      setCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };
  
  return (
    <div className="mt-4 mb-8">
      <div className="bg-black/30 border border-purple-900 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">
          Self-Custody Workshop
        </h3>
        
        {/* Step indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600' : 'bg-gray-700'}`}>
              1
            </div>
            <div className={`h-1 w-8 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600' : 'bg-gray-700'}`}>
              2
            </div>
            <div className={`h-1 w-8 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600' : 'bg-gray-700'}`}>
              3
            </div>
            <div className={`h-1 w-8 ${step >= 4 ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-purple-600' : 'bg-gray-700'}`}>
              4
            </div>
            <div className={`h-1 w-8 ${step >= 5 ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 5 ? 'bg-purple-600' : 'bg-gray-700'}`}>
              5
            </div>
          </div>
        </div>
        
        {/* Step content */}
        <motion.div 
          key={`step-${step}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Step 1: Introduction */}
          {step === 1 && (
            <div>
              <h4 className="text-lg font-medium text-purple-300 mb-3">The Power of Self-Custody</h4>
              
              <p className="text-gray-300 mb-4">
                In the Citadel, all financial assets are controlled by central authorities. Citizens don't truly own their money—they 
                merely have permission to use it, which can be revoked at any time.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-black/40 p-4 rounded border border-purple-900/30">
                  <h5 className="text-md font-medium text-purple-300 mb-3 flex items-center">
                    <ShieldAlert className="h-5 w-5 mr-2 text-red-400" />
                    Custodial Risks
                  </h5>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li>Funds can be frozen or seized by authorities</li>
                    <li>Transactions can be blocked or censored</li>
                    <li>Financial surveillance tracks all activity</li>
                    <li>Third-party risk (hacks, insolvency, fraud)</li>
                    <li>Requires permission to access your own money</li>
                  </ul>
                </div>
                
                <div className="bg-black/40 p-4 rounded border border-purple-900/30">
                  <h5 className="text-md font-medium text-purple-300 mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-400" />
                    Self-Custody Benefits
                  </h5>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li>Complete control of your own funds</li>
                    <li>Immune to account freezes or seizures</li>
                    <li>No permission needed for transactions</li>
                    <li>Enhanced privacy from surveillance</li>
                    <li>True financial sovereignty</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
                <h5 className="text-md font-medium text-purple-300 mb-2">Not Your Keys, Not Your Coins</h5>
                <p className="text-gray-300">
                  The fundamental principle of Bitcoin self-custody is simple but powerful: whoever controls the private keys controls the bitcoin. If you don't control your keys, you don't truly own your bitcoin—you're merely trusting someone else to honor their promise to give it back.
                </p>
              </div>
            </div>
          )}
          
          {/* Step 2: Key Storage Options */}
          {step === 2 && (
            <div>
              <h4 className="text-lg font-medium text-purple-300 mb-3">Custody Options</h4>
              
              <p className="text-gray-300 mb-4">
                There are different ways to store your bitcoin, each with different security and convenience trade-offs. 
                Select an option to learn more about it.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div 
                  className={`bg-black/40 p-4 rounded border transition-colors cursor-pointer ${
                    keystoreType === 'exchange' 
                      ? 'border-purple-500 bg-purple-900/20' 
                      : 'border-purple-900/30 hover:border-purple-900/60'
                  }`}
                  onClick={() => setKeystoreType('exchange')}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="text-md font-medium text-purple-300">Exchange</h5>
                    <div className="h-6 w-6 rounded-full flex items-center justify-center border-2 border-purple-500">
                      {keystoreType === 'exchange' && <div className="h-3 w-3 rounded-full bg-purple-500"></div>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Custodial Storage</p>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Security</span>
                    <span>Low</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-red-500" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Convenience</span>
                    <span>High</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div 
                  className={`bg-black/40 p-4 rounded border transition-colors cursor-pointer ${
                    keystoreType === 'software' 
                      ? 'border-purple-500 bg-purple-900/20' 
                      : 'border-purple-900/30 hover:border-purple-900/60'
                  }`}
                  onClick={() => setKeystoreType('software')}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="text-md font-medium text-purple-300">Software Wallet</h5>
                    <div className="h-6 w-6 rounded-full flex items-center justify-center border-2 border-purple-500">
                      {keystoreType === 'software' && <div className="h-3 w-3 rounded-full bg-purple-500"></div>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Self-Custody on Device</p>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Security</span>
                    <span>Medium</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-yellow-500" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Convenience</span>
                    <span>Medium</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div 
                  className={`bg-black/40 p-4 rounded border transition-colors cursor-pointer ${
                    keystoreType === 'hardware' 
                      ? 'border-purple-500 bg-purple-900/20' 
                      : 'border-purple-900/30 hover:border-purple-900/60'
                  }`}
                  onClick={() => setKeystoreType('hardware')}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="text-md font-medium text-purple-300">Hardware Wallet</h5>
                    <div className="h-6 w-6 rounded-full flex items-center justify-center border-2 border-purple-500">
                      {keystoreType === 'hardware' && <div className="h-3 w-3 rounded-full bg-purple-500"></div>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Dedicated Security Device</p>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Security</span>
                    <span>High</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-green-500" style={{ width: '90%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Convenience</span>
                    <span>Medium</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
                <h5 className="text-md font-medium text-purple-300 mb-2">Storage Comparison</h5>
                
                {keystoreType === 'exchange' && (
                  <div>
                    <p className="text-gray-300 mb-3">
                      <span className="text-red-400 font-medium">Exchange storage</span> means letting a third party (like a cryptocurrency exchange) hold your bitcoin for you. This is the equivalent of keeping your money in a bank in the Citadel.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-sm font-medium text-red-400 mb-1">Risks</h6>
                        <ul className="list-disc pl-5 text-xs text-gray-300 space-y-1">
                          <li>Exchange could be hacked</li>
                          <li>Exchange could go bankrupt</li>
                          <li>Assets can be frozen by exchanges or authorities</li>
                          <li>Complete loss of privacy</li>
                          <li>No control over your own funds</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-green-400 mb-1">Benefits</h6>
                        <ul className="list-disc pl-5 text-xs text-gray-300 space-y-1">
                          <li>No technical knowledge required</li>
                          <li>No responsibility for key management</li>
                          <li>Easy account recovery if password is lost</li>
                          <li>Simple user interfaces</li>
                          <li>Convenient for frequent trading</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {keystoreType === 'software' && (
                  <div>
                    <p className="text-gray-300 mb-3">
                      <span className="text-yellow-400 font-medium">Software wallets</span> store your private keys on your computer or smartphone. You control your own keys, but they're stored on internet-connected devices.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-sm font-medium text-red-400 mb-1">Risks</h6>
                        <ul className="list-disc pl-5 text-xs text-gray-300 space-y-1">
                          <li>Device could be hacked or compromised</li>
                          <li>Malware could steal keys</li>
                          <li>Device could be lost or damaged</li>
                          <li>Requires good backup practices</li>
                          <li>Phishing and social engineering attacks</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-green-400 mb-1">Benefits</h6>
                        <ul className="list-disc pl-5 text-xs text-gray-300 space-y-1">
                          <li>You control your own private keys</li>
                          <li>No permission needed to transact</li>
                          <li>Improved privacy (depending on usage)</li>
                          <li>Convenient and accessible</li>
                          <li>Free to use</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {keystoreType === 'hardware' && (
                  <div>
                    <p className="text-gray-300 mb-3">
                      <span className="text-green-400 font-medium">Hardware wallets</span> are dedicated devices designed specifically for securely storing cryptocurrency private keys offline, isolated from internet-connected devices.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-sm font-medium text-red-400 mb-1">Risks</h6>
                        <ul className="list-disc pl-5 text-xs text-gray-300 space-y-1">
                          <li>Physical device could be lost or damaged</li>
                          <li>Requires secure backup management</li>
                          <li>Initial setup can be complex</li>
                          <li>Additional cost to purchase device</li>
                          <li>Less convenient for frequent transactions</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-green-400 mb-1">Benefits</h6>
                        <ul className="list-disc pl-5 text-xs text-gray-300 space-y-1">
                          <li>Private keys never leave the secure device</li>
                          <li>Resistant to computer malware</li>
                          <li>Physical confirmation of transactions</li>
                          <li>Protection against online attacks</li>
                          <li>Industry standard for securing significant value</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Step 3: Seed Phrase Management */}
          {step === 3 && (
            <div>
              <h4 className="text-lg font-medium text-purple-300 mb-3">Seed Phrase: Your Master Key</h4>
              
              <p className="text-gray-300 mb-4">
                The most important element of self-custody is your seed phrase (or recovery phrase). This is a list of 12-24 words that serves as the master key to all your funds.
              </p>
              
              <div className="bg-black/40 p-4 rounded border border-purple-900/30 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-md font-medium text-purple-300">Your Seed Phrase (Demo)</h5>
                  <button 
                    onClick={() => setShowSeed(!showSeed)}
                    className="flex items-center text-sm text-purple-400 hover:text-purple-300"
                  >
                    {showSeed ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-1" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" />
                        Show
                      </>
                    )}
                  </button>
                </div>
                
                {showSeed ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-3">
                    {seedPhrase.map((word, index) => (
                      <div key={index} className="bg-purple-900/20 p-2 rounded border border-purple-900/40 flex items-center">
                        <span className="text-gray-400 text-xs mr-2">{index + 1}.</span>
                        <span className="text-gray-200 text-sm font-mono">{word}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-3">
                    {Array(12).fill(0).map((_, index) => (
                      <div key={index} className="bg-purple-900/20 p-2 rounded border border-purple-900/40 flex items-center">
                        <span className="text-gray-400 text-xs mr-2">{index + 1}.</span>
                        <span className="text-gray-200 text-sm font-mono">••••••</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center mt-2">
                  <input 
                    type="checkbox" 
                    id="seed-confirm" 
                    checked={confirmedSeed}
                    onChange={() => setConfirmedSeed(!confirmedSeed)}
                    className="h-4 w-4 text-purple-600 rounded border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                  />
                  <label htmlFor="seed-confirm" className="ml-2 text-sm text-gray-300">
                    I understand that if I lose this seed phrase, I will lose access to my funds forever.
                  </label>
                </div>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
                <h5 className="text-md font-medium text-purple-300 mb-2 flex items-center">
                  <Key className="h-5 w-5 mr-2 text-yellow-400" />
                  Seed Phrase Security
                </h5>
                
                <p className="text-gray-300 mb-3">
                  Your seed phrase is the master key to all your funds. Anyone who has access to it can take your bitcoin.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 p-3 rounded border border-red-900/40">
                    <h6 className="text-sm font-medium text-red-300 mb-1">NEVER</h6>
                    <ul className="list-disc pl-5 text-xs text-gray-300 space-y-1">
                      <li>Store your seed phrase digitally (photo, text file, email)</li>
                      <li>Enter it on websites or share it with anyone</li>
                      <li>Keep only one copy</li>
                      <li>Store it without protection from fire/water damage</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-900/20 p-3 rounded border border-green-900/40">
                    <h6 className="text-sm font-medium text-green-300 mb-1">RECOMMENDED</h6>
                    <ul className="list-disc pl-5 text-xs text-gray-300 space-y-1">
                      <li>Write it on metal (fire/water resistant)</li>
                      <li>Store in a secure location (safe, vault)</li>
                      <li>Consider geographical distribution of backups</li>
                      <li>Test recovery before storing significant funds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Security Quiz */}
          {step === 4 && (
            <div>
              <h4 className="text-lg font-medium text-purple-300 mb-3">Security Knowledge Check</h4>
              
              <p className="text-gray-300 mb-4">
                Before completing the self-custody workshop, verify your understanding of the key concepts by answering the following questions.
              </p>
              
              <div className="space-y-6 mb-6">
                <div className="bg-black/40 p-4 rounded border border-purple-900/30">
                  <h5 className="text-md font-medium text-purple-300 mb-2">1. When is it safe to share your seed phrase?</h5>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q1-support" 
                        name="q1" 
                        value="support"
                        checked={securityQuiz.q1 === 'support'}
                        onChange={() => handleQuizChange('q1', 'support')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q1-support" className="ml-2 text-sm text-gray-300">
                        When customer support from an exchange or wallet asks for it
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q1-website" 
                        name="q1" 
                        value="website"
                        checked={securityQuiz.q1 === 'website'}
                        onChange={() => handleQuizChange('q1', 'website')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q1-website" className="ml-2 text-sm text-gray-300">
                        When a website needs to verify your wallet
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q1-trusted" 
                        name="q1" 
                        value="trusted"
                        checked={securityQuiz.q1 === 'trusted'}
                        onChange={() => handleQuizChange('q1', 'trusted')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q1-trusted" className="ml-2 text-sm text-gray-300">
                        With trusted family members for inheritance planning
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q1-never" 
                        name="q1" 
                        value="never"
                        checked={securityQuiz.q1 === 'never'}
                        onChange={() => handleQuizChange('q1', 'never')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q1-never" className="ml-2 text-sm text-gray-300">
                        Never - under no circumstances should you share your seed phrase with anyone
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/40 p-4 rounded border border-purple-900/30">
                  <h5 className="text-md font-medium text-purple-300 mb-2">2. What does the phrase "Not your keys, not your coins" mean?</h5>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q2-security" 
                        name="q2" 
                        value="security"
                        checked={securityQuiz.q2 === 'security'}
                        onChange={() => handleQuizChange('q2', 'security')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q2-security" className="ml-2 text-sm text-gray-300">
                        Your private keys should be kept secure
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q2-not-your-keys" 
                        name="q2" 
                        value="not-your-keys"
                        checked={securityQuiz.q2 === 'not-your-keys'}
                        onChange={() => handleQuizChange('q2', 'not-your-keys')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q2-not-your-keys" className="ml-2 text-sm text-gray-300">
                        If you don't control the private keys, you don't truly own the bitcoin—you're trusting someone else with custody
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q2-hardware" 
                        name="q2" 
                        value="hardware"
                        checked={securityQuiz.q2 === 'hardware'}
                        onChange={() => handleQuizChange('q2', 'hardware')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q2-hardware" className="ml-2 text-sm text-gray-300">
                        You should use a hardware wallet for best security
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q2-backup" 
                        name="q2" 
                        value="backup"
                        checked={securityQuiz.q2 === 'backup'}
                        onChange={() => handleQuizChange('q2', 'backup')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q2-backup" className="ml-2 text-sm text-gray-300">
                        Always have a backup of your private keys
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/40 p-4 rounded border border-purple-900/30">
                  <h5 className="text-md font-medium text-purple-300 mb-2">3. What is the most important thing to do after setting up a self-custody wallet?</h5>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q3-send" 
                        name="q3" 
                        value="send"
                        checked={securityQuiz.q3 === 'send'}
                        onChange={() => handleQuizChange('q3', 'send')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q3-send" className="ml-2 text-sm text-gray-300">
                        Send a small test transaction
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q3-backup" 
                        name="q3" 
                        value="backup"
                        checked={securityQuiz.q3 === 'backup'}
                        onChange={() => handleQuizChange('q3', 'backup')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q3-backup" className="ml-2 text-sm text-gray-300">
                        Securely backup your seed phrase and test recovery
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q3-share" 
                        name="q3" 
                        value="share"
                        checked={securityQuiz.q3 === 'share'}
                        onChange={() => handleQuizChange('q3', 'share')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q3-share" className="ml-2 text-sm text-gray-300">
                        Share your wallet address on social media
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="q3-password" 
                        name="q3" 
                        value="password"
                        checked={securityQuiz.q3 === 'password'}
                        onChange={() => handleQuizChange('q3', 'password')}
                        className="h-4 w-4 text-purple-600 rounded-full border-gray-500 focus:ring-0 focus:ring-offset-0 bg-black/50"
                      />
                      <label htmlFor="q3-password" className="ml-2 text-sm text-gray-300">
                        Set a strong password
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {!isQuizPassed() && (
                <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 mb-6">
                  <p className="text-red-300 text-sm">
                    Please review your answers. Make sure you understand these key concepts before proceeding.
                  </p>
                </div>
              )}
              
              {isQuizPassed() && (
                <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4 mb-6">
                  <p className="text-green-300 text-sm">
                    Excellent! You've demonstrated understanding of the key self-custody concepts.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Step 5: Conclusion */}
          {step === 5 && (
            <div>
              <h4 className="text-lg font-medium text-purple-300 mb-3">Financial Sovereignty</h4>
              
              <p className="text-gray-300 mb-4">
                You've completed the self-custody workshop! You now understand the fundamental principles of controlling your own bitcoin.
              </p>
              
              <div className="bg-black/40 p-5 rounded border border-purple-900/30 mb-6">
                <h5 className="text-md font-medium text-purple-300 mb-3 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-purple-400" />
                  Key Takeaways
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                      <li>Bitcoin was designed specifically to enable self-custody</li>
                      <li>Self-custody puts you in control of your financial sovereignty</li>
                      <li>Your seed phrase is the master key to all your funds</li>
                      <li>Never share your seed phrase with anyone</li>
                    </ul>
                  </div>
                  
                  <div>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                      <li>Different custody options have different security/convenience tradeoffs</li>
                      <li>Self-custody requires personal responsibility</li>
                      <li>Secure backup of seed phrases is critical</li>
                      <li>Start small and learn as you go</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
                <h5 className="text-md font-medium text-purple-300 mb-2">Beyond the Citadel</h5>
                <p className="text-gray-300">
                  In the Citadel, financial freedom is restricted, with citizens' money controlled by central authorities. Bitcoin's innovation enables true ownership of digital assets without needing to trust any third party. Self-custody represents a paradigm shift—from permission-based access to your money toward true ownership and control. With great power comes great responsibility, but the reward is true financial sovereignty.
                </p>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Navigation Controls */}
        <div className="flex justify-between">
          <div className="text-sm text-gray-400">
            Step {step} of 5
          </div>
          <button
            onClick={handleNextStep}
            disabled={step === 3 && !confirmedSeed}
            className={`px-5 py-2 text-white rounded-md transition-colors ${
              (step === 3 && !confirmedSeed) || (step === 4 && !isQuizPassed())
                ? 'bg-purple-900/50 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {step < 5 ? "Continue" : "Complete Workshop"}
          </button>
        </div>
      </div>
    </div>
  );
}