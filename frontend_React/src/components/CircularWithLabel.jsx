import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './styles.css';

const MIN = 0;
const MAX = 100;

function CircularProgressWithLabel(props) {
  const normalise = (value) => ((value - MIN) * 170) / (MAX - MIN);

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={normalise(props.value)} /> {/* color="inherit/success/secondary" */}
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
          {`${Math.round(props.value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;

        // Restart the timer when it reaches 60
        return newProgress >= 60 ? 0 : newProgress;
      });
    }, 1000); // Update every second

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}
