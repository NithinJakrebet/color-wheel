import React, { useState } from 'react';

const ColorPicker = () => {
  const [hexColor, setHexColor] = useState("#ffffff");

  const handleColorChange = (event) => {
    setHexColor(event.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hexColor);
    alert(`HEX code ${hexColor} copied!`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <input
        type="color"
        value={hexColor}
        onChange={handleColorChange}
        style={{ width: '100px', height: '100px', cursor: 'pointer' }}
      />
      <div style={{ marginTop: '20px' }}>
        <p>Selected Color: {hexColor}</p>
        <button onClick={copyToClipboard}>Copy HEX</button>
      </div>
    </div>
  );
};

export default ColorPicker;
