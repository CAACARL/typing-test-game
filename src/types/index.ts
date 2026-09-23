export interface TestResult {
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

export interface TypeMetrics {
  correctChars: number;
  incorrectChars: number;
  totalKeystrokes: number;
}

export interface WpmDataPoint {
  time: number;
  wpm: number;
}
