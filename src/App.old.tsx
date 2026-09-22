import { useEffect, useRef, useState } from "react";
import "./App.css";

const profileIcons = ["👤", "🎮", "⚡", "🔥", "💎", "🌟", "🚀", "🎯", "👾", "🤖", "🦾", "💀"];

// Word pools for text generation
const wordPools = {
  subjects: [
    "the developer", "a programmer", "the designer", "an engineer", "the student", 
    "a teacher", "the artist", "a scientist", "the writer", "a musician",
    "the athlete", "a leader", "the innovator", "a creator", "the explorer"
  ],
  verbs: [
    "creates", "builds", "designs", "develops", "writes", "analyzes", "explores",
    "discovers", "implements", "optimizes", "refactors", "debugs", "tests", "deploys",
    "maintains", "improves", "solves", "investigates", "collaborates", "innovates"
  ],
  objects: [
    "complex algorithms", "elegant solutions", "robust systems", "efficient code",
    "innovative features", "scalable architectures", "seamless experiences",
    "powerful tools", "creative designs", "practical applications", "modern interfaces",
    "responsive layouts", "dynamic components", "secure platforms", "reliable services"
  ],
  adjectives: [
    "powerful", "efficient", "elegant", "robust", "scalable", "flexible", "modern",
    "innovative", "creative", "practical", "seamless", "intuitive", "sophisticated",
    "advanced", "dynamic", "reliable", "secure", "optimized", "responsive", "maintainable"
  ],
  adverbs: [
    "quickly", "efficiently", "carefully", "thoroughly", "consistently", "effectively",
    "successfully", "rapidly", "precisely", "systematically", "strategically",
    "continuously", "incrementally", "collaboratively", "independently"
  ],
  connectors: [
    "while", "because", "although", "however", "therefore", "meanwhile", "furthermore",
    "consequently", "nevertheless", "moreover", "thus", "hence", "accordingly"
  ],
  prepositions: [
    "in the field", "across multiple domains", "throughout the process",
    "during development", "within the system", "for the project", "with the team",
    "through iteration", "by leveraging", "using modern techniques"
  ]
};

const punctuation = {
  easy: [".", ".", ".", ".", "."], // mostly periods
  medium: [".", ".", ",", ",", ";"], // periods, commas, semicolons
  hard: [".", ",", ";", ":", "—", "...", "!", "?", "()", "\"\""] // all punctuation
};

const generateText = (difficulty: string, wordCount: number = 200): string => {
  const sentences: string[] = [];
  let currentWordCount = 0;
  
  const punct = punctuation[difficulty as keyof typeof punctuation];
  
  while (currentWordCount < wordCount) {
    const sentenceType = Math.random();
    let sentence = "";
    let sentenceWords = 0;
    
    if (sentenceType < 0.4) {
      // Simple: Subject + Verb + Object
      const subject = wordPools.subjects[Math.floor(Math.random() * wordPools.subjects.length)];
      const verb = wordPools.verbs[Math.floor(Math.random() * wordPools.verbs.length)];
      const obj = wordPools.objects[Math.floor(Math.random() * wordPools.objects.length)];
      sentence = `${subject} ${verb} ${obj}`;
      sentenceWords = 3;
    } else if (sentenceType < 0.7) {
      // Medium: Adjective + Subject + Adverb + Verb + Object
      const adj = wordPools.adjectives[Math.floor(Math.random() * wordPools.adjectives.length)];
      const subject = wordPools.subjects[Math.floor(Math.random() * wordPools.subjects.length)];
      const adverb = wordPools.adverbs[Math.floor(Math.random() * wordPools.adverbs.length)];
      const verb = wordPools.verbs[Math.floor(Math.random() * wordPools.verbs.length)];
      const obj = wordPools.objects[Math.floor(Math.random() * wordPools.objects.length)];
      sentence = `${adj} ${subject} ${adverb} ${verb} ${obj}`;
      sentenceWords = 5;
    } else {
      // Complex: Subject + Verb + Object + Connector + Subject + Verb + Object
      const subject1 = wordPools.subjects[Math.floor(Math.random() * wordPools.subjects.length)];
      const verb1 = wordPools.verbs[Math.floor(Math.random() * wordPools.verbs.length)];
      const obj1 = wordPools.objects[Math.floor(Math.random() * wordPools.objects.length)];
      const connector = wordPools.connectors[Math.floor(Math.random() * wordPools.connectors.length)];
      const subject2 = wordPools.subjects[Math.floor(Math.random() * wordPools.subjects.length)];
      const verb2 = wordPools.verbs[Math.floor(Math.random() * wordPools.verbs.length)];
      const prep = wordPools.prepositions[Math.floor(Math.random() * wordPools.prepositions.length)];
      sentence = `${subject1} ${verb1} ${obj1} ${connector} ${subject2} ${verb2} ${prep}`;
      sentenceWords = 7;
    }
    
    // Capitalize first letter
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    
    // Add punctuation based on difficulty
    if (difficulty === "easy") {
      sentence += ".";
    } else if (difficulty === "medium") {
      const p = punct[Math.floor(Math.random() * punct.length)];
      if (p === ",") {
        // Add comma in middle of sentence if possible
        const words = sentence.split(" ");
        if (words.length > 3) {
          const commaPos = Math.floor(words.length / 2);
          words[commaPos] = words[commaPos] + ",";
          sentence = words.join(" ") + ".";
        } else {
          sentence += ".";
        }
      } else {
        sentence += p;
      }
    } else {
      // Hard: more complex punctuation
      const p = punct[Math.floor(Math.random() * punct.length)];
      if (p === "()") {
        const words = sentence.split(" ");
        const parenPos = Math.floor(Math.random() * (words.length - 2)) + 1;
        words[parenPos] = `(${words[parenPos]})`;
        sentence = words.join(" ") + ".";
      } else if (p === "\"\"") {
        const words = sentence.split(" ");
        const quotePos = Math.floor(Math.random() * (words.length - 2)) + 1;
        words[quotePos] = `"${words[quotePos]}"`;
        sentence = words.join(" ") + ".";
      } else if (p === ",") {
        const words = sentence.split(" ");
        if (words.length > 3) {
          const commaPos = Math.floor(words.length / 2);
          words[commaPos] = words[commaPos] + ",";
          sentence = words.join(" ") + punct[Math.floor(Math.random() * 3)];
        } else {
          sentence += p;
        }
      } else {
        sentence += p;
      }
    }
    
    sentences.push(sentence);
    currentWordCount += sentenceWords;
  }
  
  return sentences.join(" ");
};

