import { WpmGraph } from '../WpmGraph';
import type { TestResult } from '../../types';

interface GameDetailModalProps {
  game: TestResult;
  onClose: () => void;
}

export const GameDetailModal = ({ game, onClose }: GameDetailModalProps) => {
  const getModeLabel = (mode: string) => {
    const labels: Record<string, string> = {
      javascript: "JavaScript",
      python: "Python",
      cpp: "C++",
      java: "Java",
      php: "PHP",
      text: "Text"
    };
    return labels[mode] || "—";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal game-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">GAME DETAILS</h2>
          <button className="close-btn" onClick={onClose}>
            <span className="close-x">×</span>
          </button>
        </div>
        <div className="game-detail-content">
          <div className="detail-player-info">
            <div className="detail-player-icon">{game.profileIcon}</div>
            <div className="detail-player-name">{game.playerName}</div>
          </div>

          <div className="detail-stats-grid">
            <div className="detail-stat-card">
              <div className="detail-stat-label">SPEED</div>
              <div className="detail-stat-value">{game.wpm} WPM</div>
            </div>
            <div className="detail-stat-card">
              <div className="detail-stat-label">RAW WPM</div>
              <div className="detail-stat-value">{game.rawWpm}</div>
            </div>
            <div className="detail-stat-card">
              <div className="detail-stat-label">ACCURACY</div>
              <div className="detail-stat-value">{game.accuracy}%</div>
            </div>
            <div className="detail-stat-card">
              <div className="detail-stat-label">ERRORS</div>
              <div className="detail-stat-value">{game.errors}</div>
            </div>
          </div>

          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-info-label">MODE</span>
              <span className="detail-info-value">{getModeLabel(game.mode)}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">DURATION</span>
              <span className="detail-info-value">{game.selectedDuration ?? game.duration}s</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">DATE</span>
              <span className="detail-info-value">{new Date(game.date).toLocaleString()}</span>
            </div>
          </div>

          {game.wpmHistory && game.wpmHistory.length > 0 && (
            <WpmGraph data={game.wpmHistory} duration={game.selectedDuration ?? game.duration} />
          )}

          <div className="detail-actions">
            <button className="game-btn primary" onClick={onClose}>
              <span className="btn-text">CLOSE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
