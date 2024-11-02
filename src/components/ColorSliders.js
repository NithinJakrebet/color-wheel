import React from 'react';
import { Box, Typography, Slider } from '@mui/material';

const ColorSliders = ({ hue, saturation, lightness, onHueChange, onSaturationChange, onLightnessChange }) => {
  return (
    <Box mt={3}>
      <Typography gutterBottom>Hue</Typography>
      <Slider
        value={hue}
        onChange={(e, newValue) => onHueChange(newValue)}
        min={0}
        max={360}
      />
      <Typography gutterBottom>Saturation</Typography>
      <Slider
        value={saturation}
        onChange={(e, newValue) => onSaturationChange(newValue)}
        min={0}
        max={100}
      />
      <Typography gutterBottom>Lightness</Typography>
      <Slider
        value={lightness}
        onChange={(e, newValue) => onLightnessChange(newValue)}
        min={0}
        max={100}
      />
    </Box>
  );
};

export default ColorSliders;
