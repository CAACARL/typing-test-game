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
  easy: [".", ".", ".", ".", "."],
  medium: [".", ".", ",", ",", ";"],
  hard: [".", ",", ";", ":", "—", "...", "!", "?", "()", "\"\""]
};

export const generateText = (difficulty: string, wordCount: number = 200): string => {
  const sentences: string[] = [];
  let currentWordCount = 0;
  
  const punct = punctuation[difficulty as keyof typeof punctuation];
  
  while (currentWordCount < wordCount) {
    const sentenceType = Math.random();
    let sentence = "";
    let sentenceWords = 0;
    
    if (sentenceType < 0.4) {
      const subject = wordPools.subjects[Math.floor(Math.random() * wordPools.subjects.length)];
      const verb = wordPools.verbs[Math.floor(Math.random() * wordPools.verbs.length)];
      const obj = wordPools.objects[Math.floor(Math.random() * wordPools.objects.length)];
      sentence = `${subject} ${verb} ${obj}`;
      sentenceWords = 3;
    } else if (sentenceType < 0.7) {
      const adj = wordPools.adjectives[Math.floor(Math.random() * wordPools.adjectives.length)];
      const subject = wordPools.subjects[Math.floor(Math.random() * wordPools.subjects.length)];
      const adverb = wordPools.adverbs[Math.floor(Math.random() * wordPools.adverbs.length)];
      const verb = wordPools.verbs[Math.floor(Math.random() * wordPools.verbs.length)];
      const obj = wordPools.objects[Math.floor(Math.random() * wordPools.objects.length)];
      sentence = `${adj} ${subject} ${adverb} ${verb} ${obj}`;
      sentenceWords = 5;
    } else {
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
    
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    
    if (difficulty === "easy") {
      sentence += ".";
    } else if (difficulty === "medium") {
      const p = punct[Math.floor(Math.random() * punct.length)];
      if (p === ",") {
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
