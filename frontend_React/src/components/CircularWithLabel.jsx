import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const MIN = 0;
const MAX = 100;

function CircularProgressWithLabel({ value, color, circularProgress }) {
  const normalise = (value) => ((value - MIN) * circularProgress) / (MAX - MIN);

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={normalise(value)}
        sx={{ color: color }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  circularProgress: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({ color, seconds, circularProgress }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;

        // Restart the timer when it reaches the specified seconds
        return newProgress >= seconds ? 0 : newProgress;
      });
    }, 1000); // Update every second

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  // Pass the color and seconds props to CircularProgressWithLabel component
  return <CircularProgressWithLabel value={progress} color={color} seconds={seconds} circularProgress={circularProgress}/>;
}
