// components/Dashboard.tsx
import React, { useState } from 'react';
import ActivityForm from './ActivityForm';
import ActivityChart from './ActivityChart';
import { Activity } from '../models/Activity';

const Dashboard: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const handleAddActivity = (activity: { type: string; footprint: number }) => {
    const newActivity: Activity = {
      id: activities.length + 1,
      type: activity.type,
      date: new Date().toISOString().slice(0, 10),
      footprint: activity.footprint,
    };
    setActivities([...activities, newActivity]);
  };

  return (
    <div className="dashboard">
      <h1>Eco Footprint Dashboard</h1>
      <ActivityForm onAddActivity={handleAddActivity} />
      <div className="chart-container">
        <ActivityChart activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;
