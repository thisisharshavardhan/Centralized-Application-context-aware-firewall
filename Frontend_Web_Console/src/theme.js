import { createContext } from 'react';
import { createTheme } from '@mui/material/styles';

// A professional, modern dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#388eff', // A modern, accessible blue
    },
    secondary: {
      main: '#ffc400', // A vibrant accent color for highlights
    },
    background: {
      default: '#0d1117', // GitHub's dark background - professional and deep
      paper: '#161b22',   // GitHub's dark paper color - for surfaces
    },
    text: {
      primary: '#c9d1d9', // GitHub's primary text color
      secondary: '#8b949e', // GitHub's secondary text color
    },
    divider: '#30363d', // A subtle border color
    success: {
      main: '#2e7d32',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600, letterSpacing: '0.5px' },
    h6: { fontWeight: 600, letterSpacing: '0.3px' },
    button: {
      textTransform: 'none', // For a cleaner, more modern look
      fontWeight: 600,
    },
  },
  components: {
    // Add a custom scrollbar for a polished look
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '::-webkit-scrollbar': {
            width: '8px',
          },
          '::-webkit-scrollbar-track': {
            backgroundColor: '#0d1117',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#30363d',
            borderRadius: '4px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#484f58',
          },
        },
      },
    },
    // "Frosted Glass" AppBar for a fancy, modern effect
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(22, 27, 34, 0.8)', // Semi-transparent
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid #30363d',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#161b22',
          borderRight: '1px solid #30363d',
        },
      },
    },
    // Enhanced List Item Buttons with smooth transitions
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          margin: '4px 8px',
          transition: 'background-color 0.2s ease-in-out',
          '&.Mui-selected': {
            backgroundColor: 'rgba(56, 142, 255, 0.12)', // Use primary color with opacity
            '& .MuiListItemIcon-root': {
              color: '#388eff',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
    // Add a subtle glow to Paper components on hover, without movement
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Ensure no gradients from default themes
          transition: 'box-shadow 0.3s ease-in-out', // Removed transform from transition
          '&:hover': {
             // transform: 'translateY(-2px)', // This line is removed
             boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
          }
        },
      },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: '8px',
            }
        }
    }
  },
});


export const ThemeContext = createContext({
  toggleTheme: () => {},
});