// Code generation for different languages
const codeSnippets = {
  javascript: {
    keywords: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "async", "await"],
    types: ["string", "number", "boolean", "object", "array", "null", "undefined"],
    methods: ["map", "filter", "reduce", "forEach", "find", "includes", "push", "pop", "slice"],
    variables: ["data", "result", "value", "item", "index", "count", "list", "user", "response", "error"],
  },
  python: {
    keywords: ["def", "return", "if", "elif", "else", "for", "while", "class", "import", "from", "try", "except"],
    types: ["str", "int", "float", "bool", "list", "dict", "tuple", "set"],
    methods: ["append", "extend", "remove", "pop", "get", "keys", "values", "items", "join", "split"],
    variables: ["data", "result", "value", "item", "index", "count", "items", "user", "response", "error"],
  },
  java: {
    keywords: ["public", "private", "static", "void", "return", "if", "else", "for", "while", "class", "new", "try", "catch"],
    types: ["String", "int", "boolean", "double", "float", "long", "ArrayList", "HashMap"],
    methods: ["add", "remove", "get", "set", "size", "isEmpty", "contains", "clear", "toString"],
    variables: ["data", "result", "value", "item", "index", "count", "list", "user", "response", "error"],
  },
  cpp: {
    keywords: ["int", "void", "return", "if", "else", "for", "while", "class", "public", "private", "using", "namespace"],
    types: ["string", "int", "bool", "double", "float", "long", "vector", "map"],
    methods: ["push_back", "pop_back", "size", "empty", "clear", "begin", "end", "insert", "erase"],
    variables: ["data", "result", "value", "item", "index", "count", "vec", "user", "response", "error"],
  },
  typescript: {
    keywords: ["const", "let", "interface", "type", "function", "return", "if", "else", "for", "async", "await", "export"],
    types: ["string", "number", "boolean", "any", "void", "never", "unknown", "Array"],
    methods: ["map", "filter", "reduce", "forEach", "find", "some", "every", "includes"],
    variables: ["data", "result", "value", "item", "index", "count", "list", "user", "response", "error"],
  },
  php: {
    keywords: ["function", "return", "if", "else", "elseif", "foreach", "while", "class", "public", "private", "new"],
    types: ["string", "int", "bool", "array", "object", "float", "mixed"],
    methods: ["array_map", "array_filter", "count", "in_array", "isset", "empty", "explode", "implode"],
    variables: ["$data", "$result", "$value", "$item", "$index", "$count", "$list", "$user", "$response", "$error"],
  },
};

const generateCode = (language: string, lineCount: number = 15): string => {
  const lang = codeSnippets[language as keyof typeof codeSnippets];
  if (!lang) return generateText("medium", 200);
  
  const lines: string[] = [];
  
  const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  for (let i = 0; i < lineCount; i++) {
    const lineType = Math.random();
    let line = "";
    
    if (language === "javascript" || language === "typescript") {
      if (lineType < 0.3) {
        // Variable declaration
        const keyword = getRandom(["const", "let"]);
        const variable = getRandom(lang.variables);
        const value = Math.random() > 0.5 ? `${Math.floor(Math.random() * 100)}` : `"${getRandom(lang.variables)}"`;
        line = `${keyword} ${variable} = ${value};`;
      } else if (lineType < 0.5) {
        // Function call
        const obj = getRandom(lang.variables);
        const method = getRandom(lang.methods);
        line = `${obj}.${method}((${getRandom(lang.variables)}) => ${getRandom(lang.variables)});`;
      } else if (lineType < 0.7) {
        // Condition
        const variable = getRandom(lang.variables);
        const operator = getRandom(["===", "!==", ">", "<", ">=", "<="]);
        const value = Math.floor(Math.random() * 100);
        line = `if (${variable} ${operator} ${value}) {`;
      } else {
        // Return statement
        line = `return ${getRandom(lang.variables)};`;
      }
    } else if (language === "python") {
      if (lineType < 0.3) {
        // Variable assignment
        const variable = getRandom(lang.variables);
        const value = Math.random() > 0.5 ? `${Math.floor(Math.random() * 100)}` : `"${getRandom(lang.variables)}"`;
        line = `${variable} = ${value}`;
      } else if (lineType < 0.5) {
        // Method call
        const obj = getRandom(lang.variables);
        const method = getRandom(lang.methods);
        line = `${obj}.${method}(${getRandom(lang.variables)})`;
      } else if (lineType < 0.7) {
        // For loop
        const variable = getRandom(lang.variables);
        const iterable = getRandom(lang.variables);
        line = `for ${variable} in ${iterable}:`;
      } else {
        // Return
        line = `return ${getRandom(lang.variables)}`;
      }
    } else if (language === "java") {
      if (lineType < 0.3) {
        // Variable declaration
        const type = getRandom(lang.types);
        const variable = getRandom(lang.variables);
        const value = type === "int" ? Math.floor(Math.random() * 100) : `"${getRandom(lang.variables)}"`;
        line = `${type} ${variable} = ${value};`;
      } else if (lineType < 0.5) {
        // Method call
        const obj = getRandom(lang.variables);
        const method = getRandom(lang.methods);
        line = `${obj}.${method}(${getRandom(lang.variables)});`;
      } else if (lineType < 0.7) {
        // Condition
        const variable = getRandom(lang.variables);
        line = `if (${variable} != null) {`;
      } else {
        // Return
        line = `return ${getRandom(lang.variables)};`;
      }
    } else if (language === "cpp") {
      if (lineType < 0.3) {
        // Variable declaration
        const type = getRandom(lang.types);
        const variable = getRandom(lang.variables);
        line = `${type} ${variable} = ${Math.floor(Math.random() * 100)};`;
      } else if (lineType < 0.5) {
        // Method call
        const obj = getRandom(lang.variables);
        const method = getRandom(lang.methods);
        line = `${obj}.${method}(${getRandom(lang.variables)});`;
      } else if (lineType < 0.7) {
        // For loop
        line = `for (int i = 0; i < ${getRandom(lang.variables)}.size(); i++) {`;
      } else {
        // Return
        line = `return ${getRandom(lang.variables)};`;
      }
    } else if (language === "php") {
      if (lineType < 0.3) {
        // Variable assignment
        const variable = getRandom(lang.variables);
        const value = Math.random() > 0.5 ? `${Math.floor(Math.random() * 100)}` : `"${getRandom(lang.variables).substring(1)}"`;
        line = `${variable} = ${value};`;
      } else if (lineType < 0.5) {
        // Function call
        const method = getRandom(lang.methods);
        const variable = getRandom(lang.variables);
        line = `${method}(${variable});`;
      } else if (lineType < 0.7) {
        // Foreach loop
        const iterable = getRandom(lang.variables);
        const item = getRandom(lang.variables);
        line = `foreach (${iterable} as ${item}) {`;
      } else {
        // Return
        line = `return ${getRandom(lang.variables)};`;
      }
    }
    
    lines.push(line);
  }
  
  return lines.join(" ");
};

