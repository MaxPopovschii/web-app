import { createTheme } from "@mui/material";
// Extend the Theme interface to include 'accent'
declare module '@mui/material/styles' {
    interface Palette {
      accent?: Palette['primary'];
    }
    interface PaletteOptions {
      accent?: PaletteOptions['primary'];
    }
  }

const ecoFootprintTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-ecofootprint-color-scheme',
    },
    colorSchemes: {
      light: {
        palette: {
          text: {
            primary: '#2A473E', // Verde scuro per il testo principale
            secondary: '#567D68', // Verde morbido per i dettagli
          },
          background: {
            default: '#F4F9F4', // Verde pallido elegante
            paper: '#E1F0E3', // Contenitori con un tocco raffinato
          },
          primary: {
            main: '#5BA37A', // Verde bilanciato come colore principale
          },
          secondary: {
            main: '#FFC857', // Accento caldo per contrastare il verde
          },
          action: {
            active: '#3B6956', // Verde scuro per icone attive
            hover: '#8ABDA8', // Tono chiaro per hover
            selected: '#4CAF50', // Verde intenso per selezioni
          },
          divider: '#D3E2D9', // Linee sottili per un tocco elegante
        },
      },
    dark: {
      palette: {
        text: {
          primary: '#E8F5E9', // Testo chiaro in contrasto con lo sfondo scuro
          secondary: '#A5D6A7', // Verde tenue per i dettagli
        },
        background: {
          default: '#121212', // Nero morbido per lo sfondo principale
          paper: '#1E1E1E', // Grigio scuro per i contenitori
        },
        primary: {
          main: '#66BB6A', // Verde vibrante per interattività
        },
        secondary: {
          main: '#FFC857', // Accenti caldi per contrasto
        },
        action: {
          active: '#A5D6A7', // Verde tenue per icone attive
          hover: '#81C784', // Tono verde morbido per hover
          selected: '#4CAF50', // Verde vivace per selezioni
        },
        divider: '#37474F', // Linee eleganti ma discrete
      },
    },
  },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px', // Design più moderno
            textTransform: 'capitalize', // Testo elegante
            fontWeight: 500,
            padding: '8px 16px', // Pulsanti bilanciati
          },
          containedPrimary: {
            backgroundColor: '#5BA37A',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#4F8F67',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#5BA37A',
            color: '#FFFFFF',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: '#8ABDA8',
            color: '#2A473E',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h4: {
            fontWeight: 600,
            color: '#2A473E',
          },
          subtitle1: {
            color: '#567D68',
          },
        },
      },
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif", // Font moderno e leggibile
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        color: '#2A473E',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      body1: {
        fontWeight: 400,
        fontSize: '1rem',
      },
      button: {
        fontWeight: 500,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

export default ecoFootprintTheme;