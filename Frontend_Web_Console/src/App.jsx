import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, ThemeContext } from './theme';
import { lightTheme } from './lightTheme'; 
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';

function App() {
  const [mode, setMode] = useState('dark'); // Default to dark mode

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const themeApi = useMemo(() => ({
    toggleTheme: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  return (
    <ThemeContext.Provider value={themeApi}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path='*' element="you may entered some invalid path or could be some routing issue."/>
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
