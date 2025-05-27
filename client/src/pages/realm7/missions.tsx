import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ChevronLeft, CheckCircle, Circle, Lock, Award, BookOpen, Zap, Code, FileCheck } from 'lucide-react';
import { realm7Missions } from '../../lib/realm7-missions'; // Missions for The Summit of Knowledge (Realm 7)
import { navigate } from '../../lib/router';
import { getRealmName } from '@/lib/realm-utils';

export default function Realm7Missions() {
  const [_, setLocation] = useLocation();
  const [missions, setMissions] = useState(realm7Missions);
  const [completedCount, setCompletedCount] = useState(0);

  // Define theme for Realm 7 - The Summit of Knowledge
  const summitTheme = {
    colors: {
      primary: '#8b5cf6', // violet-500
      secondary: '#a78bfa', // violet-400
      background: '#0f172a', // slate-900
      backgroundLight: '#1e293b', // slate-800
      success: '#15803d', // green-700
      textDark: '#4c1d95', // violet-900
      textLight: '#f5f3ff', // violet-50
      accent1: '#7c3aed', // violet-600
      accent2: '#c4b5fd', // violet-300
    },
    gradients: {
      main: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      glow: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
      subtle: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(109, 40, 217, 0.1) 100%)',
    },
    shadows: {
      button: '0 10px 15px -3px rgba(139, 92, 246, 0.2), 0 4px 6px -4px rgba(139, 92, 246, 0.2)',
      card: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
    }
  };

  // Update completion count
  useEffect(() => {
    const completed = missions.filter(mission => mission.completed).length;
    setCompletedCount(completed);
  }, [missions]);

  // Get mission type icon
  const getMissionTypeIcon = (type: string) => {
    switch (type) {
      case 'comprehensive':
        return <BookOpen className="h-5 w-5" />;
      case 'practical':
        return <Zap className="h-5 w-5" />;
      case 'technical':
        return <Code className="h-5 w-5" />;
      case 'final':
        return <FileCheck className="h-5 w-5" />;
      case 'certificate':
        return <Award className="h-5 w-5" />;
      default:
        return <Circle className="h-5 w-5" />;
    }
  };

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: `linear-gradient(to bottom, ${summitTheme.colors.background}, ${summitTheme.colors.backgroundLight})`,
        backgroundImage: "url('/realms/summit.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
        color: summitTheme.colors.textLight
      }}
    >
      <div className="max-w-4xl mx-auto p-6 rounded-xl">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/realm7', setLocation)}
            className="mr-4 p-2 rounded-full transition-colors"
            style={{ 
              backgroundColor: `${summitTheme.colors.background}80`,
              color: summitTheme.colors.secondary
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: summitTheme.colors.primary }}>
              {getRealmName(7)}: Final Challenges
            </h1>
            <p style={{ color: `${summitTheme.colors.textLight}80` }}>
              Complete all missions to earn your certification
            </p>
          </div>
        </div>

        {/* Progress tracker */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2" style={{ color: `${summitTheme.colors.textLight}80` }}>
            <span>Progress</span>
            <span>{completedCount} of {missions.length} missions completed</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${summitTheme.colors.background}80` }}>
            <div
              className="h-full transition-all duration-300"
              style={{ 
                width: `${(completedCount / missions.length) * 100}%`,
                background: summitTheme.gradients.main
              }}
            ></div>
          </div>
        </div>

        {/* Mission cards */}
        <div className="space-y-6">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="rounded-lg overflow-hidden shadow-lg transition-all"
              style={{ 
                backgroundColor: `${summitTheme.colors.background}80`,
                borderColor: summitTheme.colors.accent1,
                borderWidth: '1px',
                boxShadow: summitTheme.shadows.card
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div 
                      className="p-3 rounded-lg mr-4"
                      style={{
                        backgroundColor: `${summitTheme.colors.background}80`,
                        color: mission.contentType === 'certificate'
                          ? '#FBBF24'
                          : mission.contentType === 'final'
                            ? '#F87171'
                            : mission.contentType === 'technical'
                              ? '#60A5FA'
                              : mission.contentType === 'practical'
                                ? '#34D399'
                                : summitTheme.colors.primary
                      }}
                    >
                      {getMissionTypeIcon(mission.contentType)}
                    </div>

                    <div>
                      <div className="flex items-center">
                        <h2 className="text-xl font-semibold mr-3" style={{ color: summitTheme.colors.textLight }}>
                          {mission.title}
                        </h2>
                        <div 
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: `${summitTheme.colors.background}80`,
                            color: mission.contentType === 'certificate'
                              ? '#FBBF24'
                              : mission.contentType === 'final'
                                ? '#F87171'
                                : mission.contentType === 'technical'
                                  ? '#60A5FA'
                                  : mission.contentType === 'practical'
                                    ? '#34D399'
                                    : summitTheme.colors.primary
                          }}
                        >
                          {mission.contentType.charAt(0).toUpperCase() + mission.contentType.slice(1)}
                        </div>
                      </div>
                      <p style={{ color: `${summitTheme.colors.textLight}80` }} className="mt-1">
                        {mission.subtitle}
                      </p>
                    </div>
                  </div>

                  <div>
                    {mission.completed ? (
                      <div style={{ backgroundColor: 'rgba(21, 128, 61, 0.3)' }} className="p-1 rounded-full">
                        <CheckCircle className="h-6 w-6" style={{ color: '#34D399' }} />
                      </div>
                    ) : mission.unlocked ? (
                      <div style={{ backgroundColor: `${summitTheme.colors.background}80` }} className="p-1 rounded-full">
                        <Circle className="h-6 w-6" style={{ color: summitTheme.colors.secondary }} />
                      </div>
                    ) : (
                      <div style={{ backgroundColor: `${summitTheme.colors.background}80` }} className="p-1 rounded-full">
                        <Lock className="h-6 w-6" style={{ color: summitTheme.colors.secondary }} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-sm" style={{ color: `${summitTheme.colors.textLight}90` }}>
                  {mission.description}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => navigate(`/realm7/mission/${mission.id}`, setLocation)}
                    disabled={!mission.unlocked}
                    className="px-4 py-2 rounded-lg transition-colors"
                    style={{ 
                      background: !mission.unlocked
                        ? `${summitTheme.colors.background}80` 
                        : mission.completed
                          ? 'linear-gradient(135deg, #059669 0%, #10B981 100%)'
                          : summitTheme.gradients.main,
                      color: !mission.unlocked 
                        ? `${summitTheme.colors.textLight}50` 
                        : summitTheme.colors.textLight,
                      boxShadow: !mission.unlocked ? 'none' : summitTheme.shadows.button,
                      cursor: !mission.unlocked ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {mission.completed ? 'Review' : 'Start Mission'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certification notice */}
        {completedCount === missions.length - 1 && (
          <div 
            className="mt-8 p-6 text-center rounded-lg"
            style={{ 
              backgroundColor: 'rgba(146, 64, 14, 0.2)', 
              borderColor: '#92400E',
              borderWidth: '1px'
            }}
          >
            <div className="flex justify-center mb-4">
              <div style={{ backgroundColor: 'rgba(146, 64, 14, 0.3)' }} className="p-3 rounded-full">
                <Award className="h-8 w-8" style={{ color: '#FBBF24' }} />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#FBBF24' }}>Almost There!</h3>
            <p style={{ color: summitTheme.colors.textLight }}>
              You've completed all the challenges. Proceed to the final certification mission to receive your 
              Bitcoin journey certificate!
            </p>
            <button
              onClick={() => navigate(`/realm7/mission/5`, setLocation)}
              className="mt-4 px-6 py-2 rounded-lg transition-colors"
              style={{ 
                background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                color: summitTheme.colors.textLight,
                boxShadow: summitTheme.shadows.button
              }}
            >
              Claim Your Certificate
            </button>
          </div>
        )}

        {completedCount === missions.length && (
          <div 
            className="mt-8 p-6 text-center rounded-lg"
            style={{ 
              backgroundColor: 'rgba(21, 128, 61, 0.2)', 
              borderColor: '#15803D',
              borderWidth: '1px'
            }}
          >
            <div className="flex justify-center mb-4">
              <div style={{ backgroundColor: 'rgba(21, 128, 61, 0.3)' }} className="p-3 rounded-full">
                <Award className="h-8 w-8" style={{ color: '#34D399' }} />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#34D399' }}>Journey Complete!</h3>
            <p style={{ color: summitTheme.colors.textLight }}>
              Congratulations! You've mastered all realms of Bitcoin knowledge and earned your certification.
              Your journey with Asha is complete, but your Bitcoin adventure continues!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}