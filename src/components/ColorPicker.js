import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
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

  // State for tilt effect based on mouse position
  const [tiltEffect, setTiltEffect] = useState({ rotateX: 0, rotateY: 0 });

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
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate tilt effect based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 15; // Maximum tilt angle

    // Calculate rotation based on mouse position relative to the center
    const rotateX = ((y - centerY) / centerY) * maxTilt;
    const rotateY = -((x - centerX) / centerX) * maxTilt;

    setTiltEffect({ rotateX, rotateY });

    // Get color at cursor position
    const ctx = canvasRef.current.getContext("2d");
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
    setTiltEffect({ rotateX: 0, rotateY: 0 }); // Reset tilt effect on mouse leave
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

  // Convert HSL to HEX
  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
  
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
  
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  };

  // Update HEX color based on sliders
  useEffect(() => {
    setSelectedColor(hslToHex(hue, saturation, lightness));
  }, [hue, saturation, lightness]);

  return (
    <Box textAlign="center" p={2}>
      <Typography variant="h6" gutterBottom color="white">
        Color Picker
      </Typography>
      <Box position="relative" mt={3}>
        <motion.div
          style={{ display: 'inline-block', perspective: 1000 }}
          animate={{
            rotateX: tiltEffect.rotateX,
            rotateY: tiltEffect.rotateY,
            scale: 1.05,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            mass: 0.5,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            style={{ borderRadius: "50%", cursor: "pointer" }}
            onClick={handleColorSelection}
          />
        </motion.div>
        {showTooltip && (
          <ColorTooltip color={hoverColor} position={tooltipPosition} />
        )}
      </Box>

      <Box mt={2} display="flex" alignItems="center" justifyContent="center" gap={2}>
        <Typography color="white">Selected HEX:</Typography>
        <Box
          p={1}
          bgcolor="white"
          borderRadius={2}
          display="inline-block"
          width={80}
          textAlign="center"
          color="black"
          fontWeight="bold"
        >
          {selectedColor}
        </Box>
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
