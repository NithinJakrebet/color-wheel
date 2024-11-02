import React from 'react';
import { Button } from '@mui/material';

const CopyButton = ({ color }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    alert(`HEX code ${color} copied!`);
  };

  return (
    <Button variant="contained" color="primary" onClick={copyToClipboard} sx={{ mt: 1 }}>
      Copy HEX
    </Button>
  );
};

export default CopyButton;
