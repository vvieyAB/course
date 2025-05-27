import React from 'react';
import { useLocation, Link } from 'wouter';
import { ChevronRight, Award, Sparkles, BookOpen, Star } from 'lucide-react';
import { realm7Missions } from '../../lib/realm7-missions'; // Missions for The Summit of Knowledge (Realm 7)
import { navigate } from '../../lib/router';

export default function Realm7Home() {
  const [_, setLocation] = useLocation();
  
  const description = (
    <div className="space-y-4">
      <p>
        Welcome to Realm 7: The Summit of Knowledge, the culmination of your Bitcoin journey with Asha. 
        Here, you'll consolidate everything you've learned throughout all previous realms and demonstrate your mastery.
      </p>
      <p>
        This realm features comprehensive reviews, practical challenges, technical tests, and a final challenge 
        that brings together all aspects of your Bitcoin education. Upon completion, you'll earn your certification 
        as a Bitcoin journeyer.
      </p>
      <p>
        Are you ready for the final ascent to Bitcoin mastery?
      </p>
    </div>
  );
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-500 mb-2">The Summit of Knowledge</h1>
        <div className="text-gray-300">{description}</div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Journey Summary Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-start mb-4">
            <div className="bg-purple-900/30 p-3 rounded-lg mr-4">
              <BookOpen className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-purple-400">Your Bitcoin Journey</h2>
              <p className="text-gray-400 mt-1">From the foundations of money to the heights of Bitcoin mastery</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-300">
              <div className="bg-emerald-900/30 p-1 rounded-full mr-3">
                <Star className="h-4 w-4 text-emerald-400" />
              </div>
              <span>Realm of Origins: Foundations of Money</span>
            </div>
            <div className="flex items-center text-gray-300">
              <div className="bg-emerald-900/30 p-1 rounded-full mr-3">
                <Star className="h-4 w-4 text-emerald-400" />
              </div>
              <span>The Central Citadel: Governance</span>
            </div>
            <div className="flex items-center text-gray-300">
              <div className="bg-emerald-900/30 p-1 rounded-full mr-3">
                <Star className="h-4 w-4 text-emerald-400" />
              </div>
              <span>The Forest of Sparks: Bitcoin's Birth</span>
            </div>
            <div className="flex items-center text-gray-300">
              <div className="bg-emerald-900/30 p-1 rounded-full mr-3">
                <Star className="h-4 w-4 text-emerald-400" />
              </div>
              <span>The Mountain Forge: Mining and Consensus</span>
            </div>
            <div className="flex items-center text-gray-300">
              <div className="bg-emerald-900/30 p-1 rounded-full mr-3">
                <Star className="h-4 w-4 text-emerald-400" />
              </div>
              <span>The Council of Forks: Governance</span>
            </div>
            <div className="flex items-center text-gray-300">
              <div className="bg-emerald-900/30 p-1 rounded-full mr-3">
                <Star className="h-4 w-4 text-emerald-400" />
              </div>
              <span>The Ubuntu Village: Bitcoin in Africa</span>
            </div>
            <div className="flex items-center text-purple-300 font-semibold">
              <div className="bg-purple-900/30 p-1 rounded-full mr-3">
                <Sparkles className="h-4 w-4 text-purple-400" />
              </div>
              <span>The Summit of Knowledge: Mastery and Certification</span>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mb-6">
            You've traveled through six realms of Bitcoin knowledge. Now it's time to bring everything together
            and demonstrate your complete understanding of Bitcoin's technology, economy, and potential.
          </p>
          
          <div className="text-center">
            <button
              onClick={() => navigate('/realm7/missions', setLocation)}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Begin Final Challenges <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Final Missions */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-start mb-6">
            <div className="bg-purple-900/30 p-3 rounded-lg mr-4">
              <Award className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-purple-400">Final Missions</h2>
              <p className="text-gray-400 mt-1">Complete these challenges to earn your Bitcoin certification</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {realm7Missions.map((mission) => (
              <div key={mission.id} className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                    mission.contentType === 'certificate' 
                      ? 'bg-yellow-900/30 text-yellow-400' 
                      : 'bg-purple-900/30 text-purple-400'
                  }`}>
                    {mission.id}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200">{mission.title}</h3>
                    <p className="text-sm text-gray-400">{mission.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/realm7/mission/${mission.id}`, setLocation)}
                  className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}