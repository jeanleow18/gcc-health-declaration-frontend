import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HealthDeclarationFormCreate from "./HealthDeclarationFormCreate";
import HealthDeclarationFormView from "./HealthDeclarationFormView";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            marginTop: 4,
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Container component="main">

            <Router>
              <div className="App">
                <Routes>
                  <Route path="/view" element={<HealthDeclarationFormView />} />
                  <Route path="/" element={<HealthDeclarationFormCreate />} />
                </Routes>
              </div>
            </Router>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