interface TestResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  duration: number;
  date: string;
  playerName: string;
  profileIcon: string;
  mode: string;
  selectedDuration: number;
  wpmHistory?: WpmDataPoint[];
}

interface TypeMetrics {
  correctChars: number;
  incorrectChars: number;
  totalKeystrokes: number;
}

interface WpmDataPoint {
  time: number;
  wpm: number;
}

// WPM Graph Component
const WpmGraph = ({ data, duration }: { data: WpmDataPoint[], duration: number }) => {
  if (data.length === 0) return null;

  const maxWpm = Math.max(...data.map(d => d.wpm), 20);
  const maxTime = Math.max(...data.map(d => d.time), duration);
  const paddedMaxWpm = Math.ceil(maxWpm * 1.1 / 10) * 10; // Round up to nearest 10 with 10% padding
  
  const points = data.map(d => {
    const x = (d.time / maxTime) * 580 + 10; // 10px padding on sides
    const y = 180 - ((d.wpm / paddedMaxWpm) * 160) + 10; // 10px padding top/bottom
    return `${x},${y}`;
  }).join(' ');
  
  const areaPoints = `10,190 ${points} 590,190`;
  
  return (
    <div className="wpm-graph-container">
      <div className="graph-title">PERFORMANCE GRAPH</div>
      <div className="wpm-graph">
        <svg width="100%" height="220" viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background grid */}
          <rect x="10" y="10" width="580" height="180" fill="rgba(0, 0, 0, 0.3)" stroke="#1a2332" strokeWidth="1"/>
          
          {/* Horizontal grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <g key={`grid-${i}`}>
              <line
                x1="10"
                y1={10 + i * 45}
                x2="590"
                y2={10 + i * 45}
                stroke="#2a3f5f"
                strokeWidth="1"
                opacity="0.5"
              />
              <text
                x="595"
                y={10 + i * 45 + 4}
                fill="#8892b0"
                fontSize="10"
                fontFamily="Orbitron, monospace"
              >
                {Math.round(paddedMaxWpm - (i * paddedMaxWpm / 4))}
              </text>
            </g>
          ))}
          
          {/* Graph area fill */}
          <polyline
            points={areaPoints}
            fill="url(#graphGradient)"
          />
          
          {/* Graph line */}
          <polyline
            points={points}
            fill="none"
            stroke="#00ff88"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          
          {/* Data point dots */}
          {data.map((d, i) => {
            const x = (d.time / maxTime) * 580 + 10;
            const y = 180 - ((d.wpm / paddedMaxWpm) * 160) + 10;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#00ff88"
                filter="url(#glow)"
              />
            );
          })}
        </svg>
        <div className="graph-labels">
          <span className="graph-label-start">0s</span>
          <span className="graph-label-center">WPM</span>
          <span className="graph-label-end">{duration}s</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [targetText, setTargetText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showGraphResults, setShowGraphResults] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showGameDetail, setShowGameDetail] = useState(false);
  const [selectedGame, setSelectedGame] = useState<TestResult | null>(null);
  const [statsFilterMode, setStatsFilterMode] = useState<string>("all");
  const [statsFilterDuration, setStatsFilterDuration] = useState<number | "all">("all");
  const [playerName, setPlayerName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(profileIcons[0]);
  const [pendingResult, setPendingResult] = useState<Omit<TestResult, "playerName" | "profileIcon"> | null>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>(() => {
    const saved = localStorage.getItem("typingTestHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [difficulty, setDifficulty] = useState(() => {
    return localStorage.getItem("difficulty") || "medium";
  });
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode") || "javascript";
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("soundEnabled");
    return saved ? JSON.parse(saved) : true;
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [comboMilestone, setComboMilestone] = useState<number | null>(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [metrics, setMetrics] = useState<TypeMetrics>({
    correctChars: 0,
    incorrectChars: 0,
    totalKeystrokes: 0,
  });
  const [wpmHistory, setWpmHistory] = useState<WpmDataPoint[]>([]);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playSound = (frequency: number, duration: number, type: OscillatorType = "sine") => {
    if (!soundEnabled) return;

    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch (e) {
      // Audio not supported
    }
  };

  const getRandomTextForDifficulty = (difficultyLevel: string) => {
    if (mode === "text") {
      return generateText(difficultyLevel, 200);
    } else {
      return generateCode(mode, 15);
    }
  };

  const startTest = () => {
    setTargetText(getRandomTextForDifficulty(difficulty));
    setUserInput("");
    // Reset timeLeft to selectedDuration when starting a new test
    setTimeLeft(selectedDuration);
    setIsFinished(false);
    setIsStarted(true);
    setElapsedTime(0);
    setShowStats(false);
    setShowSettings(false);
    setCombo(0);
    setMaxCombo(0);
    setVisibleStartIndex(0);
    setWpmHistory([]);
    setShowGraphResults(false);
    setMetrics({
      correctChars: 0,
      incorrectChars: 0,
      totalKeystrokes: 0,
    });
    playSound(600, 0.1, "square");
  };

  const resetTest = () => {
    setUserInput("");
    setTimeLeft(selectedDuration);
    setIsFinished(false);
    setIsStarted(false);
    setElapsedTime(0);
    setCombo(0);
    setMaxCombo(0);
    setVisibleStartIndex(0);
    setWpmHistory([]);
    setShowGraphResults(false);
    setMetrics({
      correctChars: 0,
      incorrectChars: 0,
      totalKeystrokes: 0,
    });
  };

  useEffect(() => {
    if (!targetText) {
      setTargetText(getRandomTextForDifficulty(difficulty));
    }
  }, [targetText, difficulty]);

  useEffect(() => {
    if (!isStarted || isFinished) {
      return;
    }

    inputRef.current?.focus();
    const timer = setInterval(() => {
      setElapsedTime((previousTime) => {
        const newTime = previousTime + 1;
        
        // Record WPM every second
        setMetrics(currentMetrics => {
          const currentWpm = newTime === 0 
            ? 0 
            : Math.round(((currentMetrics.totalKeystrokes / 5) - (currentMetrics.incorrectChars / 5)) / (newTime / 60));
          
          setWpmHistory(prev => [...prev, { time: newTime, wpm: currentWpm }]);
          
          return currentMetrics;
        });
        
        return newTime;
      });
      
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timer);
          setIsStarted(false);
          setIsFinished(true);
          playSound(800, 0.4, "triangle");
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isFinished]);

  useEffect(() => {
    if (isFinished && elapsedTime > 0 && !showGraphResults && !showNameInput) {
      const result = {
        wpm,
        rawWpm,
        accuracy,
        errors: metrics.incorrectChars,
        duration: elapsedTime,
        date: new Date().toISOString(),
        mode,
        selectedDuration,
        wpmHistory: [...wpmHistory],
      };
      setPendingResult(result);
      setShowGraphResults(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const saveResult = () => {
    if (pendingResult && playerName.trim()) {
      const result: TestResult = {
        ...pendingResult,
        playerName: playerName.trim(),
        profileIcon: selectedIcon,
      };
      const newHistory = [result, ...testHistory].slice(0, 20);
      setTestHistory(newHistory);
      localStorage.setItem("typingTestHistory", JSON.stringify(newHistory));
      setShowNameInput(false);
      setShowGraphResults(false);
      setPlayerName("");
      setPendingResult(null);
    }
  };

  const skipSave = () => {
    setShowNameInput(false);
    setShowGraphResults(false);
    setPlayerName("");
    setPendingResult(null);
  };

  const continueToNameInput = () => {
    setShowGraphResults(false);
    setShowNameInput(true);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showClearConfirm) {
          setShowClearConfirm(false);
        } else if (showGraphResults) {
          skipSave();
        } else if (showNameInput) {
          skipSave();
        } else if (showStats || showSettings) {
          setShowStats(false);
          setShowSettings(false);
        }
      } else if (e.key === 'Enter') {
        if (showGraphResults) {
          continueToNameInput();
        } else if (showNameInput && playerName.trim()) {
          saveResult();
        } else if (!isStarted && !isFinished && !showStats && !showSettings && !showClearConfirm && !showNameInput && !showGraphResults) {
          startTest();
        } else if (isFinished && !showGraphResults && !showNameInput) {
          startTest();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showStats, showSettings, showClearConfirm, showNameInput, showGraphResults, playerName, isStarted, isFinished, selectedDuration]);

  const accuracy = metrics.totalKeystrokes === 0 
    ? 100 
    : Math.round((metrics.correctChars / metrics.totalKeystrokes) * 100);

  const rawWpm = elapsedTime === 0 
    ? 0 
    : Math.round((metrics.totalKeystrokes / 5) / (elapsedTime / 60));

  const wpm = elapsedTime === 0 
    ? 0 
    : Math.round(((metrics.totalKeystrokes / 5) - (metrics.incorrectChars / 5)) / (elapsedTime / 60));

  const getComboColor = (combo: number) => {
    if (combo >= 100) return "#ffd700"; // Gold
    if (combo >= 80) return "#ff1493"; // Hot Pink
    if (combo >= 60) return "#ff4500"; // Orange Red
    if (combo >= 40) return "#9370db"; // Medium Purple
    if (combo >= 20) return "#8b008b"; // Dark Magenta
    if (combo >= 10) return "#00d4ff"; // Cyan
    return "#ffffff"; // White
  };

  const checkComboMilestone = (newCombo: number) => {
    const milestones = [10, 20, 40, 60, 80, 100];
    const milestone = milestones.find(m => newCombo === m);
    if (milestone) {
      setComboMilestone(milestone);
      playSound(1200, 0.3, "sine");
      setTimeout(() => setComboMilestone(null), 2000);
    }
  };

  const averageWpm =
    testHistory.length > 0
      ? Math.round(testHistory.reduce((sum, test) => sum + test.wpm, 0) / testHistory.length)
      : 0;

  const bestWpm = testHistory.length > 0 ? Math.max(...testHistory.map((t) => t.wpm)) : 0;

  // Calculate visible text range for smooth scrolling
  const charsPerLine = 60; // approximate characters per line
  const currentPosition = userInput.length;
  const currentLine = Math.floor(currentPosition / charsPerLine);
  
  // Show 3 lines at a time, shift when current line exceeds line 2
  if (currentLine > 1 && visibleStartIndex < currentLine - 1) {
    setVisibleStartIndex(currentLine - 1);
  }

  const startChar = visibleStartIndex * charsPerLine;
  const endChar = startChar + (charsPerLine * 3); // show 3 lines
  const visibleText = targetText.slice(startChar, endChar);

  return (
    <div className="app">
      <div className="scanlines"></div>
      <div className="grid-bg"></div>
      
      {comboMilestone && (
        <div className="milestone-animation" style={{ color: getComboColor(comboMilestone) }}>
          <div className="milestone-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
          <div className="milestone-text">
            <div className="milestone-title">COMBO MILESTONE</div>
            <div className="milestone-value">×{comboMilestone}</div>
          </div>
          <div className="milestone-particles">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="particle"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-100px)`,
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
      
      <header className="navbar">
        <div className="logo">
          <div className="logo-bracket">[</div>
          <span className="logo-text">TYPE<span className="logo-finale" data-text="TRON">TRON</span><span className="logo-text">TEST</span></span>
          <div className="logo-bracket">]</div>
        </div>

        <nav className="nav-menu">
          <button className="nav-btn" onClick={() => setShowStats(!showStats)}>
            <span className="btn-label">STATS</span>
            <span className="btn-underline"></span>
          </button>
          <button className="nav-btn" onClick={() => setShowSettings(!showSettings)}>
            <span className="btn-label">CONFIG</span>
            <span className="btn-underline"></span>
          </button>
        </nav>
      </header>

      <main className="main">
        {showStats && (
          <div className="modal-overlay" onClick={() => setShowStats(false)}>
            <div className="modal stats-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">PERFORMANCE STATS</h2>
                <button className="close-btn" onClick={() => setShowStats(false)}>
                  <span className="close-x">×</span>
                </button>
              </div>

              {(() => {
                const filtered = testHistory.filter(t => {
                  const modeMatch = statsFilterMode === "all" || t.mode === statsFilterMode;
                  const durationMatch = statsFilterDuration === "all" || t.selectedDuration === statsFilterDuration;
                  return modeMatch && durationMatch;
                });
                
                const sorted = [...filtered].sort((a, b) => b.wpm - a.wpm);
                
                return filtered.length >= 3 && (
                  <div className="podium-section">
                    <h3 className="section-title">TOP 3 CHAMPIONS</h3>
                    <div className="podium">
                      <div className="podium-place second">
                        <div className="podium-icon">{sorted[1].profileIcon}</div>
                        <div className="podium-wpm">{sorted[1].wpm} <span style={{fontSize:'14px'}}>WPM</span></div>
                        <div className="podium-name">{sorted[1].playerName}</div>
                        <div className="podium-rank">2ND</div>
                        <div className="podium-bar silver"></div>
                      </div>
                      <div className="podium-place first">
                        <div className="podium-trophy">👑</div>
                        <div className="podium-icon">{sorted[0].profileIcon}</div>
                        <div className="podium-wpm">{sorted[0].wpm} <span style={{fontSize:'14px'}}>WPM</span></div>
                        <div className="podium-name">{sorted[0].playerName}</div>
                        <div className="podium-rank">1ST</div>
                        <div className="podium-bar gold"></div>
                      </div>
                      <div className="podium-place third">
                        <div className="podium-icon">{sorted[2].profileIcon}</div>
                        <div className="podium-wpm">{sorted[2].wpm} <span style={{fontSize:'14px'}}>WPM</span></div>
                        <div className="podium-name">{sorted[2].playerName}</div>
                        <div className="podium-rank">3RD</div>
                        <div className="podium-bar bronze"></div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{averageWpm}</div>
                  <div className="stat-label">AVG WPM</div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width: bestWpm > 0 ? `${(averageWpm / bestWpm) * 100}%` : '0%' }}></div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{testHistory.length}</div>
                  <div className="stat-label">TESTS</div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width: `${Math.min((testHistory.length / 20) * 100, 100)}%` }}></div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {testHistory.length > 0 
                      ? Math.round(testHistory.reduce((sum, t) => sum + t.accuracy, 0) / testHistory.length)
                      : 0}%
                  </div>
                  <div className="stat-label">AVG ACCURACY</div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ 
                      width: testHistory.length > 0 
                        ? `${testHistory.reduce((sum, t) => sum + t.accuracy, 0) / testHistory.length}%` 
                        : '0%' 
                    }}></div>
                  </div>
                </div>
              </div>

              <div className="history-section">
                <div className="history-filters">
                  <div className="filter-group">
                    <span className="filter-label">LANGUAGE</span>
                    <div className="filter-pills">
                      {["all", "javascript", "python", "java", "cpp", "php", "text"].map(m => (
                        <button
                          key={m}
                          className={`filter-pill ${statsFilterMode === m ? "active" : ""}`}
                          onClick={() => setStatsFilterMode(m)}
                        >
                          {m === "all" ? "ALL" : m === "cpp" ? "C++" : m.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="filter-group">
                    <span className="filter-label">DURATION</span>
                    <div className="filter-pills">
                      {(["all", 15, 30, 60, 120] as const).map(d => (
                        <button
                          key={d}
                          className={`filter-pill ${statsFilterDuration === d ? "active" : ""}`}
                          onClick={() => setStatsFilterDuration(d)}
                        >
                          {d === "all" ? "ALL" : `${d}s`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="section-title">RECENT MATCHES</h3>
                {(() => {
                  const filtered = testHistory.filter(t => {
                    const modeMatch = statsFilterMode === "all" || t.mode === statsFilterMode;
                    const durationMatch = statsFilterDuration === "all" || t.selectedDuration === statsFilterDuration;
                    return modeMatch && durationMatch;
                  });

                  return filtered.length === 0 ? (
                    <p className="empty-state">No matches found for the selected filters.</p>
                  ) : (
                    <div className="history-list">
                      {filtered.map((test, index) => (
                        <div 
                          key={index} 
                          className="history-item"
                          onClick={() => {
                            setSelectedGame(test);
                            setShowGameDetail(true);
                          }}
                        >
                          <div className="history-rank">#{index + 1}</div>
                          <div className="history-icon">{test.profileIcon}</div>
                          <div className="history-name">{test.playerName}</div>
                          <div className="history-wpm">{test.wpm} WPM</div>
                          <div className="history-details">
                            <span className="history-accuracy">{test.accuracy}%</span>
                            <span className="history-badge mode-badge">
                              {test.mode === "javascript" ? "JS" : 
                               test.mode === "python" ? "PY" : 
                               test.mode === "cpp" ? "C++" : 
                               test.mode === "java" ? "JAVA" :
                               test.mode === "php" ? "PHP" :
                               test.mode === "text" ? "TXT" : "—"}
                            </span>
                            <span className="history-badge duration-badge">{test.selectedDuration ?? test.duration}s</span>
                            <span className="history-date">{new Date(test.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {showGameDetail && selectedGame && (
          <div className="modal-overlay" onClick={() => setShowGameDetail(false)}>
            <div className="modal game-detail-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">GAME DETAILS</h2>
                <button className="close-btn" onClick={() => setShowGameDetail(false)}>
                  <span className="close-x">×</span>
                </button>
              </div>
              <div className="game-detail-content">
                <div className="detail-player-info">
                  <div className="detail-player-icon">{selectedGame.profileIcon}</div>
                  <div className="detail-player-name">{selectedGame.playerName}</div>
                </div>

                <div className="detail-stats-grid">
                  <div className="detail-stat-card">
                    <div className="detail-stat-label">SPEED</div>
                    <div className="detail-stat-value">{selectedGame.wpm} WPM</div>
                  </div>
                  <div className="detail-stat-card">
                    <div className="detail-stat-label">RAW WPM</div>
                    <div className="detail-stat-value">{selectedGame.rawWpm}</div>
                  </div>
                  <div className="detail-stat-card">
                    <div className="detail-stat-label">ACCURACY</div>
                    <div className="detail-stat-value">{selectedGame.accuracy}%</div>
                  </div>
                  <div className="detail-stat-card">
                    <div className="detail-stat-label">ERRORS</div>
                    <div className="detail-stat-value">{selectedGame.errors}</div>
                  </div>
                </div>

                <div className="detail-info-grid">
                  <div className="detail-info-item">
                    <span className="detail-info-label">MODE</span>
                    <span className="detail-info-value">
                      {selectedGame.mode === "javascript" ? "JavaScript" : 
                       selectedGame.mode === "python" ? "Python" : 
                       selectedGame.mode === "cpp" ? "C++" : 
                       selectedGame.mode === "java" ? "Java" :
                       selectedGame.mode === "php" ? "PHP" :
                       selectedGame.mode === "text" ? "Text" : "—"}
                    </span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">DURATION</span>
                    <span className="detail-info-value">{selectedGame.selectedDuration ?? selectedGame.duration}s</span>
                  </div>
                  <div className="detail-info-item">
                    <span className="detail-info-label">DATE</span>
                    <span className="detail-info-value">{new Date(selectedGame.date).toLocaleString()}</span>
                  </div>
                </div>

                {selectedGame.wpmHistory && selectedGame.wpmHistory.length > 0 && (
                  <WpmGraph data={selectedGame.wpmHistory} duration={selectedGame.selectedDuration ?? selectedGame.duration} />
                )}

                <div className="detail-actions">
                  <button className="game-btn primary" onClick={() => setShowGameDetail(false)}>
                    <span className="btn-text">CLOSE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showSettings && (
          <div className="modal-overlay" onClick={() => setShowSettings(false)}>
            <div className="modal settings-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">CONFIGURATION</h2>
                <button className="close-btn" onClick={() => setShowSettings(false)}>
                  <span className="close-x">×</span>
                </button>
              </div>
              <div className="settings-section">
                <div className="setting-group">
                  <label className="setting-label">MODE</label>
                  <div className="button-group mode-grid">
                    <button
                      className={`config-btn ${mode === "javascript" ? "active" : ""}`}
                      onClick={() => {
                        setMode("javascript");
                        localStorage.setItem("mode", "javascript");
                        if (!isStarted) {
                          setTargetText(generateCode("javascript", 15));
                        }
                      }}
                    >
                      JAVASCRIPT
                    </button>
                    <button
                      className={`config-btn ${mode === "python" ? "active" : ""}`}
                      onClick={() => {
                        setMode("python");
                        localStorage.setItem("mode", "python");
                        if (!isStarted) {
                          setTargetText(generateCode("python", 15));
                        }
                      }}
                    >
                      PYTHON
                    </button>
                    <button
                      className={`config-btn ${mode === "java" ? "active" : ""}`}
                      onClick={() => {
                        setMode("java");
                        localStorage.setItem("mode", "java");
                        if (!isStarted) {
                          setTargetText(generateCode("java", 15));
                        }
                      }}
                    >
                      JAVA
                    </button>
                    <button
                      className={`config-btn ${mode === "cpp" ? "active" : ""}`}
                      onClick={() => {
                        setMode("cpp");
                        localStorage.setItem("mode", "cpp");
                        if (!isStarted) {
                          setTargetText(generateCode("cpp", 15));
                        }
                      }}
                    >
                      C++
                    </button>
                    <button
                      className={`config-btn ${mode === "php" ? "active" : ""}`}
                      onClick={() => {
                        setMode("php");
                        localStorage.setItem("mode", "php");
                        if (!isStarted) {
                          setTargetText(generateCode("php", 15));
                        }
                      }}
                    >
                      PHP
                    </button>
                    <button
                      className={`config-btn ${mode === "text" ? "active" : ""}`}
                      onClick={() => {
                        setMode("text");
                        localStorage.setItem("mode", "text");
                        if (!isStarted) {
                          setTargetText(generateText(difficulty, 200));
                        }
                      }}
                    >
                      TEXT
                    </button>
                  </div>
                </div>
                {mode === "text" && (
                  <div className="setting-group">
                    <label className="setting-label">DIFFICULTY LEVEL</label>
                    <div className="button-group">
                    <button
                      className={`config-btn ${difficulty === "easy" ? "active" : ""}`}
                      onClick={() => {
                        setDifficulty("easy");
                        localStorage.setItem("difficulty", "easy");
                        if (!isStarted) {
                          setTargetText(getRandomTextForDifficulty("easy"));
                        }
                      }}
                    >
                      EASY
                    </button>
                    <button
                      className={`config-btn ${difficulty === "medium" ? "active" : ""}`}
                      onClick={() => {
                        setDifficulty("medium");
                        localStorage.setItem("difficulty", "medium");
                        if (!isStarted) {
                          setTargetText(getRandomTextForDifficulty("medium"));
                        }
                      }}
                    >
                      MEDIUM
                    </button>
                    <button
                      className={`config-btn ${difficulty === "hard" ? "active" : ""}`}
                      onClick={() => {
                        setDifficulty("hard");
                        localStorage.setItem("difficulty", "hard");
                        if (!isStarted) {
                          setTargetText(getRandomTextForDifficulty("hard"));
                        }
                      }}
                    >
                      HARD
                    </button>
                  </div>
                </div>
                )}
                <div className="setting-group">
                  <label className="setting-label">AUDIO FEEDBACK</label>
                  <div className="button-group">
                    <button
                      className={`config-btn ${soundEnabled ? "active" : ""}`}
                      onClick={() => {
                        setSoundEnabled(true);
                        localStorage.setItem("soundEnabled", "true");
                      playSound(600, 0.1, "square");
                      }}
                    >
                      ENABLED
                    </button>
                    <button
                      className={`config-btn ${!soundEnabled ? "active" : ""}`}
                      onClick={() => {
                        setSoundEnabled(false);
                        localStorage.setItem("soundEnabled", "false");
                      }}
                    >
                      DISABLED
                    </button>
                  </div>
                </div>
                <div className="setting-group">
                  <label className="setting-label">DATA MANAGEMENT</label>
                  <button
                    className="danger-btn"
                    onClick={() => setShowClearConfirm(true)}
                  >
                    CLEAR ALL STATS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showClearConfirm && (
          <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
            <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">CONFIRM ACTION</h2>
                <button className="close-btn" onClick={() => setShowClearConfirm(false)}>
                  <span className="close-x">×</span>
                </button>
              </div>
              <div className="confirm-content">
                <p className="confirm-text">
                  Clear all saved statistics? This action cannot be undone.
                </p>
                <div className="confirm-buttons">
                  <button
                    className="game-btn secondary"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    <span className="btn-text">CANCEL</span>
                  </button>
                  <button
                    className="game-btn danger"
                    onClick={() => {
                      setTestHistory([]);
                      localStorage.removeItem("typingTestHistory");
                      playSound(300, 0.2, "sawtooth");
                      setShowClearConfirm(false);
                      setShowSettings(false);
                    }}
                  >
                    <span className="btn-text">CLEAR DATA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showGraphResults && pendingResult && (
          <div className="modal-overlay">
            <div className="modal graph-results-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">PERFORMANCE ANALYSIS</h2>
              </div>
              <div className="graph-results-content">
                <div className="results-summary">
                  <div className="summary-stat">
                    <div className="summary-label">FINAL SPEED</div>
                    <div className="summary-value">{pendingResult.wpm} WPM</div>
                  </div>
                  <div className="summary-stat">
                    <div className="summary-label">ACCURACY</div>
                    <div className="summary-value">{pendingResult.accuracy}%</div>
                  </div>
                  <div className="summary-stat">
                    <div className="summary-label">ERRORS</div>
                    <div className="summary-value">{pendingResult.errors}</div>
                  </div>
                  <div className="summary-stat">
                    <div className="summary-label">MAX COMBO</div>
                    <div className="summary-value">{maxCombo}</div>
                  </div>
                </div>

                <WpmGraph data={wpmHistory} duration={elapsedTime} />

                <div className="graph-actions">
                  <button className="game-btn primary" onClick={continueToNameInput}>
                    <span className="btn-text">CONTINUE</span>
                  </button>
                  <button className="game-btn danger" onClick={skipSave}>
                    <span className="btn-text">SKIP SAVE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showNameInput && (
          <div className="modal-overlay">
            <div className="modal name-input-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">SAVE YOUR SCORE</h2>
              </div>
              <div className="name-input-content">
                <p className="input-label">Enter your name</p>
                <input
                  type="text"
                  className="name-input"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Player name..."
                  maxLength={20}
                  autoFocus
                />
                <p className="input-label">Select your profile icon</p>
                <div className="icon-grid">
                  {profileIcons.map((icon) => (
                    <button
                      key={icon}
                      className={`icon-btn ${selectedIcon === icon ? "active" : ""}`}
                      onClick={() => setSelectedIcon(icon)}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                <div className="input-buttons">
                  <button className="game-btn danger" onClick={skipSave}>
                    <span className="btn-text">SKIP</span>
                  </button>
                  <button
                    className="game-btn primary"
                    onClick={saveResult}
                    disabled={!playerName.trim()}
                  >
                    <span className="btn-text">SAVE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="game-area">
          <div className="duration-selector">
            <div className="selector-label">RACE DURATION</div>
            <div className="duration-buttons">
              <button
                className={`duration-btn ${selectedDuration === 15 ? "active" : ""}`}
                disabled={isStarted && !isFinished}
                onClick={() => {
                  setSelectedDuration(15);
                  setTimeLeft(15);
                }}
              >
                15s
              </button>
              <button
                className={`duration-btn ${selectedDuration === 30 ? "active" : ""}`}
                disabled={isStarted && !isFinished}
                onClick={() => {
                  setSelectedDuration(30);
                  setTimeLeft(30);
                }}
              >
                30s
              </button>
              <button
                className={`duration-btn ${selectedDuration === 60 ? "active" : ""}`}
                disabled={isStarted && !isFinished}
                onClick={() => {
                  setSelectedDuration(60);
                  setTimeLeft(60);
                }}
              >
                60s
              </button>
              <button
                className={`duration-btn ${selectedDuration === 120 ? "active" : ""}`}
                disabled={isStarted && !isFinished}
                onClick={() => {
                  setSelectedDuration(120);
                  setTimeLeft(120);
                }}
              >
                120s
              </button>
            </div>
          </div>

          <div className="hud">
            <div className="hud-item">
              <div className="hud-label">TIME</div>
              <div className="hud-value">{timeLeft}s</div>
            </div>
            <div className="hud-item highlight">
              <div className="hud-label">SPEED</div>
              <div className="hud-value">{wpm}</div>
            </div>
            <div className="hud-item">
              <div className="hud-label">ACCURACY</div>
              <div className="hud-value">{accuracy}%</div>
            </div>
            <div className="hud-item">
              <div className="hud-label">ERRORS</div>
              <div className="hud-value">{metrics.incorrectChars}</div>
            </div>
          </div>

          <div className="typing-area" onClick={() => inputRef.current?.focus()}>
            {!isStarted && !isFinished && (
              <div className="ready-screen">
                <div className="ready-text">READY TO HIT THE GRID?</div>
                <div className="ready-subtitle">Press START or hit the enter key to begin</div>
              </div>
            )}
            <div className="text-display">
              {visibleText.split("").map((character, index) => {
                const actualIndex = startChar + index;
                const typedCharacter = userInput[actualIndex];
                let className = "char";

                if (typedCharacter === undefined) {
                  className = "char pending";
                } else if (typedCharacter === character) {
                  className = "char correct";
                } else {
                  className = "char incorrect";
                }

                if (actualIndex === userInput.length && isStarted) {
                  className += " current";
                }

                return (
                  <span key={actualIndex} className={className}>
                    {character}
                  </span>
                );
              })}
            </div>

            <input
              ref={inputRef}
              type="text"
              className="hidden-input"
              value={userInput}
              maxLength={targetText.length}
              onChange={(event) => {
                const value = event.target.value;
                const prevLength = userInput.length;
                const newLength = value.length;

                setMetrics(prev => ({
                  ...prev,
                  totalKeystrokes: prev.totalKeystrokes + 1,
                }));

                if (newLength > prevLength) {
                  const lastChar = value[newLength - 1];
                  const expectedChar = targetText[newLength - 1];

                  if (lastChar === expectedChar) {
                    const newCombo = combo + 1;
                    setCombo(newCombo);
                    if (newCombo > maxCombo) {
                      setMaxCombo(newCombo);
                    }
                    checkComboMilestone(newCombo);
                    setMetrics(prev => ({
                      ...prev,
                      correctChars: prev.correctChars + 1,
                    }));
                    playSound(400 + Math.min(newCombo * 10, 400), 0.03, "square");
                  } else {
                    setCombo(0);
                    setMetrics(prev => ({
                      ...prev,
                      incorrectChars: prev.incorrectChars + 1,
                    }));
                    playSound(150, 0.08, "sawtooth");
                  }
                }

                setUserInput(value);

                if (value === targetText) {
                  setIsStarted(false);
                  setIsFinished(true);
                  playSound(800, 0.4, "triangle");
                }
              }}
              autoFocus
              disabled={!isStarted || isFinished}
            />

            {isFinished && (
              <div className="results">
                <div className="results-header">
                  <div className="results-title">RACE COMPLETE</div>
                  {wpm > bestWpm && testHistory.length > 0 && (
                    <div className="new-record">NEW RECORD!</div>
                  )}
                </div>
                <div className="results-grid">
                  <div className="result-card">
                    <div className="result-label">WPM</div>
                    <div className="result-value primary">{wpm}</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">ACCURACY</div>
                    <div className="result-value">{accuracy}%</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">ERRORS</div>
                    <div className="result-value">{metrics.incorrectChars}</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">TIME</div>
                    <div className="result-value">{elapsedTime}s</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">MAX COMBO</div>
                    <div className="result-value">{maxCombo}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="control-panel">
            <button
              className={`game-btn primary ${isStarted && !isFinished ? "disabled" : ""}`}
              onClick={isFinished || !isStarted ? startTest : undefined}
              disabled={isStarted && !isFinished}
            >
              <span className="btn-text">
                {isFinished ? "RACE AGAIN" : isStarted ? "RACING..." : "START RACE"}
              </span>
              <span className="btn-glow"></span>
            </button>
            {isStarted && !isFinished && (
              <button className="game-btn secondary" onClick={resetTest}>
                <span className="btn-text">RESTART</span>
                <span className="btn-glow"></span>
              </button>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-text">TYPETRONTEST</div>
        <div className="footer-version">v1.0.0</div>
      </footer>
    </div>
  );
}

export default App;
