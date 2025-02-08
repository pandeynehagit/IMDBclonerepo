const RatingCircle = ({ rating }) => {
  const radius = 20; // Circle size
  const circumference = 2 * Math.PI * radius;
  const percentage = (rating / 10) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      className="absolute top-2 left-0"
    >
      {/* Background Circle */}
      <circle
        cx="25"
        cy="25"
        r={radius}
        strokeWidth="5"
        fill="none"
        stroke="#e0e0e0"
      />

      {/* Animated Progress Circle */}
      <circle
        cx="25"
        cy="25"
        r={radius}
        strokeWidth="5"
        fill="black"
        stroke={percentage > 0 ? "green" : "red"}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500 ease-in-out"
      />

      {/* Rating Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="12"
        fill="red"
        fontWeight="bold"
      >
        {percentage.toFixed(0)}%
      </text>
    </svg>
  );
};
export default RatingCircle;
