import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Zap, ArrowRight, Trash2, ArrowLeft, Plus, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const quadrants = [
  {
    name: 'Strengths',
    color: '#10b981',
    internal: true,
    definition: 'Positive attributes and resources within your control.',
    questions: ['What do you do well?', 'What unique resources do you have?', 'What advantages do you have over competitors?'],
    icon: CheckCircle,
    example: 'A company with a highly skilled and motivated team that consistently delivers high-quality products.',
    tooltip: 'Internal: What do you do well?'
  },
  {
    name: 'Weaknesses',
    color: '#f43f5e',
    internal: true,
    definition: 'Negative attributes that detract from your performance.',
    questions: ['What could you improve?', 'What do competitors do better?', 'What resources are lacking?'],
    icon: AlertTriangle,
    example: 'An outdated IT infrastructure that slows down operations and increases costs.',
    tooltip: 'Internal: What could you improve?'
  },
  {
    name: 'Opportunities',
    color: '#0ea5e9',
    internal: false,
    definition: 'External factors that could benefit your organization.',
    questions: ['What trends could you take advantage of?', 'What new markets are emerging?', 'How can you leverage partnerships?'],
    icon: TrendingUp,
    example: 'Emerging markets in developing countries with growing demand for your products.',
    tooltip: 'External: What trends could you take advantage of?'
  },
  {
    name: 'Threats',
    color: '#f59e0b',
    internal: false,
    definition: 'External challenges that could harm your organization.',
    questions: ['What obstacles do you face?', 'What are competitors doing?', 'What external changes could affect you?'],
    icon: Zap,
    example: 'Increasing competition from new entrants offering similar products at lower prices.',
    tooltip: 'External: What obstacles do you face?'
  }
];

const pills = [
  { id: 1, text: 'Talented Team', isInternal: true },
  { id: 2, text: 'New Competitor', isInternal: false },
  { id: 3, text: 'Rising Inflation', isInternal: false },
  { id: 4, text: 'Old Equipment', isInternal: true }
];

const ProgressBar = ({ step }) => {
  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-white text-sm mb-2">
        <span className={step >= 1 ? 'font-bold' : ''}>Learn</span>
        <span className={step >= 2 ? 'font-bold' : ''}>Analyze</span>
        <span className={step >= 3 ? 'font-bold' : ''}>Report</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
        />
      </div>
    </div>
  );
};

