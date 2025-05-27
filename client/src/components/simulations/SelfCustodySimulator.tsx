import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface SelfCustodySimulatorProps {
  data?: any;
  onComplete?: () => void;
}

export function SelfCustodySimulator({ 
  data,
  onComplete 
}: SelfCustodySimulatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [securityLevel, setSecurityLevel] = useState<'basic' | 'medium' | 'advanced'>('basic');
  
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  };
  
  const stepProgress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-900 p-4 text-white">
        <h3 className="text-xl font-bold">Self-Custody Security Simulator</h3>
        <div className="mt-2">
          <Progress value={stepProgress} className="h-2" />
          <p className="text-xs mt-1 text-blue-200">Step {currentStep} of {totalSteps}</p>
        </div>
      </div>
      
      <div className="p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-800">What is Self-Custody?</h4>
            
            <p className="text-gray-700">
              Self-custody means taking personal control of your bitcoin by holding your own private keys,
              rather than relying on a third party like an exchange or custodian.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">The Importance of Self-Custody</h5>
              <div className="mt-2 space-y-3">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-blue-800 font-bold">1</div>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Financial Sovereignty</p>
                    <p className="text-sm text-gray-600">
                      You have complete control over your funds without dependence on any third party's permission.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-blue-800 font-bold">2</div>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Protection from Counterparty Risk</p>
                    <p className="text-sm text-gray-600">
                      Eliminates the risk of exchanges failing, being hacked, or freezing your assets.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-blue-800 font-bold">3</div>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Enhanced Privacy</p>
                    <p className="text-sm text-gray-600">
                      Avoids the KYC requirements and data collection of centralized platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h5 className="font-medium text-red-800">The Challenge</h5>
              <p className="text-sm text-gray-600 mt-1">
                "Not your keys, not your coins" is a fundamental Bitcoin principle. But with self-custody comes responsibility:
              </p>
              <div className="mt-2 space-y-2">
                <div className="flex items-start">
                  <div className="text-red-500 mr-2">•</div>
                  <p className="text-sm text-gray-600">If you lose your private keys, you permanently lose access to your bitcoin</p>
                </div>
                <div className="flex items-start">
                  <div className="text-red-500 mr-2">•</div>
                  <p className="text-sm text-gray-600">If someone else gains access to your private keys, they can steal your bitcoin</p>
                </div>
                <div className="flex items-start">
                  <div className="text-red-500 mr-2">•</div>
                  <p className="text-sm text-gray-600">There's no customer support or password reset - you alone are responsible</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Explore Security Options
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-800">Self-Custody Security Levels</h4>
            
            <p className="text-gray-700">
              There are different approaches to self-custody, with varying levels of security and complexity.
              Choose a security level to explore:
            </p>
            
            <div className="space-y-4 mt-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${securityLevel === 'basic' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSecurityLevel('basic')}
              >
                <div className="flex justify-between items-center">
                  <h5 className="font-medium text-blue-800">Basic Security</h5>
                  <div className={`w-5 h-5 rounded-full ${securityLevel === 'basic' ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Simple software wallet on a smartphone or computer, suitable for smaller amounts.
                </p>
                <div className="flex items-center mt-2">
                  <div className="text-xs border border-blue-200 rounded px-2 py-0.5 text-blue-700 bg-blue-50">Convenience: High</div>
                  <div className="text-xs border border-orange-200 rounded px-2 py-0.5 text-orange-700 bg-orange-50 ml-2">Security: Low</div>
                  <div className="text-xs border border-green-200 rounded px-2 py-0.5 text-green-700 bg-green-50 ml-2">Complexity: Low</div>
                </div>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${securityLevel === 'medium' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSecurityLevel('medium')}
              >
                <div className="flex justify-between items-center">
                  <h5 className="font-medium text-blue-800">Medium Security</h5>
                  <div className={`w-5 h-5 rounded-full ${securityLevel === 'medium' ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Hardware wallet with seed phrase backup, good for moderate holdings.
                </p>
                <div className="flex items-center mt-2">
                  <div className="text-xs border border-blue-200 rounded px-2 py-0.5 text-blue-700 bg-blue-50">Convenience: Medium</div>
                  <div className="text-xs border border-orange-200 rounded px-2 py-0.5 text-orange-700 bg-orange-50 ml-2">Security: Medium</div>
                  <div className="text-xs border border-green-200 rounded px-2 py-0.5 text-green-700 bg-green-50 ml-2">Complexity: Medium</div>
                </div>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${securityLevel === 'advanced' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSecurityLevel('advanced')}
              >
                <div className="flex justify-between items-center">
                  <h5 className="font-medium text-blue-800">Advanced Security</h5>
                  <div className={`w-5 h-5 rounded-full ${securityLevel === 'advanced' ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Multi-signature wallet or advanced cold storage, suitable for significant holdings.
                </p>
                <div className="flex items-center mt-2">
                  <div className="text-xs border border-blue-200 rounded px-2 py-0.5 text-blue-700 bg-blue-50">Convenience: Low</div>
                  <div className="text-xs border border-orange-200 rounded px-2 py-0.5 text-orange-700 bg-orange-50 ml-2">Security: High</div>
                  <div className="text-xs border border-green-200 rounded px-2 py-0.5 text-green-700 bg-green-50 ml-2">Complexity: High</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                View Security Setup
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-800">
              {securityLevel === 'basic' ? 'Basic Security Setup' : 
               securityLevel === 'medium' ? 'Medium Security Setup' : 
               'Advanced Security Setup'}
            </h4>
            
            {securityLevel === 'basic' && (
              <div className="space-y-4">
                <p className="text-gray-700">
                  A software wallet on your smartphone or computer is the simplest way to self-custody bitcoin.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Setup Process</h5>
                  <ol className="space-y-2 pl-5 list-decimal text-sm text-gray-600">
                    <li>Download a reputable software wallet app</li>
                    <li>Create a new wallet within the app</li>
                    <li>The app will generate a seed phrase (usually 12-24 words)</li>
                    <li>Write down your seed phrase on paper and store it securely</li>
                    <li>Verify your backup by confirming the words in order</li>
                    <li>Transfer a small amount of bitcoin to test the wallet</li>
                  </ol>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-green-200 rounded-lg">
                    <h6 className="font-medium text-green-800 mb-1">Advantages</h6>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Easy to set up and use</li>
                      <li>• Free or low cost</li>
                      <li>• Convenient for frequent transactions</li>
                      <li>• User-friendly interfaces</li>
                      <li>• Good for learning about Bitcoin</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border border-red-200 rounded-lg">
                    <h6 className="font-medium text-red-800 mb-1">Risks</h6>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Vulnerable to malware and hacking</li>
                      <li>• Device theft or failure can cause loss</li>
                      <li>• Susceptible to phishing attacks</li>
                      <li>• Risk of accidental deletion</li>
                      <li>• Not suitable for large amounts</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h6 className="font-medium text-yellow-800 mb-1">Recommended Best Practices</h6>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Keep your device's operating system updated</li>
                    <li>• Enable strong device passwords and biometric authentication</li>
                    <li>• Use wallets that support address rotation for privacy</li>
                    <li>• Never store your seed phrase digitally or take photos of it</li>
                    <li>• Consider upgrading to a hardware wallet as your holdings grow</li>
                  </ul>
                </div>
              </div>
            )}
            
            {securityLevel === 'medium' && (
              <div className="space-y-4">
                <p className="text-gray-700">
                  A hardware wallet provides stronger security by keeping your private keys offline,
                  protecting them from online threats and malware.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Setup Process</h5>
                  <ol className="space-y-2 pl-5 list-decimal text-sm text-gray-600">
                    <li>Purchase a hardware wallet from a reputable manufacturer</li>
                    <li>Verify the device hasn't been tampered with (check packaging, holograms)</li>
                    <li>Install the associated software/app on your computer</li>
                    <li>Follow the setup process to generate a new seed phrase</li>
                    <li>Record the seed phrase on a durable metal backup (not just paper)</li>
                    <li>Verify your seed phrase by entering it back into the device</li>
                    <li>Test with a small transaction before transferring larger amounts</li>
                  </ol>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-green-200 rounded-lg">
                    <h6 className="font-medium text-green-800 mb-1">Advantages</h6>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Private keys never leave the device</li>
                      <li>• Protection from most malware attacks</li>
                      <li>• Physical button confirmation for transactions</li>
                      <li>• More resilient to computer compromises</li>
                      <li>• Can recover funds even if device is lost/damaged</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border border-red-200 rounded-lg">
                    <h6 className="font-medium text-red-800 mb-1">Risks</h6>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Seed phrase compromise still risks funds</li>
                      <li>• Physical theft of device and seed backup</li>
                      <li>• User error during backup or recovery</li>
                      <li>• Supply chain attacks on hardware</li>
                      <li>• Natural disasters affecting storage locations</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h6 className="font-medium text-yellow-800 mb-1">Recommended Best Practices</h6>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Purchase directly from manufacturer, not third parties</li>
                    <li>• Use a passphrase (25th word) for additional security</li>
                    <li>• Store seed backup in a secure, fireproof, waterproof location</li>
                    <li>• Consider geographic distribution of backups</li>
                    <li>• Add a decoy wallet with small funds if in a high-risk situation</li>
                  </ul>
                </div>
              </div>
            )}
            
            {securityLevel === 'advanced' && (
              <div className="space-y-4">
                <p className="text-gray-700">
                  Advanced security setups like multi-signature wallets require multiple keys to authorize transactions,
                  providing institutional-grade security for significant bitcoin holdings.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Multi-Signature Setup (2-of-3)</h5>
                  <ol className="space-y-2 pl-5 list-decimal text-sm text-gray-600">
                    <li>Set up three separate hardware devices from different manufacturers</li>
                    <li>Use specialized multi-signature software</li>
                    <li>Generate keys on each device and combine them into a multi-sig wallet</li>
                    <li>Create secure backups of each seed phrase, stored in different locations</li>
                    <li>Document the recovery process and test it thoroughly</li>
                    <li>Create a comprehensive security policy and succession plan</li>
                    <li>Consider using a third-party key recovery service for one key</li>
                  </ol>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-green-200 rounded-lg">
                    <h6 className="font-medium text-green-800 mb-1">Advantages</h6>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Compromise of a single key doesn't risk funds</li>
                      <li>• Protection against single points of failure</li>
                      <li>• Can include trusted third parties in key structure</li>
                      <li>• Geographic distribution of keys</li>
                      <li>• Institutional-grade security</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border border-red-200 rounded-lg">
                    <h6 className="font-medium text-red-800 mb-1">Risks</h6>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Complex setup and management</li>
                      <li>• Higher risk of user error during setup</li>
                      <li>• Multiple backup locations to secure</li>
                      <li>• Coordination required for transactions</li>
                      <li>• Quorum loss could mean permanent fund loss</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h6 className="font-medium text-yellow-800 mb-1">Recommended Best Practices</h6>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Use different hardware wallet brands to diversify risk</li>
                    <li>• Create clear documentation for heirs or trusted parties</li>
                    <li>• Store keys in different jurisdictions if possible</li>
                    <li>• Consider custody services for one key in a 2-of-3 setup</li>
                    <li>• Test the entire recovery process regularly</li>
                    <li>• Use duress passwords/codes for high-risk situations</li>
                  </ul>
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Continue to Final Step
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 4 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-800">Self-Custody in the African Context</h4>
            
            <p className="text-gray-700">
              Self-custody has unique implications and advantages for Bitcoin users in Africa:
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-3">Why Self-Custody Matters in Africa</h5>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Financial Inclusion Without Banks</p>
                    <p className="text-sm text-gray-600">
                      Many Africans remain unbanked but have mobile phone access, allowing Bitcoin self-custody 
                      to provide financial services without traditional banking infrastructure.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Protection from Currency Instability</p>
                    <p className="text-sm text-gray-600">
                      Self-custody of bitcoin can provide a hedge against local currency inflation and instability, 
                      a common issue in several African economies.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Cross-Border Transactions</p>
                    <p className="text-sm text-gray-600">
                      Self-custody enables direct peer-to-peer transactions across borders without 
                      intermediaries, reducing costs and barriers for remittances throughout Africa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h5 className="font-medium text-gray-800 mb-2">Special Considerations for Africa</h5>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p><strong>Infrastructure Challenges:</strong> Intermittent electricity and internet may require special backup solutions.</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p><strong>Mobile-First Approach:</strong> Mobile-based custody solutions are often more practical than computer-based ones.</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p><strong>Community Security Models:</strong> Leveraging community trust networks for securing backup materials.</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p><strong>Education Needs:</strong> Building capacity for secure self-custody practices in local communities.</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p><strong>Regulatory Uncertainty:</strong> Awareness of evolving local regulations around cryptocurrency holdings.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-800">Key Takeaways</h5>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Self-custody puts you in control of your own financial sovereignty</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Choose a security level appropriate for your holdings and technical comfort</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Seed phrase security is the most critical aspect of any self-custody solution</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Practice recovery processes before trusting large amounts to any setup</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Self-custody solutions can be adapted to work well in the African context</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Complete Module
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}