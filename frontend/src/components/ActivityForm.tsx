
import React, { useState } from 'react';

interface Props {
  onAddActivity: (activity: { type: string; footprint: number }) => void;
}

const ActivityForm: React.FC<Props> = ({ onAddActivity }) => {
  const [type, setType] = useState('');
  const [footprint, setFootprint] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddActivity({ type, footprint });
    setType('');
    setFootprint(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Activity type"
        required
      />
      <input
        type="number"
        value={footprint}
        onChange={(e) => setFootprint(Number(e.target.value))}
        placeholder="Ecofootprint"
        required
      />
      <button type="submit">Add activity</button>
    </form>
  );
};

export default ActivityForm;
