import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress, Autocomplete, Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Definisci un tipo per il veicolo
interface Vehicle {
  Model_ID: number;
  Model_Name: string;
  Make_Name: string;
}

const VehicleSearch = () => {
  const [query, setQuery] = useState('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false); // Stato per il caricamento
  const theme = useTheme(); // Usa il tema personalizzato

  useEffect(() => {
    if (query.length > 2) { // Trigger ricerca solo quando l'utente ha scritto almeno 3 caratteri
      setLoading(true); // Avvia il caricamento
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getModelsForMake/${query}?format=json`)
        .then((response) => response.json())
        .then((data) => {
          setVehicles(data.Results || []);
          setLoading(false); // Termina il caricamento
        })
        .catch((error) => {
          console.error('Errore nel recupero dei modelli di veicoli:', error);
          setLoading(false); // Termina il caricamento anche in caso di errore
        });
    } else {
      setVehicles([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <Container maxWidth="sm">
      <Box mt={3}>
        <Autocomplete
          freeSolo
          options={vehicles.map((vehicle) => `${vehicle.Make_Name} ${vehicle.Model_Name}`)}
          onInputChange={(event, newInputValue) => setQuery(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cerca veicolo (es. Toyota)"
              variant="outlined"
              fullWidth
              sx={{
                mb: 2, 
                borderRadius: '6px', 
                backgroundColor: theme.palette.background.paper, // Usa il colore di sfondo del tema
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.primary.main, // Colore del bordo
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.dark, // Colore del bordo al passaggio del mouse
                  },
                },
              }}
            />
          )}
          loading={loading}
          getOptionLabel={(option) => option} // Utilizza direttamente la stringa dell'opzione
          renderOption={(props, option) => (
            <li {...props} style={{ color: theme.palette.text.primary }}>
              {option}
            </li>
          )}
        />
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <CircularProgress color="primary" />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default VehicleSearch;
