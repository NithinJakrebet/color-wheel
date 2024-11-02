import { Container, Typography, Box } from '@mui/material';
import ColorPicker from './components/ColorPicker';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #282c34, #4b79a1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center', p: 3 }}>
        <Typography variant="h4" gutterBottom color="white">
          Color to Hex
        </Typography>
        <ColorPicker />
      </Container>
    </Box>
  );
}

export default App;
