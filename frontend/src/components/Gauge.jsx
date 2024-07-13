import GaugeChart from "react-gauge-chart";

// eslint-disable-next-line react/prop-types
const Gauge = ({ value, max }) => {
  const maxValue = max;
  const validValue = Math.min(value, maxValue); // Ensure value doesn't exceed max
  const percent = validValue / maxValue;

  return (
    <div className="flex flex-col items-center w-[162px]">
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={30} // Adjusted to have more levels
        percent={percent}
        colors={["#299D91", "#E5E5E5"]}
        textColor="transparent"
        needleColor="#00C9A7"
        arcPadding={0.10} // Add padding between arcs if needed
        arcsLength={[percent, 1 - percent]} // Adjust the length of color arcs
      />
      <div className="flex justify-evenly space-x-3 w-full text-gray-500">
        <span>$0</span>
        <p className="text-base font-bold">{value / 1000}K</p>
        <span>{maxValue / 1000}K</span>
      </div>
      <div className="text-center mt-4">
        <p className="text-accent font-medium text-xs">Target vs Achievement</p>
      </div>
    </div>
  );
};

export default Gauge;
