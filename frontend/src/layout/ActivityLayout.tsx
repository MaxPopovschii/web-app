import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import Wrapper from '../components/Wrapper';
import VehicleSearch from '../utils/VehiclesSearch';
import DeleteIcon from "@mui/icons-material/Delete";
import HouseActivitiesDialog from '../components/HouseAtivitiesDialog';

type Activity = 'Trasporto' | 'Alimentazione' | 'Casa' | 'Viaggi' | 'Altro';

interface CarData {
    brand: string;
    model: string;
    fuelType: 'Benzina' | 'Diesel' | 'Elettrica' | 'Ibrida';
    fuelConsumption: number; // L/100km
}
interface FoodItem {
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

const foodDatabase: FoodItem[] = [
  { name: "Pane integrale", calories: 250, proteins: 9, carbs: 45, fats: 3 },
  { name: "Latte intero", calories: 60, proteins: 3, carbs: 5, fats: 3 },
  { name: "Marmellata senza zucchero", calories: 150, proteins: 0, carbs: 38, fats: 0 },
  { name: "Uova", calories: 70, proteins: 6, carbs: 1, fats: 5 },
  { name: "Yogurt greco", calories: 100, proteins: 10, carbs: 4, fats: 2 },
];

const ActivityLayout: React.FC = () => {
    const [open, setOpen] = useState(false); // Stato per la finestra modale
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null); // Stato per l'attività selezionata
    const [activityData, setActivityData] = useState(''); // Stato per i dati inseriti
    const [ecoFootprint, setEcoFootprint] = useState<number | null>(null); // Stato per l'impronta ecologica
    const [mealType, setMealType] = useState<string | null>(null);
    const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
    const [foodInput, setFoodInput] = useState("");
  
    const handleAddFood = (foodName: string) => {
      const food = foodDatabase.find((item) => item.name === foodName);
      if (food) {
        setSelectedFoods((prev) => [...prev, food]);
      }
      setFoodInput("");
    };
  
    const handleRemoveFood = (index: number) => {
      setSelectedFoods((prev) => prev.filter((_, i) => i !== index));
    };
  
    const calculateTotals = () => {
      return selectedFoods.reduce(
        (totals, food) => ({
          calories: totals.calories + food.calories,
          proteins: totals.proteins + food.proteins,
          carbs: totals.carbs + food.carbs,
          fats: totals.fats + food.fats,
        }),
        { calories: 0, proteins: 0, carbs: 0, fats: 0 }
      );
    };
  
    const totals = calculateTotals();

    const handleActivityClick = (activity: Activity): void => {
        setSelectedActivity(activity); // Imposta l'attività selezionata
        setOpen(true); // Apri la finestra modale
    };

