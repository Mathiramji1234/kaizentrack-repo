type ProgressRingProps = {
  percentage: number;
};

const ProgressRing = ({
  percentage,
}: ProgressRingProps) => {
  const radius = 70;
  const stroke = 12;

  const normalizedRadius =
    radius - stroke * 0.5;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (percentage / 100) *
      circumference;

  return (
    <div className="flex justify-center items-center">
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          stroke="#1e293b"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="#6366f1"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={
            strokeDashoffset
          }
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />

        <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            >
            {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default ProgressRing;