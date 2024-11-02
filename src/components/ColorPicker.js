import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ColorTooltip from './ColorTooltip';
import CopyButton from './CopyButton';
import ColorSliders from './ColorSliders';

const ColorPicker = () => {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [hoverColor, setHoverColor] = useState("#ffffff");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // State for HSL sliders
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

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

    // Convert HEX to HSL and set sliders
    const [h, s, l] = hexToHSL(hoverColor);
    setHue(h);
    setSaturation(s);
    setLightness(l);
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
    setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const hexToHSL = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = (max + min) / 2, s = h, l = h;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
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
        <Typography>Selected Color: hsl({hue}, {saturation}%, {lightness}%)</Typography>
        <CopyButton color={selectedColor} />
      </Box>

      {/* Color Sliders */}
      <ColorSliders
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        onHueChange={setHue}
        onSaturationChange={setSaturation}
        onLightnessChange={setLightness}
      />
    </Box>
  );
};

export default ColorPicker;