    const handleCloseModal = () => {
        setOpen(false); // Chiudi la finestra modale
    };
    
    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActivityData(event.target.value); // Aggiorna il dato inserito
    };

    
    const handleCalculateEcoFootprint = () => {
        // Calcola l'impronta ecologica basata sul dato inserito
        // Ogni attività avrà una logica di calcolo diversa
        let footprint = 0;
        switch (selectedActivity) {
          case 'Alimentazione':
            footprint = activityData.split(' ').length * 0.2; // Stima per alimentazione
            break;
          case 'Trasporto':
            footprint = activityData.split(' ').length * 0.15; // Stima per trasporto
            break;
          case 'Casa':
            footprint = activityData.split(' ').length * 0.1; // Stima per casa
            break;
          case 'Viaggi':
            footprint = activityData.split(' ').length * 0.3; // Stima per viaggi
            break;
          case 'Altro':
            footprint = activityData.split(' ').length * 0.2; // Stima per altre attività
            break;
          default:
            break;
        }
        setEcoFootprint(footprint); // Imposta l'impronta ecologica calcolata
    };

  return (
    <Box sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
    <Typography variant="h4" component="h1" sx={{
        marginBottom: 3,
        color: '#2A473E',
        fontWeight: 600,
        textAlign: 'center',
        fontSize: '2rem',
      }}>
      Seleziona un tipo di attività:
    </Typography>

    <Stack 
        direction="row" 
        spacing={3} 
        flexWrap="wrap" 
        justifyContent="center" 
        sx={{ width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleActivityClick('Trasporto')}
        sx={{
            padding: '16px 32px',
            fontSize: '1.2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#4F8F67',
            },
          }}
      >
        Trasporto
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleActivityClick('Alimentazione')}
        sx={{
            padding: '16px 32px',
            fontSize: '1.2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#4F8F67',
            },
          }}
      >
        Alimentazione
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleActivityClick('Casa')}
        sx={{
            padding: '16px 32px',
            fontSize: '1.2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#4F8F67',
            },
          }}
      >
        Casa
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleActivityClick('Viaggi')}
        sx={{
            padding: '16px 32px',
            fontSize: '1.2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#4F8F67',
            },
          }}
      >
        Viaggi
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleActivityClick('Altro')}
        sx={{
            padding: '16px 32px',
            fontSize: '1.2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#4F8F67',
            },
          }}
      >
        Altro
      </Button>
    </Stack>
    {/* Finestra Modale Generica */}
    <Dialog open={open} onClose={handleCloseModal} style={{height: "550px"}} draggable={true}>
        <DialogTitle>{selectedActivity ? `Inserisci dati per ${selectedActivity}` : 'Inserisci dati'}</DialogTitle>
        <DialogContent>
          {selectedActivity === 'Alimentazione' && (
            <Box>
              <Typography variant="subtitle1" style={{justifySelf: 'center'}}>Seleziona il tipo di pasto</Typography>
              <Button variant="outlined" onClick={() => setMealType("Colazione")} style={{ margin: "8px" }}>
                Colazione
              </Button>
              <Button variant="outlined" onClick={() => setMealType("Pranzo")} style={{ margin: "8px" }}>
                Pranzo
              </Button>
              <Button variant="outlined" onClick={() => setMealType("Cena")} style={{ margin: "8px" }}>
                Cena
              </Button>
              {mealType && (
                <>
                  <Typography variant="h6" style={{ marginTop: "16px" }}>
                    {mealType}
                  </Typography>
                  <Autocomplete
                    freeSolo
                    options={foodDatabase.map((food) => food.name)}
                    value={foodInput}
                    onInputChange={(_, value) => setFoodInput(value)}
                    renderInput={(params) => <TextField {...params} label="Cerca alimento" variant="outlined" />}
                    onChange={(_, value) => value && handleAddFood(value)}
                  />
                  <List>
                    {selectedFoods.map((food, index) => (
                      <ListItem key={index}>
                        {food.name} - {food.calories} kcal
                        <IconButton edge="end" onClick={() => handleRemoveFood(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="subtitle2" style={{ marginTop: "16px" }}>
                    Totali: {totals.calories} kcal, {totals.proteins}g proteine, {totals.carbs}g carboidrati, {totals.fats}g grassi
                  </Typography>
                </>
              )}
            </Box>
          )}

          {selectedActivity === 'Trasporto' && (
            <Box>
                <VehicleSearch/>
                <Wrapper/>
            </Box>
          )}

          {selectedActivity === 'Casa' && (
            <HouseActivitiesDialog />
          )}

          {selectedActivity === 'Viaggi' && (
            <TextField
              autoFocus
              margin="dense"
              label="Tipo di viaggio"
              type="text"
              fullWidth
              variant="outlined"
              value={activityData}
              onChange={handleDataChange}
              sx={{ marginBottom: 2 }}
            />
          )}

          {selectedActivity === 'Altro' && (
            <TextField
              autoFocus
              margin="dense"
              label="Descrivi l'attività"
              type="text"
              fullWidth
              variant="outlined"
              value={activityData}
              onChange={handleDataChange}
              sx={{ marginBottom: 2 }}
            />
          )}

          {ecoFootprint !== null && (
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Impronta ecologica stimata: {ecoFootprint.toFixed(2)} kg CO₂
            </Typography>
          )}
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button onClick={handleCloseModal} color="error">
            Annulla
          </Button>
          <Button onClick={handleCalculateEcoFootprint} color="success">
            Calcola
          </Button>
        </DialogActions>
    </Dialog>
  </Box>
  )
}


export default ActivityLayout;