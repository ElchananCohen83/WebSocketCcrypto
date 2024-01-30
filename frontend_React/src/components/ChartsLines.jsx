import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import CircularWithValueLabel from './CircularWithLabel.jsx';

const BasicLineChart = ({ cryptoData }) => {
  const [averagePriceArray, setAveragePriceArray] = useState([]);

  useEffect(() => {
    const averagePrice = parseFloat(cryptoData.w);

    setAveragePriceArray((prevArray) => {
      const newArray = [...prevArray, averagePrice];

      if (newArray.length === 78) {
        return [parseFloat(cryptoData.w)];
      }

      return newArray;
    });
  }, [cryptoData]);

  return (
    <div style={{ position: 'relative', width: '500px', height: '300px' }}>
      <LineChart
        sx={{
          '& .MuiLineElement-root': {
            strokeWidth: 2,
            stroke: "#31E599",
            markers: "[]"
          },
        }}
        xAxis={[
          {
            data: Array.from({ length: 100 }, (_, index) => index + 1),
            scaleType: 'time',
          },
        ]}
        series={[
          {
            data: averagePriceArray,
            showMark: false,
          },
        ]}
        width={500}
        height={300}
      />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <CircularWithValueLabel color="#31E599" seconds={30} circularProgress={340}/>
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '70%', transform: 'translate(-50%, -50%)' }}>
        <CircularWithValueLabel color="#DD4830" seconds={60} circularProgress={170} />
      </div>

    </div>
  );
};

export default BasicLineChart;
