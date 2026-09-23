interface MilestoneAnimationProps {
  milestone: number;
  color: string;
}

export const MilestoneAnimation = ({ milestone, color }: MilestoneAnimationProps) => {
  return (
    <div className="milestone-animation" style={{ color }}>
      <div className="milestone-rings">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>
      <div className="milestone-text">
        <div className="milestone-title">COMBO MILESTONE</div>
        <div className="milestone-value">×{milestone}</div>
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
  );
};
