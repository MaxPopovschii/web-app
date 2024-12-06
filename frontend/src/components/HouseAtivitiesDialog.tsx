import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface HouseActivity {
  activity: string;
  consumption: number; // in kWh, m³, o unità specifiche
  unit: string; // kWh, m³, etc.
}

const activitySuggestions = [
  { label: "Uso di elettrodomestici", unit: "kWh" },
  { label: "Consumo di gas per riscaldamento", unit: "m³" },
  { label: "Consumo di acqua calda", unit: "litri" },
  { label: "Illuminazione", unit: "kWh" },
];

const HouseActivitiesDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState<HouseActivity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<HouseActivity>({
    activity: "",
    consumption: 0,
    unit: "",
  });

  const handleAddActivity = () => {
    if (currentActivity.activity && currentActivity.consumption > 0) {
      setActivities([...activities, currentActivity]);
      setCurrentActivity({ activity: "", consumption: 0, unit: "" });
    }
  };

  const handleRemoveActivity = (index: number) => {
    const newActivities = [...activities];
    newActivities.splice(index, 1);
    setActivities(newActivities);
  };

  const calculateEcoFootprint = () => {
    // Placeholder formula for eco-footprint calculation
    const totalConsumption = activities.reduce((sum, act) => sum + act.consumption, 0);
    return totalConsumption * 0.5; // Example multiplier for demonstration
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Aggiungi Attività Casa
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Inserisci Attività per Calcolo Impronta Ecologica</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Autocomplete
              options={activitySuggestions}
              getOptionLabel={(option) => option.label}
              onChange={(e, value) => {
                if (value) {
                  setCurrentActivity((prev) => ({
                    ...prev,
                    activity: value.label,
                    unit: value.unit,
                  }));
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Seleziona Attività" variant="outlined" />
              )}
            />
          </Box>
          <TextField
            label="Consumo"
            type="number"
            value={currentActivity.consumption}
            onChange={(e) =>
              setCurrentActivity((prev) => ({
                ...prev,
                consumption: parseFloat(e.target.value),
              }))
            }
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {currentActivity.unit || "Unità"}
                </Typography>
              ),
            }}
          />
          <Button variant="outlined" color="secondary" onClick={handleAddActivity}>
            Aggiungi Attività
          </Button>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Attività Inserite</Typography>
            {activities.map((activity, index) => (
              <Box key={index} display="flex" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  {activity.activity}: {activity.consumption} {activity.unit}
                </Typography>
                <IconButton onClick={() => handleRemoveActivity(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Chiudi
          </Button>
          <Button
            onClick={() => {
              const result = calculateEcoFootprint();
              alert(`Impronta ecologica totale: ${result.toFixed(2)} unità di CO₂`);
              setOpen(false);
            }}
            color="primary"
          >
            Calcola Impronta Ecologica
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HouseActivitiesDialog;
