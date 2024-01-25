import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const BasicLineChart = ({ cryptoData }) => {

  const timestamp = cryptoData.T; 

   const averagePrice = parseFloat(cryptoData.w);

  return (
    <LineChart
    xAxis={[
      {
        data: [timestamp],
        scaleType: 'time', // Set the scaleType for the timestamp
      },
    ]}
      series={[
        {
          data: [averagePrice],  // Assuming w is the average price
        },
      ]}
      width={500}
      height={300}
    />
  );
};

export default BasicLineChart;


{/*
Event Type: ${cryptoData.e}
Event Time: ${cryptoData.E}
Symbol: ${cryptoData.s}
Interval: ${cryptoData.i}
Average Price: ${cryptoData.w}  //39927.51049845
Timestamp: ${cryptoData.T} 
*/}