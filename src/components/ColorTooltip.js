import React from 'react';
import { Box, Typography } from '@mui/material';

const ColorTooltip = ({ color, position }) => (
  <Box
    position="fixed"
    left={position.x}
    top={position.y}
    bgcolor="white"
    color="black"
    p={1}
    borderRadius="4px"
    boxShadow={2}
    zIndex={10}
    style={{ pointerEvents: "none" }}
  >
    <Typography variant="body2">{color}</Typography>
    <Box
      width={30}
      height={30}
      bgcolor={color}
      border="1px solid #ccc"
      borderRadius="50%"
      mt={1}
    />
  </Box>
);

export default ColorTooltip;
