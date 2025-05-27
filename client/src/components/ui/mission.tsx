import React from 'react';
import { Realm2MissionData } from '@/lib/realm2-missions';
import ReactMarkdown from 'react-markdown';

interface GenericMission {
  id: number;
  title: string;
  subtitle: string;
  content?: string;
  [key: string]: any;
}

interface MissionProps {
  mission: GenericMission | Realm2MissionData;
  onComplete?: () => void;
  realmTheme?: 'amber' | 'purple' | 'blue' | 'green' | 'rose';
}

export const Mission: React.FC<MissionProps> = ({ mission, onComplete, realmTheme = 'amber' }) => {
  // Theme color mapping
  const themeColors = {
    amber: {
      title: 'text-amber-600',
      subtitle: 'text-amber-500',
      heading: 'text-amber-400',
      subheading: 'text-amber-300',
      paragraph: 'text-gray-200',
      list: 'text-gray-300'
    },
    purple: {
      title: 'text-purple-500',
      subtitle: 'text-purple-400',
      heading: 'text-purple-400',
      subheading: 'text-purple-300',
      paragraph: 'text-gray-200',
      list: 'text-gray-300'
    },
    blue: {
      title: 'text-blue-500',
      subtitle: 'text-blue-400',
      heading: 'text-blue-400',
      subheading: 'text-blue-300',
      paragraph: 'text-gray-200',
      list: 'text-gray-300'
    },
    green: {
      title: 'text-green-500',
      subtitle: 'text-green-400',
      heading: 'text-green-400',
      subheading: 'text-green-300',
      paragraph: 'text-gray-200',
      list: 'text-gray-300'
    },
    rose: {
      title: 'text-rose-600',
      subtitle: 'text-rose-500',
      heading: 'text-rose-400',
      subheading: 'text-rose-300',
      paragraph: 'text-gray-200',
      list: 'text-gray-300'
    }
  };
  
  const colors = themeColors[realmTheme];
  
  const renderers = {
    h1: (props: any) => <h1 className={`text-2xl font-bold ${colors.heading} mb-4`} {...props} />,
    h2: (props: any) => <h2 className={`text-xl font-bold ${colors.heading} mt-6 mb-4`} {...props} />,
    h3: (props: any) => <h3 className={`text-lg font-medium ${colors.subheading} mt-5 mb-3`} {...props} />,
    p: (props: any) => <p className={`${colors.paragraph} mb-4`} {...props} />,
    ul: (props: any) => <ul className={`list-disc pl-5 ${colors.list} mb-4 space-y-1`} {...props} />,
    ol: (props: any) => <ol className={`list-decimal pl-5 ${colors.list} mb-4 space-y-1`} {...props} />,
    li: (props: any) => <li className="ml-2" {...props} />,
    blockquote: (props: any) => (
      <blockquote className={`border-l-4 border-${realmTheme}-500/50 pl-4 italic ${colors.paragraph} my-4`} {...props} />
    ),
    code: (props: any) => (
      <code className={`bg-black/40 px-1 py-0.5 rounded font-mono text-sm ${colors.subtitle}`} {...props} />
    ),
    pre: (props: any) => (
      <pre className="bg-black/40 p-3 rounded-md overflow-x-auto font-mono text-sm my-4" {...props} />
    ),
  };

  return (
    <div className="mission-content">
      <h1 className={`text-3xl font-bold ${colors.title} mb-2`}>{mission.title}</h1>
      <h2 className={`text-xl ${colors.subtitle} mb-6`}>{mission.subtitle}</h2>
      
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown components={renderers}>
          {mission.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};