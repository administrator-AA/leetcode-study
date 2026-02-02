import React, { useState, useEffect, useRef } from 'react';
import { Heart, Code, Sparkles, Calendar, Camera, MessageCircle, Lightbulb } from 'lucide-react';

export default function ValentineLeetCode() {
  const [currentHint, setCurrentHint] = useState(0);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [showReveal, setShowReveal] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [answered, setAnswered] = useState(false);
  const noButtonRef = useRef(null);
  const memoriesRef = useRef(null);

  const hints = [
    "💡 Hint 1: Use a sliding window with two pointers (left and right)",
    "💡 Hint 2: Keep track of characters you've seen in a Set or object",
    "💡 Hint 3: When you find a duplicate, move the left pointer until it's gone",
    "💡 Hint 4: Track the maximum window size you've seen",
    "💡 Hint 5: The answer is the length of the longest valid window"
  ];

  const solution = `function longestUniqueSubstring(s) {
  const charSet = new Set();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}`;

  const starter = `function longestUniqueSubstring(s) {
  // Your code here
  
  return 0;
}`;

  useEffect(() => {
    setCode(starter);
  }, []);

  const testCases = [
    { input: 'LOVE', expected: 4, description: 'All unique letters' },
    { input: 'FOREVER', expected: 5, description: 'FORVE or ORVER' },
    { input: 'YOUANDME', expected: 8, description: 'Together we are longest' },
    { input: 'VALENTINE', expected: 7, description: 'VALENTI or ALENTIN' },
  ];

  const runTests = () => {
    try {
      const userFunction = eval(`(${code})`);
      const results = testCases.map(tc => {
        try {
          const result = userFunction(tc.input);
          return {
            ...tc,
            output: result,
            passed: result === tc.expected
          };
        } catch (e) {
          return { ...tc, output: 'Error', passed: false, error: e.message };
        }
      });

      const allPassed = results.every(r => r.passed);
      setTestResults(results);
      
      if (allPassed) {
        setTimeout(() => setShowReveal(true), 500);
      } else {
        setShowReveal(false);
      }
    } catch (e) {
      setTestResults([{ error: 'Runtime Error: ' + e.message, passed: false }]);
      setShowReveal(false);
    }
  };

  const nextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const showSolution = () => {
    setCode(solution);
  };

  const handleNoHover = (e) => {
    if (answered) return;
    
    const button = noButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < 120) {
      const angle = Math.atan2(distanceY, distanceX);
      const escapeDistance = 150;
      const newX = -Math.cos(angle) * escapeDistance;
      const newY = -Math.sin(angle) * escapeDistance;
      
      setNoButtonPos({ x: newX, y: newY });
      setNoButtonSize(prev => Math.max(0.3, prev - 0.15));
    }
  };

  const handleYes = () => {
    setAnswered(true);
    setTimeout(() => {
      memoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const memories = [
    {
      type: 'moment',
      icon: Calendar,
      title: 'First Dosa Date',
      text: 'Remember when you came for the dosa thing just because and then i just got lost in your brown eyes, glimmering in the sun.'
    },
    {
      type: 'moment',
      icon: Code,
      title: 'Evening Chats',
      text: 'Those 6PM nonstop talking sessions that turned into sunset conversations 🌅 till dinner time started.'
    },
    {
      type: 'quote',
      icon: MessageCircle,
      title: 'You said',
      text: '"I love how you try so hard to sing"'
    },
    {
      type: 'moment',
      icon: Heart,
      title: 'The Moment I Knew',
      text: 'When you laughed at my stupid jokes and I realized you get me completely 💕'
    }
  ];

  return (
    <div 
      className="min-h-screen bg-[#0a0a0f] text-[#e8e8ea] font-mono"
      onMouseMove={handleNoHover}
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 50%)
        `
      }}
    >
{/* Problem Section */}
<div className="min-h-screen flex items-center justify-center p-4">
  <div className="max-w-[95%] w-full">
    {/* Header - kept at the top */}
    <div className="mb-6 border-b-2 border-[#ff1744] pb-4">
      <div className="flex items-center gap-3 mb-2">
        <Code className="text-[#00ff41]" size={32} />
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-[#ff1744]">LEETCODE</span>
          <span className="text-[#00ff41]">.LOVE</span>
        </h1>
      </div>
      <p className="text-sm text-gray-400 tracking-wider uppercase">Sliding Window • Medium • Special Edition</p>
    </div>

    {/* THE SPLIT LAYOUT STARTS HERE */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      
      {/* LEFT COLUMN: Problem & Hints */}
      <div className="space-y-6">
        {/* Problem Statement */}
        <div className="bg-[#1a1a24] border-2 border-[#2a2a3a] rounded-lg p-6 shadow-2xl h-fit">
          <h2 className="text-2xl font-bold mb-4 text-[#ff1744]">
            Problem: Longest Substring Without Repeating Characters
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p className="text-gray-300">
              Given a string <code className="bg-[#2a2a3a] px-2 py-1 rounded text-[#00ff41]">s</code>, 
              find the length of the <span className="text-[#ff1744] font-bold">longest substring</span> without 
              repeating characters.
            </p>
            <div className="bg-[#0f0f1a] p-4 rounded border-l-4 border-[#00ff41]">
              <p className="text-xs text-gray-400 mb-2">EXAMPLE:</p>
              <p>Input: s = <span className="text-[#00ff41]">"abcabcbb"</span></p>
              <p>Output: <span className="text-[#ff1744]">3</span></p>
              <p>Explanation: <span className="text-[#ff1744]">The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.</span></p>
            </div>

              <div className="bg-[#0f0f1a] p-4 rounded border-l-4 border-[#00ff41]">
              <p className="text-xs text-gray-400 mb-2">EXAMPLE:</p>
              <p>Input: s = <span className="text-[#00ff41]">"bbbb"</span></p>
              <p>Output: <span className="text-[#ff1744]">1</span></p>
              <p>Explanation: <span className="text-[#ff1744]">The answer is "b", with the length of 1.</span></p>
            </div>

            <div className="bg-[#0f0f1a] p-4 rounded border-l-4 border-[#00ff41]">
              <p className="text-xs text-gray-400 mb-2">EXAMPLE:</p>
              <p>Input: s = <span className="text-[#00ff41]">"pwwkew"</span></p>
              <p>Output: <span className="text-[#ff1744]">3</span></p>
              <p>Explanation: <span className="text-[#ff1744]">The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.</span></p>
            </div>

            <div className="bg-[#0f0f1a] p-4 rounded border-l-4 border-[#00ff41]">
              <p className="text-xs text-gray-400 mb-2">EXAMPLE:</p>
              <p>Input: s = <span className="text-[#00ff41]">"LOVE"</span></p>
              <p>Output: <span className="text-[#ff1744]">4</span></p>
            </div>

            <div className="bg-[#0f0f1a] p-4 rounded border-l-4 border-[#00ff41]">
              <p className="text-xs text-gray-400 mb-2">Constraints:</p>
              <p><span className="text-[#00ff41]">0 &le; s.length &le; 5 * 10<sup>4</sup></span></p>
              <p><span className="text-[#ff1744]">s consists of English letters, digits, symbols and spaces.</span></p>
              <p><span className="text-[#00ff41]">3 Thousand &le; Love between us &le; Infinity</span></p>
            </div>

            <div className="bg-[#0f0f1a] p-4 rounded border-l-4 border-[#00ff41]">
              <p className="text-xs text-gray-400 mb-2">EXAMPLE:</p>
              <p>Input: s = <span className="text-[#00ff41]">"LOVE"</span></p>
              <p>Output: <span className="text-[#ff1744]">4</span></p>
            </div>

  
          </div>
        </div>

        {/* Hints Section */}
        <div className="bg-[#1a1a24] border-2 border-[#2a2a3a] rounded-lg p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="text-yellow-400" size={20} />
              <h3 className="text-lg font-bold text-yellow-400">Hints</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={nextHint} disabled={currentHint >= hints.length - 1} className="px-2 py-1 bg-yellow-900/30 border border-yellow-400 text-yellow-400 rounded text-xs">Next Hint</button>
              <button onClick={showSolution} className="px-2 py-1 bg-red-900/30 border border-red-400 text-red-400 rounded text-xs">Solution</button>
            </div>
          </div>
          <div className="space-y-2">
            {hints.slice(0, currentHint + 1).map((hint, idx) => (
              <div key={idx} className="p-3 bg-[#0f0f1a] rounded border-l-4 border-yellow-400 text-xs text-gray-300">
                {hint}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Editor & Results */}
      <div className="space-y-4">
        <div className="bg-[#1a1a24] border-2 border-[#2a2a3a] rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-[#0f0f1a] px-4 py-2 border-b border-[#2a2a3a] flex items-center justify-between">
            <span className="text-xs text-gray-400 tracking-wider">CODE EDITOR</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-80 bg-[#0a0a0f] p-4 text-sm font-mono focus:outline-none resize-none text-[#e8e8ea]"
            spellCheck="false"
          />
        </div>

        <button onClick={runTests} className="w-full bg-[#00ff41] text-black font-bold py-4 rounded-lg text-lg tracking-wider hover:bg-[#00dd35] transition-all">
          ▶ RUN CODE
        </button>

        {/* Test Results and Reveal nested correctly in Right Column */}
        {testResults && (
          <div className="bg-[#1a1a24] border-2 border-[#2a2a3a] rounded-lg overflow-hidden shadow-2xl p-4 space-y-3">
            <div className="bg-[#0f0f1a] -mx-4 -mt-4 px-4 py-2 border-b border-[#2a2a3a] mb-4">
              <span className="text-xs text-gray-400 tracking-wider">TEST RESULTS</span>
            </div>
            
            {testResults[0]?.error ? (
              <div className="text-red-400 text-sm font-mono">{testResults[0].error}</div>
            ) : (
              testResults.map((result, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded border-l-4 ${
                    result.passed 
                      ? 'bg-green-900/20 border-[#00ff41]' 
                      : 'bg-red-900/20 border-red-500'
                  }`}
                  style={{ animation: `slideIn 0.3s ease-out ${idx * 0.1}s both` }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold">
                      {result.passed ? '✓' : '✗'} Test Case {idx + 1}
                    </span>
                    <span className={`text-xs ${result.passed ? 'text-[#00ff41]' : 'text-red-400'}`}>
                      {result.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    Input: "{result.input}" → Expected: {result.expected}, Got: {result.output}
                  </div>
                </div>
              ))
            )}
            
            {/* Valentine Reveal Section */}
            {showReveal && (
              <div 
                className="mt-6 p-6 bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-lg border-2 border-[#ff1744] text-center"
                style={{ animation: 'revealPulse 2s ease-in-out infinite' }}
              >
                <Heart className="inline-block text-[#ff1744] mb-4" size={40} style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }} />
                <h2 className="text-2xl font-bold mb-4 text-[#ff1744]">WILL YOU BE MY VALENTINE?</h2>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleYes}
                    className="px-6 py-2 bg-[#00ff41] text-black font-bold rounded hover:scale-105 transition-transform"
                  >
                    YES
                  </button>
                  <button
                    ref={noButtonRef}
                    className="px-6 py-2 bg-red-900/30 border border-red-500 text-red-300 rounded font-bold transition-all"
                    style={{
                      transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px) scale(${noButtonSize})`,
                      opacity: answered ? 0 : 1
                    }}
                  >
                    NO
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div> {/* End of Right Column */}
    </div> {/* End of Grid */}
  </div> {/* End of Max-width container */}
</div> {/* End of Problem Section */}

{/* Memories Section - Full width below the split */}
{answered && (
  <div ref={memoriesRef} className="bg-[#0a0a0f] py-20 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <Sparkles className="inline-block text-[#ff1744] mb-4" size={40} />
        <h2 className="text-5xl font-bold mb-4" style={{ background: 'linear-gradient(135deg, #00ff41, #ff1744)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          OUR MEMORIES
        </h2>
        <p className="text-gray-400 text-lg">// Compiled with love ❤️</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {memories.map((memory, idx) => {
          const Icon = memory.icon;
          return (
            <div key={idx} className="bg-[#1a1a24] border-2 border-[#2a2a3a] rounded-lg p-6 hover:border-[#ff1744] transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#ff1744]/10 rounded-lg border border-[#ff1744]/30">
                  <Icon className="text-[#ff1744]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#00ff41]">{memory.title}</h3>
                  <p className="text-gray-300">{memory.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Photo Gallery with Fixed Paths */}
      <div className="mt-12 bg-[#1a1a24] border-2 border-[#2a2a3a] rounded-lg p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-[#0f0f1a] border-2 border-[#2a2a3a] rounded-lg overflow-hidden group">
              <img 
                src={`${import.meta.env.BASE_URL}photo${i}.jpg`} 
                alt="Memory" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
          ))}
        </div>
      </div>




            {/* Final Message */}
            <div className="mt-12 text-center p-8 bg-gradient-to-r from-[#ff1744]/10 to-[#00ff41]/10 
                          rounded-lg border-2 border-[#ff1744]">
              <p className="text-2xl mb-2">
                <span className="text-[#00ff41]">return</span> 
                <span className="text-gray-400"> "</span>
                <span className="text-[#ff1744]">Forever with you</span>
                <span className="text-gray-400">";</span>
              </p>
              <p className="text-sm text-gray-400 mt-4">
                // This Valentine's Day and every day after 💕
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes revealPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 23, 68, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 23, 68, 0.6);
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.05);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
