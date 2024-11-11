// components/ActivityChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Activity } from '../models/Activity';

interface Props {
  activities: Activity[];
}

const ActivityChart: React.FC<Props> = ({ activities }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={activities}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="footprint" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ActivityChart;
