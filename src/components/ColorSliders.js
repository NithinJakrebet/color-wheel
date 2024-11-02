import React from 'react';
import { Box, Typography, Slider } from '@mui/material';

const ColorSliders = ({ hue, saturation, lightness, onHueChange, onSaturationChange, onLightnessChange }) => {
  return (
    <Box mt={3}>
      <Typography gutterBottom color="white">Hue</Typography>
      <Slider
        value={hue}
        onChange={(e, newValue) => onHueChange(newValue)}
        min={0}
        max={360}
        aria-labelledby="hue-slider"
      />
      <Typography gutterBottom color="white">Saturation</Typography>
      <Slider
        value={saturation}
        onChange={(e, newValue) => onSaturationChange(newValue)}
        min={0}
        max={100}
        aria-labelledby="saturation-slider"
      />
      <Typography gutterBottom color="white">Lightness</Typography>
      <Slider
        value={lightness}
        onChange={(e, newValue) => onLightnessChange(newValue)}
        min={0}
        max={100}
        aria-labelledby="lightness-slider"
      />
    </Box>
  );
};

export default ColorSliders;
