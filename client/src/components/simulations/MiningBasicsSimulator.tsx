import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Blocks, 
  Pickaxe, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  Link as LinkIcon 
} from 'lucide-react';

interface HashingSimulation {
  defaultData: string;
  targetZeros: number;
  maxAttempts: number;
  visualizationSpeed: string;
}

interface MiningPuzzle {
  id: number;
  difficulty: number;
  blockComponents: string[];
  correctOrder: number[];
  explanation: string;
}

interface DifficultyAdjustment {
  explanation: string;
  simulationParams: {
    startingDifficulty: number;
    targetBlockTime: number;
    hashrateTrend: number[];
    resultingBlockTimes: number[];
    resultingDifficulty: number[];
  };
}

interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface MiningBasicsSimulatorProps {
  explanation: string;
  miningPuzzles: MiningPuzzle[];
  hashingSimulation: HashingSimulation;
  difficultyAdjustment: DifficultyAdjustment;
  quizQuestions: Quiz[];
  onComplete?: () => void;
}

export function MiningBasicsSimulator({
  explanation,
  miningPuzzles = [],
  hashingSimulation,
  difficultyAdjustment,
  quizQuestions = [],
  onComplete
}: MiningBasicsSimulatorProps) {
  const [currentTab, setCurrentTab] = useState('basics');
  const [blockData, setBlockData] = useState(hashingSimulation.defaultData);
  const [nonce, setNonce] = useState(0);
  const [mining, setMining] = useState(false);
  const [mined, setMined] = useState(false);
  const [hash, setHash] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [puzzleState, setPuzzleState] = useState<Array<number>>([]);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number | null}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);
  
  // Difficulty adjustment simulation state
  const [difficultyData, setDifficultyData] = useState<{
    difficulties: number[];
    blockTimes: number[];
    periods: number[];
    hashrates: number[];
  }>({
    difficulties: [difficultyAdjustment.simulationParams.startingDifficulty],
    blockTimes: [],
    periods: [0],
    hashrates: [1],
  });
  const [difficultySimStarted, setDifficultySimStarted] = useState(false);
  const [currentTimePeriod, setCurrentTimePeriod] = useState(0);
  const [difficultySimComplete, setDifficultySimComplete] = useState(false);
  
  // Initialize puzzle state
  useEffect(() => {
    if (miningPuzzles.length > 0) {
      // Initialize with shuffled components
      const initialState = miningPuzzles[0].blockComponents.map((_, i) => i);
      // Fisher-Yates shuffle
      for (let i = initialState.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [initialState[i], initialState[j]] = [initialState[j], initialState[i]];
      }
      setPuzzleState(initialState);
    }
  }, [miningPuzzles]);
  
  // Check if all parts of the simulator have been completed
  useEffect(() => {
    if (
      mined && 
      puzzleCompleted && 
      difficultySimComplete && 
      quizSubmitted && 
      Object.keys(quizAnswers).length === quizQuestions.length &&
      Object.entries(quizAnswers).every(([_, answer]) => 
        answer === quizQuestions[parseInt(_.toString()) - 1].correctIndex
      )
    ) {
      setAllCompleted(true);
    }
  }, [mined, puzzleCompleted, difficultySimComplete, quizSubmitted, quizAnswers, quizQuestions]);
  
  // Simple hash function for demonstration
  const simpleHash = (text: string): string => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert to hex with leading zeros
    let hexHash = Math.abs(hash).toString(16).padStart(64, '0');
    return hexHash;
  };
  
  // Start mining simulation
  const startMining = () => {
    if (mining) return;
    setMining(true);
    setMined(false);
    setNonce(0);
    setAttemptCount(0);
    setHash('');
    
    const mineBlock = () => {
      if (nonce >= hashingSimulation.maxAttempts) {
        setMining(false);
        return;
      }
      
      const newNonce = nonce + 1;
      const dataWithNonce = `${blockData}|${newNonce}`;
      const newHash = simpleHash(dataWithNonce);
      
      setNonce(newNonce);
      setHash(newHash);
      setAttemptCount(newNonce);
      
      // Check if hash meets target (starts with n zeros)
      const target = '0'.repeat(hashingSimulation.targetZeros);
      if (newHash.startsWith(target)) {
        setMining(false);
        setMined(true);
        return;
      }
      
      // Continue mining
      const speed = hashingSimulation.visualizationSpeed === 'fast' ? 100 : 
                   hashingSimulation.visualizationSpeed === 'slow' ? 500 : 250;
      setTimeout(mineBlock, speed);
    };
    
    mineBlock();
  };
  
  // Handle block puzzle drag and drop
  const moveBlockComponent = (fromIndex: number, toIndex: number) => {
    const newOrder = [...puzzleState];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    setPuzzleState(newOrder);
    
    // Check if puzzle is solved
    const correctOrder = miningPuzzles[0].correctOrder;
    const currentMapping = newOrder.map(index => correctOrder[index]);
    const isSolved = currentMapping.every((value, index) => value === index);
    setPuzzleCompleted(isSolved);
  };
  
  // Handle quiz answer selection
  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex
    });
  };
  
  // Submit quiz answers
  const submitQuiz = () => {
    setQuizSubmitted(true);
  };
  
  // Run difficulty adjustment simulation
  const runDifficultySimulation = () => {
    if (difficultySimStarted) return;
    setDifficultySimStarted(true);
    
    const { startingDifficulty, targetBlockTime, hashrateTrend } = difficultyAdjustment.simulationParams;
    
    // Initialize with starting values
    let difficulties = [startingDifficulty];
    let blockTimes = [];
    let periods = [0];
    
    // Calculate resulting block times and difficulties based on hashrate changes
    for (let i = 0; i < hashrateTrend.length; i++) {
      // Calculate block time based on current difficulty and hashrate
      // Block time is proportional to difficulty and inversely proportional to hashrate
      const currentDifficulty = difficulties[difficulties.length - 1];
      const blockTime = (currentDifficulty / hashrateTrend[i]) * targetBlockTime;
      blockTimes.push(blockTime);
      
      // Calculate new difficulty for next period
      // New difficulty adjusts to maintain target block time
      if (i < hashrateTrend.length - 1) {
        const adjustmentFactor = blockTime / targetBlockTime;
        const newDifficulty = currentDifficulty * adjustmentFactor;
        difficulties.push(newDifficulty);
        periods.push(i + 1);
      }
    }
    
    // Update simulation data with calculated values
    setDifficultyData({
      difficulties,
      blockTimes,
      periods,
      hashrates: hashrateTrend,
    });
    
    // Animate the simulation
    const runTimeStep = (step: number) => {
      if (step >= hashrateTrend.length) {
        setDifficultySimComplete(true);
        return;
      }
      
      setCurrentTimePeriod(step);
      
      setTimeout(() => {
        runTimeStep(step + 1);
      }, 1500);
    };
    
    runTimeStep(0);
  };
  
  // If all challenges are completed, show the completion screen
  if (allCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center mb-8">
          <Pickaxe className="h-16 w-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Mining Mastery Achieved!</h2>
          <p className="text-gray-700">
            Congratulations! You've successfully completed all the challenges and demonstrated your understanding of Bitcoin mining basics.
          </p>
        </div>
        
        <div className="mb-6 bg-amber-50 p-4 rounded-lg">
          <h3 className="font-semibold text-amber-800 mb-2">Key Insights:</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
              <span className="text-gray-700">
                Bitcoin mining uses cryptographic hashing to secure the network through proof-of-work.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
              <span className="text-gray-700">
                Block creation involves finding a valid nonce that produces a hash meeting the network's difficulty target.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
              <span className="text-gray-700">
                The difficulty adjustment mechanism ensures blocks are found at a steady rate regardless of total network hashpower.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
              <span className="text-gray-700">
                Mining creates a competitive, decentralized process for achieving consensus and securing Bitcoin's transaction history.
              </span>
            </li>
          </ul>
        </div>
        
        <div className="text-center">
          <Button
            onClick={onComplete}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Complete Mission <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="p-6 border-b bg-gradient-to-r from-amber-500 to-amber-700 border-amber-800">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">The Power of the Puzzle: Bitcoin Mining Basics</h2>
          <p className="text-gray-100">
            Explore how Bitcoin mining works through hashing, block creation, and difficulty adjustment.
          </p>
        </div>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basics">
              Introduction
            </TabsTrigger>
            <TabsTrigger value="hashing">
              Hashing Challenge
              {mined && <CheckCircle2 className="ml-1 h-4 w-4 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="puzzle">
              Block Puzzle
              {puzzleCompleted && <CheckCircle2 className="ml-1 h-4 w-4 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="difficulty">
              Difficulty Adjustment
              {difficultySimComplete && <CheckCircle2 className="ml-1 h-4 w-4 text-green-500" />}
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Introduction Tab */}
        <TabsContent value="basics" className="p-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800">
                <Blocks className="h-5 w-5 mr-2 text-amber-600" />
                Understanding Bitcoin Mining
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">{explanation}</p>
                
                <div className="bg-amber-50 p-4 rounded-md mb-4">
                  <h3 className="font-medium text-amber-800 mb-2">Key Components:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-sm">1</div>
                      <div>
                        <span className="font-medium text-amber-900">Hashing</span>
                        <p className="text-sm text-gray-600">A cryptographic function that converts any data into a fixed-length string. Bitcoin uses SHA-256.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-sm">2</div>
                      <div>
                        <span className="font-medium text-amber-900">Mining Puzzle</span>
                        <p className="text-sm text-gray-600">Miners must find a hash that begins with a certain number of zeros by changing the nonce value.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-sm">3</div>
                      <div>
                        <span className="font-medium text-amber-900">Block Structure</span>
                        <p className="text-sm text-gray-600">Contains the previous block's hash, transaction data (Merkle root), timestamp, difficulty target, and nonce.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-sm">4</div>
                      <div>
                        <span className="font-medium text-amber-900">Difficulty Adjustment</span>
                        <p className="text-sm text-gray-600">Every 2016 blocks, difficulty is adjusted to maintain a 10-minute average block time.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-800 mb-3">Ready to Learn?</h3>
                  <p className="text-gray-600 mb-4">Complete the following challenges to understand Bitcoin mining in depth:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      onClick={() => setCurrentTab('hashing')}
                      variant="outline" 
                      className="flex items-center justify-center p-4 h-auto border-amber-300 hover:border-amber-500"
                    >
                      <div className="text-center">
                        <Activity className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                        <span className="font-medium text-amber-800">Try Hashing</span>
                      </div>
                    </Button>
                    <Button 
                      onClick={() => setCurrentTab('puzzle')}
                      variant="outline" 
                      className="flex items-center justify-center p-4 h-auto border-amber-300 hover:border-amber-500"
                    >
                      <div className="text-center">
                        <Blocks className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                        <span className="font-medium text-amber-800">Block Puzzle</span>
                      </div>
                    </Button>
                    <Button 
                      onClick={() => setCurrentTab('difficulty')}
                      variant="outline" 
                      className="flex items-center justify-center p-4 h-auto border-amber-300 hover:border-amber-500"
                    >
                      <div className="text-center">
                        <Activity className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                        <span className="font-medium text-amber-800">Difficulty Adjustment</span>
                      </div>
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Knowledge Check</h3>
                  
                  <div className="space-y-6">
                    {quizQuestions.slice(0, 2).map((quiz) => (
                      <div key={quiz.id} className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-gray-800 mb-2">{quiz.question}</h4>
                        <div className="space-y-2">
                          {quiz.options.map((option, index) => (
                            <div 
                              key={index}
                              className={`p-3 rounded-md border cursor-pointer ${
                                quizAnswers[quiz.id] === index 
                                  ? quizAnswers[quiz.id] === quiz.correctIndex 
                                    ? 'border-green-500 bg-green-50' 
                                    : 'border-red-500 bg-red-50'
                                  : 'border-gray-300 hover:border-amber-500'
                              }`}
                              onClick={() => !quizSubmitted && handleQuizAnswer(quiz.id, index)}
                            >
                              <div className="flex items-start">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                                  quizAnswers[quiz.id] === index 
                                    ? quizAnswers[quiz.id] === quiz.correctIndex 
                                      ? 'bg-green-500 text-white' 
                                      : 'bg-red-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                }`}>
                                  {quizAnswers[quiz.id] === index 
                                    ? quizAnswers[quiz.id] === quiz.correctIndex 
                                      ? '✓' 
                                      : '✗'
                                    : String.fromCharCode(65 + index)}
                                </div>
                                <span className="text-gray-700">{option}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {quizSubmitted && quizAnswers[quiz.id] !== null && (
                          <div className={`mt-2 p-3 rounded-md ${
                            quizAnswers[quiz.id] === quiz.correctIndex 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {quiz.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {!quizSubmitted && (
                      <Button 
                        onClick={submitQuiz}
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        Check Answers
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Hashing Challenge Tab */}
        <TabsContent value="hashing" className="p-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800">
                <Activity className="h-5 w-5 mr-2 text-amber-600" />
                Mining Simulation: Finding a Block
              </CardTitle>
              <CardDescription>
                Try to mine a block by finding a hash that starts with {hashingSimulation.targetZeros} zeros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Bitcoin miners compete to find a hash value below a certain target (one with a specific number of leading zeros). 
                  This is done by repeatedly changing a number called a "nonce" and hashing the block data until a valid hash is found.
                </p>
                
                <div className="space-y-3 mt-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Block Data:</label>
                    <Input 
                      value={blockData}
                      onChange={(e) => setBlockData(e.target.value)}
                      className="font-mono"
                      placeholder="Enter block data"
                      disabled={mining}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This represents the transaction data, previous block hash, timestamp, etc.
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Current Nonce: {nonce}</label>
                    <Progress value={(attemptCount / hashingSimulation.maxAttempts) * 100} className="h-2 bg-gray-200" />
                    <p className="text-xs text-gray-500 mt-1">
                      The nonce is incremented with each attempt
                    </p>
                  </div>
                  
                  {hash && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Current Hash:</label>
                      <div className="bg-gray-100 p-2 rounded font-mono text-sm break-all">
                        {hash}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Target: Hash must start with {hashingSimulation.targetZeros} zeros
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    {!mining && !mined && (
                      <Button 
                        onClick={startMining}
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                        disabled={!blockData}
                      >
                        Start Mining
                      </Button>
                    )}
                    
                    {mining && (
                      <Button 
                        disabled
                        className="bg-amber-600 text-white"
                      >
                        <span className="animate-spin mr-2">⟳</span> Mining...
                      </Button>
                    )}
                    
                    {mined && (
                      <div className="bg-green-100 p-4 rounded-md mt-4">
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-800">Block Successfully Mined!</p>
                            <p className="text-sm text-green-700 mt-1">
                              You found a valid hash after {attemptCount} attempts.
                            </p>
                            <p className="text-sm text-green-700 mt-1">
                              In the real Bitcoin network, this would earn you 6.25 BTC plus transaction fees.
                            </p>
                            <Button 
                              onClick={() => {
                                setMined(false);
                                setNonce(0);
                                setAttemptCount(0);
                                setHash('');
                              }}
                              variant="outline"
                              className="mt-2 border-green-500 text-green-700"
                            >
                              Try Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Real-World Mining</h3>
                  <p className="text-gray-600 mb-4">In actual Bitcoin mining:</p>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mt-0.5 mr-2 w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-xs">•</div>
                      <span className="text-gray-700">
                        Miners try trillions of hashes per second using specialized hardware (ASICs).
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-0.5 mr-2 w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-xs">•</div>
                      <span className="text-gray-700">
                        The difficulty is much higher, requiring many more leading zeros than in this simulation.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-0.5 mr-2 w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-xs">•</div>
                      <span className="text-gray-700">
                        The SHA-256 hash function is used instead of our simplified demonstration hash.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-0.5 mr-2 w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-xs">•</div>
                      <span className="text-gray-700">
                        Miners compete globally, with only one miner winning the reward for each block.
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    onClick={() => setCurrentTab('basics')}
                    variant="outline"
                  >
                    Back to Introduction
                  </Button>
                  <Button 
                    onClick={() => setCurrentTab('puzzle')}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Next: Block Puzzle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Block Puzzle Tab */}
        <TabsContent value="puzzle" className="p-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800">
                <Blocks className="h-5 w-5 mr-2 text-amber-600" />
                Block Structure Puzzle
              </CardTitle>
              <CardDescription>
                Arrange the components of a Bitcoin block in the correct order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  A Bitcoin block contains several key components that work together to secure the blockchain.
                  Drag and drop the blocks below to arrange them in their logical order.
                </p>
                
                <div className="space-y-4 mt-6">
                  {puzzleState.map((componentIndex, position) => (
                    <div 
                      key={componentIndex}
                      className="bg-gray-100 p-4 rounded-md flex items-center cursor-move border border-gray-300 hover:border-amber-500"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center mr-3 flex-shrink-0">
                        {position + 1}
                      </div>
                      <div className="font-medium">{miningPuzzles[0]?.blockComponents[componentIndex]}</div>
                      <div className="ml-auto flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => position > 0 && moveBlockComponent(position, position - 1)}
                          disabled={position === 0}
                        >
                          ↑
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => position < puzzleState.length - 1 && moveBlockComponent(position, position + 1)}
                          disabled={position === puzzleState.length - 1}
                        >
                          ↓
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {puzzleCompleted && (
                  <div className="bg-green-100 p-4 rounded-md mt-4">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Perfect! You've arranged the block correctly.</p>
                        <p className="text-sm text-green-700 mt-2">
                          {miningPuzzles[0]?.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Block Component Functions</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium text-amber-800">Previous Block Hash</h4>
                      <p className="text-sm text-gray-600">Links this block to the previous one, creating the "chain" in blockchain.</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium text-amber-800">Merkle Root</h4>
                      <p className="text-sm text-gray-600">A summary hash of all transactions included in this block.</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium text-amber-800">Timestamp</h4>
                      <p className="text-sm text-gray-600">When the block was created, providing chronological order.</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium text-amber-800">Difficulty Target</h4>
                      <p className="text-sm text-gray-600">How hard it is to find a valid hash, adjusted every 2016 blocks.</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium text-amber-800">Nonce</h4>
                      <p className="text-sm text-gray-600">The variable miners change to try and find a valid block hash.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    onClick={() => setCurrentTab('hashing')}
                    variant="outline"
                  >
                    Back to Hashing
                  </Button>
                  <Button 
                    onClick={() => setCurrentTab('difficulty')}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Next: Difficulty Adjustment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Difficulty Adjustment Tab */}
        <TabsContent value="difficulty" className="p-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800">
                <Activity className="h-5 w-5 mr-2 text-amber-600" />
                Difficulty Adjustment Mechanism
              </CardTitle>
              <CardDescription>
                See how Bitcoin automatically adjusts mining difficulty to maintain a 10-minute block time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  {difficultyAdjustment.explanation}
                </p>
                
                <div className="bg-amber-50 p-4 rounded-md mb-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-800 mb-1">Why this matters:</h3>
                      <p className="text-sm text-amber-700">
                        The difficulty adjustment ensures Bitcoin's issuance rate stays predictable regardless of how much mining power joins the network.
                        This is crucial for maintaining Bitcoin's monetary policy and security.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  {!difficultySimStarted ? (
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">Simulation: Hashrate vs Difficulty</h3>
                      <p className="text-gray-600 mb-4">
                        This simulation shows how Bitcoin's difficulty adjusts when the network hashrate changes.
                        The target is to maintain a 10-minute block time.
                      </p>
                      <Button 
                        onClick={runDifficultySimulation}
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        Run Simulation
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-4">Simulation Results: Period {currentTimePeriod + 1}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="border rounded-md p-3 bg-white">
                          <h4 className="font-medium text-amber-800">Network Hashrate</h4>
                          <div className="flex items-center mt-2">
                            <div className="h-4 bg-blue-500 rounded" style={{ width: `${difficultyData.hashrates[currentTimePeriod] * 50}%` }}></div>
                            <span className="ml-2 text-sm">{difficultyData.hashrates[currentTimePeriod].toFixed(1)}x</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Relative to starting hashrate</p>
                        </div>
                        
                        <div className="border rounded-md p-3 bg-white">
                          <h4 className="font-medium text-amber-800">Mining Difficulty</h4>
                          <div className="flex items-center mt-2">
                            <div className="h-4 bg-purple-500 rounded" style={{ width: `${difficultyData.difficulties[currentTimePeriod] * 50}%` }}></div>
                            <span className="ml-2 text-sm">{difficultyData.difficulties[currentTimePeriod].toFixed(2)}x</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Relative to starting difficulty</p>
                        </div>
                        
                        {currentTimePeriod > 0 && (
                          <div className="border rounded-md p-3 bg-white">
                            <h4 className="font-medium text-amber-800">Resulting Block Time</h4>
                            <div className="flex items-center mt-2">
                              <div className="h-4 bg-green-500 rounded" style={{ 
                                width: `${Math.min(100, (difficultyData.blockTimes[currentTimePeriod - 1] || 0) * 10)}%` 
                              }}></div>
                              <span className="ml-2 text-sm">{(difficultyData.blockTimes[currentTimePeriod - 1] || 0).toFixed(1)} minutes</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Target: 10 minutes</p>
                          </div>
                        )}
                        
                        <div className="border rounded-md p-3 bg-white">
                          <h4 className="font-medium text-amber-800">Effect on Bitcoin</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {currentTimePeriod > 0 && (difficultyData.blockTimes[currentTimePeriod - 1] || 0) < 9.5 ? (
                              "Block times too fast - difficulty needs to increase"
                            ) : currentTimePeriod > 0 && (difficultyData.blockTimes[currentTimePeriod - 1] || 0) > 10.5 ? (
                              "Block times too slow - difficulty needs to decrease"
                            ) : (
                              "Block times on target - difficulty appropriate"
                            )}
                          </p>
                        </div>
                      </div>
                      
                      {difficultySimComplete && (
                        <div className="bg-green-100 p-4 rounded-md mt-4">
                          <div className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium text-green-800">Simulation Complete!</p>
                              <p className="text-sm text-green-700 mt-2">
                                The difficulty adjustment mechanism ensures that no matter how much hashpower joins or leaves the network,
                                Bitcoin continues to produce blocks at a predictable rate of approximately one every 10 minutes.
                              </p>
                              <p className="text-sm text-green-700 mt-2">
                                This means Bitcoin's monetary policy and issuance schedule remain predictable regardless of changes in mining participation.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Final Knowledge Check</h3>
                  
                  <div className="space-y-6">
                    {quizQuestions.slice(2).map((quiz) => (
                      <div key={quiz.id} className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-gray-800 mb-2">{quiz.question}</h4>
                        <div className="space-y-2">
                          {quiz.options.map((option, index) => (
                            <div 
                              key={index}
                              className={`p-3 rounded-md border cursor-pointer ${
                                quizAnswers[quiz.id] === index 
                                  ? quizAnswers[quiz.id] === quiz.correctIndex 
                                    ? 'border-green-500 bg-green-50' 
                                    : 'border-red-500 bg-red-50'
                                  : 'border-gray-300 hover:border-amber-500'
                              }`}
                              onClick={() => !quizSubmitted && handleQuizAnswer(quiz.id, index)}
                            >
                              <div className="flex items-start">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                                  quizAnswers[quiz.id] === index 
                                    ? quizAnswers[quiz.id] === quiz.correctIndex 
                                      ? 'bg-green-500 text-white' 
                                      : 'bg-red-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                }`}>
                                  {quizAnswers[quiz.id] === index 
                                    ? quizAnswers[quiz.id] === quiz.correctIndex 
                                      ? '✓' 
                                      : '✗'
                                    : String.fromCharCode(65 + index)}
                                </div>
                                <span className="text-gray-700">{option}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {quizSubmitted && quizAnswers[quiz.id] !== null && (
                          <div className={`mt-2 p-3 rounded-md ${
                            quizAnswers[quiz.id] === quiz.correctIndex 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {quiz.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {!quizSubmitted && (
                      <Button 
                        onClick={submitQuiz}
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        Check Answers
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    onClick={() => setCurrentTab('puzzle')}
                    variant="outline"
                  >
                    Back to Block Puzzle
                  </Button>
                  
                  {mined && puzzleCompleted && difficultySimComplete && quizSubmitted && (
                    <Button 
                      onClick={() => setAllCompleted(true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Complete All Challenges
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}