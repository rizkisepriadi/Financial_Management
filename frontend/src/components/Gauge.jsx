import GaugeChart from "react-gauge-chart";

// eslint-disable-next-line react/prop-types
const Gauge = ({ value }) => {
  const maxValue = 20000;
  const percent = value / maxValue;

  return ( 
    <div className="flex flex-col items-center w-[162px]">
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={1}
        percent={percent}
        colors={["#299D91", "#E5E5E5"]}
        textColor="transparent"
        needleColor="#00C9A7"
        arcsLength={[percent, 1 - percent]} // Adjust the length of color arcs
      />
      <div className="flex justify-evenly space-x-3  w-full text-gray-500">
        <span>$0</span>
        <p className="text-base font-bold">{value / 1000}K</p>
        <span>$20k</span>
      </div>
      <div className="text-center mt-4">
        <p className="text-accent font-medium text-xs">Target vs Achievement</p>
      </div>
    </div>
  );
};

export default Gauge;
