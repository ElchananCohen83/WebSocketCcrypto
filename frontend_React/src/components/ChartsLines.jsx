import React, { useEffect, useState, useRef } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const BasicLineChart = ({ cryptoData, onLastPointHeightChange }) => {
  const [averagePriceArray, setAveragePriceArray] = useState([]);
  const lineChartRef = useRef(null);

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

  useEffect(() => {
    const chartElement = lineChartRef.current;

    if (chartElement) {
      setTimeout(() => {
        const lastPoint = chartElement.querySelector('.MuiMarkElement-root:last-child');

        if (lastPoint) {
          const rect = lastPoint.getBoundingClientRect();
          onLastPointHeightChange(rect.top); // Invoke the callback with the height value
        }
      }, 0);
    }
  }, [averagePriceArray, lineChartRef, onLastPointHeightChange]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>

      <LineChart
        ref={lineChartRef}
        sx={{
          // '& .MuiLineElement-root': {
          //   strokeWidth: 2,
          //   stroke: "#31E599",
          //   markers: "[]",
          // },
          '& .MuiMarkElement-root': {
            opacity: 0
          }
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
          },
        ]}
      />
    </div>
  );
};

export default BasicLineChart;
