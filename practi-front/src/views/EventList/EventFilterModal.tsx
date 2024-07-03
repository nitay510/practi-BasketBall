import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

interface EventFilterModalProps {
  teams: { teamName: string }[]; // Array of teams for rendering checkboxes
  selectedTeams: string[];
  setSelectedTeams: React.Dispatch<React.SetStateAction<string[]>>;
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean; // Modal open state
  onClose: () => void; // Function to close the modal
  onApplyFilters: (startDate: string, endDate: string, selectedTeams: string[]) => void; // Function to apply filters
}

const EventFilterModal: React.FC<EventFilterModalProps> = ({ teams, selectedTeams: initialSelectedTeams, startDate: initialStartDate, endDate: initialEndDate, isOpen, onClose, onApplyFilters }) => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>(initialSelectedTeams);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
setSelectedTeams(initialSelectedTeams);
  }, [initialSelectedTeams]);

  useEffect(() => {
    if (selectedTeams.length < teams.length) {
      setSelectAll(false);
    } else {
      setSelectAll(true);
    }
  }, [selectedTeams, teams]);

  // Function to toggle team selection
  const toggleTeamSelection = (teamName: string) => {
    setSelectedTeams(prevSelectedTeams => {
      if (prevSelectedTeams.includes(teamName)) {
        return prevSelectedTeams.filter(name => name !== teamName);
      } else {
        return [...prevSelectedTeams, teamName];
      }
    });
  };

  // Function to handle toggling all teams
  const handleToggleAllTeams = () => {
    setSelectedTeams(selectAll ? [] : teams.map(team => team.teamName));
    setSelectAll(!selectAll);
  };

  // Function to apply filters
  const handleApplyFilters = () => {
    onApplyFilters(startDate, endDate, selectedTeams);
    onClose();
  };

  return (
    isOpen && (
      <div className='filter-modal'>
        <button className='modal-close-button' onClick={onClose}>
          <MdClose />
        </button>
        <h4 className='modal-title'>סנן לפי</h4>
        <h5 className='modal-sub-title'>תאריך</h5>

        <label>החל מ:</label>
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder='Start Date'
        />

        <label>עד ל:</label>
        <input
          type='date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder='End Date'
        />

        <div className='by-team-title'>
          <h5 className='modal-sub-title'>קבוצה</h5>
          <label className="select-all-label">
            <input
              type='checkbox'
              onChange={handleToggleAllTeams}
              checked={selectAll}
            />
            <span>בחר הכל</span>
            <div className="border"></div>
          </label>



        </div>
        <div className="checkbox-container">
          {teams.map((team: any, index: number) => (
            <label key={index} className="checkbox-label">
              <input
                type='checkbox'
                checked={selectedTeams.includes(team.teamName)}
                onChange={() => toggleTeamSelection(team.teamName)}
              />
              <span className="team-name">{team.teamName}</span>
            </label>
          ))}
        </div>

        <button onClick={handleApplyFilters}>הפעל פילטרים</button>
      </div>
    )
  );
};


export default EventFilterModal;
