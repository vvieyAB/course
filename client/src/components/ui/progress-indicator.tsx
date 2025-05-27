// Theme colors defined in CSS

export interface ProgressIndicatorProps {
  progress: number;  // 0 to 100
  showLabel?: boolean;
  label?: string;
  theme?: 'origins' | 'default';
}

export function ProgressIndicator({
  progress,
  showLabel = true,
  label = 'Progress',
  theme = 'origins'
}: ProgressIndicatorProps) {
  // Theme colors defined in CSS now
  
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span>{label}</span>
          <span>{clampedProgress.toFixed(0)}%</span>
        </div>
      )}
      
      <div className={theme === 'origins' ? 'origins-progress-bar' : 'bg-gray-200 rounded-full h-2'}>
        <div 
          className={theme === 'origins' ? 'origins-progress-fill' : 'bg-amber-600 h-2 rounded-full transition-all duration-300'}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}