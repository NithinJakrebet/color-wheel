import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ColorTooltip from './ColorTooltip';
import CopyButton from './CopyButton';

const ColorPicker = () => {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [hoverColor, setHoverColor] = useState("#ffffff");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    // Draw the color wheel
    for (let angle = 0; angle < 360; angle++) {
      ctx.beginPath();
      ctx.arc(radius, radius, radius, toRadians(angle), toRadians(angle + 1));
      ctx.strokeStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.lineWidth = radius;
      ctx.stroke();
    }
  }, []);

  const handleColorSelection = () => {
    setSelectedColor(hoverColor);
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Get color at the cursor position
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2])
      .toString(16)
      .slice(1)}`;

    setHoverColor(hex);
    setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 }); // Position tooltip near cursor
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Box textAlign="center" p={2}>
      <Typography variant="h6" gutterBottom>
        Color Picker
      </Typography>
      <Box position="relative">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          style={{ borderRadius: "50%", cursor: "pointer" }}
          onClick={handleColorSelection}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        {showTooltip && (
          <ColorTooltip color={hoverColor} position={tooltipPosition} />
        )}
      </Box>
      <Box mt={2}>
        <Typography>Selected Color: {selectedColor}</Typography>
        <CopyButton color={selectedColor} />
      </Box>
    </Box>
  );
};

export default ColorPicker;