function EducationalSection({ setStep }) {
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const [flipped, setFlipped] = useState({});
  const [toggleInternal, setToggleInternal] = useState(null);
  const [placedPills, setPlacedPills] = useState({});
  const [showExample, setShowExample] = useState(null);

  const handleCardClick = (quadrant) => {
    setFlipped(prev => ({ ...prev, [quadrant.name]: !prev[quadrant.name] }));
  };

  const handleDeepDive = (quadrant) => {
    setShowExample(quadrant);
  };

  const closeModal = () => {
    setSelectedQuadrant(null);
    setShowExample(null);
  };

  const handleDrop = (pillId, zone) => {
    const pill = pills.find(p => p.id === pillId);
    if (pill.isInternal === (zone === 'internal')) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setPlacedPills(prev => ({ ...prev, [pillId]: { ...pill, correct: true } }));
    } else {
      setPlacedPills(prev => ({ ...prev, [pillId]: { ...pill, correct: false } }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 animate-gradient-x p-6">
      <div className="max-w-4xl mx-auto">
        <ProgressBar step={1} />
        {/* Hero Section */}
        <motion.header
          className="text-center mb-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white">SWOT Analysis: Turning Insights into Strategy</h1>
        </motion.header>

        {/* Instructional Text */}
        <div className="text-center mb-4">
          <p className="text-white/80 text-lg">Click a card to learn more.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {quadrants.map((quadrant) => (
            <motion.div
              key={quadrant.name}
              className={`p-6 bg-white/10 backdrop-blur-md rounded-2xl cursor-pointer relative overflow-hidden`}
              style={{
                border: `2px solid ${quadrant.color}30`,
                boxShadow: toggleInternal !== null && quadrant.internal === toggleInternal ? `0 0 20px ${quadrant.color}80` : `inset 0 0 20px ${quadrant.color}20`,
                opacity: toggleInternal !== null ? (quadrant.internal === toggleInternal ? 1 : 0.4) : 1,
                transition: 'opacity 0.3s, box-shadow 0.3s'
              }}
              animate={{
                y: [0, -5, 0],
                transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${quadrant.color}` }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(quadrant)}
            >
              <AnimatePresence mode="wait">
                {!flipped[quadrant.name] ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 0 }}
                    exit={{ rotateY: -90 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <quadrant.icon className="w-12 h-12 mb-4" style={{ color: quadrant.color }} />
                    <h2 className="text-2xl font-semibold text-white">{quadrant.name}</h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white"
                  >
                    <h3 className="font-semibold mb-2">Probing Questions:</h3>
                    <ul className="list-disc list-inside mb-4 text-sm">
                      {quadrant.questions.map((q, i) => <li key={i}>{q}</li>)}
                    </ul>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeepDive(quadrant); }}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition"
                    >
                      Deep Dive
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Toggle */}
        <motion.div
          className="mb-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white mb-4">Internal is what you control; External is what the world does.</p>
          <div className="flex justify-center items-center space-x-4">
            <span className={`text-white ${toggleInternal === true ? 'font-bold' : ''}`}>Internal</span>
            <div
              className="w-16 h-8 rounded-full relative cursor-pointer"
              style={{ backgroundColor: toggleInternal === true ? '#10b981' : toggleInternal === false ? '#0ea5e9' : '#ffffff20' }}
              onClick={() => setToggleInternal(prev => prev === true ? false : prev === false ? null : true)}
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full absolute top-1"
                animate={{ left: toggleInternal === true ? 2 : toggleInternal === false ? 8 : 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </div>
            <span className={`text-white ${toggleInternal === false ? 'font-bold' : ''}`}>External</span>
          </div>
        </motion.div>

        {/* Mini-Game */}
        <motion.div
          className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Test Your Knowledge</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            {pills.map(pill => (
              !placedPills[pill.id] && (
                <motion.div
                  key={pill.id}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={(event, info) => {
                    const dropZone = info.point.x < window.innerWidth / 2 ? 'internal' : 'external';
                    handleDrop(pill.id, dropZone);
                  }}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-800 cursor-move shadow-md"
                  whileDrag={{ scale: 1.1 }}
                >
                  {pill.text}
                </motion.div>
              )
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/20 border-2 border-dashed border-green-400 rounded-lg min-h-32">
              <h4 className="text-white font-semibold mb-2">Internal Factors</h4>
              {Object.values(placedPills).filter(p => p.isInternal).map(pill => (
                <div key={pill.id} className={`px-2 py-1 rounded mb-1 ${pill.correct ? 'bg-green-500' : 'bg-red-500'} text-white text-sm`}>
                  {pill.text}
                </div>
              ))}
            </div>
            <div className="p-4 bg-blue-500/20 border-2 border-dashed border-blue-400 rounded-lg min-h-32">
              <h4 className="text-white font-semibold mb-2">External Factors</h4>
              {Object.values(placedPills).filter(p => !p.isInternal).map(pill => (
                <div key={pill.id} className={`px-2 py-1 rounded mb-1 ${pill.correct ? 'bg-blue-500' : 'bg-red-500'} text-white text-sm`}>
                  {pill.text}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Next Button */}
        <motion.button
          className="mt-8 mx-auto block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition flex items-center"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(2)}
        >
          Next
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>

        {/* Modals */}
        <AnimatePresence>
          {showExample && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-semibold text-white mb-4">{showExample.name} Example</h2>
                <p className="text-white mb-4">{showExample.example}</p>
                <button
                  onClick={closeModal}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InputSection({ formData, setFormData, setStep }) {
  const [tooltip, setTooltip] = useState(null);
  const [inputValues, setInputValues] = useState({ strengths: '', weaknesses: '', opportunities: '', threats: '' });
  const [showHints, setShowHints] = useState(null);

  const addItem = (key) => {
    const value = inputValues[key].trim();
    if (value) {
      setFormData(prev => ({ ...prev, [key]: [...prev[key], value] }));
      setInputValues(prev => ({ ...prev, [key]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 p-6 relative">
      <div className="max-w-4xl mx-auto">
        <ProgressBar step={2} />
        <motion.button
          className="absolute top-6 left-6 px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white flex items-center hover:bg-white/10 transition"
          onClick={() => setStep(1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </motion.button>
        <motion.h1
          className="text-4xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Project Definition & SWOT Input
        </motion.h1>
        <motion.div
          className="mb-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-white text-lg mb-2">Describe the specific challenge or goal you are analyzing.</label>
          <textarea
            className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 resize-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="e.g., Decreasing customer retention in our downtown branch."
            value={formData.problem}
            onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))}
          />
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {quadrants.map((quadrant) => (
            <div
              key={quadrant.name}
              className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl relative"
            >
              <div className="flex items-center mb-4">
                <h2
                  className="text-2xl font-semibold"
                  style={{ color: quadrant.color }}
                >
                  {quadrant.name}
                </h2>
                <HelpCircle
                  className="w-5 h-5 ml-2 cursor-pointer text-white/70 hover:text-white"
                  onClick={() => setShowHints(quadrant)}
                />
              </div>
              <div className="flex mb-4">
                <input
                  type="text"
                  className="flex-1 p-2 bg-white/20 border border-white/30 rounded-l text-white placeholder-white/50"
                  placeholder="Add a point..."
                  value={inputValues[quadrant.name.toLowerCase()]}
                  onChange={(e) => setInputValues(prev => ({ ...prev, [quadrant.name.toLowerCase()]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addItem(quadrant.name.toLowerCase());
                    }
                  }}
                />
                <button
                  className="px-4 py-2 bg-white/20 border border-white/30 rounded-r text-white hover:bg-white/30"
                  onClick={() => addItem(quadrant.name.toLowerCase())}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {formData[quadrant.name.toLowerCase()].map((item, index) => (
                  <div key={index} className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full mr-2 mb-2">
                    <span className="text-white text-sm">{item}</span>
                    <button
                      onClick={() => {
                        const key = quadrant.name.toLowerCase();
                        setFormData(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
                      }}
                      className="ml-2 text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
        {/* Generate Action Plan Button */}
        <motion.button
          className="mt-8 mx-auto block px-8 py-4 bg-gradient-to-r from-indigo-500 to-pink-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition flex items-center"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (!formData.problem.trim()) {
              alert('Please describe the challenge or goal.');
              return;
            }
            const hasItems = Object.values(formData).some(val => Array.isArray(val) && val.length > 0);
            if (!hasItems) {
              alert('Please add at least one item to a SWOT category.');
              return;
            }
            setStep(3);
          }}
        >
          <Sparkles className="mr-2 w-5 h-5" />
          Generate Action Plan
        </motion.button>
      </div>
    </div>
  );
}

function App() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    problem: '',
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  });

  const handleSetStep = (newStep) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      {step === 1 && (
        <motion.div
          key="educational"
          custom={direction}
          initial={{ x: direction * 300 }}
          animate={{ x: 0 }}
          exit={{ x: direction * -300 }}
          transition={{ duration: 0.5 }}
        >
          <EducationalSection setStep={handleSetStep} />
        </motion.div>
      )}
      {step === 2 && (
        <motion.div
          key="input"
          custom={direction}
          initial={{ x: direction * 300 }}
          animate={{ x: 0 }}
          exit={{ x: direction * -300 }}
          transition={{ duration: 0.5 }}
        >
          <InputSection formData={formData} setFormData={setFormData} setStep={handleSetStep} />
        </motion.div>
      )}
      {step === 3 && (
        <motion.div
          key="report"
          custom={direction}
          initial={{ x: direction * 300 }}
          animate={{ x: 0 }}
          exit={{ x: direction * -300 }}
          transition={{ duration: 0.5 }}
        >
          <ReportSection formData={formData} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ReportSection({ formData }) {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white">Analyzing Your Strategy...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 p-6">
      <div className="max-w-4xl mx-auto">
        <ProgressBar step={3} />
        <motion.h1
          className="text-4xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          SWOT Action Plan Report
        </motion.h1>
        <motion.div
          className="mb-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Challenge/Goal</h2>
          <p className="text-white">{formData.problem || 'No problem statement provided.'}</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {quadrants.map((quadrant) => (
            <div
              key={quadrant.name}
              className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
            >
              <h3 className="text-2xl font-semibold mb-4" style={{ color: quadrant.color }}>{quadrant.name}</h3>
              {formData[quadrant.name.toLowerCase()].length > 0 ? (
                <ul className="space-y-2">
                  {formData[quadrant.name.toLowerCase()].map((item, index) => (
                    <li key={index} className="text-white bg-white/10 p-2 rounded">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/50">No items added.</p>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}export default App;
