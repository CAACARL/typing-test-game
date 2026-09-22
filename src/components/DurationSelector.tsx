interface DurationSelectorProps {
  selectedDuration: number;
  isStarted: boolean;
  isFinished: boolean;
  onSelectDuration: (duration: number) => void;
}

export const DurationSelector = ({ 
  selectedDuration, 
  isStarted, 
  isFinished, 
  onSelectDuration 
}: DurationSelectorProps) => {
  const durations = [15, 30, 60, 120];

  return (
    <div className="duration-selector">
      <div className="selector-label">RACE DURATION</div>
      <div className="duration-buttons">
        {durations.map(duration => (
          <button
            key={duration}
            className={`duration-btn ${selectedDuration === duration ? "active" : ""}`}
            disabled={isStarted && !isFinished}
            onClick={() => onSelectDuration(duration)}
          >
            {duration}s
          </button>
        ))}
      </div>
    </div>
  );
};
