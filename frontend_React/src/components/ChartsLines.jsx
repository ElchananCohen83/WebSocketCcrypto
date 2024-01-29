import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const BasicLineChart = ({ cryptoData }) => {
  const [averagePriceArray, setAveragePriceArray] = useState([]);

  useEffect(() => {
    const averagePrice = parseFloat(cryptoData.w);

    setAveragePriceArray((prevArray) => {
      const newArray = [...prevArray, averagePrice];

      if (newArray.length === 62) {
        return [parseFloat(cryptoData.w)];
      }

      return newArray;
    });
  }, [cryptoData]);

  return (
      <LineChart
        // sx={{
        //   '& .MuiLineElement-root': {
        //     // strokeDasharray: '10 5',
        //     strokeWidth: 4,
        //     stroke: "red",
        //     markers: "[]"
        //   },
        //   '& .MuiLineChart-dot': {
        //     display: 'none', // hide the dots/circles
        //   },
        //   '& .MuiLineChart-series-0 .MuiLineElement-root': {
        //     fill: 'none', // hide the points on stroke
        //   },
        // }}

        // bottomAxis={{
        //   disableLine: true,
        //   disableTicks: true,
        //   label: "",
        //   tickSize: NaN,
        // }}
        xAxis={[
          {
            data: Array.from({ length: 80 }, (_, index) => index + 1),
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