import React from 'react';
import { Container, Typography } from '@mui/material';
import ColorPicker from './components/ColorPicker';

function App() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Color Picker with Material UI
      </Typography>
      <ColorPicker />
    </Container>
  );
}

export default App;
