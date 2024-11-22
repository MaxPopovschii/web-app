import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Box,
  Grid2,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

// Mock data
const barData = {
  labels: ["Activity A", "Activity B", "Activity C", "Activity D"],
  datasets: [
    {
      label: "CO₂ Emissions (kg)",
      data: [12, 19, 3, 5],
      backgroundColor: ["#2d6a4f", "#52796f", "#74c69d", "#40916c"],
    },
  ],
};

const lineData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Footprint Over Time",
      data: [65, 59, 80, 81],
      borderColor: "#52796f",
      backgroundColor: "rgba(82, 121, 111, 0.5)",
    },
  ],
};

const pieData = {
  labels: ["Transport", "Energy", "Food", "Waste"],
  datasets: [
    {
      label: "Category Distribution",
      data: [40, 25, 20, 15],
      backgroundColor: ["#2d6a4f", "#74c69d", "#40916c", "#52796f"],
    },
  ],
};

const Dashboard: React.FC = () => {
  const [period, setPeriod] = useState("weekly");

  // Correctly typed handleChangePeriod function
  const handleChangePeriod = (event: SelectChangeEvent<string>) => {
    setPeriod(event.target.value);
    // TODO: Fetch data based on selected period (weekly, monthly, yearly)
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#2d6a4f" }}>
        EcoFootprint Dashboard
      </Typography>

      {/* Period Selector */}
      <FormControl sx={{ marginBottom: "20px", minWidth: 200 }}>
        <InputLabel id="period-select-label">View Period</InputLabel>
        <Select
          labelId="period-select-label"
          value={period}
          onChange={handleChangePeriod}
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </FormControl>

      {/* Charts */}
      <Grid2 container spacing={4} component="div">
        {/* Bar Chart */}
        <Grid2   component="div">
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            CO₂ Emissions by Activity
          </Typography>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: true }} />
        </Grid2>

        {/* Line Chart */}
        <Grid2  component="div">
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Footprint Over Time
          </Typography>
          <Line data={lineData} options={{ responsive: true, maintainAspectRatio: true }} />
        </Grid2>

        {/* Pie Chart */}
        <Grid2  component="div">
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Category Distribution
          </Typography>
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: true }} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
