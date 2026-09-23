interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
}

export const ConfirmModal = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isDanger = false,
}: ConfirmModalProps) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="close-btn" onClick={onCancel}>
            <span className="close-x">×</span>
          </button>
        </div>
        <div className="confirm-content">
          <p className="confirm-text">{message}</p>
          <div className="confirm-buttons">
            <button className="game-btn secondary" onClick={onCancel}>
              <span className="btn-text">{cancelText}</span>
            </button>
            <button 
              className={`game-btn ${isDanger ? 'danger' : 'primary'}`} 
              onClick={onConfirm}
            >
              <span className="btn-text">{confirmText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
