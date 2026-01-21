const ProgressBar = ({ value, gradient }) => {
  return (
    <div className="space-y-1">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${value}%`,
            background: gradient,
          }}
        />
      </div>

      <div className="flex justify-between text-[12px] lg:text-[17px] sm:text-xs">
        <span className="text-red-500 font-medium">{value}%</span>
        <span className="text-purple-500 font-medium">100%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
