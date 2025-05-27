import { useState } from 'react';
import { Button } from '@/components/ui/button';

export interface FinancialSurveillanceSimulatorProps {
  data?: any;
  onComplete?: () => void;
}

export function FinancialSurveillanceSimulator({ 
  data,
  onComplete 
}: FinancialSurveillanceSimulatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-slate-800 p-4 text-white">
        <h3 className="text-xl font-bold">Financial Surveillance Simulator</h3>
        <p className="text-sm opacity-80">Step {currentStep} of {totalSteps}</p>
      </div>
      
      <div className="p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">Your Digital Financial Footprint</h4>
            <p className="text-slate-600">
              Every digital transaction leaves traces. In this simulation, we'll explore how seemingly innocent 
              transactions can reveal patterns about your life.
            </p>
            <div className="bg-slate-100 p-4 rounded-lg">
              <h5 className="font-medium text-slate-800">Your Transaction History</h5>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Coffee Shop</span>
                  <span className="text-red-500">-$4.50</span>
                </li>
                <li className="flex justify-between">
                  <span>Pharmacy</span>
                  <span className="text-red-500">-$32.99</span>
                </li>
                <li className="flex justify-between">
                  <span>Grocery Store</span>
                  <span className="text-red-500">-$87.65</span>
                </li>
                <li className="flex justify-between">
                  <span>Monthly Rent</span>
                  <span className="text-red-500">-$800.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Political Donation</span>
                  <span className="text-red-500">-$25.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Religious Organization</span>
                  <span className="text-red-500">-$50.00</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">What Your Data Reveals</h4>
            <p className="text-slate-600">
              Financial surveillance systems can analyze your spending patterns to create a detailed profile:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <h5 className="font-medium text-slate-800">Location Information</h5>
                <p className="text-sm text-slate-600 mt-1">
                  Your transactions at local businesses reveal where you spend time and your travel patterns.
                </p>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <h5 className="font-medium text-slate-800">Health Status</h5>
                <p className="text-sm text-slate-600 mt-1">
                  Regular pharmacy purchases may indicate chronic health conditions.
                </p>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <h5 className="font-medium text-slate-800">Political Affiliations</h5>
                <p className="text-sm text-slate-600 mt-1">
                  Donations to political organizations reveal your political leanings.
                </p>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <h5 className="font-medium text-slate-800">Religious Beliefs</h5>
                <p className="text-sm text-slate-600 mt-1">
                  Donations to religious organizations indicate your faith and community connections.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">Who Has Access To Your Data?</h4>
            <p className="text-slate-600">
              Your financial data doesn't stay in one place. Many entities can access or purchase this information:
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="border border-slate-300 rounded-full px-3 py-1 text-sm">Government Agencies</div>
              <div className="border border-slate-300 rounded-full px-3 py-1 text-sm">Financial Institutions</div>
              <div className="border border-slate-300 rounded-full px-3 py-1 text-sm">Data Brokers</div>
              <div className="border border-slate-300 rounded-full px-3 py-1 text-sm">Marketing Companies</div>
              <div className="border border-slate-300 rounded-full px-3 py-1 text-sm">Insurance Companies</div>
              <div className="border border-slate-300 rounded-full px-3 py-1 text-sm">Potential Employers</div>
              <div className="border border-slate-300 rounded-full px-3 py-1 text-sm">Law Enforcement</div>
              <div className="border border-slate-300 rounded-full px-3 py-1 text-sm">Credit Scoring Agencies</div>
            </div>
            <div className="bg-amber-100 p-4 rounded-lg mt-4">
              <h5 className="font-medium text-amber-800">Real World Example</h5>
              <p className="text-sm text-amber-700 mt-1">
                In 2017, it was revealed that payment processors were selling detailed transaction data to third parties. 
                This data was detailed enough to identify individuals and trace their daily activities through their purchases.
              </p>
            </div>
          </div>
        )}
        
        {currentStep === 4 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">The Privacy Challenge</h4>
            <p className="text-slate-600">
              Financial surveillance creates a privacy dilemma: How do we balance the benefits of digital financial 
              systems with the need for personal privacy?
            </p>
            <div className="bg-slate-100 p-4 rounded-lg">
              <h5 className="font-medium text-slate-800">Key Considerations</h5>
              <ul className="mt-2 space-y-2 text-sm list-disc pl-5">
                <li>Financial inclusion vs. financial surveillance</li>
                <li>Preventing crime vs. protecting privacy</li>
                <li>Convenience vs. control over personal data</li>
                <li>Innovation vs. regulation</li>
              </ul>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h5 className="font-medium text-green-800">Reflection Question</h5>
              <p className="text-sm text-green-700 mt-1">
                What aspects of your financial life would you prefer to keep private, and why might complete 
                financial privacy be important for a functioning society?
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleNextStep}
            className="bg-slate-800 hover:bg-slate-700"
          >
            {currentStep < totalSteps ? 'Next Step' : 'Complete Simulation'}
          </Button>
        </div>
      </div>
    </div>
  );
}