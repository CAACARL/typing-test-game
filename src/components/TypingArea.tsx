import { useRef, useEffect } from 'react';

interface TypingAreaProps {
  isStarted: boolean;
  isFinished: boolean;
  targetText: string;
  userInput: string;
  visibleStartIndex: number;
  onInputChange: (value: string) => void;
  maxCombo: number;
  wpm: number;
  accuracy: number;
  errors: number;
  elapsedTime: number;
  bestWpm: number;
}

export const TypingArea = ({
  isStarted,
  isFinished,
  targetText,
  userInput,
  visibleStartIndex,
  onInputChange,
  maxCombo,
  wpm,
  accuracy,
  errors,
  elapsedTime,
  bestWpm,
}: TypingAreaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when test starts
  useEffect(() => {
    if (isStarted && !isFinished) {
      inputRef.current?.focus();
    }
  }, [isStarted, isFinished]);

  const charsPerLine = 60;
  const startChar = visibleStartIndex * charsPerLine;
  const endChar = startChar + (charsPerLine * 3);
  const visibleText = targetText.slice(startChar, endChar);

  return (
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
        onChange={(e) => onInputChange(e.target.value)}
        autoFocus
        disabled={!isStarted || isFinished}
      />

      {isFinished && (
        <div className="results">
          <div className="results-header">
            <div className="results-title">RACE COMPLETE</div>
            {wpm > bestWpm && bestWpm > 0 && (
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
              <div className="result-value">{errors}</div>
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
  );
};
