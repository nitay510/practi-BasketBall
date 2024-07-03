import React from 'react';

interface Drill {
  _id: string;
  title: string;
  topic: string
}

interface DrillListProps {
  drills: Drill[];
  selectedDrill: Drill | null;
  onDrillSelect: (drill: Drill) => void;
}

const DrillList: React.FC<DrillListProps> = ({ drills, selectedDrill, onDrillSelect }) => {
  return (
    <select
      className="select"
      value={selectedDrill ? selectedDrill._id : ''}
      onChange={(e) => {
        const selectedId = e.target.value;
        const selectedDrill = drills.find(drill => drill._id === selectedId);
        if (selectedDrill) {
          onDrillSelect(selectedDrill);
        }
      }}
    >
      <option value="">Select Drill</option>
      {drills.map((drill) => (
        <option key={drill._id} value={drill._id}>
          {drill.title}
        </option>
      ))}
    </select>
  );
};

export default DrillList;
