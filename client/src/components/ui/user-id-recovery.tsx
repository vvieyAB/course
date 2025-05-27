import { useState } from 'react';
import { GradientButton } from './theme';
import { useToast } from '@/hooks/use-toast';

interface UserIdRecoveryProps {
  userId: string;
  onClose: () => void;
}

export function UserIdRecovery({ userId, onClose }: UserIdRecoveryProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(userId).then(() => {
      setIsCopied(true);
      toast({
        title: "User ID copied!",
        description: "Your user ID has been saved to clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Copy failed",
        description: "Please try copying manually",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-100/60 p-4 rounded-lg">
        <p className="text-amber-900 mb-3 font-medium">This is your User ID</p>
        <p className="text-sm text-amber-800 mb-4">
          Please save this ID in a safe place. You will need it to recover your account if you forget your password.
        </p>
        
        <div className="flex items-center">
          <div className="flex-1 bg-white p-2 rounded border border-amber-200 font-mono text-sm overflow-x-auto">
            {userId}
          </div>
          <button 
            onClick={handleCopyClick} 
            className="ml-2 p-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors flex-shrink-0"
          >
            {isCopied ? (
              <span>✓</span>
            ) : (
              <span>Copy</span>
            )}
          </button>
        </div>
      </div>
      
      <div className="bg-blue-100/60 p-4 rounded-lg">
        <p className="text-blue-900 mb-2 font-medium">Why is this important?</p>
        <p className="text-sm text-blue-800">
          This platform doesn't require your personal information (no KYC). 
          Your User ID is your unique identifier that helps us recognize you and restore your progress.
        </p>
      </div>
      
      <div className="pt-4">
        <GradientButton onClick={onClose}>
          Continue to Adventure
        </GradientButton>
      </div>
    </div>
  );
}